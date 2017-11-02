package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CMaterialVersionId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CMaterialVersionId implements java.io.Serializable {

	// Fields

	private Integer materialId;
	private String materialVersionNo;

	// Constructors

	/** default constructor */
	public CMaterialVersionId() {
	}

	/** full constructor */
	public CMaterialVersionId(Integer materialId, String materialVersionNo) {
		this.materialId = materialId;
		this.materialVersionNo = materialVersionNo;
	}

	// Property accessors

	@Column(name = "material_id", nullable = false)
	public Integer getMaterialId() {
		return this.materialId;
	}

	public void setMaterialId(Integer materialId) {
		this.materialId = materialId;
	}

	@Column(name = "material_version_no", nullable = false, length = 20)
	public String getMaterialVersionNo() {
		return this.materialVersionNo;
	}

	public void setMaterialVersionNo(String materialVersionNo) {
		this.materialVersionNo = materialVersionNo;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CMaterialVersionId))
			return false;
		CMaterialVersionId castOther = (CMaterialVersionId) other;

		return ((this.getMaterialId() == castOther.getMaterialId()) || (this
				.getMaterialId() != null && castOther.getMaterialId() != null && this
				.getMaterialId().equals(castOther.getMaterialId())))
				&& ((this.getMaterialVersionNo() == castOther
						.getMaterialVersionNo()) || (this
						.getMaterialVersionNo() != null
						&& castOther.getMaterialVersionNo() != null && this
						.getMaterialVersionNo().equals(
								castOther.getMaterialVersionNo())));
	}

	public int hashCode() {
		int result = 17;

		result = 37
				* result
				+ (getMaterialId() == null ? 0 : this.getMaterialId()
						.hashCode());
		result = 37
				* result
				+ (getMaterialVersionNo() == null ? 0 : this
						.getMaterialVersionNo().hashCode());
		return result;
	}

}