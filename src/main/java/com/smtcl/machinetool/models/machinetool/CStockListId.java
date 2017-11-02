package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CStockListId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CStockListId implements java.io.Serializable{

	// Fields

	private Integer stockId;
	private Integer materialId;

	// Constructors

	/**
	 * default constructor
	 */
	public CStockListId(){

	}

	/**
	 * full constructor
	 */
	public CStockListId(Integer stockId, Integer materialId){

		this.stockId = stockId;
		this.materialId = materialId;
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

	public boolean equals(Object other){

		if ((this == other)){
			return true;
		}
		if ((other == null)){
			return false;
		}
		if (!(other instanceof CStockListId)){
			return false;
		}
		CStockListId castOther = (CStockListId) other;

		return ((this.getStockId() == castOther.getStockId()) || (this
				.getStockId() != null && castOther.getStockId() != null && this
				.getStockId().equals(castOther.getStockId())))
				&& ((this.getMaterialId() == castOther.getMaterialId()) || (this
				.getMaterialId() != null
				&& castOther.getMaterialId() != null && this
				.getMaterialId().equals(castOther.getMaterialId())));
	}

	public int hashCode(){

		int result = 17;

		result = 37 * result
				+ (getStockId() == null ? 0 : this.getStockId().hashCode());
		result = 37
				* result
				+ (getMaterialId() == null ? 0 : this.getMaterialId()
				.hashCode());
		return result;
	}

}