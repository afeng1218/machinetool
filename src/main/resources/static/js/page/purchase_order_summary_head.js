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

        /*设置表格高度*/
        $('#orderHeadTable').parent().css('height', screen.height / 2);

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
        COMMON.WS.restful('purchaseOrder/orderHeadSummary', 'post', uploadJson, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                $('#orderHeadTable').append('<tr class="tr" style="cursor: pointer;">' +
                    '<td class="td" style="width: 10%">' + data[i].orderHead.orderNo + '</td>' +
                    '<td class="td" style="width: 9%">' + data[i].orderHead.csupplier.supplier + '</td>' +
                    '<td class="td" style="width: 8%">' + data[i].orderHead.buyer + '</td>' +
                    '<td class="td" style="width: 18%">' + COMMON.LOCAL_TIME.getLocalTime(data[i].orderHead.buildTime) + '</td>' +
                    '<td class="td" style="width: 8%">' + data[i].orderHead.buildPerson + '</td>' +
                    '<td class="td" style="width: 10%">' + data[i].orderHead.materialClass + '</td>' +
                    '<td class="td" style="width: 10%">' + data[i].orderHead.state + '</td>' +
                    '<td class="td" style="width: 5%">' + data[i].orderHead.versionNo + '</td>' +
                    '<td class="td" style="width: 12%">' + data[i].orderHead.acceptOrderSide + '</td>' +
                    '<td class="td" style="width: 10%">' + data[i].storageRoomNo + '</td>' +
                    '</tr>');
            }

            /*表格行选择事件改变样式*/
            $('.td').click(function (e) {

                var tr = $(e.target).parent();
                $('.tr').removeClass('bg-449dd7');
                $('.tr').removeClass('choose');
                tr.addClass('bg-449dd7');
                tr.addClass('choose');
            });

        });

    }

    /*行按钮click事件监听*/
    $('#row').on('click', function () {

        var choose = $('.choose');
        if (choose.length > 0) {

            /*弹出申请行页面*/
            layer.open({
                type: 2,
                title: false,
                closeBtn: 1,
                shadeClose: false,
                shade: false,
                area: ['100%', '90%'],
                content: ['purchase_order_summary_row.html']
            });

        } else {

            layer.msg('请先选择题头！');
        }
    });
    /*打开按钮click事件监听*/
    $('#open').on('click', function () {

        var choose = $('.choose');
        /*如果是已审批题头不允许打开*/
        if (choose.find('td').eq(6).text() == '已审批') {

            layer.msg('已审批题头不予许打开！');

        } else {

            if (choose.length > 0) {

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

            } else {

                layer.msg('请先选择题头！');
            }
        }
    });

    /*导出excel按钮click事件监听*/
    $('#output').click(function () {

        tableExport('orderHeadTable', '采购订单题头汇总', 'csv');
    });

    return {
        'init': init
    }
});