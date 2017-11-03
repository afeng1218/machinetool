/**
 * Created by GuoFeng on 2016/3/24.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height * 3) / 5);

        var state = 'false';
        if ($('#checkboxHead', parent.document).prop('checked')) {

            state = 'true';
        }

        var searchState = state;
        var createDateBegin = '%';
        var createDateEnd = '%';
        var needDateBegin = '%';
        var needDateEnd = '%';
        var materialNo = '%';
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
        if ($('#materialNo', parent.document).val() != '') {

            materialNo = $('#materialNo', parent.document).val();
        }
        var uploadVal = {
            'searchState': searchState,
            'applyNo': $('#applyNO', parent.document).val(),
            'applyPerson': $('#applyPerson', parent.document).val(),
            'state': $('#state', parent.document).val(),
            'materialNo': materialNo,
            'materialVersion': $('#materialVersion', parent.document).val(),
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd,
            'needDateBegin': needDateBegin,
            'needDateEnd': needDateEnd
        };
        var uploadJson = JSON.stringify(uploadVal);
        COMMON.WS.restful('purchaseRequisition/getRequisitionHeadOrRow', 'post', uploadJson, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                $('#applyHeadTable').append(
                    '<tr class="tr" style="cursor: pointer;">' +
                    '<td class="td" style="width: 20%;">' + data[i].applicationNo + '</td>' +
                    '<td class="td" style="width: 20%;">' + data[i].explaining + '</td>' +
                    '<td class="td" style="width: 20%;">' + data[i].createTime + '</td>' +
                    '<td class="td" style="width: 20%;">' + data[i].createPerson + '</td>' +
                    '<td class="td" style="width: 20%;">' + data[i].state + '</td>' +
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
                content: ['purchase_requisition_summary_row.html']
            });

        } else {

            layer.msg('请先选择题头！');
        }
    });
    /*打开按钮click事件监听*/
    $('#open').on('click', function () {

        var choose = $('.choose');
        /*如果是已审批题头不允许打开*/
        if (choose.find('td').eq(4).text() == '已审批') {

            layer.msg('已审批题头不予许打开！');

        } else {

            if (choose.length > 0) {

                /*打开申请编辑页面*/
                var purchaseRequisition = layer.open({

                    type: 2,
                    title: false,
                    closeBtn: 1,
                    shadeClose: false,
                    shade: false,
                    area: ['100%', '90%'],
                    content: ['purchase_requisition.html']
                });

            } else {

                layer.msg('请先选择题头！');
            }
        }
    });
    /*导出excel按钮click事件监听*/
    $('#output').click(function () {

        tableExport('applyHeadTable', '采购申请题头汇总', 'csv');
    });

    return {
        'init': init
    }
});