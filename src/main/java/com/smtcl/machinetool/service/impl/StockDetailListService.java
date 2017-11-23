package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/4/19.
 */
@Service
public class StockDetailListService implements IStockDetailListService{

	@Autowired
	IGenericDAO dao;

	@Override
	public String availableNum(String roomNo, String roomplace, String materialNo, String use_status, String borrowNum){

		//查询库房ID
		String                       hql1     = "from CStorageRoomDefinition room where room.storageRoomNo='" + roomNo + "'";
		List<CStorageRoomDefinition> roomlist = new ArrayList<CStorageRoomDefinition>();
		CStorageRoomDefinition       room     = new CStorageRoomDefinition();
		roomlist = dao.executeQuery(hql1);
		room = roomlist.get(0);
		int stockid = room.getStorageRoomId();

		if ("".equals(roomplace) || roomplace == null){

			//查询物料ID
			String                 hql3         = "from CGeneralMaterial m where m.materialNo='" + materialNo + "'";
			List<CGeneralMaterial> materiallist = new ArrayList<CGeneralMaterial>();
			CGeneralMaterial       material     = new CGeneralMaterial();
			materiallist = dao.executeQuery(hql3);
			material = materiallist.get(0);
			int mid = material.getMaterialId();
			//查询现有量
			String hql = "from CStockList c where c.id.stockId=" + stockid + " and c.id.materialId=" + mid;

			List<CStockList> stockLists = new ArrayList<CStockList>();
			CStockList       stock      = new CStockList();
			stockLists = dao.executeQuery(hql);
			if (stockLists.size() == 0){

				return "0";//无该物料

			} else{

				stock = stockLists.get(0);
				Float aviNum   = stock.getAvailableQuantity();
				Float bluntNum = stock.getBluntGoodsNum();
				System.out.print(aviNum - Float.parseFloat(borrowNum));

				if ("新".equals(use_status)){

					if (aviNum - Float.parseFloat(borrowNum) >= 0){

						return "2";//可借

					} else{

						return "1";//库存不足

					}

				} else{

					if (bluntNum - Float.parseFloat(borrowNum) >= 0){

						return "2";//可借

					} else{

						return "1";//库存不足

					}

				}
			}

		} else{

			//查询库位ID
			String  hql2  = "";
//			boolean isNum = roomplace.matches("[0-9]+");
//			if (isNum){
//
//				hql2 = "from CCargoSpaceDefinition place where place.cargoSpaceId='" + roomplace + "'";
//
//			} else{

				hql2 = "from CCargoSpaceDefinition place where place.cargoSpaceNo='" + roomplace + "'";

//			}
			List<CCargoSpaceDefinition> placelist = new ArrayList<CCargoSpaceDefinition>();
			CCargoSpaceDefinition       place     = new CCargoSpaceDefinition();
			placelist = dao.executeQuery(hql2);
			if (placelist.size() == 0){

				return "3";//无该库位

			}
			place = placelist.get(0);

//			int goods_allocation_id = place.getCargoSpaceId();

			//查询物料ID
			String                 hql3         = "from CGeneralMaterial m where m.materialNo='" + materialNo + "'";
			List<CGeneralMaterial> materiallist = new ArrayList<CGeneralMaterial>();
			CGeneralMaterial       material     = new CGeneralMaterial();
			materiallist = dao.executeQuery(hql3);
			material = materiallist.get(0);
			int mid = material.getMaterialId();

			//查询现有量
			String hql = "from CStockDetailList c " +
					" where c.id.stockId='" + stockid + "' " +
					" and c.id.materialId='" + mid + "' " +
					" and c.id.goodsAllocationNo='" + roomplace + "'";

			List<CStockDetailList> stockDetailLists = new ArrayList<CStockDetailList>();
			CStockDetailList       stockDetail      = new CStockDetailList();
			stockDetailLists = dao.executeQuery(hql);
			if (stockDetailLists.size() == 0){

				return "0";//无该物料

			} else{

				stockDetail = stockDetailLists.get(0);
				Float aviNum   = stockDetail.getAvailableQuantity();
				Float bluntNum = stockDetail.getBluntGoodsNum();
				System.out.print(aviNum - Float.parseFloat(borrowNum));

				if ("新".equals(use_status)){

					if (aviNum - Float.parseFloat(borrowNum) >= 0){

						return "2";//可借

					} else{

						return "1";//库存不足

					}

				} else{

					if (bluntNum - Float.parseFloat(borrowNum) >= 0){

						return "2";//可借

					} else{

						return "1";//库存不足

					}
				}
			}
		}

	}

	@Override
	public String materialNum(String roomNo, String materialNO, String use_status){
		//查询库房ID
		String                       hql1     = "from CStorageRoomDefinition room where room.storageRoomNo='" + roomNo + "'";
		List<CStorageRoomDefinition> roomlist = new ArrayList<CStorageRoomDefinition>();
		CStorageRoomDefinition       room     = new CStorageRoomDefinition();
		roomlist = dao.executeQuery(hql1);
		room = roomlist.get(0);
		int stockid = room.getStorageRoomId();
		//查询物料ID
		String                 hql3         = "from CGeneralMaterial m where m.materialNo='" + materialNO + "'";
		List<CGeneralMaterial> materiallist = new ArrayList<CGeneralMaterial>();
		CGeneralMaterial       material     = new CGeneralMaterial();
		materiallist = dao.executeQuery(hql3);
		material = materiallist.get(0);
		int mid = material.getMaterialId();
		//查询现有量
		String           hql        = "from CStockList c where c.id.stockId=" + stockid + " and c.id.materialId=" + mid;
		List<CStockList> stockLists = new ArrayList<CStockList>();
		CStockList       stock      = new CStockList();
		stockLists = dao.executeQuery(hql);
		if (stockLists.size() == 0){
			return "0"; //无该物料
		} else{
			stock = stockLists.get(0);
			Float aviNum   = stock.getAvailableQuantity();
			Float bluntNum = stock.getBluntGoodsNum();
			return aviNum.toString();
		}
	}
}
