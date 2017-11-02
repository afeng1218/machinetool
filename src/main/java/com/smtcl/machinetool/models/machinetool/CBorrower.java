package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * CBorrower entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_borrower", catalog = "machinetool")
public class CBorrower implements java.io.Serializable{

	// Fields

	private String               employeeCardNo;
	private CMechanicalEquipment CMechanicalEquipment;
	private String               borrowedName;
	private String               password;
	private String               workshop;
	private String               workshopSection;
	private String               team;
	private String               productionLine;
	private String               usingEquipment;
	private Float                allowBorrowNumber;
	private Integer              invalid;
	private String               classification;
	private String               organization;
	private String               createPerson;
	private Timestamp            createTime;
	private String               updatePerson;
	private Timestamp            updateTime;
	private Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles = new HashSet<CCuttoolBorrowTitle>(
			0);

	// Constructors

	/**
	 * default constructor
	 */
	public CBorrower(){

	}

	/**
	 * minimal constructor
	 */
	public CBorrower(String employeeCardNo, String borrowedName, Integer invalid){

		this.employeeCardNo = employeeCardNo;
		this.borrowedName = borrowedName;
		this.invalid = invalid;
	}

	/**
	 * full constructor
	 */
	public CBorrower(String employeeCardNo,
	                 CMechanicalEquipment CMechanicalEquipment, String borrowedName,
	                 String password, String workshop, String workshopSection,
	                 String team, String productionLine, String usingEquipment,
	                 Float allowBorrowNumber, Integer invalid, String classification,
	                 String organization, String createPerson, Timestamp createTime,
	                 String updatePerson, Timestamp updateTime,
	                 Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles){

		this.employeeCardNo = employeeCardNo;
		this.CMechanicalEquipment = CMechanicalEquipment;
		this.borrowedName = borrowedName;
		this.password = password;
		this.workshop = workshop;
		this.workshopSection = workshopSection;
		this.team = team;
		this.productionLine = productionLine;
		this.usingEquipment = usingEquipment;
		this.allowBorrowNumber = allowBorrowNumber;
		this.invalid = invalid;
		this.classification = classification;
		this.organization = organization;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		this.CCuttoolBorrowTitles = CCuttoolBorrowTitles;
	}

	// Property accessors
	@Id
	@Column(name = "employee_card_no", unique = true, nullable = false, length = 30)
	public String getEmployeeCardNo(){

		return this.employeeCardNo;
	}

	public void setEmployeeCardNo(String employeeCardNo){

		this.employeeCardNo = employeeCardNo;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "equipment_id")
	public CMechanicalEquipment getCMechanicalEquipment(){

		return this.CMechanicalEquipment;
	}

	public void setCMechanicalEquipment(
			CMechanicalEquipment CMechanicalEquipment){

		this.CMechanicalEquipment = CMechanicalEquipment;
	}

	@Column(name = "borrowed_name", nullable = false, length = 30)
	public String getBorrowedName(){

		return this.borrowedName;
	}

	public void setBorrowedName(String borrowedName){

		this.borrowedName = borrowedName;
	}

	@Column(name = "password", length = 30)
	public String getPassword(){

		return this.password;
	}

	public void setPassword(String password){

		this.password = password;
	}

	@Column(name = "workshop", length = 100)
	public String getWorkshop(){

		return this.workshop;
	}

	public void setWorkshop(String workshop){

		this.workshop = workshop;
	}

	@Column(name = "workshop_section", length = 100)
	public String getWorkshopSection(){

		return this.workshopSection;
	}

	public void setWorkshopSection(String workshopSection){

		this.workshopSection = workshopSection;
	}

	@Column(name = "team", length = 30)
	public String getTeam(){

		return this.team;
	}

	public void setTeam(String team){

		this.team = team;
	}

	@Column(name = "production_line", length = 50)
	public String getProductionLine(){

		return this.productionLine;
	}

	public void setProductionLine(String productionLine){

		this.productionLine = productionLine;
	}

	@Column(name = "using_equipment", length = 100)
	public String getUsingEquipment(){

		return this.usingEquipment;
	}

	public void setUsingEquipment(String usingEquipment){

		this.usingEquipment = usingEquipment;
	}

	@Column(name = "allow_borrow_number", precision = 12, scale = 0)
	public Float getAllowBorrowNumber(){

		return this.allowBorrowNumber;
	}

	public void setAllowBorrowNumber(Float allowBorrowNumber){

		this.allowBorrowNumber = allowBorrowNumber;
	}

	@Column(name = "invalid", nullable = false)
	public Integer getInvalid(){

		return this.invalid;
	}

	public void setInvalid(Integer invalid){

		this.invalid = invalid;
	}

	@Column(name = "classification", length = 30)
	public String getClassification(){

		return this.classification;
	}

	public void setClassification(String classification){

		this.classification = classification;
	}

	@Column(name = "organization")
	public String getOrganization(){

		return this.organization;
	}

	public void setOrganization(String organization){

		this.organization = organization;
	}

	@Column(name = "create_person", length = 30)
	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 0)
	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "update_person", length = 30)
	public String getUpdatePerson(){

		return this.updatePerson;
	}

	public void setUpdatePerson(String updatePerson){

		this.updatePerson = updatePerson;
	}

	@Column(name = "update_time", length = 0)
	public Timestamp getUpdateTime(){

		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime){

		this.updateTime = updateTime;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CBorrower")
	public Set<CCuttoolBorrowTitle> getCCuttoolBorrowTitles(){

		return this.CCuttoolBorrowTitles;
	}

	public void setCCuttoolBorrowTitles(
			Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles){

		this.CCuttoolBorrowTitles = CCuttoolBorrowTitles;
	}

}