/**
 * Created by GuoFeng on 2016/7/15.
 */
define(['jquery', 'common', 'layer', 'page/common_search'], function ($, COMMON, layer, commonSearch) {

    function init() {

        /**
         * 获取用户权限
         */
        var arrUrl = window.location.href.split("/");
        var strPage = COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);
        var username = COMMON.ECODE.Base64.decode($.cookie('username'));
        var organization = COMMON.ECODE.Base64.decode($.cookie("organization"));//组织
        if ($.cookie(strPage) == null && username != 'admin') {
            $('#saveBtn').remove();
            $('#deleteBtn').remove();
        }username=null;strPage=null;arrUrl=null;
        $("#organization").val(organization);organization=null;
        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*设置div居中*/
        var windowWidth = $('#tittle').width();
        /*设置content居中*/
        var contentWidth = $('#content').width();
        /*设置content外边距*/
        $('#content').css('margin-left', (windowWidth - contentWidth) / 2);

        /**
         * 限制库位下拉菜单click事件
         */
        $('#limitStorageRoom').click(function () {

            $('#limitStorageRoom ul').toggle();
            $('#limitStorageRoom ul li').click(function (e) {

                $('#limitStorageRoom input').val($(e.target).text());

            });
        });
        /**
         * 是否需要密码下拉菜单click事件
         */
        $('#needPassWord').click(function () {

            $('#needPassWord ul').toggle();
            $('#needPassWord ul li').click(function (e) {

                $('#needPassWord input').val($(e.target).text());

            });
        });
        /**
         * 订单审批权下拉菜单click事件
         */
        $('#orderApprovalAuthority').click(function () {

            $('#orderApprovalAuthority ul').toggle();
            $('#orderApprovalAuthority ul li').click(function (e) {

                $('#orderApprovalAuthority input').val($(e.target).text());

            });
        });

        /**
         * 默认库房keydown事件
         */
        $('#storageNo').keydown(function (e) {

            if (e.keyCode == 13) {

                var storageNo = $.trim($('#storageNo').val());

                var searchVal = {
                    popMenu: true,
                    searchValue: storageNo,
                    searchTable: 'CStorageRoomDefinition',
                    searchCol: 'storageRoomNo,storageRoomDescribe,storageRoomId',
                    searchColNum: '0,1',
                    colName: '库房编号,库房描述'
                };

                if (storageNo.indexOf('%') != -1) {

                    commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                        $('#storageNo').val(data.storageRoomNo);
                        $('#hiddenStorageId').val(data.storageRoomId);

                    });

                } else if (storageNo != '') {

                    searchVal.popMenu = false;

                    commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                        if (data == null || data == '') {

                            $('#storageNo').val('');

                            layer.tips('库房编号不存在！', $('#storageNo'));

                        } else {

                            $('#storageNo').val(data[0].storageRoomNo);
                            $('#hiddenStorageId').val(data[0].storageRoomId);
                        }
                    });

                }
            }
        });
        /**
         * 默认库房blur事件
         */
        $('#storageNo').blur(function () {

            var storageRoomNo = $.trim($('#storageNo').val());
            if (storageRoomNo == '' || storageRoomNo.indexOf('%') != -1) {

                $('#storageNo').val('');
                $('#hiddenStorageId').val('');

            } else {

                var searchVal = {
                    popMenu: false,
                    searchValue: storageRoomNo,
                    searchTable: 'CStorageRoomDefinition',
                    searchCol: 'storageRoomNo,storageRoomId',
                    searchColNum: '0,1',
                    colName: '库房编号,库房描述'
                };
                commonSearch.OPEN_PAGE.openPage(searchVal, function (data) {

                    if (data == null || data == '') {

                        $('#storageNo').val('');
                        $('#hiddenStorageId').val('');
                        layer.tips('库房编号不存在！', $('#storageNo'));

                    } else {

                        $('#storageNo').val(data[0].storageRoomNo);
                        $('#hiddenStorageId').val(data[0].storageRoomId);
                    }
                });

            }
        });

        /**
         * 查看事件监听
         */
        $('#searchBtn').click(function () {

            var searchValue = {
                popMenu: true,
                searchValue: '%',
                searchTable: 'CRegist',
                searchCol: 'name,organization,password,storageRoomId,limitedWarehouseOrnot,needPasswordOrnot,director,orderApprovalAuthority,classification',
                searchColNum: '0,1',
                colName: '用户名,组织'
            };

            commonSearch.OPEN_PAGE.openPage(searchValue, function (data) {

                /*用户名只读*/
                $('#name').prop('readonly', true);

                /*用户名*/
                $('#name').val(data.name);
                /*密码*/
                $('#password').val(data.password);
                /*再次输入密码*/
                $('#rePassword').val(data.password);
                /*限制库房*/
                $('#limitStorageRoom input').val(data.limitedWarehouseOrnot);
                /*是否需要密码*/
                $('#needPassWord input').val(data.needPasswordOrnot);
                /*负责人*/
                $('#redirect').val(data.director);
                /*订单审批权*/
                $('#orderApprovalAuthority').val(data.orderApprovalAuthority);
                /*分类*/
                $('#class').val(data.classification);
                /*组织*/
                $('#organization').val(data.organization);

                if (data.storageRoomId != 'null' && data.storageRoomId != '') {

                    COMMON.WS.local('storageDefinition/searchStorageNoById', 'get', {storageId: data.storageRoomId}, true, function (_data) {

                        if (_data.result == 'true') {

                            /*默认库房编号*/
                            $('#storageNo').val(_data.resultData);
                            /*默认库房id*/
                            $('#hiddenStorageId').val(data.storageRoomId);

                        } else {

                            layer.msg(_data.result);
                        }

                    });
                }

            });

        });
        /**
         * 重置事件监听
         */
        $('#ResetBtn').click(function () {

            $('#name').prop('readonly', false);
            $('#reset').click();
        });
        /**
         * 删除事件监听
         */
        $('#deleteBtn').click(function () {

            var index = layer.confirm('是否确认删除该用户？', {
                btn: ['是', '否'] //按钮
            }, function (index) {

                var uploadValue = {
                    name: $('#name').val()
                };

                COMMON.WS.local('accountConfigurePermission/deleteUser', 'get', uploadValue, true, function (data) {

                    if (data.result == 'true') {

                        layer.msg('用户删除成功！');

                    } else {

                        layer.msg(data.result);
                    }

                });

            });
        });
        /**
         * 保存事件监听
         */
        $('#saveBtn').click(function () {

            if ($('#name').val() == '') {

                layer.msg('请输入用户名！');
                return;
            }
            if ($('#needPassWord input').val() == '是') {

                if ($('#password').val() == '' && $('#rePassword').val() == '') {

                    layer.tips('请输入密码！', $('#password'));
                    return;
                }

            }
            if ($('#password').val() != $('#rePassword').val()) {

                layer.tips('两次输入密码不一致！', $('#rePassword'));
                return;
            }
            /**
             * 检查用户是否存在
             */
            var flag = 0;

            /*if (!$('#name').prop('readonly')) {

             COMMON.WS.local('accountConfigurePermission/checkUser', 'get', {name: $('#name')}, false, function (data) {

             if (data.result == 'true') {

             layer.confirm('用户已存在，是否确认更新用户信息？', {
             btn: ['是', '否']
             }, function () {

             return;

             }, function () {

             flag = 1;
             });

             } else if (data.result != 'false') {

             layer.msg(data.result);
             }
             });
             }*/

            if (flag == 0) {

                var uploadValue = {
                    name: $('#name').val(),
                    password: $('#password').val(),
                    hiddenStorageId: $('#hiddenStorageId').val(),
                    limitStorageRoom: $('#limitStorageRoom input').val(),
                    needPassWord: $('#needPassWord input').val(),
                    redirect: $('#redirect').val(),
                    orderApprovalAuthority: $('#orderApprovalAuthority input').val(),
                    class: $('#class').val(),
                    organization: $('#organization').val()
                };

                COMMON.WS.restful('accountConfigurePermission/saveUser', 'post', JSON.stringify(uploadValue), true, function (data) {

                    if (data.result == 'true') {

                        layer.msg('用户信息保存成功！');

                    } else {

                        layer.msg(data.result);
                    }

                });
            }

        });

    }

    return {
        'init': init
    }
});