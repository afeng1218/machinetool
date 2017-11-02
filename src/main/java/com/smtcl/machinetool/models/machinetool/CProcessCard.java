package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CProcessCard entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_process_card"
		, catalog = "machinetool"
)

public class CProcessCard implements java.io.Serializable{

	// Fields

	private Integer materialId;
	private CGeneralMaterial CGeneralMaterial;
	private String programVersion;
	private Integer processNumber;
	private Integer processStepId;
	private String programCuttoolNo;
	private String cuttoolNo;
	private String mapNo;
	private String processDescription;
	private String attachmentDescription;
	private Integer chipMaximumDiameter;
	private Integer chipMinimumDiameter;
	private Integer chipSpeed;
	private Integer bladeNumber;
	private Integer feedPerBlade;
	private Integer spindleSpeed;
	private Integer cuttingDepth;
	private Integer amountFeed;
	private Integer hardness;
	private String material;
	private String cuttoolRoom;
	private String equipment;
	private Integer processTime;
	private String designer;
	private Date designDate;
	private String createPerson;
	private Date createTime;
	private String updatePerson;
	private Date updateTime;
	private String processDiagram;
	private String processName;
	private String toolCarrier;
	private String titleName;
	private String pretendCard;
	private String programName;
	private String order;

	// Constructors

	/** default constructor */
	public CProcessCard() {
	}

	/** minimal constructor */
	public CProcessCard(Integer materialId, CGeneralMaterial CGeneralMaterial,
	                    String programVersion, Integer processNumber, Integer processStepId) {
		this.materialId = materialId;
		this.CGeneralMaterial = CGeneralMaterial;
		this.programVersion = programVersion;
		this.processNumber = processNumber;
		this.processStepId = processStepId;
	}

	/** full constructor */
	public CProcessCard(Integer materialId, CGeneralMaterial CGeneralMaterial,
	                    String programVersion, Integer processNumber,
	                    Integer processStepId, String programCuttoolNo, String cuttoolNo,
	                    String mapNo, String processDescription,
	                    String attachmentDescription, Integer chipMaximumDiameter,
	                    Integer chipMinimumDiameter, Integer chipSpeed,
	                    Integer bladeNumber, Integer feedPerBlade, Integer spindleSpeed,
	                    Integer cuttingDepth, Integer amountFeed, Integer hardness,
	                    String material, String cuttoolRoom, String equipment,
	                    Integer processTime, String designer, Date designDate,
	                    String createPerson, Date createTime, String updatePerson,
	                    Date updateTime, String processDiagram, String processName,
	                    String toolCarrier, String titleName, String pretendCard,
	                    String programName, String order) {
		this.materialId = materialId;
		this.CGeneralMaterial = CGeneralMaterial;
		this.programVersion = programVersion;
		this.processNumber = processNumber;
		this.processStepId = processStepId;
		this.programCuttoolNo = programCuttoolNo;
		this.cuttoolNo = cuttoolNo;
		this.mapNo = mapNo;
		this.processDescription = processDescription;
		this.attachmentDescription = attachmentDescription;
		this.chipMaximumDiameter = chipMaximumDiameter;
		this.chipMinimumDiameter = chipMinimumDiameter;
		this.chipSpeed = chipSpeed;
		this.bladeNumber = bladeNumber;
		this.feedPerBlade = feedPerBlade;
		this.spindleSpeed = spindleSpeed;
		this.cuttingDepth = cuttingDepth;
		this.amountFeed = amountFeed;
		this.hardness = hardness;
		this.material = material;
		this.cuttoolRoom = cuttoolRoom;
		this.equipment = equipment;
		this.processTime = processTime;
		this.designer = designer;
		this.designDate = designDate;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.updatePerson = updatePerson;
		this.updateTime = updateTime;
		this.processDiagram = processDiagram;
		this.processName = processName;
		this.toolCarrier = toolCarrier;
		this.titleName = titleName;
		this.pretendCard = pretendCard;
		this.programName = programName;
		this.order = order;
	}

	// Property accessors
	@Id
	@Column(name = "material_id", nullable = false)
	public Integer getMaterialId() {
		return this.materialId;
	}

	public void setMaterialId(Integer materialId) {
		this.materialId = materialId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "material_id", nullable = false, insertable = false, updatable = false)
	public CGeneralMaterial getCGeneralMaterial() {
		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial) {
		this.CGeneralMaterial = CGeneralMaterial;
	}

	@Column(name = "program_version", nullable = false)
	public String getProgramVersion() {
		return this.programVersion;
	}

	public void setProgramVersion(String programVersion) {
		this.programVersion = programVersion;
	}

	@Column(name = "process_number", nullable = false)
	public Integer getProcessNumber() {
		return this.processNumber;
	}

	public void setProcessNumber(Integer processNumber) {
		this.processNumber = processNumber;
	}

	@Column(name = "process_step_id", nullable = false)
	public Integer getProcessStepId() {
		return this.processStepId;
	}

	public void setProcessStepId(Integer processStepId) {
		this.processStepId = processStepId;
	}

	@Column(name = "program_cuttool_no")
	public String getProgramCuttoolNo() {
		return this.programCuttoolNo;
	}

	public void setProgramCuttoolNo(String programCuttoolNo) {
		this.programCuttoolNo = programCuttoolNo;
	}

	@Column(name = "cuttool_no")
	public String getCuttoolNo() {
		return this.cuttoolNo;
	}

