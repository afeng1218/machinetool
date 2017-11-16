package com.smtcl.machinetool.models.machinetool;

import javax.persistence.*;

/**
 * CCollectElementDefine entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_collect_element_define", catalog = "machinetool")
public class CCollectElementDefine implements java.io.Serializable {

	// Fields

	private Integer id;
	private String detectionProject;
	private String prompt;
	private String defineType;
	private String enable;
	private String activityPrompt;
	private String newTime;
	private String newCreator;
	private String updateTime;
	private String updateCreator;

	// Constructors

	/** default constructor */
	public CCollectElementDefine() {
	}

	/** minimal constructor */
	public CCollectElementDefine(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CCollectElementDefine(Integer id, String detectionProject,
			String prompt, String defineType, String enable,
			String activityPrompt, String newTime, String newCreator,
			String updateTime, String updateCreator) {
		this.id = id;
		this.detectionProject = detectionProject;
		this.prompt = prompt;
		this.defineType = defineType;
		this.enable = enable;
		this.activityPrompt = activityPrompt;
		this.newTime = newTime;
		this.newCreator = newCreator;
		this.updateTime = updateTime;
		this.updateCreator = updateCreator;
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

	@Column(name = "detection_project")
	public String getDetectionProject() {
		return this.detectionProject;
	}

	public void setDetectionProject(String detectionProject) {
		this.detectionProject = detectionProject;
	}

	@Column(name = "prompt")
	public String getPrompt() {
		return this.prompt;
	}

	public void setPrompt(String prompt) {
		this.prompt = prompt;
	}

	@Column(name = "define_type", length = 50)
	public String getDefineType() {
		return this.defineType;
	}

	public void setDefineType(String defineType) {
		this.defineType = defineType;
	}

	@Column(name = "enable", length = 10)
	public String getEnable() {
		return this.enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	@Column(name = "activity_prompt")
	public String getActivityPrompt() {
		return this.activityPrompt;
	}

	public void setActivityPrompt(String activityPrompt) {
		this.activityPrompt = activityPrompt;
	}

	@Column(name = "new_time", length = 50, updatable=false)
	public String getNewTime() {
		return this.newTime;
	}

	public void setNewTime(String newTime) {
		this.newTime = newTime;
	}

	@Column(name = "new_creator", length = 10, updatable=false)
	public String getNewCreator() {
		return this.newCreator;
	}

	public void setNewCreator(String newCreator) {
		this.newCreator = newCreator;
	}

	@Column(name = "update_time", length = 50)
	public String getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "update_creator", length = 10)
	public String getUpdateCreator() {
		return this.updateCreator;
	}

	public void setUpdateCreator(String updateCreator) {
		this.updateCreator = updateCreator;
	}

}