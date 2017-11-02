package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * CCuttoolAssembly entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_assembly", catalog = "machinetool")
public class CCuttoolAssembly implements java.io.Serializable{

	// Fields

	private Integer          assemblyid;
	private CGeneralMaterial CGeneralMaterial;
	private String           cuttoolNo;
	private Integer          orderNo;
	private String           materialVersion;
	private Integer          number;
	private String           unit;
	private Integer          easyConsume;
	private Integer          chipCutting;
	private Integer          encodingBody;
	private Timestamp        date;
	private String           createUser;
	private Integer          cuttoolId;

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolAssembly(){

	}

	/**
	 * minimal constructor
	 */
	public CCuttoolAssembly(Integer assemblyid, String cuttoolNo,
	                        Integer orderNo, Integer number, String unit, Integer easyConsume,
	                        Integer chipCutting, Integer encodingBody, Integer cuttoolId){

		this.assemblyid = assemblyid;
		this.cuttoolNo = cuttoolNo;
		this.orderNo = orderNo;
		this.number = number;
		this.unit = unit;
		this.easyConsume = easyConsume;
		this.chipCutting = chipCutting;
		this.encodingBody = encodingBody;
		this.cuttoolId = cuttoolId;
	}

	/**
	 * full constructor
	 */
	public CCuttoolAssembly(Integer assemblyid,
	                        CGeneralMaterial CGeneralMaterial, String cuttoolNo,
	                        Integer orderNo, String materialVersion, Integer number,
	                        String unit, Integer easyConsume, Integer chipCutting,
	                        Integer encodingBody, Timestamp date, String createUser,
	                        Integer cuttoolId){

		this.assemblyid = assemblyid;
		this.CGeneralMaterial = CGeneralMaterial;
		this.cuttoolNo = cuttoolNo;
		this.orderNo = orderNo;
		this.materialVersion = materialVersion;
		this.number = number;
		this.unit = unit;
		this.easyConsume = easyConsume;
		this.chipCutting = chipCutting;
		this.encodingBody = encodingBody;
		this.date = date;
		this.createUser = createUser;
		this.cuttoolId = cuttoolId;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "assemblyid", unique = true, nullable = false)
	public Integer getAssemblyid(){

		return this.assemblyid;
	}

	public void setAssemblyid(Integer assemblyid){

		this.assemblyid = assemblyid;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")
	public CGeneralMaterial getCGeneralMaterial(){

		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial){

		this.CGeneralMaterial = CGeneralMaterial;
	}

	@Column(name = "cuttool_no", nullable = false, length = 20)
	public String getCuttoolNo(){

		return this.cuttoolNo;
	}

	public void setCuttoolNo(String cuttoolNo){

		this.cuttoolNo = cuttoolNo;
	}

	@Column(name = "order_no", nullable = false)
	public Integer getOrderNo(){

		return this.orderNo;
	}

	public void setOrderNo(Integer orderNo){

		this.orderNo = orderNo;
	}

	@Column(name = "material_version")
	public String getMaterialVersion(){

		return this.materialVersion;
	}

	public void setMaterialVersion(String materialVersion){

		this.materialVersion = materialVersion;
	}

	@Column(name = "number", nullable = false)
	public Integer getNumber(){

		return this.number;
	}

	public void setNumber(Integer number){

		this.number = number;
	}

	@Column(name = "unit", nullable = false)
	public String getUnit(){

		return this.unit;
	}

	public void setUnit(String unit){

		this.unit = unit;
	}

	@Column(name = "easy_consume", nullable = false)
	public Integer getEasyConsume(){

		return this.easyConsume;
	}

	public void setEasyConsume(Integer easyConsume){

		this.easyConsume = easyConsume;
	}

	@Column(name = "chip_cutting", nullable = false)
	public Integer getChipCutting(){

		return this.chipCutting;
	}

	public void setChipCutting(Integer chipCutting){

		this.chipCutting = chipCutting;
	}

	@Column(name = "encoding_body", nullable = false)
	public Integer getEncodingBody(){

		return this.encodingBody;
	}

	public void setEncodingBody(Integer encodingBody){

		this.encodingBody = encodingBody;
	}

	@Column(name = "date", length = 0)
	public Timestamp getDate(){

		return this.date;
	}

	public void setDate(Timestamp date){

		this.date = date;
	}

	@Column(name = "create_user")
	public String getCreateUser(){

		return this.createUser;
	}

	public void setCreateUser(String createUser){

		this.createUser = createUser;
	}

	@Column(name = "cuttool_id", nullable = false)
	public Integer getCuttoolId(){

		return this.cuttoolId;
	}

	public void setCuttoolId(Integer cuttoolId){

		this.cuttoolId = cuttoolId;
	}

}