	public void setCuttoolNo(String cuttoolNo) {
		this.cuttoolNo = cuttoolNo;
	}

	@Column(name = "map_no")
	public String getMapNo() {
		return this.mapNo;
	}

	public void setMapNo(String mapNo) {
		this.mapNo = mapNo;
	}

	@Column(name = "process_description")
	public String getProcessDescription() {
		return this.processDescription;
	}

	public void setProcessDescription(String processDescription) {
		this.processDescription = processDescription;
	}

	@Column(name = "attachment_description")
	public String getAttachmentDescription() {
		return this.attachmentDescription;
	}

	public void setAttachmentDescription(String attachmentDescription) {
		this.attachmentDescription = attachmentDescription;
	}

	@Column(name = "chip_maximum_diameter")
	public Integer getChipMaximumDiameter() {
		return this.chipMaximumDiameter;
	}

	public void setChipMaximumDiameter(Integer chipMaximumDiameter) {
		this.chipMaximumDiameter = chipMaximumDiameter;
	}

	@Column(name = "chip_minimum_diameter")
	public Integer getChipMinimumDiameter() {
		return this.chipMinimumDiameter;
	}

	public void setChipMinimumDiameter(Integer chipMinimumDiameter) {
		this.chipMinimumDiameter = chipMinimumDiameter;
	}

	@Column(name = "chip_speed")
	public Integer getChipSpeed() {
		return this.chipSpeed;
	}

	public void setChipSpeed(Integer chipSpeed) {
		this.chipSpeed = chipSpeed;
	}

	@Column(name = "blade_number")
	public Integer getBladeNumber() {
		return this.bladeNumber;
	}

	public void setBladeNumber(Integer bladeNumber) {
		this.bladeNumber = bladeNumber;
	}

	@Column(name = "feed_per_blade")
	public Integer getFeedPerBlade() {
		return this.feedPerBlade;
	}

	public void setFeedPerBlade(Integer feedPerBlade) {
		this.feedPerBlade = feedPerBlade;
	}

	@Column(name = "spindle_speed")
	public Integer getSpindleSpeed() {
		return this.spindleSpeed;
	}

	public void setSpindleSpeed(Integer spindleSpeed) {
		this.spindleSpeed = spindleSpeed;
	}

	@Column(name = "cutting_depth")
	public Integer getCuttingDepth() {
		return this.cuttingDepth;
	}

	public void setCuttingDepth(Integer cuttingDepth) {
		this.cuttingDepth = cuttingDepth;
	}

	@Column(name = "amount_feed")
	public Integer getAmountFeed() {
		return this.amountFeed;
	}

	public void setAmountFeed(Integer amountFeed) {
		this.amountFeed = amountFeed;
	}

	@Column(name = "hardness")
	public Integer getHardness() {
		return this.hardness;
	}

	public void setHardness(Integer hardness) {
		this.hardness = hardness;
	}

	@Column(name = "material", length = 50)
	public String getMaterial() {
		return this.material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	@Column(name = "cuttool_room", length = 50)
	public String getCuttoolRoom() {
		return this.cuttoolRoom;
	}

	public void setCuttoolRoom(String cuttoolRoom) {
		this.cuttoolRoom = cuttoolRoom;
	}

	@Column(name = "equipment", length = 50)
	public String getEquipment() {
		return this.equipment;
	}

	public void setEquipment(String equipment) {
		this.equipment = equipment;
	}

	@Column(name = "process_time")
	public Integer getProcessTime() {
		return this.processTime;
	}

	public void setProcessTime(Integer processTime) {
		this.processTime = processTime;
	}

	@Column(name = "designer")
	public String getDesigner() {
		return this.designer;
	}

	public void setDesigner(String designer) {
		this.designer = designer;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "design_date", length = 10)
	public Date getDesignDate() {
		return this.designDate;
	}

	public void setDesignDate(Date designDate) {
		this.designDate = designDate;
	}

	@Column(name = "create_person")
	public String getCreatePerson() {
		return this.createPerson;
	}

	public void setCreatePerson(String createPerson) {
		this.createPerson = createPerson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "create_time", length = 19)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "update_person")
	public String getUpdatePerson() {
		return this.updatePerson;
	}

	public void setUpdatePerson(String updatePerson) {
		this.updatePerson = updatePerson;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "update_time", length = 19)
	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name = "process_diagram")
	public String getProcessDiagram() {
		return this.processDiagram;
	}

	public void setProcessDiagram(String processDiagram) {
		this.processDiagram = processDiagram;
	}

	@Column(name = "process_name")
	public String getProcessName() {
		return this.processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	@Column(name = "tool_carrier")
	public String getToolCarrier() {
		return this.toolCarrier;
	}

	public void setToolCarrier(String toolCarrier) {
		this.toolCarrier = toolCarrier;
	}

	@Column(name = "title_name")
	public String getTitleName() {
		return this.titleName;
	}

	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}

	@Column(name = "pretend_card")
	public String getPretendCard() {
		return this.pretendCard;
	}

	public void setPretendCard(String pretendCard) {
		this.pretendCard = pretendCard;
	}

	@Column(name = "program_name")
	public String getProgramName() {
		return this.programName;
	}

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	@Column(name = "order_val")
	public String getOrder() {
		return this.order;
	}

	public void setOrder(String order) {
		this.order = order;
	}
}