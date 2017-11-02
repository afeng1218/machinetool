package com.smtcl.machinetool.service;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2016/7/5.
 */
public interface IFaliaoService{
	String selectRow(String data);
	String saveData(String data, HttpServletRequest request);
}
