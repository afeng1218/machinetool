package com.smtcl.machinetool.models.machinetool;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CMaterialParameter entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_material_parameter", catalog = "machinetool")
public class CMaterialParameter implements java.io.Serializable {

	// Fields

	private CMaterialParameterId id;
	private String parameterValue;
	private Integer class_;

	// Constructors

	/** default constructor */
	public CMaterialParameter() {
	}

	/** minimal constructor */
	public CMaterialParameter(CMaterialParameterId id) {
		this.id = id;
	}

	/** full constructor */
	public CMaterialParameter(CMaterialParameterId id, String parameterValue,
			Integer class_) {
		this.id = id;
		this.parameterValue = parameterValue;
		this.class_ = class_;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "id", column = @Column(name = "_id", nullable = false)),
			@AttributeOverride(name = "parameterName", column = @Column(name = "parameter_name", nullable = false)),
			@AttributeOverride(name = "type", column = @Column(name = "_type", nullable = false)) })
	public CMaterialParameterId getId() {
		return this.id;
	}

	public void setId(CMaterialParameterId id) {
		this.id = id;
	}

	@Column(name = "parameter_value")
	public String getParameterValue() {
		return this.parameterValue;
	}

	public void setParameterValue(String parameterValue) {
		this.parameterValue = parameterValue;
	}

	@Column(name = "_class")
	public Integer getClass_() {
		return this.class_;
	}

	public void setClass_(Integer class_) {
		this.class_ = class_;
	}

}