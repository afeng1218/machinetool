package com.smtcl.machinetool.models.machinetool;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CInventoryList entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_inventory_list", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "Inventory_id"))
public class CInventoryList implements java.io.Serializable {

	// Fields

	private CInventoryListId id;
	private CInventoryHead CInventoryHead;

	// Constructors

	/** default constructor */
	public CInventoryList() {
	}

	/** full constructor */
	public CInventoryList(CInventoryListId id, CInventoryHead CInventoryHead) {
		this.id = id;
		this.CInventoryHead = CInventoryHead;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides( {
			@AttributeOverride(name = "inventoryId", column = @Column(name = "Inventory_id", unique = true, nullable = false)),
			@AttributeOverride(name = "goodsSign", column = @Column(name = "goods_sign")),
			@AttributeOverride(name = "newGoodsSign", column = @Column(name = "new_goods_sign", length = 50)),
			@AttributeOverride(name = "materialNo", column = @Column(name = "material_no")),
			@AttributeOverride(name = "inventoryVersion", column = @Column(name = "Inventory_version")),
			@AttributeOverride(name = "snapshotNumber", column = @Column(name = "snapshot_number")),
			@AttributeOverride(name = "unit", column = @Column(name = "unit", length = 5)),
			@AttributeOverride(name = "inventoryNumber", column = @Column(name = "Inventory_number")),
			@AttributeOverride(name = "sonStock", column = @Column(name = "son_stock")),
			@AttributeOverride(name = "goodsPosition", column = @Column(name = "goods_position", length = 100)),
			@AttributeOverride(name = "batch", column = @Column(name = "batch", length = 20)),
			@AttributeOverride(name = "sequence", column = @Column(name = "sequence", length = 20)),
			@AttributeOverride(name = "adjustmentNumber", column = @Column(name = "adjustment_number")),
			@AttributeOverride(name = "adjustmentValue", column = @Column(name = "adjustment_value")),
			@AttributeOverride(name = "percentage", column = @Column(name = "percentage")),
			@AttributeOverride(name = "inventoryUser", column = @Column(name = "Inventory_user", length = 20)),
			@AttributeOverride(name = "approvalType", column = @Column(name = "approval_type")),
			@AttributeOverride(name = "approvalUser", column = @Column(name = "approval_user", length = 50)) })
	public CInventoryListId getId() {
		return this.id;
	}

	public void setId(CInventoryListId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Inventory_id", unique = true, nullable = false, insertable = false, updatable = false)
	public CInventoryHead getCInventoryHead() {
		return this.CInventoryHead;
	}

	public void setCInventoryHead(CInventoryHead CInventoryHead) {
		this.CInventoryHead = CInventoryHead;
	}

}