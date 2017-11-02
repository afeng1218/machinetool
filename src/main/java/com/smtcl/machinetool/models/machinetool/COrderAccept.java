package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * COrderAccept entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_order_accept", catalog = "machinetool")
public class COrderAccept implements java.io.Serializable {

	// Fields

	private COrderAcceptId id;
	private CGeneralMaterial CGeneralMaterial;
	private COrderHead COrderHead;
	private String unit;
	private Float deliveryNumber;
	private String brand;
	private Float acceptedNumber;
	private Double unitPrice;
	private Double includeTaxPrice;
	private Timestamp processTime;
	private Integer acceptStorageRoomId;
	private Integer cargoSpaceId;
	private String lineClass;
	private String state;
	private Integer dispatchNo;
	private Integer provideNo;
	private Integer applyNo;
	private Integer applyLineNo;
	private Float cancleNumber;
	private String stampOrnot;
	private String sssueTicket;
	private Timestamp demandTime;
	private Float sssueTicketNumber;

	// Constructors

	/** default constructor */
	public COrderAccept() {
	}

	/** minimal constructor */
	public COrderAccept(COrderAcceptId id, COrderHead COrderHead) {
		this.id = id;
		this.COrderHead = COrderHead;
	}

	/** full constructor */
	public COrderAccept(COrderAcceptId id, CGeneralMaterial CGeneralMaterial,
			COrderHead COrderHead, String unit, Float deliveryNumber,
			String brand, Float acceptedNumber, Double unitPrice,
			Double includeTaxPrice, Timestamp processTime,
			Integer acceptStorageRoomId, Integer cargoSpaceId,
			String lineClass, String state, Integer dispatchNo,
			Integer provideNo, Integer applyNo, Integer applyLineNo,
			Float cancleNumber, String stampOrnot, String sssueTicket,
			Timestamp demandTime, Float sssueTicketNumber) {
		this.id = id;
		this.CGeneralMaterial = CGeneralMaterial;
		this.COrderHead = COrderHead;
		this.unit = unit;
		this.deliveryNumber = deliveryNumber;
		this.brand = brand;
		this.acceptedNumber = acceptedNumber;
		this.unitPrice = unitPrice;
		this.includeTaxPrice = includeTaxPrice;
		this.processTime = processTime;
		this.acceptStorageRoomId = acceptStorageRoomId;
		this.cargoSpaceId = cargoSpaceId;
		this.lineClass = lineClass;
		this.state = state;
		this.dispatchNo = dispatchNo;
		this.provideNo = provideNo;
		this.applyNo = applyNo;
		this.applyLineNo = applyLineNo;
		this.cancleNumber = cancleNumber;
		this.stampOrnot = stampOrnot;
		this.sssueTicket = sssueTicket;
		this.demandTime = demandTime;
		this.sssueTicketNumber = sssueTicketNumber;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "orderNo", column = @Column(name = "order_no", nullable = false)),
			@AttributeOverride(name = "lineNo", column = @Column(name = "line_no", nullable = false)) })
	public COrderAcceptId getId() {
		return this.id;
	}

	public void setId(COrderAcceptId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")
	public CGeneralMaterial getCGeneralMaterial() {
		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial) {
		this.CGeneralMaterial = CGeneralMaterial;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "order_no", nullable = false, insertable = false, updatable = false)
	public COrderHead getCOrderHead() {
		return this.COrderHead;
	}

	public void setCOrderHead(COrderHead COrderHead) {
		this.COrderHead = COrderHead;
	}

	@Column(name = "unit", length = 20)
	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "delivery_number", precision = 12, scale = 0)
	public Float getDeliveryNumber() {
		return this.deliveryNumber;
	}

	public void setDeliveryNumber(Float deliveryNumber) {
		this.deliveryNumber = deliveryNumber;
	}

	@Column(name = "brand", length = 20)
	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(name = "accepted_number", precision = 12, scale = 0)
	public Float getAcceptedNumber() {
		return this.acceptedNumber;
	}

	public void setAcceptedNumber(Float acceptedNumber) {
		this.acceptedNumber = acceptedNumber;
	}

	@Column(name = "unit_price", precision = 15, scale = 7)
	public Double getUnitPrice() {
		return this.unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Column(name = "include_tax_price", precision = 15, scale = 7)
	public Double getIncludeTaxPrice() {
		return this.includeTaxPrice;
	}

	public void setIncludeTaxPrice(Double includeTaxPrice) {
		this.includeTaxPrice = includeTaxPrice;
	}

	@Column(name = "process_time", length = 0)
	public Timestamp getProcessTime() {
		return this.processTime;
	}

	public void setProcessTime(Timestamp processTime) {
		this.processTime = processTime;
	}

	@Column(name = "accept_storage_room_id")
	public Integer getAcceptStorageRoomId() {
		return this.acceptStorageRoomId;
	}

	public void setAcceptStorageRoomId(Integer acceptStorageRoomId) {
		this.acceptStorageRoomId = acceptStorageRoomId;
	}

	@Column(name = "cargo_space_id")
	public Integer getCargoSpaceId() {
		return this.cargoSpaceId;
	}

	public void setCargoSpaceId(Integer cargoSpaceId) {
		this.cargoSpaceId = cargoSpaceId;
	}

	@Column(name = "line_class")
	public String getLineClass() {
		return this.lineClass;
	}

	public void setLineClass(String lineClass) {
		this.lineClass = lineClass;
	}

	@Column(name = "state")
	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Column(name = "dispatch_no")
	public Integer getDispatchNo() {
		return this.dispatchNo;
	}

	public void setDispatchNo(Integer dispatchNo) {
		this.dispatchNo = dispatchNo;
	}

	@Column(name = "provide_no")
	public Integer getProvideNo() {
		return this.provideNo;
	}

	public void setProvideNo(Integer provideNo) {
		this.provideNo = provideNo;
	}

	@Column(name = "apply_no")
	public Integer getApplyNo() {
		return this.applyNo;
	}

	public void setApplyNo(Integer applyNo) {
		this.applyNo = applyNo;
	}

	@Column(name = "apply_line_no")
	public Integer getApplyLineNo() {
		return this.applyLineNo;
	}

	public void setApplyLineNo(Integer applyLineNo) {
		this.applyLineNo = applyLineNo;
	}

	@Column(name = "cancle_number", precision = 12, scale = 0)
	public Float getCancleNumber() {
		return this.cancleNumber;
	}

	public void setCancleNumber(Float cancleNumber) {
		this.cancleNumber = cancleNumber;
	}

	@Column(name = "stamp_ornot", length = 10)
	public String getStampOrnot() {
		return this.stampOrnot;
	}

	public void setStampOrnot(String stampOrnot) {
		this.stampOrnot = stampOrnot;
	}

	@Column(name = "sssue_ticket", length = 10)
	public String getSssueTicket() {
		return this.sssueTicket;
	}

	public void setSssueTicket(String sssueTicket) {
		this.sssueTicket = sssueTicket;
	}

	@Column(name = "demand_time", length = 0)
	public Timestamp getDemandTime() {
		return this.demandTime;
	}

	public void setDemandTime(Timestamp demandTime) {
		this.demandTime = demandTime;
	}

	@Column(name = "sssue_ticket_number", precision = 12, scale = 0)
	public Float getSssueTicketNumber() {
		return this.sssueTicketNumber;
	}

	public void setSssueTicketNumber(Float sssueTicketNumber) {
		this.sssueTicketNumber = sssueTicketNumber;
	}

}