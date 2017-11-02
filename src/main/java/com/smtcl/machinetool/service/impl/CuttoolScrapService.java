package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.ICuttoolScrapService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.*;

import java.net.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by CJS on 2016/6/2. Changed by SunJun on 2016/8/2
 */
@Service
public class CuttoolScrapService implements ICuttoolScrapService{

	private SimpleDateFormat sdf     = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat sdfDate = new SimpleDateFormat("yyyyMMdd");

	@Autowired
	IGenericDAO dao;

	@Override
	public String saveScrapMsg(String uploadValue){

		JSONObject result = new JSONObject();

		try{
			//1.刀具报废(消耗) 2.刀具换取-->借用
			System.out.println("===========开始报废啦。。。。。。。。。");
			JSONObject json = new JSONObject(uploadValue);
			/**
			 * 物料编号
			 */
			String mNo = json.getString("materialNo");
			/**
			 * 报废数量
			 */
			Float scrapNum = Float.parseFloat(json.getString("scrapNum"));
			/**
			 * 换取数量
			 */
			String scrapChangeNum = json.getString("scrapChangeNum");
			String scrapReason    = json.getString("scrapReason");
			/**
			 * 库房编号
			 */
			String roomNo = json.getString("roomNo");
			/**
			 * 库位编号
			 */
			String goodsAllocationNo = json.getString("goodallocation");
			/**
			 * 设备号
			 */

			/**
			 * 换取数量
			 */
			Float scrapChangeNumber = 0F;

			if (!"".equals(scrapChangeNum)){

				scrapChangeNumber = Float.parseFloat(scrapChangeNum);

			}

			String equipmentNo       = json.getString("scrap_Equno");
			int    goodsAllocationID = 0;

			if (!"".equals(goodsAllocationNo)){
				goodsAllocationID = (Integer) dao.executeQuery("from CCargoSpaceDefinition ccsd where ccsd.cargoSpaceNo=" + goodsAllocationNo).get
						(0);
			} else{

			}
			String person = json.getString("person");
			//更新库存量，把报废数量从库存的借用数量中减去
			Integer materialId = (Integer) dao.executeQuery("select cgm.materialId from CGeneralMaterial cgm where cgm.materialNo='" +
					mNo.trim() + "'").get(0);

			List<CStorageRoomDefinition> roomlist = new ArrayList<CStorageRoomDefinition>();
			CStorageRoomDefinition       room     = new CStorageRoomDefinition();
			String                       hql1     = "from CStorageRoomDefinition room where room.storageRoomNo='" + roomNo + "'";
			roomlist = dao.executeQuery(hql1);
			room = roomlist.get(0);

			//change start-----------------
			int roomid = room.getStorageRoomId();

			if ("".equals(goodsAllocationNo) || goodsAllocationNo == null){

				String           hql        = "from CStockList c where c.id.stockId=" + roomid + " and c.id.materialId=" + materialId;
				List<CStockList> StockLists = new ArrayList<CStockList>();
				CStockList       stock      = new CStockList();
				StockLists = dao.executeQuery(hql);
				stock = StockLists.get(0);
				/*借用数量*/
				Float borrowNum = stock.getBorrowNumber();
				/*库存总量*/
				Float allNumber = stock.getAvailableQuantity();
				/*报废数量设置*/
				stock.setBorrowNumber(borrowNum - scrapNum);

				/*设置换取数量*/
				if (!"".equals(scrapChangeNum)){

					/*重新获取借用数量*/
					borrowNum = stock.getBorrowNumber();

					/*设置库存总量*/
					stock.setAvailableQuantity(allNumber - scrapChangeNumber);
					stock.setBorrowNumber(borrowNum + scrapChangeNumber);

				}

				dao.saveOrUpdate(stock);

			} else{

				String hql = "from CStockDetailList c " +
						" where c.id.stockId=" + roomid + " " +
						" and c.id.materialId=" + materialId + " " +
						" and c.goodsAllocationId=" +

						goodsAllocationID;
				List<CStockDetailList> stockDetailLists = new ArrayList<CStockDetailList>();
				CStockDetailList       stockDetail      = new CStockDetailList();
				stockDetailLists = dao.executeQuery(hql);
				stockDetail = stockDetailLists.get(0);

				/**
				 * 库存明细借用量
				 */
				Float borrowNum = stockDetail.getBorrowNumber();
				stockDetail.setBorrowNumber(borrowNum - scrapNum);
				/**
				 * 库存明细换取量设置
				 */
				Float allNumber = stockDetail.getAvailableQuantity();
				borrowNum = stockDetail.getBorrowNumber();

				stockDetail.setAvailableQuantity(allNumber - scrapChangeNumber);
				stockDetail.setBorrowNumber(borrowNum + scrapChangeNumber);

				dao.saveOrUpdate(stockDetail);

			}

			//更新借用归还信息（报废数量更新）
			List<CBorrowReturn> list         = new ArrayList<CBorrowReturn>();
			CBorrowReturn       borrowReturn = new CBorrowReturn();

			String hql2 = "select distinct cbr " +
					" from CBorrowReturn cbr " +
					" where cbr.id.borrowCode='" + json.getString("scrap_taskNo") + "' " +
					" and cbr.CGeneralMaterial.materialNo='" + mNo + "'";

			list = dao.executeQuery(hql2);
			borrowReturn = list.get(0);

			/*获取报废数量*/
			Float scrapNumber = borrowReturn.getScrapNumber();

			if (scrapNumber == null){

				scrapNumber = 0f;

			}
			scrapNumber += scrapNum;

			/**
			 * 设置报废数量
			 */
			borrowReturn.setScrapNumber(scrapNumber);
			/**
			 * 设置借用数量
			 */
			borrowReturn.setBorrowNumber(borrowReturn.getBorrowNumber() + scrapChangeNumber);

			dao.saveOrUpdate(borrowReturn);

			//增加消耗记录
			CCuttoolConsumption cuttoolConsumption = new CCuttoolConsumption();
			cuttoolConsumption.setMaterialId(materialId);
			cuttoolConsumption.setNumber(scrapNumber);

			if (!"".equals(goodsAllocationNo)){

				cuttoolConsumption.setGoodsAllocationId(Integer.parseInt(goodsAllocationNo));
			}

			cuttoolConsumption.setReason(scrapReason);
			cuttoolConsumption.setType("报废");
			cuttoolConsumption.setSource(json.getString("scrap_taskNo"));
			cuttoolConsumption.setSourceRow(json.getString("scrap_rowNo"));
			String    date       = sdf.format(new Date());
			Timestamp createTime = null;
			cuttoolConsumption.setCreatePerson(json.getString("createPerson"));
			cuttoolConsumption.setCreateTime(createTime.valueOf(date));
			cuttoolConsumption.setStorageRoomId(roomid);
			cuttoolConsumption.setReason(scrapReason);
			cuttoolConsumption.setPerson(person);

			if (equipmentNo != null && !"".equals(equipmentNo)){

				String equHql = "select cme.mechanicalId from CMechanicalEquipment cme where cme.equipmentName='" + equipmentNo + "'";
				cuttoolConsumption.setEquipmentId((Integer) dao.executeQuery(equHql).get(0));

			}
			dao.add(cuttoolConsumption);

			//----------------添加物料事务处理记录------------------
			CMaterialAffairsHandle materialAffairsHandle = new CMaterialAffairsHandle();
			    /*设置物料事务处理编号*/
			materialAffairsHandle.setTransactionManagerNo(Integer.parseInt(json.getString("scrap_taskNo")));
				/*设置来源类型*/
			materialAffairsHandle.setSourceType("归还-报废");
				/*设置来源*/
			materialAffairsHandle.setSource(json.getString("scrap_taskNo") + "-" + json.getString("scrap_rowNo"));
				/*事务处理类型*/
			materialAffairsHandle.setTransactionManagerType("报废出库");
				/*事务处理活动*/
			materialAffairsHandle.setTransactionManagerActivity(json.getString("person"));
				/*事务处理单位*/
			materialAffairsHandle.setTransactionManagerCompany("个");
				/*事务处理数量*/
			materialAffairsHandle.setTotalTransactionManager(scrapNum);
				/*库房表实体类*/
			CStorageRoomDefinition storageRoomDefinition = new CStorageRoomDefinition();
			storageRoomDefinition.setStorageRoomId(roomid);
				/*库房id*/
			materialAffairsHandle.setCStorageRoomDefinition(storageRoomDefinition);
				/*物料实体类*/
			CGeneralMaterial generalMaterial = new CGeneralMaterial();
			generalMaterial.setMaterialId(materialId);
				/*物料id设置*/
			materialAffairsHandle.setCGeneralMaterial(generalMaterial);
				/*新建者*/
			materialAffairsHandle.setCreatePerson("admin");
				/*新建时间*/
			materialAffairsHandle.setCreateTime(createTime.valueOf(date));
				/*是否打印*/
			materialAffairsHandle.setStamp("否");
			dao.add(materialAffairsHandle);
			//如果换取数量不为空，则增加借用信息
			String changeNum = json.getString("scrapChangeNum");

			if (!"".equals(changeNum)){

				if ("".equals(goodsAllocationNo) || goodsAllocationNo == null){

					String           hql         = "from CStockList c where c.id.stockId=" + roomid + " and c.id.materialId=" + materialId;
					List<CStockList> StockLists2 = new ArrayList<CStockList>();
					CStockList       stock2      = new CStockList();
					StockLists2 = dao.executeQuery(hql);
					stock2 = StockLists2.get(0);
					Float borrowNum = stock2.getBorrowNumber();
					Float aviNum    = stock2.getAvailableQuantity();
					stock2.setBorrowNumber(borrowNum + Float.parseFloat(changeNum));
					stock2.setAvailableQuantity(aviNum - Float.parseFloat(changeNum));
					dao.saveOrUpdate(stock2);

				} else{

					String hql = "from CStockDetailList c where c.id.stockId=" + roomid + " and c.id.materialId=" + materialId + " and c" +
							".goodsAllocationId=" +
							goodsAllocationID;
					List<CStockDetailList> stockDetailLists2 = new ArrayList<CStockDetailList>();
					CStockDetailList       stockDetail2      = new CStockDetailList();
					stockDetailLists2 = dao.executeQuery(hql);
					stockDetail2 = stockDetailLists2.get(0);
					Float borrowNum = stockDetail2.getBorrowNumber();
					Float aviNum    = stockDetail2.getAvailableQuantity();
					stockDetail2.setBorrowNumber(borrowNum + Float.parseFloat(changeNum));
					stockDetail2.setAvailableQuantity(aviNum - Float.parseFloat(changeNum));
					dao.saveOrUpdate(stockDetail2);

				}

				//库存数量更新

				//----------------添加物料事务处理记录------------------
				CMaterialAffairsHandle materialAffairsHandle2 = new CMaterialAffairsHandle();
				/*设置物料事务处理编号*/
				materialAffairsHandle2.setTransactionManagerNo(Integer.parseInt(json.getString("scrap_taskNo")));
				/*设置来源类型*/
				materialAffairsHandle2.setSourceType("借用-归还");
				/*设置来源*/
				materialAffairsHandle2.setSource(json.getString("scrap_taskNo") + "-" + json.getString("scrap_rowNo"));
				/*事务处理类型*/
				materialAffairsHandle2.setTransactionManagerType("借用出库");
				/*事务处理活动*/
				materialAffairsHandle2.setTransactionManagerActivity(json.getString("person"));
				/*事务处理单位*/
				materialAffairsHandle2.setTransactionManagerCompany("个");
				/*事务处理数量*/
				materialAffairsHandle2.setTotalTransactionManager(Float.parseFloat(json.getString("scrapChangeNum")));
				/*库房表实体类*/
				CStorageRoomDefinition storageRoomDefinition2 = new CStorageRoomDefinition();
				storageRoomDefinition2.setStorageRoomId(roomid);
				/*库房id*/
				materialAffairsHandle2.setCStorageRoomDefinition(storageRoomDefinition);
				/*物料实体类*/
				CGeneralMaterial generalMaterial2 = new CGeneralMaterial();
				generalMaterial2.setMaterialId(materialId);
				/*物料id设置*/
				materialAffairsHandle2.setCGeneralMaterial(generalMaterial);
				/*新建者*/
				materialAffairsHandle2.setCreatePerson("admin");
				/*新建时间*/
				materialAffairsHandle2.setCreateTime(createTime.valueOf(date));
				/*是否打印*/
				materialAffairsHandle2.setStamp("否");
				dao.add(materialAffairsHandle2);

			}

			/**
			 * changed by SunJun 2016/8/8
			 */
			/*附件寿命计算 如果是整体刀具*/
			if (json.getBoolean("totalcuttoolborrow")){

			}

			result.append("result", "true");
			return result.toString();

		} catch (Exception e){

			e.printStackTrace();
			result.append("result", "false");
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			return result.toString();

		}
	}

