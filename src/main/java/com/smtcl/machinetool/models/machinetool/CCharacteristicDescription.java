package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CCharacteristicDescription entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_characteristic_description", catalog = "machinetool")
public class CCharacteristicDescription implements java.io.Serializable{

	// Fields

	private Integer id;
	private String  characteristicDescription;

	// Constructors

	/**
	 * default constructor
	 */
	public CCharacteristicDescription(){

	}

	/**
	 * minimal constructor
	 */
	public CCharacteristicDescription(Integer id){

		this.id = id;
	}

	/**
	 * full constructor
	 */
	public CCharacteristicDescription(Integer id,
	                                  String characteristicDescription){

		this.id = id;
		this.characteristicDescription = characteristicDescription;
	}

	// Property accessors
	@Id
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId(){

		return this.id;
	}

	public void setId(Integer id){

		this.id = id;
	}

	@Column(name = "characteristic_description", length = 30)
	public String getCharacteristicDescription(){

		return this.characteristicDescription;
	}

	public void setCharacteristicDescription(String characteristicDescription){

		this.characteristicDescription = characteristicDescription;
	}

}