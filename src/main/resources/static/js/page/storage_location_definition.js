/**
 * Created by GuoFeng on 2016/3/7.
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {

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

        /*库房信息下拉列表*/
        $(document).on('click', '#storage', function () {

            $('#storage ul').toggle();
            $('#storage ul li').click(function (e) {

                var t = $(e.target).text();

                if (t != '') {

                    /*显示库房input*/
                    $('#storage input:first').val(t);
                    /*如果选择的库房不为空*/
                    if (t != '') {

                        var storageId = $(e.target).find('input').val();
                        COMMON.WS.local('storageLocationDefinition/getStorageLocation', 'get', {storageId: storageId}, true, function (data) {

                            /*清空库位下拉*/
                            $('#storageLocationNo ul li').remove();
                            /*清空库位编号input*/
                            $('#storageLocationNo input:first').val('');
                            /*清空库位描述*/
                            $('#storageLocationDescription').val('');

                            $('#storageLocationNo ul').append('<li></li>');
                            for (var i = 0; i < data.length; i++) {

                                $('#storageLocationNo ul').append('<li>'
                                    + data[i].cargoSpaceNo +
                                    '<input style="display: none" value="' + data[i].cargoSpaceExplain + '"/>' +
                                    '</li>');
                            }
                        });

                    }

                } else {

                    $('#storageDescription').val('');
                    $('#storageLocationNo input').val('');
                    $('#storageLocationNo ul li').remove();
                    $('#storageLocationDescription').val('');

                }


            });

        });
        /*库位信息下拉列表事件*/
        $(document).on('click', '#storageLocationNo', function () {

            $('#storageLocationNo ul').toggle();
            $('#storageLocationNo ul li').click(function (e) {

                var v = $(e.target);
                if (v.is('li')) {

                    var t = v.text();
                    var describe = v.find('input').val();
                    /*设置库房编号*/
                    $('#storageLocationNo input:first').val(t);
                    /*设置库位描述*/
                    $('#storageLocationDescription').val(describe);
                }

            });

        });

        /*库房信息初始化*/
        COMMON.WS.local('storageLocationDefinition/init', 'get', '', true, function (data) {

            /*库房为空就是查找所有库位信息*/
            $('#storage ul').append('<li></li>');

            for (var i = 0; i < data.length; i++) {

                $('#storage ul').append('<li>' +
                    '' + data[i].storageRoomNo + '' +
                    '<input style="display: none;" value="' + data[i].storageRoomId + '"/>' +
                    '</li>');
            }
        });
    }

    /*查询事件监听*/
    $('#search').click(function () {

        var storageRoomNo = $('#storageDescription').val();
        var storageLocationNo = $('#storageLocationNo').val();
        var storageLocationDescription = $('#storageLocationDescription').val();

        $('#storageTable tbody').remove();
        var uploadData = {

            'storageRoomNo': storageRoomNo,
            'storageLocationNo': storageLocationNo,
            'storageLocationDescription': storageLocationDescription
        };
        COMMON.WS.local('storageLocationDefinition/storageLocationSearch', 'get', uploadData, true, function (data) {


            for (var i = 0; i < data.length; i++) {

                var maxNumber = '';
                var volumeSize = '';
                var weight = '';
                var dimension = '';
                if (data[i].maxNumber != null) {

                    maxNumber = data[i].maxNumber;
                }
                if (data[i].volumeSize != null) {

                    volumeSize = data[i].volumeSize;
                }
                if (data[i].weight != null) {

                    weight = data[i].weight;
                }
                if (data[i].dimension != null) {

                    dimension = data[i].dimension;
                }
                $('#storageTable').append('<tr>' +
                    //库位编号
                    '<td style="padding:0;text-align:center;">' +
                    '<input type="hidden" value="' + data[i].cargoSpaceId + '"/>' +
                    '<span>' + data[i].cargoSpaceNo + '</span>' +
                    '</td>' +
                    //库位说明
                    '<td style="padding:0;text-align:center;">' + data[i].cargoSpaceExplain + '</td>' +
                    //库房
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cstorageRoomDefinition.storageRoomDescribe + '</span>' +
                    '<input type="hidden" value="' + data[i].cstorageRoomDefinition.storageRoomId + '"/>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu storage" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    //状态
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cargoSpaceState + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" class="dropdowna">禁止</a></li>' +
                    '<li><a href="javascript:void(0)" class="dropdowna">活动</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + maxNumber + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cunitByQuantityUnit.unitName + '</span>' +
                    '<input type="hidden" value="' + data[i].cunitByQuantityUnit.unitNo + '"/>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="quantityUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + volumeSize + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cunitByVolumeUnit.unitName + '</span>' +
                    '<input type="hidden" value="' + data[i].cunitByVolumeUnit.unitNo + '"/>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="volumeSizeUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + weight + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cunitByWeightUnit.unitName + '</span>' +
                    '<input type="hidden" value="' + data[i].cunitByWeightUnit.unitNo + '"/>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="weightUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + dimension + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + data[i].cunitByDimensionUnit.unitName + '</span>' +
                    '<input type="hidden" value="' + data[i].cunitByDimensionUnit.unitNo + '"/>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dimensionUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + data[i].coordinate + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-pencil" onclick="edit(this)"></span>' +
                    '</a>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;padding-top:7px;">' +
                    '<span style="cursor: pointer;" class="glyphicon glyphicon-remove remove"><span>' +
                    '</td>' +
                    '</tr>');

            }

            /**
             * 获取库房信息
             */
            COMMON.WS.local('storageLocationDefinition/getAllStorage', 'get', '', true, function (data) {

                var allTd = $('#storageTable tbody tr:last td');
                for (var i = 0; i < data.length; i++) {

                    $('.storage').append('<li>' +
                        '<a href="javascript:void(0)" class="dropdowna">' + data[i].storageRoomDescribe + '' +
                        '</a>' +
                        '<input type="hidden" value="' + data[i].storageRoomId + '"/>' +
                        '</li>');
                }
            });

            /**
             * 获取单位信息
             */
            COMMON.WS.local('storageLocationDefinition/getUnit', 'get', '', true, function (data) {

                for (var i = 0; i < data.length; i++) {

                    var apendStr = '<li>' +
                        '<a href="javascript:void(0)" class="dropdowna">' + data[i].unitName + '</a>' +
                        '<input type="hidden" value="' + data[i].unitNo + '"/>' +
                        '</li>';

                    if (data[i].unitType == 'quantityUnit') {

                        $('.quantityUnit').append(apendStr);
                    }
                    if (data[i].unitType == 'volumeUnit') {

                        $('.volumeSizeUnit').append(apendStr);
                    }
                    if (data[i].unitType == 'weightUnit') {

                        $('.weightUnit').append(apendStr);
                    }
                    if (data[i].unitType == 'dimensionUnit') {

                        $('.dimensionUnit').append(apendStr);
                    }
                }
            });


        });

    });

    /**
     * 下拉事件
     * @param e
     */
    $(document).on('click', '.dropdowna', function (e) {

        var choose = $(e.target);
        var td = choose.parent().parent().parent().parent();

        var thisTr = td.parent();

        var length = choose.parent().find('input').length;

        /**
         * 验证库位是否被占用
         */
        if (td.is(thisTr.find('td').eq(2))) {

            if (length == 0 || (length > 0 && thisTr.find('td').eq(0).text() != '' && occupyOrNot(thisTr, td, 'edit'))) {

                td.find('button span:first-child').text(choose.text());
                var inputVal = choose.parent().find('input').val();

                if (td.find('button input').length == 0) {

                    td.find('button').append('<input type="hidden" value="' + inputVal + '"/>');

                } else {

                    td.find('button input').val(inputVal);
                }
            }
            /**
             * 如果是新增库位信息
             */
            if (thisTr.hasClass('add')) {

                td.find('div button span:first').text(choose.text());
            }

        } else {

            td.find('button span:first-child').text(choose.text());
            var inputVal = choose.parent().find('input').val();

            if (td.find('button input').length == 0) {

                td.find('button').append('<input type="hidden" value="' + inputVal + '"/>');

            } else {

                td.find('button input').val(inputVal);
            }
        }
    });

    /*保存按钮事件监听*/
    $('#saveBtn').click(function () {

        layer.confirm('是否确认保存？', {
            btn: ['确认', '取消']
        }, function () {

            var updateValue = $('#storageTable tbody tr');
            var upload = new Array();
            var update = new Array();
            var del = new Array();
            for (var i = 0; i < updateValue.length; i++) {
                if (updateValue.eq(i).find('td:first-child span').html() != '') {
                    var a=updateValue.eq(i).find('td').eq(13).find('div a span');
                    if(a.attr("class")=="glyphicon glyphicon-ok"){
                        layer.tips('请确认数据！', a);
                        return null;
                    };
                    var uptr = {
                        'cargoSpaceId': 'null',
                        'cargoSpaceNo': updateValue.eq(i).find('td:first-child span').text(),
                        'cargoSpaceExplain': updateValue.eq(i).find('td').eq(1).text(),
                        'storage': updateValue.eq(i).find('td').eq(2).find('div ul input').val(),
                        'state': updateValue.eq(i).find('td').eq(3).find('div button span:first-child').text(),
                        'maxNum': updateValue.eq(i).find('td').eq(4).text(),
                        'quantityUnit': updateValue.eq(i).find('td').eq(5).find('div ul input').val(),
                        'volumeSize': updateValue.eq(i).find('td').eq(6).text(),
                        'volumeSizeUnit': updateValue.eq(i).find('td').eq(7).find('div ul input').val(),
                        'weight': updateValue.eq(i).find('td').eq(8).text(),
                        'weightUnit': updateValue.eq(i).find('td').eq(9).find('div ul input').val(),
                        'dimension': updateValue.eq(i).find('td').eq(10).text(),
                        'dimensionUnit': updateValue.eq(i).find('td').eq(11).find('div ul input').val(),
                        'coordinate': updateValue.eq(i).find('td').eq(12).text()
                    };
                    if (updateValue.eq(i).find('td:first-child input').length > 0) {
                        uptr.cargoSpaceId = updateValue.eq(i).find('td:first-child input').val();
                    }
                    if (!updateValue.eq(i).hasClass('delete')) {
                        update.push(uptr);
                    }
                    if (updateValue.eq(i).hasClass('delete')) {
                        var delVal = {
                            'cargoSpaceId': updateValue.eq(i).find('td:first-child input').val(),
                        }
                        del.push(delVal);
                    }
                }
            }
            upload.push({
                'update': update,
                'delete': del
            });
            var Json = JSON.stringify(upload);
            /*库位信息上传*/
            COMMON.WS.restful('storageLocationDefinition/storageLocationUpload', 'post', Json, true, function (data) {
                if (data.result == 'SUCCESS') {
                    layer.msg('保存成功！');
                    $('.add').removeClass('add');
                    $('.delete').remove();
                    $('.edit').removeClass('edit');
                } else {
                    layer.msg('保存失败！' + data.result);
                }
            });
        });
    });
    /*添加按钮监听*/
    $('#addtr').click(function () {

        var length = $('#storageTable tbody tr:first td:first div').length;
        var lastTrFirstTd = $('#storageTable tbody tr:last td:first');

        if (lastTrFirstTd.length > 0 && lastTrFirstTd.text() == '') {

            layer.tips('填写库位信息！', lastTrFirstTd);

        } else {

            if (length > 0) {

                $('#storageTable tbody').remove();
            }
            if ($('#storageTable tbody tr').length > 0) {

                var lastTrVal = $('#storageTable tbody tr:last').html();
                $('#storageTable').append('<tr>' + lastTrVal + '</tr>');
                $('#storageTable tbody tr:last').addClass('add');
                var lastTr = $('#storageTable tbody tr:last td');
                lastTr.eq(0).html('<span></span>');
                lastTr.eq(1).html('');
                lastTr.eq(2).find('div button span:first-child').html('');
                lastTr.eq(3).find('div button span:first-child').html('活动');
                lastTr.eq(4).html('');
                lastTr.eq(5).find('div button span:first-child').html('');
                lastTr.eq(6).html('');
                lastTr.eq(7).find('div button span:first-child').html('');
                lastTr.eq(8).html('');
                lastTr.eq(9).find('div button span:first-child').html('');
                lastTr.eq(10).html('');
                lastTr.eq(11).find('div button span:first-child').html('');
                lastTr.eq(12).html('');

            } else {

                $('#storageTable').append('<tr class="add">' +
                    '<td style="padding:0;text-align:center;">' +
                    '<span></span>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu storage" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>活动</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" class="dropdowna">禁止</a></li>' +
                    '<li><a href="javascript:void(0)" class="dropdowna">活动</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="quantityUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="volumeSizeUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="weightUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dimensionUnit dropdown-menu" style="min-width: 0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-pencil" onclick="edit(this)"></span>' +
                    '</a>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;padding-top:7px;">' +
                    '<span style="cursor: pointer;" class="glyphicon glyphicon-remove remove"><span>' +
                    '</td>' +
                    '</tr>');

                COMMON.WS.local('storageLocationDefinition/getAllStorage', 'get', '', true, function (data) {

                    var allTd = $('#storageTable tbody tr:last td');
                    for (var i = 0; i < data.length; i++) {
                        allTd.eq(2).find('div ul').append('<li>' +
                            '<a href="javascript:void(0)" class="dropdowna">' + data[i].storageRoomDescribe + '' +
                            '</a>' +
                            '<input type="hidden" value="' + data[i].storageRoomId + '"/>' +
                            '</li>');
                    }
                });

                COMMON.WS.local('storageLocationDefinition/getUnit', 'get', '', true, function (data) {

                    var lastTr = $('#storageTable tbody tr:last');
                    for (var i = 0; i < data.length; i++) {

                        var apendStr = '<li>' +
                            '<a href="javascript:void(0)" class="dropdowna">' + data[i].unitName + '' +
                            '</a>' +
                            '<input type="hidden" value="' + data[i].unitNo + '"/>' +
                            '</li>';

                        if (data[i].unitType == 'quantityUnit') {

                            lastTr.find('.quantityUnit').append(apendStr);
                            /* $('.quantityUnit').append(apendStr);*/
                        }
                        if (data[i].unitType == 'volumeUnit') {

                            lastTr.find('.volumeSizeUnit').append(apendStr);
                            /* $('.volumeSizeUnit').append(apendStr);*/
                        }
                        if (data[i].unitType == 'weightUnit') {

                            lastTr.find('.weightUnit').append(apendStr);
                            /*$('.weightUnit').append(apendStr);*/
                        }
                        if (data[i].unitType == 'dimensionUnit') {

                            lastTr.find('.dimensionUnit').append(apendStr);
                            /*$('.dimensionUnit').append(apendStr);*/
                        }
                    }
                });
            }

        }

    });
    /**
     * 验证库位是否被占用
     * @param thisTr
     */
    function occupyOrNot(thisTr, td, state) {

        var tr = td.parent();

        var storageRoomId = thisTr.find('td').eq(2).find('div ul input').val();
        var storageLocationId = thisTr.find('td').eq(0).find('input').val();
        var storageLocationNo = thisTr.find('td').eq(0).find('span').text();
        /*库房库位*/
        var uploadVal = {
            storageRoomId: storageRoomId,
            storageLocationId: storageLocationId,
            storageLocationNo: storageLocationNo
        };
        var status = null;
        /*判断库位是否被占用*/
        COMMON.WS.local('storageDefinition/storageLocationOccupySearch', 'get', uploadVal, false, function (data) {

            if (data.result == 'true' && state == 'delete') {

                thisTr.addClass('delete');
                thisTr.css('display', 'none');
                status = true;
                return;

            } else if (data.result == 'true') {

                status = true;
                return;

            } else if (td.is(thisTr.find('td').eq(2)) || td.is(thisTr.find('td').eq(14))) {

                layer.tips('该库位已被 "' + data.result + '" 占用！', td);
                status = false;
                return;

            }
            status = true;
            return;

        });
        return status;
    };

    /*行删除操作*/
    $(document).on('click', '.remove', function (e) {
        var thisTr = $(e.target).parent().parent();
        /*如果不是新添加的行删除数据库数据*/
        if (!thisTr.hasClass('add')) {
            occupyOrNot(thisTr, thisTr.find('td').eq(14), 'delete');
        } else {
            thisTr.remove();
        }
    });

    return {
        'init': init
    }
});

