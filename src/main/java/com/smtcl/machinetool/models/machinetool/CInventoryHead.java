package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CInventoryHead entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_inventory_head", catalog = "machinetool")
public class CInventoryHead implements java.io.Serializable {

	// Fields

	private Integer id;
	private String inventoryName;
	private String inventoryExplain;
	private Date inventoryDate;
	private Date snapshotDate;
	private String inventoryRange;
	private String approvalControl;
	private Integer numberJust;
	private Integer numberNegative;
	private Integer valueJust;
	private Integer valueNegative;
	private Integer dynamicLabel;
	private Integer snapshotType;
	private Integer adjustmentType;
	private Date newDate;
	private String newUser;
	private Date updateDate;
	private String updateName;
	private Set<CInventoryList> CInventoryLists = new HashSet<CInventoryList>(0);

	// Constructors

	/** default constructor */
	public CInventoryHead() {
	}

	/** minimal constructor */
	public CInventoryHead(Integer id, String inventoryName) {
		this.id = id;
		this.inventoryName = inventoryName;
	}

	/** full constructor */
	public CInventoryHead(Integer id, String inventoryName,
			String inventoryExplain, Date inventoryDate, Date snapshotDate,
			String inventoryRange, String approvalControl, Integer numberJust,
			Integer numberNegative, Integer valueJust, Integer valueNegative,
			Integer dynamicLabel, Integer snapshotType, Integer adjustmentType,
			Date newDate, String newUser, Date updateDate, String updateName,
			Set<CInventoryList> CInventoryLists) {
		this.id = id;
		this.inventoryName = inventoryName;
		this.inventoryExplain = inventoryExplain;
		this.inventoryDate = inventoryDate;
		this.snapshotDate = snapshotDate;
		this.inventoryRange = inventoryRange;
		this.approvalControl = approvalControl;
		this.numberJust = numberJust;
		this.numberNegative = numberNegative;
		this.valueJust = valueJust;
		this.valueNegative = valueNegative;
		this.dynamicLabel = dynamicLabel;
		this.snapshotType = snapshotType;
		this.adjustmentType = adjustmentType;
		this.newDate = newDate;
		this.newUser = newUser;
		this.updateDate = updateDate;
		this.updateName = updateName;
		this.CInventoryLists = CInventoryLists;
	}

	// Property accessors
	@Id
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "Inventory_name", nullable = false, length = 100)
	public String getInventoryName() {
		return this.inventoryName;
	}

	public void setInventoryName(String inventoryName) {
		this.inventoryName = inventoryName;
	}

	@Column(name = "Inventory_explain")
	public String getInventoryExplain() {
		return this.inventoryExplain;
	}

	public void setInventoryExplain(String inventoryExplain) {
		this.inventoryExplain = inventoryExplain;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Inventory_date", length = 19)
	public Date getInventoryDate() {
		return this.inventoryDate;
	}

	public void setInventoryDate(Date inventoryDate) {
		this.inventoryDate = inventoryDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "snapshot_date", length = 19)
	public Date getSnapshotDate() {
		return this.snapshotDate;
	}

	public void setSnapshotDate(Date snapshotDate) {
		this.snapshotDate = snapshotDate;
	}

	@Column(name = "Inventory_range", length = 50)
	public String getInventoryRange() {
		return this.inventoryRange;
	}

	public void setInventoryRange(String inventoryRange) {
		this.inventoryRange = inventoryRange;
	}

	@Column(name = "approval_control", length = 50)
	public String getApprovalControl() {
		return this.approvalControl;
	}

	public void setApprovalControl(String approvalControl) {
		this.approvalControl = approvalControl;
	}

	@Column(name = "number_just")
	public Integer getNumberJust() {
		return this.numberJust;
	}

	public void setNumberJust(Integer numberJust) {
		this.numberJust = numberJust;
	}

	@Column(name = "number_negative")
	public Integer getNumberNegative() {
		return this.numberNegative;
	}

	public void setNumberNegative(Integer numberNegative) {
		this.numberNegative = numberNegative;
	}

	@Column(name = "value_just")
	public Integer getValueJust() {
		return this.valueJust;
	}

	public void setValueJust(Integer valueJust) {
		this.valueJust = valueJust;
	}

	@Column(name = "value_negative")
	public Integer getValueNegative() {
		return this.valueNegative;
	}

	public void setValueNegative(Integer valueNegative) {
		this.valueNegative = valueNegative;
	}

	@Column(name = "dynamic_label")
	public Integer getDynamicLabel() {
		return this.dynamicLabel;
	}

	public void setDynamicLabel(Integer dynamicLabel) {
		this.dynamicLabel = dynamicLabel;
	}

	@Column(name = "snapshot_type")
	public Integer getSnapshotType() {
		return this.snapshotType;
	}

	public void setSnapshotType(Integer snapshotType) {
		this.snapshotType = snapshotType;
	}

	@Column(name = "adjustment_type")
	public Integer getAdjustmentType() {
		return this.adjustmentType;
	}

	public void setAdjustmentType(Integer adjustmentType) {
		this.adjustmentType = adjustmentType;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "new_date", length = 19)
	public Date getNewDate() {
		return this.newDate;
	}

	public void setNewDate(Date newDate) {
		this.newDate = newDate;
	}

	@Column(name = "new_user", length = 50)
	public String getNewUser() {
		return this.newUser;
	}

	public void setNewUser(String newUser) {
		this.newUser = newUser;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date", length = 19)
	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	@Column(name = "update_name", length = 50)
	public String getUpdateName() {
		return this.updateName;
	}

	public void setUpdateName(String updateName) {
		this.updateName = updateName;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "CInventoryHead")
	public Set<CInventoryList> getCInventoryLists() {
		return this.CInventoryLists;
	}

	public void setCInventoryLists(Set<CInventoryList> CInventoryLists) {
		this.CInventoryLists = CInventoryLists;
	}

}