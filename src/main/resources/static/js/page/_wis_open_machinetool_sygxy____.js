/**
 * Created by guofeng on 2017/11/15.
 */

define(['jquery', 'common', 'layer', 'jqueryBackstretch'], function ($, COMMON, layer) {
    function init(){
        var uploadValue = {
            'test':'admin',
            'name': 'a',
            'password': 'a3834dh373ekjdjd743n3naj282j2d7dasdas333afs',
        };
        /**
         * 获取默认库房、审批权、页面权限
         */
        COMMON.WS.local('login/checkUser', 'get', uploadValue, true, function (data) {
            /*** 用户名*/
            var username = data.username;
            /*** 订单审批权限*/
            var orderApprovalAuthority = data.orderApprovalAuthority;
            /*** 默认库房编号*/
            var defaultStorageRoomNo = data.defaultStorageRoomNo;
            /**组织**/
            var organization=data.organization;

            /*** 加密用户名、审批权限、默认库房*/
            var usernameValue = COMMON.ECODE.Base64.encode(username);username=null;
            var orderApprovalAuthorityValue = COMMON.ECODE.Base64.encode(orderApprovalAuthority);orderApprovalAuthority=null;
            var defaultStorageRoomNoValue = COMMON.ECODE.Base64.encode(defaultStorageRoomNo);defaultStorageRoomNo=null;
            var organizationValue = COMMON.ECODE.Base64.encode(organization);organization=null;
            /*** 设置用户名、登陆状态、账号审批权限、默认库房编号*/
            $.cookie('username', usernameValue/*, {expires: 1}*/);usernameValue=null;
            $.cookie('orderApprovalAuthority', orderApprovalAuthorityValue/*, {expires: 1}*/);orderApprovalAuthorityValue=null;
            $.cookie('defaultStorageRoomNo', defaultStorageRoomNoValue/*, {expires: 1}*/);defaultStorageRoomNoValue=null;
            $.cookie('organization',organizationValue);organizationValue=null;
            /*** 获取用户页面权限*/
            var pageAuthority = data.pageAuthority[0];data=null;
            if (pageAuthority != null) {
                for (var i = 0; i < pageAuthority.length; i++) {
                    $.cookie(COMMON.ECODE.Base64.encode(pageAuthority[i].linkPage),
                        COMMON.ECODE.Base64.encode(pageAuthority[i].authority)/*, {expires: 1}*/);
                }
                pageAuthority=null;
            }
            /**
             * 跳转到主页面
             * @type {string}
             */
            window.location.href = "main.html";
        });
    };
    return{
        'init':init
    }
});