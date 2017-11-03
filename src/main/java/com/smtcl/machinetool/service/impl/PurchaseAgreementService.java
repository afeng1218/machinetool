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
import java.util.*;
import java.util.Date;

/**
 * Created by guofeng on 2016/4/20. Changed by GuoFeng on 2016/6/16
 */

@Service
public class PurchaseAgreementService implements IPurchaseAgreement{

	@Autowired
	IGenericDAO  dao;
	@Autowired
	IUtilService utilService;

	/**
	 * 采购协议-保存
	 *
	 * @param json
	 * @param request
	 *
	 * @return
	 */
	@Override
	public String savePurchaseAgreement(String json, HttpServletRequest request){

		try{
			//返回参数
			JSONObject result = new JSONObject();
			//System.out.println("json = " + json);

			//String json 转换为JSONArray
			JSONArray map = new JSONArray(json);
			//System.out.println("map="+map);
			//题头
			JSONObject head = map.getJSONObject(0).getJSONArray("head").getJSONObject(0);
			//新增
			JSONArray add = map.getJSONObject(0).getJSONArray("add");
			//修改
			JSONArray update = map.getJSONObject(0).getJSONArray("update");

			//定义时间
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  //设置日期格式

			/********************************采购协议题头********************************/
			COrderHead cOrderHead = new COrderHead();
			//新增协议题头
			if (head.getString("order_code").equals("")){
				//System.out.println("新增题头");
				//调用生成订单组件
				//订单号
				cOrderHead.setOrderNo(utilService.getSerialNumber("COrderHead", "orderNo", "a", ""));
				//版本
				cOrderHead.setVersionNo(0);
				///采购员
				cOrderHead.setBuyer(head.getString("buyer"));
				//受单方
				cOrderHead.setAcceptOrderSide(head.getString("by_unilateral"));
				//供应商
				cOrderHead.setSupplier(head.getString("supplier_name"));
				//供应商编号
				CSupplier cSupplier = new CSupplier();
				cSupplier.setSupplierCode(head.getInt("supplier_code"));
				cOrderHead.setCSupplier(cSupplier);
				//状态
				cOrderHead.setState(head.getString("status"));
				//类别
				cOrderHead.setClass_("采购协议");
				//创建时间-如果时间为空则获取系统当前日期
				if (head.getString("newDate").equals("")){
					cOrderHead.setBuildTime(Timestamp.valueOf(df.format(new Date())));
				} else{
					cOrderHead.setBuildTime(Timestamp.valueOf(head.getString("newDate")));
				}
				//创建人
				cOrderHead.setBuildPerson(request.getSession().getAttribute("USER_NAME").toString());
				dao.add(cOrderHead);
				//修改协议题头
			} else{
				//System.out.println("修改题头");
				cOrderHead.setOrderNo(head.getInt("order_code"));
				cOrderHead.setState(head.getString("status"));
				cOrderHead.setBuildTime(Timestamp.valueOf(head.getString("newDate")));
				if (head.getString("order_line").equals("")){
					cOrderHead.setVersionNo(1);
				} else{
					cOrderHead.setVersionNo(head.getInt("order_line") + 1);
				}
				String sql = "update c_order_head set update_person='" + request.getSession().getAttribute("USER_NAME").toString() + "'," +
						"update_time='" + Timestamp.valueOf(df.format(new Date())) + "',version_no=" + cOrderHead.getVersionNo() + "," +
						"buyer='" + head.getString("buyer") + "'," +
						"state='未审核' " +
						"where " +
						"order_no='" + head.getString("order_code") + "'";
				//System.out.println(sql);
				dao.sqlUpdate(sql);
			}
			/********************************采购协议题头 end********************************/

			/********************************采购协议行-新增*********************************/
			if (add.length() > 0){
				//System.out.println("新增协议行");
				CAgreement   cAgreement   = new CAgreement();
				CAgreementId cAgreementId = new CAgreementId();
				for (int i = 0; i < add.length(); i++){
					//协议行数据
					JSONObject rowData = add.getJSONObject(i);
					//订单号
					cAgreementId.setOrderCode(Long.parseLong(cOrderHead.getOrderNo().toString()));
					//行号
					cAgreementId.setRowNumber(rowData.getInt("row_number"));
					cAgreement.setId(cAgreementId);
					//物料编号
					cAgreement.setMaterialNo(rowData.getString("material_no"));
					//单价
					cAgreement.setUnitPrice(rowData.getInt("unit_price"));
					//状态
					cAgreement.setState(rowData.getString("state"));
					//行类别
					cAgreement.setRowType(rowData.getString("row_type"));
					//品牌
					cAgreement.setBrand(rowData.getString("brand"));
					//创建人
					cAgreement.setCreatePerson(request.getSession().getAttribute("USER_NAME").toString());
					//创建时间
					cAgreement.setCreateTime(Timestamp.valueOf(df.format(new Date())));
					dao.add(cAgreement);
				}
			}
			/********************************采购协议行-新增 end*********************************/

			/********************************采购协议行-修改 ************************************/
			if (update.length() > 0){
				//System.out.println("修改协议行!");
				for (int i = 0; i < update.length(); i++){
					JSONObject rowData = update.getJSONObject(i);
					String sql = "update c_agreement set " +
							"update_time='" + Timestamp.valueOf(df.format(new Date())) + "'," +
							"unit_price='" + rowData.getInt("unit_price") + "'," +
							"brand='" + rowData.getString("brand") + "'," +
							"state='" + rowData.getString("state") + "' " +
							"where order_code='" + cOrderHead.getOrderNo() + "' and row_number=" + rowData.getInt("row_number");
					//System.out.println(sql);
					dao.sqlUpdate(sql);
				}
			}
			/********************************采购协议行-修改 end*********************************/

			result.append("result", "SUCCESS");
			result.append("order_code", cOrderHead.getOrderNo());
			result.append("order_line", cOrderHead.getVersionNo());
			result.append("newDate", cOrderHead.getBuildTime());
			result.append("state", cOrderHead.getState());

			return result.toString();
		} catch (Exception e){
			System.out.println(e);
		}
		return null;
	}

