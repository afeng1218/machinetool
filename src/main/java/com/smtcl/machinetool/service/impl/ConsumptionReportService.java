package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCuttoolConsumption;
import com.smtcl.machinetool.models.machinetool.CGeneralMaterial;
import com.smtcl.machinetool.models.machinetool.CParameterModel;
import com.smtcl.machinetool.models.machinetool.ConsumptionReportModel;
import com.smtcl.machinetool.service.IConsumptionReportService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by GuoFeng on 2016/7/11.
 */
@Service
public class ConsumptionReportService implements IConsumptionReportService {

    @Autowired
    private IGenericDAO dao;

    @Override
    public List blurSearch(String json) {

        List<ConsumptionReportModel> consumptionReportModels = new ArrayList<ConsumptionReportModel>();
        List<CCuttoolConsumption> consumptionList = new ArrayList<CCuttoolConsumption>();
        List<CGeneralMaterial> materialList = new ArrayList<CGeneralMaterial>();
        JSONObject jsonObject = new JSONObject(json);
        String consump_type = jsonObject.getString("consump_type");
        String mType = jsonObject.getString("mType");
        String productLine = jsonObject.getString("productLine");
        String person = jsonObject.getString("person");
        String storeroom = jsonObject.getString("storeroom");
        String roomID = jsonObject.getString("roomID");
        String consumptionResource = jsonObject.getString("consumptionResource");
        String beginDate = jsonObject.getString("beginDate");
        String endDate = jsonObject.getString("endDate");
        String beginDate2 = jsonObject.getString("beginDate2");
        String endDate2 = jsonObject.getString("endDate2");
        String hql = "from CCuttoolConsumption ccc where 1=1";
        if (!"".equals(consump_type)) {
            hql += " and ccc.type like '" + consump_type + "%'";
        }
        /*if (!"".equals(mType)){
            hql += " and ccc.mType like '" + mType + "%'";
        }*/
        if (!"".equals(productLine)) {
            hql += " and ccc.productionLine like '" + productLine + "%'";
        }
        if (!"".equals(person)) {
            hql += " and ccc.createPerson like '" + person + "%'";
        }
        if (!"".equals(roomID)) {
            hql += " and ccc.storageRoomId = " + roomID;
        } else {
            if (!"".equals(storeroom)) {
                int roomid = (Integer) dao.executeQuery("select csrd.storageRoomId from CStorageRoomDefinition csrd where csrd.storageRoomNo='" + storeroom + "'").get(0);
                hql += " and ccc.storageRoomId like '" + roomid + "%'";
            }
        }
        if (!"".equals(consumptionResource)) {
            hql += " and ccc.source like '" + consumptionResource + "%'";
        }
        if (beginDate.equals("") && !endDate.equals("")) {

            hql += " and DATE_FORMAT(ccc.createTime,'%Y%m%d')<=DATE_FORMAT('" + endDate + " 00:00:00','%Y%m%d')";
        } else if (!beginDate.equals("") && endDate.equals("")) {

            hql += " and DATE_FORMAT(ccc.createTime,'%Y%m%d')>=DATE_FORMAT('" + beginDate + " 00:00:00','%Y%m%d')";
        } else if (!beginDate.equals("") && !endDate.equals("")) {

            hql += " and DATE_FORMAT(ccc.createTime,'%Y%m%d') between DATE_FORMAT('" + beginDate + " 00:00:00','%Y%m%d') " +
                    " and DATE_FORMAT('" + endDate + " 00:00:00','%Y%m%d')";
        }

        consumptionList = dao.executeQuery(hql);
        if (consumptionList.size() > 0) {
            for (int i = 0; i < consumptionList.size(); i++) {
                ConsumptionReportModel model = new ConsumptionReportModel();
                CCuttoolConsumption consumption = new CCuttoolConsumption();
                CGeneralMaterial material = new CGeneralMaterial();
                consumption = consumptionList.get(i);
                model.setSource(consumption.getSource());
                model.setSourceRow(consumption.getSourceRow());

                int mid = consumption.getMaterialId();

                String mhql = "from CGeneralMaterial cgm where cgm.materialId=" + mid;
                materialList = dao.executeQuery(mhql);
                material = materialList.get(0);

                List<CParameterModel> CPList = dao.executeQuery("from CParameterModel cpm " +
                        " where cpm.category=" + material.getMaterialClass() + "'");

                model.setMaterialNo(material.getMaterialNo());
                model.setMaterialDescription(material.getMaterialDescribe());
                model.setMaterialType(CPList.get(0).getTypeName());
                model.setNumber(consumption.getNumber());
                String mpriceHql = "";
                model.setUnitPrice(0d);
                model.setSum(0d);
                String roomHql = "select csrd.storageRoomNo from CStorageRoomDefinition csrd where csrd.storageRoomId=" + consumption.getStorageRoomId();
                model.setStorageRoom(dao.executeQuery(roomHql).get(0).toString());
                model.setPerson(consumption.getPerson());
                model.setAffairTime(consumption.getCreateTime());
                model.setType(consumption.getType());
                if (consumption.getEquipmentId() != null) {
                    String equHql = "select cme.equipmentName from CMechanicalEquipment cme where cme.mechanicalId=" + consumption.getEquipmentId();
                    model.setThatEquipement(dao.executeQuery(equHql).get(0).toString());
                }
                model.setThatWorkshop("");
                model.setThatWorkshopSection("");
                model.setThatTeam("");
                model.setDefaultEquipement("");
                model.setDefaultWorkshop("");
                model.setDefaultWorkshopSection("");
                model.setDefaultTeam("");
                model.setProductionLine("");
                consumptionReportModels.add(model);
            }
            return consumptionReportModels;
        } else {
            return null;
        }
    }
}
