package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CInventoryListId entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Embeddable
public class CInventoryListId implements java.io.Serializable {

	// Fields

	private Integer inventoryId;
	private String goodsSign;
	private String newGoodsSign;
	private String materialNo;
	private Integer inventoryVersion;
	private Integer snapshotNumber;
	private String unit;
	private Integer inventoryNumber;
	private String sonStock;
	private String goodsPosition;
	private String batch;
	private String sequence;
	private Integer adjustmentNumber;
	private Integer adjustmentValue;
	private Integer percentage;
	private String inventoryUser;
	private Integer approvalType;
	private String approvalUser;

	// Constructors

	/** default constructor */
	public CInventoryListId() {
	}

	/** minimal constructor */
	public CInventoryListId(Integer inventoryId) {
		this.inventoryId = inventoryId;
	}

	/** full constructor */
	public CInventoryListId(Integer inventoryId, String goodsSign,
			String newGoodsSign, String materialNo, Integer inventoryVersion,
			Integer snapshotNumber, String unit, Integer inventoryNumber,
			String sonStock, String goodsPosition, String batch,
			String sequence, Integer adjustmentNumber, Integer adjustmentValue,
			Integer percentage, String inventoryUser, Integer approvalType,
			String approvalUser) {
		this.inventoryId = inventoryId;
		this.goodsSign = goodsSign;
		this.newGoodsSign = newGoodsSign;
		this.materialNo = materialNo;
		this.inventoryVersion = inventoryVersion;
		this.snapshotNumber = snapshotNumber;
		this.unit = unit;
		this.inventoryNumber = inventoryNumber;
		this.sonStock = sonStock;
		this.goodsPosition = goodsPosition;
		this.batch = batch;
		this.sequence = sequence;
		this.adjustmentNumber = adjustmentNumber;
		this.adjustmentValue = adjustmentValue;
		this.percentage = percentage;
		this.inventoryUser = inventoryUser;
		this.approvalType = approvalType;
		this.approvalUser = approvalUser;
	}

	// Property accessors

	@Column(name = "Inventory_id", unique = true, nullable = false)
	public Integer getInventoryId() {
		return this.inventoryId;
	}

	public void setInventoryId(Integer inventoryId) {
		this.inventoryId = inventoryId;
	}

	@Column(name = "goods_sign")
	public String getGoodsSign() {
		return this.goodsSign;
	}

	public void setGoodsSign(String goodsSign) {
		this.goodsSign = goodsSign;
	}

	@Column(name = "new_goods_sign", length = 50)
	public String getNewGoodsSign() {
		return this.newGoodsSign;
	}

	public void setNewGoodsSign(String newGoodsSign) {
		this.newGoodsSign = newGoodsSign;
	}

	@Column(name = "material_no")
	public String getMaterialNo() {
		return this.materialNo;
	}

	public void setMaterialNo(String materialNo) {
		this.materialNo = materialNo;
	}

	@Column(name = "Inventory_version")
	public Integer getInventoryVersion() {
		return this.inventoryVersion;
	}

	public void setInventoryVersion(Integer inventoryVersion) {
		this.inventoryVersion = inventoryVersion;
	}

	@Column(name = "snapshot_number")
	public Integer getSnapshotNumber() {
		return this.snapshotNumber;
	}

	public void setSnapshotNumber(Integer snapshotNumber) {
		this.snapshotNumber = snapshotNumber;
	}

