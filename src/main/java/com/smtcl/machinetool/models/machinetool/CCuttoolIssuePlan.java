package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * CCuttoolIssuePlan entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_issue_plan"
		, catalog = "machinetool"
)

public class CCuttoolIssuePlan implements java.io.Serializable{

	// Fields

	private String           planNo;
	private CCuttoolBasedata CCuttoolBasedata;
	private Timestamp        requiredTime;
	private String           requiredPerson;
	private String           requiredEquipment;
	private Timestamp        planFinishDate;
	private String           isIssued;
	private String           createPerson;
	private Timestamp        createTime;

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolIssuePlan(){

	}

	/**
	 * minimal constructor
	 */
	public CCuttoolIssuePlan(CCuttoolBasedata CCuttoolBasedata){

		this.CCuttoolBasedata = CCuttoolBasedata;
	}

	/**
	 * full constructor
	 */
	public CCuttoolIssuePlan(CCuttoolBasedata CCuttoolBasedata, Timestamp requiredTime, String requiredPerson, String requiredEquipment, Timestamp
			planFinishDate, String isIssued, String createPerson, Timestamp createTime){

		this.CCuttoolBasedata = CCuttoolBasedata;
		this.requiredTime = requiredTime;
		this.requiredPerson = requiredPerson;
		this.requiredEquipment = requiredEquipment;
		this.planFinishDate = planFinishDate;
		this.isIssued = isIssued;
		this.createPerson = createPerson;
		this.createTime = createTime;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "plan_no", unique = true, nullable = false, length = 60)

	public String getPlanNo(){

		return this.planNo;
	}

	public void setPlanNo(String planNo){

		this.planNo = planNo;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cuttool_id", nullable = false)

	public CCuttoolBasedata getCCuttoolBasedata(){

		return this.CCuttoolBasedata;
	}

	public void setCCuttoolBasedata(CCuttoolBasedata CCuttoolBasedata){

		this.CCuttoolBasedata = CCuttoolBasedata;
	}

	@Column(name = "required_time", length = 19)

	public Timestamp getRequiredTime(){

		return this.requiredTime;
	}

	public void setRequiredTime(Timestamp requiredTime){

		this.requiredTime = requiredTime;
	}

	@Column(name = "required_person", length = 20)

	public String getRequiredPerson(){

		return this.requiredPerson;
	}

	public void setRequiredPerson(String requiredPerson){

		this.requiredPerson = requiredPerson;
	}

	@Column(name = "required_equipment", length = 30)

	public String getRequiredEquipment(){

		return this.requiredEquipment;
	}

	public void setRequiredEquipment(String requiredEquipment){

		this.requiredEquipment = requiredEquipment;
	}

	@Column(name = "plan_finish_date", length = 19)

	public Timestamp getPlanFinishDate(){

		return this.planFinishDate;
	}

	public void setPlanFinishDate(Timestamp planFinishDate){

		this.planFinishDate = planFinishDate;
	}

	@Column(name = "is_issued", length = 10)

	public String getIsIssued(){

		return this.isIssued;
	}

	public void setIsIssued(String isIssued){

		this.isIssued = isIssued;
	}

	@Column(name = "create_person", length = 30)

	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 19)

	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

}