	@Override
	public String isTotalScrap(String uploadJson){

		JSONObject          result           = new JSONObject();
		JSONObject          json             = new JSONObject(uploadJson);
		String              taskNo           = json.getString("taskNo");
		List<CBorrowReturn> borrowReturnList = new ArrayList<CBorrowReturn>();
		int                 scrapLine        = 0;
		String              hql              = "from CBorrowReturn cbr where cbr.CCuttoolBorrowTitle.borrowNo='" + taskNo + "'";
		borrowReturnList = dao.executeQuery(hql);
		for (int i = 0; i < borrowReturnList.size(); i++){

			CBorrowReturn borrowReturn = new CBorrowReturn();
			borrowReturn = borrowReturnList.get(i);
			Float borrowNum = 0f;
			Float returnNum = 0f;
			Float scrapNum  = 0f;

			if (borrowReturn.getBorrowNumber() != null){

				borrowNum = borrowReturn.getBorrowNumber();

			}
			if (borrowReturn.getReturnNumber() != null){

				returnNum = borrowReturn.getReturnNumber();

			}
			if (borrowReturn.getScrapNumber() != null){

				scrapNum = borrowReturn.getScrapNumber();

			}

			Float lastNum = borrowNum - returnNum - scrapNum;

			if (lastNum == 0){

				scrapLine++;

			}
		}
		//整体都报废了改变刀具状态
		if (scrapLine == borrowReturnList.size()){

			String                 cuttoolNo           = json.getString("cuttoolNo");
			List<CCuttoolBasedata> cuttoolBasedataList = new ArrayList<CCuttoolBasedata>();
			CCuttoolBasedata       cuttoolBasedata     = new CCuttoolBasedata();
			String                 hql2                = "from CCuttoolBasedata ccb where ccb.cuttoolNo='" + cuttoolNo + "'";
			cuttoolBasedataList = dao.executeQuery(hql2);
			cuttoolBasedata = cuttoolBasedataList.get(0);
			cuttoolBasedata.setIsScrap(1);
			cuttoolBasedata.setUsingStatus(1);
			dao.saveOrUpdate(cuttoolBasedata);
			result.append("result", "true");
			return result.toString();

		} else{

			result.append("result", "false");
			return result.toString();

		}

	}
}
