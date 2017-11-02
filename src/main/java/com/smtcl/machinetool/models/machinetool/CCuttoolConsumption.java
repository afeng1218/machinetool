package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * CCuttoolConsumption entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_consumption", catalog = "machinetool")
public class CCuttoolConsumption implements java.io.Serializable{

	// Fields

	private Integer   id;
	private Integer   materialId;
	private Float     number;
	private String    reason;
	private String    source;
	private String    sourceRow;
	private String    person;
	private String    createPerson;
	private Timestamp createTime;
	private Integer   storageRoomId;
	private Integer   goodsAllocationId;
	private String    type;
	private Integer   batchId;
	private Integer   sequenceId;
	private String    workshop;
	private String    workshopSection;
	private Integer   equipmentId;
	private String    productionLine;
	private String    team;
	private Double    unitPrice;

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolConsumption(){

	}

	/**
	 * minimal constructor
	 */
	public CCuttoolConsumption(Integer id, Integer materialId, Float number){

		this.id = id;
		this.materialId = materialId;
		this.number = number;
	}

	/**
	 * full constructor
	 */
	public CCuttoolConsumption(Integer id, Integer materialId, Float number,
	                           String reason, String source, String sourceRow, String person,
	                           String createPerson, Timestamp createTime, Integer storageRoomId,
	                           Integer goodsAllocationId, String type, Integer batchId,
	                           Integer sequenceId, String workshop, String workshopSection,
	                           Integer equipmentId, String productionLine, String team,
	                           Double unitPrice){

		this.id = id;
		this.materialId = materialId;
		this.number = number;
		this.reason = reason;
		this.source = source;
		this.sourceRow = sourceRow;
		this.person = person;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.storageRoomId = storageRoomId;
		this.goodsAllocationId = goodsAllocationId;
		this.type = type;
		this.batchId = batchId;
		this.sequenceId = sequenceId;
		this.workshop = workshop;
		this.workshopSection = workshopSection;
		this.equipmentId = equipmentId;
		this.productionLine = productionLine;
		this.team = team;
		this.unitPrice = unitPrice;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Integer getId(){

		return this.id;
	}

	public void setId(Integer id){

		this.id = id;
	}

	@Column(name = "material_id", nullable = false)
	public Integer getMaterialId(){

		return this.materialId;
	}

	public void setMaterialId(Integer materialId){

		this.materialId = materialId;
	}

	@Column(name = "number", nullable = false, precision = 12, scale = 0)
	public Float getNumber(){

		return this.number;
	}

	public void setNumber(Float number){

		this.number = number;
	}

	@Column(name = "reason")
	public String getReason(){

		return this.reason;
	}

	public void setReason(String reason){

		this.reason = reason;
	}

	@Column(name = "source", length = 30)
	public String getSource(){

		return this.source;
	}

	public void setSource(String source){

		this.source = source;
	}

	@Column(name = "source_row", length = 20)
	public String getSourceRow(){

		return this.sourceRow;
	}

	public void setSourceRow(String sourceRow){

		this.sourceRow = sourceRow;
	}

	@Column(name = "person", length = 20)
	public String getPerson(){

		return this.person;
	}

	public void setPerson(String person){

		this.person = person;
	}

	@Column(name = "create_person", length = 20)
	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", length = 0)
	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp cretaeTime){

		this.createTime = cretaeTime;
	}

	@Column(name = "storage_room_id")
	public Integer getStorageRoomId(){

		return this.storageRoomId;
	}

	public void setStorageRoomId(Integer storageRoomId){

		this.storageRoomId = storageRoomId;
	}

	@Column(name = "goods_allocation_id")
	public Integer getGoodsAllocationId(){

		return this.goodsAllocationId;
	}

	public void setGoodsAllocationId(Integer goodsAllocationId){

		this.goodsAllocationId = goodsAllocationId;
	}

	@Column(name = "type", length = 20)
	public String getType(){

		return this.type;
	}

	public void setType(String type){

		this.type = type;
	}

	@Column(name = "batch_id")
	public Integer getBatchId(){

		return this.batchId;
	}

	public void setBatchId(Integer batchId){

		this.batchId = batchId;
	}

	@Column(name = "sequence_id")
	public Integer getSequenceId(){

		return this.sequenceId;
	}

	public void setSequenceId(Integer sequenceId){

		this.sequenceId = sequenceId;
	}

	@Column(name = "workshop", length = 50)
	public String getWorkshop(){

		return this.workshop;
	}

	public void setWorkshop(String workshop){

		this.workshop = workshop;
	}

	@Column(name = "workshop_section", length = 50)
	public String getWorkshopSection(){

		return this.workshopSection;
	}

	public void setWorkshopSection(String workshopSection){

		this.workshopSection = workshopSection;
	}

	@Column(name = "equipment_id")
	public Integer getEquipmentId(){

		return this.equipmentId;
	}

	public void setEquipmentId(Integer equipmentId){

		this.equipmentId = equipmentId;
	}

	@Column(name = "production_line", length = 50)
	public String getProductionLine(){

		return this.productionLine;
	}

	public void setProductionLine(String productionLine){

		this.productionLine = productionLine;
	}

	@Column(name = "team", length = 50)
	public String getTeam(){

		return this.team;
	}

	public void setTeam(String team){

		this.team = team;
	}

	@Column(name = "unit_price", precision = 15, scale = 7)
	public Double getUnitPrice(){

		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice){

		this.unitPrice = unitPrice;
	}

}