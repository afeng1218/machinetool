package com.smtcl.machinetool.models.machinetool;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CUnit entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_unit", catalog = "machinetool")
public class CUnit implements java.io.Serializable{

	// Fields

	private Integer unitNo;
	private String  unitName;
	private String  unitType;
	/*private Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForVolumeUnit = new HashSet<CCargoSpaceDefinition>(
			0);
	private Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForDimensionUnit = new HashSet<CCargoSpaceDefinition>(
			0);
	private Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForQuantityUnit = new HashSet<CCargoSpaceDefinition>(
			0);
	private Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForWeightUnit = new HashSet<CCargoSpaceDefinition>(
			0);
*/
	// Constructors

	/**
	 * default constructor
	 */
	public CUnit(){

	}

	/**
	 * full constructor
	 */
	public CUnit(String unitName, String unitType,
	             Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForVolumeUnit,
	             Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForDimensionUnit,
	             Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForQuantityUnit,
	             Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForWeightUnit){

		this.unitName = unitName;
		this.unitType = unitType;
	/*	this.CCargoSpaceDefinitionsForVolumeUnit = CCargoSpaceDefinitionsForVolumeUnit;
		this.CCargoSpaceDefinitionsForDimensionUnit = CCargoSpaceDefinitionsForDimensionUnit;
		this.CCargoSpaceDefinitionsForQuantityUnit = CCargoSpaceDefinitionsForQuantityUnit;
		this.CCargoSpaceDefinitionsForWeightUnit = CCargoSpaceDefinitionsForWeightUnit;*/
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "unit_no", unique = true, nullable = false)
	public Integer getUnitNo(){

		return this.unitNo;
	}

	public void setUnitNo(Integer unitNo){

		this.unitNo = unitNo;
	}

	@Column(name = "unit_name", length = 10)
	public String getUnitName(){

		return this.unitName;
	}

	public void setUnitName(String unitName){

		this.unitName = unitName;
	}

	@Column(name = "unit_type", length = 10)
	public String getUnitType(){

		return this.unitType;
	}

	public void setUnitType(String unitType){

		this.unitType = unitType;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CUnitByVolumeUnit")
	public Set<CCargoSpaceDefinition> getCCargoSpaceDefinitionsForVolumeUnit() {
		return this.CCargoSpaceDefinitionsForVolumeUnit;
	}

	public void setCCargoSpaceDefinitionsForVolumeUnit(
			Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForVolumeUnit) {
		this.CCargoSpaceDefinitionsForVolumeUnit = CCargoSpaceDefinitionsForVolumeUnit;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CUnitByDimensionUnit")
	public Set<CCargoSpaceDefinition> getCCargoSpaceDefinitionsForDimensionUnit() {
		return this.CCargoSpaceDefinitionsForDimensionUnit;
	}

	public void setCCargoSpaceDefinitionsForDimensionUnit(
			Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForDimensionUnit) {
		this.CCargoSpaceDefinitionsForDimensionUnit = CCargoSpaceDefinitionsForDimensionUnit;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CUnitByQuantityUnit")
	public Set<CCargoSpaceDefinition> getCCargoSpaceDefinitionsForQuantityUnit() {
		return this.CCargoSpaceDefinitionsForQuantityUnit;
	}

	public void setCCargoSpaceDefinitionsForQuantityUnit(
			Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForQuantityUnit) {
		this.CCargoSpaceDefinitionsForQuantityUnit = CCargoSpaceDefinitionsForQuantityUnit;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CUnitByWeightUnit")
	public Set<CCargoSpaceDefinition> getCCargoSpaceDefinitionsForWeightUnit() {
		return this.CCargoSpaceDefinitionsForWeightUnit;
	}

	public void setCCargoSpaceDefinitionsForWeightUnit(
			Set<CCargoSpaceDefinition> CCargoSpaceDefinitionsForWeightUnit) {
		this.CCargoSpaceDefinitionsForWeightUnit = CCargoSpaceDefinitionsForWeightUnit;
	}*/

}