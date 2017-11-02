/**
 * Created by SunJun on 2016/7/23.
 */
/**
 * 退出click事件监听
 */
function exit() {

    /**
     * 删除用户名、账号审批权限、默认库房
     */
    /*$.cookie('username', '', {expires: -1});
     $.cookie('orderApprovalAuthority', '', {expires: -1});
     $.cookie('defaultStorageRoomNo', '', {expires: -1});*/
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }

}
