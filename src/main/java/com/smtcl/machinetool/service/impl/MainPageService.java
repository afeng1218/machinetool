package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.IMainPageService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by GuoFeng on 2016/2/27.
 */
@Service
public class MainPageService implements IMainPageService{

	@Autowired
	IGenericDAO dao;

	/*递归遍历所有节点*/
	public void searchNode(CAuthorityMenu cam, JSONArray returnData, List<CAccountAuthority> authorityList, Integer getAll){

		JSONObject nodeObject = new JSONObject();
		Integer    isMenu     = cam.getIsMenu();
		/*如果不存在子节点*/
		if (isMenu == 0){

            /*在这里控制用户权限 筛选出用户已配置可见节点信息*/
			for (CAccountAuthority caa : authorityList){

				//如果该账号已经配置 可见该节点信息|或者该用户是管理员 就添加进去可见该节点
				if (caa.getId().getFunctionNode() == cam.getNodeId() || caa.getIsAdmin() == 1 || getAll == 1){

					nodeObject.append("text", cam.getNodeName() +
							"<input type='hidden' value='" + cam.getLinkPage() + "'>" +
							"<input type='hidden' value='" + caa.getAuthority() + "'>" +
							"<input type='hidden' value='" + cam.getNodeId() + "'>" +
							"<input type='hidden' value='" + cam.getPNode() + "'>");

					returnData.put(nodeObject);

				}
			}

		/*如果存在子节点*/
		} else{

			JSONArray nodes = new JSONArray();
			/*遍历所有子节点*/
			List<CAuthorityMenu> childNode = dao.executeQuery("from CAuthorityMenu cam " +
					" where cam.PNode='" + cam.getNodeId() + "' " +
					" order by cam.nodeId" + " asc ");
			for (CAuthorityMenu cAuthorityMenu : childNode){

                /*递归调用*/
				searchNode(cAuthorityMenu, nodes, authorityList, getAll);
			}

            /*如果返回数据的节点个数大于零添加数据*/
			int length = nodes.length();
			if (length > 0){

				nodeObject.append("text", cam.getNodeName() + "" +
						"<input type='hidden' value='" + cam.getNodeId() + "'>");

				if (length == 1){

					nodeObject.append("nodes", nodes.getJSONObject(0));

				} else{

					for (int i = 0; i < length; i++){

                        /*这里使用accumulate向key添加value值 不能直接添加JSONArray 否则会包装两层 导致前台解析数据错误 导致显示菜单错误*/
						nodeObject.accumulate("nodes", nodes.get(i));
					}

				}

				returnData.put(nodeObject);
			}

		}
	}

	/*根据用户账号 查询用户权限信息*/
	@Override
	public String getAuthorityMenu(String username, Integer getAll){

		/*取出首尾空格*/
		username = username.trim();
		/*返回数据*/
		JSONObject returnData = new JSONObject();
		/*根据用户权限遍历菜单节点信息*/
		JSONArray authorityTree = new JSONArray();
		/*根据用户名查找权限信息*/
		List<CAccountAuthority> authorityList = dao.executeQuery("from CAccountAuthority caa where caa.id.account='" + username + "'");

		/**********************遍历整个树信息******************************/
		List<CAuthorityMenu> list = dao.executeQuery("from CAuthorityMenu cam where cam.PNode='-999' order by cam.nodeId asc ");
		for (CAuthorityMenu cam : list){

			searchNode(cam, authorityTree, authorityList, getAll);
		}
		/****************************************************************/

        /*获取账号订单审批权限 和 库房信息*/
		List<CRegist> cRegists = dao.executeQuery("from CRegist crt where crt.name='" + username + "'");

		if (cRegists.size() > 0 && cRegists.get(0) != null){

			/*审批权限*/
			returnData.append("applyAuthority", cRegists.get(0).getOrderApprovalAuthority());

			/*默认库房*/
			List storageNo = dao.executeQuery("select csrd.storageRoomNo " +
					" from CRegist cr,CStorageRoomDefinition csrd " +
					" where cr.storageRoomId=csrd.storageRoomId " +
					" and cr.name='" + username + "' ");

			if (storageNo.size() > 0 && storageNo.get(0) != null){

				returnData.append("defaultStorage", storageNo.get(0));

			} else{

				returnData.append("defaultStorage", "");
			}

		}

		/*树形权限菜单数据*/
		returnData.append("authorityTree", authorityTree);

		return returnData.toString();

	}

	public void getAllPNode(JSONArray result, String pNode){

		List<Map> mapList = dao.executeQuery("select new Map(cam.nodeId as nodeId,cam.nodeName as nodeName,cam.PNode as pNode) " +
				"from CAuthorityMenu cam " +
				"where cam.nodeId='" + pNode + "'" +
				" and cam.nodeId != '-999' ");
		if (mapList.size() > 0 && mapList.get(0) != null){

			Map map = mapList.get(0);

			JSONObject jsonObject = new JSONObject();
			jsonObject.append("nodeId", map.get("nodeId").toString());
			jsonObject.append("nodeName", map.get("nodeName").toString());
			result.put(jsonObject);

			/*循环迭代父节点*/
			getAllPNode(result, map.get("pNode").toString());

		}

	}

	@Override
	public Object getPNode(String nodeId, String pNodeId){

		JSONArray result = new JSONArray();
		getAllPNode(result, pNodeId);

		return result.toString();
	}
}
