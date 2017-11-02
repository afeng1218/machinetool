package com.smtcl.machinetool.service;

/**
 * Created by guofeng on 2016/5/23. 采购订单打印service
 */
public interface IPurchaseOrderPrintService{

	/**
	 * 采购订单显示
	 * @return
	 */
	String showPrint(String map);

	/**
	 * 打印状态更改
	 * @param map
	 * @return
	 */
	String checkPrint(String map);
}
