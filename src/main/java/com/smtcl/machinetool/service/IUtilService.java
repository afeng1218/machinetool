package com.smtcl.machinetool.service;

/**
 * Created by SunJun on 2016/4/21. 常用工具类接口
 */
public interface IUtilService{

	/**
	 * 根据查询表格 查询字段 以及条件 生成编号
	 *
	 * @param table
	 * 		表名
	 * @param col
	 * 		查询字段
	 * @param byName
	 * 		别名
	 * @param condition
	 * 		查询条件
	 *
	 * @return 返回的编号
	 */
	Integer getSerialNumber(String table, String col, String byName, String condition);
	String getSerialString(String table, String col, String byName, String condition); //string
}
