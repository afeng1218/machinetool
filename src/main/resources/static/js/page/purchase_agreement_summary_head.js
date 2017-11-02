/**
 * Created by guofeng on 2016/5/12.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height * 3) / 5);
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
            type: 'head',
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
            for (var i = 0; i < data.length; i++) {
                $('#applyHeadTable').append(
                    '<tr class="tr text-center" style="cursor: pointer;">' +
                    '<td class="td" style="width: 10%;">' + data[i][0] + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][2] + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][4] + '</td>' +
                    '<td class="td" style="width: 15%;">' + data[i][13] + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][4] + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][8] + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][11] + '</td>' +
                    '<td class="td" style="width: 5%;">' + data[i][9] + '</td>' +
                    '<td class="td" style="width: 10%;"></td>' +
                    '<td class="td" style="width: 10%;"></td>' +
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

    /*(行)按钮click事件监听*/
    $('#row').on('click', function () {
        var choose = $('.choose');
        if (choose.length > 0) {
            layer.open({
                type: 2,
                title: false,
                closeBtn: 1,
                shadeClose: false,
                shade: false,
                area: ['95%', '92%'],
                content: ['purchase_agreement_summary_row.html']
            });
        } else {
            layer.msg('请先选择题头！');
        }
    });
    /*(打开)按钮click事件监听*/
    $('#open').on('click', function () {
        var choose = $('.choose');
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
            layer.msg('请先选择题头！');
        }
    });
    /*导出excel按钮click事件监听*/
    $('#output').click(function () {
        tableExport('applyHeadTable', '采购协议题头汇总', 'csv');
    });

    return {
        'init': init
    }
});