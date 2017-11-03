package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by GuoFeng on 2016/6/1.
 */
@RestController
@ResponseBody
@RequestMapping("/accountConfigurePermission")
public class AccountConfigurePermission {

    @Autowired
    IMainPageService service;
    @Autowired
    IAccountConfigurePermissionService iAccountConfigurePermissionService;

    /**
     * 获取系统所有的菜单
     *
     * @return
     */
    @RequestMapping(value = "/getAllMenu", method = RequestMethod.GET)
    Object getAllMenu() {

        return service.getAuthorityMenu("admin", 1);

    }

    /**
     * 获取该节点的所有父节点信息
     */
    @RequestMapping(value = "/getPNode", method = RequestMethod.GET)
    Object getPNode(@RequestParam("nodeId") String nodeId, @RequestParam("pNodeId") String pNodeId) {

        return service.getPNode(nodeId, pNodeId);
    }

    /**
     * 用户菜单保存
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/saveUserMenu", method = RequestMethod.POST)
    Object saveUserMenu(@RequestBody String request) {

        return iAccountConfigurePermissionService.saveUserMenu(request);
    }

    /**
     * 删除用户
     *
     * @param name
     * @return
     */
    @RequestMapping(value = "/deleteUser", method = RequestMethod.GET)
    Object deleteUser(@RequestParam("name") String name) {

        return iAccountConfigurePermissionService.deleteUser(name);
    }

    /**
     * 检查用户是否存在
     *
     * @param name
     * @return
     */
    @RequestMapping(value = "/checkUser", method = RequestMethod.GET)
    Object checkUser(@RequestParam("name") String name) {

        return iAccountConfigurePermissionService.checkUser(name);
    }

    /**
     * 保存注册用户信息
     *
     * @param uploadUser
     * @return
     */
    @RequestMapping(value = "/saveUser", method = RequestMethod.POST)
    Object saveUser(@RequestBody String uploadUser) {

        return iAccountConfigurePermissionService.saveUser(uploadUser);
    }

    /**
     * 检查用户是否需要密码登陆
     *
     * @param name
     * @return
     */
    @RequestMapping(value = "/checkNeedPassword", method = RequestMethod.GET)
    Object checkNeedPassword(@RequestParam("name") String name) {

        return iAccountConfigurePermissionService.checkNeedPassword(name);
    }
}
