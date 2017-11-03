/**
 * Created by GuoFeng on 2016/3/22.
 */
define(['jquery', 'common'], function ($, COMMON) {

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

            /*查询结果菜单查询*/
            $('.order').click(function (e) {

                var item = $(e.target);

                $('#statusBar').find('div').removeClass('select');
                item.addClass('select');
                $(".inventoryDetail").children().css("display", "none");
                $("#inventoryDetail" + $(item).attr('data')).css("display", "block");
            });

            var storageNo = '%';
            var storageLocationNo = '%';
            var materialNo = '%';
            var materialVersion = '%';
            var materialExplain = '%';
            var state = '%';
            var batchBegin = '%';
            var batchEnd = '%';
            var sequenceBegin = '%';
            var sequenceEnd = '%';

            if ($('#stock input:first', parent.document).val() != '') {

                storageNo = $('#stock input:first', parent.document).val();
            }
            if ($('#stockLocation input:first', parent.document).val() != '') {

                storageLocationNo = $('#stockLocation input:first', parent.document).val();
            }
            if ($('#materialNo', parent.document).val() != '') {

                materialNo = $('#materialNo', parent.document).val()
            }
            if ($('#materialVersion', parent.document).val() != '') {

                materialVersion = $('#materialVersion', parent.document).val()
            }
            if ($('#materialExplain', parent.document).val() != '') {

                materialExplain = $('#materialExplain', parent.document).val()
            }
            if ($('#state input', parent.document).val() != '') {

                state = $('#state input', parent.document).val()
            }
            if ($('#batchBegin', parent.document).val() != '') {

                batchBegin = $('#batchBegin', parent.document).val()
            }
            if ($('#batchEnd', parent.document).val() != '') {

                batchEnd = $('#batchEnd', parent.document).val()
            }
            if ($('#sequenceBegin', parent.document).val() != '') {

                sequenceBegin = $('#sequenceBegin', parent.document).val()
            }
            if ($('#sequenceEnd', parent.document).val() != '') {

                sequenceEnd = $('#sequenceEnd', parent.document).val()
            }

            var uploadVal = {
                'storageNo': storageNo,
                'storageLocationNo': storageLocationNo,
                'materialNo': materialNo,
                'materialVersion': materialVersion,
                'materialExplain': materialExplain,
                'state': state,
                'batchBegin': batchBegin,
                'batchEnd': batchEnd,
                'sequenceBegin': sequenceBegin,
                'sequenceEnd': sequenceEnd
            };
            var uploadData = JSON.stringify(uploadVal);
            /*库存查询*/
            COMMON.WS.restful('inventoryDetail/getInventory', 'post', uploadData, true, function (data) {

                if ($('#inventoryDetailTable tbody tr').length > 0) {

                    $('#inventoryDetailTable tbody').remove();
                }
                if ($('#materialInventoryTable tbody tr').length > 0) {

                    $('#materialInventoryTable tbody').remove();
                }

                for (var i = 0; i < data[0].length; i++) {

                    $('#materialInventoryTable').append('<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + data[0][i].materialNo + '</td>' +
                        '<td>' + data[0][i].materialDescribe + '</td>' +
                        '<td>' + data[0][i].storageRoomNo + '</td>' +
                        '<td>' + data[0][i].availableQuantity + '</td>' +
                        '<td>' + data[0][i].bluntGoodsNum + '</td>' +
                        '<td>' + data[0][i].borrowNumber + '</td>' +
                        '</tr>');
                }
                for (var i = 0; i < data[1].length; i++) {

                    var batch = data[1][i].batchNo;
                    var sequence = data[1][i].sequenceNo;
                    if (batch == '-999') {

                        batch = '';
                    }
                    if (sequence == '-999') {

                        sequence = '';
                    }


                    $('#inventoryDetailTable').append('<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + data[1][i].materialNo + '</td>' +
                        '<td>' + data[1][i].materialDescribe + '</td>' +
                        '<td>' + data[1][i].versionException + '</td>' +
                        '<td>' + data[1][i].storageRoomNo + '</td>' +
                        '<td>' + data[1][i].cargoSpaceNo + '</td>' +
                        '<td>' + data[1][i].materialUnit + '</td>' +
                        '<td>' + data[1][i].availableQuantity + '</td>' +
                        '<td>' + batch + '</td>' +
                        '<td>' + sequence + '</td>' +
                        '</tr>');
                }


            });
        }

    }

    return {
        'init': init
    }
});