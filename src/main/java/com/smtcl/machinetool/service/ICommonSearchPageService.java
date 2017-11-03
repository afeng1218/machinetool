package com.smtcl.machinetool.service;

import java.util.*;

/**
 * Created by GuoFeng on 2016/4/18.
 */
public interface ICommonSearchPageService{

	/**
	 * 通用查询
	 *
	 * @param condition
	 * 		查询条件
	 *
	 * @return 返回查询结果list
	 */
	List commonSearch(String condition);
}