	/**
	 * 查询采购协议行的物料是否已经存在协议中
	 *
	 * @param json
	 *
	 * @return
	 */
	@Override
	public String selectPurchaseAgreement(String json){

		try{
			//返回参数
			JSONObject result = new JSONObject();
			//System.out.println("json="+json);
			JSONObject mapJson = new JSONObject(json);
			String sql = "from CAgreement t,COrderHead a where " +
					"t.materialNo='" + mapJson.getString("material_no") + "' and" +
					" t.brand='" + mapJson.getString("brand") + "' and" +
					" t.id.orderCode=a.orderNo and a.CSupplier.supplierCode='" + mapJson.getString("supplier_code") + "'";
			List list = dao.executeQuery(sql);
			result.append("result", list.size());
			return result.toString();
		} catch (Exception e){
			System.out.println(e);
		}

		return null;
	}

	/**
	 * 删除协议头、协议行
	 *
	 * @param json
	 *
	 * @return
	 */
	@Override
	public String deletePurchaseAgreement(String json){

		JSONObject result = new JSONObject();
		try{
			//System.out.println("json="+json);
			JSONObject mapJson = new JSONObject(json);
			//删除协议行
			if (mapJson.getString("delete").equals("")){
				CAgreement   cAgreement   = new CAgreement();
				CAgreementId cAgreementId = new CAgreementId();
				cAgreementId.setOrderCode(mapJson.getLong("order_code"));
				cAgreementId.setRowNumber(mapJson.getInt("row_number"));
				cAgreement.setId(cAgreementId);
				dao.delete(cAgreement);
				//System.out.println("删除协议行");
				//删除题头
			} else{
				List<CAgreement> list = dao.executeQuery("from CAgreement t where t.id.orderCode='" + mapJson.getString("order_code") + "'");
				//删除所有协议行
				for (CAgreement cAgreement : list){
					dao.delete(cAgreement);
				}
				//删除题头
				COrderHead cOrderHead = new COrderHead();
				cOrderHead.setOrderNo(mapJson.getInt("order_code"));
				dao.delete(cOrderHead);
				//System.out.println("删除协议头");
			}
			result.append("result", true);
		} catch (Exception e){
			System.out.println(e);
		}
		return result.toString();
	}

	/**
	 * 采购协议-审核
	 *
	 * @param json
	 *
	 * @return
	 */
	@Override
	public String approvalPurchaseAgreement(String json){

		JSONObject result = new JSONObject();
		try{
			JSONObject mapJson = new JSONObject(json);
			//审批协议头
			String sql = "update c_order_head set " +
					"state='已审核' " +
					"where order_no='" + mapJson.getString("order_code") + "' and class='采购协议'";
			dao.sqlUpdate(sql);
			//审核协议行
			sql = "update c_agreement set " +
					"state='已审核' " +
					"where order_code='" + mapJson.getString("order_code") + "'";
			dao.sqlUpdate(sql);
			result.append("result", true);
		} catch (Exception e){
			System.out.println(e);
		}
		return result.toString();
	}

