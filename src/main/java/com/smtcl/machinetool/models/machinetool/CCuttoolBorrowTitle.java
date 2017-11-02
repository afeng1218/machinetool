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
 * CCuttoolBorrowTitle entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_borrow_title", catalog = "machinetool")
public class CCuttoolBorrowTitle implements java.io.Serializable{

	// Fields

	private Integer borrowNo;
	private CBorrower              CBorrower;
	private CStorageRoomDefinition CStorageRoomDefinition;
	private CCuttoolBasedata       CCuttoolBasedata;
	private String                 borrower;
	private Integer                equipmentId;
	private Integer                surplusLifetime;
	private String                 isReturn;
	private String                 workOrderNo;
	private String                 type;
	private Integer                goodsAllocationId;

	private Timestamp planReturnTime;
	private Timestamp borrowTime;
	private Timestamp returnTime;
	private String    createPerson;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;
	/*private Set<CBorrowReturn> CBorrowReturns = new HashSet<CBorrowReturn>(0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolBorrowTitle(){

	}

	/**
	 * minimal constructor
	 */
	public CCuttoolBorrowTitle(CStorageRoomDefinition CStorageRoomDefinition, String borrower, String isReturn, String type){

		this.CStorageRoomDefinition = CStorageRoomDefinition;
		this.borrower = borrower;
		this.isReturn = isReturn;
		this.type = type;
	}

	/**
	 * full constructor
	 */
	public CCuttoolBorrowTitle(CBorrower CBorrower, CStorageRoomDefinition CStorageRoomDefinition, CCuttoolBasedata CCuttoolBasedata, String
			borrower, Integer equipmentId, Integer surplusLifetime, String isReturn, String workOrderNo, String type, Integer goodsAllocationId,
	                           Timestamp planReturnTime, Timestamp borrowTime, Timestamp returnTime, String createPerson, Timestamp createTime,
	                           String updatePerson, Timestamp updateTime, Set<CBorrowReturn> CBorrowReturns){

		this.CBorrower = CBorrower;
		this.CStorageRoomDefinition = CStorageRoomDefinition;
		this.CCuttoolBasedata = CCuttoolBasedata;
		this.borrower = borrower;
		this.equipmentId = equipmentId;
		this.surplusLifetime = surplusLifetime;
		this.isReturn = isReturn;
		this.workOrderNo = workOrderNo;
		this.type = type;
		this.goodsAllocationId = goodsAllocationId;
		this.planReturnTime = planReturnTime;
		this.borrowTime = borrowTime;
		this.returnTime = returnTime;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		/*this.CBorrowReturns = CBorrowReturns;*/
	}

	// Property accessors
	@Id

	@Column(name = "borrow_no", unique = true, nullable = false)

	public Integer getBorrowNo(){

		return this.borrowNo;
	}

	public void setBorrowNo(Integer borrowNo){

		this.borrowNo = borrowNo;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "employee_no")

	public CBorrower getCBorrower(){

		return this.CBorrower;
	}

	public void setCBorrower(CBorrower CBorrower){

		this.CBorrower = CBorrower;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "storage_room_id", nullable = false)

	public CStorageRoomDefinition getCStorageRoomDefinition(){

		return this.CStorageRoomDefinition;
	}

	public void setCStorageRoomDefinition(CStorageRoomDefinition CStorageRoomDefinition){

		this.CStorageRoomDefinition = CStorageRoomDefinition;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cuttool_id")

	public CCuttoolBasedata getCCuttoolBasedata(){

		return this.CCuttoolBasedata;
	}

	public void setCCuttoolBasedata(CCuttoolBasedata CCuttoolBasedata){

		this.CCuttoolBasedata = CCuttoolBasedata;
	}

	@Column(name = "borrower", nullable = false, length = 20)

	public String getBorrower(){

		return this.borrower;
	}

	public void setBorrower(String borrower){

		this.borrower = borrower;
	}

	@Column(name = "equipment_id")

	public Integer getEquipmentId(){

		return this.equipmentId;
	}

	public void setEquipmentId(Integer equipmentId){

		this.equipmentId = equipmentId;
	}

	@Column(name = "surplus_lifetime")

	public Integer getSurplusLifetime(){

		return this.surplusLifetime;
	}

	public void setSurplusLifetime(Integer surplusLifetime){

		this.surplusLifetime = surplusLifetime;
	}

	@Column(name = "isReturn", nullable = false, length = 10)

	public String getIsReturn(){

		return this.isReturn;
	}

	public void setIsReturn(String isReturn){

		this.isReturn = isReturn;
	}

	@Column(name = "work_order_no")

	public String getWorkOrderNo(){

		return this.workOrderNo;
	}

	public void setWorkOrderNo(String workOrderNo){

		this.workOrderNo = workOrderNo;
	}

	@Column(name = "type", nullable = false, length = 30)

	public String getType(){

		return this.type;
	}

	public void setType(String type){

		this.type = type;
	}

	@Column(name = "goods_allocation_id")

	public Integer getGoodsAllocationId(){

		return this.goodsAllocationId;
	}

	public void setGoodsAllocationId(Integer goodsAllocationId){

		this.goodsAllocationId = goodsAllocationId;
	}

	@Column(name = "plan_return_time", length = 19)

	public Timestamp getPlanReturnTime(){

		return this.planReturnTime;
	}

	public void setPlanReturnTime(Timestamp planReturnTime){

		this.planReturnTime = planReturnTime;
	}

	@Column(name = "borrow_time", length = 19)

	public Timestamp getBorrowTime(){

		return this.borrowTime;
	}

	public void setBorrowTime(Timestamp borrowTime){

		this.borrowTime = borrowTime;
	}

	@Column(name = "return_time", length = 19)

	public Timestamp getReturnTime(){

		return this.returnTime;
	}

	public void setReturnTime(Timestamp returnTime){

		this.returnTime = returnTime;
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

	@Column(name = "update_person", length = 30)

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

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CCuttoolBorrowTitle")

	public Set<CBorrowReturn> getCBorrowReturns(){

		return this.CBorrowReturns;
	}

	public void setCBorrowReturns(Set<CBorrowReturn> CBorrowReturns){

		this.CBorrowReturns = CBorrowReturns;
	}*/
}