/*表格编辑*/
function edit(e) {

    var tr = $(e).parent().parent().parent().parent();
    var trChild = tr.children();

    if (tr.hasClass('add')) {

        var storageNo = trChild.eq(0).find('span').html();
        trChild.eq(0).html('<input type="text" class="form-control" value="' + storageNo + '"/>');
    }
    var child1 = trChild.eq(1);
    var child1Value = child1.html();
    child1.html('<input type="text" class="form-control" value="' + child1Value + '"/>');

    var child4 = trChild.eq(4);
    var child4Value = child4.html();
    child4.html('<input type="text" class="form-control" value="' + child4Value + '"/>');

    var child6 = trChild.eq(6);
    var child6Value = child6.html();
    child6.html('<input type="text" class="form-control" value="' + child6Value + '"/>');

    var child8 = trChild.eq(8);
    var child8Value = child8.html();
    child8.html('<input type="text" class="form-control" value="' + child8Value + '"/>');

    var child10 = trChild.eq(10);
    var child10Value = child10.html();
    child10.html('<input type="text" class="form-control" value="' + child10Value + '"/>');

    var child12 = trChild.eq(12);
    var child12Value = child12.html();
    child12.html('<input type="text" class="form-control" value="' + child12Value + '"/>');

    $(e).parent().html('<span class="glyphicon glyphicon-ok" onclick="ok(this)"><span>');
}

