package com.smtcl.machinetool.service;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2016/4/18.
 */
public interface IPurchaseBuyer{

	/**
	 *采购员保存
	 * @param json
	 * @return
	 */
	String savePurchaseBuyer(String json);
}