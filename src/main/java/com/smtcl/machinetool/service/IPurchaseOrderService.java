package com.smtcl.machinetool.service;

/**
 * Created by GuoFeng on 2016/4/26. 采购订单service
 */
public interface IPurchaseOrderService{

	/**
	 * 采购订单保存
	 *
	 * @param request
	 * 		上传的保存信息
	 *
	 * @return 返回保存结果
	 */
	String saveOrder(String request);

	/**
	 * 采购申请题头查询
	 *
	 * @param request
	 * 		请求头
	 *
	 * @return
	 */
	Object orderHeadSummary(String request);

	/**
	 * 采购申请行汇总
	 *
	 * @param request
	 * 		请求头
	 *
	 * @return
	 */
	Object orderRowSummary(String request);

	/**
	 * 根据订单号获取采购订单行
	 *
	 * @param orderNo
	 * 		订单号
	 *
	 * @return
	 */
	Object getOrderRowByOrderNo(String orderNo);

	/**
	 * 根据订单号获取整个订单信息
	 *
	 * @param orderNo
	 * 		订单号
	 *
	 * @return
	 */
	Object getOrderByOrderNo(String orderNo);
}