	/**
	 * 采购协议汇总
	 *
	 * @param json
	 *
	 * @return
	 */
	@Override
	public String getAgreementSummaryHead(String json){

		JSONObject upload = new JSONObject(json);
		List       result = null;
		String     hql    = "";
		try{
			String type            = upload.getString("type");
			String order_code      = upload.getString("order_code");//订单号
			String row_number      = upload.getString("row_number");//行号
			//String class_          = upload.getString("class_");//类别
			String buyer           = upload.getString("buyer");//采购员
			String materialNo      = upload.getString("materialNo");//物料
			//String materialVersion = upload.getString("materialVersion");//物料版本
			String supplier_code   = upload.getString("supplier_code");//供应商
			String state           = upload.getString("state");//订单状态
			//时间
			String createDateStart = upload.getString("createDateBegin");
			String createDateEnd   = upload.getString("createDateEnd");
			//			System.out.println("json="+json);

			//题头
			if (type.equals("head")){
				String sql = "select distinct a.* from  c_order_head a,c_agreement b where a.order_no = b.order_code ";
				//订单号
				if (order_code.equals("") || order_code.equals("%")){
					sql += " and a.order_no like'%'";
				} else{
					sql += " and a.order_no='" + order_code + "'";
				}
				//行号
				if (row_number.equals("") || row_number.equals("%")){
					sql += " and b.row_number like '%'";
				} else{
					sql += " and b.row_number='" + row_number + "'";
				}
				//类别
				sql += " and a.class = '采购协议'";
				//采购员
				if (buyer.equals("") || buyer.equals("%")){
					sql += " and a.buyer like '%'";
				} else{
					sql += " and a.buyer='" + buyer + "'";
				}
				//订单状态
				if (state.equals("") || state.equals("%")){
					sql += " and a.state like '%'";
				} else{
					sql += " and a.state='" + state + "'";
				}
				//物料
				if (materialNo.equals("") || materialNo.equals("%")){
					sql += " and b.material_no like '%'";
				} else{
					sql += " and b.material_no = '" + materialNo + "'";
				}
				//供应商
				if (supplier_code.equals("") || supplier_code.equals("%")){
					sql += " and a.supplier_code like '%'";
				} else{
					sql += " and a.supplier_code = '" + supplier_code + "'";
				}
				//时间
				if (createDateStart.equals("%") && !createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
				} else if (!createDateStart.equals("%") && createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
				} else if (!createDateStart.equals("%") && !createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
							" and DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
				}
				result = dao.createSQLQuery(sql);
				return new JSONArray(result).toString();
				//行
			} else{
				String sql = "select a.*,b.material_describe,b.material_unit,c.supplier,c.class,c.buyer " +
						"from c_agreement a,c_general_material b,c_order_head c where " +
						"a.material_no = b.material_no and a.order_code = c.order_no";
				//订单号
				if (order_code.equals("") || order_code.equals("%")){
					sql += " and a.order_code like'%'";
				} else{
					sql += " and a.order_code='" + order_code + "'";
				}
				//行号
				if (row_number.equals("") || row_number.equals("%")){
					sql += " and a.row_number like '%'";
				} else{
					sql += " and a.row_number='" + row_number + "'";
				}
				//类别
				sql += " and c.class = '采购协议'";
				//采购员
				if (buyer.equals("") || buyer.equals("%")){
					sql += " and c.buyer like '%'";
				} else{
					sql += " and c.buyer='" + buyer + "'";
				}
				//订单状态
				if (state.equals("") || state.equals("%")){
					sql += " and a.state like '%'";
				} else{
					sql += " and a.state='" + state + "'";
				}
				//物料
				if (materialNo.equals("") || materialNo.equals("%")){
					sql += " and b.material_no like '%'";
				} else{
					sql += " and b.material_no = '" + materialNo + "'";
				}
				//供应商
				if (supplier_code.equals("") || supplier_code.equals("%")){
					sql += " and c.supplier_code like '%'";
				} else{
					sql += " and c.supplier_code = '" + supplier_code + "'";
				}
				//创建时间
				if (createDateStart.equals("%") && !createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
				} else if (!createDateStart.equals("%") && createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
				} else if (!createDateStart.equals("%") && !createDateEnd.equals("%")){
					sql += " and DATE_FORMAT(a.build_time,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
							" and DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
				}
				result = dao.createSQLQuery(sql);
				return new JSONArray(result).toString();
			}
		} catch (Exception e){
			System.out.println(e);
		}
		return null;
	}

	/**
	 * 协议汇总-head-row
	 *
	 * @param order_code
	 *
	 * @return
	 */
	@Override
	public String getAgreementSummaryRow(String order_code){

		try{
			String sql = "select a.*,b.material_describe,b.material_unit,c.supplier,c.class," +
					"c.buyer,c.version_no,c.supplier_code,c.state as h_state,c.build_time " +
					"from c_agreement a,c_general_material b,c_order_head c " +
					"where a.material_no = b.material_no and " +
					"a.order_code = '" + order_code + "' and " +
					"a.order_code = c.order_no";
			return new JSONArray(dao.createSQLQuery(sql)).toString();
		} catch (Exception e){
			System.out.println(e);
		}
		return null;
	}

	/**
	 * 采购协议-供应商 物料某版本协议价格获取 create by GuoFeng
	 */
	@Override
	public Object getAgreementUnitPrice(String supplierNo, String materialNo, String version){

		JSONObject result = new JSONObject();
		try{

			List<Integer> list = dao.executeQuery("select ca.unitPrice from CAgreement ca,COrderHead coh " +
					" where ca.id.orderCode=coh.orderNo " +
					" and coh.class_='采购协议' " +
					" and ca.state='已审核' " +
					" and coh.CSupplier.supplierCode='" + supplierNo + "' " +
					" and ca.materialNo='" + materialNo + "' " +
					" and ca.brand='" + version + "'");

			if (list.size() > 0 && list.get(0) != null){

				result.append("result", "true");
				result.append("unitPrice", list.get(0));
				return result.toString();

			} else{

				result.append("result", "false");
				return result.toString();
			}

		} catch (Exception e){

			result.append("result", e.getMessage());
			return result.toString();
		}

	}
}
