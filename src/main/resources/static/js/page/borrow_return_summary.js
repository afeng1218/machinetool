/**
 * Created by CJS on 2016/3/22.
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

        /*类型选择*/
        $('#type').click(function () {

            $('#type ul').toggle();
            $('#type ul li').click(function (e) {

                var v = $(e.target).html();
                $('#type input').val(v);
            });

        });
        /*状态选择*/
        $('#status').click(function () {

            $('#status ul').toggle();
            $('#status ul li').click(function (e) {

                var v = $(e.target).html();
                $('#status input').val(v);
            });

        });

        /*整体刀具 借用行选择事件*/
        $("#inlineRadio1").click(function () {
            var isTotal = $("#inlineRadio1").is(':checked');
            if (isTotal) {
                $('#resuleBy').val(1);
            } else {
                $('#resuleBy').val(0);
            }
        });
        $("#inlineRadio2").click(function () {
            var isRow = $("#inlineRadio2").is(':checked');
            if (isRow) {
                $('#resuleBy').val(0);
            } else {
                $('#resuleBy').val(1);
            }
        });
    }


    /*刀具任务号查询页面*/
    $('#cuttool_taskNo').keydown(function (e) {
        if (e.keyCode == '13') {
            var searchVal = {
                /*是否弹出页面*/
                popMenu: true,
                /*查詢條件*/
                searchValue: $('#cuttool_taskNo').val(),
                /*查询条件是否可编辑*/
                readonly: false,
                /*查询表实体类*/
                searchTable: 'CCuttoolBorrowTitle',
                /*查询哪几列数据*/
                searchCol: 'borrowNo,CBorrower.borrowedName',
                /*自定义显示前两列列名*/
                colName: '任务号,借用者'
            };
            /*库房查询双击事件回调函数*/
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                $('#cuttool_taskNo').val(result.borrowNo);
            });
        } else {

        }
    });

    /*人员查询页面*/
    $('#borrower').keydown(function (e) {
        if (e.keyCode == '13') {
            var searchVal = {
                /*是否弹出页面*/
                popMenu: true,
                /*查詢條件*/
                searchValue: $('#borrower').val(),
                /*查询条件是否可编辑*/
                readonly: false,
                /*查询表实体类*/
                searchTable: 'CBorrower',
                /*查询哪几列数据*/
                searchCol: 'employeeCardNo,borrowedName',
                /*自定义显示前两列列名*/
                colName: '员工编号,借用者'
            };
            /*库房查询双击事件回调函数*/
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                $('#borrower').val(result.borrowedName);
            });
        }
        else {

        }
    });
    /*设备input enter事件监听*/
    $('#equipmentNO').keydown(function (e) {
        if (e.keyCode == '13') {
            var searchVal = {
                /*是否弹出页面*/
                popMenu: true,
                /*查询条件是否可编辑*/
                readonly: false,
                searchValue: $('#equipmentNO').val(),
                searchTable: 'CMechanicalEquipment',
                searchCol: 'equipmentAssetsNo,equipmentName,mechanicalId',
                /*自定义显示前两列列名*/
                colName: '机床编号,机床描述'
            };
            /*库房查询双击事件回调函数*/
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                $('#equipmentNO').val(result.equipmentName);
                $('#equipmentID').val(result.mechanicalId);
            });

        } else {

        }
    });
    //库房查询
    $('#roomNO').keydown(function (e) {
        if (e.keyCode == '13') {
            var searchVal = {
                /*是否弹出页面*/
                popMenu: true,
                /*查詢條件*/
                searchValue: $('#roomNO').val(),
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
                $('#roomNO').val(result.storageRoomNo);
                $('#roomID').val(result.storageRoomId);
            });
        }
    });
    /*刀具查询页面*/
    $('#cuttoolSearch').click(function () {

        var searchVal = {
            /*是否弹出页面*/
            popMenu: true,
            /*查詢條件*/
            searchValue: $('#cuttoolNo').val(),
            /*查询条件是否可编辑*/
            readonly: false,
            /*查询表实体类*/
            searchTable: 'CCuttoolBasedata',
            /*查询哪几列数据*/
            searchCol: 'cuttoolNo,cuttoolDescription',
            /*自定义显示前两列列名*/
            colName: '刀具编号,刀具描述'
        };
        /*库房查询双击事件回调函数*/
        pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
            /*显示库房描述*/
            $('#cuttoolNo').val(result.cuttoolNo);
            /*显示申请人（保管员）*/
            $('#cuttoolDes').val(result.cuttoolDescription);
        });
    });

    /*物料查询页面*/
    $('#materialSearch').click(function () {
        var searchVal = {
            /*是否弹出页面*/
            popMenu: true,
            /*查詢條件*/
            searchValue: $('#materialNo').val(),
            /*查询条件是否可编辑*/
            readonly: false,
            /*查询表实体类*/
            searchTable: 'CGeneralMaterial',
            /*查询哪几列数据*/
            searchCol: 'materialNo,materialDescribe',
            /*自定义显示前两列列名*/
            colName: '物料编号,物料描述'
        };
        /*库房查询双击事件回调函数*/
        pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
            /*显示库房描述*/
            $('#materialNo').val(result.materialNo);
            /*显示申请人（保管员）*/
            $('#materialDes').val(result.materialDescribe);
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

    $('#createDateBeginTime').on('click', function () {

        var endDate = $('#createDateEnd').val();
        if (endDate != '') {
            $(this).datetimepicker('setEndDate', endDate);
        }
    });
    $('#createDateEndTime').on('click', function () {

        var startDate = $('#createDateBegin').val();
        if (startDate != '') {

            $(this).datetimepicker('setStartDate', startDate);
        }
    });
    $('#planReturnDateTime').on('click', function () {

        var endDate = $('#planReturnEnd').val();
        if (endDate != '') {

            $(this).datetimepicker('setEndDate', endDate);
        }
    });
    $('#planReturnEndData').on('click', function () {

        var startDate = $('#planReturnBegin').val();
        if (startDate != '') {

            $(this).datetimepicker('setStartDate', startDate);
        }
    });

    /*查询按钮事件监听*/
    $('#searchBtn').click(function () {

        var title = $('#inlineRadio1').prop('checked');
        var _class = $('#borrowOrreturn').val();
        /*查询题头*/
        if (title == true) {

            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['100%', '100%'],
                content: ['borrow_return_summary_head.html']
            });

            /*查询行*/
        } else if (_class == '归还') {
            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['100%', '100%'],
                content: ['return_summary_row.html']
            });

        }else {

            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['100%', '100%'],
                content: ['borrow_summary_row.html']
            });
        }

    });

    return {
        'init': init
    }
});