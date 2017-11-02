package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by guofeng on 2016/9/1.
 */
@Service
public class MechanicalEquipmentService implements IMechanicalEquipmentService{

	@Autowired
	IGenericDAO dao;

	/**
	 * 机床设备 保存
	 * @param data
	 * @return
	 */

	@Override
	public String saveData(String data){
		JSONObject result = new JSONObject(data);
		try{
			CMechanicalEquipment cmechanicalequipment = new CMechanicalEquipment();
			if(result.getString("mechanical_id").equals("")){//如果设备ID为空
				//查询设备资产编号
				String sql = "select a.* from c_mechanical_equipment a where a.equipment_assets_no='" + result.getString("equipment_assets_no") + "'";
				List list = dao.createSQL(sql);
				if (list != null && list.size() > 0){
					cmechanicalequipment.setMechanicalId(Integer.parseInt(((HashMap)list.get(0)).get("mechanical_id").toString()));//设备ID
				}
			}else{
				cmechanicalequipment.setMechanicalId(result.getInt("mechanical_id"));//设备ID
			}
			cmechanicalequipment.setEquipmentAssetsNo(result.getString("equipment_assets_no"));//设备资产编号
			cmechanicalequipment.setEquipmentName(result.getString("equipment_name"));//设备名称
			cmechanicalequipment.setEquipmentType(result.getString("equipment_type"));//设备类型
			cmechanicalequipment.setDeviceGroup(result.getString("device_group"));//设备组
			cmechanicalequipment.setMainShaftType(result.getString("main_shaft_type"));//主轴类型
			//主轴行程
			if(result.getString("main_shaft_trip").equals("")){
				cmechanicalequipment.setMainShaftTrip(0);
			}else {
				cmechanicalequipment.setMainShaftTrip(result.getInt("main_shaft_trip"));//主轴行程
			}
			//距离工作台（MAX)
			if(result.getString("distance_table_max").equals("")){
				cmechanicalequipment.setDistanceTableMax(0);
			}else{
				cmechanicalequipment.setDistanceTableMax(result.getInt("distance_table_max"));//距离工作台（MAX)
			}
			//最大转速
			if(result.getString("max_speed").equals("")){
				cmechanicalequipment.setMaxSpeed(0);
			}else{
				cmechanicalequipment.setMaxSpeed(result.getInt("max_speed"));//最大转速
			}
			//最大功率
			if(result.getString("max_power").equals("")){
				cmechanicalequipment.setMaxPower(0);
			}else{
				cmechanicalequipment.setMaxPower(result.getInt("max_power"));//最大功率
			}
			cmechanicalequipment.setDirector(result.getString("director"));//负责人
			cmechanicalequipment.setWorkshop(result.getString("workshop"));//车间
			dao.saveOrUpdate(cmechanicalequipment);
			result.put("result",true);
		}catch (Exception e){
			System.out.println(e.getMessage());
		}
		return result.toString();
	}
}
