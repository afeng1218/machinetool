package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CBatchList entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_batch_list", catalog = "machinetool")
public class CBatchList implements java.io.Serializable {

	// Fields

	private Integer batchId;
	private CGeneralMaterial CGeneralMaterial;
	private String batchNo;
	private Timestamp expiryDate;
	private String supplierBatch;
	private Date enableDate;
	private Integer validDays;
	/*private Set<CMaterialAffairsHandle> CMaterialAffairsHandles = new HashSet<CMaterialAffairsHandle>(
			0);
	private Set<CStockList> CStockLists = new HashSet<CStockList>(0);*/

	// Constructors

	/** default constructor */
	public CBatchList() {
	}

	/** full constructor */
	public CBatchList(CGeneralMaterial CGeneralMaterial, String batchNo,
			Timestamp expiryDate, String supplierBatch, Date enableDate,
			Integer validDays,
			Set<CMaterialAffairsHandle> CMaterialAffairsHandles
			/*Set<CStockList> CStockLists*/) {
		this.CGeneralMaterial = CGeneralMaterial;
		this.batchNo = batchNo;
		this.expiryDate = expiryDate;
		this.supplierBatch = supplierBatch;
		this.enableDate = enableDate;
		this.validDays = validDays;
		/*this.CMaterialAffairsHandles = CMaterialAffairsHandles;
		this.CStockLists = CStockLists;*/
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "batch_id", unique = true, nullable = false)
	public Integer getBatchId() {
		return this.batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")
	public CGeneralMaterial getCGeneralMaterial() {
		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial) {
		this.CGeneralMaterial = CGeneralMaterial;
	}

	@Column(name = "batch_no")
	public String getBatchNo() {
		return this.batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	@Column(name = "expiry_date", length = 19)
	public Timestamp getExpiryDate() {
		return this.expiryDate;
	}

	public void setExpiryDate(Timestamp expiryDate) {
		this.expiryDate = expiryDate;
	}

	@Column(name = "supplier_batch")
	public String getSupplierBatch() {
		return this.supplierBatch;
	}

	public void setSupplierBatch(String supplierBatch) {
		this.supplierBatch = supplierBatch;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "enable_date", length = 10)
	public Date getEnableDate() {
		return this.enableDate;
	}

	public void setEnableDate(Date enableDate) {
		this.enableDate = enableDate;
	}

	@Column(name = "valid_days")
	public Integer getValidDays() {
		return this.validDays;
	}

	public void setValidDays(Integer validDays) {
		this.validDays = validDays;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CBatchList")
	public Set<CMaterialAffairsHandle> getCMaterialAffairsHandles() {
		return this.CMaterialAffairsHandles;
	}

	public void setCMaterialAffairsHandles(
			Set<CMaterialAffairsHandle> CMaterialAffairsHandles) {
		this.CMaterialAffairsHandles = CMaterialAffairsHandles;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CBatchList")
	public Set<CStockList> getCStockLists() {
		return this.CStockLists;
	}

	public void setCStockLists(Set<CStockList> CStockLists) {
		this.CStockLists = CStockLists;
	}*/

}