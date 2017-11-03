/**
 * Created by GuoFeng on 2016/4/21.
 */
define(['jquery', 'common', 'layer', 'datetimepicker'], function ($, COMMON, layer) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

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

    }

    /*查询按钮单击事件*/
    $('#searchBtn').click(function () {

        layer.open({

            type: 2,
            title: false,
            closeBtn: 1,
            shadeClose: false,
            shade: false,
            area: ['100%', '100%'],
            content: ['auto_create_order.html']
        });
    });

    return {
        'init': init
    }
});