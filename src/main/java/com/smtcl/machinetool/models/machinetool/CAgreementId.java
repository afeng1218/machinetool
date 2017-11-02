package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CAgreementId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CAgreementId implements java.io.Serializable {

	// Fields

	private Long orderCode;
	private Integer rowNumber;

	// Constructors

	/** default constructor */
	public CAgreementId() {
	}

	/** full constructor */
	public CAgreementId(Long orderCode, Integer rowNumber) {
		this.orderCode = orderCode;
		this.rowNumber = rowNumber;
	}

	// Property accessors

	@Column(name = "order_code", nullable = false)
	public Long getOrderCode() {
		return this.orderCode;
	}

	public void setOrderCode(Long orderCode) {
		this.orderCode = orderCode;
	}

	@Column(name = "row_number", nullable = false)
	public Integer getRowNumber() {
		return this.rowNumber;
	}

	public void setRowNumber(Integer rowNumber) {
		this.rowNumber = rowNumber;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CAgreementId))
			return false;
		CAgreementId castOther = (CAgreementId) other;

		return ((this.getOrderCode() == castOther.getOrderCode()) || (this
				.getOrderCode() != null && castOther.getOrderCode() != null && this
				.getOrderCode().equals(castOther.getOrderCode())))
				&& ((this.getRowNumber() == castOther.getRowNumber()) || (this
						.getRowNumber() != null
						&& castOther.getRowNumber() != null && this
						.getRowNumber().equals(castOther.getRowNumber())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getOrderCode() == null ? 0 : this.getOrderCode().hashCode());
		result = 37 * result
				+ (getRowNumber() == null ? 0 : this.getRowNumber().hashCode());
		return result;
	}

}