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

/**
 * CSolidCuttoolParameter entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_solid_cuttool_parameter", catalog = "machinetool")
public class CSolidCuttoolParameter implements java.io.Serializable {

	// Fields

	private CSolidCuttoolParameterId id;
	private CCuttoolBasedata CCuttoolBasedata;
	private Float value;
	private Integer totalClass;

	// Constructors

	/** default constructor */
	public CSolidCuttoolParameter() {
	}

	/** minimal constructor */
	public CSolidCuttoolParameter(CSolidCuttoolParameterId id,
			CCuttoolBasedata CCuttoolBasedata, Integer totalClass) {
		this.id = id;
		this.CCuttoolBasedata = CCuttoolBasedata;
		this.totalClass = totalClass;
	}

	/** full constructor */
	public CSolidCuttoolParameter(CSolidCuttoolParameterId id,
			CCuttoolBasedata CCuttoolBasedata, Float value, Integer totalClass) {
		this.id = id;
		this.CCuttoolBasedata = CCuttoolBasedata;
		this.value = value;
		this.totalClass = totalClass;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "cuttoolId", column = @Column(name = "cuttool_id", nullable = false)),
			@AttributeOverride(name = "parameter", column = @Column(name = "parameter", nullable = false)) })
	public CSolidCuttoolParameterId getId() {
		return this.id;
	}

	public void setId(CSolidCuttoolParameterId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cuttool_id", nullable = false, insertable = false, updatable = false)
	public CCuttoolBasedata getCCuttoolBasedata() {
		return this.CCuttoolBasedata;
	}

	public void setCCuttoolBasedata(CCuttoolBasedata CCuttoolBasedata) {
		this.CCuttoolBasedata = CCuttoolBasedata;
	}

	@Column(name = "value", precision = 15, scale = 7)
	public Float getValue() {
		return this.value;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	@Column(name = "total_class", nullable = false)
	public Integer getTotalClass() {
		return this.totalClass;
	}

	public void setTotalClass(Integer totalClass) {
		this.totalClass = totalClass;
	}

}