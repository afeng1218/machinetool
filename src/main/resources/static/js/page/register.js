/**
 * Created by GuoFeng on 2016/2/24.
 */
define(['jquery', 'common', 'bootstrap', 'jqueryBackstretch', 'retina'], function ($, COMMON) {

    function init() {

        $.backstretch("img/bg.jpg");

        /*   $('#top-navbar-1').on('shown.bs.collapse', function () {
         $.backstretch("resize");
         });
         $('#top-navbar-1').on('hidden.bs.collapse', function () {
         $.backstretch("resize");
         });

         /!*
         Form
         *!/
         $('.registration-form fieldset:first-child').fadeIn('slow');

         $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
         $(this).removeClass('input-error');
         });

         // next step
         $('.registration-form .btn-next').on('click', function () {
         var parent_fieldset = $(this).parents('fieldset');
         var next_step = true;

         parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function () {
         if ($(this).val() == "") {
         $(this).addClass('input-error');
         next_step = false;
         }
         else {
         $(this).removeClass('input-error');
         }
         });

         if (next_step) {
         parent_fieldset.fadeOut(400, function () {
         $(this).next().fadeIn();
         });
         }

         });

         // previous step
         $('.registration-form .btn-previous').on('click', function () {
         $(this).parents('fieldset').fadeOut(400, function () {
         $(this).prev().fadeIn();
         });
         });

         // submit
         $('.registration-form').on('submit', function (e) {

         $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
         if ($(this).val() == "") {
         e.preventDefault();
         $(this).addClass('input-error');
         }
         else {
         $(this).removeClass('input-error');
         }
         });

         });*/

        $('#registerButton').click(function () {

            var name = $('#name').val();
            var password = $('#password').val();
            var confirmPassword = $('#confirmPassword').val();
            if (name == '' || password == '' || confirmPassword == '') {

                if (name == '' && password != '') {

                    $('#registerMessage').html('请输入用户名！');
                }
                if (password == '' && name != '') {

                    $('#registerMessage').html('请输入密码！');
                }
                if (name == '' && password == '') {

                    $('#registerMessage').html('请输入用户名和密码！');
                }
                if (name != '' && password != '' && confirmPassword == '') {

                    $('#registerMessage').html('请确认密码！');
                }

            }else if(password != confirmPassword) {

                $('#registerMessage').html('前后输入密码不一致！');

            }else if (name.indexOf(" ") != -1 || password.indexOf(" ") != -1) {

                if (name.indexOf(" ") != -1 && password.indexOf(" ") != -1) {

                    $('#registerMessage').html('用户名密码格式不正确！');

                } else if (name.indexOf(" ") != -1) {

                    $('#registerMessage').html('用户名格式不正确！');

                } else if (password.indexOf(" ") != -1) {

                    $('#registerMessage').html('密码格式不正确！');

                }

            } else {

                var uploadValue = {

                    'name': name,
                    'password': password,
                    'date': new Date().Format('yyyy-MM-dd hh:mm:ss')
                };
                COMMON.WS.local('userRegister', 'get', uploadValue, true, function (data) {

                    var result = data.RESULT;
                    if (result == 'TRUE') {

                        $('#registerMessage').html('注册成功！等待管理员审核。');
                    } else if (result == 'FALSE') {

                        $('#registerMessage').html('账号正在审核中，请耐心等待。');
                    } else {

                        $('#registerMessage').html('账号已存在！');
                    }

                });

            }

        });

    }

    return {
        "init": init
    }
});