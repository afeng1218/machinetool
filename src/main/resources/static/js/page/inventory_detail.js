/**
 * Created by GuoFeng on 2016/3/8.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'bootstrap'], function ($, COMMON, layer, commonSearch) {

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

        /*物料信息查询 页面*/
        $('#searchMaterial').click(function () {

            layer.open({
                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: ['material_search.html']
            });
        });

        /*版本查询*/
        $(document).on('keydown', '#materialVersion', function (e) {

            if (e.keyCode == 13) {

                var uploadVal = {
                    popMenu: true,
                    searchValue: $('#materialNo').val(),
                    readonly: true,
                    searchTable: 'CMaterialVersion',
                    searchCol: 'CGeneralMaterial.materialNo,versionExplain',
                    searchColNum: '0,1',
                    colName: '物料编号,版本描述'
                };

                commonSearch.OPEN_PAGE.openPage(uploadVal, function (data) {

                    $('#materialVersion').val(data.versionExplain);

                });

            }

        });

        /*批次查询页面事件监听*/
        $('.batchSearch').click(function () {

            layer.open({
                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: ['material_batch_search.html']
            });
        });
        /*序列页面查询事件*/
        $('.sequenceSearch').click(function () {

            layer.open({

                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: ['material_sequence_search.html']
            });
        });

        var uploadVal = {
            'storageNo': '',
            'storageExplain': '',
            'storageState': ''
        };
        COMMON.WS.local('storageDefinition/storageSearch', 'get', uploadVal, true, function (data) {

            /*添加空行*/
            $('#stock ul').append('<li></li>');
            for (var i = 0; i < data[0].length; i++) {

                $('#stock ul').append('<li>' +
                    '<span>' + data[0][i].storageRoomNo + '</span>' +
                    '<input type="hidden" value="' + data[0][i].storageRoomId + '"/>' +
                    '</li>');
            }
        });
        /*库房下拉框click事件*/
        $('#stock').click(function () {

            $('#stock ul').toggle();
            $('#stock ul li').click(function (e) {

                var v = $(e.target);
                if (v.find('span').length > 0) {

                    $('#stock input:first').val(v.find('span').text());
                    $('#stock input:last').val(v.find('input').val());

                } else {

                    $('#stock input:first').val(v.text());
                    $('#stock input:last').val(v.parent().find('input').val());
                }


                if (v.text() == '') {

                    $('#storageLocation ul li').remove();

                } else {

                    /*库位信息下拉框添加*/
                    var uploadVal = {
                        'storageId': $('#stock input:last').val()
                    };
                    COMMON.WS.local('inventoryDetail/storageLocation', 'get', uploadVal, true, function (data) {

                        $('#stockLocation ul li').remove();
                        $('#stockLocation input:first').val('');
                        $('#stockLocation input:last').val('');

                        for (var i = 0; i < data.length; i++) {

                            $('#stockLocation ul').append('<li>' +
                                '<span>' + data[i].cargoSpaceNo + '</span>' +
                                '<input type="hidden" value="' + data[i].cargoSpaceId + '"/>' +
                                '</li>');
                        }

                    });

                }

            });
        });
        /*库位下拉菜单click事件*/
        $('#stockLocation').click(function () {

            $('#stockLocation ul').toggle();
            $('#stockLocation ul li').click(function (e) {

                var v = $(e.target);
                if (v.find('span').length > 0) {

                    $('#stockLocation input:first').val(v.find('span').html());
                    $('#stockLocation input:last').val(v.find('input').val());
                }
                else {

                    $('#stockLocation input:first').val(v.html());
                    $('#stockLocation input:last').val(v.parent().find('input').val());
                }
            });


        });
        /*主菜单切换按钮点击事件*/
        $('.mainOrder').click(function (e) {

            var item = $(e.target);

            $('#mainStatusBar').find('div').removeClass('select');
            item.addClass('select');
            $(".stock").children().css("display", "none");
            $("#stock" + $(item).attr('data')).css("display", "block");
        });
        /*状态选择*/
        $('#state').click(function () {

            $('#state ul').toggle();
            $('#state ul li').click(function (e) {

                var v = $(e.target).html();
                $('#state input').val(v);
            });
        });


        /*批次按钮click事件*/
        $('#batchBeginSearch').click(function () {

            $('#batchBegin').addClass('searching');
            $('#batchEnd').removeClass('searching');
        });
        /*批次按钮click事件*/
        $('#batchEndSearch').click(function () {

            $('#batchBegin').removeClass('searching');
            $('#batchEnd').addClass('searching');
        });
        /*序列按钮click事件*/
        $('#sequenceBeginSearch').click(function () {

            $('#sequenceBegin').addClass('sequenceSearching');
            $('#sequenceEnd').removeClass('sequenceSearching');
        });
        /*序列按钮click事件*/
        $('#sequenceEndSearch').click(function () {

            $('#sequenceBegin').removeClass('sequenceSearching');
            $('#sequenceEnd').addClass('sequenceSearching');
        });


        /*查询click监听*/
        $('#searchBtn').click(function () {

            layer.open({
                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['75%', '85%'],
                content: ['storage_structure.html']
            });

        });

        /*清除按钮监听*/
        $('#delete').click(function () {

            $('#stock input:first').val('');
            $('#stockLocation input:first').val('');
            $('#materialNo').val('');
            $('#materialVersion').val('');
            $('#materialExplain').val('');
            $('#state input').val('');
            $('#batchBegin').val('');
            $('#batchEnd').val('');
            $('#sequenceBegin').val('');
            $('#sequenceEnd').val('');
        });

    }

    return {
        'init': init
    }
});