package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CToolLife entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_tool_life", catalog = "machinetool")
public class CToolLife implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer productionLineId;
	private String resourceCode;
	private String toolNumber;
	private String cuttoolNo;
	private String actuaLife;

	// Constructors

	/** default constructor */
	public CToolLife() {
	}

	/** minimal constructor */
	public CToolLife(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CToolLife(Integer id, Integer productionLineId, String resourceCode,
			String toolNumber, String cuttoolNo, String actuaLife) {
		this.id = id;
		this.productionLineId = productionLineId;
		this.resourceCode = resourceCode;
		this.toolNumber = toolNumber;
		this.cuttoolNo = cuttoolNo;
		this.actuaLife = actuaLife;
	}

	// Property accessors
	@Id
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "production_line_id")
	public Integer getProductionLineId() {
		return this.productionLineId;
	}

	public void setProductionLineId(Integer productionLineId) {
		this.productionLineId = productionLineId;
	}

	@Column(name = "resource_code", length = 100)
	public String getResourceCode() {
		return this.resourceCode;
	}

	public void setResourceCode(String resourceCode) {
		this.resourceCode = resourceCode;
	}

	@Column(name = "tool_number", length = 200)
	public String getToolNumber() {
		return this.toolNumber;
	}

	public void setToolNumber(String toolNumber) {
		this.toolNumber = toolNumber;
	}

	@Column(name = "cuttool_no", length = 200)
	public String getCuttoolNo() {
		return this.cuttoolNo;
	}

	public void setCuttoolNo(String cuttoolNo) {
		this.cuttoolNo = cuttoolNo;
	}

	@Column(name = "actua_life", length = 200)
	public String getActuaLife() {
		return this.actuaLife;
	}

	public void setActuaLife(String actuaLife) {
		this.actuaLife = actuaLife;
	}

}