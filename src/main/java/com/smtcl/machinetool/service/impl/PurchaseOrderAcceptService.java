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
 * Created by SunJun on 2016/5/18.
 */
@Service
public class PurchaseOrderAcceptService implements IPurchaseOrderAcceptService{

	/**
	 * 常用工具类
	 */
	@Autowired
	IUtilService utilService;
	/**
	 * 数据库路通用dao
	 */
	@Autowired
	IGenericDAO  dao;

	/**
	 * 时间格式化
	 */
	private       SimpleDateFormat sdf    = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
	/**
	 * log
	 */
	private final Logger           logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public Object getOrderRow(String searchVal){

		/*查询条件JSON数据封装*/
		JSONObject jsonValue = new JSONObject(searchVal);

		/*节点名*/
		String nodeName = jsonValue.getString("nodeName");
		/*订单号*/
		String orderNo = jsonValue.getString("orderNo");
		/*版本号*/
		String versionNo = jsonValue.getString("versionNo");
		/*行号*/
		String rowNo = jsonValue.getString("rowNo");
		/*发运号*/
		String shipmentNo = jsonValue.getString("shipmentNo");
		/*供应商*/
		String supplierDescribe = jsonValue.getString("supplierDescribe");
		/*供应商编号*/
		String supplierNo = jsonValue.getString("supplierNo");
		/*物料编号*/
		String materialNo = jsonValue.getString("materialNo");
		/*物料描述*/
		String materialDescribe = jsonValue.getString("materialDescribe");
		/*订单开始时间*/
		String dateBegin = jsonValue.getString("dateBegin");
		/*订单结束时间*/
		String dateEnd = jsonValue.getString("dateEnd");

		/*查询语句封装*/
		String sql = "select " +
				" coa.accepted_number as acceptedNumber," +
				" coa.sssue_ticket_number as sssueTicketNumber," +
				" coa.delivery_number as deliveryNumber," +
				" coa.unit as unit," +
				" csrd.storage_room_no as storageRoomNo," +
				" coa.line_no as lineNo," +
				" coa.dispatch_no as dispatchNo," +
				" coa.provide_no as provideNo," +
				" cgm.material_no as materialNo," +
				" coa.brand as brand," +
				" coa.cargo_space_id as cargoSpaceId," +
				" cgm.material_describe as materialDescribe," +
				" coh.order_no as orderNo," +
				" coh.version_no as versionNo," +
				" coh.supplier_code as supplierCode," +
				" coh.supplier as supplier," +
				" coa.unit_price as unitPrice," +
				" cgm.restricted_cargo_space as restrictedCargoSpace," +
				" csrd.isStereoLibrary as isStereoLibrary" +
				" from " +
				" c_order_accept coa" +
				" left join c_order_head coh on coa.order_no = coh.order_no " +
				" left join c_storage_room_definition csrd on coa.accept_storage_room_id = csrd.storage_room_id " +
				" left join c_general_material cgm on coa.material_id = cgm.material_id " +
				" where coh.class = '采购订单' " +
				" and coh.state = '已审批' ";

		/*节点名*/
		if (nodeName.equals("orderAccept")){

			sql += " and coa.delivery_number>coa.accepted_number ";

		} else if (nodeName.equals("purchaseReturn")){

			sql += " and coa.accepted_number>coa.sssue_ticket_number ";

		}

		/*订单号条件*/
		if (orderNo.indexOf("%") == -1){

			sql += " and coh.order_no='" + orderNo + "'";

		} else{

			sql += " and coh.order_no like '" + orderNo + "'";
		}
		/*版本号*/
		if (versionNo.indexOf("%") == -1){

			sql += " and coh.version_no='" + versionNo + "'";
		} else{

			sql += " and coh.version_no like '" + versionNo + "'";
		}
		/*行号*/
		if (rowNo.indexOf("%") == -1){

			sql += " and coa.line_no='" + rowNo + "'";
		} else{

			sql += " and coa.line_no like '" + rowNo + "'";
		}
		/*发运号*/
		if (shipmentNo.indexOf("%") == -1){

			sql += " and coa.dispatch_no='" + shipmentNo + "'";

		} else if (shipmentNo.length() > 1){

			sql += " and coa.dispatch_no like '" + shipmentNo + "'";

		}
		/*供应商描述*/
		if (supplierDescribe.indexOf("%") == -1){

			sql += " and coh.supplier='" + supplierDescribe + "'";
		} else{

			sql += " and coh.supplier like '" + supplierDescribe + "'";
		}
		/*供应商编号*/
		if (supplierNo.indexOf("%") == -1){

			sql += " and coh.supplier_code='" + supplierNo + "'";

		} else{

			sql += " and coh.supplier_code like '" + supplierNo + "'";
		}
		/*物料编号*/
		if (materialNo.indexOf("%") == -1){

			sql += " and cgm.material_no='" + materialNo + "'";
		} else{

			sql += " and cgm.material_no like '" + materialNo + "'";
		}
		/*供应商描述*/
		if (materialDescribe.indexOf("%") == -1){

			sql += " and cgm.material_describe='" + materialDescribe + "'";

		} else{

			sql += " and cgm.material_describe like '" + materialDescribe + "'";

		}
		/*日期范围*/
		if (dateBegin.indexOf("%") == -1 && dateEnd.indexOf("%") == -1){

			sql += " and (coa.demand_time between '" + dateBegin + "' and '" + dateEnd + "')";

		} else if (dateBegin.indexOf("%") == -1 && dateEnd.indexOf("%") != -1){

			sql += " and coa.demand_time > '" + dateBegin + "'";

		} else if (dateBegin.indexOf("%") != -1 && dateEnd.indexOf("%") == -1){

			sql += " and coa.demand_time < '" + dateEnd + "'";
		}

		List<Map> mapList = dao.createSQL(sql);

		for (int i = 0; i < mapList.size(); i++){

			if (mapList.get(i).get("cargoSpaceId") != null){

				List<Map> listMap = dao.createSQL("select ccsd.cargo_space_no as cargoSpaceNo " +
						" from c_cargo_space_definition ccsd " +
						" where ccsd.cargo_space_id='" + mapList.get(i).get("cargoSpaceId").toString() + "'");

				String cargoSpaceNo = listMap.get(0).get("cargoSpaceNo").toString();

				mapList.get(i).put("cargoSpaceNo", cargoSpaceNo);

			} else{

				mapList.get(i).put("cargoSpaceNo", "");

			}

		}

		return mapList;
	}

