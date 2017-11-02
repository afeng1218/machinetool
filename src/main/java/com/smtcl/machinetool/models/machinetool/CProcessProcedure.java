package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CProcessProcedure entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_process_procedure"
		, catalog = "machinetool"
)

public class CProcessProcedure implements java.io.Serializable{

	// Fields

	private Integer   materialId;
	private String    processVersion;
	private Integer   process;
	private String    processName;
	private String    processDescription;
	private String    programName;
	private String    cuttollMagazineType;
	private String    fixtureId;
	private String    usingEquipment;
	private String    usingEquipmentTeam;
	private Integer   runtime;
	private String    createPerson;
	private Timestamp createTime;
	private String    updatePerson;
	private Timestamp updateTime;

	// Constructors

	/**
	 * default constructor
	 */
	public CProcessProcedure(){

	}

	/**
	 * minimal constructor
	 */
	public CProcessProcedure(String processVersion, Integer process){

		this.processVersion = processVersion;
		this.process = process;
	}

	/**
	 * full constructor
	 */
	public CProcessProcedure(String processVersion, Integer process, String processName, String processDescription, String programName, String
			cuttollMagazineType, String fixtureId, String usingEquipment, String usingEquipmentTeam, Integer runtime, String createPerson,
                             Timestamp createTime, String updatePerson, Timestamp updateTime, String processDiagram){

		this.processVersion = processVersion;
		this.process = process;
		this.processName = processName;
		this.processDescription = processDescription;
		this.programName = programName;
		this.cuttollMagazineType = cuttollMagazineType;
		this.fixtureId = fixtureId;
		this.usingEquipment = usingEquipment;
		this.usingEquipmentTeam = usingEquipmentTeam;
		this.runtime = runtime;
		this.createPerson = createPerson;
		this.createTime = createTime;
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

	@Column(name = "process_version", nullable = false, length = 50)

	public String getProcessVersion(){

		return this.processVersion;
	}

	public void setProcessVersion(String processVersion){

		this.processVersion = processVersion;
	}

	@Column(name = "process", nullable = false)

	public Integer getProcess(){

		return this.process;
	}

	public void setProcess(Integer process){

		this.process = process;
	}

	@Column(name = "process_name", length = 100)

	public String getProcessName(){

		return this.processName;
	}

	public void setProcessName(String processName){

		this.processName = processName;
	}

	@Column(name = "process_description", length = 100)

	public String getProcessDescription(){

		return this.processDescription;
	}

	public void setProcessDescription(String processDescription){

		this.processDescription = processDescription;
	}

	@Column(name = "program_name", length = 100)

	public String getProgramName(){

		return this.programName;
	}

	public void setProgramName(String programName){

		this.programName = programName;
	}

	@Column(name = "cuttoll_magazine_type", length = 50)

	public String getCuttollMagazineType(){

		return this.cuttollMagazineType;
	}

	public void setCuttollMagazineType(String cuttollMagazineType){

		this.cuttollMagazineType = cuttollMagazineType;
	}

	@Column(name = "fixture_id", length = 100)

	public String getFixtureId(){

		return this.fixtureId;
	}

	public void setFixtureId(String fixtureId){

		this.fixtureId = fixtureId;
	}

	@Column(name = "using_equipment")

	public String getUsingEquipment(){

		return this.usingEquipment;
	}

	public void setUsingEquipment(String usingEquipment){

		this.usingEquipment = usingEquipment;
	}

	@Column(name = "using_equipment_team")

	public String getUsingEquipmentTeam(){

		return this.usingEquipmentTeam;
	}

	public void setUsingEquipmentTeam(String usingEquipmentTeam){

		this.usingEquipmentTeam = usingEquipmentTeam;
	}

	@Column(name = "runtime")

	public Integer getRuntime(){

		return this.runtime;
	}

	public void setRuntime(Integer runtime){

		this.runtime = runtime;
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