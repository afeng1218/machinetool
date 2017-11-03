package com.smtcl.machinetool.service.impl;

import com.alibaba.druid.filter.config.*;
import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.oemtool.*;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.*;

import java.text.*;
import java.util.*;

/**
 * Created by GuoFeng on 2016/4/21.
 */
@Service
public class UtilService implements IUtilService{

	private SimpleDateFormat sdf     = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat sdfDate = new SimpleDateFormat("yyMMdd");

	@Autowired
	IGenericDAO dao;
	@Autowired
	IDAO        idao;

	@Override
	public Integer getSerialNumber(String table, String col, String byName, String condition){

		Integer       no   = 0;
		List<Integer> list;
		String        date = sdfDate.format(new Date()).toString();

		if (condition.equals("")){

			list = dao.executeQuery("select max(cah." + col + ") from " + table + " cah");

		} else{

			list = dao.executeQuery("select max(" + byName + "." + col + ") from " + table + " " + byName + " where " + condition);
		}

		if (list.get(0) != null){

			String maxNo   = list.get(0).toString();
			String subDate = maxNo.substring(0, maxNo.length() - 3);
			if (subDate.equals(date)){

				String subNo       = maxNo.substring(maxNo.length() - 3, maxNo.length());
				int    newSubNoInt = (Integer.parseInt(subNo) + 1);
				String newSubNo    = null;
				if (newSubNoInt < 10){

					newSubNo = "00" + newSubNoInt;

				} else if (newSubNoInt < 100){

					newSubNo = "0" + newSubNoInt;

				}
				no = Integer.parseInt(subDate + newSubNo);

			} else{

				no = Integer.parseInt(date + "001");

			}

		} else{

			no = Integer.parseInt(date + "001");
		}

		return no;
	}

	@Override
	public String getSerialString(String table, String col, String byName, String condition){

		Integer       no   = 0;
		List<String> list;
		String        date = sdfDate.format(new Date()).toString();

		if (condition.equals("")){

			list = dao.executeQuery("select max(cah." + col + ") from " + table + " cah");

		} else{

			list = dao.executeQuery("select max(" + byName + "." + col + ") from " + table + " " + byName + " where " + condition);
		}

		if (list.get(0) != null){

			String maxNo   = list.get(0).toString();
			String subDate = maxNo.substring(1, maxNo.length() - 3);
			if (subDate.equals(date)){

				String subNo       = maxNo.substring(maxNo.length() - 3, maxNo.length());
				int    newSubNoInt = (Integer.parseInt(subNo) + 1);
				String newSubNo    = null;
				if (newSubNoInt < 10){

					newSubNo = "00" + newSubNoInt;

				} else if (newSubNoInt < 100){

					newSubNo = "0" + newSubNoInt;

				}
				no = Integer.parseInt(subDate + newSubNo);

			} else{

				no = Integer.parseInt(date + "001");

			}

		} else{

			no = Integer.parseInt(date + "001");
		}
		return no.toString();
	}
}
