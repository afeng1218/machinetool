/**
 * Created by GuoFeng on 2016/4/29.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    var pageName = $('#pageName', parent.document).val();

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        $('#rowTable').parent().css('height', screen.height / 2);

        /*打开事件监听*/
        $(document).on('click', '#open', function () {

            var choose = $('.choose');
            var state = choose.find('td').eq(13).text();

            if (choose.length > 0) {

                if (state == '已审批') {

                    layer.msg('不能打开已审批订单！');

                } else {

                    /*打开申请编辑页面*/
                    layer.open({
                        type: 2,
                        title: false,
                        closeBtn: 1,
                        shadeClose: false,
                        shade: false,
                        area: ['100%', '90%'],
                        content: ['purchase_order.html']
                    });

                }

            } else {

                layer.msg('请先选择订单行！');
            }

        });
        /*导出excel事件监听*/
        $(document).on('click', '#output', function () {

            if (pageName == 'purchaseOrderHead') {

                var orderNo = $('#rowTable tbody tr:first td:first').text();
                tableExport('rowTable', '编号' + orderNo + '采购订单行汇总', 'csv');

            } else {

                tableExport('rowTable', '采购订单行汇总', 'csv');
            }

        });
        /*表格行click事件监听*/
        $(document).on('click', '.td', function (e) {

            var tr = $(e.target).parent();
            $('.tr').removeClass('bg-449dd7');
            $('.tr').removeClass('choose');
            tr.addClass('bg-449dd7');
            tr.addClass('choose');
        });

    }

    /*如果父页面是采购订单题头*/
    if (pageName == 'purchaseOrderHead') {

        var orderHeadTd = $('.choose td', parent.document);
        var orderNo = orderHeadTd.eq(0).text();
        COMMON.WS.local('purchaseOrder/getOrderRowByOrderNo', 'post', {orderNo: orderNo}, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                var dataObj = data[i];

                /*更新时间*/
                var updateTime = dataObj.updateTime;
                /*申请号*/
                var applyNo = dataObj.applyNo;
                /*申请行号*/
                var applyLineNo = dataObj.applyLineNo;
                /*发放号*/
                var dispatchNo = dataObj.dispatchNo;
                /*更新时间*/
                if (updateTime == null) {

                    updateTime = '';

                } else {

                    updateTime = COMMON.LOCAL_TIME.getLocalTime(updateTime);

                }
                /*申请号*/
                if (applyNo == null) {

                    applyNo = '';
                }
                /*申请行号*/
                if (applyLineNo == null) {

                    applyLineNo = '';
                }
                /*发放号*/
                if (dispatchNo == null) {

                    dispatchNo = '';
                }

                $('#rowTable').append('<tr class="tr" style="cursor: pointer;">' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + dataObj.orderNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.lineNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.materialNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.lineClass + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.materialDescribe + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.deliveryNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.unit + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.unitPrice + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + updateTime + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.brand + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.supplier + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.acceptedNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.cancleNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + dataObj.state + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + dataObj.class_ + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.buyer + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + applyNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + applyLineNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + dispatchNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + COMMON.LOCAL_TIME.getLocalTime(dataObj.buildTime) + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.buildPerson + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.storageRoomNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.cargoSpaceNo + '</td>' +
                    '</tr>'
                )
                ;

            }

        });

    }

    /*如果父页面是采购订单汇总查询页面*/
    if (pageName == 'purchaseOrderSummary') {


        /*订单号*/
        var orderNo = '%';
        if ($('#orderNo', parent.document).val() != '') {

            orderNo = $('#orderNo', parent.document).val();
        }
        /*行号*/
        var rowNo = '%';
        if ($('#orderNo', parent.document).val() != '') {

            rowNo = $('#orderNo', parent.document).val();
        }
        /*类别*/
        var type = '采购订单';

        /*发放号*/
        var shipmentNo = '%';
        if ($('#shipmentNo', parent.document).val() != '') {

            shipmentNo = $('#shipmentNo', parent.document).val();
        }

        /*采购员id*/
        var buyer = '%';
        if ($('#buyer', parent.document).val() != '') {

            buyer = $('#buyer', parent.document).val();
        }

        /*申请来源*/
        var sourceApplication = '%';
        if ($('#sourceApplication', parent.document).val() != '') {

            sourceApplication = $('#sourceApplication', parent.document).val();
        }

        /*订单状态*/
        var orderState = '%';
        if ($('#orderState input', parent.document).val() != '') {

            orderState = $('#orderState input', parent.document).val();
        }

        /*供应商编号*/
        var supplierNo = '%';
        if ($('#supplierNo', parent.document).val() != '') {

            supplierNo = $('#supplierNo', parent.document).val();
        }

        /*物料编号*/
        var materialNo = '%';
        if ($('#materialNo', parent.document).val() != '') {

            materialNo = $('#materialNo', parent.document).val();
        }

        /*创建开始时间*/
        var createDateBegin = '%';
        /*创建结束时间*/
        var createDateEnd = '%';
        /*需求开始时间*/
        var needDateBegin = '%';
        /*需求结束时间*/
        var needDateEnd = '%';
        if ($('#createDateBegin', parent.document).val() != '') {

            createDateBegin = $('#createDateBegin', parent.document).val();
        }
        if ($('#createDateEnd', parent.document).val() != '') {

            createDateEnd = $('#createDateEnd', parent.document).val();
        }
        if ($('#needDateBegin', parent.document).val() != '') {

            needDateBegin = $('#needDateBegin', parent.document).val();
        }
        if ($('#needDateEnd', parent.document).val() != '') {

            needDateEnd = $('#needDateEnd', parent.document).val();
        }

        /*获取查询信息 查询采购订单*/
        var uploadVal = {
            orderNo: orderNo,
            rowNo: rowNo,
            type: type,
            shipmentNo: shipmentNo,
            buyer: buyer,
            sourceApplication: sourceApplication,
            orderState: orderState,
            supplierNo: supplierNo,
            materialNo: materialNo,
            createDateBegin: createDateBegin,
            createDateEnd: createDateEnd,
            needDateBegin: needDateBegin,
            needDateEnd: needDateEnd
        };
        var uploadJson = JSON.stringify(uploadVal);

        COMMON.WS.restful('purchaseOrder/orderRowSummary', 'post', uploadJson, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                var dataObj = data[i];

                /*更新时间*/
                var updateTime = dataObj.updateTime;
                /*申请号*/
                var applyNo = dataObj.applyNo;
                /*申请行号*/
                var applyLineNo = dataObj.applyLineNo;
                /*发放号*/
                var dispatchNo = dataObj.dispatchNo;
                /*更新时间*/
                if (updateTime == null) {

                    updateTime = '';

                } else {

                    updateTime = COMMON.LOCAL_TIME.getLocalTime(updateTime);

                }
                /*申请号*/
                if (applyNo == null) {

                    applyNo = '';
                }
                /*申请行号*/
                if (applyLineNo == null) {

                    applyLineNo = '';
                }
                /*发放号*/
                if (dispatchNo == null) {

                    dispatchNo = '';
                }

                $('#rowTable').append('<tr class="tr" style="cursor: pointer;">' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + dataObj.orderNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.lineNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.materialNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.lineClass + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.materialDescribe + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.deliveryNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.unit + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.unitPrice + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + updateTime + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.brand + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.supplier + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.acceptedNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + dataObj.cancleNumber + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + dataObj.state + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + dataObj.class_ + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.buyer + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + applyNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + applyLineNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + dispatchNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + COMMON.LOCAL_TIME.getLocalTime(dataObj.buildTime) + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 60px;">' + dataObj.buildPerson + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + dataObj.storageRoomNo + '</td>' +
                    '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + dataObj.cargoSpaceNo + '</td>' +
                    '</tr>'
                )
                ;

            }

        });

    }

    /*导出excel按钮click事件监听*/
    $('#output').click(function () {

        tableExport('rowTable', '采购订单行汇总', 'csv');
    });


    return {
        'init': init
    }
});