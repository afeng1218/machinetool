package com.smtcl.machinetool.service;

/**
 * Created by GuoFeng on 2016/4/19.
 */
public interface IStockDetailListService{

	String availableNum(String roomNo, String roomplace, String materialNo,String use_status,String borrowNum);

	String materialNum(String roomNo, String materialNO, String use_status);
}
