package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * COrderAcceptId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class COrderAcceptId implements java.io.Serializable {

	// Fields

	private Integer orderNo;
	private Integer lineNo;

	// Constructors

	/** default constructor */
	public COrderAcceptId() {
	}

	/** full constructor */
	public COrderAcceptId(Integer orderNo, Integer lineNo) {
		this.orderNo = orderNo;
		this.lineNo = lineNo;
	}

	// Property accessors

	@Column(name = "order_no", nullable = false)
	public Integer getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(Integer orderNo) {
		this.orderNo = orderNo;
	}

	@Column(name = "line_no", nullable = false)
	public Integer getLineNo() {
		return this.lineNo;
	}

	public void setLineNo(Integer lineNo) {
		this.lineNo = lineNo;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof COrderAcceptId))
			return false;
		COrderAcceptId castOther = (COrderAcceptId) other;

		return ((this.getOrderNo() == castOther.getOrderNo()) || (this
				.getOrderNo() != null && castOther.getOrderNo() != null && this
				.getOrderNo().equals(castOther.getOrderNo())))
				&& ((this.getLineNo() == castOther.getLineNo()) || (this
						.getLineNo() != null && castOther.getLineNo() != null && this
						.getLineNo().equals(castOther.getLineNo())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getOrderNo() == null ? 0 : this.getOrderNo().hashCode());
		result = 37 * result
				+ (getLineNo() == null ? 0 : this.getLineNo().hashCode());
		return result;
	}

}