/*编辑确认*/
function ok(e) {
    var tr = $(e).parent().parent().parent().parent();
    var trChild = tr.children();

    if (tr.hasClass('add')) {
        //输入编号值
        var child0 = trChild.eq(0).find('input').val();
        $.ajax({
            url: 'storageLocationDefinition/storageLocationNoSearch',
            type: 'get',
            data: {storageLocationNo: child0},
            async: true,
            dataType: "json",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                var storageNo = trChild.eq(0).find('input');
                var storageName = trChild.eq(1).find('input');

                /*库房编号存在*/
                if (storageNo.val()&&storageNo.val().trim() == '') {
                    layer.tips('库位编号不能为空！', storageNo);
                } else if (data.result == 'true') {
                    layer.tips('库位编号已存在！', storageNo);
                    /*库房编号不存在*/
                } else if (storageName.val()&&storageName.val().trim() == '') {
                    layer.tips('库位名称不能为空！', storageName);
                } else {
                    trChild.eq(0).html('<span>' + child0 + '</span>');

                    var child1 = trChild.eq(1);
                    var child1Value = child1.find('input').val();
                    child1.html(child1Value);

                    var child4 = trChild.eq(4);
                    var child4Value = child4.find('input').val();
                    child4.html(child4Value);

                    var child6 = trChild.eq(6);
                    var child6Value = child6.find('input').val();
                    child6.html(child6Value);

                    var child8 = trChild.eq(8);
                    var child8Value = child8.find('input').val();
                    child8.html(child8Value);

                    var child10 = trChild.eq(10);
                    var child10Value = child10.find('input').val();
                    child10.html(child10Value);

                    var child12 = trChild.eq(12);
                    var child12Value = child12.find('input').val();
                    child12.html(child12Value);

                    $(e).parent().html('<span class="glyphicon glyphicon-pencil" onclick="edit(this)"><span>');
                }
            }
        });
    } else {
        var child1 = trChild.eq(1);
        var child1Value = child1.find('input');
        if (child1Value.val()&&child1Value.val().trim() == '') {
            layer.tips('库位名称不能为空！', child1Value);
        } else {
            var child1 = trChild.eq(1);
            var child1Value = child1.find('input').val();
            child1.html(child1Value);

            var child4 = trChild.eq(4);
            var child4Value = child4.find('input').val();
            child4.html(child4Value);

            var child6 = trChild.eq(6);
            var child6Value = child6.find('input').val();
            child6.html(child6Value);

            var child8 = trChild.eq(8);
            var child8Value = child8.find('input').val();
            child8.html(child8Value);

            var child10 = trChild.eq(10);
            var child10Value = child10.find('input').val();
            child10.html(child10Value);

            var child12 = trChild.eq(12);
            var child12Value = child12.find('input').val();
            child12.html(child12Value);

            $(e).parent().html('<span class="glyphicon glyphicon-pencil" onclick="edit(this)"><span>');
        }
    }
}
