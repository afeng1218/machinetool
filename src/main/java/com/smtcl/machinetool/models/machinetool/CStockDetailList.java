package com.smtcl.machinetool.models.machinetool;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CStockDetailList entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_stock_detail_list", catalog = "machinetool")
public class CStockDetailList implements java.io.Serializable{

	// Fields

	private CStockDetailListId id;
	private String             versionNo;
	private String             versionException;
	private Float              availableQuantity;
	private Float              bluntGoodsNum;
	private Float              borrowNumber;

	// Constructors

	/**
	 * default constructor
	 */
	public CStockDetailList(){

	}

	/**
	 * minimal constructor
	 */
	public CStockDetailList(CStockDetailListId id){

		this.id = id;
	}

	/**
	 * full constructor
	 */
	public CStockDetailList(CStockDetailListId id, String versionNo,
	                        String versionException, Float availableQuantity,
	                        Float bluntGoodsNum, Float borrowNumber){

		this.id = id;
		this.versionNo = versionNo;
		this.versionException = versionException;
		this.availableQuantity = availableQuantity;
		this.bluntGoodsNum = bluntGoodsNum;
		this.borrowNumber = borrowNumber;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "stockId", column = @Column(name = "stock_id", nullable = false)),
			@AttributeOverride(name = "materialId", column = @Column(name = "material_id", nullable = false)),
			@AttributeOverride(name = "goodsAllocationNo", column = @Column(name = "goods_allocation_no", nullable = false)),
			@AttributeOverride(name = "batchNo", column = @Column(name = "batch_no", nullable = false)),
			@AttributeOverride(name = "sequenceNo", column = @Column(name = "sequence_no", nullable = false))})
	public CStockDetailListId getId(){

		return this.id;
	}

	public void setId(CStockDetailListId id){

		this.id = id;
	}

	@Column(name = "version_no")
	public String getVersionNo(){

		return this.versionNo;
	}

	public void setVersionNo(String versionNo){

		this.versionNo = versionNo;
	}

	@Column(name = "version_exception")
	public String getVersionException(){

		return this.versionException;
	}

	public void setVersionException(String versionException){

		this.versionException = versionException;
	}

	@Column(name = "available_quantity", precision = 12, scale = 0)
	public Float getAvailableQuantity(){

		return this.availableQuantity;
	}

	public void setAvailableQuantity(Float availableQuantity){

		this.availableQuantity = availableQuantity;
	}

	@Column(name = "blunt_goods_num", precision = 12, scale = 0)
	public Float getBluntGoodsNum(){

		return this.bluntGoodsNum;
	}

	public void setBluntGoodsNum(Float bluntGoodsNum){

		this.bluntGoodsNum = bluntGoodsNum;
	}

	@Column(name = "borrow_number", precision = 12, scale = 0)
	public Float getBorrowNumber(){

		return this.borrowNumber;
	}

	public void setBorrowNumber(Float borrowNumber){

		this.borrowNumber = borrowNumber;
	}

}