/**
 * Created by CJS on 2016/3/24.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

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

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height * 3) / 5);

        //是否为整体刀具
        var resuleBy = $('#resuleBy', parent.document).val();

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

            'resuleBy': '1',
            'cuttool_taskNo': cuttool_taskNo,
            'borrowOrreturn': borrowOrreturn,
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
                if (data[i].borrowTime == null) {

                    var borrowTime = "";

                } else {

                    var borrowTime = COMMON.LOCAL_DATE.getLocalDate(data[i].borrowTime);

                }
                if (data[i].planReturnTime == null) {

                    var planReturnTime = "";

                } else {

                    var planReturnTime = COMMON.LOCAL_DATE.getLocalDate(data[i].planReturnTime);

                }
                if (data[i].returnTime == null) {

                    var returnTime = "";

                } else {

                    var returnTime = COMMON.LOCAL_DATE.getLocalDate(data[i].returnTime);

                }
                if (data[i].workOrderNo == null) {

                    var workno = "";

                } else {

                    var workno = data[i].workOrderNo;
                }
                if (data[i].equipmentName == null) {

                    var eName = "";

                } else {

                    var eName = data[i].equipmentName;

                }
                if (data[i].surplusLifetime == null) {

                    var surplusLifetime = "";

                } else {

                    var surplusLifetime = data[i].surplusLifetime;

                }
                if (data[i].cno == null) {

                    var cno = "";

                } else {

                    var cno = data[i].cno;
                }
                if (data[i].cdes == null) {

                    var cdes = "";

                } else {

                    var cdes = data[i].cdes;
                }
                $('#borrowReturnHeadTable tbody').append('<tr class="tr" style="cursor: pointer;height: 32px">' +
                    '<td class="td" style="padding: 0;width: 120px;">' + data[i].borrowNo + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + cno + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + cdes + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + data[i].borrower + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + workno + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + eName + '</td>' +
                    '<td class="td" style="padding: 0;width: 120px;">' + surplusLifetime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + createTime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + borrowTime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + planReturnTime + '</td>' +
                    '<td class="td" style="padding: 0;width: 200px;">' + returnTime + '</td>' +
                    // '<td class="td" style="display: none">'+roomplace+'</td>'+
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

    }

    /*归还按钮click事件监听*/
    $('#return').on('click', function () {

        var choose = $('.choose');
        if (choose.length > 0) {

            //if ($('.choose td:last').text() == '') {

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

          /*  } else {

                layer.msg('改刀具已归还！');
            }*/

        } else {

            layer.msg('请先选择行！');
        }
    });

    /*导出excel按钮click事件监听*/
    $('#output').click(function () {

        tableExport('borrowReturnHeadTable', '刀具借用题头汇总', 'csv');
    });

    return {
        'init': init
    }
});