package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * CBorrowReturn entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_borrow_return", catalog = "machinetool")
public class CBorrowReturn implements java.io.Serializable{

	// Fields

	private CBorrowReturnId     id;
	private CGeneralMaterial    CGeneralMaterial;
	private CCuttoolBorrowTitle CCuttoolBorrowTitle;
	private String              materialVersionDes;
	private Float               borrowNumber;
	private Float               returnNumber;
	private Timestamp           borrowDate;
	private Timestamp           returnDate;
	private String              remarks;
	private Integer             goodsAllocationId;
	private String              createPerson;
	private Timestamp           createTime;
	private String              updatePerson;
	private Timestamp           updateTime;
	private Timestamp           planReturnTime;
	private Float               scrapNumber;
	private String              goodsUseStatus;
	private Integer             batchNumberId;
	private Integer             sequenceId;
	// Constructors

	/**
	 * default constructor
	 */
	public CBorrowReturn(){

	}

	/**
	 * minimal constructor
	 */
	public CBorrowReturn(CBorrowReturnId id,
						 CCuttoolBorrowTitle CCuttoolBorrowTitle){

		this.id = id;
		this.CCuttoolBorrowTitle = CCuttoolBorrowTitle;
	}

	/**
	 * full constructor
	 */
	public CBorrowReturn(CBorrowReturnId id, CGeneralMaterial CGeneralMaterial,
	                     CCuttoolBorrowTitle CCuttoolBorrowTitle, String materialVersionDes,
	                     Float borrowNumber, Float returnNumber, Timestamp borrowDate,
	                     Timestamp returnDate, String remarks, Integer goodsAllocationId,
	                     String createPerson, Timestamp createTime, String updatePerson,
	                     Timestamp updateTime, Timestamp planReturnTime, Float scrapNumber,
	                     String goodsUseStatus, Integer batchNumberId, Integer sequenceId){

		this.id = id;
		this.CGeneralMaterial = CGeneralMaterial;
		this.CCuttoolBorrowTitle = CCuttoolBorrowTitle;
		this.materialVersionDes = materialVersionDes;
		this.borrowNumber = borrowNumber;
		this.returnNumber = returnNumber;
		this.borrowDate = borrowDate;
		this.returnDate = returnDate;
		this.remarks = remarks;
		this.goodsAllocationId = goodsAllocationId;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		this.planReturnTime = planReturnTime;
		this.scrapNumber = scrapNumber;
		this.goodsUseStatus = goodsUseStatus;
		this.batchNumberId = batchNumberId;
		this.sequenceId = sequenceId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "borrowCode", column = @Column(name = "borrow_code", nullable = false)),
			@AttributeOverride(name = "rownum", column = @Column(name = "rownum", nullable = false))})
	public CBorrowReturnId getId(){

		return this.id;
	}

	public void setId(CBorrowReturnId id){

		this.id = id;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")
	public CGeneralMaterial getCGeneralMaterial(){

		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial){

		this.CGeneralMaterial = CGeneralMaterial;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "borrow_code", nullable = false, insertable = false, updatable = false)
	public CCuttoolBorrowTitle getCCuttoolBorrowTitle(){

		return this.CCuttoolBorrowTitle;
	}

	public void setCCuttoolBorrowTitle(CCuttoolBorrowTitle CCuttoolBorrowTitle){

		this.CCuttoolBorrowTitle = CCuttoolBorrowTitle;
	}

	@Column(name = "material_version_des")
	public String getMaterialVersionDes(){

		return this.materialVersionDes;
	}

	public void setMaterialVersionDes(String materialVersionDes){

		this.materialVersionDes = materialVersionDes;
	}

	@Column(name = "borrow_number", precision = 12, scale = 0)
	public Float getBorrowNumber(){

		return this.borrowNumber;
	}

	public void setBorrowNumber(Float borrowNumber){

		this.borrowNumber = borrowNumber;
	}

	@Column(name = "return_number", precision = 12, scale = 0)
	public Float getReturnNumber(){

		return this.returnNumber;
	}

	public void setReturnNumber(Float returnNumber){

		this.returnNumber = returnNumber;
	}

	@Column(name = "borrow_date", length = 0)
	public Timestamp getBorrowDate(){

		return this.borrowDate;
	}

	public void setBorrowDate(Timestamp borrowDate){

		this.borrowDate = borrowDate;
	}

	@Column(name = "return_date", length = 0)
	public Timestamp getReturnDate(){

		return this.returnDate;
	}

	public void setReturnDate(Timestamp returnDate){

		this.returnDate = returnDate;
	}

	@Column(name = "remarks")
	public String getRemarks(){

		return this.remarks;
	}

	public void setRemarks(String remarks){

		this.remarks = remarks;
	}

	@Column(name = "goods_allocation_id")
	public Integer getGoodsAllocationId(){

		return this.goodsAllocationId;
	}

	public void setGoodsAllocationId(Integer goodsAllocationId){

		this.goodsAllocationId = goodsAllocationId;
	}

	@Column(name = "create_person")
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

	@Column(name = "update_person")
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

	@Column(name = "plan_return_time", length = 0)
	public Timestamp getPlanReturnTime(){

		return this.planReturnTime;
	}

	public void setPlanReturnTime(Timestamp planReturnTime){

		this.planReturnTime = planReturnTime;
	}

	@Column(name = "scrap_number", precision = 12, scale = 0)
	public Float getScrapNumber(){

		return this.scrapNumber;
	}

	public void setScrapNumber(Float scrapNumber){

		this.scrapNumber = scrapNumber;
	}

	@Column(name = "goods_use_status")
	public String getGoodsUseStatus(){

		return this.goodsUseStatus;
	}

	public void setGoodsUseStatus(String goodsUseStatus){

		this.goodsUseStatus = goodsUseStatus;
	}

	@Column(name = "batch_number_id")
	public Integer getBatchNumberId(){

		return this.batchNumberId;
	}

	public void setBatchNumberId(Integer batchNumberId){

		this.batchNumberId = batchNumberId;
	}

	@Column(name = "sequence_id")
	public Integer getSequenceId(){

		return this.sequenceId;
	}

	public void setSequenceId(Integer sequenceId){

		this.sequenceId = sequenceId;
	}

}