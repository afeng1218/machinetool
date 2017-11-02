/**
 * Created by SunJun on 2016/3/22.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

    var pIndex = parent.layer.getFrameIndex(window.name); //获取窗口索引
    /*父页面name*/
    var pageName = $('#pageName', parent.document).val();
    /*爷爷页面*/
    var ppPageName = $('#pageName', parent.parent.document).val();
    //日期
    function current() {
        var d = new Date(), str = '';
        str += d.getFullYear() + '-'; //获取当前年份
        str += d.getMonth() + 1 + '-'; //获取当前月份（0——11）
        str += d.getDate() + ' ';
        str += d.getHours() + ':';
        str += d.getMinutes() + ':';
        str += d.getSeconds();
        return str;
    }
    /*物料查询*/
    function materialSearch() {

        /*物料查询按钮显示*/
        $(document).on('click', '.tr', function (e) {

            $('.viewSearchBtn .materialSearch').css('display', 'none');
            $(e.target).find('.materialSearch').css('display', '');

        });

        /*物料选择按钮click事件监听*/
        $(document).on('click', '.materialSearch', function (e) {

            /*弹出查询界面之前隐藏按钮*/
            $(e.target).css('display', 'none');
            /*添加标识 先去除所有标识*/
            var tr = $(e.target).parent().parent();
            /*去除edit标志*/
            $('.edit').removeClass('edit');
            /*当前编辑行添加标签*/
            tr.addClass('edit');

            layer.open({
                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: ['material_search.html']
            });
        });

        /*供应商查询*/
        /* COMMON.WS.local('purchaseRequisition/getSupplier', 'get', '', true, function (data) {

         for (var i = 0; i < data.length; i++) {

         if (0 == i) {

         $('#supplier input').eq(0).val(data[i].supplierCode);
         $('#supplier input').eq(1).val(data[i].supplier);
         }
         $('#supplier ul').append('' +
         '<li>' +
         '<input type="hidden" value="' + data[i].supplierCode + '"/>' +
         '<span>' + data[i].supplier + '</span>' +
         '</li>'
         );
         }
         $('#supplier').click(function () {

         $('#supplier ul').toggle();
         $('#supplier ul li').click(function () {

         var v = $(this);

         if (v == $('#supplier ul li span')) {

         $('#supplier input').eq(0).val(v.parent().find('input').val());
         $('#supplier input').eq(1).val(v.parent().find('span').html());
         } else {

         $('#supplier input').eq(0).val(v.find('input').val());
         $('#supplier input').eq(1).val(v.find('span').html());
         }


         });


         });

         });*/

    }

    /*初始化addTr click事件绑定*/
    function addTrFunction(state) {

        var trState = 'add';
        if (state != undefined) {

            trState = state;
        }

        var num = 1;
        var numHidden = 1;
        var uuid = Math.uuidFast();
        var defaultStorage = '';
        if (pageName == 'mainPage') {

            defaultStorage = $('#hiddenDefaultStorage', parent.document).val();
        }
        if (pageName == 'purchaseRequisitionHead') {

            defaultStorage = $('#hiddenDefaultStorage', parent.parent.parent.document).val();
        }

        if ($('#purchaseTable tbody tr').length > 0) {

            num = parseInt($('#purchaseTable tbody tr:last td:first label span').eq(0).html()) + 1;
            numHidden = parseInt($('#purchaseTable tbody tr:last td:first label span:last-child').html()) + 1;
        }
        $('#purchaseTable tbody').append(' <tr class="tr ' + trState + '">' +
            '<td style="padding: 0;width: 7%;">' +
            '<label class="radio-inline"    style="padding-top: 5px;padding-left:0px;padding-right: 3px;">    ' +
            '<input class="trCheck" type="checkbox"/> ' +
            '<span>' + num + '</span>' +
            '<span style="display: none;">' + numHidden + '</span>' +
            '</label>' +
            '</td>' +
            '<td class="viewSearchBtn" style="padding: 0;width: 10%;" >' +
            '<span class="glyphicon glyphicon-search materialSearch" style="display: none;cursor: pointer;"/>' +
            '</td>' +
            '<td style="padding: 0;width: 10%;"></td>' +
            '<td style="padding: 0;width: 15%;"></td>' +
            '<td style="padding: 0;width: 5%;"></t>' +
            '<td style="padding: 0;width: 8%;"></td>' +
            '<td style="padding: 0;width: 9%;" ></td>' +
            '<td style="padding: 0;width: 15%;">' +
            '<div class="col-md-9" style="padding: 0;">' +
            '<input class="form-control" style="padding: 0;" id="' + uuid + '" value="'+current()+'" v readonly/>' +
            '</div>' +
            '<div class="col-lg-3" style="padding: 0;">' +
            '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn"' +
            ' data-link-field="' + uuid + '"></span>' +
            '</div>' +
            '</td>' +
            '<td style="padding: 0;width: 7%;"></td>' +
            '<td style="padding: 0;width: 7%;"></td>' +
            '<td style="padding: 0;width: 7%;"></td>' +
            '<td style="display: none;"></td>' +
            '<td style="display: none;"></td>' +
            '<td style="display: none;"></td>' +
            '<td style="display: none;">要需批审</td>' +
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
    }

    /*打开申请*/
    function openApplication(no, account, accountAuthority) {

        var pageName = COMMON.HELP.getPageName() + '.html';

        /*设置申请为编辑*/
        $('#purchaseState').val('edit');

        /*获取账号审批权限*/
        if ('否' == accountAuthority) {

            $('#approveBtn').remove();
        }
        /*设置编号 编制人*/
        $('#no').val(no);
        $('#editPerson').val(account);

        /*获取账号页面权限 和 申请行信息*/
        var uploadVal = {
            'no': no,
            'account': account,
            'pageName': pageName
        };
        COMMON.WS.local('purchaseRequisition/getPageAuthorityAndRequisitionRow', 'get', uploadVal, true, function (data) {

            /*账号 修改保存权限*/
            var authority = data[0].authority;
            if (authority == 0) {

                $('#deleteBtn').remove();
                $('#saveBtn').remove();
            }

            /*设置题头信息*/
            var head = data[1].head[0];
            $('#explain').val(head.explaining);

            /*清空table 设置行信息*/
            $('#purchaseTable tbody tr').remove();
            for (var i = 0; i < data[2].row.length; i++) {

                var row = data[2].row[i];
                /*添加行*/
                if ($('#purchaseState').val() == 'edit') {

                    addTrFunction('edit');

                } else {

                    addTrFunction('add');
                }

                var lastTr = $('#purchaseTable tbody tr:last-child td');
                lastTr.eq(0).find('span:last-child').text(row[0].id.lineNo);
                lastTr.eq(1).prepend('<span class="no">' + row.materialNo + '</span>');
                lastTr.eq(2).text(row[0].brand);
                lastTr.eq(3).text(row.materialDescribe);
                lastTr.eq(4).text(row.unit);
                lastTr.eq(5).text(row[0].number);
                lastTr.eq(6).text(row.storageRoomNo);
                lastTr.eq(7).find('input').val(COMMON.LOCAL_DATE.getLocalDate(row[0].demandTime));
                lastTr.eq(8).text(row[0].lastMonthConsumption);
                lastTr.eq(9).text(row[0].currentInventory);
                lastTr.eq(10).text(row[0].allInventory);
                /*供应商这里暂时不处理 TODO 供应商后台创建订单时再处理*/
                lastTr.eq(12).text(row.storageRoomDescribe);
                lastTr.eq(13).text(row[0].applicant);
                lastTr.eq(14).text('需要审批');
            }
        });
    }

    function init() {

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
         * 设置审批权
         */
        var orderApprovalAuthority = COMMON.ECODE.Base64.decode($.cookie('orderApprovalAuthority'));
        if (orderApprovalAuthority == '否') {

            $('#approveBtn').remove();
        }
        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置订单状态*/
        if ('purchaseRequisitionHead' == pageName || 'purchaseRequisitionRow' == pageName) {

            /*设置状态为编辑*/
            $('#purchaseState').val('edit');
        }

        /*table 上一层div css设置*/
        $('#purchaseTable').parent().css('height', screen.height / 3);
        $('#purchaseTable').parent().css('overflow-y', 'scroll');

        /*添加行按钮监听*/
        $(document).on('click', '#addTr', function () {

            if ($('.tr').length > 0) {

                /*判断最后一行是否编辑完成*/
                var lastTr = $('.tr:last');
                if (lastTr.find('td').eq(1).find('span:first').hasClass('materialSearch')) {

                    layer.tips('请选择物料！', lastTr.find('td').eq(1), {
                        time: 1000
                    });
                } else if (lastTr.find('td').eq(5).text() == '') {

                    layer.tips('请输入数量！', lastTr.find('td').eq(5), {
                        time: 1000
                    });
                } else if (lastTr.find('td').eq(7).find('div:first-child').find('input').val() == '') {

                    layer.tips('请选择需求时间！', lastTr.find('td').eq(7).find('div:first-child').find('input'), {
                        time: 1000
                    });
                } else {

                    addTrFunction();

                }


            } else {

                addTrFunction();
            }
        });

        /*绑定日期选择器*/
        $('.calendarBtn').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd',
            minView: 'month'
        });


        /*input 失去焦点事件*/
        $(document).on('blur', '#input', function () {

            var input = $('#input');
            if (input.hasClass('storage')) {

                $('.storageEdit').removeClass('storageEdit');
                input.parent().parent().addClass('storageEdit');

                /*判断是否存在*/
                if (input.val().indexOf('%') == -1 && input.val() != '') {

                    /*查看库房是否存在*/
                    var searchVal = {
                        /*是否弹出页面 如果是false 则直接返回查询结果*/
                        popMenu: false,
                        /*查詢條件*/
                        searchValue: input.val(),
                        /*查询表实体类*/
                        searchTable: 'CStorageRoomDefinition',
                        /*查询哪几列数据*/
                        searchCol: 'storageRoomNo,storageRoomDescribe,principalCustodian',
                    };
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                        if (data == '' || data == null) {

                            layer.tips('请输入正确的库房编号！', input);
                            /*重新获取焦点*/
                            input.focus();

                        } else {

                            input.parent().html(input.val());

                        }
                    });

                } else {

                    input.parent().html('');

                }

            } else {

                input.parent().html(input.val());
            }
        });

        /*行选择事件*/
        $(document).on('click', '.tr', function (e) {

            var v = $(e.target);
            var p = $(e.target).parent();

            /*如果点击的是tr*/
            if (v.is('td')) {

                /*设置所有数量 库房编号*/
                $('.number').parent().html($('.number').val());
                $('.storageNo').parent().html($('.storageNo').val());

                /*判断库房是否人为修改 库房必须通过库房选择*/
                if ($('.errorStorageNo').length > 0) {

                    layer.tips('请选择正确库房！', $('.errorStorageNo'), {
                        time: 1000
                    });
                    return;
                }

                var tdNumber = p.find('td').eq(5);
                var tdStorage = p.find('td').eq(6);

                /*如果选择的是数量或者库房*/
                if (v.is(tdNumber) || v.is(tdStorage)) {

                    if (v.is(tdNumber)) {

                        v.html('<input id="input" type="number" class="form-control number" min="1" value="' + v.text() + '"/>');
                        $('.number').focus();

                    } else {

                        v.html('<input id="input" class="form-control storageNo storage" value="' + v.text() + '"/>');
                        /*获取焦点*/
                        $('.storage').focus();

                        /*库房input enter事件监听*/
                        $('.storage').keydown(function (e) {

                            if (e.keyCode == '13') {

                                var searchVal = {
                                    /*是否弹出页面 如果是false 则直接返回查询结果*/
                                    popMenu: true,
                                    /*查詢條件*/
                                    searchValue: $('.storage').val(),
                                    /*查询条件是否可编辑*/
                                    readonly: false,
                                    /*查询表实体类*/
                                    searchTable: 'CStorageRoomDefinition',
                                    /*查询哪几列数据*/
                                    searchCol: 'storageRoomNo,storageRoomDescribe,principalCustodian',
                                    /*自定义显示前两列列名 必须和查询列实体类列名前两列对应*/
                                    colName: '库房编号,库房描述'
                                };
                                /*库房查询双击事件回调函数*/
                                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                                    var storage = $('.storageEdit').find('td').eq(6);

                                    /*显示库房描述*/
                                    $('#destination').val(result.storageRoomDescribe);
                                    /*显示申请人（保管员）*/
                                    $('#applicant').val(result.principalCustodian);

                                    /*隐藏库房描述设置*/
                                    storage.parent().find('td').eq(12).text(result.storageRoomDescribe);
                                    /*隐藏库房保管员设置*/
                                    storage.parent().find('td').eq(13).text(result.principalCustodian);

                                    /*判断是否选择了物料 设置当前库存*/
                                    var no = storage.parent().find('.no');
                                    if ('' == no.text() || 0 == no.length) {

                                        storage.parent().find('td').eq(9).text(0);

                                        /*设置库房编号*/
                                        storage.html(result.storageRoomNo);

                                    } else {

                                        var uploadVal = {
                                            'materialNo': no.text(),
                                            'storageNo': result.storageRoomNo
                                        };
                                        COMMON.WS.local('purchaseRequisition/getCurrentConsumption', 'get', uploadVal, true, function (data) {

                                            storage.parent().find('td').eq(9).text(data.currentConsumption);

                                            /*设置库房编号*/
                                            storage.html(result.storageRoomNo);

                                        });
                                    }


                                });


                            } else {

                                /*监听库房值修改*/
                                $('.storage').addClass('errorStorageNo');
                                $('.storage').removeClass('storageNo');
                            }

                        });
                    }

                }
                /*如果选择是其他td*/
                else {

                    if (p.css('background-color') == 'rgb(255, 255, 255)') {

                        /*所有行颜色设置白色*/
                        $('.tr').css('background-color', '#FFFFFF');
                        /*设置当前行颜色*/
                        p.css('background-color', '#EEEEEE');
                        /*checkbox选择*/
                        p.find('.trCheck').prop('checked', true);

                    } else {

                        p.css('background-color', '#FFFFFF');
                        /*checkbox选择*/
                        p.find('.trCheck').prop('checked', false);

                    }
                    /*设置供应商 目的地 申请人信息*/
                    $('#supplier').val(p.find('td').eq(11).html());
                    $('#destination').val(p.find('td').eq(12).html());
                    $('#applicant').val(p.find('td').eq(13).html());
                }

            }

        });

        /*物料查询事件绑定*/
        materialSearch();


        /**
         * 删除已有申请
         */
        function deletePurchase() {

            /*删除已有申请*/
            var uploadVal = {
                'requisitionNo': $('#no').val()
            };
            COMMON.WS.local('purchaseRequisition/deleteRequisition', 'get', uploadVal, true, function (data) {

                if (data.result == 'true') {

                    /*判断父页面是题头还是行 删除表格申请行*/
                    if ('purchaseRequisitionHead' == pageName) {

                        /*删除选中行*/
                        $('.choose', parent.document).remove();
                    }
                    if ('purchaseRequisitionRow' == pageName) {

                        /*删除tbody*/
                        $('#rowTable tbody', parent.document).remove();
                    }
                    if ('purchaseRequisitionHead' == ppPageName) {

                        /*删除选中行*/
                        $('.choose', parent.parent.document).remove();
                    }
                    layer.msg('删除成功！');

                    parent.layer.close(pIndex);


                } else {

                    layer.msg('删除失败！');
                }

            });

        }

        /*删除按钮事件监听*/
        $('#deleteBtn').click(function () {

            /*已审批申请 重新编辑审批订单 不能进行删除操作*/
            var edit = $('#purchaseState').val();

            if ('已审批' == $('#state').val()) {

                layer.msg('不能操作已审批申请！');

            } else {

                /*判断是否选中申请行*/
                var flag = 0;
                var allTr = $('#purchaseTable tbody tr');
                for (var i = 0; i < allTr.length; i++) {

                    if (allTr.eq(i).find('td label input').prop('checked') == true) {

                        flag = 1;
                        break;
                    }
                }
                /*有选择申请号*/
                if (1 == flag) {

                    layer.confirm('是否确认删除选中行？', {

                        btn: ['删除行', '取消'] //按钮

                    }, function () {

                        /*这里进行删除行操作*/
                        try {

                            var flag = 0;
                            var checkedTr = $('.trCheck');
                            var length = $('.trCheck').length;
                            for (var i = 0; i < length; i++) {

                                var checkable = checkedTr.eq(i);
                                if (checkable.prop('checked') == true) {

                                    var removeTr = checkable.parent().parent().parent();
                                    /*判断是否是最后一个*/
                                    if (removeTr != $('#purchaseTable tbody tr:last')) {

                                        flag = 1;
                                    }

                                    var tr = checkable.parent().parent().parent();

                                    /*删除行*/
                                    tr.remove();

                                }
                            }
                            /**
                             * 行号编码
                             */
                            if (1 == flag) {

                                var allTr = $('#purchaseTable tbody tr');
                                var reLength = $('#purchaseTable tbody tr').length;
                                for (var i = 0; i < reLength; i++) {

                                    allTr.eq(i).find('td:first-child label').children().eq(1).html(i + 1);
                                }
                            }

                            layer.msg('删除行成功！');

                        } catch (e) {

                            layer.msg("An exception occured in the script.Error name: " + e.name
                                + " script.Error message: " + e.message);
                        }

                    });

                } else {

                    layer.confirm('是否删除申请？', {

                        btn: ['删除申请', '取消']

                    }, function () {

                        /*判断采购申请有木有保存*/
                        var purchaseState = $('#purchaseState').val();
                        /*是一个新增的申请 尚未保存*/
                        if ('add' == purchaseState) {

                            layer.confirm('申请尚未保存，是否重新编辑申请？', {

                                btn: ['确认', '取消']

                            }, function () {

                                try {

                                    /*清空表格和输入框内容*/
                                    $('#explain').val('');
                                    $('#purchaseTable tbody tr').remove();
                                    $('#destination').val('');
                                    $('#source').val();
                                    $('#applicant').val();
                                    $('#supplier').val();

                                    layer.msg('删除成功！');

                                } catch (e) {

                                    layer.msg("An exception occured in the script.Error name: " + e.name
                                        + " script.Error message: " + e.message);
                                }

                            });

                        } else {

                            /*删除已有申请*/
                            deletePurchase();
                        }

                    });
                }

            }
        });

        /*保存数据封装*/
        function save(type) {

            /*这里进行保存操作*/
            var uploadValue = new Array();
            var rowValue = new Array();
            var isAdd = 1;
            if ($('#purchaseState').val().trim() != 'add') {

                isAdd = 0;
            }
            uploadValue.push({
                'isAdd': isAdd
            });
            /*如果是审批操作*/
            if ('审批' == type) {

                $('#state').val('已审批');
            }

            /*题头数据封装*/
            uploadValue.push({
                'no': $('#no').val(),
                'type': $('#type').val(),
                'editPerson': $('#editPerson').val(),
                'explain': $('#explain').val(),
                'state': $('#state').val(),
            });

            /*如果是申请题头 修改申请题头信息*/
            if ('purchaseRequisitionHead' == pageName) {

                var chooseTd = $('.choose td', parent.document);
                chooseTd.eq(1).text($('#explain').val());
                chooseTd.eq(4).text($('#state').val());
            }

            /*获取所有行 进行行数据封装*/
            var allTr = $('#purchaseTable tbody tr');

            /*行数据封装*/
            var flag = 0;
            var row = 0;
            for (var i = 0; i < allTr.length; i++) {

                if (!allTr.eq(i).find('td').eq(1).find('span:first-child').hasClass('materialSearch') && !allTr.eq(i).hasClass('delete')) {

                    flag = 1;
                    row += 1;
                    var allTd = allTr.eq(i).find('td');
                    var brand;
                    if (allTd.eq(2).find('div').length > 0) {

                        brand = allTd.find('div button span:first-child').html();

                    } else {

                        brand = allTd.eq(2).text();
                    }
                    /*申请行数据上传*/
                    var row = {
                        'row': allTd.eq(0).find('span:first').text(),
                        'materialNo': allTd.eq(1).children('span').text(),
                        'brand': brand,
                        'explain': allTd.eq(3).text(),
                        'unit': allTd.eq(4).text(),
                        'num': allTd.eq(5).text(),
                        'storageRoom': allTd.eq(6).text(),
                        'needDate': allTd.eq(7).find('div:first-child input').val(),
                        'lastMonthConsume': allTd.eq(8).text(),
                        'currentInventory': allTd.eq(9).text(),
                        'allInventory': allTd.eq(10).text(),
                        'state': $('#state').val(),
                        'destination': allTd.eq(12).text(),
                        'applicant': allTd.eq(13).text(),
                        'haveApprover': 0,
                        'approver': '',
                    };
                    if ('审批' == type && ('purchaseRequisitionHead' == pageName || 'purchaseRequisitionRow' == pageName)) {

                        var approver = $('#hiddenName', parent.parent.parent.document).val();
                        row.haveApprover = 1;
                        row.approver = approver;
                    }
                    rowValue.push(row);

                }
            }
            if (1 == flag) {

                /*行信息保存*/
                uploadValue.push({
                    'rowValue': rowValue
                });
                var uploadJson = JSON.stringify(uploadValue);
                COMMON.WS.restful('purchaseRequisition/saveRequisition', 'post', uploadJson, true, function (data) {

                    if ('true' == data.result) {

                        if ('审批' == type) {

                            layer.msg('审批成功！');

                        } else {

                            layer.msg('保存成功！');

                        }
                        /*保存成功修改申请状态为修改*/
                        $('#purchaseState').val('edit');
                        /*设置申请编号*/
                        $('#no').val(data.applicationNo);

                    } else if ('exist' == data.result) {

                        layer.msg('申请已存在！');
                    } else {

                        if ('审批' == type) {

                            $('#state').val('需要审批');
                            layer.msg('保存失败！' + data.result);

                        } else {

                            layer.msg('保存失败！' + data.result);

                        }
                    }

                });

            } else {

                if ('审批' == type) {

                    layer.msg('审批前请先添加物料信息！');

                } else {

                    layer.msg('保存前请先添加物料信息！');

                }
            }

        }

        /*save check*/
        function saveCheck(type) {

            /*保存的时候判断有没有申请行数据*/
            var pageState = $('#purchaseState').val();
            var allTr = $('#purchaseTable tbody tr');

            if (allTr.length <= 0 && pageState == 'add') {

                layer.msg('请先添加物料！');
                return;

            } else if (allTr.length <= 0 && pageState == 'edit') {

                layer.confirm('该申请已没有申请行！是否删除该申请？', {
                    btn: ['确认', '取消']
                }, function () {

                    /*删除已有申请*/
                    deletePurchase();
                });

            }
            /*这里判断有没有添加申请行*/
            for (var i = 0; i < allTr.length; i++) {

                var material = allTr.eq(i).find('td').eq(1);
                var num = allTr.eq(i).find('td').eq(5);
                var date = allTr.eq(i).find('td').eq(7).find('div:first-child input');
                /*提示选择物料*/
                if (material.find('span:first').hasClass('materialSearch')) {

                    layer.tips('请选择物料！', material, {
                        time: 1000
                    });
                    return;
                }
                /*提示输入数量*/
                if ('' == num.text()) {

                    layer.tips('请输入数量！', num, {
                        time: 1000
                    });
                    return;
                }
                /*提示需求时间*/
                if ('' == date.val()) {

                    /*关闭询问框*/
                    layer.tips('请选择需求时间！', date, {
                        time: 1000
                    });
                    return;
                }
            }

            layer.confirm('是否确认' + type + '?', {
                btn: ['确认', '取消']
            }, function () {

                /*保存*/
                save(type);
            });
        }

        /*保存事件监听*/
        $('#saveBtn').click(function () {

            /*判断该申请时添加申请还是申请编辑*/
            var purchaseState = $('#purchaseState').val();

            var state = $('#state input').val();
            /*如果是已审批申请不能保存*/
            if ('已审批' == $('#state').val()) {

                layer.msg('不能操作已审批申请！');

            } else {

                /*这里判断有没有添加申请行和保存操作*/
                saveCheck('保存');

            }

        });

        /*审批按钮监听*/
        $('#approveBtn').click(function () {

            if ($('#state').val() == '已审批') {

                layer.msg('不能操作已审批申请！');

            } else {

                /*这里判断有没有添加申请行和保存操作*/
                saveCheck('审批');

            }

        });

        /*父页面不是申请题头和行 就绑定 重置按钮click事件监听*/
        if ('purchaseRequisitionHead' != pageName && 'purchaseRequisitionRow' != pageName) {

            $('#resetBtn').click(function () {

                try {

                    $('input[type=reset]').trigger('click');//触发reset按钮
                    $('#purchaseTable tbody tr').remove();
                    /*设置编制人信息获取*/
                    $('#editPerson').val($('#hiddenName', parent.document).val());
                    layer.msg('重置成功！');

                } catch (e) {

                    console.log(e.message);
                    layer.msg(e.message);
                }

            });

        }

        /*checkbox click监听*/
        $('#checkAll').change(function () {

            if ($('#checkAll').prop('checked') == true) {

                $('.trCheck').prop('checked', true);

            } else {

                $('.trCheck').prop('checked', false);

            }
        });

    }


    /*父页面是主页面*/
    if ('mainPage' == pageName) {

        /*生成申请编号*/
        /* COMMON.WS.local('purchaseRequisition/getRequisitionNo', 'get', '', true, function (data) {

         $('#no').val(data.requisitionNo);
         });*/
        /*设置编制人信息获取*/
        $('#editPerson').val($('#hiddenName', parent.document).val());
        /*获取账号审批权限*/
        var accountAuthority = $('#hiddenApprovalAuthority', parent.document).val();
        if ('否' == accountAuthority) {

            /*显示审批按钮*/
            $('#approveBtn').remove();
        }

    }


    /*父页面是采购申请题头页面*/
    if ('purchaseRequisitionHead' == pageName) {

        var allTd = $('.choose td', parent.document);
        var no = allTd.eq(0).text();
        var account = $('#hiddenName', parent.parent.parent.document).val();
        var accountAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.document).val();

        openApplication(no, account, accountAuthority);

    }


    /*父页面是采购申请行*/
    if ('purchaseRequisitionRow' == pageName) {

        var allTd = $('.choose td', parent.document);

        /*申请编号*/
        var no = allTd.eq(0).text();
        var account = '';
        var accountAuthority = '';

        /*获取父页面的父页面pagename*/
        var ppPageName = $('#pageName', parent.parent.document).val();
        if (ppPageName == 'purchaseRequisitionHead') {

            account = $('#hiddenName', parent.parent.parent.parent.document).val();
            accountAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.parent.document).val();

        } else if (ppPageName == 'purchaseRequisitionSummary') {

            account = $('#hiddenName', parent.parent.parent.document).val();
            accountAuthority = $('#hiddenAuthority', parent.parent.parent.document).val();

        }

        openApplication(no, account, accountAuthority);


    }

    return {
        'init': init
    }
});