/**
 * Created by GuoFeng on 2016/3/22.
 */
define(['jquery', 'common'], function ($, COMMON) {

    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    /*获取物料查询页面的父页面pageName，选择不同的js事件处理*/
    var pageName = $('#pageName', parent.document).val();

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

        /*库存明细页面*/
        if ('inventoryDetail' == pageName) {

            /*批次查询click事件*/
            $('#batchSearchBtn').click(function () {

                var searchValue = $('#batchSearchValue').val();
                var uploadVal = {
                    'searchValue': searchValue
                };
                if (searchValue != '') {

                    COMMON.WS.local('materialDefinition/batchSearch', 'get', uploadVal, true, function (data) {

                        $('#batchSearchTable tbody').remove();
                        for (var i = 0; i < data.length; i++) {

                            var expiryDate = COMMON.LOCAL_TIME.getLocalTime(data[i].expiryDate);
                            var supplierBatch = '';
                            var validDays = '';
                            if (data[i].supplierBatch != null) {

                                supplierBatch = data[i].supplierBatch;
                            }
                            if (data[i].validDays != null) {

                                validDays = data[i].validDays;
                            }
                            $('#batchSearchTable').append('<tr>' +
                                '<td class="batchCheck">' + data[i].cgeneralMaterial.materialNo + '</td>' +
                                '<td class="batchCheck">' + data[i].batchNo + '</td>' +
                                '<td class="batchCheck">' + expiryDate + '</td>' +
                                '<td class="batchCheck">' + supplierBatch + '</td>' +
                                '<td class="batchCheck">' + data[i].enableDate + '</td>' +
                                '<td class="batchCheck">' + validDays + '</td>' +
                                '</tr>');
                        }

                        $('.batchCheck').bind('dblclick', function (e) {

                            var tr = $(e.target).parent();

                            if ($('.searching', parent.document).hasClass('batchSearch2')) {

                                if ($('.batchSearch1', parent.document).val() >= tr.children().eq(1).html()) {

                                    parent.layer.msg('请选在择正确的区间！');
                                    return;
                                }

                            }

                            /*设置批次值*/
                            $('.searching', parent.document).val(tr.children().eq(1).html());

                            /*关闭对话框*/
                            parent.layer.close(index);

                        });
                    });
                }

            });
        }

    }

    return {
        'init': init
    }
});