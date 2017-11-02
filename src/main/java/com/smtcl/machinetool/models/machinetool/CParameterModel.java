package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CParameterModel entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_parameter_model", catalog = "machinetool")
public class CParameterModel implements java.io.Serializable {

	// Fields

	private String id;
	private String category;
	private String parameterName;
	private String suggestedCuttingPar;
	private String picture;
	private Integer type;
	private String typeName;
	private String describeName;

	// Constructors

	/** default constructor */
	public CParameterModel() {
	}

	/** minimal constructor */
	public CParameterModel(String id) {
		this.id = id;
	}

	/** full constructor */
	public CParameterModel(String id, String category, String parameterName,
			String suggestedCuttingPar, String picture, Integer type,
			String typeName, String describeName) {
		this.id = id;
		this.category = category;
		this.parameterName = parameterName;
		this.suggestedCuttingPar = suggestedCuttingPar;
		this.picture = picture;
		this.type = type;
		this.typeName = typeName;
		this.describeName = describeName;
	}

	// Property accessors
	@Id
	@Column(name = "id", nullable = false)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "category")
	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Column(name = "parameter_name", length = 1000)
	public String getParameterName() {
		return this.parameterName;
	}

	public void setParameterName(String parameterName) {
		this.parameterName = parameterName;
	}

	@Column(name = "suggested_cutting_par", length = 1000)
	public String getSuggestedCuttingPar() {
		return this.suggestedCuttingPar;
	}

	public void setSuggestedCuttingPar(String suggestedCuttingPar) {
		this.suggestedCuttingPar = suggestedCuttingPar;
	}

	@Column(name = "picture", length = 1000)
	public String getPicture() {
		return this.picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Column(name = "type")
	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Column(name = "type_name", length = 1000)
	public String getTypeName() {
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	@Column(name = "describe_name", length = 1000)
	public String getDescribeName() {
		return this.describeName;
	}

	public void setDescribeName(String describeName) {
		this.describeName = describeName;
	}

}