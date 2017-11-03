/**
 * Created by GuoFeng on 2016/2/23.
 */
define(['jquery', 'common', 'layer', 'jqueryBackstretch'], function ($, COMMON, layer) {

        function init() {

            COMMON.LAYER_CONFIG.config();
            /**
             * 加载背景图片
             */
            $.backstretch("img/bg.jpg");

            $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function () {

                $(this).removeClass('input-error');

            });

            $('.login-form').on('submit', function (e) {

                $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
                    if ($(this).val() == "") {
                        e.preventDefault();
                        $(this).addClass('input-error');
                    }
                    else {
                        $(this).removeClass('input-error');
                    }
                });

            });

        }

        $(window).resize(function () {

            var width = $(this).width();
            var height = $(this).height();
            $('body').width(width);
            $('body').height(height);
            $('.form-box').css('width', width / 2);
            $('.form-box').css('margin-left', ((width - $('.form-box').width()) / 2));

        });


        /*登陆验证*/
        function checkLogin() {

            var name = $('#username').val();
            var password = $('#password').val();

            if (name == '' || password == '') {

                if (name == '' && password != '') {

                    $('#nameOrPasswordFalse').html('请输入用户名！');
                    return;
                }
                if (password == '' && name != '') {

                    /**
                     * 验证用户是否需要密码登陆
                     */
                    COMMON.WS.local('accountConfigurePermission/checkNeedPassword', 'get', {name: name}, false, function (data) {

                        if (data.result + '' == 'true') {

                            $('#nameOrPasswordFalse').html('请输入密码！');
                            return;

                        } else if (data.result + '' != 'false') {

                            layer.msg(data.result + '');
                        }

                    });

                }
                if (name == '' && password == '') {

                    $('#nameOrPasswordFalse').html('请输入用户名和密码！');
                    return;
                }

            } else if (name.indexOf(" ") != -1 || password.indexOf(" ") != -1) {

                if (name.indexOf(" ") != -1 && password.indexOf(" ") != -1) {

                    $('#nameOrPasswordFalse').html('用户名密码格式不正确！');
                    return;

                } else if (name.indexOf(" ") != -1) {

                    $('#nameOrPasswordFalse').html('用户名格式不正确！');
                    return;

                } else if (password.indexOf(" ") != -1) {

                    $('#nameOrPasswordFalse').html('密码格式不正确！');
                    return;

                }

            }


            var uploadValue = {
                'name': name,
                'password': password,
            };

            /**
             * 获取默认库房、审批权、页面权限
             */
            COMMON.WS.local('login/checkUser', 'get', uploadValue, true, function (data) {

                /**
                 * 登陆状态
                 * @type {any}
                 */
                if (data.status == 'FALSE') {

                    $('#nameOrPasswordFalse').html('用户名或密码错误！');
                    return;
                }
                /**
                 * 用户名
                 */
                var username = data.username;
                /**
                 * 订单审批权限
                 */
                var orderApprovalAuthority = data.orderApprovalAuthority;
                /**
                 * 默认库房编号
                 */
                var defaultStorageRoomNo = data.defaultStorageRoomNo;

                /**
                 * 加密用户名、审批权限、默认库房
                 */
                var usernameValue = COMMON.ECODE.Base64.encode(username);
                var orderApprovalAuthorityValue = COMMON.ECODE.Base64.encode(orderApprovalAuthority);
                var defaultStorageRoomNoValue = COMMON.ECODE.Base64.encode(defaultStorageRoomNo);

                /**
                 * 设置用户名、登陆状态、账号审批权限、默认库房编号
                 */
                $.cookie('username', usernameValue/*, {expires: 1}*/);
                $.cookie('orderApprovalAuthority', orderApprovalAuthorityValue/*, {expires: 1}*/);
                $.cookie('defaultStorageRoomNo', defaultStorageRoomNoValue/*, {expires: 1}*/);

                /**
                 * 获取用户页面权限
                 */
                var pageAuthority = data.pageAuthority[0];
                if (pageAuthority != null) {

                    for (var i = 0; i < pageAuthority.length; i++) {
                        $.cookie(COMMON.ECODE.Base64.encode(pageAuthority[i].linkPage),
                            COMMON.ECODE.Base64.encode(pageAuthority[i].authority)/*, {expires: 1}*/);
                    }

                }

                /**
                 * 跳转到主页面
                 * @type {string}
                 */
                window.location.href = "main.html";

            });

        }

        /*密码输入框enter事件监听*/
        $('#password').keydown(function (e) {

            if (e.keyCode == 13) {

                checkLogin();
            }
        });

        /*登陆按钮click事件监听*/
        $('#submit').click(function () {

            checkLogin();

        });

        //返回入口
        return {
            "init": init
        };
    }
);
