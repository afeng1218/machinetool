/**
 * Created by SunJun on 2016/1/15
 */
define(["jquery", "../common", "layer", "lib/jquery.form", "datetimepicker", "fileinput"], function ($, COMMON, layer) {

    /*初始化页面参数*/
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

        $('#isMaterialEdit').val(0);

        /*初始参数设置*/
        COMMON.WS.ajax("materialDefinition/initPar", "get", "", true, function (data) {

            var length1 = data[0].length;//单位
            var length2 = data[1].length;//类别
            var length3 = data[2].length;//供应商
            var length4 = data[3].length;//人员
            var length5 = data[4].length;//采购员
            //初始化单位
            for (var i = 0; i < length1; i++) {

                $('#mainUnit ul').append('<li>' + data[0][i].unitName + '</li>');
                $('#supportUnit ul').append('<li>' + data[0][i].unitName + '</li>');
            }
            //初始化物料类别
            for (var i = 0; i < length2; i++) {

                $('#materialCategory ul').append('<li>' + data[1][i].category + '</li>');
                $('#modelClass ul').append('<li>' + data[1][i].category + '</li>');
            }
            //初始化供应商
            for (var i = 0; i < length3; i++) {

                $('#supplier ul').append('<li>' + data[2][i].supplier + '</li>');
            }
            //初始化计划员
            for (var i = 0; i < length4; i++) {

                $('#planMan ul').append('<li>' + data[3][i].name + '</li>');
            }
            //初始化采购员
            for (var i = 0; i < length5; i++) {

                $('#buyer ul').append('<li>' + data[4][i].buyer + '</li>');
            }
        });

        /*fileinput config*/
        $('#materialParPic').fileinput({
            'showCaption': false,//是否显示标题
            'showUpload': false, //是否显示上传按钮
            'showRemove': false,//是否显示删除按钮
            'showClose': false,//是否显示关闭按钮
            'dropZoneEnabled': true,//是否显示拖拽区域
            'allowedFileTypes': ['image'],//允许上传文件类型
            'browseClass': "btn btn-primary", //按钮样式
            'previewFileIcon': "<i class='glyphicon glyphicon-king'></i>"
        });

    }

    /*物料查询按钮click事件监听 加载物料查询页面*/
    $('#materialSearch').click(function () {

        layer.open({
            type: 2,
            title: false,//不显示表题
            shadeClose: true,
            shade: false,
            //maxmin: true, //开启最大化最小化按钮
            area: ['75%', '85%'],
            content: ['material_search.html']
        });
    });

    /*物料编号enter事件*/
    $('#zoneId').keydown(function (e) {

        if (e.keyCode == 13) {

            $('#materialSearch').click();
        }
    });

    /*版本查询click事件*/
    $('#versionDefinition').click(function () {

        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            shadeClose: false,
            shade: false,
            area: ['85%', '90%'],
            content: ['material_version.html']
        });
    });

    /*物料子库存按钮click事件*/
    $(document).on('click', '#materialSubStorage', function () {

        layer.open({
            type: 2,
            title: false,
            shadeClose: false,
            shade: false,
            area: ['85%', '90%'],
            content: ['sub_inventory.html']
        });

    });


    /*预览图片删除事件绑定*/
    // $('#iframeClick').click(function () {
    //
    //     /*图片 删除事件*/
    //     $('#imgPreviewClose').click(function () {
    //
    //         $('#imgPreview').remove();
    //
    //     });
    //
    //     /*图片 选择按钮 click事件 去除预览图片*/
    //     $('#materialParPic').click(function () {
    //
    //         if ($('#imgPreview').length > 0) {
    //
    //             $('#imgPreview').remove();
    //
    //         }
    //
    //     });
    // });
    //
    // /*重新绑定fileinput事件*/
    // $('#fileinputRebind').click(function () {
    //
    //     $('#materialParPic').fileinput();
    // });

    /*物料id失去焦点判断 设置隐藏input form内容*/
    $('#zoneId').blur(function () {

        var materialNo = $('#zoneId').val();//获取物料id
        $('#materialNo').val(materialNo);//设置物料id
    });

    /*菜单切换按钮点击事件*/
    $('.order').click(function (e) {

        var item = $(e.target);

        $('#status-bar').find('div').removeClass('select');
        item.addClass('select');
        $('#status-bar-value').val($(item).attr('data'));
        var v1 = $('#status-bar-value').val();
        showDiv(v1);
    });
    /*显示div*/
    function showDiv(v1) {

        $(".material_tab").children().css("display", "none");
        $("#material_tab" + v1).css("display", "block");
    }

    /*主要单位下拉菜单选择事件*/
    $('#mainUnit').click(function () {

        $('#mainUnit ul').toggle();
        $('#mainUnit ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#mainUnitValue').val(t1);
        })
    });
    /*辅助单位下拉菜单选择事件*/
    $('#supportUnit').click(function () {

        $('#supportUnit ul').toggle();
        $('#supportUnit ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#supportUnitValue').val(t1);
        })
    });
    /*物料类型下拉菜单选择事件*/
    $('#materialType').click(function () {

        $('#materialType ul').toggle();
        $('#materialType ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#materialTypeValue').val(t1);
        })
    });
    /*图片选择按钮click事件*/
    $('#materialParPic').click(function () {

        if ($('#imgPreview').length > 0) {

            $('#imgPreview').remove();

        }

    });

    /*物料类别下拉菜单选择事件*/
    $('#materialCategory').click(function () {

        $('#materialCategory ul').toggle();

        $('#materialCategory ul li').click(function (event) {

            $('#materialPar tbody').remove();

            var t1 = $(event.target).text();

            $('#materialCategoryValue').val(t1);
            $('#modelClassValue').val(t1);
            $('#materialClass').val(t1);


            /*重置fileinput按钮*/
            // if ($('#materialParForm span').length > 0) {
            //
            //     $('#materialParForm span').remove();
            //     $('#materialParForm').append(' <input id="materialParPic" name="materialParPic" class="file" type="file" data-show-caption="false"/>');
            //     $('#materialParPic').fileinput();
            //
            //     /*图片选择按钮click事件*/
            //     $('#materialParPic').click(function () {
            //
            //         if ($('#imgPreview').length > 0) {
            //
            //             $('#imgPreview').remove();
            //
            //         }
            //
            //     });
            //
            // }

            //根据选择模型类型 加载不同的图片以及参数表
            var uploadValue = {
                "materialClass": t1
            };
            COMMON.WS.local("materialDefinition/modelClassChoose", "get", uploadValue, true, function (data) {

                //如果图片字段不为空 获取图片位置信息
                if (data[0] != 'null' && data[0] != '') {

                    if ($('#materialParDiv img').length > 0) {

                        $('#materialParDiv img').remove();

                    }
                    $('#materialParDiv').append('' +
                        '<img src="uploadImg\\' + data[0][0] + '" style="width: 385px;height:auto;padding-bottom: 10px;"/>');
                    /*$('#imgPreviewClose').click(function () {

                     $('#imgPreview').remove();

                     });*/

                }
                //改变参数
                $('#materialPar tbody').remove();

                var parList = data[1];

                if (parList != '' && parList != null) {

                    for (var i = 0; i < parList.length; i++) {

                        if (parList[i].parName == '') {

                            continue;
                        }

                        $('#materialPar').append('' +
                            '<tr>' +
                            '<td style="width: 35%">' +
                            '<span>' + parList[i].parName + '</span>' +
                            '</td>' +
                            '<td style="width: 65%">' +
                            '<input value="' + parList[i].parValue + '" type="text" class="col-md-1 form-control" style="width: 180px;margin-right:' +
                            ' 0;margin-left: 10px;"/>' +
                            '</td>' +
                            '</tr>');
                    }
                }

            });
        })
    });
    /*启用状态下拉菜单事件*/
    $('#enableState').click(function () {

        $('#enableState ul').toggle();
        $('#enableState ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#enableStateValue').val(t1);
        })
    });
    /*限制子库存限制选择事件*/
    $('#limitInventoryCheckBox').change(function () {

        if (($('#limitInventoryCheckBox').prop('checked')) == true) {

            $('#limitLibrary').prop("disabled", false);
        } else {

            $('#limitLibrary').prop("checked", false);
            $('#limitLibrary').prop("disabled", true);
        }
    });
    /*库存计划方法下拉选择事件*/
    $('#planMethod').click(function () {

        $('#planMethod ul').toggle();
        $('#planMethod ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#planMethod input').val(t1);
        })
    });
    /*制造或采购下拉选择事件*/
    $('#makeOrPurchase').click(function () {

        $('#makeOrPurchase ul').toggle();
        $('#makeOrPurchase ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#makeOrPurchase input').val(t1);
        })
    });
    /*供应商下拉选择事件*/
    $('#supplier').click(function () {

        $('#supplier ul').toggle();
        $('#supplier ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#supplier input').val(t1);
        })
    });
    //采购员下拉选择事件
    $('#buyer').click(function () {

        $('#buyer ul').toggle();
        $('#buyer ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#buyer input').val(t1);
        })
    });
    //计划员下拉选择事件
    $('#planMan').click(function () {

        $('#planMan ul').toggle();
        $('#planMan ul li').click(function (event) {
            var t1 = $(event.target).text();
            $('#planMan input').val(t1);
        })
    });

    /*节点选择事件*/
    $('#node').click(function () {

        $('#nodeSelect').toggle();
    });
    $('#nodeSelect').click(function (event) {

        var selectValue = $(event.target).text();
        $('#nodeSelect').toggle();
        $('#nodeText').val(selectValue);
    });


    /*保存监听事件*/
    $('#saveBtn').click(function () {

        var materialId = $('#zoneId');//物料编号不为空
        var mainUnitValue = $('#mainUnitValue');//主要单位不为空
        var supportUnitValue = $('#supportUnitValue');//辅助单位不为空
        var unitTransaction = $('#unitTransaction');//单位转换不为空
        var materialTypeValue = $('#materialTypeValue');//物料类型不为空
        var materialCategoryValue = $('#materialCategoryValue');//物料类别不为空
        var enableStateValue = $('#enableStateValue');//启用状态不为空
        var marks = $('#marks');//备注不为空

        if (materialId.val() == '') {

            layer.tips('物料编号不能为空！', materialId);

        } else if (mainUnitValue.val() == '') {

            layer.tips('主要单位不能为空！', mainUnitValue);

        } else if (supportUnitValue.val() == '') {

            layer.tips('辅助单位不能为空！', supportUnitValue);

        } else if (unitTransaction.val() == '') {

            layer.tips('单位转换不能为空！', unitTransaction);

        } else if (materialTypeValue.val() == '') {

            layer.tips('物料类型不能为空！', materialTypeValue);

        } else if (materialCategoryValue.val() == '') {

            layer.tips('物料类别不能为空！', materialCategoryValue);

        } else if (enableStateValue.val() == '') {

            layer.tips('启用状态不能为空！', enableStateValue);

            /*查看是否选中版本控制*/
        } else if ($('#versionControl').prop('checked') && $('#versionTable tbody tr').length == 0) {

            $('#status-bar div').eq(1).click();
            layer.tips('版本控制必须添加物料版本！', $('#versionControl'));

        } else {

            var win=layer.confirm("是否确认保存？",
                {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    layer.close(win);
                    win=layer.open({type:3});
                    var materialDefinition = [];//物料定义数组
                    var enableVersion = 0;//有效版本个数
                    var tableLength = $('#versionTable tbody tr').length;//tr个数
                    for (var i = 0; i < tableLength; i++) {//计算有效版本个数

                        var versionNo = $('#versionTable tbody tr').eq(i).find('td').eq(1).text();//版本号
                        if (versionNo != '' && versionNo != 'null') {

                            enableVersion++;
                        }
                    }

                    materialDefinition.push({//是否是编辑物料

                        'isMaterialEdit': $('#isMaterialEdit').val()
                    });

                    materialDefinition.push({//封装物料编号

                        'materialId': $('#zoneId').val()
                    });

                    materialDefinition.push({//封装有效版本个数

                        'enableVersion': enableVersion
                    });

                    if (enableVersion > 0) {//封装版本数据

                        for (var i = 0; i < tableLength; i++) {//遍历所有tr

                            var tr = $('#versionTable tbody tr').eq(i);
                            var versionNo = tr.children().eq(1).text();
                            if (versionNo != '' && versionNo != 'null') {

                                var data = {};
                                data['materialVersionNo'] = versionNo;
                                data['versionExplain'] = tr.children().eq(2).text();
                                data['startDate'] = tr.children().eq(3).text();
                                data['defaultVersionOrnot'] = tr.children().eq(5).text();
                                materialDefinition.push(data);
                            }
                        }
                    }

                    //封装物料描述数据
                    materialDefinition.push({
                        'materialDescription': $('#materialDescription').val()
                    });
                    //封装条形码数据
                    materialDefinition.push({

                        'barCode': $('#barCode').val()
                    });
                    //封装主要页面数据
                    materialDefinition.push({
                        'mainUnitValue': mainUnitValue.val(),//主要单位
                        'supportUnitValue': supportUnitValue.val(),//辅助单位
                        'unitTransaction': unitTransaction.val(),//单位转换率
                        'materialTypeValue': materialTypeValue.val(),//物料类型
                        'materialCategoryValue': materialCategoryValue.val(),//物料类别
                        'enableStateValue': enableStateValue.val(),//启用状态
                        'marks': marks.val()//备注
                    });

                    //封装库存页面数据
                    var stockMaterial = 0;
                    var versionControl = 0;
                    var storage = 0;
                    var handle = 0;
                    var retain = 0;

                    var batchStoragePeriod = 0;
                    var batchControl = 0;
                    var sequenceControl = 0;

                    var stockControl = 0;

                    var limitInventoryCheckBox = 0;
                    var limitLibrary = 0;
                    if ($('#stockMaterial').prop('checked')) {

                        stockMaterial = 1;
                    }
                    if ($('#versionControl').prop('checked')) {

                        versionControl = 1;
                    }
                    if ($('#storage').prop('checked')) {

                        storage = 1;
                    }
                    if ($('#handle').prop('checked')) {

                        handle = 1;
                    }
                    if ($('#retain').prop('checked')) {

                        retain = 1;
                    }
                    if ($('#batchStoragePeriod').children().eq(0).html() == '控制') {

                        batchStoragePeriod = 1;
                    }
                    if ($('#batchControl').children().eq(0).html() == '完全控制') {

                        batchControl = 1;
                    }
                    if ($('#sequenceControl').children().eq(0).html() == '库存接收时') {

                        sequenceControl = 1;
                    }
                    if ($('#stockControl').children().eq(0).html() == '动态输入') {

                        stockControl = 1;
                    } else if ($('#stockControl').children().eq(0).html() == '预指定') {

                        stockControl = 2;
                    }
                    if ($('#limitInventoryCheckBox').prop('checked')) {

                        limitInventoryCheckBox = 1;
                    }
                    if ($('#limitLibrary').prop('checked')) {

                        limitLibrary = 1;
                    }

                    materialDefinition.push({//库存页面数据封装

                        'stockMaterial': stockMaterial,//库存物料
                        'versionControl': versionControl,//版本控制
                        'storage': storage,//可存储
                        'handle': handle,//可处理
                        'retain': retain,//可保留
                        'batchStoragePeriod': batchStoragePeriod,//批次存储控制
                        'storagePeriod': $('#storagePeriod').children().eq(0).html(),//存储期限单位
                        'batchControl': batchControl,//批次控制
                        'batchControlStartNo': $('#batchControlStartNo').val(),//批次控制起始编号
                        'sequenceControl': sequenceControl,//序列控制
                        'sequenceControlStartNo': $('#sequenceControlStartNo').val(),//序列控制起始编号
                        'stockControl': stockControl,//库位控制
                        'limitInventoryCheckBox': limitInventoryCheckBox,//限制子库存
                        'limitLibrary': limitLibrary//限制库位
                    });

                    //封装参数页面数据
                    var materialPar = $('#materialPar tbody').length;//判断有没有tbody
                    var parCount = 0;
                    if (materialPar > 0) {

                        parCount = $('#materialPar tbody').children().length;//tr个数
                    }
                    /* materialDefinition.push({//参数页面数据封装

                     'modelClassValue': $('#modelClassValue').val(),//模型类型
                     });*/
                    materialDefinition.push({

                        'parCount': parCount//参数个数
                    });
                    var tr = $('#materialPar tbody').children();
                    for (var i = 0; i < parCount; i++) {//参数封装

                        materialDefinition.push({

                            'parName': tr.eq(i).children().eq(0).find('span').text(),//参数名
                            'parValue': tr.eq(i).children().eq(1).find('input').val()//参数值
                        });
                    }
                    //采购页面数据封装
                    materialDefinition.push({

                        'buyer': $('#buyer').find('input').val(),//采购员
                        'unit': $('#unit').val()//价格
                    });
                    //计划页面数据封装
                    materialDefinition.push({

                        'planMethod': $('#planMethod').find('input').val(),//计划方法
                        'planMan': $('#planMan').find('input').val(),//计划员
                        'makeOrPurchase': $('#makeOrPurchase').find('input').val(),//制造或采购
                        'minMaxMin': $('#minMaxMin').val(),//最小最大-最小值
                        'minMaxMax': $('#minMaxMax').val(),//最小最大-最大值
                        'orderMin': $('#orderMin').val(),//订单最小
                        'orderMax': $('#orderMax').val(),//订单最大
                        'costOrder': $('#costOrder').val(),//成本 订单
                        'costSafeKeep': $('#costSafeKeep').val(),//成本 保管
                        'sourceSupplier': $('#sourceSupplier').val(),//来源 供应商

                    });
                    //安全库存
                    materialDefinition.push({

                        'safeStockDays': $('#safeStockDays').val(),//安全库存天数
                        'safeStockPercent': $('#safeStockPercent').val()//安全库存百分比

                    });
                    //提前期数据封装
                    materialDefinition.push({

                        'preProcess': $('#preProcess').val(),//预加工
                        'inProcess': $('#inProcess').val(),//加工中
                        'postProcess': $('#postProcess').val()//后加工
                    });

                    //通用物料基础信息上传
                    //转换成json数据
                    var versionJson = JSON.stringify(materialDefinition);

                    COMMON.WS.restful("materialDefinition/materialDefinitionUpload", "post", versionJson, true, function (data) {
                        if (data.result == 'success') {
                            /*如果是物料信息编辑*/
                            if ($('#isMaterialEdit').val() == '1') {
                                layer.close(win);
                                layer.msg('通用物料基础信息更新成功！');
                            } else {
                                /**
                                 * 发送立体库
                                 */
                                var materialNo = $('#zoneId').val();
                                var materialDescription = $('#materialDescription').val();
                                var unit = $('#mainUnitValue').val();
                                var sendLine = materialNo + ';' + materialDescription + ';' + unit;
                                var uploadValue = {
                                    source: 'material',
                                    fileName: materialNo + '_' + new Date().getTime() + '.txt',
                                    sendValue: [{sendLine: sendLine}]
                                };
                                var uploadJson = JSON.stringify(uploadValue);
                                COMMON.WS.restful('sendStereoLibrary/send', 'post', uploadJson, true, function (data) {
                                    layer.close(win);
                                    if (data.result == 'true') {
                                        layer.msg('通用物料基础信息保存成功！发送立体库成功！');
                                    } else {
                                        layer.msg('通用物料基础信息保存成功！' + data.result);
                                    }
                                });
                            }
                        } else if (data.result == 'exist') {
                            layer.close(win);
                            layer.msg('该物料已存在！请重新输入物料编号！');
                        } else {
                            layer.close(win);
                            layer.msg('保存失败！' + data.result);
                        }
                    });
                });
        }
    });

    /*删除监听事件*/
    $('#deleteBtn').click(function () {

        if ($('#zoneId').prop('readonly') != true) {

            layer.msg('请先选择需要删除的物料！');


        } else {

            layer.confirm("是否确认删除物料信息？",
                {
                    btn: ['确认', '取消']
                }, function () {

                    var uploadValue = {
                        materialNo: $('#zoneId').val()
                    };
                    COMMON.WS.local('materialDefinition/materialDelete', 'get', uploadValue, true, function (data) {

                        if (data.hasOwnProperty('errorMessage')) {

                            layer.msg(data.errorMessage);
                        } else {

                            if (data.result == 'true') {

                                $('#zoneId').attr('readonly', false);
                                $('input[type=reset]').trigger('click');//触发reset按钮
                                /*批次存储期限控制重置*/
                                $('#batchStoragePeriod span:first').text('不控制');
                                /*批次控制重置*/
                                $('#batchControl span:first').text('不控制');
                                /*序列控制重置*/
                                $('#sequenceControl span:first').text('不控制');
                                /*库位控制重置*/
                                $('#stockControl span:first').text('不控制');
                                layer.msg('物料删除成功！');

                            } else {

                                layer.msg('物料删除失败！改物料已被"' + data.result + '"占用！', {time: 5000});
                            }

                        }

                    });
                });

        }


    });

    /*重置按钮监听*/
    $('#resetBtn').click(function () {

        try {

            $('#zoneId').attr('readonly', false);
            $('input[type=reset]').trigger('click');//触发reset按钮
            $('#imgPreview').remove();//删除图片
            $('#materialPar tbody').remove();//删除参数信息
            $('#isMaterialEdit').val(0);//重置之后改变物料页面为新增物料状态
            $('#versionTable tbody').remove();//清空隐藏的版本
            layer.msg('重置成功！');

        } catch (e) {

            console.log(e.message);
            layer.msg(e.message);
        }

    });


    //返回入口
    return {
        "init": init
    };
});
/*下拉框选择*/
function batchStoragePeriodDropBox(type, event) {

    if (type == '1') {

        $("#batchStoragePeriod").html("<span>" + event + "</span> <span class=caret></span>");

    } else if (type == '2') {

        $("#storagePeriod").html("<span>" + event + "</span> <span class=caret></span>");

    } else if (type == '3') {

        $("#batchControl").html("<span>" + event + "</span> <span class=caret></span>");

    } else if (type == '4') {

        $("#sequenceControl").html("<span>" + event + "</span> <span class=caret></span>");

    } else if (type == '5') {

        $("#stockControl").html("<span>" + event + "</span> <span class=caret></span>");

    }

}
/*表单提交*/
function saveReport() {

    // jquery 表单提交
    $("#materialDefinitionForm").ajaxSubmit(function (message) {
        // 对于表单提交成功后处理，message为提交页面saveReport.htm的返回内容
        if (message == 1) {

            layer.msg('保存成功');
        } else {

            layer.msg('保存失败');
        }
    });
    return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
}
