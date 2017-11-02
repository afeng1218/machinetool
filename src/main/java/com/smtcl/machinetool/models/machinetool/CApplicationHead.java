package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CApplicationHead entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_application_head", catalog = "machinetool")
public class CApplicationHead implements java.io.Serializable{

	// Fields

	private Integer      applicationNo;
	private String    type;
	private String    state;
	private String    writer;
	private Timestamp createTime;
	private String    createPerson;
	private String    organization;
	private String    explaining;
	/*private Set<CApplicationLine> CApplicationLines = new HashSet<CApplicationLine>(
			0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public CApplicationHead(){

	}

	/**
	 * full constructor
	 */
	public CApplicationHead(String type, String state, String writer,
	                        Timestamp createTime, String createPerson, String organization,
	                        String explaining, Set<CApplicationLine> CApplicationLines){

		this.type = type;
		this.state = state;
		this.writer = writer;
		this.createTime = createTime;
		this.createPerson = createPerson;
		this.organization = organization;
		this.explaining = explaining;
		/*this.CApplicationLines = CApplicationLines;*/
	}

	// Property accessors
	@Id
	@Column(name = "application_no", unique = true, nullable = false)
	public Integer getApplicationNo(){

		return this.applicationNo;
	}

	public void setApplicationNo(Integer applicationNo){

		this.applicationNo = applicationNo;
	}

	@Column(name = "type", length = 20)
	public String getType(){

		return this.type;
	}

	public void setType(String type){

		this.type = type;
	}

	@Column(name = "state", length = 20)
	public String getState(){

		return this.state;
	}

	public void setState(String state){

		this.state = state;
	}

	@Column(name = "writer", length = 20)
	public String getWriter(){

		return this.writer;
	}

	public void setWriter(String writer){

		this.writer = writer;
	}

	@Column(name = "create_time", length = 0)
	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "create_person", length = 20)
	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "organization", length = 50)
	public String getOrganization(){

		return this.organization;
	}

	public void setOrganization(String organization){

		this.organization = organization;
	}

	@Column(name = "explaining", length = 50)
	public String getExplaining(){

		return this.explaining;
	}

	public void setExplaining(String explaining){

		this.explaining = explaining;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CApplicationHead")
	public Set<CApplicationLine> getCApplicationLines(){

		return this.CApplicationLines;
	}

	public void setCApplicationLines(Set<CApplicationLine> CApplicationLines){

		this.CApplicationLines = CApplicationLines;
	}*/

}