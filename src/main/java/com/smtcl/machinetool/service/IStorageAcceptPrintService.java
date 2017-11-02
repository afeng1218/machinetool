package com.smtcl.machinetool.service;

/**
 * Created by SunJun on 2016/7/25.
 */
public interface IStorageAcceptPrintService{

	/**
	 * 获取所有的入库验收单
	 *
	 * @param request
	 * 		上传的查询条件数据
	 *
	 * @return
	 */
	Object getAllStorageAcceptList(String request);
}
