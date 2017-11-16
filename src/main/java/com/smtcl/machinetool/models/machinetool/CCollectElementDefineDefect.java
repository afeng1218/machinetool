package com.smtcl.machinetool.models.machinetool;

import javax.persistence.*;

/**
 * CCollectElementDefineDefect entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_collect_element_define_defect", catalog = "machinetool")
public class CCollectElementDefineDefect implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer nodeId;
	private String simpleCode;
	private String explain;

	// Constructors

	/** default constructor */
	public CCollectElementDefineDefect() {
	}

	/** minimal constructor */
	public CCollectElementDefineDefect(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CCollectElementDefineDefect(Integer id, Integer nodeId,
			String simpleCode, String explain) {
		this.id = id;
		this.nodeId = nodeId;
		this.simpleCode = simpleCode;
		this.explain = explain;
	}

	// Property accessors
	@Id
	@GeneratedValue
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "node_id")
	public Integer getNodeId() {
		return this.nodeId;
	}

	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}

	@Column(name = "simple_code", length = 100)
	public String getSimpleCode() {
		return this.simpleCode;
	}

	public void setSimpleCode(String simpleCode) {
		this.simpleCode = simpleCode;
	}

	@Column(name = "explain_define")
	public String getExplain() {
		return this.explain;
	}

	public void setExplain(String explain) {
		this.explain = explain;
	}

}