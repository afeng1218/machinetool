package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by guofeng on 2017/11/17.
 */
@Service
public class ToolLifeService implements IToolLifeService{

	@Autowired
	IGenericDAO dao;

	/**
	 * 获取所有生产线
	 * @return
	 * @param type
	 */
	@Override
	public String selectLine(String type){
		JSONObject return_=new JSONObject();
		try{
			String sql="SELECT DISTINCT(a.production_line_id) AS production_line_id,a.production_line_name FROM c_scene_layout AS a";
			List list=dao.createSQL(sql);sql=null;
			if(type.equals("all")){
				return_.put("line",list);
			};
			sql="SELECT a.* FROM c_scene_layout AS a WHERE a.resource_code IS NOT NULL";

		}catch (Exception e){
			e.printStackTrace();
		}finally{
			return return_.toString();
		}
	}
}
