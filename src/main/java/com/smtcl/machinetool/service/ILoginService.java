package com.smtcl.machinetool.service;

import org.json.*;

/**
 * Created by SunJun on 2016/2/25. TODO 用户登录service
 */
public interface ILoginService{

	/**
	 * 验证用户名接口
	 *
	 * @param name
	 * 		用户名
	 * @param password
	 * 		密码
	 *
	 * @return 返回登陆结果 TRUE or FALSE
	 */
	String checkUser(String name, String password);

	/**
	 * 获取用户审批权限 和 账号默认库房
	 *
	 * @param name
	 * 		用户名
	 *
	 * @return 审批权限和默认库房信息
	 */
	Object getApprovalAuthorityAndDefaultStorage(String name);
}
