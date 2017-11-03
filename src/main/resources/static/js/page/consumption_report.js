/**
 * Created by GuoFeng on 2016/6/21.
 */
/**
 * Created by GuoFeng on 2016/7/4.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

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

            /*绑定日期选择器*/
            $('.dateRange').datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                pickerPosition: 'bottom-right',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd',
                minView: 'month'
            });
            $('#beginDateBtn').on('click', function () {

                var endDate = $('#endDate').val();
                if (endDate != '') {
                    $(this).datetimepicker('setEndDate', endDate);
                }
            });
            $('#endDateBtn').on('click', function () {

                var startDate = $('#beginDate').val();
                if (startDate != '') {

                    $(this).datetimepicker('setStartDate', startDate);
                }
            });
            $('#beginDateBtn2').on('click', function () {

                var endDate = $('#endDate2').val();
                if (endDate != '') {

                    $(this).datetimepicker('setEndDate', endDate);
                }
            });
            $('#endDateBtn2').on('click', function () {

                var startDate = $('#beginDate2').val();
                if (startDate != '') {

                    $(this).datetimepicker('setStartDate', startDate);
                }
            });
            //清空输入框
            $(document).on('click', '#deleteBtn', function (e) {
                //     $("#deleteBtn").click(function(){
                $('#consump_type').val("");
                $('#mType').val("");
                $('#productLine').val("");
                $('#person').val("");
                $('#storeroom').val("");
                $('#consumptionResource').val("");
                $('#beginDate').val("");
                $('#endDate').val("");
                $('#beginDate2').val("");
                $('#endDate2').val("");
            });
//库房查询
            $('#storeroom').keydown(function (e) {
                if (e.keyCode == '13') {
                    var searchVal = {
                        /*是否弹出页面*/
                        popMenu: true,
                        /*查詢條件*/
                        searchValue: $('#storeroom').val(),
                        /*查询条件是否可编辑*/
                        readonly: false,
                        /*查询表实体类*/
                        searchTable: 'CStorageRoomDefinition',
                        /*查询哪几列数据*/
                        searchCol: 'storageRoomNo,storageRoomDescribe,storageRoomId',
                        /*自定义显示前两列列名*/
                        colName: '库房编号,库房描述'
                    };
                    /*库房查询双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                        /*显示库房编号*/
                        $('#storeroom').val(result.storageRoomNo);
                        $('#roomID').val(result.storageRoomId);
                    });
                }
            });

            //查询按钮
            $(document).on('click', '#searchBtn', function (e) {
                layer.open({
                    type: 2,
                    title: false,
                    shadeClose: true,
                    shade: false,
                    area: ['100%', '100%'],
                    content: ['consumption_result.html']
                });
            });

        }

        return {
            'init': init
        }
    }
);

