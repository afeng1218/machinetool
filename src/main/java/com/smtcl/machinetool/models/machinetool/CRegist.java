package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CRegist entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_regist", catalog = "machinetool")
public class CRegist implements java.io.Serializable{

	// Fields

	private String  name;
	private String  password;
	private Integer storageRoomId;
	private String  limitedWarehouseOrnot;
	private String  needPasswordOrnot;
	private String  director;
	private String  orderApprovalAuthority;
	private String  classification;
	private String  organization;

	// Constructors

	/**
	 * default constructor
	 */
	public CRegist(){

	}

	/**
	 * minimal constructor
	 */
	public CRegist(String name){

		this.name = name;
	}

	/**
	 * full constructor
	 */
	public CRegist(String name, String password, Integer storageRoomId,
	               String limitedWarehouseOrnot, String needPasswordOrnot,
	               String director, String orderApprovalAuthority,
	               String classification, String organization){

		this.name = name;
		this.password = password;
		this.storageRoomId = storageRoomId;
		this.limitedWarehouseOrnot = limitedWarehouseOrnot;
		this.needPasswordOrnot = needPasswordOrnot;
		this.director = director;
		this.orderApprovalAuthority = orderApprovalAuthority;
		this.classification = classification;
		this.organization = organization;
	}

	// Property accessors
	@Id
	@Column(name = "name", unique = true, nullable = false)
	public String getName(){

		return this.name;
	}

	public void setName(String name){

		this.name = name;
	}

	@Column(name = "password")
	public String getPassword(){

		return this.password;
	}

	public void setPassword(String password){

		this.password = password;
	}

	@Column(name = "storage_room_id")
	public Integer getStorageRoomId(){

		return this.storageRoomId;
	}

	public void setStorageRoomId(Integer storageRoomId){

		this.storageRoomId = storageRoomId;
	}

	@Column(name = "limited_warehouse_ornot", length = 10)
	public String getLimitedWarehouseOrnot(){

		return this.limitedWarehouseOrnot;
	}

	public void setLimitedWarehouseOrnot(String limitedWarehouseOrnot){

		this.limitedWarehouseOrnot = limitedWarehouseOrnot;
	}

	@Column(name = "need_password_ornot", length = 10)
	public String getNeedPasswordOrnot(){

		return this.needPasswordOrnot;
	}

	public void setNeedPasswordOrnot(String needPasswordOrnot){

		this.needPasswordOrnot = needPasswordOrnot;
	}

	@Column(name = "director", length = 20)
	public String getDirector(){

		return this.director;
	}

	public void setDirector(String director){

		this.director = director;
	}

	@Column(name = "order_approval_authority", length = 20)
	public String getOrderApprovalAuthority(){

		return this.orderApprovalAuthority;
	}

	public void setOrderApprovalAuthority(String orderApprovalAuthority){

		this.orderApprovalAuthority = orderApprovalAuthority;
	}

	@Column(name = "classification", length = 10)
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

}