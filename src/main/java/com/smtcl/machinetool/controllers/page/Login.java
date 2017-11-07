package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.ILoginService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

/**
 * Created by GuoFeng on 2016/2/25. TODO 登陆Controller 用户登录验证
 */
@RestController
@RequestMapping("/login")
public class Login {

    /**
     * 登陆service接口
     */
    @Autowired
    private ILoginService service;

    /**
     * 用户登陆验证
     *
     * @param name     用户名
     * @param password 密码
     * @param request  HttpServletRequest
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/checkUser", method = RequestMethod.GET)
    String checkUser(@RequestParam("name") String name, @RequestParam("password") String password,
                     HttpServletRequest request) throws IOException {

        JSONObject jsonObject = new JSONObject();
        //登录返回结果
        String loginStatus = service.checkUser(name, password).split(":")[1];

        if (loginStatus.equals("FALSE")) {

            jsonObject.append("status", "FALSE");

        } else {

            /**
             * 获取请求session
             */
            HttpSession session = request.getSession();

            /**
             * 设置会话登陆状态
             */
            session.setAttribute("SUCCESS", loginStatus);

            /**
             * 设置会话用户名
             */
            session.setAttribute("USER_NAME", name.trim());

			/*设置账号审批权限 和默认库房信息*/
            Map result = (Map) service.getApprovalAuthorityAndDefaultStorage(name);

            session.setAttribute("APPROVAL_AUTHORITY", result.get("orderApprovalAuthority"));
            session.setAttribute("DEFAULT_STORAGE", result.get("storageRoomNo"));
            /*设置session最大寿命*/
            session.setMaxInactiveInterval(60 * 60 * 24);

            /**
             * 用户名
             */
            jsonObject.append("username", name);
            /**
             * 登陆状态
             */
            jsonObject.append("status", loginStatus);
            /**
             * 账单审批权限
             */
            jsonObject.append("orderApprovalAuthority", result.get("orderApprovalAuthority").toString());
            /**
             * 默认库房编号
             */
            jsonObject.append("defaultStorageRoomNo", result.get("storageRoomNo"));
            /**
             * 页面权限
             */
            jsonObject.append("pageAuthority", result.get("pageAuthority"));
	        /**
	         * 组织
             */
            jsonObject.append("organization",result.get("organization"));
        }
        return jsonObject.toString();
    }
}
