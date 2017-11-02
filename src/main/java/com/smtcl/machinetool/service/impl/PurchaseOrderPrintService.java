package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.text.*;

/**
 * Created by guofeng on 2016/5/23.
 */
@Service
public class PurchaseOrderPrintService implements IPurchaseOrderPrintService{

	@Autowired
	IGenericDAO  dao;

	private       SimpleDateFormat sdf    = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	private final Logger           logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 采购订单打印查询
	 * @param map
	 * @return
	 */
	@Override
	public String showPrint(String map){

		try{
//			System.out.println("map="+map);
			JSONObject obj = new JSONObject(map);
			String applyNO = obj.getString("applyNO");  //订单号
			String rowNo = obj.getString("rowNo");      //行号

			String provide_no = obj.getString("provide_no");        //发放号
			String apply_no = obj.getString("apply_no");            //来源申请
			String stamp_ornot = obj.getString("stamp_ornot");      //是否打印

			String buyer = obj.getString("buyer");      //采购员
			String supplier_code = obj.getString("supplier_code");//供应商
			String materialNo = obj.getString("materialNo");//物料
			//创建日期
			String createDateStart = obj.getString("createDateBegin");
			String createDateEnd   = obj.getString("createDateEnd");
			//需求时间
			String needDateBegin = obj.getString("needDateBegin");
			String needDateEnd   = obj.getString("needDateEnd");

			String sql = "SELECT a.order_no,b.line_no,c.material_no,c.material_describe, a.build_time ,d.storage_room_no," +
					"b.unit,b.delivery_number,FORMAT(b.unit_price,6) unit_price,FORMAT((b.delivery_number * b.unit_price),6) money," +
					"FORMAT(((b.delivery_number * b.unit_price) * e.tax_rate),6) tax_rate," +
					"FORMAT(((b.delivery_number * b.unit_price) + ((b.delivery_number * b.unit_price) * e.tax_rate)),6) total," +
					"b.brand,e.supplier,a.buyer FROM c_order_head a,c_order_accept b,c_general_material c," +
					"c_storage_room_definition d,c_supplier e WHERE a.order_no = b.order_no AND a.class = '采购订单' AND ";
			//订单号条件
			if(applyNO.equals("") || applyNO.equals("%")){
				sql += "a.order_no LIKE '%' AND ";
			}else{
				sql += "a.order_no = '"+applyNO+"' AND ";
			}
			//行号条件
			if(rowNo.equals("") || rowNo.equals("%")){
				sql += "b.line_no LIKE '%' AND ";
			}else{
				sql += "b.line_no = '"+rowNo+"' AND ";
			}
			//打印状态 - 默认查全部
			if(stamp_ornot.equals("未打印")){
				sql += "(b.stamp_ornot = '' or b.stamp_ornot = '否' or b.stamp_ornot is null) AND ";
			}else if(stamp_ornot.equals("已打印")){
				sql += "b.stamp_ornot = '已打印' AND ";
			}
			//采购员条件
			if(buyer.equals("") || buyer.equals("%")){
				sql += "a.buyer LIKE '%' AND ";
			}else{
				sql += "a.buyer = '"+buyer+"' AND ";
			}
			//供应商条件
			if(supplier_code.equals("") || supplier_code.equals("%")){
				sql += "a.supplier_code LIKE '%' AND ";
			}else{
				sql += "a.supplier_code = '"+supplier_code+"' AND ";
			}
			//物料条件
			if(materialNo.equals("") || materialNo.equals("%")){
				sql += "b.material_id LIKE '%' AND ";
			}else{
				sql += "b.material_id = '"+materialNo+"' AND ";
			}
			sql += "b.material_id = c.material_id AND " +
					"b.accept_storage_room_id = d.storage_room_id AND " +
					"a.supplier_code = e.supplier_code";
			//创建时间
			if (createDateStart.equals("%") && !createDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(a.build_time,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
			} else if (!createDateStart.equals("%") && createDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(a.build_time,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
			} else if (!createDateStart.equals("%") && !createDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(a.build_time,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
						" AND  DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
			}
			//需求时间
			if (needDateBegin.equals("%") && !needDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(b.demand_time,'%Y%m%d')<=DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
			} else if (!needDateBegin.equals("%") && needDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(b.demand_time,'%Y%m%d')>=DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d')";
			} else if (!needDateBegin.equals("%") && !needDateEnd.equals("%")){
				sql += " AND DATE_FORMAT(b.demand_time,'%Y%m%d') between DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d') " +
						" AND DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
			}
			sql += " ORDER BY a.order_no,b.line_no";
			JSONArray aa = new JSONArray(dao.createSQLQuery(sql));
			return aa.toString();
		}catch (Exception e){
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 打印状态更改
	 *
	 * @param map
	 *
	 * @return
	 */
	@Override
	public String checkPrint(String map){
		try{
			System.out.println("map="+map);
			JSONObject obj = new JSONObject(map);
			if(obj.getString("title").equals("采购订单")){
				String sql = "";

			}else if(obj.getString("title").equals("订单接受")){

			}

			return "aaaa";
		}catch (Exception e){
			System.out.println(e);
		}
		return null;
	}
}