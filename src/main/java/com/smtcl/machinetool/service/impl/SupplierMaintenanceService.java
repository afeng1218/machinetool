package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import javax.servlet.http.*;
import java.sql.*;
import java.text.*;
import java.util.Date;
import java.util.List;

/**
 * Created by guofeng on 2016/4/15.
 */
@Service
public class SupplierMaintenanceService implements ISupplierMaintenance{

	@Autowired
	IGenericDAO dao;

	@Override
	public String saveSupplierMaintenance(String json,HttpServletRequest request){
		//返回参数
		JSONObject result = new JSONObject();
		try{
			//String json 转换为JSONObject
			JSONObject map = new JSONObject(json);

			System.out.println("id="+map.getString("id"));

			//判断 新增或者更改
			String id = map.getString("id");
			if(id.equals("")){
				//查询当前供应商编码是否存在
				String hql  = "from CSupplier t where t.supplierCode='" + map.getString("supplier_code") + "'";
				List list = dao.executeQuery(hql);
				if(list.size() > 0){
					result.append("name","当前厂家编码以存在！");
					result.append("save",false);
					return result.toString();
				}
			}
			//定义时间
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  //设置日期格式
			//新增
			if(id.equals("")){
				System.out.println("add");
				//数据库实体类
				CSupplier saveSupplier = new CSupplier();
				//供应商
				saveSupplier.setSupplier(map.getString("supplier"));
				//供应商编码
				saveSupplier.setSupplierCode(map.getInt("supplier_code"));
				//税率
				saveSupplier.setTaxRate(Float.parseFloat(map.getString("tax_rate")));
				//地址
				saveSupplier.setAddress(map.getString("address"));
				//省份
				saveSupplier.setProvince(map.getString("province"));
				//城市
				saveSupplier.setCity(map.getString("city"));
				//联系人
				saveSupplier.setContacts(map.getString("contacts"));
				//联系方式
				saveSupplier.setContactInformation(map.getString("contact_information"));
				//创建时间
				saveSupplier.setCreateTime(Timestamp.valueOf(df.format(new Date())));
				saveSupplier.setCreatePerson(request.getSession().getAttribute("USER_NAME").toString());
				//新增
				dao.add(saveSupplier);
			//修改
			}else{
				System.out.println("update");
				String sql = "update c_supplier set address='"+map.getString("address")+"', city='"+map.getString("city")+"', " +
						"contact_information='"+map.getString("contact_information")+"', " +
						"contacts='"+map.getString("contacts")+"', " +
						"province='"+map.getString("province")+"', supplier='"+map.getString("supplier")+"', tax_rate='"+map.getString("tax_rate")+"', " +
						"update_person='"+request.getSession().getAttribute("USER_NAME").toString()+"', " +
						"update_time='"+Timestamp.valueOf(df.format(new Date()))+"' " +
						"where " +
						"supplier_code='"+map.getInt("supplier_code")+"'";
				//修改
				dao.sqlUpdate(sql);
			}
			result.append("name","保存成功！");
			result.append("save",true);
			return result.toString();
		} catch (Exception e){
			result.append("name","保存失败！");
			System.out.println(e.getMessage());
		}
		return result.toString();
	}
}
