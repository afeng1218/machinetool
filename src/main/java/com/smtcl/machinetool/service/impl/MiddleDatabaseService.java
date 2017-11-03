package com.smtcl.machinetool.service.impl;

import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.*;

/**
 * Created by GuoFeng on 2016/8/12.
 */
@Service
public class MiddleDatabaseService{

	/**
	 * 定时任务 每隔十秒同步一次中间库寿命信息
	 */
	//@Scheduled(fixedRate = 10000)
	public void updateOemTool(){
		//		List<Name> list = idao.executeQuery("from Name");
		//		for (Name name : list){
		//
		//			System.out.println(name.getName());
		//		}
	}
}
