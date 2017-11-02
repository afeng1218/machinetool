package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CAgreement entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_agreement", catalog = "machinetool")
public class CAgreement implements java.io.Serializable {

	// Fields

	private CAgreementId id;
	private String materialNo;
	private Integer unitPrice;
	private String createPerson;
	private Timestamp createTime;
	private String rowType;
	private String state;
	private Integer issueNumber;
	private Integer issueMoney;
	private Timestamp updateTime;
	private String brand;

	// Constructors

	/** default constructor */
	public CAgreement() {
	}

	/** minimal constructor */
	public CAgreement(CAgreementId id) {
		this.id = id;
	}

	/** full constructor */
	public CAgreement(CAgreementId id, String materialNo, Integer unitPrice,
			String createPerson, Timestamp createTime, String rowType,
			String state, Integer issueNumber, Integer issueMoney,
			Timestamp updateTime, String brand) {
		this.id = id;
		this.materialNo = materialNo;
		this.unitPrice = unitPrice;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.rowType = rowType;
		this.state = state;
		this.issueNumber = issueNumber;
		this.issueMoney = issueMoney;
		this.updateTime = updateTime;
		this.brand = brand;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "orderCode", column = @Column(name = "order_code", nullable = false)),
			@AttributeOverride(name = "rowNumber", column = @Column(name = "row_number", nullable = false)) })
	public CAgreementId getId() {
		return this.id;
	}

	public void setId(CAgreementId id) {
		this.id = id;
	}

	@Column(name = "material_no")
	public String getMaterialNo() {
		return this.materialNo;
	}

	public void setMaterialNo(String materialNo) {
		this.materialNo = materialNo;
	}

	@Column(name = "unit_price")
	public Integer getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Column(name = "create_person", length = 20)
	public String getCreatePerson() {
		return this.createPerson;
	}

	public void setCreatePerson(String createPerson) {
		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 0)
	public Timestamp getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	@Column(name = "row_type", length = 10)
	public String getRowType() {
		return this.rowType;
	}

	public void setRowType(String rowType) {
		this.rowType = rowType;
	}

	@Column(name = "state", length = 15)
	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Column(name = "issue_number")
	public Integer getIssueNumber() {
		return this.issueNumber;
	}

	public void setIssueNumber(Integer issueNumber) {
		this.issueNumber = issueNumber;
	}

	@Column(name = "issue_money")
	public Integer getIssueMoney() {
		return this.issueMoney;
	}

	public void setIssueMoney(Integer issueMoney) {
		this.issueMoney = issueMoney;
	}

	@Column(name = "update_time", length = 0)
	public Timestamp getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "brand", length = 20)
	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

}