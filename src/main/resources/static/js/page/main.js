/**
 * Created by GuoFeng on 2016/2/23. 主页面js
 */
define(['jquery', 'common', 'layer', 'bootstrap', 'bootstrapTreeView'], function ($, COMMON, layer) {

    function init() {
        /**
         * 用户名
         */
        var username = COMMON.ECODE.Base64.decode($.cookie("username"));
        /*设置用户名*/
        $('#userName').text(username);
        /*设置隐藏用户名*/
        $('#hiddenName').val(username);
        /*设置主页面 菜单页面高度*/
        var height = ((screen.height * 6) / 7) - 25;
        $('#mainPageContent').css('height', height);
        $('#mainPageContent div:first-child').css('height', height);
        $('#mainPageContent div:last-child').css('height', height);
        var uploadValue = {
            'username': username
        };
        /*获取用户权限 加载权限菜单*/
        COMMON.WS.local('main/authority', 'get', uploadValue, true, function (data) {
            /*获取用户审批权限 设置隐藏用户审批权限信息*/
            $('#hiddenApprovalAuthority').val(data.applyAuthority);
            /*如果用户是admin不用加载默认库房*/
            /*获取默认库房*/
            $('#hiddenDefaultStorage').val(data.defaultStorage);
            /*根据权限加载用户菜单*/
            var options = {
                'state.expanded': false,//展开节点
                'bootstrap2': false,
                'showTags': false,//显示标签
                'levels': 4,//节点最大层级
                // 'color':'black',//字体颜色
                'backColor':'#ededed',//背景颜色
                // 'onhoverColor':'#c2c2c2',//鼠标效果颜色
                // 'borderColor':'#A9A9A9',//边框颜色
                //'selectedBackColor':'#ff7171',
                'data': data.authorityTree[0]//节点数据
            };
            /**
             * 加载树形菜单
             */
            $('#treeview').treeview(options);
            /**
             * 折叠菜单
             */
            $('#treeview').treeview('collapseAll');
        });

        /**
         * 监听iframe 加载完成
         */
        $('#content').load(function () {
            /**
             * 获取页面权限
             */
            var authority = $('.node-selected').find('input').eq(1).val();
            if (authority == 0) {

                $('#content').contents().find('#saveBtn').remove();
                $('#content').contents().find('#deleteBtn').remove();
            }
        });
    }
    return {
        "init": init
    };
});
