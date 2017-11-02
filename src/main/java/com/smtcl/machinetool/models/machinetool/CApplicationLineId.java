package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CApplicationLineId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CApplicationLineId implements java.io.Serializable{

	// Fields

	private Integer    applicationNo;
	private Integer lineNo;

	// Constructors

	/**
	 * default constructor
	 */
	public CApplicationLineId(){

	}

	/**
	 * full constructor
	 */
	public CApplicationLineId(Integer applicationNo, Integer lineNo){

		this.applicationNo = applicationNo;
		this.lineNo = lineNo;
	}

	// Property accessors

	@Column(name = "application_no", nullable = false)
	public Integer getApplicationNo(){

		return this.applicationNo;
	}

	public void setApplicationNo(Integer applicationNo){

		this.applicationNo = applicationNo;
	}

	@Column(name = "line_no", nullable = false)
	public Integer getLineNo(){

		return this.lineNo;
	}

	public void setLineNo(Integer lineNo){

		this.lineNo = lineNo;
	}

	public boolean equals(Object other){

		if ((this == other)){
			return true;
		}
		if ((other == null)){
			return false;
		}
		if (!(other instanceof CApplicationLineId)){
			return false;
		}
		CApplicationLineId castOther = (CApplicationLineId) other;

		return ((this.getApplicationNo() == castOther.getApplicationNo()) || (this
				.getApplicationNo() != null
				&& castOther.getApplicationNo() != null && this
				.getApplicationNo().equals(castOther.getApplicationNo())))
				&& ((this.getLineNo() == castOther.getLineNo()) || (this
				.getLineNo() != null && castOther.getLineNo() != null && this
				.getLineNo().equals(castOther.getLineNo())));
	}

	public int hashCode(){

		int result = 17;

		result = 37
				* result
				+ (getApplicationNo() == null ? 0 : this.getApplicationNo()
				.hashCode());
		result = 37 * result
				+ (getLineNo() == null ? 0 : this.getLineNo().hashCode());
		return result;
	}

}