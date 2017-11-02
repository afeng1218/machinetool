package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

/**
 * Created by guofeng on 2016/4/18.
 */
@Service
public class PurchaseBuyerService implements IPurchaseBuyer{

	@Autowired
	IGenericDAO dao;

	@Override
	public String savePurchaseBuyer(String json){
		//返回参数
		JSONObject result = new JSONObject();
		try{
			//String json 转换为JSONObject
			JSONObject map = new JSONObject(json);

			CBuyer cBuyer = new CBuyer();
			cBuyer.setBuyer(map.getString("buyer"));
			cBuyer.setExplainText(map.getString("explain_text"));
			//add
			if(map.getString("id").equals("")){
				dao.add(cBuyer);
			//update
			}else{
				cBuyer.setId(map.getInt("id"));
				dao.update(cBuyer);
			}
			result.append("name","保存成功！");
			result.append("save",true);
			return result.toString();
		}catch (Exception e){
			result.append("name","保存失败！");
			System.out.println(e);
		}
		return result.toString();
	}
}
