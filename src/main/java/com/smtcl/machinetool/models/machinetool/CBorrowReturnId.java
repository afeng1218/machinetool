package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CBorrowReturnId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CBorrowReturnId implements java.io.Serializable{

	// Fields

	private Integer borrowCode;
	private Integer rownum;

	// Constructors

	/**
	 * default constructor
	 */
	public CBorrowReturnId(){

	}

	/**
	 * full constructor
	 */
	public CBorrowReturnId(Integer borrowCode, Integer rownum){

		this.borrowCode = borrowCode;
		this.rownum = rownum;
	}

	// Property accessors

	@Column(name = "borrow_code", nullable = false)
	public Integer getBorrowCode(){

		return this.borrowCode;
	}

	public void setBorrowCode(Integer borrowCode){

		this.borrowCode = borrowCode;
	}

	@Column(name = "rownum", nullable = false)
	public Integer getRownum(){

		return this.rownum;
	}

	public void setRownum(Integer rownum){

		this.rownum = rownum;
	}

	public boolean equals(Object other){

		if ((this == other)){
			return true;
		}
		if ((other == null)){
			return false;
		}
		if (!(other instanceof CBorrowReturnId)){
			return false;
		}
		CBorrowReturnId castOther = (CBorrowReturnId) other;

		return ((this.getBorrowCode() == castOther.getBorrowCode()) || (this
				.getBorrowCode() != null && castOther.getBorrowCode() != null && this
				.getBorrowCode().equals(castOther.getBorrowCode())))
				&& ((this.getRownum() == castOther.getRownum()) || (this
				.getRownum() != null && castOther.getRownum() != null && this
				.getRownum().equals(castOther.getRownum())));
	}

	public int hashCode(){

		int result = 17;

		result = 37
				* result
				+ (getBorrowCode() == null ? 0 : this.getBorrowCode()
				.hashCode());
		result = 37 * result
				+ (getRownum() == null ? 0 : this.getRownum().hashCode());
		return result;
	}

}