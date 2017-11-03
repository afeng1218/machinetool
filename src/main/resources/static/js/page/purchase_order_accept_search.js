/**
 * Created by GuoFeng on 2016/5/6.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, commonSearch) {

    /*通用页面查询参数*/
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
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*判断选择菜单*/
        var selectedNode = $('.node-selected', parent.document).text();
        
        /*如果是采购退货页面*/
        if (selectedNode == '采购退货') {

            $('#panel span').text('刀具管理-采购-采购退货');

        }

        /*日期事件绑定*/
        $('.calendarBtn').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd',
            minView: 'month'
        });
        /*设置后面日期的开始时间*/
        $('#dateSpanBegin').on('click', function () {

            var endDate = $('#dateEnd').val();
            if (endDate != '') {

                $(this).datetimepicker('setEndDate', endDate);
            }
        });
        /*设置前面日期的结束时间*/
        $('#dateSpanEnd').on('click', function () {

            var endDate = $('#dateBegin').val();
            if (endDate != '') {

                $(this).datetimepicker('setStartDate', endDate);
            }
        });
    }


    /*弹出入库界面*/
    $('#searchBtn').click(function () {

        layer.open({
            type: 2,
            title: false,
            closeBtn: 2,
            shadeClose: false,
            shade: false,
            area: ['100%', '100%'],
            content: ['purchase_order_accept_storage.html']
        });

    });

    return {
        'init': init
    }
});