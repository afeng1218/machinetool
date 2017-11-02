package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CAccountAuthorityId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CAccountAuthorityId implements java.io.Serializable{

	// Fields

	private String  account;
	private Integer functionNode;

	// Constructors

	/**
	 * default constructor
	 */
	public CAccountAuthorityId(){

	}

	/**
	 * full constructor
	 */
	public CAccountAuthorityId(String account, Integer functionNode){

		this.account = account;
		this.functionNode = functionNode;
	}

	// Property accessors

	@Column(name = "account", nullable = false)
	public String getAccount(){

		return this.account;
	}

	public void setAccount(String account){

		this.account = account;
	}

	@Column(name = "function_node", unique = true, nullable = false)
	public Integer getFunctionNode(){

		return this.functionNode;
	}

	public void setFunctionNode(Integer functionNode){

		this.functionNode = functionNode;
	}

	public boolean equals(Object other){

		if ((this == other)){
			return true;
		}
		if ((other == null)){
			return false;
		}
		if (!(other instanceof CAccountAuthorityId)){
			return false;
		}
		CAccountAuthorityId castOther = (CAccountAuthorityId) other;

		return ((this.getAccount() == castOther.getAccount()) || (this
				.getAccount() != null && castOther.getAccount() != null && this
				.getAccount().equals(castOther.getAccount())))
				&& ((this.getFunctionNode() == castOther.getFunctionNode()) || (this
				.getFunctionNode() != null
				&& castOther.getFunctionNode() != null && this
				.getFunctionNode().equals(castOther.getFunctionNode())));
	}

	public int hashCode(){

		int result = 17;

		result = 37 * result
				+ (getAccount() == null ? 0 : this.getAccount().hashCode());
		result = 37
				* result
				+ (getFunctionNode() == null ? 0 : this.getFunctionNode()
				.hashCode());
		return result;
	}

}