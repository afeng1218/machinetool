package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CStockDetailListId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CStockDetailListId implements java.io.Serializable{

	// Fields

	private Integer stockId;
	private Integer materialId;
	private String  goodsAllocationNo;
	private Integer batchNo;
	private Integer sequenceNo;

	// Constructors

	/**
	 * default constructor
	 */
	public CStockDetailListId(){

	}

	/**
	 * full constructor
	 */
	public CStockDetailListId(Integer stockId, Integer materialId,
	                          String goodsAllocationNo, Integer batchNo, Integer sequenceNo){

		this.stockId = stockId;
		this.materialId = materialId;
		this.goodsAllocationNo = goodsAllocationNo;
		this.batchNo = batchNo;
		this.sequenceNo = sequenceNo;
	}

	// Property accessors

	@Column(name = "stock_id", nullable = false)
	public Integer getStockId(){

		return this.stockId;
	}

	public void setStockId(Integer stockId){

		this.stockId = stockId;
	}

	@Column(name = "material_id", nullable = false)
	public Integer getMaterialId(){

		return this.materialId;
	}

	public void setMaterialId(Integer materialId){

		this.materialId = materialId;
	}

	@Column(name = "goods_allocation_no", nullable = false)
	public String getGoodsAllocationNo(){

		return this.goodsAllocationNo;
	}

	public void setGoodsAllocationNo(String goodsAllocationNo){

		this.goodsAllocationNo = goodsAllocationNo;
	}

	@Column(name = "batch_no", nullable = false)
	public Integer getBatchNo(){

		return this.batchNo;
	}

	public void setBatchNo(Integer batchNo){

		this.batchNo = batchNo;
	}

	@Column(name = "sequence_no", nullable = false)
	public Integer getSequenceNo(){

		return this.sequenceNo;
	}

	public void setSequenceNo(Integer sequenceNo){

		this.sequenceNo = sequenceNo;
	}

	public boolean equals(Object other){

		if ((this == other)){
			return true;
		}
		if ((other == null)){
			return false;
		}
		if (!(other instanceof CStockDetailListId)){
			return false;
		}
		CStockDetailListId castOther = (CStockDetailListId) other;

		return ((this.getStockId() == castOther.getStockId()) || (this
				.getStockId() != null && castOther.getStockId() != null && this
				.getStockId().equals(castOther.getStockId())))
				&& ((this.getMaterialId() == castOther.getMaterialId()) || (this
				.getMaterialId() != null
				&& castOther.getMaterialId() != null && this
				.getMaterialId().equals(castOther.getMaterialId())))
				&& ((this.getGoodsAllocationNo() == castOther
				.getGoodsAllocationNo()) || (this
				.getGoodsAllocationNo() != null
				&& castOther.getGoodsAllocationNo() != null && this
				.getGoodsAllocationNo().equals(
						castOther.getGoodsAllocationNo())))
				&& ((this.getBatchNo() == castOther.getBatchNo()) || (this
				.getBatchNo() != null && castOther.getBatchNo() != null && this
				.getBatchNo().equals(castOther.getBatchNo())))
				&& ((this.getSequenceNo() == castOther.getSequenceNo()) || (this
				.getSequenceNo() != null
				&& castOther.getSequenceNo() != null && this
				.getSequenceNo().equals(castOther.getSequenceNo())));
	}

	public int hashCode(){

		int result = 17;

		result = 37 * result
				+ (getStockId() == null ? 0 : this.getStockId().hashCode());
		result = 37
				* result
				+ (getMaterialId() == null ? 0 : this.getMaterialId()
				.hashCode());
		result = 37
				* result
				+ (getGoodsAllocationNo() == null ? 0 : this
				.getGoodsAllocationNo().hashCode());
		result = 37 * result
				+ (getBatchNo() == null ? 0 : this.getBatchNo().hashCode());
		result = 37
				* result
				+ (getSequenceNo() == null ? 0 : this.getSequenceNo()
				.hashCode());
		return result;
	}

}