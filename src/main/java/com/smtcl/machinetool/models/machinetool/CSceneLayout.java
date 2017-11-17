package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CSceneLayout entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_scene_layout", catalog = "machinetool")
public class CSceneLayout implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer workshopId;
	private String workshopName;
	private Integer productionLineId;
	private String productionLineName;
	private String resourceCode;
	private String equipmentGroup;
	private String category;
	private String model;
	private Integer rate;
	private Integer x;
	private Integer y;
	private String machineType;

	// Constructors

	/** default constructor */
	public CSceneLayout() {
	}

	/** minimal constructor */
	public CSceneLayout(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CSceneLayout(Integer id, Integer workshopId, String workshopName,
			Integer productionLineId, String productionLineName,
			String resourceCode, String equipmentGroup, String category,
			String model, Integer rate, Integer x, Integer y, String machineType) {
		this.id = id;
		this.workshopId = workshopId;
		this.workshopName = workshopName;
		this.productionLineId = productionLineId;
		this.productionLineName = productionLineName;
		this.resourceCode = resourceCode;
		this.equipmentGroup = equipmentGroup;
		this.category = category;
		this.model = model;
		this.rate = rate;
		this.x = x;
		this.y = y;
		this.machineType = machineType;
	}

	// Property accessors
	@Id
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "workshop_id")
	public Integer getWorkshopId() {
		return this.workshopId;
	}

	public void setWorkshopId(Integer workshopId) {
		this.workshopId = workshopId;
	}

	@Column(name = "workshop_name", length = 100)
	public String getWorkshopName() {
		return this.workshopName;
	}

	public void setWorkshopName(String workshopName) {
		this.workshopName = workshopName;
	}

	@Column(name = "production_line_id")
	public Integer getProductionLineId() {
		return this.productionLineId;
	}

	public void setProductionLineId(Integer productionLineId) {
		this.productionLineId = productionLineId;
	}

	@Column(name = "production_line_name", length = 100)
	public String getProductionLineName() {
		return this.productionLineName;
	}

	public void setProductionLineName(String productionLineName) {
		this.productionLineName = productionLineName;
	}

	@Column(name = "resource_code", length = 100)
	public String getResourceCode() {
		return this.resourceCode;
	}

	public void setResourceCode(String resourceCode) {
		this.resourceCode = resourceCode;
	}

	@Column(name = "equipment_group", length = 100)
	public String getEquipmentGroup() {
		return this.equipmentGroup;
	}

	public void setEquipmentGroup(String equipmentGroup) {
		this.equipmentGroup = equipmentGroup;
	}

	@Column(name = "category", length = 20)
	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Column(name = "model", length = 50)
	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	@Column(name = "rate")
	public Integer getRate() {
		return this.rate;
	}

	public void setRate(Integer rate) {
		this.rate = rate;
	}

	@Column(name = "x")
	public Integer getX() {
		return this.x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

	@Column(name = "y")
	public Integer getY() {
		return this.y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	@Column(name = "machine_type", length = 20)
	public String getMachineType() {
		return this.machineType;
	}

	public void setMachineType(String machineType) {
		this.machineType = machineType;
	}

}