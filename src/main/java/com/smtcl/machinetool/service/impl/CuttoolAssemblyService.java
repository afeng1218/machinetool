package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.ICuttoolAssemblyService;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by CJS on 2016/2/22. TODO 刀具装配Service
 */
@Service
public class CuttoolAssemblyService implements ICuttoolAssemblyService{

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	private IGenericDAO dao;

	@Override
	public void save(CCuttoolAssembly cuttoolAssembly){

		dao.add(cuttoolAssembly);
	}

	@Override
	public void savewithmid(String json){

		JSONArray              jsonArray        = new JSONArray(json);
		List<CGeneralMaterial> generalMaterials = new ArrayList<CGeneralMaterial>();
		List<CCuttoolBasedata> cuttoolList      = new ArrayList<CCuttoolBasedata>();
		CCuttoolBasedata       cuttool          = new CCuttoolBasedata();
		CGeneralMaterial       generalMaterial  = new CGeneralMaterial();
		String                 CNO              = jsonArray.getJSONObject(0).get("cuttoolNo").toString();
		String                 fhql             = "from CCuttoolAssembly cca where cca.cuttoolNo ='" + CNO + "'";
		List<CCuttoolAssembly> alist            = new ArrayList<CCuttoolAssembly>();

		try{

			alist = dao.executeQuery(fhql);

			if (alist.size() > 0){

				for (int j = 0; j < alist.size(); j++){

					dao.delete(alist.get(j));
				}
			}
			if (!jsonArray.getJSONObject(0).has("delete")){

				for (int i = 0; i < jsonArray.length(); i++){

					CCuttoolAssembly c = new CCuttoolAssembly();

					String materialno = jsonArray.getJSONObject(i).get("materialno").toString();
					String hql        = "from CGeneralMaterial cgm where cgm.materialNo='" + materialno + "'";
					generalMaterials = dao.executeQuery(hql);
					generalMaterial = generalMaterials.get(0);
					c.setCGeneralMaterial(generalMaterial);
					String hql2 = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + jsonArray.getJSONObject(i).get("cuttoolNo").toString() + "'";
					cuttoolList = dao.executeQuery(hql2);

					cuttool = cuttoolList.get(0);

					c.setCuttoolId(cuttool.getCuttoolId());
					c.setCuttoolNo(jsonArray.getJSONObject(i).get("cuttoolNo").toString());
					c.setOrderNo(Integer.parseInt(jsonArray.getJSONObject(i).get("orderNo").toString()));
					c.setUnit(jsonArray.getJSONObject(i).get("unit").toString());
					c.setNumber(Integer.parseInt(jsonArray.getJSONObject(i).get("number").toString()));
					c.setChipCutting(Integer.parseInt(jsonArray.getJSONObject(i).get("chipCutting").toString()));
					c.setEasyConsume(Integer.parseInt(jsonArray.getJSONObject(i).get("easyConsume").toString()));
					c.setEncodingBody(Integer.parseInt(jsonArray.getJSONObject(i).get("encodingBody").toString()));
					c.setMaterialVersion(jsonArray.getJSONObject(i).get("brand").toString());
					String date = jsonArray.getJSONObject(i).get("date").toString();
					date += " 00:00:00";
					java.sql.Timestamp createTime = null;
					c.setDate(createTime.valueOf(date));

					dao.getCurrentSession().evict(cuttool);
					dao.saveOrUpdate(c);
				}
			}

		} catch (Exception e){

			e.printStackTrace();
			throw e;

		}

	}

	@Override
	public List<CAssemblyModel> searchBycno(String cuttoolNo){

		List<CCuttoolAssembly> list      = new ArrayList<CCuttoolAssembly>();
		List<CAssemblyModel>   modellist = new ArrayList<CAssemblyModel>();
		String                 hql       = "from CCuttoolAssembly cuttoolassmbly where cuttoolassmbly.cuttoolNo='" + cuttoolNo + "'";
		list = dao.executeQuery(hql);
		if (list.size() > 0){

			for (int i = 0; i < list.size(); i++){

				CCuttoolAssembly cuttoolAssembly = new CCuttoolAssembly();
				CAssemblyModel   cAssemblyModel  = new CAssemblyModel();
				cuttoolAssembly = list.get(i);
				cAssemblyModel.setNo(cuttoolAssembly.getOrderNo());
				cAssemblyModel.setMname(cuttoolAssembly.getCGeneralMaterial().getMaterialNo());

				if (cuttoolAssembly.getCGeneralMaterial().getRestrictedCargoSpace() == 0){

					List<CStockList> stockLists = new ArrayList<CStockList>();
					CStockList       stock      = new CStockList();
					String stockidhql = "from CStockList cs where cs.id.materialId=" + cuttoolAssembly.getCGeneralMaterial()
							.getMaterialId();
					stockLists = dao.executeQuery(stockidhql);
					if (stockLists.size() > 0){

						stock = stockLists.get(0);
						cAssemblyModel.setAvailableNum(stock.getAvailableQuantity());

					} else{

						cAssemblyModel.setAvailableNum(0f);
					}
				} else{

					List<CStockDetailList> detailLists = new ArrayList<CStockDetailList>();
					CStockDetailList       detail      = new CStockDetailList();
					String detailhql = "from CStockDetailList csd where csd.id.materialId=" + cuttoolAssembly.getCGeneralMaterial
							().getMaterialId();
					detailLists = dao.executeQuery(detailhql);

					if (detailLists.size() > 0){

						detail = detailLists.get(0);
						cAssemblyModel.setAvailableNum(detail.getAvailableQuantity());

					} else{

						cAssemblyModel.setAvailableNum(0f);
					}
				}

				cAssemblyModel.setMdes(cuttoolAssembly.getCGeneralMaterial().getMaterialDescribe());
				cAssemblyModel.setMnum(cuttoolAssembly.getNumber());
				cAssemblyModel.setUnit(cuttoolAssembly.getUnit());
				cAssemblyModel.setEasyConsume(cuttoolAssembly.getEasyConsume());
				cAssemblyModel.setChipCutting(cuttoolAssembly.getChipCutting());
				cAssemblyModel.setEncodingBody(cuttoolAssembly.getEncodingBody());
				cAssemblyModel.setBrand(cuttoolAssembly.getMaterialVersion());
				cAssemblyModel.setDate(cuttoolAssembly.getDate().toString().substring(0, 10));
				cAssemblyModel.setListnum(list.size());
				cAssemblyModel.setRestricted_cargo_space(cuttoolAssembly.getCGeneralMaterial().getRestrictedCargoSpace());
				modellist.add(cAssemblyModel);
			}

			return modellist;

		} else{

			return null;
		}
	}
}
