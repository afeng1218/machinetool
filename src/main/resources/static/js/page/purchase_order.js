/**
 * Created by GuoFeng on 2016/4/18.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

    /*父页面名称*/
    var pageName = $('#pageName', parent.document).val();
    /*隐藏用户名*/
    var hiddenName = '';
    /*隐藏权限信息*/
    var hiddenApprovalAuthority = '';
    /*隐藏的默认库房*/
    var hiddenDefaultStorage = '';

    /*通用查询配置*/
    var searchVal = {
        /*是否弹出页面 如果是false 则直接返回查询结果(默认是true)*/
        popMenu: true,
        /*查詢條件*/
        searchValue: '',
        /*查询条件是否可编辑 (默认是false)*/
        readonly: false,
        /*查询表实体类（必填项）*/
        searchTable: '',
        /*查询哪几列数据（必填项）*/
        searchCol: '',
        /*自定义显示前两列列名 必须和查询列实体类列名前两列对应(默认 编号、描述)*/
        colName: ''
    };

    function init() {

        /**
         * 设置审批权
         */
        var orderApprovalAuthority = COMMON.ECODE.Base64.decode($.cookie('orderApprovalAuthority'));
        if (orderApprovalAuthority == '否') {

            $('#approveBtn').remove();
        }
        /**
         * 获取用户权限
         */
        var arrUrl = window.location.href.split("/");
        var strPage = COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);
        var username = COMMON.ECODE.Base64.decode($.cookie('username'));

        if ($.cookie(strPage) == null && username != 'admin') {

            $('#saveBtn').remove();
            $('#deleteBtn').remove();
        }
        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*当前帐号信息获取*/
        if (pageName == 'mainPage') {

            hiddenName = $('#hiddenName', parent.document).val();
            hiddenApprovalAuthority = $('#hiddenApprovalAuthority', parent.document).val();
            hiddenDefaultStorage = $('#hiddenDefaultStorage', parent.document).val();

        }
        if (pageName == 'autoCreate') {

            hiddenName = $('#hiddenName', parent.parent.parent.document).val();
            hiddenApprovalAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.document).val();
            hiddenDefaultStorage = $('#hiddenDefaultStorage', parent.parent.parent.document).val();
        }

        /*父页面是采购订单 汇总行/汇总题头 默认修改订单状态为编辑状态*/
        if (pageName == 'purchaseOrderHead' || pageName == 'purchaseOrderRow') {

            $('#orderState').val('edit');
        }

        /*设置表格高度*/
        $('.table-body').css('height', screen.height / 3);

        /*获取订单号*/
        /* COMMON.WS.local('purchaseOrder/getOrderNo', 'get', '', true, function (data) {

         $('#orderNo').val(data.orderNo);
         });*/

        /*绑定日期选择控件*/
        $('.calendarBtn').datetimepicker({

            format: 'yyyy-mm-dd',
            autoclose: true,//点击自动关闭
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd',
            minView: 'month'
        });


        /*主要发放 选项切换*/
        $('#mainStatusBar').click(function () {

            $('.mainOrder').click(function () {

                $('.mainOrder').addClass('select');
                $('.grantOrder').removeClass('select');

                $('.cuttool_tab').css('display', 'none');
                $('#stock1').css('display', '');

            });

            $('.grantOrder').click(function () {

                $('.grantOrder').addClass('select');
                $('.mainOrder').removeClass('select');

                $('.cuttool_tab').css('display', 'none');
                $('#stock2').css('display', 'block');
            });
        });


        /*采购员是否存在检查*/
        function checkBuyer(v) {

            if (searchVal.hasOwnProperty('searchColNum')) {

                delete searchVal.searchColNum;
            }
            searchVal.popMenu = false;
            searchVal.searchValue = v;
            searchVal.searchTable = 'CBuyer';
            searchVal.searchCol = 'buyer';
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                if (result == null || result == '') {

                    layer.tips('采购员不存在！', $('#buyer'));
                    /*重新获取焦点*/
                    $('#buyer').focus();

                }
            });

        }

        /*采购员绑定失去焦点事件*/
        $('#buyer').bind('blur', function () {

            var v = $('#buyer').val();
            if (v != '' && v.indexOf('%') == -1) {

                checkBuyer(v);

            } else {

                $('#buyer').val('');

            }

        });
        /*采购员input enter事件监听*/
        $('#buyer').keydown(function (e) {

            if (e.keyCode == 13) {

                var buyer = $('#buyer').val();

                if (buyer.indexOf('%') != -1) {

                    if (searchVal.hasOwnProperty('searchColNum')) {

                        delete searchVal.searchColNum;
                    }
                    searchVal.popMenu = true;
                    searchVal.readonly = false;
                    searchVal.searchValue = $('#buyer').val();
                    searchVal.searchTable = 'CBuyer';
                    searchVal.searchCol = 'buyer,explainText';
                    searchVal.colName = '姓名,描述';
                    /*查询结果回调方法*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        /*获取采购员*/
                        $('#buyer').val(result.buyer);

                    });

                } else {

                    if (buyer != '') {

                        checkBuyer(buyer);

                    }

                }
            }

        });


        /*供应商选择 刷新单价*/
        function refreshUnitPrice() {

            var supplierNo = $('#supplier_no').val();
            var allTr = $('#purchaseTable1 tbody tr');
            if (allTr.length > 0) {

                for (var i = 0; i < allTr.length; i++) {

                    var tr = allTr.eq(i);
                    var materialNo = tr.find('.materialSearch').text();
                    var version = tr.find('.brand').text();

                    if (materialNo == '') {

                        tr.find('unitPrice').html(0);

                    } else {

                        var uploadVal = {
                            supplierNo: supplierNo,
                            materialNo: materialNo,
                            version: version
                        };
                        getUnitPrice(tr, uploadVal);

                    }
                }
            }

        }

        /*供应商存在检查*/
        function checkSupplier(v) {

            searchVal.popMenu = false;
            searchVal.searchValue = v;
            searchVal.searchTable = 'CSupplier';
            searchVal.searchCol = 'supplier,supplierCode';
            searchVal.searchColNum = '0,1';

            if (v.indexOf('%') != -1) {

                layer.tips('请输入正确的供应商！', $('#supplier_describe'));
                $('#supplier_describe').focus();
                return;

            }
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                if (result == null || result == '') {

                    layer.tips('供应商不存在！', $('#supplier_describe'));
                    /*重新获取焦点*/
                    $('#supplier_describe').focus();

                } else {

                    $('#supplier_no').val(result[0].supplierCode);
                    refreshUnitPrice();

                }

            });
        }

        /*供应商失去焦点事件*/
        $('#supplier_describe').blur(function () {

            var v = $('#supplier_describe').val();
            if (v != '' && v.indexOf('%') == -1) {

                checkSupplier(v);

            } else {

                $('#supplier_describe').val('');

            }

        });
        /*供应商 input enter事件监听*/
        $('#supplier_describe').keydown(function (e) {

            if (e.keyCode == 13) {

                var v = $('#supplier_describe').val();

                if (v.indexOf('%') != -1) {

                    /*查询配置*/
                    if (searchVal.hasOwnProperty('searchColNum')) {

                        delete searchVal.searchColNum;
                    }
                    searchVal.popMenu = true;
                    searchVal.readonly = false;
                    searchVal.searchValue = v;
                    searchVal.searchTable = 'CSupplier';
                    searchVal.searchCol = 'supplierCode,supplier';
                    searchVal.colName = '供应商编码,供应商名称';
                    /*查询结果回调方法*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        $('#supplier_describe').val(result.supplier);
                        $('#supplier_no').val(result.supplierCode);

                        /*刷新单价*/
                        refreshUnitPrice();

                    });

                } else if (v != '') {

                    checkSupplier(v);

                }

            }
        });


        /*库房存在检查*/
        function checkStorage(v) {

            if (searchVal.hasOwnProperty('searchColNum')) {

                delete searchVal.searchColNum;
            }
            searchVal.popMenu = false;
            searchVal.searchValue = v;
            searchVal.searchTable = 'CStorageRoomDefinition';
            searchVal.searchCol = 'storageRoomNo';
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                if (result == null || result == '') {

                    layer.tips('库房不存在！', $('#storage'));
                    /*重新获取焦点*/
                    $('#storage').focus();

                }
            });
        }

        /*库房失去焦点事件监听*/
        $('#storage').bind('blur', function () {

            var v = $('#storage').val();
            if (v != '' && v.indexOf('%') == -1) {

                checkStorage(v);

            } else {

                $('#storage').val('');

            }

        });

        /*库房 input enter 事件监听*/
        $('#storage').keydown(function (e) {

            if (e.keyCode == 13) {

                var v = $('#storage').val();
                if (v.indexOf('%') != -1) {

                    /*查询配置*/
                    if (searchVal.hasOwnProperty('searchColNum')) {

                        delete searchVal.searchColNum;
                    }
                    searchVal.popMenu = true;
                    searchVal.readonly = false;
                    searchVal.searchValue = v;
                    searchVal.searchTable = 'CStorageRoomDefinition';
                    searchVal.searchCol = 'storageRoomNo,storageRoomDescribe';
                    searchVal.colName = '库房编号,库房描述';
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        $('#storage').val(result.storageRoomNo);
                    });
                } else if (v != '') {

                    checkStorage(v);

                }
            }
        });

        /*check box ckeckAll 事件监听*/
        $('#checkAl1').click(function () {

            if ($('#checkAl1').prop('checked')) {

                $('.checkBox').prop('checked', true);

            } else {

                $('.checkBox').prop('checked', false);
            }
        });

    }

    /*判断查询是否存在*/
    function existSearch(table, col, prompt, event) {

        var input = $('#input');
        var pInput = input.parent();
        var v = input.val();

        if (v.indexOf('%') != -1 || v == '') {

            pInput.html('');

        } else {


            if (!event.is(input)) {

                /*如果查询的是版本*/
                if (table == 'CMaterialVersion') {

                    v = pInput.parent().find('td').eq(1).text();
                }

                if (v != '' && v.indexOf('%') == -1) {

                    if (searchVal.hasOwnProperty('searchColNum')) {

                        delete searchVal.searchColNum;
                    }
                    searchVal.popMenu = false;
                    searchVal.searchValue = v;
                    searchVal.searchTable = table;
                    searchVal.searchCol = col;
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        if (result == null || result == '') {

                            /*input父元素提示*/
                            layer.tips(prompt, pInput);

                        } else {

                            if (table == 'CMaterialVersion') {

                                for (var i = 0; i < result.length; i++) {

                                    if (result[i].versionExplain == input.val()) {

                                        pInput.html(input.val());
                                        return;

                                    }

                                }

                                if (input.val() == '' || input.val().indexOf('%') != -1) {

                                    pInput.html('');

                                } else {

                                    layer.tips(prompt, input);
                                }

                            } else {

                                /*查询结果存在的话 并且不是版本查询 设置查询值*/
                                pInput.html(input.val());

                            }

                        }
                    });

                } else {

                    if (input.val() == '' || input.val().indexOf('%') != -1) {

                        pInput.html('');

                    } else {

                        layer.tips(prompt, input);
                    }

                }

            }

        }

    }

    /*获取单价方法*/
    function getUnitPrice(tr, uploadVal) {

        COMMON.WS.local('purchaseAgreement/getAgreementUnitPrice', 'get', uploadVal, true, function (data) {

            if (data.result == 'true') {

                tr.find('td').eq(6).html(data.unitPrice);

            } else {

                tr.find('td').eq(6).html(0);

            }

        });

    }

    /*input失去焦点事件*/
    $(document).on('blur', '#input', function () {

        var val = $('#input').val();
        var tr = $('#input').parent().parent();
        var td = $('#input').parent();
        /*物料*/
        if (tr.find('td').eq(1).is(td)) {

            if (val.indexOf('%') == -1 && val != '') {

                existSearch('CGeneralMaterial', 'materialNo', '物料不存在！', td);

            } else {

                td.html('');
            }

        } else if (td.hasClass('storage')) {

            /*库房存在检查*/
            existSearch('CStorageRoomDefinition', 'storageRoomNo', '库房编号不存在！', td);


        } else if (td.hasClass('brand')) {

            /*品牌存在验证*/
            existSearch('CMaterialVersion', 'CGeneralMaterial.materialNo,versionExplain', '版本不存在！', td);


        } else if (val.indexOf('%') != -1) {

            $('#input').parent().html('');

        } else {

            $('#input').parent().html(val);
        }


    });

    /*物料查询tdclick事件监听*/
    $(document).on('click', '.tr', function (e) {

        var v = $(e.target);
        if (v.is('td') && (v.hasClass('materialSearch') || v.hasClass('class')
            || v.hasClass('unitPrice') || v.hasClass('num')
            || v.hasClass('brand') || v.hasClass('storage'))) {

            /*获取当前输入框 已经input中的内容*/
            var input = $('#input');
            var pInput = input.parent();

            /*如果选择的是物料 清空品牌信息*/
            if (v.hasClass('materialSearch')) {

                /*设置input 父元素值*/
                pInput.html(input.val());

                /*如果重新选择物料清空品牌信息*/
                v.parent().find('.brand').html('');
                /*重置单价为0*/
                v.parent().find('.unitPrice').html(0);

                /*内容是否存在查询*/
            } else {

                /*验证内容是否存在*/
                if (pInput.hasClass('brand') || pInput.hasClass('storage')) {

                    if (pInput.hasClass('brand')) {

                        pInput.html(pInput.find('input').val());

                    }
                    if (pInput.hasClass('storage')) {

                        existSearch('CStorageRoomDefinition', 'storageRoomNo', '库房编号不存在！', v);

                    }

                } else {

                    pInput.html(input.val());
                }
            }

            /*插入input并且设置input内容*/
            /*数量td*/
            if (v.hasClass('num')) {

                v.html('<input id="input" type="number" class="form-control" min="1" value="' + v.text() + '"/>');

                /*单价*/
            } else if (v.hasClass('unitPrice')) {

                v.html('<input id="input" type="number" class="form-control" min="1" value="' + v.text() + '"/>');

            } else {

                v.html('<input id="input" type="text" class="form-control" value="' + v.text() + '"/>');

            }
            /*获取焦点*/
            $('#input').focus();

            /*绑定物料查询键盘事件绑定*/
            if (v.hasClass('materialSearch') || v.hasClass('brand')) {

                /*物料选择事件绑定*/
                if (v.hasClass('materialSearch')) {

                    /*获取所在行*/
                    var tr = v.parent();
                    var allTd = tr.find('td');
                    $('#input').keydown(function (e) {

                        if (e.keyCode == 13) {

                            if ($('#input').val() != '' && $('#input').val().indexOf('%') != -1) {

                                if (searchVal.hasOwnProperty('searchColNum')) {

                                    delete searchVal.searchColNum;
                                }
                                searchVal.popMenu = true;
                                searchVal.readonly = false;
                                searchVal.searchValue = $('#input').val();
                                searchVal.searchTable = 'CGeneralMaterial';
                                searchVal.searchCol = 'materialNo,materialDescribe,materialUnit';
                                searchVal.colName = '物料编号,物料描述';

                                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {


                                    /*物料重复检查*/
                                    var allTr = $('#purchaseTable1 tbody tr');
                                    for (var i = 0; i < allTr.length; i++) {

                                        if (!tr.is(allTr.eq(i))) {

                                            if (result.materialNo == allTr.eq(i).find('td').eq(1).text()) {

                                                layer.tips('所选物料重复！', tr.find('td').eq(1));
                                                break;

                                            }

                                        }

                                    }

                                    /*table1 设置值*/
                                    allTd.eq(1).html(result.materialNo);
                                    allTd.eq(2).text(result.materialDescribe);
                                    allTd.eq(4).text(result.materialUnit);

                                    /*获取行号 设置table2的值*/
                                    var rowNo = allTd.eq(0).find('span:first-child').text();
                                    var table2Row = $('#purchaseTable2 tbody tr').eq(rowNo - 1).find('td');
                                    table2Row.eq(1).text(result.materialNo);
                                    table2Row.eq(2).text(result.materialDescribe);


                                    /*获取单价*/
                                    var supplier = $('#supplier_no').val();
                                    var supplierDescribe = $('#supplier_describe');
                                    var materialNo = tr.find('td').eq(1);
                                    var versionExplain = tr.find('td').eq(8).text();

                                    if (supplierDescribe.val() == '') {

                                        layer.tips('请选择供应商！', supplierDescribe);
                                        return;

                                    }
                                    /*根据供应商物料版本从采购协议获取物料单价*/
                                    var uploadVal = {
                                        supplierNo: supplier,
                                        materialNo: materialNo.text(),
                                        version: versionExplain
                                    };
                                    getUnitPrice(tr, uploadVal);

                                });

                            } else {

                                $('#input').val('');

                            }

                        }
                    });

                    /*品牌选择事件绑定*/
                } else {

                    /*物料查询黁td获取*/
                    var materialTd = v.parent().find('.materialSearch');
                    /*tr*/
                    var tr = materialTd.parent();
                    /*版本td*/
                    var versionTd = $('#input').parent();

                    /*没有选择物料 提示先选择*/
                    if (materialTd.text() == '') {

                        layer.tips('请先选择物料！', materialTd);

                    } else {

                        /*物料品牌查询*/
                        $('#input').keydown(function (e) {

                            if (e.keyCode == 13) {

                                if ($('#input').val() != '' && $('#input').val().indexOf('%') != -1) {

                                    if (searchVal.hasOwnProperty('searchColNum')) {

                                        delete searchVal.searchColNum;
                                    }
                                    searchVal.popMenu = true;
                                    searchVal.readonly = true;
                                    searchVal.searchValue = materialTd.text();
                                    searchVal.readonly = true;
                                    searchVal.searchTable = 'CMaterialVersion';
                                    searchVal.searchCol = 'CGeneralMaterial.materialNo,versionExplain,id.materialVersionNo';
                                    searchVal.colName = '物料编号,品牌名称';

                                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                                        /*设置版本信息*/
                                        var versionExplain = result.versionExplain;
                                        var versionNo = result['id.materialVersionNo'];
                                        versionTd.html(versionExplain);
                                        versionTd.parent().find('td').eq(9).text(versionNo);


                                        /*获取单价*/
                                        var supplier = $('#supplier_no').val();
                                        var supplierDescribe = $('#supplier_describe');
                                        var materialNo = versionTd.parent().find('td').eq(1);
                                        var versionExplain = versionTd.text();

                                        if (supplierDescribe.val() == '') {

                                            layer.tips('请选择供应商！', supplierDescribe);
                                            /*重置单价*/
                                            tr.find('.unitPrice').html(0);
                                            return;

                                        }
                                        if (materialNo.text() == '') {

                                            layer.tips('请先选择物料！', materialNo);
                                            /*重置单价*/
                                            tr.find('.unitPrice').html(0);
                                            return;
                                        }
                                        /*根据供应商物料版本从采购协议获取物料单价*/
                                        var uploadVal = {
                                            supplierNo: supplier,
                                            materialNo: materialNo.text(),
                                            version: versionExplain
                                        };
                                        getUnitPrice(tr, uploadVal);

                                    });


                                }

                            }

                        });

                    }


                }

            }
            /*如果点击的是库房*/
            if (v.hasClass('storage')) {

                var input = v.find('input');
                $('#input').keydown(function (e) {

                    if (e.keyCode == 13) {

                        if ($('#input').val() != '' && $('#input').val().indexOf('%') != -1) {

                            if (searchVal.hasOwnProperty('searchColNum')) {

                                delete searchVal.searchColNum;
                            }
                            searchVal.popMenu = true;
                            searchVal.readonly = false;
                            searchVal.searchValue = input.val();
                            searchVal.searchTable = 'CStorageRoomDefinition';
                            searchVal.searchCol = 'storageRoomNo,storageRoomDescribe';
                            searchVal.colName = '库房编号,库房描述';

                            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                                v.html(result.storageRoomNo);
                            });

                        }

                    }

                });
            }

            /*input内容验证*/
        } else {

            var input = $('#input');
            var pInput = input.parent();

            /*物料 品牌 库房是否存在验证*/
            if (v.is('td') && (pInput.hasClass('materialSearch') || pInput.hasClass('brand') || pInput.hasClass('storage'))) {

                /*这里进行内容存在验证*/
                if (pInput.hasClass('materialSearch')) {

                    existSearch('CGeneralMaterial', 'materialNo', '物料不存在！', v);

                }
                if (pInput.hasClass('brand')) {

                    pInput.html(pInput.find('input').val());
                    existSearch('CMaterialVersion', 'CGeneralMaterial.materialNo,versionExplain', '版本不存在！', v);

                }
                if (pInput.hasClass('storage')) {

                    existSearch('CStorageRoomDefinition', 'storageRoomNo', '库房编号不存在！', v);

                }

            } else if (!v.is(input)) {

                pInput.html(input.val());

            }


        }

    });

    /*添加 保存 删除 修改事件 之前的必填项检测 和 物料重复检查*/
    function requiredCheck(operation) {

        var supplier_describe = $('#supplier_describe').val();
        var supplier_no = $('#supplier_no').val();

        if ($('#buyer').val() == '') {

            layer.tips('请选择采购员！', '#buyer');
            return 0;

        } else if (supplier_describe == '' || supplier_no == '') {

            if (supplier_describe == '') {

                layer.tips('请选择供应商！', '#supplier_describe');
            }
            if (supplier_no == '') {

                layer.tips('请选择供应商！', '#supplier_no');
            }
            return 0;
        }
        /*两个表格所有行获取*/
        var allTr = $('#purchaseTable1 tbody tr');
        var table2AllTr = $('#purchaseTable2 tbody tr');
        /*行状态判断*/
        for (var i = 0; i < allTr.length; i++) {

            /*td状态判断*/
            var allTd = allTr.eq(i).find('td');
            var td1 = allTd.eq(1).text();
            var td5 = allTd.eq(5).text();
            var td7 = allTd.eq(7).find('input').val();
            var storage = table2AllTr.eq(i).find('td').eq(5);
            if (td1 == '') {

                $('.mainOrder').click();
                layer.tips('请选择物料！', allTd.eq(1));
                return 0;

            }
            if (td5 == '') {

                $('.mainOrder').click();
                layer.tips('请填写数量！', allTd.eq(5));
                return 0;
            }
            /* if (td7 == '') {

             $('.mainOrder').click();
             layer.tips('请选择需求时间！', allTd.eq(7));
             return 0;
             }*/

            /*库房选择判断*/
            if ($('#storage').val() == '' && storage.text() == '') {

                /*首先切换选择项卡*/
                $('.grantOrder').click();
                layer.tips('请选择库房！', storage);
                return 0;

            }

        }

        return 1;
    }

    /*添加行方法*/
    function addTr() {

        try {

            /*判断上一行行号*/
            var rowLength = $('#purchaseTable1 tbody tr').length;
            var rowNo = 1;
            var hiddenRowNo = 1;
            var uuid = Math.uuidFast();
            if (rowLength != 0) {

                rowNo = parseInt($('#purchaseTable1 tbody tr:last td:first span:first').text()) + 1;
                hiddenRowNo = parseInt($('#purchaseTable1 tbody tr:last-child td:first-child span:last-child').text()) + 1;
            }
            /*新增行操作*/
            $('#purchaseTable1').append('<tr class="tr add">' +
                '<td class="text-center" style="width: 8%;padding: 0;height: 34px;"> ' +
                '<label class="col-nopadding radio-inline">' +
                '<input type="checkbox" class="checkBox"/>' +
                '<span>' + rowNo + '</span>' +
                '<span class="hiddenRowNo" style="display: none;">' + hiddenRowNo + '</span>' +
                '</label>' +
                '</td>' +
                '<td class="text-center materialSearch" style="width: 12%;padding: 0;"></td>' +
                '<td class="text-center" style="width: 15%;padding: 0;"></td>' +
                '<td class="text-center class" style="width: 10%;padding: 0;">货物</td>' +
                '<td class="text-center" style="width: 10%;padding: 0;"></td>' +
                '<td class="text-center num" style="width: 10%;padding: 0;"></td>' +
                '<td class="text-center unitPrice" style="width: 10%;padding: 0;">0</td>' +
                '<td class="text-center" style="width: 15%;padding: 0;">' +
                '<div class="col-md-9" style="padding: 0;">' +
                '<input class="form-control" style="padding: 0;" id="' + uuid + '" readonly/>' +
                '</div>' +
                '<div class="col-lg-3" style="padding: 0;">' +
                '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn"' +
                ' data-link-field="' + uuid + '"></span>' +
                '</div>' +
                '</td>' +
                '<td class="text-center brand" style="width: 10%;padding: 0;"></td>' +
                '<td style="display: none;"></td>' +
                '</tr>');

            $('#purchaseTable2').append('<tr class="tr">' +
                '<td class="text-center" style="width: 8%;padding: 0;height: 34px;"> ' +
                '<span>' + rowNo + '</span>' +
                '<span class="hiddenRowNo" style="display: none;">' + hiddenRowNo + '</span>' +
                '</td>' +
                '<td class="text-center" style="width: 17%;padding: 0;"></td>' +
                '<td class="text-center" style="width: 25%;padding: 0;"></td>' +
                '<td class="text-center" style="width: 18%;padding: 0;"></td>' +
                '<td class="text-center" style="width: 18%;padding: 0;"></td>' +
                '<td class="text-center storage" style="width: 14%;padding: 0;"></td>' +
                '</tr>');

            /*绑定日历选择器*/
            $('.calendarBtn').datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,    //选择日期后自动关闭
                pickerPosition: 'bottom-left',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd',
                minView: 'month'
            });
        } catch (e) {

            layer.msg(e.name + ':' + e.message);

        }

    }

    /*新增按钮事件监听*/
    $('#addTr').click(function () {

        /*添加之前进行采购员和供应商的检查 必须选择采购员和供应商*/
        if (requiredCheck($('#addTr')) == 1) {

            /*判断是否已审批*/
            var state = $('#state').val();
            if ('已审批' == state) {

                /*当前版本*/
                var version = Number($('#orderVersion').val()) + 1;
                /*版本加一*/
                $('#orderVersion').val(version);
                /*设置状态未审批*/
                $('#state').val('未审批');

            }

            /*添加行*/
            addTr();
        }

    });

    /*表格重新排序*/
    function reSort(orderState) {

        var table1 = $('#purchaseTable1 tbody tr');
        var table2 = $('#purchaseTable2 tbody tr');

        if (orderState == 'add') {

            for (var i = 0; i < table1.length; i++) {

                /*更新显示 和 隐藏的行号*/
                table1.eq(i).find('td:first label span:first').text(i + 1);
                table1.eq(i).find('td:first label span:last').text(i + 1);

                table2.eq(i).find('td:first span:first').text(i + 1);
                table2.eq(i).find('td:first span:last').text(i + 1);

            }

        } else if ('edit') {

            for (var i = 0; i < table1.length; i++) {

                /*只更新显示行号*/
                table1.eq(i).find('td:first label span:first').text(i + 1);

                table2.eq(i).find('td:first span:first').text(i + 1);

            }

        }

    }

    /*删除事件监听*/
    $('#deleteBtn').click(function () {

        try {

            if ($('#state').val() == '已审批') {

                layer.msg('不能操作已审批订单！');

            } else {

                /*获取选中的checkBox*/
                var checkedBox = $("input:checked[class='checkBox']");
                /*获取订单状态*/
                var orderState = $('#orderState').val();
                if (checkedBox.size() > 0) {

                    var deleteRow = layer.confirm('是否确认删除选中行？', {
                        btn: ['确认', '取消']
                    }, function () {

                        /*判断父页面不是采购订单汇总不需要删除后台*/
                        if (orderState == 'add') {

                            /*删除行*/
                            for (var i = 0; i < checkedBox.size(); i++) {

                                var rowNo = (checkedBox.eq(i).parent().find('span:first').text() - 1);
                                var tr = checkedBox.eq(i).parent().parent().parent();
                                /*如果父页面是自动创建页面取消对应页面行选中*/
                                if (pageName == 'autoCreate') {

                                    /*选中的申请checkbox*/
                                    var checkedApply = $("input:checked[class='checkBox']", parent.document);
                                    /*选中的申请行*/
                                    var checkedTr = checkedApply.parent().parent().parent();

                                    /*删除的行的申请号*/
                                    var applyNo = tr.find('td').eq(9).text();
                                    /*删除行的申请行号*/
                                    var applyLineNo = tr.find('td').eq(10).text();

                                    for (var j = 0; j < checkedTr.length; j++) {

                                        var checkedApplyNo = checkedTr.eq(j).find('td').eq(11).text();
                                        var checkedApplyLineNo = checkedTr.eq(j).find('td').eq(12).text();

                                        if (applyNo == checkedApplyNo && applyLineNo == checkedApplyLineNo) {

                                            checkedApply.eq(j).attr('checked', false);
                                            break;
                                        }

                                    }

                                }
                                tr.remove();
                                $('#purchaseTable2 tbody tr').eq(rowNo).remove();

                            }
                            /*重新排序*/
                            reSort('add');

                            layer.msg('删除行成功！');

                        } else if ('edit') {

                            /*删除数据封装 后台处理*/
                            for (var i = 0; i < checkedBox.size(); i++) {

                                var rowNo = (checkedBox.eq(i).parent().find('span:first').text() - 1);
                                var tr = checkedBox.eq(i).parent().parent().parent();
                                if (tr.hasClass('edit')) {

                                    tr.removeClass('edit');
                                    tr.addClass('delete');
                                    tr.css('display', 'none');
                                    $('#purchaseTable2 tbody tr').eq(rowNo).css('display', 'none');

                                } else {

                                    tr.remove();
                                    $('#purchaseTable2 tbody tr').eq(rowNo).remove();

                                }

                            }

                            /*重新排序*/
                            reSort('edit');
                            layer.msg('删除行成功！');

                        }

                    });
                } else {

                    var deleteOrder = layer.confirm('没有选择行，是否删除整个订单？', {
                        btn: ['确认', '取消']
                    }, function () {

                        /*判断父页面不是采购订单汇总不需要删除后台*/
                        if (orderState == 'add') {

                            layer.confirm('订单尚未保存！是否清空？', {
                                btn: ['确认', '取消']
                            }, function () {

                                /*清空题头信息*/
                                $('#buyer').val('');
                                $('#storage').val('');
                                $('#supplier_describe').val('');
                                $('#supplier_no').val('');
                                $('#createDate').val('');
                                /*表格数据清空*/
                                $('#purchaseTable1 tbody tr').remove();
                                $('#purchaseTable2 tbody tr').remove();

                                layer.msg('订单清除成功！');

                            });

                        } else if (orderState == 'edit') {

                            COMMON.WS.local('', 'get', {orderNo: orderNo}, true, function (data) {


                            });

                        }

                    });
                }

            }
        } catch (e) {

            layer.msg(e.name + ':' + e.message);
        }

    });

    /*保存方法*/
    function save(type) {

        try {

            /**
             * 查看是否添加了物料信息
             */
            if ($('#purchaseTable1 tbody tr').length <= 0) {

                layer.msg('请先添加物料！');

            } else {

                if ($('#orderState').val() == 'add') {

                    /*获取当前时间*/
                    var createDate = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                    /*设置创建时间*/
                    $('#createDate').val(createDate);
                }

                /*是否是根据申请创建*/
                var autoCreate = false;
                if ('autoCreate' == pageName) {

                    autoCreate = true;

                }

                /*订单数据封装*/
                var uploadVal = {};
                /*订单题头封装*/
                uploadVal.orderHead = {
                    autoCreate: autoCreate,
                    orderState: $('#orderState').val(),
                    username: hiddenName,
                    orderNo: $('#orderNo').val(),
                    orderVersion: $('#orderVersion').val(),
                    buyer: $('#buyer').val(),
                    type: $('#type').val(),
                    accept: $('#accept').val(),
                    storage: $('#storage').val(),
                    supplierDescribe: $('#supplier_describe').val(),
                    supplierNo: $('#supplier_no').val(),
                    state: $('#state').val(),
                    createDate: $('#createDate').val()
                };
                /*订单行封装*/
                uploadVal.orderRow = new Array();
                /*获取所有订单行*/
                var rowTable1 = $('#purchaseTable1 tbody tr');
                var rowTable2 = $('#purchaseTable2 tbody tr');
                /*行数据封装*/
                for (var i = 0; i < rowTable1.length; i++) {

                    var td = rowTable1.eq(i).find('td');
                    var tdTable2 = rowTable2.eq(i).find('td');

                    /*默认行状态是添加（add）*/
                    var rowState = 'add';
                    /*如果是编辑订单*/
                    if (rowTable1.eq(i).hasClass('edit')) {

                        rowState = 'edit';
                    }
                    /*如果是订单行删除了*/
                    if (rowTable1.eq(i).hasClass('delete')) {

                        rowState = 'delete';
                    }

                    /*接受数量 取消数量*/
                    var acceptNumber = tdTable2.eq(3).text();
                    var cancelNumber = tdTable2.eq(4).text();

                    if (acceptNumber == '') {

                        acceptNumber = 0;
                    }
                    if (cancelNumber == '') {

                        cancelNumber = 0;
                    }
                    /*需求时间 获取*/
                    var needTime = '';
                    if (td.eq(7).find('input').length > 0) {

                        needTime = td.eq(7).find('input').val();

                    } else {

                        needTime = td.eq(7).text();
                    }

                    /*接受库房*/
                    var storage = tdTable2.eq(5).text();
                    if (storage == '') {

                        storage = $('#storage').val();
                    }

                    var row = {
                        rowState: rowState,
                        rowNo: td.eq(0).find('.hiddenRowNo').text(),
                        materialNo: td.eq(1).text(),
                        materialExplain: td.eq(2).text(),
                        materialClass: td.eq(3).text(),
                        unit: td.eq(4).text(),
                        number: td.eq(5).text(),
                        unitPrice: td.eq(6).text(),
                        needTime: needTime,
                        brand: td.eq(8).text(),
                        acceptNumber: acceptNumber,
                        cancelNumber: cancelNumber,
                        storage: storage
                    };
                    /*如果是根据申请创建 添加申请编号 和 申请行号*/
                    if (autoCreate) {

                        row.requisitionNo = td.eq(10).text();
                        row.requisitionRowNo = td.eq(11).text();
                    }

                    /*行信息添加*/
                    uploadVal.orderRow.push(row);

                }
                /*JSON转换*/
                var uploadJson = JSON.stringify(uploadVal);
                COMMON.WS.restful('purchaseOrder/saveOrder', 'post', uploadJson, true, function (data) {

                    if (data.result == 'success') {

                        /*设置订单号*/
                        $('#orderNo').val(data.orderNo);

                        layer.msg(type + '成功！');
                        /*锁定采购员和供应商*/
                        $('#buyer').attr('readonly', true);
                        $('#supplier_describe').attr('readonly', true);
                        /*如果父页面是自动创建页面 保存成功后删除申请行信息*/
                        if (pageName == 'autoCreate') {

                            /*获取父页面选中行 获取申请号和行号信息*/
                            var checkedTr = $("input:checked[class='checkBox']", parent.document).parent().parent().parent();
                            /*删除申请行*/
                            checkedTr.remove();
                        }
                        /**
                         * 发送立体库
                         */


                    } else {

                        layer.msg(type + '失败！' + data.result);
                    }

                });

            }

        } catch (e) {

            layer.msg(e.name + ':' + e.message);

        }

    }

    /*保存按钮事件监听*/
    $('#saveBtn').click(function () {

        if (requiredCheck($('#saveBtn')) == 1) {

            save('保存');
        }

    });
    /*审批按钮click事件监听*/
    $('#approveBtn').click(function () {

        if (requiredCheck($('#approveBtn')) == 1) {

            if ($('#purchaseTable1 tbody tr').length <= 0) {

                layer.msg('请先添加物料！');

            } else {

                /*审批之前判断单价 以及数量是否合法*/
                var tr = $('#purchaseTable1 tbody tr');
                for (var i = 0; i < tr.length; i++) {

                    var unitPriceTd = tr.eq(i).find('td').eq(6);
                    var numberTd = tr.eq(i).find('td').eq(5);
                    var number = Number(numberTd.text());
                    var unitPrice = Number(unitPriceTd.text());
                    if (unitPrice <= 0) {

                        layer.tips('请输入正确的单价！', unitPriceTd);
                        return;
                    }
                    if (number <= 0) {

                        layer.tips('请输入正确的数量！', numberTd);
                        return;
                    }

                }
                /*修改状态为 已审批*/
                $('#state').val('已审批');

                /*采购订单题头设置修改过后的题头信息*/
                if (pageName == 'purchaseOrderHead') {

                    $('.choose', parent.document).eq(6).text('已审批');

                    /*设置修改过后的行信息*/
                } else if (pageName == 'purchaseOrderRow') {

                    

                }

                save('审批');

            }

        }

    });

    /*重置按钮click事件监听*/
    $('#resetBtn').click(function () {

        try {

            $('input[type=reset]').trigger('click');//触发reset按钮
            $('#purchaseTable1 tbody tr').remove();
            $('#purchaseTable2 tbody tr').remove();
            layer.msg('重置成功！');

        } catch (e) {

            layer.msg('重置失败！' + e.getText());

        }

    });

    /*父页面是主页面*/
    if (pageName == 'mainPage') {

        /*订单类型*/
        $('#type').val('采购订单');

    }

    /*父页面是自动创建页面*/
    if (pageName == 'autoCreate') {

        try {
            /*隐藏添加行*/
            $('#addTr').remove();
            /*获取父页面选中的行*/
            var checkedApplication = $("input:checked[class='checkBox']", parent.document);
            for (var i = 0; i < checkedApplication.size(); i++) {

                /*添加一行*/
                addTr();
                /*获取最后一样对象*/
                var lastTr = $('#purchaseTable1 tbody tr:last');
                var purchaseTable1LastTr = $('#purchaseTable1 tbody tr:last').find('td');
                var purchaseTable2LastTr = $('#purchaseTable2 tbody tr:last').find('td');
                /*数据填充*/
                var checkedTr = checkedApplication.eq(i).parent().parent().parent();
                var allTd = checkedTr.find('td');
                var materialNo = allTd.eq(1).text();
                var materialDescribe = allTd.eq(3).text();
                var unit = allTd.eq(4).text();
                var storage = allTd.eq(5).text();
                var num = allTd.eq(2).text();
                var unitPrice = allTd.eq(6).text();
                var needTime = allTd.eq(9).text().split(' ')[0];
                var brand = allTd.eq(7).text();
                var supplier = allTd.eq(8).text();
                var supplierNo = allTd.eq(10).text();
                /*申请号*/
                var requisitionNo = allTd.eq(11).text();
                /*申请行号*/
                var requisitionRowNo = allTd.eq(12).text();

                /*供应商 供应商编号*/
                /*  $('#supplier_describe').val(supplier);
                 $('#supplier_no').val(supplierNo);*/
                /*表格1数据填充*/
                purchaseTable1LastTr.eq(1).text(materialNo);
                purchaseTable1LastTr.eq(2).text(materialDescribe);
                purchaseTable1LastTr.eq(3).text('货物');
                purchaseTable1LastTr.eq(4).text(unit);
                purchaseTable1LastTr.eq(5).text(num);
                purchaseTable1LastTr.eq(6).text(unitPrice);
                purchaseTable1LastTr.eq(7).text(needTime);
                purchaseTable1LastTr.eq(8).text(brand);
                /*申请号添加*/
                lastTr.append('<td style="display: none;">' + requisitionNo + '</td>');
                /*申请行号添加*/
                lastTr.append('<td style="display: none;">' + requisitionRowNo + '</td>');

                /*表格2数据填充*/
                purchaseTable2LastTr.eq(1).text(materialNo);
                purchaseTable2LastTr.eq(2).text(materialDescribe);
                purchaseTable2LastTr.eq(5).text(storage);

                /*物料单价和接收数量、取消数量查询*/

            }

        } catch (e) {

            layer.msg(e.name + ':' + e.message);

        }

    }


    /*父页面是采购订单汇总题头或者采购订单汇总行*/
    if (pageName == 'purchaseOrderHead' || pageName == 'purchaseOrderRow') {

        var orderHeadTd = $('.choose td', parent.document);
        var orderNo = orderHeadTd.eq(0).text();

        /*修改订单状态为编辑*/
        $('#orderState').val('edit');

        COMMON.WS.local('purchaseOrder/getOrderByOrderNo', 'post', {orderNo: orderNo}, true, function (data) {

            var orderHead = data.orderHead[0][0];
            var orderRowArray = data.orderRow[0];

            /**
             * 订单题头信息设置
             */
            /*订单号设置*/
            $('#orderNo').val(orderHead.orderNo);
            /*订单版本*/
            $('#orderVersion').val(orderHead.versionNo);
            /*采购员*/
            $('#buyer').prop('readonly', true);
            $('#buyer').val(orderHead.buyer);
            /*库房编号*/
            $('#storage').val(orderHead.storageRoomNo);
            /*供应商名*/
            $('#supplier_describe').prop('readonly', true);
            $('#supplier_describe').val(orderHead.supplier);
            /*供应商编号*/
            $('#supplier_no').val(orderHead.supplierCode);
            /*订单状态*/
            $('#state').val(orderHead.state);
            /*创建时间*/
            $('#createDate').val(orderHead.buildTime);

            /**
             * 订单行信息设置
             */
            for (var i = 0; i < orderRowArray.length; i++) {

                var dataRow = orderRowArray[i];
                $('#addTr').click();

                var tr = $('#purchaseTable1 tbody tr:last');

                tr.removeClass('add');
                tr.addClass('edit');

                var mainLastTr = $('#purchaseTable1 tbody tr:last td');
                var dispatchLastTr = $('#purchaseTable2 tbody tr:last td');

                mainLastTr.eq(1).text(dataRow.materialNo);
                mainLastTr.eq(2).text(dataRow.materialDescribe);
                mainLastTr.eq(3).text(dataRow.lineClass);
                mainLastTr.eq(4).text(dataRow.unit);
                mainLastTr.eq(5).text(dataRow.deliveryNumber);
                mainLastTr.eq(6).text(dataRow.unitPrice);
                mainLastTr.eq(7).find('div:first input').val(dataRow.demandTime.split(' ')[0]);
                mainLastTr.eq(8).text(dataRow.brand);
                mainLastTr.eq(9).text(dataRow.lineNo);

                dispatchLastTr.eq(1).text(dataRow.materialNo);
                dispatchLastTr.eq(2).text(dataRow.materialDescribe);
                dispatchLastTr.eq(3).text(dataRow.acceptedNumber);
                dispatchLastTr.eq(4).text(dataRow.cancleNumber);
                dispatchLastTr.eq(5).text(dataRow.storageRoomNo);

            }


        });

    }

    return {
        'init': init
    }
});