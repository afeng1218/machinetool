package com.smtcl.machinetool.models.machinetool;

import javax.persistence.*;

/**
 * CCollectElementDefineLimit entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_collect_element_define_limit", catalog = "machinetool")
public class CCollectElementDefineLimit implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer nodeId;
	private String targetValue;
	private String customUp;
	private String customDown;
	private String specificationsUp;
	private String specificationsDown;
	private String reasonableUp;
	private String reasonableDown;

	// Constructors

	/** default constructor */
	public CCollectElementDefineLimit() {
	}

	/** minimal constructor */
	public CCollectElementDefineLimit(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CCollectElementDefineLimit(Integer id, Integer nodeId,
			String targetValue, String customUp, String customDown,
			String specificationsUp, String specificationsDown,
			String reasonableUp, String reasonableDown) {
		this.id = id;
		this.nodeId = nodeId;
		this.targetValue = targetValue;
		this.customUp = customUp;
		this.customDown = customDown;
		this.specificationsUp = specificationsUp;
		this.specificationsDown = specificationsDown;
		this.reasonableUp = reasonableUp;
		this.reasonableDown = reasonableDown;
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

	@Column(name = "target_value", length = 11)
	public String getTargetValue() {
		return this.targetValue;
	}

	public void setTargetValue(String targetValue) {
		this.targetValue = targetValue;
	}

	@Column(name = "custom_up", length = 11)
	public String getCustomUp() {
		return this.customUp;
	}

	public void setCustomUp(String customUp) {
		this.customUp = customUp;
	}

	@Column(name = "custom_down", length = 11)
	public String getCustomDown() {
		return this.customDown;
	}

	public void setCustomDown(String customDown) {
		this.customDown = customDown;
	}

	@Column(name = "specifications_up", length = 11)
	public String getSpecificationsUp() {
		return this.specificationsUp;
	}

	public void setSpecificationsUp(String specificationsUp) {
		this.specificationsUp = specificationsUp;
	}

	@Column(name = "specifications_down", length = 11)
	public String getSpecificationsDown() {
		return this.specificationsDown;
	}

	public void setSpecificationsDown(String specificationsDown) {
		this.specificationsDown = specificationsDown;
	}

	@Column(name = "reasonable_up", length = 11)
	public String getReasonableUp() {
		return this.reasonableUp;
	}

	public void setReasonableUp(String reasonableUp) {
		this.reasonableUp = reasonableUp;
	}

	@Column(name = "reasonable_down", length = 11)
	public String getReasonableDown() {
		return this.reasonableDown;
	}

	public void setReasonableDown(String reasonableDown) {
		this.reasonableDown = reasonableDown;
	}

}