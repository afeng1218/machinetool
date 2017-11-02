package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * COrderHead entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_order_head"
		, catalog = "machinetool"
)

public class COrderHead implements java.io.Serializable{

	// Fields

	private Integer   orderNo;
	private CSupplier CSupplier;
	private String    supplier;
	private String    prNo;
	private String    buyer;
	private Integer   accepteStorageRoomId;
	private String    statementClerk;
	private String    materialClass;
	private String    class_;
	private Integer   versionNo;
	private String    acceptOrderSide;
	private String    state;
	private String    buildPerson;
	private Timestamp buildTime;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;
	/*private Set<COrderAccept> COrderAccepts = new HashSet<COrderAccept>(0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public COrderHead(){

	}

	/**
	 * full constructor
	 */
	public COrderHead(CSupplier CSupplier, String supplier, String prNo, String buyer, Integer accepteStorageRoomId, String statementClerk, String
			materialClass, String class_, Integer versionNo, String acceptOrderSide, String state, String buildPerson, Timestamp buildTime,
                      Timestamp createTime, String updatePerson, Timestamp updateTime, Set<COrderAccept> COrderAccepts){

		this.CSupplier = CSupplier;
		this.supplier = supplier;
		this.prNo = prNo;
		this.buyer = buyer;
		this.accepteStorageRoomId = accepteStorageRoomId;
		this.statementClerk = statementClerk;
		this.materialClass = materialClass;
		this.class_ = class_;
		this.versionNo = versionNo;
		this.acceptOrderSide = acceptOrderSide;
		this.state = state;
		this.buildPerson = buildPerson;
		this.buildTime = buildTime;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		/*this.COrderAccepts = COrderAccepts;*/
	}

	// Property accessors
	@Id
	@Column(name = "order_no", unique = true, nullable = false)

	public Integer getOrderNo(){

		return this.orderNo;
	}

	public void setOrderNo(Integer orderNo){

		this.orderNo = orderNo;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "supplier_code")

	public CSupplier getCSupplier(){

		return this.CSupplier;
	}

	public void setCSupplier(CSupplier CSupplier){

		this.CSupplier = CSupplier;
	}

	@Column(name = "supplier")

	public String getSupplier(){

		return this.supplier;
	}

	public void setSupplier(String supplier){

		this.supplier = supplier;
	}

	@Column(name = "PR_no", length = 30)

	public String getPrNo(){

		return this.prNo;
	}

	public void setPrNo(String prNo){

		this.prNo = prNo;
	}

	@Column(name = "buyer", length = 20)

	public String getBuyer(){

		return this.buyer;
	}

	public void setBuyer(String buyer){

		this.buyer = buyer;
	}

	@Column(name = "accepte_storage_room_id")

	public Integer getAccepteStorageRoomId(){

		return this.accepteStorageRoomId;
	}

	public void setAccepteStorageRoomId(Integer accepteStorageRoomId){

		this.accepteStorageRoomId = accepteStorageRoomId;
	}

	@Column(name = "statement_clerk", length = 30)

	public String getStatementClerk(){

		return this.statementClerk;
	}

	public void setStatementClerk(String statementClerk){

		this.statementClerk = statementClerk;
	}

	@Column(name = "material_class", length = 30)

	public String getMaterialClass(){

		return this.materialClass;
	}

	public void setMaterialClass(String materialClass){

		this.materialClass = materialClass;
	}

	@Column(name = "class", length = 30)

	public String getClass_(){

		return this.class_;
	}

	public void setClass_(String class_){

		this.class_ = class_;
	}

	@Column(name = "version_no")

	public Integer getVersionNo(){

		return this.versionNo;
	}

	public void setVersionNo(Integer versionNo){

		this.versionNo = versionNo;
	}

	@Column(name = "accept_order_side", length = 50)

	public String getAcceptOrderSide(){

		return this.acceptOrderSide;
	}

	public void setAcceptOrderSide(String acceptOrderSide){

		this.acceptOrderSide = acceptOrderSide;
	}

	@Column(name = "state", length = 20)

	public String getState(){

		return this.state;
	}

	public void setState(String state){

		this.state = state;
	}

	@Column(name = "build_person", length = 20)

	public String getBuildPerson(){

		return this.buildPerson;
	}

	public void setBuildPerson(String buildPerson){

		this.buildPerson = buildPerson;
	}

	@Column(name = "build_time", length = 19)

	public Timestamp getBuildTime(){

		return this.buildTime;
	}

	public void setBuildTime(Timestamp buildTime){

		this.buildTime = buildTime;
	}

	@Column(name = "create_time", length = 19)

	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "update_person", length = 20)

	public String getUpdatePerson(){

		return this.updatePerson;
	}

	public void setUpdatePerson(String updatePerson){

		this.updatePerson = updatePerson;
	}

	@Column(name = "update_time", length = 19)

	public Timestamp getUpdateTime(){

		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime){

		this.updateTime = updateTime;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "COrderHead")

	public Set<COrderAccept> getCOrderAccepts(){

		return this.COrderAccepts;
	}

	public void setCOrderAccepts(Set<COrderAccept> COrderAccepts){

		this.COrderAccepts = COrderAccepts;
	}*/

}