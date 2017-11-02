/**
 * Created by guofeng on 2016/5/13.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    /*父页面name*/
    var pageName = $('#pageName', parent.document).val();

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置table高度*/
        $('#rowTable').parent().css('height', screen.height / 2);

        /*打开事件监听*/
        $(document).on('click', '#open', function () {
            var choose = $('.choose');
            var state = choose.find('td').eq(11).text();
            if (choose.length > 0) {
                /*打开申请编辑页面*/
                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 1,
                    shadeClose: false,
                    shade: false,
                    area: ['95%', '92%'],
                    content: ['purchase_agreement.html']
                });
            } else {
                layer.msg('请先选择申请行！');
            }
        });

        /*导出excel事件监听*/
        $(document).on('click', '#output', function () {
            if (pageName == 'purchaseAgreementSummaryHead') {
                tableExport('rowTable', '采购协议行汇总', 'csv');
            } else {
                tableExport('rowTable', '采购协议行汇总', 'csv');
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

    /*申请行数据添加*/
    function paintTable(data) {
        for (var i = 0; i < data.length; i++) {
            $('#rowTable').append(
                '<tr class="tr text-center" style="cursor: pointer;">' +
                '<td class="td" style="width: 100px;">' + data[i][0] + '</td>' +
                '<td class="td" style="width: 50px;">' + data[i][1] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][2] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][6] + '</td>' +
                '<td class="td" style="width: 150px;">' + data[i][12] + '</td>' +
                '<td class="td" style="width: 80px;">' + data[i][13] + '</td>' +
                '<td class="td" style="width: 80px;">' + data[i][3] + '</td>' +
                '<td class="td" style="width: 80px;">' + data[i][11] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][14] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][7] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][15] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][16] + '</td>' +
                '<td class="td" style="width: 175px;">' + data[i][5] + '</td>' +
                '<td class="td" style="width: 100px;">' + data[i][4] + '</td>' +
                '</tr>'
            );
        }
    }

    /*父页面是协议汇总页面*/
    if (pageName == 'purchaseAgreementSummary') {
        //订单号
        var order_code = $('#order_code', parent.document).val() == "" ? "%" : $('#order_code', parent.document).val();
        //行号
        var row_number = $('#row_number', parent.document).val() == "" ? "%" : $('#row_number', parent.document).val();
        //类别
        var class_ = $('#class_', parent.document).val() == "" ? "%" : $('#class_', parent.document).val();
        //采购员
        var buyer = $('#buyer', parent.document).val() == "" ? "%" : $('#buyer', parent.document).val();
        //订单状态
        var state = $('#state', parent.document).val() == "" ? "%" : $('#state', parent.document).val();
        //供应商
        var supplier_code = $('#supplier_code', parent.document).val() == "" ? "%" : $('#supplier_code', parent.document).val();
        //物料
        var materialNo = $('#materialNo', parent.document).val() == "" ? "%" : $('#materialNo', parent.document).val();
        //物料-版本
        var materialVersion = $('#materialVersion', parent.document).val() == "" ? "%" : $('#materialVersion', parent.document).val();
        //创建时间-开始
        var createDateBegin = $('#createDateBegin', parent.document).val() == "" ? "%" : $('#createDateBegin', parent.document).val();
        //创建时间-结束
        var createDateEnd = $('#createDateEnd', parent.document).val() == "" ? "%" : $('#createDateEnd', parent.document).val();

        var uploadVal = {
            type: 'row',
            order_code: order_code,
            row_number: row_number,
            class_: class_,
            buyer: buyer,
            state: state,
            supplier_code: supplier_code,
            materialNo: materialNo,
            materialVersion: materialVersion,
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd
        };
        uploadVal = JSON.stringify(uploadVal);

        COMMON.WS.restful('purchaseAgreement/getAgreementSummaryHead', 'post', uploadVal, true, function (data) {
            paintTable(data);
        });
    }
    /*父页面是题头汇总页面*/
    if (pageName == 'purchaseAgreementSummaryHead') {
        var chooseTr = $('.choose', parent.document);
        //订单号
        var order_code = chooseTr.find('td:first').html();
        var uploadVal = {
            'order_code': order_code
        };
        COMMON.WS.local('purchaseAgreement/getAgreementSummaryRow', 'get', uploadVal, true, function (data) {
            paintTable(data);
        });
    }

    return {
        'init': init
    }
});