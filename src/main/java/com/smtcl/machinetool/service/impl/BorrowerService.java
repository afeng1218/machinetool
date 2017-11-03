package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CBorrower;
import com.smtcl.machinetool.models.machinetool.CMechanicalEquipment;
import com.smtcl.machinetool.service.IBorrowerService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by GuoFeng on 2016/7/4.
 */
@Service
public class BorrowerService implements IBorrowerService{

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	@Autowired
	private IGenericDAO dao;

	@Override
	public String saveBorrower(String uploadJson){

		JSONObject resObject = new JSONObject();
		JSONObject json      = new JSONObject(uploadJson);
		//        String                 employeeCardNo             = json.get("employeeCardNo").toString();
		String employeeCardNo  = json.getString("employeeCardNo");
		String workshop        = json.getString("workshop");
		String borrowedName    = json.getString("borrowedName");
		String workshopSection = json.getString("workshopSection");
		String team            = json.getString("team");
		String productionLine  = json.getString("productionLine");
		String equipmentName   = json.getString("equipmentName");
		String classification  = json.getString("classification");
		String organization    = json.getString("organization");
		String createPerson    = json.getString("createPerson");
		//System.out.println(employeeCardNo+"-"+workshop+"-"+borrowedName+"-"+workshopSection+"-"+team+"-"+productionLine+"-"+equipmentName
		// +"-"+classification);
		try{
			CBorrower borrower = new CBorrower();
			borrower.setEmployeeCardNo(employeeCardNo);
			String    date       = sdf.format(new Date());
			Timestamp createTime = null;
			borrower.setCreateTime(createTime.valueOf(date));
			borrower.setCreatePerson(createPerson);
			borrower.setWorkshop(workshop);
			borrower.setBorrowedName(borrowedName);
			borrower.setWorkshopSection(workshopSection);
			borrower.setTeam(team);
			borrower.setProductionLine(productionLine);
			borrower.setOrganization(organization);
			borrower.setInvalid(0);
			CMechanicalEquipment       equipment     = new CMechanicalEquipment();
			List<CMechanicalEquipment> equipmentList = new ArrayList<CMechanicalEquipment>();
			String                     hql           = "select cme.mechanicalId from CMechanicalEquipment cme where cme.equipmentName='" +
                    equipmentName + "'";
			equipmentList = dao.executeQuery(hql);
			if (equipmentList.size() <= 0){

			} else{
				int eid = (Integer) dao.executeQuery(hql).get(0);
				equipment.setMechanicalId(eid);
				borrower.setCMechanicalEquipment(equipment);
			}
			borrower.setClassification(classification);
			dao.add(borrower);
			resObject.append("res", "success");
			return resObject.toString();
		} catch (Exception e){
			e.printStackTrace();
			resObject.append("res", "fail");
			return resObject.toString();
		}
	}

	@Override
	public List blurSearch(String json){

		JSONObject jsonObject = new JSONObject(json);
		//        String                 employeeCardNo             = json.get("employeeCardNo").toString();
		String employeeCardNo  = jsonObject.getString("employeeCardNo");
		String workshop        = jsonObject.getString("workshop");
		String borrowedName    = jsonObject.getString("borrowedName");
		String workshopSection = jsonObject.getString("workshopSection");
		String team            = jsonObject.getString("team");
		String productionLine  = jsonObject.getString("productionLine");
		String equipmentName   = jsonObject.getString("equipmentName");
		String classification  = jsonObject.getString("classification");
		String organization    = jsonObject.getString("organization");
		String hql             = "from CBorrower cb where 1=1";
		if (!"".equals(employeeCardNo)){
			hql += " and cb.employeeCardNo like '" + employeeCardNo + "%'";
		}
		if (!"".equals(workshop)){
			hql += " and cb.workshop like '" + workshop + "%'";
		}
		if (!"".equals(borrowedName)){
			hql += " and cb.borrowedName like '" + borrowedName + "%'";
		}
		if (!"".equals(workshopSection)){
			hql += " and cb.workshopSection like '" + workshopSection + "%'";
		}
		if (!"".equals(team)){
			hql += " and cb.team like '" + team + "%'";
		}
		if (!"".equals(productionLine)){
			hql += " and cb.productionLine like '" + productionLine + "%'";
		}
        /*if (!"".equals(equipmentName)){
            hql += " and cb.CMechanicalEquipment.equipmentName like '" + equipmentName + "%'";
        }*/
		if (!"".equals(classification)){
			hql += " and cb.classification like '" + classification + "%'";
		}
		if (!"".equals(organization)){
			hql += " and cb.organization like '" + organization + "%'";
		}
		return dao.executeQuery(hql);
	}

	@Override
	public String searchByBno(String employeeCardNo){

		JSONObject      jsonObject = new JSONObject();
		List<CBorrower> list       = new ArrayList<CBorrower>();
		String          hql        = "from CBorrower cb where cb.employeeCardNo ='" + employeeCardNo + "'";

		list = dao.executeQuery(hql);
		if (list.size() > 0){
			jsonObject.append("res", "yes");
			return jsonObject.toString();
		} else{
			jsonObject.append("res", "no");
			return jsonObject.toString();
		}
	}

	@Override
	public String updateBorrower(String uploadJson){

		JSONObject      resObject      = new JSONObject();
		JSONObject      json           = new JSONObject(uploadJson);
		List<CBorrower> list           = new ArrayList<CBorrower>();
		CBorrower       borrowerModel  = new CBorrower();
		String          employeeCardNo = json.getString("employeeCardNo");
		String          hql            = "from CBorrower cb where cb.employeeCardNo ='" + employeeCardNo + "'";
		list = dao.executeQuery(hql);
		borrowerModel = list.get(0);
		String workshop        = json.getString("workshop");
		String borrowedName    = json.getString("borrowedName");
		String workshopSection = json.getString("workshopSection");
		String team            = json.getString("team");
		String productionLine  = json.getString("productionLine");
		String equipmentName   = json.getString("equipmentName");
		String classification  = json.getString("classification");
		String organization    = json.getString("organization");
		String updatePerson    = json.getString("updatePerson");
		try{
			String    date       = sdf.format(new Date());
			Timestamp createTime = null;
			borrowerModel.setCreateTime(borrowerModel.getCreateTime());
			borrowerModel.setUpdateTime(createTime.valueOf(date));
			borrowerModel.setUpdatePerson(updatePerson);
			borrowerModel.setEmployeeCardNo(employeeCardNo);
			borrowerModel.setWorkshop(workshop);
			borrowerModel.setBorrowedName(borrowedName);
			borrowerModel.setWorkshopSection(workshopSection);
			borrowerModel.setTeam(team);
			borrowerModel.setProductionLine(productionLine);
			CMechanicalEquipment       equipment     = new CMechanicalEquipment();
			List<CMechanicalEquipment> equipmentList = new ArrayList<CMechanicalEquipment>();
			String                     hql2          = "select cme.mechanicalId from CMechanicalEquipment cme where cme.equipmentName='" +
                    equipmentName + "'";
			equipmentList = dao.executeQuery(hql2);
			if (equipmentList.size() <= 0){

			} else{
				int eid = (Integer) dao.executeQuery(hql2).get(0);
				equipment.setMechanicalId(eid);
				borrowerModel.setCMechanicalEquipment(equipment);
			}
			borrowerModel.setClassification(classification);
			borrowerModel.setOrganization(organization);
			dao.saveOrUpdate(borrowerModel);
			resObject.append("res", "success");
			return resObject.toString();
		} catch (Exception e){
			e.printStackTrace();
			resObject.append("res", "fail");
			return resObject.toString();
		}
	}
}
