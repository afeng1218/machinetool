package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CSupplier entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_supplier"
		, catalog = "machinetool"
)

public class CSupplier implements java.io.Serializable{

	// Fields

	private Integer   supplierCode;
	private String    supplier;
	private Float     taxRate;
	private String    address;
	private String    city;
	private String    province;
	private String    contacts;
	private String    contactInformation;
	private String    createPerson;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;
	/*private Set<COrderHead> COrderHeads = new HashSet<COrderHead>(0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public CSupplier(){

	}

	/**
	 * minimal constructor
	 */
	public CSupplier(String supplier, Float taxRate){

		this.supplier = supplier;
		this.taxRate = taxRate;
	}

	/**
	 * full constructor
	 */
	public CSupplier(String supplier, Float taxRate, String address, String city, String province, String contacts, String contactInformation,
	                 String createPerson, Timestamp createTime, String updatePerson, Timestamp updateTime, Set<COrderHead> COrderHeads){

		this.supplier = supplier;
		this.taxRate = taxRate;
		this.address = address;
		this.city = city;
		this.province = province;
		this.contacts = contacts;
		this.contactInformation = contactInformation;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		/*this.COrderHeads = COrderHeads;*/
	}

	// Property accessors
	@Id
	@Column(name = "supplier_code", unique = true, nullable = false)

	public Integer getSupplierCode(){

		return this.supplierCode;
	}

	public void setSupplierCode(Integer supplierCode){

		this.supplierCode = supplierCode;
	}

	@Column(name = "supplier", nullable = false)

	public String getSupplier(){

		return this.supplier;
	}

	public void setSupplier(String supplier){

		this.supplier = supplier;
	}

	@Column(name = "tax_rate", nullable = false, precision = 12, scale = 0)

	public Float getTaxRate(){

		return this.taxRate;
	}

	public void setTaxRate(Float taxRate){

		this.taxRate = taxRate;
	}

	@Column(name = "address")

	public String getAddress(){

		return this.address;
	}

	public void setAddress(String address){

		this.address = address;
	}

	@Column(name = "city")

	public String getCity(){

		return this.city;
	}

	public void setCity(String city){

		this.city = city;
	}

	@Column(name = "province")

	public String getProvince(){

		return this.province;
	}

	public void setProvince(String province){

		this.province = province;
	}

	@Column(name = "contacts", length = 30)

	public String getContacts(){

		return this.contacts;
	}

	public void setContacts(String contacts){

		this.contacts = contacts;
	}

	@Column(name = "contact_information", length = 50)

	public String getContactInformation(){

		return this.contactInformation;
	}

	public void setContactInformation(String contactInformation){

		this.contactInformation = contactInformation;
	}

	@Column(name = "create_person", length = 30)

	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 19)

	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "update_person", length = 30)

	public String getUpdatePerson(){

		return this.updatePerson;
	}

	public void setUpdatePerson(String updatePerson){

		this.updatePerson = updatePerson;
	}

	@Column(name = "update_time", length = 19)

	public Timestamp getUpdateTime(){

		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime){

		this.updateTime = updateTime;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CSupplier")

	public Set<COrderHead> getCOrderHeads(){

		return this.COrderHeads;
	}

	public void setCOrderHeads(Set<COrderHead> COrderHeads){

		this.COrderHeads = COrderHeads;
	}*/

}