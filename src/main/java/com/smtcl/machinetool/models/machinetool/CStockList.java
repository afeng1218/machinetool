package com.smtcl.machinetool.models.machinetool;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CStockList entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_stock_list", catalog = "machinetool")
public class CStockList implements java.io.Serializable{

	// Fields

	private CStockListId id;
	private Float        availableQuantity;
	private Float        bluntGoodsNum;
	private Float        borrowNumber;
	private Double       weightedPrice;

	// Constructors

	/**
	 * default constructor
	 */
	public CStockList(){

	}

	/**
	 * minimal constructor
	 */
	public CStockList(CStockListId id){

		this.id = id;
	}

	/**
	 * full constructor
	 */
	public CStockList(CStockListId id, Float availableQuantity,
	                  Float bluntGoodsNum, Float borrowNumber, Double weightedPrice){

		this.id = id;
		this.availableQuantity = availableQuantity;
		this.bluntGoodsNum = bluntGoodsNum;
		this.borrowNumber = borrowNumber;
		this.weightedPrice = weightedPrice;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "stockId", column = @Column(name = "stock_id", nullable = false)),
			@AttributeOverride(name = "materialId", column = @Column(name = "material_id", nullable = false))})
	public CStockListId getId(){

		return this.id;
	}

	public void setId(CStockListId id){

		this.id = id;
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

	@Column(name = "weighted_price", precision = 15, scale = 7)
	public Double getWeightedPrice(){

		return this.weightedPrice;
	}

	public void setWeightedPrice(Double weightedPrice){

		this.weightedPrice = weightedPrice;
	}

}