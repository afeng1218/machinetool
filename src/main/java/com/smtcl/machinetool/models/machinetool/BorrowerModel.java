package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;

/**
 * Created by CJS on 2016/7/4.
 */
public class BorrowerModel{

	private String    employeeCardNo;
	private String    equipmentName;
	private String    borrowedName;
	private String    password;
	private String    workshop;
	private String    workshopSection;
	private String    team;
	private String    productionLine;
	private String    usingEquipment;
	private Float     allowBorrowNumber;
	private Integer   invalid;
	private String    classification;
	private String    organization;
	private String    createPerson;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;

	public String getEmployeeCardNo(){

		return employeeCardNo;
	}

	public void setEmployeeCardNo(String employeeCardNo){

		this.employeeCardNo = employeeCardNo;
	}

	public String getBorrowedName(){

		return borrowedName;
	}

	public void setBorrowedName(String borrowedName){

		this.borrowedName = borrowedName;
	}

	public String getPassword(){

		return password;
	}

	public void setPassword(String password){

		this.password = password;
	}

	public String getWorkshop(){

		return workshop;
	}

	public void setWorkshop(String workshop){

		this.workshop = workshop;
	}

	public String getWorkshopSection(){

		return workshopSection;
	}

	public void setWorkshopSection(String workshopSection){

		this.workshopSection = workshopSection;
	}

	public String getTeam(){

		return team;
	}

	public void setTeam(String team){

		this.team = team;
	}

	public String getProductionLine(){

		return productionLine;
	}

	public void setProductionLine(String productionLine){

		this.productionLine = productionLine;
	}

	public String getUsingEquipment(){

		return usingEquipment;
	}

	public void setUsingEquipment(String usingEquipment){

		this.usingEquipment = usingEquipment;
	}

	public Float getAllowBorrowNumber(){

		return allowBorrowNumber;
	}

	public void setAllowBorrowNumber(Float allowBorrowNumber){

		this.allowBorrowNumber = allowBorrowNumber;
	}

	public Integer getInvalid(){

		return invalid;
	}

	public void setInvalid(Integer invalid){

		this.invalid = invalid;
	}

	public String getClassification(){

		return classification;
	}

	public void setClassification(String classification){

		this.classification = classification;
	}

	public String getOrganization(){

		return organization;
	}

	public void setOrganization(String organization){

		this.organization = organization;
	}

	public String getCreatePerson(){

		return createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	public Timestamp getCreateTime(){

		return createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	public String getUpdatePerson(){

		return updatePerson;
	}

	public void setUpdatePerson(String updatePerson){

		this.updatePerson = updatePerson;
	}

	public Timestamp getUpdateTime(){

		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime){

		this.updateTime = updateTime;
	}

	public String getEquipmentName(){

		return equipmentName;
	}

	public void setEquipmentName(String equipmentName){

		this.equipmentName = equipmentName;
	}
}
