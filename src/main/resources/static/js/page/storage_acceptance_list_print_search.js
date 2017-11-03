/**
 * Created by GuoFeng on 2016/7/8.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'jQueryPrint', 'datetimepicker'], function ($, COMMON, layer, commonSearch) {

    function init() {

        /**
         * 获取用户权限
         */
        var arrUrl = window.location.href.split("/");
        var strPage = COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);
        var username = COMMON.ECODE.Base64.decode($.cookie('username'));

        if ($.cookie(strPage) == null && username != 'admin') {

            //$('#saveBtn').remove();
            //$('#deleteBtn').remove();
        }
        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*日历数据绑定*/
        $('.dateRange').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd HH:mm:ss',
            minView: 'month'
        });

        /*日期选择事件监听*/
        $('#startDate').on('click', function () {

            var endDate = $('#createDateEnd').val();
            if (endDate != '') {

                $(this).datetimepicker('setEndDate', endDate);
            }
        });
        $('#endDate').on('click', function () {

            var startDate = $('#createDateBegin').val();
            if (startDate != '') {

                $(this).datetimepicker('setStartDate', startDate);
            }
        });
    }

    /*订单号查询*/
    $('#orderNo').keydown(function (e) {

        if (e.keyCode == 13) {

            var searchVal = {
                searchValue: $('#orderNo').val(),
                searchTable: 'COrderHead',
                searchCol: 'orderNo,supplier',
                searchColNum: '0,1',
                colName: '订单编号,供应商'
            };
            commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                $('#orderNo').val(data.orderNo);

            });

        }

    });

    /*采购员*/
    $('#buyer').keydown(function (e) {

        if (e.keyCode == 13) {

            var searchVal = {
                searchValue: $('#buyer').val(),
                searchTable: 'CBuyer',
                searchCol: 'buyer,explainText',
                searchColNum: '0,1',
                colName: '姓名,描述'
            };
            commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                $('#buyer').val(data.buyer);

            });


        }
    });

    /*库房编号查询*/
    $('#storageNo').keydown(function (e) {

        if (e.keyCode == 13) {

            var searchVal = {
                searchValue: $('#storageNo').val(),
                searchTable: 'CStorageRoomDefinition',
                searchCol: 'storageRoomNo,storageRoomDescribe,storageRoomState',
                searchColNum: '0,1',
                colName: '库房编号,库房描述',
                addLimit: [{'colName': 'storageRoomState', 'colValue': '活动'}]
            };
            commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                $('#storageNo').val(data.storageRoomNo);

            });

        }
    });

    /*供应商选择*/
    $('#supplier').keydown(function (e) {

        if (e.keyCode == 13) {


            var searchVal = {
                searchValue: $('#supplier').val(),
                searchTable: 'CSupplier',
                searchCol: 'supplierCode,supplier',
                colName: '供应商编码,供应商描述'
            };
            commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                $('#supplier').val(data.supplier);

            });
        }
    });

    /*打印状态选择*/
    $('#isPrint').click(function () {

        $('#isPrint ul').toggle();
        $('#isPrint ul li').click(function (e) {

            var v = $(e.target).text();
            $('#isPrint input').val(v);

        });
    });

    /*查询按钮click事件监听*/
    $('#searchBtn').click(function () {

        layer.open({
            type: 2,
            title: '打印查询结果',
            area: ['100%', '100%'],
            fix: false, //不固定
            maxmin: true,
            content: 'storage_acceptance_list_print.html'
        });

    });

    return {
        'init': init
    }

});