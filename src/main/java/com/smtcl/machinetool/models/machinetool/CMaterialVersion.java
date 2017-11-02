package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * CMaterialVersion entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_material_version", catalog = "machinetool")
public class CMaterialVersion implements java.io.Serializable {

	// Fields

	private CMaterialVersionId id;
	private CGeneralMaterial CGeneralMaterial;
	private String versionExplain;
	private Timestamp startDate;
	private Integer defaultVersionOrnot;

	// Constructors

	/** default constructor */
	public CMaterialVersion() {
	}

	/** minimal constructor */
	public CMaterialVersion(CMaterialVersionId id,
			CGeneralMaterial CGeneralMaterial) {
		this.id = id;
		this.CGeneralMaterial = CGeneralMaterial;
	}

	/** full constructor */
	public CMaterialVersion(CMaterialVersionId id,
			CGeneralMaterial CGeneralMaterial, String versionExplain,
			Timestamp startDate, Integer defaultVersionOrnot) {
		this.id = id;
		this.CGeneralMaterial = CGeneralMaterial;
		this.versionExplain = versionExplain;
		this.startDate = startDate;
		this.defaultVersionOrnot = defaultVersionOrnot;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "materialId", column = @Column(name = "material_id", nullable = false)),
			@AttributeOverride(name = "materialVersionNo", column = @Column(name = "material_version_no", nullable = false, length = 20)) })
	public CMaterialVersionId getId() {
		return this.id;
	}

	public void setId(CMaterialVersionId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id", nullable = false, insertable = false, updatable = false)
	public CGeneralMaterial getCGeneralMaterial() {
		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial) {
		this.CGeneralMaterial = CGeneralMaterial;
	}

	@Column(name = "version_explain", length = 50)
	public String getVersionExplain() {
		return this.versionExplain;
	}

	public void setVersionExplain(String versionExplain) {
		this.versionExplain = versionExplain;
	}

	@Column(name = "start_date", length = 19)
	public Timestamp getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Timestamp startDate) {
		this.startDate = startDate;
	}

	@Column(name = "default_version_ornot")
	public Integer getDefaultVersionOrnot() {
		return this.defaultVersionOrnot;
	}

	public void setDefaultVersionOrnot(Integer defaultVersionOrnot) {
		this.defaultVersionOrnot = defaultVersionOrnot;
	}

}