package com.smtcl.machinetool.models.machinetool;

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

/**
 * CSequenceList entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_sequence_list", catalog = "machinetool")
public class CSequenceList implements java.io.Serializable {

	// Fields

	private Integer sequenceId;
	private CGeneralMaterial CGeneralMaterial;
	private String sequenceNo;
	private String supplierSequence;
	private String sequenceStatus;
	/*private Set<CStockList> CStockLists = new HashSet<CStockList>(0);
	private Set<CMaterialAffairsHandle> CMaterialAffairsHandles = new HashSet<CMaterialAffairsHandle>(
			0);*/

	// Constructors

	/** default constructor */
	public CSequenceList() {
	}

	/** full constructor */
	public CSequenceList(CGeneralMaterial CGeneralMaterial, String sequenceNo,
			String supplierSequence, String sequenceStatus,
			//Set<CStockList> CStockLists,
			Set<CMaterialAffairsHandle> CMaterialAffairsHandles) {
		this.CGeneralMaterial = CGeneralMaterial;
		this.sequenceNo = sequenceNo;
		this.supplierSequence = supplierSequence;
		this.sequenceStatus = sequenceStatus;
		/*this.CStockLists = CStockLists;
		this.CMaterialAffairsHandles = CMaterialAffairsHandles;*/
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "sequence_id", unique = true, nullable = false)
	public Integer getSequenceId() {
		return this.sequenceId;
	}

	public void setSequenceId(Integer sequenceId) {
		this.sequenceId = sequenceId;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")
	public CGeneralMaterial getCGeneralMaterial() {
		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial) {
		this.CGeneralMaterial = CGeneralMaterial;
	}

	@Column(name = "sequence_no", length = 50)
	public String getSequenceNo() {
		return this.sequenceNo;
	}

	public void setSequenceNo(String sequenceNo) {
		this.sequenceNo = sequenceNo;
	}

	@Column(name = "supplier_sequence", length = 50)
	public String getSupplierSequence() {
		return this.supplierSequence;
	}

	public void setSupplierSequence(String supplierSequence) {
		this.supplierSequence = supplierSequence;
	}

	@Column(name = "sequence_status", length = 10)
	public String getSequenceStatus() {
		return this.sequenceStatus;
	}

	public void setSequenceStatus(String sequenceStatus) {
		this.sequenceStatus = sequenceStatus;
	}

/*	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CSequenceList")
	public Set<CStockList> getCStockLists() {
		return this.CStockLists;
	}

	public void setCStockLists(Set<CStockList> CStockLists) {
		this.CStockLists = CStockLists;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CSequenceList")
	public Set<CMaterialAffairsHandle> getCMaterialAffairsHandles() {
		return this.CMaterialAffairsHandles;
	}

	public void setCMaterialAffairsHandles(
			Set<CMaterialAffairsHandle> CMaterialAffairsHandles) {
		this.CMaterialAffairsHandles = CMaterialAffairsHandles;
	}*/

}