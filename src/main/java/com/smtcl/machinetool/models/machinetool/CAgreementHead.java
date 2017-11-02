package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CAgreementHead entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_agreement_head", catalog = "machinetool")
public class CAgreementHead implements java.io.Serializable{

	// Fields

	private Integer   id;
	private Long      orderCode;
	private Integer   versionNo;
	private String    buyer;
	private String    byUnilateral;
	private Double    sentAmount;
	private String    supplierName;
	private Integer   supplierCode;
	private String    status;
	private String    createPerson;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;

	// Constructors

	/**
	 * default constructor
	 */
	public CAgreementHead(){

	}

	/**
	 * minimal constructor
	 */
	public CAgreementHead(Long orderCode, Integer versionNo, String buyer,
	                      String supplierName, Integer supplierCode){

		this.orderCode = orderCode;
		this.versionNo = versionNo;
		this.buyer = buyer;
		this.supplierName = supplierName;
		this.supplierCode = supplierCode;
	}

	/**
	 * full constructor
	 */
	public CAgreementHead(Long orderCode, Integer versionNo, String buyer,
	                      String byUnilateral, Double sentAmount, String supplierName,
	                      Integer supplierCode, String status, String createPerson,
	                      Timestamp createTime, String updatePerson, Timestamp updateTime){

		this.orderCode = orderCode;
		this.versionNo = versionNo;
		this.buyer = buyer;
		this.byUnilateral = byUnilateral;
		this.sentAmount = sentAmount;
		this.supplierName = supplierName;
		this.supplierCode = supplierCode;
		this.status = status;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId(){

		return this.id;
	}

	public void setId(Integer id){

		this.id = id;
	}

	@Column(name = "order_code", nullable = false)
	public Long getOrderCode(){

		return this.orderCode;
	}

	public void setOrderCode(Long orderCode){

		this.orderCode = orderCode;
	}

	@Column(name = "version_no", nullable = false)
	public Integer getVersionNo(){

		return this.versionNo;
	}

	public void setVersionNo(Integer versionNo){

		this.versionNo = versionNo;
	}

	@Column(name = "buyer", nullable = false, length = 50)
	public String getBuyer(){

		return this.buyer;
	}

	public void setBuyer(String buyer){

		this.buyer = buyer;
	}

	@Column(name = "by_unilateral", length = 50)
	public String getByUnilateral(){

		return this.byUnilateral;
	}

	public void setByUnilateral(String byUnilateral){

		this.byUnilateral = byUnilateral;
	}

	@Column(name = "sent_amount", precision = 15, scale = 7)
	public Double getSentAmount(){

		return this.sentAmount;
	}

	public void setSentAmount(Double sentAmount){

		this.sentAmount = sentAmount;
	}

	@Column(name = "supplier_name", nullable = false)
	public String getSupplierName(){

		return this.supplierName;
	}

	public void setSupplierName(String supplierName){

		this.supplierName = supplierName;
	}

	@Column(name = "supplier_code", nullable = false)
	public Integer getSupplierCode(){

		return this.supplierCode;
	}

	public void setSupplierCode(Integer supplierCode){

		this.supplierCode = supplierCode;
	}

	@Column(name = "status", length = 50)
	public String getStatus(){

		return this.status;
	}

	public void setStatus(String status){

		this.status = status;
	}

	@Column(name = "create_person", length = 50)
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

	@Column(name = "update_person", length = 50)
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

}