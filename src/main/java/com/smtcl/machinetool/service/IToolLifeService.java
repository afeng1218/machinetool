package com.smtcl.machinetool.service;

import org.json.*;

/**
 * Created by guofeng on 2017/11/17.
 */
public interface IToolLifeService{
	String selectLine(String map);
	String selectRowData(String map);
	String saveData(String map);
	String loadData(String map);
	String uploadLifetime(String map);
}
