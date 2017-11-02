package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCargoSpaceDefinition;
import com.smtcl.machinetool.models.machinetool.CStorageRoomDefinition;
import com.smtcl.machinetool.models.machinetool.CUnit;
import com.smtcl.machinetool.service.IStorageLocationDefinitionService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by SunJun on 2016/3/7. 库位定义service
 */
@Service
public class StorageLocationDefinitionService implements IStorageLocationDefinitionService{

	@Autowired
	IGenericDAO dao;

	@Override
	public List init(){

		String hql = "from CStorageRoomDefinition";
		return dao.executeQuery(hql);
	}

	@Override
	public List storageLocationSearch(String storageRoomNo, String storageLocationNo, String storageLocationDescription){

		String hql = "from CCargoSpaceDefinition ";

		if (!storageRoomNo.equals("") && !storageLocationNo.equals("") && !storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' and ccsd.cargoSpaceNo='" +
					storageLocationNo + "' and ccsd.cargoSpaceExplain like '" + storageLocationDescription + "' ";
		}
		if (storageRoomNo.equals("") && !storageLocationNo.equals("") && !storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.cargoSpaceNo='" + storageLocationNo + "' and ccsd.cargoSpaceExplain like '" + storageLocationDescription + "' ";
		}
		if (!storageRoomNo.equals("") && storageLocationNo.equals("") && !storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' and ccsd.cargoSpaceExplain like '" +
					storageLocationDescription + "' ";
		}
		if (!storageRoomNo.equals("") && !storageLocationNo.equals("") && storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' and ccsd.cargoSpaceNo='" +
					storageLocationNo + "' ";
		}
		if (storageRoomNo.equals("") && storageLocationNo.equals("") && !storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.cargoSpaceExplain like '" + storageLocationDescription + "' ";
		}
		if (!storageRoomNo.equals("") && storageLocationNo.equals("") && storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.CStorageRoomDefinition.storageRoomNo='" + storageRoomNo + "' ";
		}
		if (storageRoomNo.equals("") && !storageLocationNo.equals("") && storageLocationDescription.equals("")){

			hql += "ccsd where ccsd.cargoSpaceNo = '" + storageLocationNo + "' ";
		}
		return dao.executeQuery(hql);
	}

	@Override
	public List getUnit(){

		String hql = "from CUnit";
		return dao.executeQuery(hql);
	}

	@Override
	public List getAllStorage(){

		return dao.executeQuery("from CStorageRoomDefinition");
	}

	@Override
	public String storageLocationUpload(String upload){

		JSONObject result        = new JSONObject();
		JSONArray  uploadValue   = new JSONArray(upload);
		JSONArray  updateStorage = uploadValue.getJSONObject(0).getJSONArray("update");//update 库位数据
		JSONArray  deleteStorage = uploadValue.getJSONObject(0).getJSONArray("delete");//delete库位数据

		try{

			for (int i = 0; i < updateStorage.length(); i++){

				CCargoSpaceDefinition cCargoSpaceDefinition = new CCargoSpaceDefinition();
				JSONObject            jsonObject            = updateStorage.getJSONObject(i);
				System.out.println("jsonObject="+jsonObject);
				cCargoSpaceDefinition.setCargoSpaceNo(jsonObject.getString("cargoSpaceNo"));
				cCargoSpaceDefinition.setCargoSpaceExplain(jsonObject.getString("cargoSpaceExplain"));

				CStorageRoomDefinition cStorageRoomDefinition = new CStorageRoomDefinition();
				cStorageRoomDefinition.setStorageRoomId(jsonObject.getInt("storage"));
				cCargoSpaceDefinition.setCStorageRoomDefinition(cStorageRoomDefinition);
				cCargoSpaceDefinition.setCargoSpaceState(jsonObject.getString("state"));

				String maxNum = jsonObject.getString("maxNum");
				if (maxNum != null && !maxNum.equals("")){

					cCargoSpaceDefinition.setMaxNumber(Float.parseFloat(maxNum));
				}

				CUnit cQuantityUnit = new CUnit();
				cQuantityUnit.setUnitNo(jsonObject.getInt("quantityUnit"));
				cCargoSpaceDefinition.setCUnitByQuantityUnit(cQuantityUnit);

				String volumeSize = jsonObject.getString("volumeSize");
				if (volumeSize != null && !volumeSize.equals("")){

					cCargoSpaceDefinition.setVolumeSize(Float.parseFloat(volumeSize));
				}
				CUnit cVolumeSizeUnit = new CUnit();
				cVolumeSizeUnit.setUnitNo(jsonObject.getInt("volumeSizeUnit"));
				cCargoSpaceDefinition.setCUnitByVolumeUnit(cVolumeSizeUnit);

				String weight = jsonObject.getString("weight");
				if (weight != null && !weight.equals("")){

					cCargoSpaceDefinition.setWeight(Float.parseFloat(weight));
				}
				CUnit cWeightUnit = new CUnit();
				cWeightUnit.setUnitNo(jsonObject.getInt("weightUnit"));
				cCargoSpaceDefinition.setCUnitByWeightUnit(cWeightUnit);

				String dimension = jsonObject.getString("dimension");
				if (dimension != null && !dimension.equals("")){

					cCargoSpaceDefinition.setDimension(Float.parseFloat(dimension));
				}
				CUnit cDimensionUnit = new CUnit();
				cDimensionUnit.setUnitNo(jsonObject.getInt("dimensionUnit"));
				cCargoSpaceDefinition.setCUnitByDimensionUnit(cDimensionUnit);

				cCargoSpaceDefinition.setCoordinate(jsonObject.getString("coordinate"));

				if (!jsonObject.get("cargoSpaceId").equals("null")){

					Integer cargoSpaceId = Integer.parseInt(jsonObject.get("cargoSpaceId").toString());
					cCargoSpaceDefinition.setCargoSpaceId(cargoSpaceId);

					dao.saveOrUpdate(cCargoSpaceDefinition);
				} else{

					dao.add(cCargoSpaceDefinition);
				}

			}
			for (int i = 0; i < deleteStorage.length(); i++){

				CCargoSpaceDefinition cCargoSpaceDefinition = new CCargoSpaceDefinition();
				JSONObject            jsonObject            = deleteStorage.getJSONObject(i);
				cCargoSpaceDefinition.setCargoSpaceId(jsonObject.getInt("cargoSpaceId"));
				dao.delete(cCargoSpaceDefinition);

			}

			result.append("result", "SUCCESS");
			return result.toString();

		} catch (Exception e){

			e.printStackTrace();
			result.append("result", "FALSE");
			return result.toString();
		}

	}

	@Override
	public Object storageLocationNoSearch(String storageLocationNo){

		JSONObject result = new JSONObject();

		List searchNo = dao.executeQuery("select csrd.cargoSpaceId " +
				" from CCargoSpaceDefinition csrd " +
				" where csrd.cargoSpaceNo='" + storageLocationNo + "'");

		if (searchNo.size() > 0 && searchNo.get(0) != null){

			result.append("result", "true");
			return result.toString();

		} else{

			result.append("result", "false");
			return result.toString();
		}
	}

	@Override
	public Object storageLocation(String storageId){

		List list = dao.executeQuery("select new Map(ccsd.cargoSpaceNo as cargoSpaceNo,ccsd.cargoSpaceExplain as cargoSpaceExplain) " +
				" from CCargoSpaceDefinition ccsd " +
				" where ccsd.CStorageRoomDefinition.storageRoomId='" + storageId + "'");
		return list;
	}
}
