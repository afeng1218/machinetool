/**
 * Created by SunJun on 2016/4/28.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, commonSearch) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*订单状态选择*/
        $('#orderState').click(function () {

            $('#orderState ul').toggle();
            $('#orderState ul li').click(function (e) {

                $('#orderState input').val($(e.target).text());

            });

        });

        /*采购员查询*/
        $(document).on('keydown', '#buyer', function (e) {

            if (e.keyCode == 13) {

                var uploadVal = {
                    searchValue: $('#buyer').val(),
                    searchTable: 'CBuyer',
                    searchCol: 'buyer,explainText,id',
                    searchColNum: '0,1',
                    colName: '采购员姓名,采购员描述'
                };
                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    $('#buyer').val(data.buyer);
                    $('#buyerId').val(data.id);

                });

            }

        });

        /*采购员输入框失去焦点事件*/
        $(document).on('blur', '#buyer', function () {

            var buyer = $('#buyer');

            if (buyer.val().indexOf('%') == -1 && buyer.val() != '') {

                var uploadVal = {
                    popMenu: false,
                    searchValue: buyer.val(),
                    searchTable: 'CBuyer',
                    searchCol: 'buyer,id',
                    searchColNum: '0,1'
                };
                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    if (data == '' || data == null) {

                        layer.tips('采购员不存在！', buyer);
                        buyer.focus();

                    } else {

                        $('#buyer').val(data[0].buyer);
                        $('#buyerId').val(data[0].id);

                    }

                });

            } else {

                buyer.val('');
                $('#buyerId').val('');

            }

        });

        /*供应商查询*/
        $(document).on('keydown', '#supplierName', function (e) {

            if (e.keyCode == 13) {

                var uploadVal = {
                    searchValue: $('#supplierName').val(),
                    searchTable: 'CSupplier',
                    searchCol: 'supplierCode,supplier',
                    searchColNum: '1,1',
                    colName: '供应商编码,供应商描述'
                };

                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    $('#supplierName').val(data.supplier);
                    $('#supplierNo').val(data.supplierCode);
                });

            }
        });

        /*供应商名称失去焦点事件*/
        $(document).on('blur', '#supplierName', function () {

            var supplierName = $('#supplierName');
            if (supplierName.val().indexOf('%') == -1 && supplierName.val() != '') {

                var uploadVal = {
                    popMenu: false,
                    searchValue: $('#supplierName').val(),
                    searchTable: 'CSupplier',
                    searchCol: 'supplierCode,supplier',
                    searchColNum: '1,1',
                };

                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    if (data == '' || data == null) {

                        layer.tips('供应商不存在！', supplierName);
                        supplierName.focus();

                    } else {

                        $('#supplierName').val(data[0].supplier);
                        $('#supplierNo').val(data[0].supplierCode);
                    }

                });


            } else {

                supplierName.val('');
                $('#supplierNo').val('');

            }

        });

        /*物料查询*/
        $(document).on('keydown', '#materialNo', function (e) {

            if (e.keyCode == 13) {

                var uploadVal = {
                    searchValue: $('#materialNo').val(),
                    searchTable: 'CGeneralMaterial',
                    searchCol: 'materialNo,materialDescribe',
                    searchColNum: '0,1',
                    colName: '物料编号,物料描述'
                };
                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    $('#materialNo').val(data.materialNo);
                    $('#materialDescribe').val(data.materialDescribe);

                });
            }
        });

        /*物料编号失去焦点事件*/
        $(document).on('blur', '#materialNo', function () {

            var materialNo = $('#materialNo');
            if (materialNo.val().indexOf('%') == -1 && materialNo.val() != '') {

                var uploadVal = {
                    popMenu: false,
                    searchValue: $('#materialNo').val(),
                    searchTable: 'CGeneralMaterial',
                    searchCol: 'materialNo,materialDescribe',
                    searchColNum: '0,1'
                };
                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    if (data == '' || data == null) {

                        layer.tips('物料不存在！', materialNo);
                        materialNo.focus();

                    } else {

                        $('#materialNo').val(data[0].materialNo);
                        $('#materialDescribe').val(data[0].materialDescribe);

                    }


                });

            } else {

                materialNo.val('');
                $('#materialDescribe').val('');
            }
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


        /*查询按钮点击事件*/
        $('#searchBtn').click(function () {

            var checkboxHead = $('#checkboxHead').prop('checked');
            var checkboxRow = $('#checkboxRow').prop('checked');
            if (checkboxHead == true) {

                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 2,
                    shadeClose: false,
                    shade: false,
                    area: ['100%', '100%'],
                    content: ['purchase_order_summary_head.html']
                });

            } else if (checkboxRow == true) {

                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 2,
                    shadeClose: false,
                    shade: false,
                    area: ['100%', '100%'],
                    content: ['purchase_order_summary_row.html']
                });

            }

        });
        
    }

    return {
        'init': init
    }
});