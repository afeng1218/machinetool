package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CIssueTitle entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_issue_title"
		, catalog = "machinetool"
)

public class CIssueTitle implements java.io.Serializable{

	// Fields

	private String  issueNo;
	private String  pickPerson;
	private String  usingCuttool;
	private Integer usingEquipmentId;
	private Integer storageRoomId;
	private String  remarks;
	private Integer isRelatedCuttool;

	// Constructors

	/**
	 * default constructor
	 */
	public CIssueTitle(){

	}

	/**
	 * minimal constructor
	 */
	public CIssueTitle(String pickPerson){

		this.pickPerson = pickPerson;
	}

	/**
	 * full constructor
	 */
	public CIssueTitle(String pickPerson, String usingCuttool, Integer usingEquipmentId, Integer storageRoomId, String remarks, Integer
			isRelatedCuttool){

		this.pickPerson = pickPerson;
		this.usingCuttool = usingCuttool;
		this.usingEquipmentId = usingEquipmentId;
		this.storageRoomId = storageRoomId;
		this.remarks = remarks;
		this.isRelatedCuttool = isRelatedCuttool;
	}

	// Property accessors
	@Id
	//@GeneratedValue(strategy = IDENTITY)

	@Column(name = "issue_no", unique = true, nullable = false, length = 20)

	public String getIssueNo(){

		return this.issueNo;
	}

	public void setIssueNo(String issueNo){

		this.issueNo = issueNo;
	}

	@Column(name = "pick_person", nullable = false, length = 30)

	public String getPickPerson(){

		return this.pickPerson;
	}

	public void setPickPerson(String pickPerson){

		this.pickPerson = pickPerson;
	}

	@Column(name = "using_cuttool", length = 30)

	public String getUsingCuttool(){

		return this.usingCuttool;
	}

	public void setUsingCuttool(String usingCuttool){

		this.usingCuttool = usingCuttool;
	}

	@Column(name = "using_equipment_id")

	public Integer getUsingEquipmentId(){

		return this.usingEquipmentId;
	}

	public void setUsingEquipmentId(Integer usingEquipmentId){

		this.usingEquipmentId = usingEquipmentId;
	}

	@Column(name = "storage_room_id")

	public Integer getStorageRoomId(){

		return this.storageRoomId;
	}

	public void setStorageRoomId(Integer storageRoomId){

		this.storageRoomId = storageRoomId;
	}

	@Column(name = "remarks")

	public String getRemarks(){

		return this.remarks;
	}

	public void setRemarks(String remarks){

		this.remarks = remarks;
	}

	@Column(name = "is_related_cuttool")

	public Integer getIsRelatedCuttool(){

		return this.isRelatedCuttool;
	}

	public void setIsRelatedCuttool(Integer isRelatedCuttool){

		this.isRelatedCuttool = isRelatedCuttool;
	}

}