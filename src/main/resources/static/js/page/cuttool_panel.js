/**
 * Created by CJS on 2016/4/5.
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {

    function sendState(e) {
        return e == 0 ? '未发送' : '已发送';
    }

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

        $('.table-body').css('height', screen.height * 1 / 3);

        var searchVals = {};
        searchVals.isEnable = "是";
        searchVals.cno = "";
        searchVals.des = "";
        searchVals.dia_small = "";
        searchVals.dia_large = "";
        searchVals.length = "";
        searchVals.renshu = "";
        searchVals.isScrap = "";
        searchVals.cha_des = "";
        searchVals.time_from = "";
        searchVals.time_to = "";
        searchVals.org_materials = "";
        searchVals.fun = "";
        searchVals.type = "";
        var arr = [];
        arr.push(searchVals);
        var value = JSON.stringify(arr);
        $.ajax({
            type: "post",
            url: "cuttool/blursearch",
            data: value,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (data == null) {
                    layer.msg("空");
                    return;
                }
                $('#cuttoolAddResTable').find('tbody').html('');
                var json = eval(data);
                $.each(json, function (index, item) {

                    if (item.cstorenum == null) {
                        item.cstorenum = "";
                    }
                    if (item.cnowPlace == null) {
                        item.cnowPlace = "";
                    }
                    if (item.cstoreroom == null) {
                        item.cstoreroom = "";
                    }
                    if (item.cfun == null) {
                        item.cfun = "";
                    }
                    $('#cuttoolAddResTable').find('tbody').append('<tr class="cuttoolAddResTable_tr" style="height:57px" data-value="0">' +
                        '<td style="width: 8%" class="cuttoolAddResTable_cno">' + item.cNo + '</td>' +
                        '<td style="width: 6%">' + item.cstorenum + '</td>' +
                        '<td style="width: 6%">' + item.cnowPlace + '</td>' +
                        '<td style="width: 12%">' + item.cdes + '</td>' +
                        '<td style="width: 8%">' + item.cdiameterSmall + '</td>' +
                        '<td style="width: 7%">' + item.cdiameterLarge + '</td>' +
                        '<td style="width: 7%">' + item.cdiameterLength + '</td>' +
                        '<td style="width: 4%">' + item.crenshu + '</td>' +
                        '<td style="width: 5%">' + item.cfun + '</td>' +
                        '<td style="width: 5%">' + item.ctype + '</td>' +
                        '<td style="width: 5%">' + item.ccharacteristicDescription + '</td>' +
                        '<td style="width: 5%">' + item.cstatusDescription + '</td>' +
                        '<td style="width: 5%">' + item.cinitialLifetime + '</td>' +
                        '<td style="width: 5%">' + item.csurplusLifetime + '</td>' +
                        '<td style="width: 5%">' + item.cstoreroom + '</td>' +
                        '<td style="width: 5%">' + sendState(item.send_state) + '</td>' +
                        '</tr>');

                    $(".cuttoolAddResTable_tr").click(function (e) {

                        $(".cuttoolAddResTable_tr").css("background-color", "#fff");
                        $(".cuttoolAddResTable_tr").attr('data-value', 0);
                        $(".cuttoolAddResTable_tr").removeClass('select');
                        var item = $(e.target).parent();
                        item.attr('data-value', 1);
                        item.css("background-color", "#FFE4C4");
                        item.addClass('select');
                        $("#borrowCNo").val(item.find('td').eq(0).text());
                    });
                });

                //双击刀具行更新装配信息表
                $('.cuttoolAddResTable_tr').bind('dblclick', function () {
                    $("#panelMtable_tbody").html('');
                    var trcno = $(this).find('.cuttoolAddResTable_cno').text();
                    //alert(trcno);
                    $.ajax({
                        type: "get",
                        url: "assembly/searchBycno",
                        data: {cuttoolNo: trcno},
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            var json = eval(data);
                            $.each(json, function (index, item) {
                                var no = item.no;
                                var mname = item.mname;
                                var mdes = item.mdes;
                                var num = item.mnum;
                                var unit = item.unit;
                                var easyConsume = item.easyConsume;
                                var chipCutting = item.chipCutting;
                                var brand = item.brand;
                                var availableNum = item.availableNum;
                                var date = item.date;
                                var listnum = item.listnum;
                                var addhtml = '<tr style="height:40px">' +
                                    '<td style="width: 5%;text-align: center;">' +
                                    '<span>' + no + '</span>' +
                                    '</td>' +
                                    '<td style="width: 15%;text-align: center">' +
                                    '<span>' + mname + '</span>' +
                                    '</td>' +
                                    '<td  style="width: 20%;text-align: center">' +
                                    '<span>' + mdes + '</span>' +
                                    '</td>' +
                                    '<td style="width: 7%;text-align: center;">' +
                                    '<input value="' + num + '" type="number" class="sesol-input "style="border: 0px;height: 25px;text-align: inherit;width: 100%;">' +
                                    '</td>' +
                                    '<td style="width: 7%;text-align: center">' +
                                    '<span>' + unit + '</span>' +
                                    '</td>';
                                if (easyConsume == 1) {
                                    addhtml = addhtml + '<td style="width: 7%;text-align: center">' +
                                        '<input  checked type="checkbox"/>';
                                } else {
                                    addhtml = addhtml + '<td style="width: 7%;text-align: center">' +
                                        '<input   type="checkbox"/>';
                                }
                                if (chipCutting == 1) {
                                    addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                        '<input  checked type="checkbox"/>';
                                } else {
                                    addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                        '<input  type="checkbox"/>';
                                }
                                addhtml = addhtml + '</td> <td style="width: 7%;text-align: center">' +
                                    '<span>' + brand + '</span>' +
                                    '</td>' +
                                    '<td style="width: 10%;text-align: center">' +
                                    '<span>' + availableNum + '</span>' +
                                    '</td>' +
                                    '<td style="width: 14%;text-align: center">' +
                                    '<span>' + date + '</span>' +
                                    '</td>' +
                                    '</tr>';
                                $("#panelMtable_tbody").append(addhtml);
                                //layer.msg("add");

                                //layer.msg(xh+mname+mdes+num+unit+easyConsume+chipCutting+brand+availableNum+date+listnum);
                            });
                        }
                    });
                });

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#cuttoolAddResTable').find('tbody').html('');
                //    alert("search fail");
            }
        });
        //借用按钮
        $('#panelBorrowBtn').click(function () {
            layer.open({
                type: 2,
                title: false,//不显示标题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['100%', '90%'],
                content: ['cuttool_borrow.html']
            });
        });
        $('#panelReturBtn').click(function () {
            layer.open({
                type: 2,
                title: false,//不显示标题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['100%', '90%'],
                content: ['cuttool_return.html']
            });
        });

        $('#btnAddcuttool').click(function () {
            layer.open({
                type: 2,
                title: false,//不显示标题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['98%', '600px'],
                content: ['cuttool_search.html']
            });
        });

        //发送西门子
        $('#fasongximenziBtn').click(function () {

            var flag = 0;
            var allTr = $('#cuttoolAddResTable tbody tr');

            for (var i = 0; i < allTr.length; i++) {

                var sendStatus = allTr.eq(i).children("td").eq(15).text();
                if (sendStatus == '未发送') {

                    flag = 1;
                    break;
                }
            }

            /**
             * 有可发送的刀具
             */
            if (flag == 1) {

                var searchVals = {};
                searchVals.isEnable = "是";
                searchVals.cno = "";
                searchVals.des = "";
                searchVals.dia_small = "";
                searchVals.dia_large = "";
                searchVals.length = "";
                searchVals.renshu = "";
                searchVals.isScrap = "";
                searchVals.cha_des = "";
                searchVals.time_from = "";
                searchVals.time_to = "";
                searchVals.org_materials = "";
                searchVals.fun = "";
                searchVals.type = "";

                var arr = [];

                arr.push(searchVals);

                var value = JSON.stringify(arr);
                //保存
                COMMON.WS.restful("cuttool/sendState", "post", value, true, function (map) {

                    if (map.result == "yes") {

                        var cuttoolAddResTable = $('#cuttoolAddResTable tbody tr');

                        for (var i = 0; i < cuttoolAddResTable.length; i++) {

                            cuttoolAddResTable.eq(i).children("td").eq(15).html("已发送")

                        }
                        layer.msg('发送西门子成功！');

                    } else {

                        layer.msg('发送西门子失败！');

                    }
                });

                /**
                 * 没有可发送的刀具
                 */
            } else {

                layer.msg('没有可发送的刀具！');
            }
        });
    }

    return {
        'init': init
    }
});
