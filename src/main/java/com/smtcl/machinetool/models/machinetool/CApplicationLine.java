package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * CApplicationLine entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_application_line", catalog = "machinetool")
public class CApplicationLine implements java.io.Serializable{

	// Fields

	private CApplicationLineId id;
	private Integer            materialId;
	private Float              number;
	private Timestamp          demandTime;
	private Integer            acceptWarehouseId;
	private Float              lastMonthConsumption;
	private String             state;
	private Integer            orderNo;
	private Integer            orderLineNo;
	private Integer            issueNo;
	private Integer            dispatchNo;
	private String             orderType;
	private Float              acceptNumber;
	private Float              cancleNumber;
	private String             applicant;
	private Integer            supplierNo;
	private String             supplier;
	private String             brand;
	private Float              currentInventory;
	private Float              allInventory;
	private String             buildPerson;
	private Timestamp          buildTime;
	private String             approver;

	// Constructors

	/**
	 * default constructor
	 */
	public CApplicationLine(){

	}

	/**
	 * minimal constructor
	 */
	public CApplicationLine(CApplicationLineId id){

		this.id = id;
	}

	/**
	 * full constructor
	 */
	public CApplicationLine(CApplicationLineId id, Integer materialId,
	                        Float number, Timestamp demandTime, Integer acceptWarehouseId,
	                        Float lastMonthConsumption, String state, Integer orderNo,
	                        Integer orderLineNo, Integer issueNo, Integer dispatchNo,
	                        String orderType, Float acceptNumber, Float cancleNumber,
	                        String applicant, Integer supplierNo, String supplier,
	                        String brand, Float currentInventory, Float allInventory,
	                        String buildPerson, Timestamp buildTime, String approver){

		this.id = id;
		this.materialId = materialId;
		this.number = number;
		this.demandTime = demandTime;
		this.acceptWarehouseId = acceptWarehouseId;
		this.lastMonthConsumption = lastMonthConsumption;
		this.state = state;
		this.orderNo = orderNo;
		this.orderLineNo = orderLineNo;
		this.issueNo = issueNo;
		this.dispatchNo = dispatchNo;
		this.orderType = orderType;
		this.acceptNumber = acceptNumber;
		this.cancleNumber = cancleNumber;
		this.applicant = applicant;
		this.supplierNo = supplierNo;
		this.supplier = supplier;
		this.brand = brand;
		this.currentInventory = currentInventory;
		this.allInventory = allInventory;
		this.buildPerson = buildPerson;
		this.buildTime = buildTime;
		this.approver = approver;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "applicationNo", column = @Column(name = "application_no", nullable = false)),
			@AttributeOverride(name = "lineNo", column = @Column(name = "line_no", nullable = false))})
	public CApplicationLineId getId(){

		return this.id;
	}

	public void setId(CApplicationLineId id){

		this.id = id;
	}

	@Column(name = "material_id")
	public Integer getMaterialId(){

		return this.materialId;
	}

	public void setMaterialId(Integer materialId){

		this.materialId = materialId;
	}

	@Column(name = "number", precision = 12, scale = 0)
	public Float getNumber(){

		return this.number;
	}

	public void setNumber(Float number){

		this.number = number;
	}

	@Column(name = "demand_time", length = 0)
	public Timestamp getDemandTime(){

		return this.demandTime;
	}

	public void setDemandTime(Timestamp demandTime){

		this.demandTime = demandTime;
	}

	@Column(name = "accept_warehouse_id")
	public Integer getAcceptWarehouseId(){

		return this.acceptWarehouseId;
	}

	public void setAcceptWarehouseId(Integer acceptWarehouseId){

		this.acceptWarehouseId = acceptWarehouseId;
	}

	@Column(name = "last_month_consumption", precision = 12, scale = 0)
	public Float getLastMonthConsumption(){

		return this.lastMonthConsumption;
	}

	public void setLastMonthConsumption(Float lastMonthConsumption){

		this.lastMonthConsumption = lastMonthConsumption;
	}

	@Column(name = "state", length = 30)
	public String getState(){

		return this.state;
	}

	public void setState(String state){

		this.state = state;
	}

	@Column(name = "order_no")
	public Integer getOrderNo(){

		return this.orderNo;
	}

	public void setOrderNo(Integer orderNo){

		this.orderNo = orderNo;
	}

	@Column(name = "order_line_no")
	public Integer getOrderLineNo(){

		return this.orderLineNo;
	}

	public void setOrderLineNo(Integer orderLineNo){

		this.orderLineNo = orderLineNo;
	}

	@Column(name = "issue_no")
	public Integer getIssueNo(){

		return this.issueNo;
	}

	public void setIssueNo(Integer issueNo){

		this.issueNo = issueNo;
	}

	@Column(name = "dispatch_no")
	public Integer getDispatchNo(){

		return this.dispatchNo;
	}

	public void setDispatchNo(Integer dispatchNo){

		this.dispatchNo = dispatchNo;
	}

	@Column(name = "order_type", length = 20)
	public String getOrderType(){

		return this.orderType;
	}

	public void setOrderType(String orderType){

		this.orderType = orderType;
	}

	@Column(name = "accept_number", precision = 12, scale = 0)
	public Float getAcceptNumber(){

		return this.acceptNumber;
	}

	public void setAcceptNumber(Float acceptNumber){

		this.acceptNumber = acceptNumber;
	}

	@Column(name = "cancle_number", precision = 12, scale = 0)
	public Float getCancleNumber(){

		return this.cancleNumber;
	}

	public void setCancleNumber(Float cancleNumber){

		this.cancleNumber = cancleNumber;
	}

	@Column(name = "applicant", length = 20)
	public String getApplicant(){

		return this.applicant;
	}

	public void setApplicant(String applicant){

		this.applicant = applicant;
	}

	@Column(name = "supplier_no")
	public Integer getSupplierNo(){

		return this.supplierNo;
	}

	public void setSupplierNo(Integer supplierNo){

		this.supplierNo = supplierNo;
	}

	@Column(name = "supplier")
	public String getSupplier(){

		return this.supplier;
	}

	public void setSupplier(String supplier){

		this.supplier = supplier;
	}

	@Column(name = "brand")
	public String getBrand(){

		return this.brand;
	}

	public void setBrand(String brand){

		this.brand = brand;
	}

	@Column(name = "current_inventory", precision = 12, scale = 0)
	public Float getCurrentInventory(){

		return this.currentInventory;
	}

	public void setCurrentInventory(Float currentInventory){

		this.currentInventory = currentInventory;
	}

	@Column(name = "all_inventory", precision = 12, scale = 0)
	public Float getAllInventory(){

		return this.allInventory;
	}

	public void setAllInventory(Float allInventory){

		this.allInventory = allInventory;
	}

	@Column(name = "build_person", length = 20)
	public String getBuildPerson(){

		return this.buildPerson;
	}

	public void setBuildPerson(String buildPerson){

		this.buildPerson = buildPerson;
	}

	@Column(name = "build_time", length = 0)
	public Timestamp getBuildTime(){

		return this.buildTime;
	}

	public void setBuildTime(Timestamp buildTime){

		this.buildTime = buildTime;
	}

	@Column(name = "approver", length = 20)
	public String getApprover(){

		return this.approver;
	}

	public void setApprover(String approver){

		this.approver = approver;
	}

}