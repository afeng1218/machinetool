package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by SunJun on 2016/2/27.
 * TODO 用户注册
 */
@RestController
@ResponseBody
public class Register {

	/**
     * 用户注册service接口
     */
    @Autowired
    IRegisterService service;

	/**
     * 用户注册信息上传
     * @param name 用户名
     * @param password 密码
     * @param date 注册日期
     * @return
     */
    @RequestMapping(value = "/userRegister", method = RequestMethod.GET)
    public String register(@RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("date") String date) {

        return service.register(name, password, date);
    }


}
