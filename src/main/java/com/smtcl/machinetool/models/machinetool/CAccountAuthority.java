package com.smtcl.machinetool.models.machinetool;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CAccountAuthority entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_account_authority", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "function_node"))
public class CAccountAuthority implements java.io.Serializable{

	// Fields

	private CAccountAuthorityId id;
	private CAuthorityMenu      CAuthorityMenu;
	private String              function;
	private Integer             authority;
	private Integer             isAdmin;

	// Constructors

	/**
	 * default constructor
	 */
	public CAccountAuthority(){

	}

	/**
	 * minimal constructor
	 */
	public CAccountAuthority(CAccountAuthorityId id,
	                         CAuthorityMenu CAuthorityMenu, Integer authority, Integer isAdmin){

		this.id = id;
		this.CAuthorityMenu = CAuthorityMenu;
		this.authority = authority;
		this.isAdmin = isAdmin;
	}

	/**
	 * full constructor
	 */
	public CAccountAuthority(CAccountAuthorityId id,
	                         CAuthorityMenu CAuthorityMenu, String function, Integer authority,
	                         Integer isAdmin){

		this.id = id;
		this.CAuthorityMenu = CAuthorityMenu;
		this.function = function;
		this.authority = authority;
		this.isAdmin = isAdmin;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "account", column = @Column(name = "account", nullable = false)),
			@AttributeOverride(name = "functionNode", column = @Column(name = "function_node", unique = true, nullable = false))})
	public CAccountAuthorityId getId(){

		return this.id;
	}

	public void setId(CAccountAuthorityId id){

		this.id = id;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "function_node", unique = true, nullable = false, insertable = false, updatable = false)
	public CAuthorityMenu getCAuthorityMenu(){

		return this.CAuthorityMenu;
	}

	public void setCAuthorityMenu(CAuthorityMenu CAuthorityMenu){

		this.CAuthorityMenu = CAuthorityMenu;
	}

	@Column(name = "_function")
	public String getFunction(){

		return this.function;
	}

	public void setFunction(String function){

		this.function = function;
	}

	@Column(name = "authority", nullable = false)
	public Integer getAuthority(){

		return this.authority;
	}

	public void setAuthority(Integer authority){

		this.authority = authority;
	}

	@Column(name = "isAdmin", nullable = false)
	public Integer getIsAdmin(){

		return this.isAdmin;
	}

	public void setIsAdmin(Integer isAdmin){

		this.isAdmin = isAdmin;
	}

}