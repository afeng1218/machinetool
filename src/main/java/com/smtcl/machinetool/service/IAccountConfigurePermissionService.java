package com.smtcl.machinetool.service;

import org.springframework.transaction.annotation.Transactional;

/**
 * Created by SunJun on 2016/7/21.
 */
public interface IAccountConfigurePermissionService{

	/**
	 * 用户菜单保存
	 *
	 * @param request
	 *
	 * @return
	 */
	Object saveUserMenu(String request);

	/**
	 * 删除用户
	 * @param name
	 * @return
	 */
	@Transactional
	Object deleteUser(String name);

	/**
	 * 检查用户是否存在
	 * @param name
	 * @return
	 */
	Object checkUser(String name);

	/**
	 * 保存注册用户信息
	 * @param uploadUser
	 * @return
	 */
	@Transactional
	Object saveUser(String uploadUser);

	/**
	 * 检查用户是否需要密码登陆
	 * @param name
	 * @return
	 */
	Object checkNeedPassword(String name);
}
