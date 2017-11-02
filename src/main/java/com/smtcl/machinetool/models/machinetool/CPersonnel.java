package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CPersonnel entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_personnel", catalog = "machinetool")
public class CPersonnel implements java.io.Serializable {

	// Fields

	private String no;
	private String name;
	private String sex;
	private Integer age;

	// Constructors

	/** default constructor */
	public CPersonnel() {
	}

	/** full constructor */
	public CPersonnel(String name, String sex, Integer age) {
		this.name = name;
		this.sex = sex;
		this.age = age;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "no", unique = true, nullable = false, length = 11)
	public String getNo() {
		return this.no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	@Column(name = "name", nullable = false, length = 10)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "sex", nullable = false, length = 1)
	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Column(name = "age", nullable = false)
	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

}