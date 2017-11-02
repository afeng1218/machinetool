/**
 * Created by CJS on 2016/3/24.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height * 3) / 5);

        var createDateBegin = '%';
        var createDateEnd = '%';
        var planReturnBegin = '%';
        var planReturnEnd = '%';

        var cuttool_taskNo = '%';
        var borrowOrreturn = '%';
        var borrower = '%';
        var equipmentID = '%';

        var status = '%';
        var roomNO = '%';
        var roomID = '%';
        var cuttoolNo = '%';
        var materialNo = '%';

        if ($('#cuttool_taskNo', parent.document).val() != '') {

            cuttool_taskNo = $('#cuttool_taskNo', parent.document).val();
        }
        if ($('#borrowOrreturn', parent.document).val() != '') {

            borrowOrreturn = $('#borrowOrreturn', parent.document).val();
        }
        if ($('#borrower', parent.document).val() != '') {

            borrower = $('#borrower', parent.document).val();
        }
        if ($('#equipmentID', parent.document).val() != '') {

            equipmentID = $('#equipmentID', parent.document).val();
        }
        if ($('#stateinput', parent.document).val() != '') {

            status = $('#stateinput', parent.document).val();
        }
        if ($('#roomNO', parent.document).val() != '') {

            roomNO = $('#roomNO', parent.document).val();
        }
        if ($('#roomID', parent.document).val() != '') {

            roomID = $('#roomID', parent.document).val();
        }
        if ($('#cuttoolNo', parent.document).val() != '') {

            cuttoolNo = $('#cuttoolNo', parent.document).val();
        }
        if ($('#materialNo', parent.document).val() != '') {

            materialNo = $('#materialNo', parent.document).val();
        }
        if ($('#createDateBegin', parent.document).val() != '') {

            createDateBegin = $('#createDateBegin', parent.document).val();
        }
        if ($('#createDateEnd', parent.document).val() != '') {

            createDateEnd = $('#createDateEnd', parent.document).val();
        }
        if ($('#planReturnBegin', parent.document).val() != '') {

            planReturnBegin = $('#planReturnBegin', parent.document).val();
        }
        if ($('#planReturnEnd', parent.document).val() != '') {

            planReturnEnd = $('#planReturnEnd', parent.document).val();
        }
        var uploadVal = {
            'resuleBy': '2',
            'cuttool_taskNo': cuttool_taskNo,
            'borrower': borrower,
            'equipmentID': equipmentID,
            'status': status,
            'roomID': roomID,
            'cuttoolNo': cuttoolNo,
            'materialNo': materialNo,
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd,
            'planReturnBegin': planReturnBegin,
            'planReturnEnd': planReturnEnd
        };
        var uploadJson = JSON.stringify(uploadVal);

        COMMON.WS.restful('cuttoolBorrow/getHeadOrRow', 'post', uploadJson, true, function (data) {

            for (var i = 0; i < data.length; i++) {

                if (data[i].createTime == null) {

                    var createTime = "";

                } else {

                    var createTime = COMMON.LOCAL_DATE.getLocalDate(data[i].createTime);

                }
                if (data[i].borrowDate == null) {

                    var borrowDate = "";

                } else {

                    var borrowDate = COMMON.LOCAL_DATE.getLocalDate(data[i].borrowDate);

                }
                if (data[i].planReturnTime == null) {

                    var planReturnTime = "";

                } else {

                    var planReturnTime = COMMON.LOCAL_DATE.getLocalDate(data[i].planReturnTime);

                }
                if (data[i].returnDate == null) {

                    var returnDate = "";

                } else {

                    var returnDate = COMMON.LOCAL_DATE.getLocalDate(data[i].returnDate);
                }
                if (data[i].borrowCode == null) {

                    var workno = "";

                } else {

                    var workno = data[i].borrowCode;

                }
                if (data[i].equipmentId == null) {

                    var eid = "";

                } else {

                    var eid = data[i].equipmentId;
                }
                if (data[i].borrowNumber == null) {

                    var borrowNumber = 0;

                } else {

                    var borrowNumber = data[i].borrowNumber;
                }
                if (data[i].returnNumber == null) {

                    var returnNumber = 0;

                } else {

                    var returnNumber = data[i].returnNumber;
                }
                if (data[i].surplusLifetime == null || data[i].surplusLifetime == 0) {

                    var surplusLifetime = "";

                } else {

                    var surplusLifetime = data[i].surplusLifetime;

                }
                if (data[i].scrapNumber == null) {

                    var scrapNumber = 0;

                } else {

                    var scrapNumber = data[i].scrapNumber;

                }
                if (data[i].cuttoolNo == null) {

                    var cNo = "";

                } else {

                    var cNo = data[i].cuttoolNo

                }
                if (data[i].equipmentName == null) {

                    var equipmentName = "";

                } else {

                    var equipmentName = data[i].equipmentName

                }

                $('#borrowReturnRowTable tbody').append('<tr class="tr" style="cursor: pointer;height: 32px">' +
                    '<td class="td" style="padding: 0;width: 120px;">' + data[i].borrowCode + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + cNo + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + data[i].materialNo + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + data[i].materialDes + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + data[i].borrower + '</td>' +
                    '<td class="td" style="padding: 0;width: 100px;">' + borrowNumber + '</td>' +
                    '<td class="td" style="padding: 0;width: 100px;">' + returnNumber + '</td>' +
                    '<td class="td" style="padding: 0;width: 100px;">' + scrapNumber + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;"></td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + equipmentName + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + surplusLifetime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + createTime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + borrowDate + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + planReturnTime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + returnDate + '</td>' +
                    '</tr>');
                /*表格行选择事件改变样式*/
                $('.td').click(function (e) {

                    var tr = $(e.target).parent();
                    $('.tr').removeClass('bg-449dd7');
                    $('.tr').removeClass('choose');
                    tr.addClass('bg-449dd7');
                    tr.addClass('choose');
                });
            }

        });


        /*行按钮click事件监听*/
        $('#open').on('click', function () {

            var choose = $('.choose');
            var returnStatus = $('.choose td:last').text();
            if (choose.length > 0 /*&& returnStatus == ''*/) {

                /*弹出归还页面*/
                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: 1,
                    shadeClose: false,
                    shade: false,
                    area: ['100%', '100%'],
                    content: ['cuttool_return.html']
                });

            } /*else if (returnStatus != '') {

                if ($('.choose td').eq(1).text() == '') {

                    layer.msg('物料已归还！');

                }else {

                    layer.msg('刀具已归还！');
                }

            } */else {

                layer.msg('请先选择行！');
            }
        });


        /*导出excel按钮click事件监听*/
        $('#output').click(function () {

            tableExport('borrowReturnRowTable', '刀具归还行汇总', 'csv');
        });
    }

    return {
        'init': init
    }
});