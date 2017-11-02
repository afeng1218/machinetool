package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CProcessProcedureVersion entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_process_procedure_version"
		, catalog = "machinetool"
)

public class CProcessProcedureVersion implements java.io.Serializable{

	// Fields

	private Integer   materialId;
	private Timestamp approveTime;
	private String    approver;
	private String    createPerson;
	private Timestamp createTime;
	private String    processVersion;
	private String    updatePerson;
	private Timestamp updateTime;

	// Constructors

	/**
	 * default constructor
	 */
	public CProcessProcedureVersion(){

	}

	/**
	 * minimal constructor
	 */
	public CProcessProcedureVersion(String processVersion){

		this.processVersion = processVersion;
	}

	/**
	 * full constructor
	 */
	public CProcessProcedureVersion(Timestamp approveTime, String approver, String createPerson, Timestamp createTime, String processVersion, String
			updatePerson, Timestamp updateTime){

		this.approveTime = approveTime;
		this.approver = approver;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.processVersion = processVersion;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
	}

	// Property accessors
	@Id
	//@GeneratedValue(strategy = IDENTITY)

	@Column(name = "material_id", unique = true, nullable = false)

	public Integer getMaterialId(){

		return this.materialId;
	}

	public void setMaterialId(Integer materialId){

		this.materialId = materialId;
	}

	@Column(name = "approve_time", length = 19)

	public Timestamp getApproveTime(){

		return this.approveTime;
	}

	public void setApproveTime(Timestamp approveTime){

		this.approveTime = approveTime;
	}

	@Column(name = "approver", length = 50)

	public String getApprover(){

		return this.approver;
	}

	public void setApprover(String approver){

		this.approver = approver;
	}

	@Column(name = "create_person", length = 50)

	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 19)

	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "process_version", nullable = false, length = 50)

	public String getProcessVersion(){

		return this.processVersion;
	}

	public void setProcessVersion(String processVersion){

		this.processVersion = processVersion;
	}

	@Column(name = "update_person", length = 50)

	public String getUpdatePerson(){

		return this.updatePerson;
	}

	public void setUpdatePerson(String updatePerson){

		this.updatePerson = updatePerson;
	}

	@Column(name = "update_time", length = 19)

	public Timestamp getUpdateTime(){

		return this.updateTime;
	}

	public void setUpdateTime(Timestamp updateTime){

		this.updateTime = updateTime;
	}

}