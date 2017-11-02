package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CAccountApply entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_account_apply", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "account"))
public class CAccountApply implements java.io.Serializable {

	// Fields

	private Integer id;
	private String account;
	private String password;
	private Timestamp applyTime;

	// Constructors

	/** default constructor */
	public CAccountApply() {
	}

	/** minimal constructor */
	public CAccountApply(String account) {
		this.account = account;
	}

	/** full constructor */
	public CAccountApply(String account, String password, Timestamp applyTime) {
		this.account = account;
		this.password = password;
		this.applyTime = applyTime;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "account", unique = true, nullable = false)
	public String getAccount() {
		return this.account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	@Column(name = "password")
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "apply_time", length = 19)
	public Timestamp getApplyTime() {
		return this.applyTime;
	}

	public void setApplyTime(Timestamp applyTime) {
		this.applyTime = applyTime;
	}

}