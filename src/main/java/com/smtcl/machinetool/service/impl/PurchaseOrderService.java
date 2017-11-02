package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.sql.*;
import java.text.*;
import java.util.*;
import java.util.Date;

/**
 * Created by SunJun on 2016/4/26.
 */
@Service
public class PurchaseOrderService implements IPurchaseOrderService{

	@Autowired
	IUtilService utilService;
	@Autowired
	IGenericDAO  dao;

	private       SimpleDateFormat sdf    = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	private final Logger           logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public String saveOrder(String request){

		JSONObject requestJson = new JSONObject(request);
		JSONObject head        = requestJson.getJSONObject("orderHead");
		JSONArray  row         = requestJson.getJSONArray("orderRow");
		COrderHead cOrderHead  = new COrderHead();
		JSONObject result      = new JSONObject();
		String     orderNo     = head.getString("orderNo");

		try{

			/*判断订单是否是编辑订单判断是否重新生成订单号*/
			if (orderNo.equals("")){

				orderNo = utilService.getSerialNumber("COrderHead", "orderNo", "orderNo", "").toString();

			}

			/*订单题头设置*/
			/*订单号*/
			cOrderHead.setOrderNo(Integer.parseInt(orderNo));
			/*版本号*/
			cOrderHead.setVersionNo(Integer.parseInt(head.getString("orderVersion")));
			/*采购员*/
			cOrderHead.setBuyer(head.getString("buyer"));
			/**
			 * 物料类别设置 （默认采购件）
			 */
			cOrderHead.setMaterialClass("采购件");
			/*类型*/
			cOrderHead.setClass_(head.getString("type"));
			/*接受组织*/
			cOrderHead.setAcceptOrderSide(head.getString("accept"));
			/*获取接受库房id*/
			Integer storageId = null;
			if (!head.getString("storage").equals("")){

				storageId = Integer.parseInt(dao.executeQuery("select csrd.storageRoomId from CStorageRoomDefinition csrd " +
						" where csrd.storageRoomNo='" + head.getString("storage").trim() + "'").get(0).toString());
			}

			cOrderHead.setAccepteStorageRoomId(storageId);
			/*设置供应商信息*/
			CSupplier cSupplier = new CSupplier();
			cSupplier.setSupplierCode(Integer.parseInt(head.getString("supplierNo")));
			cOrderHead.setSupplier(head.getString("supplierDescribe"));
			cOrderHead.setCSupplier(cSupplier);
			/*订单状态设置*/
			cOrderHead.setState(head.getString("state"));

			/*创建时间设置*/
			cOrderHead.setBuildTime(Timestamp.valueOf(head.getString("createDate")));
			/*如果是编辑则设置更新时间和创建人*/
			if (head.getString("orderState").equals("edit")){

				/*获取订单创建者和创建时间*/
				String createPerson = dao.executeQuery("select coh.buildPerson from COrderHead coh " +
						" where coh.orderNo='" + orderNo + "' ").get(0).toString();

				cOrderHead.setBuildPerson(createPerson);
				cOrderHead.setUpdateTime(Timestamp.valueOf(sdf.format(new Date())));
				cOrderHead.setUpdatePerson(head.getString("username"));

				/*订单创建*/
			} else{

				cOrderHead.setBuildPerson(head.getString("username"));
			}

			/*题头保存*/
			dao.saveOrUpdate(cOrderHead);

			/*采购订单行信息设置*/
			COrderAccept cOrderAccept = new COrderAccept();
			for (int i = 0; i < row.length(); i++){

				JSONObject rowObject = row.getJSONObject(i);
				/*行状态获取*/
				String rowState = rowObject.getString("rowState");
				/*如果是编辑*/
				if (rowState.equals("edit")){

					cOrderAccept = (COrderAccept) dao.executeQuery("from COrderAccept coa " +
							" where coa.id.orderNo='" + orderNo + "' " +
							" and coa.id.lineNo='" + rowObject.getString("rowNo") + "'").get(0);
				}
				/*如果是删除了得订单行 直接删除然后进入下次循环*/
				if (rowState.equals("delete")){

					dao.executeQuery("delete from COrderAccept coa " +
							" where coa.id.orderNo='" + orderNo + "' " +
							" and coa.id.lineNo='" + rowObject.getString("rowNo") + "'");
					continue;
				}

				/*设置订单编号设置行号*/
				COrderAcceptId cOrderAcceptId = new COrderAcceptId();
				cOrderAcceptId.setOrderNo(Integer.parseInt(orderNo));
				cOrderAcceptId.setLineNo(Integer.parseInt(rowObject.getString("rowNo")));
				cOrderAccept.setId(cOrderAcceptId);

				/*获取物料id*/
				Integer materialId = Integer.parseInt(dao.executeQuery("select cgm.materialId from CGeneralMaterial cgm " +
						" where cgm.materialNo='" + rowObject.getString("materialNo") + "'").get(0).toString());
				/*设置物料id*/
				CGeneralMaterial cGeneralMaterial = new CGeneralMaterial();
				cGeneralMaterial.setMaterialId(materialId);
				cOrderAccept.setCGeneralMaterial(cGeneralMaterial);
				/*设置单位*/
				cOrderAccept.setUnit(rowObject.getString("unit"));
				/*行类别设置*/
				cOrderAccept.setLineClass(rowObject.getString("materialClass"));
				/*行状态设置*/
				cOrderAccept.setState(head.getString("state"));

				/**
				 * 订单数量设置
				 * TODO 这里是送货数量
				 */
				cOrderAccept.setDeliveryNumber(Float.parseFloat(rowObject.getString("number")));
				/**
				 * 接受数量 默认为0
				 */
				cOrderAccept.setAcceptedNumber(0F);

				/**
				 * 取消数量 默认为0
				 */
				cOrderAccept.setCancleNumber(0F);
				/**
				 * 开票数量默认为0
				 */
				cOrderAccept.setSssueTicketNumber(0F);

				/*单价设置*/
				Double price     = 0d;
				String unitPrice = rowObject.getString("unitPrice");
				if (!unitPrice.equals("")){

					price = Double.parseDouble(unitPrice);
				}
				cOrderAccept.setUnitPrice(price);
				/*需求时间设置*/
				String needTime = rowObject.getString("needTime");
				if (needTime.equals("")){

					cOrderAccept.setDemandTime(Timestamp.valueOf(sdf.format(new Date())));

				} else{

					cOrderAccept.setDemandTime(Timestamp.valueOf(rowObject.getString("needTime") + " 00:00:00"));
				}
				/*品牌设置*/
				cOrderAccept.setBrand(rowObject.getString("brand"));
				/*库房id设置*/
				if (!rowObject.getString("storage").equals("")){

					storageId = Integer.parseInt(dao.executeQuery("select csrd.storageRoomId from CStorageRoomDefinition csrd " +
							" where csrd.storageRoomNo='" + rowObject.getString("storage").trim() + "'").get(0).toString());

				} else{

					storageId = Integer.parseInt(dao.executeQuery("select csrd.storageRoomId from CStorageRoomDefinition csrd " +
							" where csrd.storageRoomNo='" + head.getString("storage") + "'").get(0).toString());

				}
				cOrderAccept.setAcceptStorageRoomId(storageId);

				/*判断订单是否是根据 申请创建*/
				if (head.getBoolean("autoCreate")){

					/*采购申请个编号设置*/
					cOrderAccept.setApplyNo(Integer.parseInt(rowObject.getString("requisitionNo")));
					/*采购申请行号设置*/
					cOrderAccept.setApplyLineNo(Integer.parseInt(rowObject.getString("requisitionRowNo")));

				}

				/*订单行信息设置*/
				dao.saveOrUpdate(cOrderAccept);

			}

			/*保存成功*/
			result.append("result", "success");
			result.append("orderNo", orderNo);
			return result.toString();

		} catch (Exception e){

			/*保存失败*/
			e.printStackTrace();
			/*打印log日志*/
			logger.error(e.getMessage());
			result.append("result", e.getMessage());
			return result.toString();
		}
	}