	@Override
	public Object orderAcceptSave(String saveVal){

		/**
		 * 返回保存结果
		 */
		JSONObject result = new JSONObject();
		/**
		 * 需要保存的接受数量
		 */
		JSONArray saveAcceptNumber = new JSONArray(saveVal);
		/**
		 * 用于循环JSON数组
		 */
		JSONObject jsonObject = null;
		/**
		 * 库存表实体类
		 */
		CStockList stockList = new CStockList();
		/**
		 * 库存id实体类
		 */
		CStockListId cStockListId = new CStockListId();
		/**
		 * 事务处理表实体类
		 */
		CMaterialAffairsHandle materialAffairsHandle = new CMaterialAffairsHandle();

		try{

			/**
			 * 	物料事务处理事件记录添加
			 * 	同一次入库操作只有一个事务处理编号
			 */
			Integer transactionManagerNo = utilService.getSerialNumber("CMaterialAffairsHandle", "transactionManagerNo", "trm", "");

			/*新建时间*/
			Timestamp createTime = Timestamp.valueOf(sdf.format(new Date()));

			for (int i = 0; i < saveAcceptNumber.length(); i++){

				/*封装的单独的json对象*/
				jsonObject = saveAcceptNumber.getJSONObject(i);
				/*节点名称*/
				String nodeName = jsonObject.getString("nodeName");
				/*单位*/
				String unit = jsonObject.getString("unit");
				/*用户名*/
				String username = jsonObject.getString("username");
				/*订单号*/
				Integer orderNo = Integer.parseInt(jsonObject.getString("orderNo"));
				/*行号*/
				Integer lineNo = Integer.parseInt(jsonObject.getString("lineNo"));
				/*库房编号*/
				String storageNo = jsonObject.getString("storageNo");
				/*库位编号*/
				String storageLocationNo = jsonObject.getString("storageLocationNo");
				/*版本*/
				String version = jsonObject.getString("version");
				/*物料编号*/
				String materialNo = jsonObject.getString("materialNo");

				/*修改订单接受表*/
				List<COrderAccept> acceptList = dao.executeQuery("from COrderAccept ca " +
						" where ca.id.orderNo='" + jsonObject.getString("orderNo") + "' " +
						" and ca.id.lineNo='" + jsonObject.getString("lineNo") + "'");
				/*采购订单接受实体类*/
				COrderAccept orderAccept = acceptList.get(0);
				/*获取原先的接受数量*/
				Float reAcceptNumber = orderAccept.getAcceptedNumber();
				/*保存进来的接受数量*/
				Float getAcceptNumber = Float.parseFloat(jsonObject.getString("acceptNumber"));
				/*设置更新后的接受数量*/
				if (nodeName.equals("orderAccept")){

					orderAccept.setAcceptedNumber(reAcceptNumber + getAcceptNumber);

				} else if (nodeName.equals("purchaseReturn")){

					/*取消数量*/
					Float cancleNumber = orderAccept.getCancleNumber();
					/*设置取消以后的接受数量*/
					orderAccept.setAcceptedNumber(reAcceptNumber - getAcceptNumber);
					/*设置取消数量*/
					orderAccept.setCancleNumber(cancleNumber + getAcceptNumber);

				}
				/*获取库房 库位id*/
				String    hql     = "";
				List<Map> listMap = null;
				if (storageLocationNo.equals("") || storageLocationNo == null){

					listMap = dao.executeQuery("select new Map(csrd.storageRoomId as storageRoomId) from CStorageRoomDefinition csrd" +
							" where csrd.storageRoomNo='" + storageNo + "'");

					/*设置库位信息*/
					orderAccept.setAcceptStorageRoomId(Integer.parseInt(listMap.get(0).get("storageRoomId").toString()));

				} else{

					listMap = dao.executeQuery("select new Map(ccsd.CStorageRoomDefinition.storageRoomId as storageRoomId," +
							" ccsd.cargoSpaceId as cargoSpaceId) " +
							" from CCargoSpaceDefinition ccsd " +
							" where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageNo + "'" +
							" and ccsd.cargoSpaceNo='" + storageLocationNo + "'");
					Map map = listMap.get(0);
					/*设置库位信息*/
					orderAccept.setAcceptStorageRoomId(Integer.parseInt(map.get("storageRoomId").toString()));
					/*设置库位信息*/
					orderAccept.setCargoSpaceId(Integer.parseInt(map.get("cargoSpaceId").toString()));

				}

				/**
				 * 更新订单接受表
				 */
				dao.saveOrUpdate(orderAccept);

				/*更新库存表 查看是否有该物料的库存信息 如果有更新库存数量和加权价 如果没有加全价就是采购订单的采购价格*/
				List<CStockList> stockLists = dao.executeQuery("select cs from CStockList cs,CStorageRoomDefinition csrd,CGeneralMaterial cgm " +
						" where cs.id.stockId=csrd.storageRoomId " +
						" and cs.id.materialId=cgm.materialId " +
						" and csrd.storageRoomNo='" + jsonObject.getString("storageNo") + "' " +
						" and cgm.materialNo='" + jsonObject.getString("materialNo") + "' ");

				/*查询库房id和物料id*/
				List<Map> stockIdAndMaterialId = dao.executeQuery("select new Map(csrd.storageRoomId as storageRoomId,cgm.materialId as " +
						"materialId)" +
						" from CStorageRoomDefinition csrd,CGeneralMaterial cgm " +
						" where csrd.storageRoomNo='" + jsonObject.getString("storageNo") + "' " +
						" and cgm.materialNo='" + jsonObject.getString("materialNo") + "'");
				/*物料id*/
				Integer materialId = Integer.parseInt(stockIdAndMaterialId.get(0).get("materialId").toString());
				/*库房id*/
				Integer storageId = Integer.parseInt(stockIdAndMaterialId.get(0).get("storageRoomId").toString());

				/**
				 * 接受数量
				 */
				Float acceptNumber = Float.parseFloat(jsonObject.getString("acceptNumber"));

				/**
				 * 订单价格
				 */
				Double unitPrice = Double.parseDouble(jsonObject.getString("unitPrice"));

				/**
				 * 道具消耗表实体类
				 */
				CCuttoolConsumption cuttoolConsumption = new CCuttoolConsumption();
				/**
				 * 标志位
				 */
				int flag = 0;

				/*没有该物料的库存信息*/
				if (stockLists.size() == 0){

					/*设置物料id*/
					cStockListId.setMaterialId(materialId);
					/*库房id*/
					cStockListId.setStockId(storageId);
					/*设置库存id*/
					stockList.setId(cStockListId);
					/*设置库存数量*/
					stockList.setAvailableQuantity(Float.parseFloat(jsonObject.getString("acceptNumber")));
					/*设置钝品数量*/
					stockList.setBluntGoodsNum(0F);
					/*设置借用数量*/
					stockList.setBorrowNumber(0F);
					/*设置加权价*/
					stockList.setWeightedPrice(Double.parseDouble(jsonObject.getString("unitPrice")));


					/*有该物料的库存信息*/
				} else{

					/**
					 * 库存表实体类
					 */
					stockList = stockLists.get(0);
					/**
					 * 库存余额
					 */
					Float stockNumber = stockList.getAvailableQuantity();
					/**
					 * 库房加权价
					 */
					Double stockUnitPrice = stockList.getWeightedPrice();
					/**
					 * 库存余额与接受数量的总和
					 */
					Float allNumber = stockNumber + acceptNumber;

					/**
					 * 如果是采购退货
					 */
					if (nodeName.equals("purchaseReturn")){

						allNumber = stockNumber - acceptNumber;
					}

					/*设置加权价*/
					if (stockUnitPrice != unitPrice && nodeName.equals("orderAccept")){

						if (allNumber == 0){

							/*设置加权价*/
							stockList.setWeightedPrice(unitPrice);
							/*设置库存*/
							stockList.setAvailableQuantity(acceptNumber);
							/**
							 * 设置道具消耗表
							 * 把剩余的库存余额分配到“刀具消耗”表里，
							 * 方法是消耗一个1与-1，他们的余额=分子，
							 * 消耗里插入两行:第一行是1*2*分子,第二行是-1*分子，
							 * 插入两行是为了数量不变来调整库房余额
							 */
							/*设置物料id*/
							cuttoolConsumption.setMaterialId(materialId);
							/*设置消耗数量*/
							cuttoolConsumption.setNumber(2 * stockNumber);
							/*设置原因*/
							cuttoolConsumption.setReason("库存加权平衡");
							/*设置来源*/
							cuttoolConsumption.setSource("库存");
							/*设置新建者*/
							cuttoolConsumption.setCreatePerson(username);
							/*设置创建时间*/
							cuttoolConsumption.setCreateTime(createTime);
							/*设置库房*/
							cuttoolConsumption.setStorageRoomId(storageId);
							/*设置单价*/
							cuttoolConsumption.setUnitPrice(stockUnitPrice);

							/*保存道具消耗*/
							dao.add(cuttoolConsumption);

							/*设置标志位为1*/
							flag = 1;

						} else{

							/*结算加权价*/
							Double weightPrice = (acceptNumber * unitPrice + stockNumber * stockUnitPrice) / allNumber;
							/*设置加权价*/
							stockList.setWeightedPrice(weightPrice);

						}

					}

					if (flag == 0){

						stockList.setAvailableQuantity(allNumber);
					}

				}

				/**
				 * 更新库存表
				 */
				dao.saveOrUpdate(stockList);

				/**
				 * 判断是否保存库存明细表
				 */
				/*库存明细表判断是否需要添加*/
				List<Map> mapList = dao.executeQuery("select new Map(cgm.versionControlOrnot as versionControlOrnot," +
						"cgm.batchControl as batchControl,cgm.sequenceControl as sequenceControl,cgm.restrictedCargoSpace as restrictedCargoSpace)" +
						" " +
						" from CGeneralMaterial cgm " +
						" where cgm.materialNo='" + materialNo + "'");
				Map map                    = mapList.get(0);
				int versionControl         = Integer.parseInt(map.get("versionControlOrnot").toString());
				int batchControl           = Integer.parseInt(map.get("batchControl").toString());
				int sequenceControl        = Integer.parseInt(map.get("sequenceControl").toString());
				int restricted_cargo_space = Integer.parseInt(map.get("restrictedCargoSpace").toString());

				/*如果有个条件满足则保存库存明细表*/
				if (versionControl == 1 || batchControl == 1 || sequenceControl == 1 || restricted_cargo_space == 1){

					/*版本编号获取*/
					String versionNo = null;

					if (!version.equals("")){

						/*获取物料版本号*/
						List list = dao.executeQuery("select cmv.id.materialVersionNo " +
								" from CMaterialVersion cmv " +
								" where cmv.CGeneralMaterial.materialNo='" + materialNo + "' " +
								" and cmv.versionExplain='" + version.trim() + "'");

						versionNo = list.get(0).toString();

					}

					/**
					 * 订单接受暂时没有涉及到 批次 序列 先不处理
					 */

					/*查看有没有这个库存明细*/
					String hql1 = "from CStockDetailList csd " +
							" where csd.id.stockId='" + storageId + "' " +
							" and csd.id.materialId='" + materialId + "' " +
							" and csd.id.goodsAllocationNo='" + storageLocationNo + "'";
					if (versionNo == null){

						hql1 += " and csd.versionNo is null ";

					} else{

						hql += " and csd.versionNo='" + versionNo + "'";
					}

					List<CStockDetailList> list1 = dao.executeQuery(hql1);

					System.out.println(storageId + " " + materialId + " " + versionNo + " " + storageLocationNo);

					/*存在该库存明细信息*/
					if (list1.size() > 0 && list1.get(0) != null){

						CStockDetailList cStockDetailList = list1.get(0);
						Float            nowNumber        = cStockDetailList.getAvailableQuantity();

						/*如果是采购退货*/
						if (nodeName.equals("purchaseReturn")){

							cStockDetailList.setAvailableQuantity(nowNumber - acceptNumber);

						} else{

							cStockDetailList.setAvailableQuantity(acceptNumber + nowNumber);
						}

						/**
						 * 更新库存信息
						 */
						dao.saveOrUpdate(cStockDetailList);

					} else{

						CStockDetailList   stockDetailList   = new CStockDetailList();
						CStockDetailListId stockDetailListId = new CStockDetailListId();

						/**
						 * 设置主键
						 */
						/*设置物料id*/
						stockDetailListId.setMaterialId(materialId);
						/*设置库房id*/
						stockDetailListId.setStockId(storageId);
						/*设置库位id*/
						stockDetailListId.setGoodsAllocationNo(storageLocationNo);
						/*设置批次id 默认为空字符串*/
						stockDetailListId.setBatchNo(-999);
						/*设置序列id 默认为空字符串*/
						stockDetailListId.setSequenceNo(-999);

						stockDetailList.setId(stockDetailListId);
						/*设置物料版本编号*/
						stockDetailList.setVersionNo(versionNo);
						/*设置物料版本描述*/
						stockDetailList.setVersionException(version);
						/*设置库存现有量*/
						/*如果是采购退货*/
						if (nodeName.equals("purchaseReturn")){

							stockDetailList.setAvailableQuantity(0 - acceptNumber);

						} else{

							stockDetailList.setAvailableQuantity(acceptNumber);
						}
						/*设置钝品数量 默认0*/
						stockDetailList.setBluntGoodsNum(0F);
						/*设置借用数量 默认0*/
						stockDetailList.setBorrowNumber(0F);

						/**
						 * 保存库存明细
						 */
						dao.add(stockDetailList);

					}

				}


				/*设置物料事务处理编号*/
				materialAffairsHandle.setTransactionManagerNo(transactionManagerNo);
				/*设置来源类型*/
				materialAffairsHandle.setSourceType("采购订单");
				/*设置来源*/
				materialAffairsHandle.setSource(orderNo + "-" + lineNo);
				/*事务处理类型*/
				if (nodeName.equals("orderAccept")){

					materialAffairsHandle.setTransactionManagerType("接受入库");

				} else if (nodeName.equals("purchaseReturn")){

					materialAffairsHandle.setTransactionManagerType("退回供应商");

				}
				/*事务处理活动*/
				materialAffairsHandle.setTransactionManagerActivity("供应商");
				/*事务处理单位*/
				materialAffairsHandle.setTransactionManagerCompany(unit);
				/*事务处理数量*/
				materialAffairsHandle.setTotalTransactionManager(acceptNumber);
				/*库房表实体类*/
				CStorageRoomDefinition storageRoomDefinition = new CStorageRoomDefinition();
				storageRoomDefinition.setStorageRoomId(storageId);
				/*库房id*/
				materialAffairsHandle.setCStorageRoomDefinition(storageRoomDefinition);
				/*物料实体类*/
				CGeneralMaterial generalMaterial = new CGeneralMaterial();
				generalMaterial.setMaterialId(materialId);
				/*物料id设置*/
				materialAffairsHandle.setCGeneralMaterial(generalMaterial);
				/*新建者*/
				materialAffairsHandle.setCreatePerson(username);
				/*新建时间*/
				materialAffairsHandle.setCreateTime(createTime);
				/*是否打印*/
				materialAffairsHandle.setStamp("否");

				/*添加事务处理*/
				dao.add(materialAffairsHandle);

			}

			result.append("result", true);
			return result.toString();

		} catch (Exception e){

			e.printStackTrace();
			/*打印log日志*/
			logger.error(e.getMessage());
			result.append("result", e.getMessage());
			return result.toString();
		}

	}
}
