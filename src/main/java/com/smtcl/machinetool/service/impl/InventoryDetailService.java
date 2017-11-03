package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.service.IInventoryDetailService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by GuoFeng on 2016/3/8.
 */
@Service
public class InventoryDetailService implements IInventoryDetailService{

	@Autowired
	IGenericDAO dao;

	@Override
	public List getInventory(String request){

		JSONObject jsonObject = new JSONObject(request);
		List       result     = new ArrayList();

		String sql = "select  cgm.material_no as materialNo,cgm.material_describe as materialDescribe," +
				" csrd.storage_room_no as storageRoomNo,csl.available_quantity as availableQuantity," +
				" csl.blunt_goods_num as bluntGoodsNum,csl.borrow_number as borrowNumber " +
				" from c_stock_list csl left join c_general_material cgm  on csl.material_id=cgm.material_id " +
				" left join c_storage_room_definition csrd on csl.stock_id=csrd.storage_room_id ";

		String materialVersion = jsonObject.getString("materialVersion");
		if (materialVersion.indexOf("%") != -1 && materialVersion.length() == 1){

			sql += " where csrd.storage_room_no like '" + jsonObject.getString("storageNo") + "' " +
					" and (cgm.material_no like '" + jsonObject.getString("materialNo") + "' " +
					" or  cgm.material_describe like '" + jsonObject.getString("materialExplain") + "') " +
					" and cgm.state like '" + jsonObject.getString("state") + "' ";
		} else{

			sql += " left join c_material_version cmv on cgm.material_id=cmv.material_id " +
					" where csrd.storage_room_no like '" + jsonObject.getString("storageNo") + "'" +
					" and cmv.version_explain like '" + jsonObject.getString("materialVersion") + "' " +
					" and (cgm.material_no like '" + jsonObject.getString("materialNo") + "' " +
					" or  cgm.material_describe like '" + jsonObject.getString("materialExplain") + "') " +
					" and cgm.state like '" + jsonObject.getString("state") + "' ";
		}

		String sqlDetail = "select cgm.material_no as materialNo,cgm.material_describe as materialDescribe," +
				"csdl.version_exception as versionException,csrd.storage_room_no as storageRoomNo,csdl.goods_allocation_no as cargoSpaceNo," +
				"cgm.material_unit as materialUnit,csdl.available_quantity as availableQuantity," +
				"csdl.batch_no as batchNo,csdl.sequence_no as sequenceNo " +
				" from c_stock_detail_list csdl left join c_general_material cgm on csdl.material_id=cgm.material_id " +
				" left join c_storage_room_definition csrd on csdl.stock_id=csrd.storage_room_id " +
				" where csrd.storage_room_no like '" + jsonObject.getString("storageNo") + "' " +
				" and csdl.goods_allocation_no like '" + jsonObject.getString("storageLocationNo") + "' " +
				" and (cgm.material_no like '" + jsonObject.getString("materialNo") + "' " +
				" or  cgm.material_describe like '" + jsonObject.getString("materialExplain") + "' ) " +
				" and csdl.version_exception like '" + jsonObject.getString("materialVersion") + "' " +
				" and cgm.state like '" + jsonObject.getString("state") + "' ";

		String batchBegin    = jsonObject.getString("batchBegin");
		String batchEnd      = jsonObject.getString("batchEnd");
		String sequenceBegin = jsonObject.getString("sequenceBegin");
		String sequenceEnd   = jsonObject.getString("sequenceEnd");
		if (batchBegin.equals("%") && !batchEnd.equals("%")){

			sqlDetail += " and csdl.batch_no<='" + batchEnd + "' ";

		} else if (!batchBegin.equals("%") && batchEnd.equals("%")){

			sqlDetail += " and csdl.batch_no>='" + batchBegin + "' ";

		} else if (!batchBegin.equals("%") && !batchEnd.equals("%")){

			sqlDetail += " and (csdl.batch_no between '" + batchBegin + "' and '" + batchEnd + "' ) ";

		}

		if (sequenceBegin.equals("%") && !sequenceEnd.equals("%")){

			sqlDetail += " and csdl.sequence_no<='" + sequenceEnd + "' ";

		} else if (!sequenceBegin.equals("%") && sequenceEnd.equals("%")){

			sqlDetail += " and csdl.sequence_no>='" + sequenceBegin + "' ";

		} else if (!sequenceBegin.equals("%") && !sequenceEnd.equals("%")){

			sqlDetail += " and (csdl.sequence_no between '" + sequenceBegin + "' and '" + sequenceEnd + "' ) ";

		}
		result.add(dao.createSQL(sql));
		result.add(dao.createSQL(sqlDetail));

		return result;
	}

	@Override
	public List getStorageLocation(String storageId){

		String hql = "";
		if (storageId.equals("") || storageId == null){

			hql = "from CCargoSpaceDefinition";

		} else{

			hql = "from CCargoSpaceDefinition ccsd where ccsd.CStorageRoomDefinition.storageRoomId='" + storageId + "'";

		}
		return dao.executeQuery(hql);
	}

	@Override
	public String searchMaterialVersion(String materialNo){

		String hql = "select cmv.id.materialVersionNo from CMaterialVersion cmv where cmv.CGeneralMaterial.materialNo='" + materialNo + "' and cmv" +
				".defaultVersionOrnot=1 ";
		JSONObject result = new JSONObject();
		List       list   = dao.executeQuery(hql);
		if (list.size() > 0){

			result.append("result", list.get(0));
			return result.toString();

		} else{

			result.append("result", "null");
			return result.toString();
		}
	}
}
