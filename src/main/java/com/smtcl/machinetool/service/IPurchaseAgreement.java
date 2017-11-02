package com.smtcl.machinetool.service;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2016/4/20.
 */
public interface IPurchaseAgreement{

	/**
	 * 采购协议保存
	 *
	 * @param json
	 * @param request
	 *
	 * @return
	 */
	String savePurchaseAgreement(String json, HttpServletRequest request);

	/**
	 * 查询当前协议行是否已经存在
	 *
	 * @param json
	 *
	 * @return
	 */
	String selectPurchaseAgreement(String json);

	/**
	 * 删除协议行
	 *
	 * @param json
	 *
	 * @return
	 */
	String deletePurchaseAgreement(String json);

	/**
	 * 审核协议
	 *
	 * @param json
	 *
	 * @return
	 */
	String approvalPurchaseAgreement(String json);

	/**
	 * 协议汇总-head
	 *
	 * @param json
	 *
	 * @return
	 */
	String getAgreementSummaryHead(String json);

	/**
	 * 协议汇总-head-row
	 *
	 * @param order_code
	 *
	 * @return
	 */
	String getAgreementSummaryRow(String order_code);

	/**
	 * 供应商 物料的某个品牌的单价获取
	 *
	 * @param supplier
	 * 		供应商编号
	 * @param materialNo
	 * 		物料编号
	 * @param versionNo
	 * 		版本号
	 *
	 * @return
	 */
	Object getAgreementUnitPrice(String supplier, String materialNo, String versionNo);
}