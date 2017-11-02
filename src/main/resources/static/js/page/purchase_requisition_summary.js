/**
 * Created by SunJun on 2016/3/22.
 */
define(['jquery', 'common', 'layer', 'datetimepicker'], function ($, COMMON, layer) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*订单状态选择*/
        $('#purchaseState').click(function () {

            $('#purchaseState ul').toggle();
            $('#purchaseState ul li').click(function (e) {

                var v = $(e.target).html();
                $('#purchaseState input').val(v);
            });

        });

        /*题头 行查询checkbox选择事件*/
        $('#checkboxHead').click(function () {

            var state = false;
            if ($('#checkboxHead').prop('checked') == false) {

                state = true;
            }
            $('#checkboxRow').prop('checked', state);
        });
        $('#checkboxRow').click(function () {

            var state = false;
            if ($('#checkboxRow').prop('checked') == false) {

                state = true;
            }
            $('#checkboxHead').prop('checked', state);
        });

    }

    /*物料查询页面*/
    $('#materialSearch').click(function () {

        layer.open({
            type: 2,
            title: false,
            closeBtn: 1,
            shadeClose: false,
            shade: false,
            area: ['85%', '90%'],
            content: ['material_search.html']
        });
    });

    /*绑定日期选择器*/
    $('.dateRange').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        pickerPosition: 'bottom-left',
        todayBtn: 1,
        linkFormat: 'yyyy-mm-dd',
        minView: 'month'
    });

    /*日期选择事件监听*/
    $('#createStartDate').on('click', function () {

        var endDate = $('#createDateEnd').val();
        if (endDate != '') {

            $(this).datetimepicker('setEndDate', endDate);
        }
    });
    $('#createEndDate').on('click', function () {

        var startDate = $('#createDateBegin').val();
        if (startDate != '') {

            $(this).datetimepicker('setStartDate', startDate);
        }
    });
    $('#needStartDate').on('click', function () {

        var endDate = $('#needDateEnd').val();
        if (endDate != '') {

            $(this).datetimepicker('setEndDate', startDate);
        }
    });
    $('#needEndDate').on('click', function () {

        var startDate = $('#needDateBegin').val();
        if (startDate != '') {

            $(this).datetimepicker('setStartDate', startDate);
        }
    });
    

    /*查询按钮事件监听*/
    $('#searchBtn').click(function () {

        var searchState = $('#checkboxHead').prop('checked');
        /*查询题头*/
        if (searchState == true) {

            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['100%', '100%'],
                content: ['purchase_requisition_summary_head.html']
            });

            /*查询行*/
        } else {

            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['100%', '100%'],
                content: ['purchase_requisition_summary_row.html']
            });
        }

    });

    return {
        'init': init
    }
});