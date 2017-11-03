package com.smtcl.machinetool.service;

import java.util.*;

/**
 * Created by GuoFeng on 2016/3/22. TODO 采购申请后台service
 */
public interface IPurchaseRequisitionService{

	/**
	 * 供应商信息获取
	 *
	 * @return 供应商编号 描述 json字符串
	 */
	List getSupplier();

	/**
	 * 采购申请编号获取
	 *
	 * @return 自动生成编号
	 */
	String getRequisitionNo();

	/**
	 * 申请保存
	 *
	 * @param uploadValue
	 * 		上传数据
	 *
	 * @return 保存结果
	 */
	String saveRequisition(String uploadValue);

	/**
	 * 删除采购申请
	 *
	 * @param requisitionNo
	 * 		申请编号
	 *
	 * @return 删除结果
	 */
	String deleteRequisition(String requisitionNo);

	/**
	 * 获取库房列表信息
	 *
	 * @return 返回库房列表
	 */
	List getStorageRoom();

	/**
	 * 根据物料编号查询和计算申请信息
	 *
	 * @param materialNo
	 * 		物料编号
	 * @param searchStorage
	 * 		库房编号
	 *
	 * @return 查询结果
	 */
	String getMaterialRequisitionMsg(String materialNo,String searchStorage);

	/**
	 * 根据物料编号和库房编号查询库房库存
	 *
	 * @param materialNo
	 * 		物料编号
	 * @param storageNo
	 * 		库房编号
	 *
	 * @return 返回查询结果
	 */
	String getCurrentConsumption(String materialNo, String storageNo);

	/**
	 * 查询物料版本
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 物料默认版本
	 */
	String getMaterialVersion(String materialNo);

	/**
	 * 获取申请题头信息或者行信息
	 *
	 * @param requestBody
	 * 		请求参数
	 *
	 * @return 返回查询解果
	 */
	String getRequisitionHeadOrRow(String requestBody);

	/**
	 * 根据采购编号 获取采购行信息
	 *
	 * @param applyNo
	 * 		采购编号
	 *
	 * @return 采购行信息
	 */
	List getRequisitionRowByApplyNo(String applyNo);

	/**
	 * 审批权限获取 申请行获取
	 *
	 * @param no
	 * 		采购申请编号
	 * @param account
	 * 		账号
	 * @param pageName
	 * 		页面name
	 *
	 * @return 返回审批账号权限、采购申请行信息
	 */
	List getPageAuthorityAndRequisitionRow(String no, String account, String pageName);
}
