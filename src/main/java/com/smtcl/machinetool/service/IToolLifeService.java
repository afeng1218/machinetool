package com.smtcl.machinetool.service;

import org.json.*;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2017/11/17.
 */
public interface IToolLifeService{
	String selectLine(String map);
	String selectRowData(String map);
	String saveData(String map, HttpServletRequest request);
	String loadData(String map);
	String uploadLifetime(String map, HttpServletRequest request);
}
