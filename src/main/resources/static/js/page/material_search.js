/**
 * Created by SunJun on 2016/3/20.
 * TODO 通用物料查询界面js 更具不同父页面进行不同的js处理
 */
define(['jquery', 'common'], function ($, COMMON) {

    /*获取窗口索引*/
    var index = parent.layer.getFrameIndex(window.name);
    /*获取物料查询页面的父页面pageName，选择不同的js事件处理*/
    var pageName = $('#pageName', parent.document).val();

    function materialSearch(_dblclick) {

        //获取查询条件
        var searchValue = $('#materialSearchValue').val();

        if (searchValue != '') {

            //封装上传数据
            var uploadValue = {
                "searchValue": searchValue,
            };
            if (searchValue != '') {

                COMMON.WS.local('materialDefinition/materialSearch', 'get', uploadValue, true, function (data) {

                    $('#materialSearchTable tbody').remove();
                    var length = data.length;
                    var materialDescribe = '';
                    for (var i = 0; i < length; i++) {

                        if (data[i].materialDescribe != null) {

                            materialDescribe = data[i].materialDescribe;

                        }
                        $('#materialSearchTable').append(
                            '<tr>' +
                            '<td class="chooseMaterial">' + data[i].materialNo + '</td>' +
                            '<td class="chooseMaterial">' + materialDescribe + '</td>' +
                            '</tr>'
                        );
                    }

                    //物料查询结果绑定双击事件  绑定双击事件data
                    $('.chooseMaterial').bind('dblclick', function (e) {

                        _dblclick(e);
                    });
                });
            }
        }
    }

    /*物料查询页面 通用物料查询方法 通过回掉方法 设置绑定不同的表格行双击事件*/
    function materialSearchDblclick(_dblclick) {

        /*物料查询查询按钮点击事件监听*/
        $('#materialSearchBtn').click(function () {

            materialSearch(_dblclick);
        });
        /*input enter事件绑定*/
        $('#materialSearchValue').keydown(function (e) {

            if (e.which == '13') {

                materialSearch(_dblclick);
            }

        });
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

        /*查询框enter事件监听*/
        $('#materialSearchValue').keydown(function (e) {

            if (e.keyCode == 13) {

                $('#materialSearchBtn').click();
            }
        });

        /*物料定义页面*/
        if ('materialDefinition' == pageName) {

            materialSearchDblclick(function (e) {

                var materialChoose = $(e.target);
                $('#zoneId', parent.document).attr('readonly', 'true');//设置物料编号只读
                $('#versionDefinition', parent.document).html('版本编辑');//设置按钮文字显示
                $('#versionId', parent.document).val('');//清空版本输入框

                $('#isMaterialEdit', parent.document).val(1);//设置物料是编辑的物料
                $('#materialSearchClose', parent.document).click();//关闭物料选择对话框

                var materialNo = $($(materialChoose.parent().children()).get(0)).html();
                $('#zoneId', parent.document).val(materialNo);//设置物料编号
                $('#materialDescription', parent.document).val($($(materialChoose.parent().children()).get(1)).html());//设置物料描述
                var uploadMaterialNo = {

                    'materialNo': materialNo

                };
                //页面信息查询并且设置页面信息
                COMMON.WS.local('materialDefinition/materialEdit', 'get', uploadMaterialNo, true, function (data) {

                    var material = data[0][0];//物料基本信息

                    $('#barCode', parent.document).val(material.secondCode);//设置条形码
                    $('#mainUnitValue', parent.document).val(material.materialUnit);//设置主要单位
                    $('#supportUnitValue', parent.document).val(material.auxiliaryUnit);//设置辅助单位
                    $('#unitTransaction', parent.document).val(material.transferCoefficient);//设置转换率
                    $('#materialTypeValue', parent.document).val(material.materialType);//设置物料类型
                    $('#materialCategoryValue', parent.document).val(material.materialClass);//设置物料类别
                    $('#enableStateValue', parent.document).val(material.state);//设置启用状态
                    $('#marks', parent.document).val(material.remarks);//备注

                    /**
                     * 库存信息设置
                     */
                    if (material.versionControlOrnot == 1) {

                        $('#versionControl', parent.document).prop('checked', true);

                    } else {

                        $('#versionControl', parent.document).prop('checked', false);

                    }
                    if (material.storagePeriodControl == 1) {

                        $('#batchStoragePeriod span:first', parent.document).html('控制');//批次存储控制

                    } else {

                        $('#batchStoragePeriod span:first', parent.document).html('不控制');//批次存储控制

                    }

                    $('#storagePeriod span:first', parent.document).html(material.storagePeriodUnit);//批次存储控制 单位

                    if (material.batchControl == 1) {

                        $('#batchControl span:first', parent.document).html('完全控制');//批次控制

                    } else {

                        $('#batchControl span:first', parent.document).html('不控制');//批次控制

                    }

                    $('#batchControlStartNo', parent.document).val(material.batchControlStartNo);//批次控制起始编号

                    if (material.sequenceControl == 1) {

                        $('#sequenceControl span:first', parent.document).html('库存接收时');//序列控制

                    } else {

                        $('#sequenceControl span:first', parent.document).html('不控制');//序列控制

                    }

                    $('#sequenceControlStartNo', parent.document).val(material.sequenceStartNo);//序列起始编号

                    if (material.libraryControl == 1) {

                        $('#stockControl span:first', parent.document).html('动态输入');

                    } else if (material.libraryControl == 2) {

                        $('#stockControl span:first', parent.document).html('预指定');

                    } else {

                        $('#stockControl span:first', parent.document).html('不控制');

                    }

                    //限制子库存
                    if (material.restrictedSubInventory == 1) {

                        $('#limitInventoryCheckBox', parent.document).prop('checked', true);

                    } else {

                        $('#limitInventoryCheckBox', parent.document).prop('checked', false);

                    }

                    //限制库位
                    if (material.restrictedCargoSpace == 1) {

                        $('#limitLibrary', parent.document).prop('checked', true);

                    } else {

                        $('#limitLibrary', parent.document).prop('checked', false);

                    }

                    /**
                     * 判断是否已经有库存
                     */
                    var storageStatus = data[3];
                    if (storageStatus == 1) {

                        //版本控制
                        $('#versionControl', parent.document).prop('disabled', true);
                        //批次存储期限控制
                        $('#batchStoragePeriod', parent.document).removeAttr('data-toggle');
                        //存储期限
                        $('#storagePeriod', parent.document).removeAttr('data-toggle');
                        //批次控制
                        $('#batchControl', parent.document).removeAttr('data-toggle');
                        //批次控制其实编号
                        $('#batchControlStartNo', parent.document).prop('readonly', true);
                        //序列控制
                        $('#sequenceControl', parent.document).removeAttr('data-toggle');
                        //序列控制起始编号
                        $('#sequenceControlStartNo', parent.document).prop('readonly', true);
                        //库位控制
                        $('#stockControl', parent.document).removeAttr('data-toggle');
                        //限制子库存
                        $('#limitInventoryCheckBox', parent.document).prop('disabled', true);
                        //限制子库位
                        $('#limitLibrary', parent.document).prop('disabled', true);
                        //解除物料子库存click事件
                        $("#materialSubStorage", parent.document).remove();

                    } else {

                        //版本控制
                        $('#versionControl', parent.document).removeAttr('disabled');
                        //批次存储期限控制
                        $('#batchStoragePeriod', parent.document).prop('data-toggle', 'dropdown');
                        //存储期限
                        $('#storagePeriod', parent.document).prop('data-toggle', 'dropdown');
                        //批次控制
                        $('#batchControl', parent.document).prop('data-toggle', 'dropdown');
                        //批次控制其实编号
                        $('#batchControlStartNo', parent.document).removeAttr('readonly');
                        //序列控制
                        $('#sequenceControl', parent.document).prop('data-toggle', 'dropdown');
                        //序列控制起始编号
                        $('#sequenceControlStartNo', parent.document).removeAttr('readonly');
                        //库位控制
                        $('#stockControl', parent.document).prop('data-toggle', 'dropdown');
                        //限制子库存
                        $('#limitInventoryCheckBox', parent.document).removeAttr('disabled');

                        if ($('#materialSubStorage', parent.document).length <= 0) {

                            $('#storageFootDiv', parent.document).append('' +
                                '<div style="float: right;width: 100px;margin-top: 0;margin-right: 100px"' +
                                'class="sesol-btn txt-fff bg-449dd7 margin-top-50" id="materialSubStorage">' +
                                '物料/子库存' +
                                '</div>');
                        }
                    }
                    //模型类型
                    $('#modelClassValue', parent.document).val(material.materialClass);
                    //隐藏物料类别参数
                    $('#materialClass', parent.document).val(material.materialClass);

                    //判断是否有图片
                    var picName = data[3].picture;
                    /*删除之前的图片信息*/
                    if ($('#materialParDiv img', parent.document).length > 0) {
                        $('#materialParDiv img', parent.document).remove();
                    }
                    /*图片加载*/
                    $('#materialParDiv', parent.document).append('' +
                        '<img src="uploadImg/' + picName + '" class="file-preview-image" ' +
                        'style="width:385px;height:auto;padding-bottom: 10px;"/>');
                    //给父窗口传递信息 绑定事件
                    $('#iframeClick', parent.document).click();


                    //设置参数
                    var par = data[1];
                    if ($('#materialPar tbody', parent.document).length > 0) {

                        $('#materialPar tbody', parent.document).remove();

                    }
                    for (var i = 0; i < par.length; i++) {

                        var parName = par[i].id.parameterName;//获取参数名
                        var parValue = par[i].parameterValue;//获取参数值
                        $('#materialPar', parent.document).append('<tr>' +
                            '<td style="width: 35%">' +
                            '<span>' + parName + '</span>' +
                            '</td>' +
                            '<td style="width: 65%">' +
                            '<input type="text" size="15" class="col-md-1 form-control" ' +
                            'style="width: 180px;margin-right: 0;margin-left: 10px;" value="' + parValue + '"/>' +
                            '</td>' +
                            '</tr>');//添加行

                    }

                    /*采购信息获取*/
                    $('#buyer input', parent.document).val(material.buyer);
                    $('#unit', parent.document).val(material.unit);


                    /*计划信息获取*/
                    $('#planMethod input', parent.document).val(material.inventoryPlan);
                    $('#planMan input', parent.document).val(material.planner);
                    $('#makeOrPurchase input', parent.document).val(material.manufactureOrProcure);
                    $('#minMaxMin', parent.document).val(material.inventoryMin);
                    $('#minMaxMax', parent.document).val(material.inventoryMax);
                    $('#orderMin', parent.document).val(material.orderAmountMin);
                    $('#orderMax', parent.document).val(material.orderAmountMax);
                    $('#costOrder', parent.document).val(material.costOrder);
                    $('#safeStockPercent', parent.document).val(material.keepRate);

                    $('#safeStockDays', parent.document).val(material.safetyInventoryDays);
                    $('#safeStockPercent', parent.document).val(material.safetyInventoryPercentage);

                    //提前期信息获取
                    $('#preProcess', parent.document).val(material.inPreprocessing);
                    $('#inProcess', parent.document).val(material.inProcessing);
                    $('#postProcess', parent.document).val(material.postprocessing);

                    //版本信息获取
                    var version = data[2];
                    if ($('#versionTable tbody', parent.document).length > 0) {

                        $('#versionTable tbody', parent.document).remove();

                    }
                    for (var i = 0; i < version.length; i++) {

                        var versionNo = version[i].id.materialVersionNo;
                        var versionExplain = version[i].versionExplain;
                        var startDate = COMMON.LOCAL_TIME.getLocalTime(version[i].startDate);
                        var defaultVersionOrnot = version[i].defaultVersionOrnot;

                        /*如果是默认版本*/
                        if (defaultVersionOrnot == 1) {

                            $('#versionId', parent.document).val(versionNo);

                        } else {

                            $('#versionId', parent.document).val('');
                        }

                        $('#versionTable', parent.document).append(
                            '<tr data-no="' + (i + 1) + '">' +
                            '<td style="padding: 0;height: 34px;"> ' +
                            '<label class="radio-inline" style="padding-left: 0;">' +
                            '<input type="checkbox" class="rowCheckBox"/> ' + (i + 1) + '' +
                            '</label>' +
                            '</td>' +
                            '<td style="padding: 0;height: 34px;" class="versionNo clickTd">' + versionNo + '</td>' +
                            '<td style="padding: 0;height: 34px;" class="versionExplain clickTd">' + versionExplain + '</td>' +
                            '<td style="padding: 0;height: 34px;" class="startDate" style="width: 250px;">' + startDate + '</td>' +
                            '<td style="padding: 0;height: 34px;">' +
                            '<span style="cursor: pointer;" class="glyphicon glyphicon-ok versionChoose" data-version=""/>' +
                            '</td>' +
                            '<td class="default" style="display: none;">' + defaultVersionOrnot + '</td>' +
                            '</tr>'
                        );


                    }

                    /*设置物料状态*/
                    $('#state', parent.document).val('edit');

                    //关闭窗口
                    parent.layer.close(index);

                });
            });

            /*获取物料id并且查询*/
            $('#materialSearchValue').val($('#zoneId', parent.document).val());
            $('#materialSearchBtn').click();

        }

        /*库存明细页面*/
        if ('inventoryDetail' == pageName) {

            materialSearchDblclick(function (e) {

                var materialChoose = $(e.target).parent();
                $('#materialNo', parent.document).val(materialChoose.find('td:first').html());
                $('#materialExplain', parent.document).val(materialChoose.find('td:last').html());

                parent.layer.close(index);

            });
        }
        /*采购申请页面*/
        if ('purchaseRequisition' == pageName) {

            materialSearchDblclick(function (e) {

                var tr = $(e.target).parent();

                var materialNo = tr.find('td').eq(0).html();
                var materialExplain = tr.find('td').eq(1).html();
                //var searchStorage = $('.edit td', parent.document).eq(6).find('div button span:first-child').html();

                /*判断物料编号是否重复*/
                var parentAllTr = $('.tr', parent.document);
                for (var i = 0; i < parentAllTr.length; i++) {

                    if (!parentAllTr.eq(i).hasClass('edit') && parentAllTr.eq(i).find('td').eq(1).find('span:first-child').html() == materialNo) {

                        parent.layer.tips('申请物料不能重复！', $('.edit td', parent.document).eq(1), {time: 2000});
                        parent.layer.close(index);

                    }
                }

                /*编辑行*/
                var editTr = $('.edit', parent.document);

                var searchStorage = editTr.find('td').eq(6).text();
                /*根据物料编号查询申请信息*/
                var uploadVal = {
                    'materialNo': materialNo,
                    'searchStorage': searchStorage
                };
                /*根据选择物料信息加载和计算不同申请信息*/
                COMMON.WS.local('purchaseRequisition/getMaterialRequisitionMsg', 'get', uploadVal, true, function (data) {

                    var editMaterialNo = editTr.find('td').eq(1);
                    var no = editMaterialNo.children('span:first');
                    if (no.hasClass('no')) {

                        no.remove();
                    }
                    /*设置物料编号*/
                    editMaterialNo.prepend('<span class="no">' + materialNo + '</span>');
                    /*设置物料描述*/
                    editTr.find('td').eq(3).html(materialExplain);
                    /*设置物料品牌*/
                    if (data.materialBrand == '') {

                        editTr.find('td').eq(2).html('');

                    } else {

                        editTr.find('td').eq(2).css("padding-left", 0);
                        editTr.find('td').eq(2).css("padding-right", 0);
                        editTr.find('td').eq(2).html('');
                        for (var i = 0; i < data.materialBrand[0].length; i++) {

                            /*判断是否是默认版本*/
                            if (data.materialBrand[0][i].isDefaultVersion != 0) {

                                editTr.find('td').eq(2).html(data.materialBrand[0][i].brand);
                            }
                        }

                    }
                    /*设置单位*/
                    editTr.find('td').eq(4).html(data.unit);
                    /*设置上月消耗*/
                    if (data.lastMonthConsumption == '') {

                        editTr.find('td').eq(8).html(0);
                    } else {

                        editTr.find('td').eq(8).html(data.lastMonthConsumption);
                    }
                    /*设置当前库存*/
                    if (data.currentConsumption == '') {

                        editTr.find('td').eq(9).html(0);
                    } else {

                        editTr.find('td').eq(9).html(data.currentConsumption);
                    }
                    /*全部库存*/
                    if (data.allConsumption == '') {

                        editTr.find('td').eq(10).html(0);
                    } else {

                        editTr.find('td').eq(10).html(data.allConsumption);
                    }
                    /*设置目的地、申请人、行状态 隐藏表格信息 以及显示信息*/
                    /*editTr.find('td').eq(12).html(data.destination);
                     editTr.find('td').eq(13).html(data.applicant);*/
                    editTr.find('td').eq(14).html('需要审批');

                    /*  $('#destination', parent.document).val(data.destination);
                     $('#applicant', parent.document).val(data.applicant);*/

                    /*去除标志*/
                    $('.edit', parent.document).removeClass('edit');
                    /*关闭弹出框*/
                    parent.layer.close(index);

                });

            });
        }
        /*采购申请汇总页面 or 采购协议汇总 */
        if ('purchaseRequisitionSummary' == pageName || 'purchaseAgreementSummary' == pageName) {

            materialSearchDblclick(function (e) {

                var tr = $(e.target).parent();
                var materialNo = tr.find('td:first-child').html();
                $('#materialNo', parent.document).val(materialNo);
                var uploadVal = {
                    'materialNo': materialNo
                };
                COMMON.WS.local('purchaseRequisition/getMaterialVersion', 'get', uploadVal, true, function (data) {

                    $('#materialVersion', parent.document).val(data.version);
                    /*关闭查询页面*/
                    parent.layer.close(index);
                });
            });
        }
        /*刀具定义页面*/
        if ('cuttoolDefinition' == pageName) {

            materialSearchDblclick(function (e) {

                var tr = $(e.target).parent();
                var materialNo = tr.find('td').eq(0).html();

                /*判断物料编号是否重复*/
                var parentAllTr = $('.Mtr', parent.document);
                for (var i = 0; i < parentAllTr.length; i++) {
                    if (!parentAllTr.eq(i).hasClass('edit') && parentAllTr.eq(i).find('td').eq(1).find('span.Mno_span').text() == materialNo) {
                        parent.layer.tips('装配物料不能重复！', $('.edit td', parent.document).eq(1), {time: 2000});
                        parent.layer.close(index);
                    }
                }


                var searchTr = $(e.target).parent();
                var mNo = searchTr.find('td:first-child').html();
                var materialChoose = $(e.target);
                var flag = $('#flag', parent.document).val();
                $('#tab2_material_table', parent.document).find('tr').eq(flag).find('td').eq(1).find('span').eq(0).text(mNo);
                $('#tab2_material_table', parent.document).find('tr').eq(flag).find('td').eq(2).find('span').eq(0).text($($(materialChoose.parent().children()).get(1)).html());
                // $('#tab2_table_materialdesc' + flag, parent.document).text();
                var uploadVal = {
                    'searchValue': mNo
                };
                COMMON.WS.local('materialDefinition/materialSearch', 'get', uploadVal, false, function (data) {

                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        if (data[i].materialUnit != null) {
                            $('#tab2_material_table', parent.document).find('tr').eq(flag).find('td').eq(4).find('span').eq(0).text(data[i].materialUnit);
                        }
                    }
                });
                parent.layer.close(index);

            });
        }
        /*刀具借用页面*/
        if ('cuttoolBorrow' == pageName) {
            materialSearchDblclick(function (e) {
                var tr = $(e.target).parent();
                var materialNo = tr.find('td').eq(0).html();
                var materialExplain = tr.find('td').eq(1).html();

                /*判断物料编号是否重复*/
                var parentAllTr = $('.tr', parent.document);
                for (var i = 0; i < parentAllTr.length; i++) {
                    if (!parentAllTr.eq(i).hasClass('edit') && parentAllTr.eq(i).find('td').eq(1).find('span:first-child').html() == materialNo) {
                        parent.layer.tips('申请借用物料不能重复！', $('.edit td', parent.document).eq(1), {time: 2000});
                        parent.layer.close(index);
                    }
                }
                /*编辑行*/
                var editTr = $('.edit', parent.document);
                var searchStorage = editTr.find('td').eq(6).text();
                /*根据物料编号查询申请信息*/
                var uploadVal = {
                    'materialNo': materialNo,
                    'searchStorage': searchStorage
                };
                /*根据选择物料信息加载和计算不同申请信息*/
                COMMON.WS.local('purchaseRequisition/getMaterialRequisitionMsg', 'get', uploadVal, true, function (data) {

                    var editMaterialNo = editTr.find('td').eq(1);
                    var no = editMaterialNo.children('span:first');
                    if (no.hasClass('no')) {
                        no.remove();
                    }
                    /*设置物料编号*/
                    editMaterialNo.prepend('<span class="no">' + materialNo + '</span>');
                    /*设置物料描述*/
                    editTr.find('td').eq(2).html(materialExplain);
                    /*设置单位*/
                    editTr.find('td').eq(3).html(data.unit);
                    /*设置物料品牌*/
                    if (data.materialBrand == '') {
                        editTr.find('td').eq(7).html('');
                    } else {

                        editTr.find('td').eq(7).css("padding-left", 0);
                        editTr.find('td').eq(7).css("padding-right", 0);
                        editTr.find('td').eq(7).html('');
                        for (var i = 0; i < data.materialBrand[0].length; i++) {
                            /*判断是否是默认版本*/
                            if (data.materialBrand[0][i].isDefaultVersion != 0) {
                                editTr.find('td').eq(7).html(data.materialBrand[0][i].brand);
                            }
                        }
                    }

                    /*去除标志*/
                    $('.edit', parent.document).removeClass('edit');
                    /*关闭弹出框*/
                    parent.layer.close(index);
                });
            });
        }
    }

    return {
        'init': init
    }
});