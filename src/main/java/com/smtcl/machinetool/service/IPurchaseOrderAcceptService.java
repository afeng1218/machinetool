package com.smtcl.machinetool.service;

/**
 * Created by SunJun on 2016/5/18.
 */
public interface IPurchaseOrderAcceptService{

	/**
	 * 获取订单行信息
	 *
	 * @param searchVal
	 * 		查询条件
	 *
	 * @return 返回查询结果
	 */
	Object getOrderRow(String searchVal);

	/**
	 * 订单接受保存
	 *
	 * @param saveVal
	 * 		保存信息
	 *
	 * @return 返回结果
	 */
	Object orderAcceptSave(String saveVal);
}
