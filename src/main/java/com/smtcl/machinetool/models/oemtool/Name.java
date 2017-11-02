package com.smtcl.machinetool.models.oemtool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Name entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "name", catalog = "testdruid")
public class Name implements java.io.Serializable{

	// Fields

	private Integer id;
	private String  name;

	// Constructors

	/**
	 * default constructor
	 */
	public Name(){

	}

	/**
	 * minimal constructor
	 */
	public Name(Integer id){

		this.id = id;
	}

	/**
	 * full constructor
	 */
	public Name(Integer id, String name){

		this.id = id;
		this.name = name;
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

	@Column(name = "name")
	public String getName(){

		return this.name;
	}

	public void setName(String name){

		this.name = name;
	}

}