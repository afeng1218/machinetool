package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IMainPageService;
import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.*;

/**
 * Created by SunJun on 2016/2/26. TODO 主页面：获取不同用户权限信息、用户退出操作
 */
@Controller
@RequestMapping("/main")
public class MainPage{

	/**
	 * 主页面service接口
	 */
	@Autowired
	IMainPageService service;

	/**
	 * 根据用户名获取权限菜单
	 * @param username 用户名
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/authority", method = RequestMethod.GET)
	public String getAuthorityMenu(@RequestParam("username") String username){

		return service.getAuthorityMenu(username, 0);
	}

}