	@Override
	public Object orderHeadSummary(String request){

		JSONObject requestData       = new JSONObject(request);
		String     orderNo           = requestData.getString("orderNo");
		String     rowNo             = requestData.getString("rowNo");
		String     dispatchNo        = requestData.getString("shipmentNo");
		String     buyer             = requestData.getString("buyer");
		String     sourceApplication = requestData.getString("sourceApplication");
		String     orderState        = requestData.getString("orderState");
		String     supplierNo        = requestData.getString("supplierNo");
		String     materialNo        = requestData.getString("materialNo");
		String     createDateBegin   = requestData.getString("createDateBegin");
		String     createDateEnd     = requestData.getString("createDateEnd");
		String     needDateBegin     = requestData.getString("needDateBegin");
		String     needDateEnd       = requestData.getString("needDateEnd");

		String hql = "select distinct coh from COrderHead coh,COrderAccept coa " +
				" where coh.orderNo=coa.id.orderNo " +
				" and coh.class_='采购订单' ";
		/*订单号*/
		if (orderNo.indexOf("%") == -1){

			hql += " and coh.orderNo='" + orderNo + "'";

		} else{

			hql += " and coh.orderNo like '" + orderNo + "'";
		}
		/*行号*/
		if (rowNo.indexOf("%") == -1){

			hql += " and coa.id.lineNo='" + rowNo + "'";

		} else{

			hql += " and coa.id.lineNo like '" + rowNo + "'";

		}
		/**
		 * 发运号 暂时先不做处理
		 */
		/*if (dispatchNo.indexOf("%") == -1){

			hql += " and coa.dispatchNo='" + dispatchNo + "'";

		} else{

			hql += " and coa.dispatchNo like '" + dispatchNo + "'";
		}*/
		/*采购员*/
		if (buyer.indexOf("%") == -1){

			hql += " and coh.buyer='" + buyer + "'";

		} else{

			hql += " and coh.buyer like '" + buyer + "'";

		}
		/*申请来源*/
		if (sourceApplication.indexOf("%") == -1){

			hql += " and coa.applyNo='" + sourceApplication + "'";

		} else if (sourceApplication.length() > 1){

			hql += " and coa.applyNo like '" + sourceApplication + "'";
		}

		/*订单状态*/
		if (orderState.indexOf("%") == -1){

			hql += " and coh.state='" + orderState + "'";

		} else{

			hql += " and coh.state like '" + orderState + "'";

		}
		/*供应商*/
		if (supplierNo.indexOf("%") == -1){

			hql += " and coh.CSupplier.supplierCode='" + supplierNo + "'";

		} else{

			hql += " and coh.CSupplier.supplierCode like '" + supplierNo + "'";
		}
		/*物料*/
		if (materialNo.indexOf("%") == -1){

			hql += " and coa.CGeneralMaterial.materialNo='" + materialNo + "'";

		} else{

			hql += " and coa.CGeneralMaterial.materialNo like '" + materialNo + "'";

		}
		/*时间控制*/
		if (createDateBegin.equals("%") && !createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";

		} else if (!createDateBegin.equals("%") && createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d')>=DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d')";

		} else if (!createDateBegin.equals("%") && !createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d') between DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d') " +
					" and  DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
		}

		if (needDateBegin.equals("%") && !needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d')<=DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";

		} else if (!needDateBegin.equals("%") && needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d')>=DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d')";

		} else if (!needDateBegin.equals("%") && !needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d') between DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d') " +
					" and DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
		}

		hql += " order by coh.orderNo ";

		List             array   = new ArrayList();
		List<COrderHead> mapList = dao.executeQuery(hql);

		for (int i = 0; i < mapList.size(); i++){

			Map map = new HashMap();

			COrderHead orderHead = mapList.get(i);
			map.put("orderHead", orderHead);
			if (orderHead.getAccepteStorageRoomId() == null){

				map.put("storageRoomNo", "");

			} else{

				String storageRoomNo = dao.executeQuery("select csrd.storageRoomNo " +
						" from CStorageRoomDefinition csrd " +
						"where csrd.storageRoomId='" + orderHead.getAccepteStorageRoomId() + "'").get(0).toString();

				map.put("storageRoomNo", storageRoomNo);
			}

			array.add(map);
		}

		return array;
	}

	@Override
	public Object orderRowSummary(String request){

		JSONObject requestData       = new JSONObject(request);
		String     orderNo           = requestData.getString("orderNo");
		String     rowNo             = requestData.getString("rowNo");
		String     dispatchNo        = requestData.getString("shipmentNo");
		String     buyer             = requestData.getString("buyer");
		String     sourceApplication = requestData.getString("sourceApplication");
		String     orderState        = requestData.getString("orderState");
		String     supplierNo        = requestData.getString("supplierNo");
		String     materialNo        = requestData.getString("materialNo");
		String     createDateBegin   = requestData.getString("createDateBegin");
		String     createDateEnd     = requestData.getString("createDateEnd");
		String     needDateBegin     = requestData.getString("needDateBegin");
		String     needDateEnd       = requestData.getString("needDateEnd");

		String hql = "select new Map(coa.id.orderNo as orderNo,coa.id.lineNo as lineNo,coa.CGeneralMaterial.materialNo as materialNo," +
				" coa.lineClass as lineClass,coa.CGeneralMaterial.materialDescribe as materialDescribe,coa.deliveryNumber as deliveryNumber," +
				" coa.unit as unit,coa.unitPrice as unitPrice,coh.updateTime as updateTime,coa.brand as brand," +
				" coh.supplier as supplier,coa.acceptedNumber as acceptedNumber,coa.cancleNumber as cancleNumber," +
				" coa.state as state,coh.class_ as class_,coh.buyer as buyer,coa.applyNo as applyNo,coa.applyLineNo as applyLineNo," +
				" coa.dispatchNo as dispatchNo,coh.buildTime as buildTime,coh.buildPerson as buildPerson,csrd.storageRoomNo as storageRoomNo," +
				" coa.cargoSpaceId as cargoSpaceId) " +
				" from COrderHead coh,COrderAccept coa,CStorageRoomDefinition csrd " +
				" where coh.orderNo=coa.id.orderNo " +
				" and coh.class_='采购订单' " +
				" and coa.acceptStorageRoomId=csrd.storageRoomId ";
		/*订单号*/
		if (orderNo.indexOf("%") == -1){

			hql += " and coa.id.orderNo='" + orderNo + "'";

		} else{

			hql += " and coh.id.orderNo like '" + orderNo + "'";
		}
		/*行号*/
		if (rowNo.indexOf("%") == -1){

			hql += " and coa.id.lineNo='" + rowNo + "'";

		} else{

			hql += " and coa.id.lineNo like '" + rowNo + "'";

		}
		/**
		 * 发运号 暂时先不做处理
		 */
		/*if (dispatchNo.indexOf("%") == -1){

			hql += " and coa.dispatchNo='" + dispatchNo + "'";

		} else{

			hql += " and coa.dispatchNo like '" + dispatchNo + "'";
		}*/
		/*采购员*/
		if (buyer.indexOf("%") == -1){

			hql += " and coh.buyer='" + buyer + "'";

		} else{

			hql += " and coh.buyer like '" + buyer + "'";

		}
		/*申请来源*/
		if (sourceApplication.indexOf("%") != -1 && sourceApplication.length() > 1){

			hql += " and coa.applyNo like '" + sourceApplication + "'";

		} else if (sourceApplication.indexOf("%") == -1){

			hql += " and coa.applyNo='" + sourceApplication + "'";

		}
		/*订单状态*/
		if (orderState.indexOf("%") == -1){

			hql += " and coh.state='" + orderState + "'";

		} else{

			hql += " and coh.state like '" + orderState + "'";

		}
		/*供应商*/
		if (supplierNo.indexOf("%") == -1){

			hql += " and coh.CSupplier.supplierCode='" + supplierNo + "'";

		} else{

			hql += " and coh.CSupplier.supplierCode like '" + supplierNo + "'";
		}
		/*物料*/
		if (materialNo.indexOf("%") == -1){

			hql += " and coa.CGeneralMaterial.materialNo='" + materialNo + "'";

		} else{

			hql += " and coa.CGeneralMaterial.materialNo like '" + materialNo + "'";

		}
		/*时间控制*/
		if (createDateBegin.equals("%") && !createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";

		} else if (!createDateBegin.equals("%") && createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d')>=DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d')";

		} else if (!createDateBegin.equals("%") && !createDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coh.buildTime,'%Y%m%d') between DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d') " +
					" and  DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
		}

		if (needDateBegin.equals("%") && !needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d')<=DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";

		} else if (!needDateBegin.equals("%") && needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d')>=DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d')";

		} else if (!needDateBegin.equals("%") && !needDateEnd.equals("%")){

			hql += " and DATE_FORMAT(coa.demandTime,'%Y%m%d') between DATE_FORMAT('" + needDateBegin + " 00:00:00','%Y%m%d') " +
					" and DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
		}

		/*查询库位编号*/
		List<Map> mapList = dao.executeQuery(hql);
		int       length  = mapList.size();
		for (int i = 0; i < length; i++){

			if (mapList.get(i).get("cargoSpaceId") == null){

				mapList.get(i).put("cargoSpaceNo", "");

			} else{

				String storageRoomNo     = mapList.get(i).get("storageRoomNo").toString();
				String storageLocationId = mapList.get(i).get("cargoSpaceId").toString();
				String storageLocationNo = dao.executeQuery("select ccsd.cargoSpaceNo from CCargoSpaceDefinition ccsd " +
						" where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' " +
						" and ccsd.cargoSpaceId='" + storageLocationId + "'").get(0).toString();

				mapList.get(i).put("cargoSpaceNo", storageLocationNo);

			}
		}

		return mapList;
	}

	@Override
	public Object getOrderRowByOrderNo(String orderNo){

		String hql = "select new Map(coa.id.orderNo as orderNo,coa.id.lineNo as lineNo,coa.CGeneralMaterial.materialNo as materialNo," +
				" coa.lineClass as lineClass,coa.CGeneralMaterial.materialDescribe as materialDescribe,coa.deliveryNumber as deliveryNumber," +
				" coa.unit as unit,coa.unitPrice as unitPrice,coh.updateTime as updateTime,coa.brand as brand," +
				" coh.supplier as supplier,coa.acceptedNumber as acceptedNumber,coa.cancleNumber as cancleNumber," +
				" coa.state as state,coh.class_ as class_,coh.buyer as buyer,coa.applyNo as applyNo,coa.applyLineNo as applyLineNo," +
				" coa.dispatchNo as dispatchNo,coh.buildTime as buildTime,coh.buildPerson as buildPerson,csrd.storageRoomNo as storageRoomNo," +
				" coa.cargoSpaceId as cargoSpaceId) " +
				" from COrderHead coh,COrderAccept coa,CStorageRoomDefinition csrd " +
				" where coh.orderNo=coa.id.orderNo " +
				" and coh.class_='采购订单' " +
				" and coa.acceptStorageRoomId=csrd.storageRoomId " +
				" and coa.id.orderNo='" + orderNo + "'";
		/*查询库位编号*/
		List<Map> mapList = dao.executeQuery(hql);
		for (int i = 0; i < mapList.size(); i++){

			if (mapList.get(i).get("cargoSpaceId") == null){

				mapList.get(i).put("cargoSpaceNo", "");

			} else{

				String storageRoomNo     = mapList.get(i).get("storageRoomNo").toString();
				String storageLocationId = mapList.get(i).get("cargoSpaceId").toString();
				String storageLocationNo = dao.executeQuery("select ccsd.cargoSpaceNo from CCargoSpaceDefinition ccsd " +
						" where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' " +
						" and ccsd.cargoSpaceId='" + storageLocationId + "'").get(0).toString();

				mapList.get(i).put("cargoSpaceNo", storageLocationNo);

			}
		}

		return mapList;
	}

	@Override
	public Object getOrderByOrderNo(String orderNo){

		JSONObject result = new JSONObject();

		/*订单题头查询*/
		List<Map> orderHead = dao.executeQuery("select new Map(coh.orderNo as orderNo,coh.versionNo as versionNo," +
				"coh.buyer as buyer,coh.accepteStorageRoomId as accepteStorageRoomId,coh.CSupplier.supplierCode as supplierCode," +
				" coh.CSupplier.supplier as supplier,coh.state as state,coh.buildTime as buildTime) " +
				" from COrderHead coh " +
				" where coh.orderNo='" + orderNo + "' ");
		for (int i = 0; i < orderHead.size(); i++){

			if (orderHead.get(i).get("accepteStorageRoomId") == null){

				orderHead.get(i).put("storageRoomNo", "");

			} else{

				String storageRoomId = orderHead.get(i).get("accepteStorageRoomId").toString();
				String storageRoomNo = dao.executeQuery("select csrd.storageRoomNo from CStorageRoomDefinition csrd where csrd.storageRoomId='" +
						storageRoomId + "'").get(0).toString();

				orderHead.get(i).put("storageRoomNo", storageRoomNo);

			}
		}

		/*订单行查询*/
		String hql = "select new Map(coa.id.orderNo as orderNo,coa.id.lineNo as lineNo,coa.CGeneralMaterial.materialNo as materialNo," +
				" coa.lineClass as lineClass,coa.CGeneralMaterial.materialDescribe as materialDescribe,coa.deliveryNumber as deliveryNumber," +
				" coa.unit as unit,coa.unitPrice as unitPrice,coh.updateTime as updateTime,coa.brand as brand," +
				" coh.supplier as supplier,coa.acceptedNumber as acceptedNumber,coa.cancleNumber as cancleNumber," +
				" coa.state as state,coh.class_ as class_,coh.buyer as buyer,coa.applyNo as applyNo,coa.applyLineNo as applyLineNo," +
				" coa.dispatchNo as dispatchNo,coh.buildTime as buildTime,coh.buildPerson as buildPerson,csrd.storageRoomNo as storageRoomNo," +
				" coa.cargoSpaceId as cargoSpaceId,coa.demandTime as demandTime) " +
				" from COrderHead coh,COrderAccept coa,CStorageRoomDefinition csrd " +
				" where coh.orderNo=coa.id.orderNo " +
				" and coh.class_='采购订单' " +
				" and coa.acceptStorageRoomId=csrd.storageRoomId " +
				" and coa.id.orderNo='" + orderNo + "'";
		/*查询库位编号*/
		List<Map> orderRow = dao.executeQuery(hql);
		/*for (int i = 0; i < orderRow.size(); i++){

			if (orderRow.get(i).get("cargoSpaceId") == null){

				orderRow.get(i).put("cargoSpaceNo", "");

			} else{

				String storageRoomNo     = orderRow.get(i).get("storageRoomNo").toString();
				String storageLocationId = orderRow.get(i).get("cargoSpaceId").toString();
				String storageLocationNo = dao.executeQuery("select ccsd.cargoSpaceNo from CCargoSpaceDefinition ccsd " +
						" where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' " +
						" and ccsd.cargoSpaceId='" + storageLocationId + "'").get(0).toString();

				orderRow.get(i).put("cargoSpaceNo", storageLocationNo);

			}
		}*/

		result.append("orderHead", orderHead);
		result.append("orderRow", orderRow);

		return result.toString();

	}

}
