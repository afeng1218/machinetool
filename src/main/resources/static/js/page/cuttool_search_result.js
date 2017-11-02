/**
 * Created by CJS on 2016/3/22.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    var pageName = $('#pageName', parent.parent.document).val();
    //alert(pageName);
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

        var searchVals = {};
        searchVals.cno = $('#cx_cuttool_no', parent.document).val();
        searchVals.des = $('#cx_cuttool_description', parent.document).val();
        searchVals.dia_small = $('#cx_programming_diameter_small', parent.document).val();
        searchVals.dia_large = $('#cx_programming_diameter_large', parent.document).val();
        searchVals.length = $('#cx_programming_diameter_length', parent.document).val();
        searchVals.renshu = $('#cx_renshu', parent.document).val();
        searchVals.isScrap = $('#cx_isScrap', parent.document).val();
        searchVals.cha_des = $('#cx_characteristic_description', parent.document).val();
        searchVals.isEnable = $('#cx_isEnable', parent.document).val();
        searchVals.time_from = $('#cx_surplus_lifetime_from', parent.document).val();
        searchVals.time_to = $('#cx_surplus_lifetime_to', parent.document).val();
        searchVals.org_materials = $('#cx_org_materials', parent.document).val();
        searchVals.fun = $('#cx_function', parent.document).val();
        searchVals.type = $('#cx_type', parent.document).val();
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
                    return;
                }
                $('#cuttoolSearchResTable').find('tbody').html('');
                var json = eval(data);
                var reshtml = '';
                $.each(json, function (index, item) {

                    if (item.cfun == null) {

                        item.cfun == "";

                    }
                    if (item.ctype == null) {

                        item.ctype == "";

                    }
                    if (item.ccharacteristicDescription == null) {

                        item.ccharacteristicDescription == "";

                    }
                    if (item.cstatusDescription == null) {

                        item.cstatusDescription == "";

                    }

                    $('#cuttoolSearchResTable').find('tbody').append('<tr>' +
                        '<td>' + item.cNo + '</td>' +
                        '<td>' + item.cinitiateStatus + '</td>' +
                        '<td>' + item.cdes + '</td>' +
                        '<td>' + item.cdiameterSmall + '</td>' +
                        '<td>' + item.cdiameterLarge + '</td>' +
                        '<td>' + item.cdiameterLength + '</td>' +
                        '<td>' + item.crenshu + '</td>' +
                        '<td>' + item.cfun + '</td>' +
                        '<td>' + item.ctype + '</td>' +
                        '<td>' + item.ccharacteristicDescription + '</td>' +
                        '<td>' + item.cstatusDescription + '</td>' +
                        '<td>' + item.cinitialLifetime + '</td>' +
                        '<td>' + item.csurplusLifetime + '</td>' +
                        '<td>' + item.cisScrap + '</td>' +
                        '</tr>');
                    reshtml += reshtml;
                });

                $('#cuttoolSearchResTable').find('tbody').append(reshtml);

                //父界面为刀具维护界面
                if ('cuttoolDefinition' == pageName) {

                    $('#cuttoolSearchResTable').find('tbody').find('tr').unbind('dblclick');
                    $('#cuttoolSearchResTable').find('tbody').find('tr').bind('dblclick', function (e) {

                        var restr = $(e.target).parent().find('td:first').text();

                        $.ajax({
                            type: "get",
                            url: "cuttool/searchbyno",
                            data: {cuttoolNo: restr},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {

                                if (data == null) {

                                    layer.msg("刀具不存在！");
                                    return
                                }
                                var json = eval(data);
                                $.each(json, function (index, item) {

                                    var cno = item.cNo;
                                    var strs = cno.split("-");
                                    var cuttoolno = [];
                                    for (var i = 0; i < strs.length; i++) {

                                        cuttoolno[i] = strs[i];

                                    }
                                    $('#typeId',parent.parent.document).val(item.typeId);
                                    $("#cuttool_no", parent.parent.document).val(cuttoolno[0]);
                                    $("#sister_cuttool", parent.parent.document).val(cuttoolno[1]);
                                    //设置不可编辑
                                    $("#cuttool_no", parent.parent.document).attr('readonly', 'readonly');
                                    $("#sister_cuttool", parent.parent.document).attr('readonly', 'readonly');

                                    $("#bar_code", parent.parent.document).val(item.barCode);
                                    $("#cuttool_description", parent.parent.document).val(item.cdes);
                                    $("#tab2_cuttool_description", parent.parent.document).val(item.cdes);
                                    $("#characteristic_description", parent.parent.document).val(item.ccharacteristicDescription);
                                    $("#cdes", parent.parent.document).val(item.cdes);
                                    $("#cuttool_handle_type", parent.parent.document).val(item.handtype);
                                    $("#programming_diameter_small", parent.parent.document).val(item.cdiameterSmall);
                                    $("#programming_diameter_large", parent.parent.document).val(item.cdiameterLarge);
                                    $("#programming_diameter_length", parent.parent.document).val(item.cdiameterLength);
                                    $("#priority_level", parent.parent.document).val(item.level);
                                    $("#function", parent.parent.document).val(item.cfun);
                                    $("#type", parent.parent.document).val(item.ctype);
                                    $("#tab3_function", parent.parent.document).val(item.cfun);
                                    $("#tab2_materialtype", parent.parent.document).val(item.ctype);

                                    var isTrack = item.istrack;
                                    if (isTrack == 1) {

                                        $("#lifetime_tracking", parent.parent.document).val(1);
                                        $("#set_lifetime_tracking", parent.parent.document).attr("checked", "checked");

                                    }

                                    var usingstatus = item.usingStatus;
                                    if (usingstatus == 0) {

                                        $('#using_status', parent.parent.document).val(0);
                                        $("#inlineRadio1", parent.parent.document).attr("checked", "checked");

                                    } else {

                                        $('#using_status', parent.parent.document).val(1);
                                        $("#inlineRadio2", parent.parent.document).attr("checked", "checked");
                                    }

                                    var isScrap = item.cisScrap;
                                    if (isScrap == 1) {

                                        $("#isScrap", parent.parent.document).val(1);
                                        $("#set_isScrap", parent.parent.document).attr("checked", "checked");

                                    } else {

                                        $("#isScrap", parent.parent.document).val(0);
                                    }

                                    $("#status_description", parent.parent.document).val(item.statusDes);
                                    $("#initial_lifetime", parent.parent.document).val(item.cinitialLifetime);
                                    $("#surplus_lifetime", parent.parent.document).val(item.csurplusLifetime);
                                    $("#lifeAlarm", parent.parent.document).val(item.lifeAlarm);
                                });

                            }
                        });
                        //功能和类型图片显示
                        var CFuntion = $("#function", parent.parent.document).val();
                        var CType = $("#type", parent.parent.document).val();
                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CFuntion, type: 0},
                            dataType: "text",
                            async: false,
                            success: function (data) {
                                $("#funtion_pic", parent.parent.document).html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CType, type: 2},
                            dataType: "text",
                            async: false,
                            success: function (data) {
                                $("#type_pic", parent.parent.document).html('<img  src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                                $("#tab2_type_pic", parent.parent.document).html('<img src="uploadImg/' + data + '"  alt="" class="img-thumbnail" style="width: 450px;height: 280px;">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        //类型和功能参数显示
                        $('#tab3_funPars', parent.parent.document).html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: restr,
                                type: 0
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab3_funPars', parent.parent.document).append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        $('#tab2_CTypeTable', parent.parent.document).html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: restr,
                                type: 2
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab2_CTypeTable', parent.parent.document).append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        //刀具装配信息带出
                        $("#tab2_cuttool_no", parent.parent.document).val(restr);
                        $.ajax({
                            type: "get",
                            url: "assembly/searchBycno",
                            data: {cuttoolNo: restr},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {

                                var json = eval(data);
                                $("#tab2_material_table", parent.parent.document).html('<tr>' +
                                    '<th style="width: 5%;text-align: center;">序号</th>' +
                                    '<th style="width: 15%;text-align: center">物料' +
                                    '<div class="cuttool_tab2_table_add" style="width: 10%;margin-right:5px;float: right;">' +
                                    '<a id="cuttool_tab2_table_add_a" style="cursor: pointer;">' +
                                    '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</a>' +
                                    '</div>' +
                                    '</th>' +
                                    '<th style="width: 15%;text-align: center" colspan="8">描述</th>' +
                                    '<th style="width: 8%;text-align: center;">数量</th>' +
                                    '<th style="width: 5%;text-align: center">单位</th>' +
                                    '<th style="width: 8%;text-align: center">易消耗</th>' +
                                    '<th style="width: 8%;text-align: center">切削主体</th>' +
                                    '<th style="width: 8%;text-align: center;">编码主体</th>' +
                                    '<th style="width: 8%;text-align: center">品牌</th>' +
                                    '<th style="width: 15%;text-align: center">日期</th>' +
                                    '<th style="width: 5%;text-align: center">操作</th>' +
                                    '</tr>');
                                $.each(json, function (index, item) {
                                    var no = item.no;
                                    var mname = item.mname;
                                    var mdes = item.mdes;
                                    var num = item.mnum;
                                    var unit = item.unit;
                                    if (unit == null) {
                                        unit = "";
                                    }
                                    var easyConsume = item.easyConsume;
                                    var chipCutting = item.chipCutting;
                                    var encodingBody = item.encodingBody;
                                    var brand = item.brand;
                                    var date = item.date;
                                    var listnum = item.listnum;


                                    var addhtml = '<tr class="cuttool_tab2_table_tr Mtr">' +
                                        '<td style="width: 5%;text-align: center;">' +
                                        '<span class="trNum" >' + no + '</span>' +
                                        '</td>' +
                                        '<td class="tab2_table_materialno " style="width: 15%;text-align: center;vertical-align: inherit;">' +
                                        '<span class="Mno_span">' + mname + '</span>' +
                                        // '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
                                        '</td>' +
                                        '<td style="width: 17%;text-align: center" colspan="8">' +
                                        '<span>' + mdes + '</span>' +
                                        '</td>' +
                                        '<td style="width: 8%;text-align: center;">' +
                                        '<input  class="materialNumber" value="' + num + '"  type="number" min="1" class="sesol-input "style="border: 0px;text-align: inherit;width: 100%;">' +
                                        '</td>' +
                                        '<td style="width: 5%;text-align: center">' +
                                        '<span>' + unit + '</span>' +
                                        '</td>';
                                    if (easyConsume == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (chipCutting == 1) {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody" checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody"  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (encodingBody == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input type="checkbox"/>' +
                                            '</td>';
                                    }
                                    addhtml = addhtml +
                                        '<td class="td_mBrand" style="width: 9%;text-align: center">' +
                                        '<span class="M_Brand">' + brand + '</span>' +
                                        '<span class="span_mBrand glyphicon glyphicon-search" style="display: none;cursor: pointer;"></span>' +
                                        '</td>' +
                                        '<td style="width: 16%;text-align: center">' +
                                        '<span >' + date + '</span>' +
                                        '</td>' +
                                        '<td class="td_materialDelete">' +
                                        '<span class="span_materialDelete glyphicon glyphicon-remove" style="cursor: pointer;"></span>' +
                                        '</td>' +
                                        '</tr>'
                                    $("#tab2_material_table tbody", parent.parent.document).append(addhtml);
                                });
                            }
                        });

                        //刀具图片显示
                        $("#cuttool_img_div", parent.parent.document).css("display", "");
                        $("#delete_img_div", parent.parent.document).css("display", "");
                        $("#cuttool_img_div", parent.parent.document).html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/getPicName",
                            data: {cuttoolNo: restr},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                $(".fileinput-remove", parent.parent.document).click();
                                var imgname = data.res;
                                $("#cuttool_img_div", parent.parent.document).append('<input id="input_imgName" type="text" value="' + imgname + '" style="display: none"><img style="max-height:100%;max-width:100%;" src="uploadImg/' + imgname + '">');
                            }
                        });
                        parent.parent.layer.closeAll();

                    });
                }

                //父界面为刀具面板界面
                if ('cuttoolPanel' == pageName) {

                    $('#cuttoolSearchResTable').find('tbody').find('tr').unbind('dblclick');
                    $('#cuttoolSearchResTable').find('tbody').find('tr').bind('dblclick', function (e) {
                        var cno = $(e.target).parent().find('td:first').text();
                        var cdes = $(e.target).parent().children('td').eq(2).text();
                        var cdiameterbig = $(e.target).parent().children('td').eq(3).text();
                        var cdiametersmall = $(e.target).parent().children('td').eq(4).text();
                        var cdiameterlength = $(e.target).parent().children('td').eq(5).text();
                        var crenshu = $(e.target).parent().children('td').eq(6).text();
                        var cfun = $(e.target).parent().children('td').eq(7).text();
                        var ctype = $(e.target).parent().children('td').eq(8).text();
                        var ctexing = $(e.target).parent().children('td').eq(9).text();
                        //alert(cno+cdes+cdiameterbig+cdiametersmall+cdiameterlength+crenshu+cfun+ctype+ctexing);
                        $("#hcno").val(cno);
                        $("#hcdes").val(cdes);
                        $("#hcdiameterbig").val(cdiameterbig);
                        $("#hcdiametersmall").val(cdiametersmall);
                        $("#hcdiameterlength").val(cdiameterlength);
                        $("#hcrenshu").val(crenshu);
                        $("#hcfun").val(cfun);
                        $("#hctype").val(ctype);
                        $("#htexing").val(ctexing);
                        layer.open({
                            type: 2,
                            title: false,//不显示标题
                            shadeClose: true,
                            shade: false,
                            //maxmin: true, 开启最大化最小化按钮
                            area: ['100%', '85%'],
                            content: ['cuttool_add.html']
                        });
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#cuttoolSearchResTable').find('tbody').html('');
                //    alert("search fail");
            }
        });
        /*增加刀具*/
        $('#addCuttoolBtn').click(function () {
            layer.open({
                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['100%', '100%'],
                content: ['cuttool_add.html']
            });
        });

        /*导出excel按钮click事件监听*/
        $('#exportCuttoolResult').click(function () {
            tableExport('cuttoolSearchResTable', '刀具汇总结果', 'csv');
        });
    }

    return {
        'init': init
    }
});