package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CSolidCuttoolParameterId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CSolidCuttoolParameterId implements java.io.Serializable {

	// Fields

	private Integer cuttoolId;
	private String parameter;

	// Constructors

	/** default constructor */
	public CSolidCuttoolParameterId() {
	}

	/** full constructor */
	public CSolidCuttoolParameterId(Integer cuttoolId, String parameter) {
		this.cuttoolId = cuttoolId;
		this.parameter = parameter;
	}

	// Property accessors

	@Column(name = "cuttool_id", nullable = false)
	public Integer getCuttoolId() {
		return this.cuttoolId;
	}

	public void setCuttoolId(Integer cuttoolId) {
		this.cuttoolId = cuttoolId;
	}

	@Column(name = "parameter", nullable = false)
	public String getParameter() {
		return this.parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CSolidCuttoolParameterId))
			return false;
		CSolidCuttoolParameterId castOther = (CSolidCuttoolParameterId) other;

		return ((this.getCuttoolId() == castOther.getCuttoolId()) || (this
				.getCuttoolId() != null && castOther.getCuttoolId() != null && this
				.getCuttoolId().equals(castOther.getCuttoolId())))
				&& ((this.getParameter() == castOther.getParameter()) || (this
						.getParameter() != null
						&& castOther.getParameter() != null && this
						.getParameter().equals(castOther.getParameter())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getCuttoolId() == null ? 0 : this.getCuttoolId().hashCode());
		result = 37 * result
				+ (getParameter() == null ? 0 : this.getParameter().hashCode());
		return result;
	}

}