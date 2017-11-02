package com.smtcl.machinetool.service;

import org.json.JSONArray;

/**
 * Created by SunJun on 2016/2/27. TODO 主页面service接口
 */
public interface IMainPageService{

	/**
	 * 获取用户权限信息
	 *
	 * @param username
	 * 		用户名
	 *
	 * @return 用户权限菜单信息
	 */
	String getAuthorityMenu(String username, Integer getAll);

	/**
	 * 获取节点的所有父节点信息
	 *
	 * @param nodeId
	 *
	 * @return
	 */
	Object getPNode(String nodeId,String pNodeId);
}
