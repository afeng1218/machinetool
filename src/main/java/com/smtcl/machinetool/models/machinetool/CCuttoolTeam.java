package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CCuttoolTeam entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_team"
		, catalog = "machinetool"
)

public class CCuttoolTeam implements java.io.Serializable{

	// Fields

	private String  cuttoolTeamId;
	private String  cuttoolTeamDescription;
	private Integer cuttoolId;
	private Integer priority;

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolTeam(){

	}

	/**
	 * full constructor
	 */
	public CCuttoolTeam(String cuttoolTeamDescription, Integer cuttoolId, Integer priority){

		this.cuttoolTeamDescription = cuttoolTeamDescription;
		this.cuttoolId = cuttoolId;
		this.priority = priority;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "cuttool_team_id", unique = true, nullable = false)

	public String getCuttoolTeamId(){

		return this.cuttoolTeamId;
	}

	public void setCuttoolTeamId(String cuttoolTeamId){

		this.cuttoolTeamId = cuttoolTeamId;
	}

	@Column(name = "cuttool_team_description")

	public String getCuttoolTeamDescription(){

		return this.cuttoolTeamDescription;
	}

	public void setCuttoolTeamDescription(String cuttoolTeamDescription){

		this.cuttoolTeamDescription = cuttoolTeamDescription;
	}

	@Column(name = "cuttool_id")

	public Integer getCuttoolId(){

		return this.cuttoolId;
	}

	public void setCuttoolId(Integer cuttoolId){

		this.cuttoolId = cuttoolId;
	}

	@Column(name = "priority")

	public Integer getPriority(){

		return this.priority;
	}

	public void setPriority(Integer priority){

		this.priority = priority;
	}

}