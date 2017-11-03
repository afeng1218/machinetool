/**
 * Created by GuoFeng on 2016/5/6.
 */
var printIfrname=null;  //打印frame
define(['jquery', 'common', 'layer', 'page/common_search'], function ($, COMMON, layer, commonSearch) {

    /*查询条件封装*/

    /*订单号*/
    var orderNo = '%';
    var orderNoVal = $('#orderNo', parent.document).val();
    /*版本号*/
    var versionNo = '%';
    var versionNoVal = $('#orderVersion', parent.document).val();
    /*行号*/
    var rowNo = '%';
    var rowNoVal = $('#rowNo', parent.document).val();
    /*发运号*/
    var shipmentNo = '%';
    var shipmentNoVal = $('#shipmentNo', parent.document).val();
    /*供应商名称*/
    var supplierDescribe = '%';
    var supplierDescribeVal = $('#supplierDescribe', parent.document).val();
    /*供应商编号*/
    var supplierNo = '%';
    var supplierNoVal = $('#supplierNo', parent.document).val();
    /*物料编号*/
    var materialNo = '%';
    var materialNoVal = $('#materialNo', parent.document).val();
    /*物料名称*/
    var materialDescribe = '%';
    var materialDescribeVal = $('#materialDescribe', parent.document).val();
    /*日期开始*/
    var dateBegin = '%';
    var dateBeginVal = $('#dateBegin', parent.document).val();
    /*结束日期*/
    var dateEnd = '%';
    var dateEndVal = $('#dateEnd', parent.document).val();


    if (orderNoVal != '') {

        orderNo = orderNoVal;
    }
    if (versionNoVal != '') {

        versionNo = versionNoVal;
    }
    if (rowNoVal != '') {

        rowNo = rowNoVal;
    }
    if (shipmentNoVal != '') {

        shipmentNo = shipmentNoVal;
    }
    if (supplierDescribeVal != '') {

        supplierDescribe = supplierDescribeVal;
    }
    if (supplierNoVal != '') {

        supplierNo = supplierNoVal;
    }
    if (materialNoVal != '') {

        materialNo = materialNoVal;
    }
    if (materialDescribeVal != '') {

        materialDescribe = materialDescribeVal;
    }
    if (dateBeginVal != '') {

        dateBegin = dateBeginVal + ' 00:00:00';
    }
    if (dateEndVal != '') {

        dateEnd = dateEndVal + ' 00:00:00';
    }

    /*判断选择菜单*/
    var selectedNode = $('.node-selected', parent.parent.document).text();

    var nodeName = '';

    if (selectedNode == '订单接受') {
        nodeName = 'orderAccept';

    } else if (selectedNode == '采购退货') {
        nodeName = 'purchaseReturn';
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
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*如果是采购退货页面*/
        if (selectedNode == '采购退货') {

            $('#panel span').text('刀具管理-采购-采购退货');

        }

        /*设置表格高度*/
        $('.table-body').css('height', screen.height / 2);


        /*接受或者取消数量input失去焦点事件*/
        $(document).on('blur', '#acceptNumber', function () {

            /*设置接受数量 判断数量是否合法*/
            var acceptNumber = Number($('#acceptNumber').val());
            if ($('#acceptNumber').val() == '') {

                acceptNumber = 0;
            }
            var atd = $('#acceptNumber').parent().parent().find('td');

            var max = 0;

            if (selectedNode == '订单接受') {

                max = Number(atd.eq(11).text()) - Number(atd.eq(18).text());

            } else if (selectedNode == '采购退货') {

                max = Number(atd.eq(18).text()) - Number(atd.eq(20).text());
            }

            if (acceptNumber >= 0 && acceptNumber <= Number(max)) {

                /*设置接受(取消)数量*/
                $('#acceptNumber').parent().html(acceptNumber);

            } else {

                /*提示输入数量不合法*/
                layer.tips('请输入0-' + max + '之间的数！', $('#acceptNumber'));

            }

        });

        /*库位存在验证*/
        function checkStorageLocation() {

            var storageLocation = $('#storageLocation');
            var storageLocationVal = storageLocation.val();
            var td = storageLocation.parent().parent().find('td');
            var storageNo = td.eq(3).text();
            var searchVal = {
                popMenu: false,
                searchValue: '%',
                searchTable: 'CCargoSpaceDefinition',
                searchCol: 'cargoSpaceNo,cargoSpaceExplain',
            };
            var addLimit = new Array();
            addLimit.push({
                colName: 'CStorageRoomDefinition.storageRoomNo',
                colValue: storageNo
            });
            addLimit.push({
                colName: 'cargoSpaceNo',
                colValue: storageLocationVal
            });
            searchVal.addLimit = addLimit;

            commonSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                if (result == null || result == '') {

                    layer.tips('库位不存在！', storageLocation);

                } else {

                    storageLocation.parent().html(storageLocationVal);
                }
            });

        }

        /*绑定事件*/
        /*库位失去焦点事件*/
        $(document).on('blur', '#storageLocation', function () {

            var storageLocation = $('#storageLocation').val();
            if (storageLocation.indexOf('%') != -1 || storageLocation == '') {

                $('#storageLocation').parent().html('');

            } else {

                checkStorageLocation();
            }

        });

        /*库位选择事件绑定*/
        $(document).on('keydown', '#storageLocation', function (e) {

            var storageLocation = $('#storageLocation');
            var td = storageLocation.parent().parent().find('td');
            var storageNo = td.eq(3).text();
            if (e.keyCode == 13) {

                if (storageLocation.val() == '') {

                    storageLocation.parent().html('');

                } else {

                    if (storageLocation.val().indexOf('%') != -1) {

                        var searchVal = {
                            popMenu: true,
                            searchValue: '%',
                            readonly: true,
                            searchTable: 'CCargoSpaceDefinition',
                            searchCol: 'cargoSpaceNo,cargoSpaceExplain',
                            colName: '库位编号,库位描述',
                        };
                        var addLimit = new Array();
                        addLimit.push({
                            colName: 'CStorageRoomDefinition.storageRoomNo',
                            colValue: storageNo
                        });
                        searchVal.addLimit = addLimit;

                        commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                            td.eq(9).text(data.cargoSpaceNo);

                        });

                    } else {

                        checkStorageLocation();
                    }

                }
            }
        });

        /*表格行点击事件*/
        $(document).on('click', '.tr', function (e) {

            if ($(e.target).is('td')) {

                var td = $(e.target);
                var tr = $(e.target).parent();
                var allTd = tr.find('td');

                /*首先判断行是否选中*/
                if (tr.hasClass('choose')) {

                    /*删除选中状态*/
                    $('.choose').removeClass('bg-449dd7');
                    $('.choose').removeClass('choose');
                    allTd.eq(0).find('input').prop('checked', false);

                } else {

                    /*删除选中状态*/
                    $('.choose').removeClass('bg-449dd7');
                    $('.choose').removeClass('choose');

                    /*选中行操作*/
                    tr.addClass('bg-449dd7');
                    tr.addClass('choose');
                    allTd.eq(0).find('input').prop('checked', true);

                }

                /*如果点击的是接收数量td 并且没有正在输入的接受数量*/
                if (td.hasClass('acceptNumber') && $('#acceptNumber').length == 0) {

                    var atd = td.parent().find('td');
                    var acceptNumber = Number(td.text());

                    var maxNumber = 0;

                    if (selectedNode == '订单接受') {

                        maxNumber = Number(atd.eq(11).text()) - Number(atd.eq(18).text());

                    } else if (selectedNode == '采购退货') {

                        maxNumber = Number(atd.eq(18).text()) - Number(atd.eq(20).text());
                    }
                    /*内边距设置为0*/
                    td.css('padding', 0);
                    /*插入输入框*/
                    td.html('<input id="acceptNumber" type="number" style="height: 39px;padding: 0;" class="form-control" min="0" max="' + maxNumber + '" value="' + acceptNumber + '"/>');
                    /*获取焦点*/
                    $('#acceptNumber').focus();


                    /*库位td点击事件*/
                } else if (td.is(tr.find('td').eq(9)) && selectedNode == '订单接受') {

                    if ($('#storageLocation').length > 0) {

                        var storageLocation = $('#storageLocation').val();
                        if (storageLocation.indexOf('%') != -1 || storageLocation == '') {

                            $('#storageLocation').parent().html('');

                        } else {

                            if (checkStorageLocation() == 1) {

                                /*内边距设置为0*/
                                td.css('padding', 0);
                                /*插入输入框*/
                                td.html('<input id="storageLocation" type="text" style="height: 39px;padding: 0;" class="form-control" value="' + td.text() + '"/>');
                                /*获取焦点*/
                                $('#storageLocation').focus();

                            }
                        }
                    } else {

                        /*内边距设置为0*/
                        td.css('padding', 0);
                        /*插入输入框*/
                        td.html('<input id="storageLocation" type="text" style="height: 39px;padding: 0;" class="form-control" value="' + td.text() + '"/>');
                        /*获取焦点*/
                        $('#storageLocation').focus();
                    }

                }

                /*显示订单号和版本等信息*/
                $('#orderNo').val(allTd.eq(12).text());
                $('#orderVersion').val(allTd.eq(13).text());
                $('#rowNo').val(allTd.eq(14).text());
                $('#shipmentNo').val(allTd.eq(15).text());
                $('#supplier').val(allTd.eq(17).text());

            }

        });

        /*接受（取消）数量enter事件*/
        $(document).on('keydown', '#acceptNumber', function (e) {

            var number = $('#acceptNumber');
            var atd = number.parent().parent().find('td');

            var max = 0;

            if (selectedNode == '订单接受') {

                max = Number(atd.eq(11).text()) - Number(atd.eq(18).text());

            } else if (selectedNode == '采购退货') {

                max = Number(atd.eq(18).text()) - Number(atd.eq(20).text());
            }
            if (e.keyCode == 13) {

                /*输入数合法*/
                if (Number(number.val()) >= 0 && Number(number.val()) <= Number(max)) {

                    number.parent().html(number.val());

                } else {

                    /*接受数量不合法提示*/
                    layer.tips('请输入0-' + max + '之间的数！', number);
                }
            }

        });

        /*check box 全选反选*/
        $('#checkAl1').click(function () {

            if ($('#checkAl1').prop('checked')) {

                $('.checkBox').prop('checked', true);

            } else {

                $('.checkBox').prop('checked', false);
            }

        });

        /*上传数据封装*/
        var uploadVal = {
            nodeName: nodeName,
            orderNo: orderNo,
            versionNo: versionNo,
            rowNo: rowNo,
            shipmentNo: shipmentNo,
            supplierDescribe: supplierDescribe,
            supplierNo: supplierNo,
            materialNo: materialNo,
            materialDescribe: materialDescribe,
            dateBegin: dateBegin,
            dateEnd: dateEnd
        };
        /*转换成json上传*/
        var uploadJson = JSON.stringify(uploadVal);
        /*获取订单信息*/
        COMMON.WS.restful('purchaseOrderAccept/getOrderRow', 'post', uploadJson, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                var dispatchNo = data[i].dispatchNo;
                var provideNo = data[i].provideNo;
                var deliveryNumber = Number(data[i].deliveryNumber);
                var acceptedNumber = Number(data[i].acceptedNumber);
                var sssueTicketNumber = Number(data[i].sssueTicketNumber);
                var canAcceptNumber = 0;

                if (selectedNode == '订单接受') {

                    canAcceptNumber = deliveryNumber - acceptedNumber;

                } else if (selectedNode == '采购退货') {

                    canAcceptNumber = acceptedNumber - sssueTicketNumber;
                }

                if (dispatchNo == null) {

                    dispatchNo = '';
                }
                if (provideNo == null) {

                    provideNo = '';
                }

                /*采购订单信息设置*/
                var html = '<tr style="cursor: pointer;" class="tr">' +
                    '<td style="width: 4%;">' +
                    '<label class="col-nopadding radio-inline">' +
                    '<input type="checkbox" class="checkBox">' +
                    '</label>' +
                    '</td>' +
                    '<td style="width: 6%;" class="acceptNumber">' + canAcceptNumber + '</td>' +
                    '<td style="width: 6%;">' + data[i].unit + '</td>' +
                    '<td style="width: 10%;">' + data[i].storageRoomNo + '</td>' +
                    '<td style="width: 6%;">' + data[i].lineNo + '</td>' +
                    '<td style="width: 10%;">' + dispatchNo + '</td>' +
                    '<td style="width: 10%;">' + provideNo + '</td>' +
                    '<td style="width: 13%;">' + data[i].materialNo + '</td>' +
                    '<td style="width: 10%;">' + data[i].brand + '</td>';
                if (selectedNode == '采购退货') {

                    html += '<td style="width: 10%;">' + data[i].cargoSpaceNo + '</td>';
                } else {

                    html += '<td style="width: 10%;"></td>';
                }
                html += '<td style="width: 15%;">' + data[i].materialDescribe + '</td>' +
                    '<!--送货数量（需求数量）-->' +
                    '<td style="display: none;">' + deliveryNumber + '</td>' +
                    '<!--订单号-->' +
                    '<td style="display: none;">' + data[i].orderNo + '</td>' +
                    '<!--版本号-->' +
                    '<td style="display: none;">' + data[i].versionNo + '</td>' +
                    '<!--行号-->' +
                    '<td style="display: none;">' + data[i].lineNo + '</td>' +
                    '<!--发放号-->' +
                    '<td style="display: none;">' + dispatchNo + '</td>' +
                    '<!--供应商编号-->' +
                    '<td style="display: none;">' + data[i].supplierCode + '</td>' +
                    '<!--供应商描述-->' +
                    '<td style="display: none;">' + data[i].supplier + '</td>' +
                    '<!--接受数量-->' +
                    '<td style="display: none;">' + acceptedNumber + '</td>' +
                    '<!--单价-->' +
                    '<td style="display: none;">' + data[i].unitPrice + '</td>' +
                    '<!--开票数量-->' +
                    '<td style="display: none;">' + sssueTicketNumber + '</td>' +
                    '<!--是否限制库位-->' +
                    '<td style="display: none;">' + data[i].restrictedCargoSpace + '</td>' +
                    '<!--是否是立体库-->' +
                    '<td style="display: none;">' + data[i].isStereoLibrary + '</td>' +
                    '</tr>';
                $('#acceptTable').append(html);
            }

        });
    }

    var saveAcceptNumber = new Array();
    function saveBtn(function_){
        var index_=layer.load(3,{shade: [0.2, '#393D49']});
        /*获取所有修改的接受数量 以及 订单号、行号 信息封装*/
        var flag = 0;
        //var saveAcceptNumber = new Array();
        var acceptTableTr = $('#acceptTable input:checkbox:checked');

        /*验证选中行是否有库位控制*/
        for (var i = 0; i < acceptTableTr.length; i++) {

            var td = acceptTableTr.eq(i).parent().parent().parent().find('td');
            if (td.eq(9).text() == '' && td.eq(21).text() == '1') {

                layer.tips('此物料需选择库位！', td.eq(9), {tipsMore: true});
                flag = 1;
            }
        }

        if (flag == 1) {

            layer.close(index_);
            return;
        }

        for (var i = 0; i < acceptTableTr.length; i++) {

            var td = acceptTableTr.eq(i).parent().parent().parent().find('td');
            var acceptNumber = td.eq(1).text();
            var hiddenAcceptNumber = Number(td.eq(18).text());
            var unitPrice = td.eq(19).text();
            var maxNumber = Number(td.eq(11).text()) - Number(td.eq(18).text());
            var canCancleNumber = Number(td.eq(18).text()) - Number(td.eq(20).text());
            /*接受数量修改了 保存修改的接受数量*/
            if (acceptNumber > 0) {

                /**
                 * 保存订单接受信息
                 */
                if (nodeName == 'orderAccept' && maxNumber > 0) {

                    /**
                     * 立体库状态判断
                     */
                    //COMMON.WS.local('sendStereoLibrary/stereoLibraryState', 'get', {fileName: 'putorder.txt'}, false, function (data) {

                    //if (data.result == 'true') {

                    saveAcceptNumber.push({
                        type:'3',
                        nodeName: nodeName,//节点名
                        orderNo: td.eq(12).text(),//订单号
                        lineNo: td.eq(14).text(),//行号
                        materialNo: td.eq(7).text(),//物料编号
                        storageNo: td.eq(3).text(),//库房编号
                        storageLocationNo: td.eq(9).text(),//库位编号
                        acceptNumber: acceptNumber,//接受数量
                        unitPrice: unitPrice,//单价
                        username: $('#hiddenName', parent.parent.document).val(),//当前用户
                        unit: td.eq(2).text(),//单位
                        version: td.eq(8).text(),//品牌
                        isStereoLibrary: td.eq(22).text()//是否是立体库
                    });

                    // } else {

                    //   layer.tips(data.result, td.eq(3), {tipsMore: true});
                    //   td.eq(0).find('input').prop('checked', false);

                    //}

                    //});

                    /**
                     * 保存采购退货信息
                     */
                } else if (nodeName == 'purchaseReturn' && canCancleNumber > 0) {

                    saveAcceptNumber.push({
                        nodeName: nodeName,//所选择节点名称
                        orderNo: td.eq(12).text(),//订单号
                        lineNo: td.eq(14).text(),//行号
                        materialNo: td.eq(7).text(),//物料编号
                        storageNo: td.eq(3).text(),//库房编号
                        storageLocationNo: td.eq(9).text(),//库位编号
                        acceptNumber: acceptNumber,//取消数量
                        unitPrice: unitPrice,//单价
                        username: $('#hiddenName', parent.parent.document).val(),//用户名
                        unit: td.eq(2).text(),//单位
                        version: td.eq(8).text(),//品牌
                        isStereoLibrary: td.eq(22).text()//是否是立体库
                    });

                }


            }

        }

        /*判断是否有修改的接受数量*/
        if (saveAcceptNumber.length == 0) {

            if (nodeName == 'orderAccept') {

                layer.msg('没有可提交的接受数量！');
                layer.close(index_);

            } else if (nodeName == 'purchaseReturn') {

                layer.msg('没有可提交的退货数量！');
                layer.close(index_);
            }

        } else {

            /*接受数量提交*/
            var uploadJson = JSON.stringify(saveAcceptNumber);
            COMMON.WS.restful('purchaseOrderAccept/orderAcceptSave', 'post', uploadJson, true, function (data) {

                if (data.result == 'true') {

                    if (selectedNode == '订单接受') {

                        /**
                         * 发送立体库
                         * @type {Array}
                         */
                        var send = new Array();
                        for (var i = 0; i < saveAcceptNumber.length; i++) {

                            var sendLine = saveAcceptNumber[i].orderNo + ';' + saveAcceptNumber[i].materialNo + ';' + saveAcceptNumber[i].acceptNumber
                            send.push({
                                sendLine: sendLine
                            });
                        }
                        /**
                         * 订单接受 入库
                         * @type {{source: string, sendValue: Array, fileName: string}}
                         */
                        var uploadValue = {
                            source: 'putorder',
                            sendValue: send,
                            fileName: 'putorder' + new Date().getTime() + '.txt'
                        };
                        var Json = JSON.stringify(uploadValue);
                        COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, true, function (data) {

                            if (data.result == 'true') {

                                layer.msg('保存成功！发送立体库成功！');

                            } else {

                                layer.msg('保存成功！' + data.result);
                            }
                            if(function_){function_(index_)};
                        });

                    } else {

                        layer.msg('保存成功！');
                        layer.close(index_);

                    }

                    var select = $('#acceptTable input:checkbox:checked');

                    for (var i = 0; i < select.length; i++) {

                        var tr = select.eq(i).parent().parent().parent();
                        var td = select.eq(i).parent().parent().parent().find('td');
                        var inputNumber = Number(td.eq(1).text());
                        var deliveryNumber = Number(td.eq(11).text());
                        var acceptedNumber = Number(td.eq(18).text());
                        var sssueTicketNumber = Number(td.eq(20).text());
                        /*删除没有可接受或者取消的数量的tr*/
                        if (selectedNode == '订单接受') {

                            if (inputNumber == deliveryNumber - acceptedNumber) {

                                tr.remove();

                            } else {

                                /*重新设置接受数量*/
                                td.eq(18).text(acceptedNumber + inputNumber);
                            }

                        } else if (selectedNode == '采购退货') {

                            if (inputNumber == acceptedNumber - sssueTicketNumber) {

                                tr.remove();

                            } else {

                                td.eq(18).text(acceptedNumber - inputNumber);
                            }

                        }

                    }


                } else {

                    layer.msg(data.result);
                    layer.close(index_);
                }

            });

        }
    };

    /*保存按钮事件监听*/
    $('#saveBtn').click(function () {
        saveBtn(function(index){
            if(saveAcceptNumber.length==0){
                layer.close(index);
                layer.msg('请选择需要打印二维码的订单！');
                return null;
            };
            COMMON.WS.restful('cuttool/pinErwm', 'post', JSON.stringify(saveAcceptNumber), true, function (data) {
                layer.close(index);
                $("#pintUrl").val(data.url);
                printIfrname=layer.open({
                    type:2,
                    shade: false,
                    title: false,
                    scrollbar:false,
                    shadeClose: true,
                    area: ['50%', '50%'],
                    cancel:function(index_){
                        var lay=layer.confirm("任务号"+saveAcceptNumber[0].orderNo+'，还未打印确认关闭？关闭后将无法补打！',{
                            title:'<span style=color:red;">安全提示</span>',
                            btn:['确定','取消']
                        },function(){
                            layer.close(lay);layer.close(index_);
                        });
                        return false;
                    },
                    end:function(){
                        //删除二维码图片
                        COMMON.WS.restful("cuttool/removeImages", "post", saveAcceptNumber[0].orderNo, true, function (map) {});
                        saveAcceptNumber=new Array();
                    },
                    content:["cuttool_borrow_print.html","no"]
                });
            });rowValue=null;
        });
    });
    return {
        'init': init
    }
});