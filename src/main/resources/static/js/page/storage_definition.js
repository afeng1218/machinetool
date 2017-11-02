/**
 * Created by SunJun on 2016/3/1.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, COMMON_SEARCH) {

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

        var one = 0;
        /*库房状态选择事件*/
        $('#storageState').click(function () {

            $('#storageState ul').toggle();
            $('#storageState ul li').click(function (e) {

                var f = $(e.target).html();
                $('#storageStateValue').val(f);
            });
        });

    }

    /*库房编号enter事件监听*/
    $('#storageNo').keydown(function (e) {

        if (e.keyCode == 13) {

            var value = $('#storageNo').val();

            var map = {
                //查询条件
                searchValue: value,
                /*弹出页面*/
                popMenu: true,
                //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                readonly: false,
                //自定义显示前两列列名
                colName: '库房编号,库房名称',
                //searchTable:表实体类
                searchTable: 'CStorageRoomDefinition',
                //searchCol：库房编号、库房说明
                searchCol: 'storageRoomNo,storageRoomDescribe'
            };

            if (value.indexOf('%') == -1) {

                map.popMenu = false;
                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (data) {

                    if (data == '') {

                        layer.tips('库房编号不存在！', $('#storageNo'));

                    } else {

                        $('#storageNo').val(data[0].storageRoomNo);
                        $('#storageExplain').val(data[0].storageRoomDescribe);

                        /*查询*/
                        $('#search').click();
                    }

                });

            } else {

                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (data) {

                    $('#storageNo').val(data.storageRoomNo);
                    $('#storageExplain').val(data.storageRoomDescribe);

                    /*查询*/
                    $('#search').click();

                });

            }


        }

    });

    /*查询按钮监听事件*/
    $('#search').click(function () {

        /*查询内容数据封装*/
        var uploadData = {
            'storageNo': $('#storageNo').val(),
            'storageExplain': $('#storageExplain').val(),
            'storageState': $('#storageStateValue').val()
        }
        COMMON.WS.local('storageDefinition/storageSearch', 'get', uploadData, true, function (data) {

            /*删除表格数据*/
            if ($('#storageTable tbody').length > 0) {

                $('#storageTable tbody').remove();
            }
            var length = data[0].length;
            for (var i = 0; i < length; i++) {

                var uuid = Math.uuidFast();
                var storageRoomDescribe = '';
                var storageRoomState = '';
                var couldNet = '';
                var invalidDate = '';
                var planMethod = '';
                var positionControl = '';
                var storageRoomPosition = '';
                var principalCustodian = '';
                var stereoLibrary = '否';
                if (data[0][i].storageRoomDescribe != null) {

                    storageRoomDescribe = data[0][i].storageRoomDescribe;
                }
                if (data[0][i].storageRoomState != null) {

                    storageRoomState = data[0][i].storageRoomState;
                }
                if (data[0][i].couldNet != null) {

                    couldNet = data[0][i].couldNet;
                }
                if (data[0][i].invalidDate != null) {

                    invalidDate = COMMON.LOCAL_DATE.getLocalDate(data[0][i].invalidDate);
                }
                if (data[0][i].planMethod != null) {

                    planMethod = data[0][i].planMethod;
                }
                if (data[0][i].positionControl != null) {

                    positionControl = data[0][i].positionControl;
                }
                if (data[0][i].positionControl != null) {

                    positionControl = data[0][i].positionControl;
                }
                if (data[0][i].storageRoomPosition != null) {

                    storageRoomPosition = data[0][i].storageRoomPosition;
                }
                if (data[0][i].principalCustodian != null) {

                    principalCustodian = data[0][i].principalCustodian;
                }
                if (data[0][i].isStereoLibrary == 1) {

                    stereoLibrary = '是';
                }
                $('#storageTable').append('<tr>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<input type="hidden" value="' + data[0][i].storageRoomId + '"/>' +
                    '<span>' + data[0][i].storageRoomNo + '</span>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + storageRoomDescribe + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + storageRoomState + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">禁止</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">活动</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + couldNet + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="row">' +
                    '<div class="col-md-9" style="padding-right: 0;">' +
                    '<input id="date' + uuid + '" class="form-control" value="' + invalidDate + '" readonly />' +
                    '</div>' +
                    '<div class="col-md-3" style="padding-left: 0;margin-top: 8px;">' +
                    '<a href="javascript:void(0)" class="calendarBtn" data-link-field="date' + uuid + '">' +
                    '<span style="margin-left: 8px;" class="glyphicon glyphicon-calendar">' +
                    '</span>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + planMethod + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">最大-最小</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">订货点计划</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + positionControl + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">控制</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">无</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' + storageRoomPosition + '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<span>' + principalCustodian + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul id="keeper' + i + '" class="dropdown-menu" style="min-width:0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>' + stereoLibrary + '</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">是</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">否</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-pencil" onclick="edit(this)"></span>' +
                    '</a>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-remove remove"><span>' +
                    '<a>' +
                    '</div>' +
                    '</td>' +
                    '</tr>'
                );

                var keeperLength = data[1].length;
                for (var j = 0; j < keeperLength; j++) {

                    $('#keeper' + i).append('<li>' +
                        '<a href="javascript:void(0)" onclick="choose(this)">' + data[1][j].name + '</a>' +
                        '</li>');
                }


            }

            /*下拉框选择则事件监听*/
            $('.choose').click(function (e) {

                var chooseValue = $(e.target).html();
                $(e.target).parent().parent().parent().find('button span').first().html(chooseValue);
            });

            /*日历数据绑定*/
            $('.calendarBtn').datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                pickerPosition: 'bottom-left',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd',
                minView: 'month'
            });


        });


    });

    /*行添加事件监听*/
    $('#addtr').click(function () {

        var uuid = Math.uuidFast();
        var firstadd = $('#storageTable tbody tr:last td:first div').length;
        var empty = $('#storageTable tbody tr').length;
        if (firstadd > 0 || empty == 0) {

            COMMON.WS.local('storageDefinition/getPerson', 'get', '', false, function (data) {

                var uuid = Math.uuidFast();
                var keeperUUID = Math.uuidFast();
                $('#storageTable tbody').remove();
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
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">禁止</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">活动</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">是</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="row">' +
                    '<div class="col-md-9" style="padding-right: 0;">' +
                    '<input id="date' + uuid + '" class="form-control" value="" readonly />' +
                    '</div>' +
                    '<div class="col-md-3" style="padding-left: 0;margin-top: 8px;">' +
                    '<a href="javascript:void(0)" class="calendarBtn" data-link-field="date' + uuid + '">' +
                    '<span style="margin-left: 8px;" class="glyphicon glyphicon-calendar">' +
                    '</span>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">最大-最小</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">订货点计划</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>无</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">控制</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">无</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;"></td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    '<span></span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul id="keeper' + keeperUUID + '" class="dropdown-menu" style="min-width:0;">' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle"' +
                    'type="button" data-toggle="dropdown"' +
                    'aria-haspopup="true"' +
                    'aria-expanded="false">' +
                    '<span>否</span>' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" style="min-width: 0;">' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">是</a></li>' +
                    '<li><a href="javascript:void(0)" onclick="choose(this)">否</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-pencil" onclick="edit(this)"></span>' +
                    '</a>' +
                    '</div>' +
                    '</td>' +
                    '<td style="padding:0;text-align:center;">' +
                    '<div align="center" style="margin-top:8px;">' +
                    '<a href="javascript:void(0)">' +
                    '<span class="glyphicon glyphicon-remove remove"><span>' +
                    '<a>' +
                    '</div>' +
                    '</td>' +
                    '</tr>');

                for (var i = 0; i < data.length; i++) {

                    $('#keeper' + keeperUUID).append('<li>' +
                        '<a href="javascript:void(0)" onclick="choose(this)">' + data[i].name + '</a>' +
                        '</li>');
                }

            });


        } else {

            var lasttr = $('#storageTable tbody tr:last');
            $('#storageTable').append('<tr class="add">' + lasttr.html() + '</tr>');
            var trchild = $('#storageTable tbody tr:last td');
            trchild.eq(0).html('<span></span>');
            trchild.eq(1).html('');
            trchild.eq(4).find('div div:first-child input').val('');
            trchild.eq(4).find('div div:first-child input').attr('id', uuid);
            trchild.eq(4).find('div div:last-child a').attr('data-link-field', uuid);

            trchild.eq(5).find('div button span').first().html('');
            trchild.eq(6).find('div button span').first().html('无');
            trchild.eq(7).html('');
            trchild.eq(8).find('div button span').first().html('');
        }

        /*日历数据重新绑定*/
        $('.calendarBtn').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd',
            minView: 'month'
        });

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

                if (updateValue.eq(i).find('td:first-child span').text() != '') {

                    var stereoLibrary = updateValue.eq(i).find('td').eq(9).find('div button span:first-child').text();

                    if (stereoLibrary == '是') {

                        stereoLibrary = 1;
                    } else {

                        stereoLibrary = 0
                    }

                    var uptr = {

                        'storageId': 'null',
                        'storageNo': updateValue.eq(i).find('td:first-child span').text(),
                        'storageName': updateValue.eq(i).find('td').eq(1).text(),
                        'storageState': updateValue.eq(i).find('td').eq(2).find('div button span:first-child').text(),
                        'couldNet': updateValue.eq(i).find('td').eq(3).text(),
                        'invalidDate': updateValue.eq(i).find('td').eq(4).find('div div:first-child input').val(),
                        'planMethod': updateValue.eq(i).find('td').eq(5).find('div button span:first-child').text(),
                        'storageControl': updateValue.eq(i).find('td').eq(6).find('div button span:first-child').text(),
                        'storageSpace': updateValue.eq(i).find('td').eq(7).text(),
                        'principalCustodian': updateValue.eq(i).find('td').eq(8).find('div button span:first-child').text(),
                        'stereoLibrary': stereoLibrary,
                        'creater': $('#hiddenName', parent.document).val().trim()

                    };
                    if (updateValue.eq(i).find('td:first-child input').length > 0) {

                        uptr.storageId = updateValue.eq(i).find('td:first-child input').val();
                    }


                    if (!updateValue.eq(i).hasClass('delete')) {

                        update.push(uptr);
                    }

                    if (updateValue.eq(i).hasClass('delete')) {

                        var delVal = {

                            'storageId': updateValue.eq(i).find('td:first-child input').val(),
                            'storageNo': updateValue.eq(i).find('td:first-child span').text()
                        };
                        del.push(delVal);
                    }

                }

            }
            upload.push({

                'update': update,
                'delete': del
            });

            var Json = JSON.stringify(upload);
            /*库房信息上传*/
            COMMON.WS.restful('storageDefinition/storageUpload', 'post', Json, true, function (data) {

                if (data.result == 'SUCCESS') {

                    layer.msg('保存成功！');
                    $('.add').removeClass('add');
                    $('.delete').remove();
                    $('.edit').removeClass('edit');

                } else {

                    layer.msg(data.result + '');
                }

            });

        });

    });

    /*删除事件监听*/
    $(document).on('click', '.remove', function (e) {

        var thisTr = $(e.target).parent().parent().parent().parent();

        var storageId = thisTr.find('td').eq(0).find('input').val();
        var storageNo = thisTr.find('td').eq(0).find('span').text();

        var uploadValue = {
            storageId: storageId,
            storageNo: storageNo
        };

        /*如果不是新添加的行删除数据库数据*/
        if (!thisTr.hasClass('add')) {

            /*判断该库房信息是否已被使用*/

            COMMON.WS.local('storageDefinition/storageOccupySearch', 'get', uploadValue, true, function (data) {

                if (data.result == 'true') {

                    thisTr.addClass('delete');
                    thisTr.css('display', 'none');

                } else {

                    layer.tips('库房已被"' + data.result + '"占用！', $(e.target));

                }

            });

        } else {

            thisTr.remove();
        }
    });

    return {
        'init': init
    }
});
function storageState(state) {

    $('#storageState span:first').html(state);
}
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

    var child7 = trChild.eq(7);
    var child7Value = child7.html();
    child7.html('<input type="text" class="form-control" value="' + child7Value + '"/>');

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
            url: 'storageDefinition/storageNoSearch',
            type: 'get',
            data: {storageNo: child0},
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
                if (storageNo.val().trim() == '') {

                    layer.tips('库房编号不能为空！', storageNo);

                } else if (data.result == 'true') {

                    layer.tips('库房编号已存在！', storageNo);

                    /*库房编号不存在*/
                } else if (storageName.val().trim() == '') {

                    layer.tips('库房名称不能为空！', storageName);

                } else {

                    trChild.eq(0).html('<span>' + child0 + '</span>');

                    var child1 = trChild.eq(1);
                    var child1Value = child1.find('input').val();
                    child1.html(child1Value);

                    var child7 = trChild.eq(7);
                    var child7Value = child7.find('input').val();
                    child7.html(child7Value);

                    $(e).parent().html('<span class="glyphicon glyphicon-pencil" onclick="edit(this)"><span>');

                }

            }
        });

    } else {

        var child1 = trChild.eq(1);
        var child1Value = child1.find('input');

        if (child1Value.val().trim() == '') {

            layer.tips('库房名称不能为空！', child1Value);

        } else {

            child1.html(child1Value.val());

            var child7 = trChild.eq(7);
            var child7Value = child7.find('input').val();
            child7.html(child7Value);

            $(e).parent().html('<span class="glyphicon glyphicon-pencil" onclick="edit(this)"><span>');


        }

    }

}
/*下拉选择事件*/
function choose(e) {

    var chooseValue = $(e).html();
    $(e).parent().parent().parent().find('button span').first().html(chooseValue);
}