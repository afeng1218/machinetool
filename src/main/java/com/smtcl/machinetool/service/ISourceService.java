package com.smtcl.machinetool.service;

/**
 * Created by guofeng on 2016/8/24.
 */
public interface ISourceService{

	/**
	 * 来源按钮是否可点击
	 * @return
	 */
	Object getSourceState();

	/**
	 * 来源数据
	 * @return
	 */
	String getSourceData();
}