	@Column(name = "unit", length = 5)
	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "Inventory_number")
	public Integer getInventoryNumber() {
		return this.inventoryNumber;
	}

	public void setInventoryNumber(Integer inventoryNumber) {
		this.inventoryNumber = inventoryNumber;
	}

	@Column(name = "son_stock")
	public String getSonStock() {
		return this.sonStock;
	}

	public void setSonStock(String sonStock) {
		this.sonStock = sonStock;
	}

	@Column(name = "goods_position", length = 100)
	public String getGoodsPosition() {
		return this.goodsPosition;
	}

	public void setGoodsPosition(String goodsPosition) {
		this.goodsPosition = goodsPosition;
	}

	@Column(name = "batch", length = 20)
	public String getBatch() {
		return this.batch;
	}

	public void setBatch(String batch) {
		this.batch = batch;
	}

	@Column(name = "sequence", length = 20)
	public String getSequence() {
		return this.sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	@Column(name = "adjustment_number")
	public Integer getAdjustmentNumber() {
		return this.adjustmentNumber;
	}

	public void setAdjustmentNumber(Integer adjustmentNumber) {
		this.adjustmentNumber = adjustmentNumber;
	}

	@Column(name = "adjustment_value")
	public Integer getAdjustmentValue() {
		return this.adjustmentValue;
	}

	public void setAdjustmentValue(Integer adjustmentValue) {
		this.adjustmentValue = adjustmentValue;
	}

	@Column(name = "percentage")
	public Integer getPercentage() {
		return this.percentage;
	}

	public void setPercentage(Integer percentage) {
		this.percentage = percentage;
	}

	@Column(name = "Inventory_user", length = 20)
	public String getInventoryUser() {
		return this.inventoryUser;
	}

	public void setInventoryUser(String inventoryUser) {
		this.inventoryUser = inventoryUser;
	}

	@Column(name = "approval_type")
	public Integer getApprovalType() {
		return this.approvalType;
	}

	public void setApprovalType(Integer approvalType) {
		this.approvalType = approvalType;
	}

	@Column(name = "approval_user", length = 50)
	public String getApprovalUser() {
		return this.approvalUser;
	}

	public void setApprovalUser(String approvalUser) {
		this.approvalUser = approvalUser;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CInventoryListId))
			return false;
		CInventoryListId castOther = (CInventoryListId) other;

		return ((this.getInventoryId() == castOther.getInventoryId()) || (this
				.getInventoryId() != null
				&& castOther.getInventoryId() != null && this.getInventoryId()
				.equals(castOther.getInventoryId())))
				&& ((this.getGoodsSign() == castOther.getGoodsSign()) || (this
						.getGoodsSign() != null
						&& castOther.getGoodsSign() != null && this
						.getGoodsSign().equals(castOther.getGoodsSign())))
				&& ((this.getNewGoodsSign() == castOther.getNewGoodsSign()) || (this
						.getNewGoodsSign() != null
						&& castOther.getNewGoodsSign() != null && this
						.getNewGoodsSign().equals(castOther.getNewGoodsSign())))
				&& ((this.getMaterialNo() == castOther.getMaterialNo()) || (this
						.getMaterialNo() != null
						&& castOther.getMaterialNo() != null && this
						.getMaterialNo().equals(castOther.getMaterialNo())))
				&& ((this.getInventoryVersion() == castOther
						.getInventoryVersion()) || (this.getInventoryVersion() != null
						&& castOther.getInventoryVersion() != null && this
						.getInventoryVersion().equals(
								castOther.getInventoryVersion())))
				&& ((this.getSnapshotNumber() == castOther.getSnapshotNumber()) || (this
						.getSnapshotNumber() != null
						&& castOther.getSnapshotNumber() != null && this
						.getSnapshotNumber().equals(
								castOther.getSnapshotNumber())))
				&& ((this.getUnit() == castOther.getUnit()) || (this.getUnit() != null
						&& castOther.getUnit() != null && this.getUnit()
						.equals(castOther.getUnit())))
				&& ((this.getInventoryNumber() == castOther
						.getInventoryNumber()) || (this.getInventoryNumber() != null
						&& castOther.getInventoryNumber() != null && this
						.getInventoryNumber().equals(
								castOther.getInventoryNumber())))
				&& ((this.getSonStock() == castOther.getSonStock()) || (this
						.getSonStock() != null
						&& castOther.getSonStock() != null && this
						.getSonStock().equals(castOther.getSonStock())))
				&& ((this.getGoodsPosition() == castOther.getGoodsPosition()) || (this
						.getGoodsPosition() != null
						&& castOther.getGoodsPosition() != null && this
						.getGoodsPosition()
						.equals(castOther.getGoodsPosition())))
				&& ((this.getBatch() == castOther.getBatch()) || (this
						.getBatch() != null
						&& castOther.getBatch() != null && this.getBatch()
						.equals(castOther.getBatch())))
				&& ((this.getSequence() == castOther.getSequence()) || (this
						.getSequence() != null
						&& castOther.getSequence() != null && this
						.getSequence().equals(castOther.getSequence())))
				&& ((this.getAdjustmentNumber() == castOther
						.getAdjustmentNumber()) || (this.getAdjustmentNumber() != null
						&& castOther.getAdjustmentNumber() != null && this
						.getAdjustmentNumber().equals(
								castOther.getAdjustmentNumber())))
				&& ((this.getAdjustmentValue() == castOther
						.getAdjustmentValue()) || (this.getAdjustmentValue() != null
						&& castOther.getAdjustmentValue() != null && this
						.getAdjustmentValue().equals(
								castOther.getAdjustmentValue())))
				&& ((this.getPercentage() == castOther.getPercentage()) || (this
						.getPercentage() != null
						&& castOther.getPercentage() != null && this
						.getPercentage().equals(castOther.getPercentage())))
				&& ((this.getInventoryUser() == castOther.getInventoryUser()) || (this
						.getInventoryUser() != null
						&& castOther.getInventoryUser() != null && this
						.getInventoryUser()
						.equals(castOther.getInventoryUser())))
				&& ((this.getApprovalType() == castOther.getApprovalType()) || (this
						.getApprovalType() != null
						&& castOther.getApprovalType() != null && this
						.getApprovalType().equals(castOther.getApprovalType())))
				&& ((this.getApprovalUser() == castOther.getApprovalUser()) || (this
						.getApprovalUser() != null
						&& castOther.getApprovalUser() != null && this
						.getApprovalUser().equals(castOther.getApprovalUser())));
	}

	public int hashCode() {
		int result = 17;

		result = 37
				* result
				+ (getInventoryId() == null ? 0 : this.getInventoryId()
						.hashCode());
		result = 37 * result
				+ (getGoodsSign() == null ? 0 : this.getGoodsSign().hashCode());
		result = 37
				* result
				+ (getNewGoodsSign() == null ? 0 : this.getNewGoodsSign()
						.hashCode());
		result = 37
				* result
				+ (getMaterialNo() == null ? 0 : this.getMaterialNo()
						.hashCode());
		result = 37
				* result
				+ (getInventoryVersion() == null ? 0 : this
						.getInventoryVersion().hashCode());
		result = 37
				* result
				+ (getSnapshotNumber() == null ? 0 : this.getSnapshotNumber()
						.hashCode());
		result = 37 * result
				+ (getUnit() == null ? 0 : this.getUnit().hashCode());
		result = 37
				* result
				+ (getInventoryNumber() == null ? 0 : this.getInventoryNumber()
						.hashCode());
		result = 37 * result
				+ (getSonStock() == null ? 0 : this.getSonStock().hashCode());
		result = 37
				* result
				+ (getGoodsPosition() == null ? 0 : this.getGoodsPosition()
						.hashCode());
		result = 37 * result
				+ (getBatch() == null ? 0 : this.getBatch().hashCode());
		result = 37 * result
				+ (getSequence() == null ? 0 : this.getSequence().hashCode());
		result = 37
				* result
				+ (getAdjustmentNumber() == null ? 0 : this
						.getAdjustmentNumber().hashCode());
		result = 37
				* result
				+ (getAdjustmentValue() == null ? 0 : this.getAdjustmentValue()
						.hashCode());
		result = 37
				* result
				+ (getPercentage() == null ? 0 : this.getPercentage()
						.hashCode());
		result = 37
				* result
				+ (getInventoryUser() == null ? 0 : this.getInventoryUser()
						.hashCode());
		result = 37
				* result
				+ (getApprovalType() == null ? 0 : this.getApprovalType()
						.hashCode());
		result = 37
				* result
				+ (getApprovalUser() == null ? 0 : this.getApprovalUser()
						.hashCode());
		return result;
	}

}