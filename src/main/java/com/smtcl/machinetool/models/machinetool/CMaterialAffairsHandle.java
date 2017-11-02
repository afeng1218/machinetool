package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * CMaterialAffairsHandle entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_material_affairs_handle"
		, catalog = "machinetool"
)

public class CMaterialAffairsHandle implements java.io.Serializable{

	// Fields

	private Integer                transactionManagerId;
	private CCargoSpaceDefinition  CCargoSpaceDefinition;
	private CGeneralMaterial       CGeneralMaterial;
	private CSequenceList          CSequenceList;
	private CBatchList             CBatchList;
	private CStorageRoomDefinition CStorageRoomDefinition;
	private Integer                transactionManagerNo;
	private String                 sourceType;
	private String                 source;
	private String                 transactionManagerType;
	private String                 transactionManagerActivity;
	private String                 transactionManagerCompany;
	private Float                  totalTransactionManager;
	private Integer                transferInventoryId;
	private Integer                transferCargoSpaceId;
	private String                 createPerson;
	private Timestamp              createTime;
	private String                 stamp;
	private Timestamp              stampTime;
	private Integer                forwarding;
	private Integer                provide;
	private Double                 coverTheCost;
	private String                 makeInvoice;
	private Float                  makeInvoiceNu;
	private String                 transferDescribe;

	// Constructors

	/**
	 * default constructor
	 */
	public CMaterialAffairsHandle(){

	}

	/**
	 * minimal constructor
	 */
	public CMaterialAffairsHandle(Integer transactionManagerNo, String createPerson, Timestamp createTime, String stamp){

		this.transactionManagerNo = transactionManagerNo;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.stamp = stamp;
	}

	/**
	 * full constructor
	 */
	public CMaterialAffairsHandle(CCargoSpaceDefinition CCargoSpaceDefinition, CGeneralMaterial CGeneralMaterial, CSequenceList CSequenceList,
	                              CBatchList CBatchList, CStorageRoomDefinition CStorageRoomDefinition, Integer transactionManagerNo, String
                                          sourceType, String source, String transactionManagerType, String transactionManagerActivity, String
                                          transactionManagerCompany, Float totalTransactionManager, Integer transferInventoryId, Integer
                                          transferCargoSpaceId, String createPerson, Timestamp createTime, String stamp, Timestamp stampTime,
                                  Integer forwarding, Integer provide, Double coverTheCost, String makeInvoice, Float makeInvoiceNu, String
                                          transferDescribe){

		this.CCargoSpaceDefinition = CCargoSpaceDefinition;
		this.CGeneralMaterial = CGeneralMaterial;
		this.CSequenceList = CSequenceList;
		this.CBatchList = CBatchList;
		this.CStorageRoomDefinition = CStorageRoomDefinition;
		this.transactionManagerNo = transactionManagerNo;
		this.sourceType = sourceType;
		this.source = source;
		this.transactionManagerType = transactionManagerType;
		this.transactionManagerActivity = transactionManagerActivity;
		this.transactionManagerCompany = transactionManagerCompany;
		this.totalTransactionManager = totalTransactionManager;
		this.transferInventoryId = transferInventoryId;
		this.transferCargoSpaceId = transferCargoSpaceId;
		this.createPerson = createPerson;
		this.createTime = createTime;
		this.stamp = stamp;
		this.stampTime = stampTime;
		this.forwarding = forwarding;
		this.provide = provide;
		this.coverTheCost = coverTheCost;
		this.makeInvoice = makeInvoice;
		this.makeInvoiceNu = makeInvoiceNu;
		this.transferDescribe = transferDescribe;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "transaction_manager_id", unique = true, nullable = false)

	public Integer getTransactionManagerId(){

		return this.transactionManagerId;
	}

	public void setTransactionManagerId(Integer transactionManagerId){

		this.transactionManagerId = transactionManagerId;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "inventory_cargo_space_id")

	public CCargoSpaceDefinition getCCargoSpaceDefinition(){

		return this.CCargoSpaceDefinition;
	}

	public void setCCargoSpaceDefinition(CCargoSpaceDefinition CCargoSpaceDefinition){

		this.CCargoSpaceDefinition = CCargoSpaceDefinition;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "material_id")

	public CGeneralMaterial getCGeneralMaterial(){

		return this.CGeneralMaterial;
	}

	public void setCGeneralMaterial(CGeneralMaterial CGeneralMaterial){

		this.CGeneralMaterial = CGeneralMaterial;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "sequence_id")

	public CSequenceList getCSequenceList(){

		return this.CSequenceList;
	}

	public void setCSequenceList(CSequenceList CSequenceList){

		this.CSequenceList = CSequenceList;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "batch_id")

	public CBatchList getCBatchList(){

		return this.CBatchList;
	}

	public void setCBatchList(CBatchList CBatchList){

		this.CBatchList = CBatchList;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "stock_id")

	public CStorageRoomDefinition getCStorageRoomDefinition(){

		return this.CStorageRoomDefinition;
	}

	public void setCStorageRoomDefinition(CStorageRoomDefinition CStorageRoomDefinition){

		this.CStorageRoomDefinition = CStorageRoomDefinition;
	}

	@Column(name = "transaction_manager_no", nullable = false)

	public Integer getTransactionManagerNo(){

		return this.transactionManagerNo;
	}

	public void setTransactionManagerNo(Integer transactionManagerNo){

		this.transactionManagerNo = transactionManagerNo;
	}

	@Column(name = "source_type")

	public String getSourceType(){

		return this.sourceType;
	}

	public void setSourceType(String sourceType){

		this.sourceType = sourceType;
	}

	@Column(name = "source")

	public String getSource(){

		return this.source;
	}

	public void setSource(String source){

		this.source = source;
	}

	@Column(name = "transaction_manager_type")

	public String getTransactionManagerType(){

		return this.transactionManagerType;
	}

	public void setTransactionManagerType(String transactionManagerType){

		this.transactionManagerType = transactionManagerType;
	}

	@Column(name = "transaction_manager_activity")

	public String getTransactionManagerActivity(){

		return this.transactionManagerActivity;
	}

	public void setTransactionManagerActivity(String transactionManagerActivity){

		this.transactionManagerActivity = transactionManagerActivity;
	}

	@Column(name = "transaction_manager_company")

	public String getTransactionManagerCompany(){

		return this.transactionManagerCompany;
	}

	public void setTransactionManagerCompany(String transactionManagerCompany){

		this.transactionManagerCompany = transactionManagerCompany;
	}

	@Column(name = "total_transaction_manager", precision = 12, scale = 0)

	public Float getTotalTransactionManager(){

		return this.totalTransactionManager;
	}

	public void setTotalTransactionManager(Float totalTransactionManager){

		this.totalTransactionManager = totalTransactionManager;
	}

	@Column(name = "transfer_inventory_id")

	public Integer getTransferInventoryId(){

		return this.transferInventoryId;
	}

	public void setTransferInventoryId(Integer transferInventoryId){

		this.transferInventoryId = transferInventoryId;
	}

	@Column(name = "transfer_cargo_space_id")

	public Integer getTransferCargoSpaceId(){

		return this.transferCargoSpaceId;
	}

	public void setTransferCargoSpaceId(Integer transferCargoSpaceId){

		this.transferCargoSpaceId = transferCargoSpaceId;
	}

	@Column(name = "create_person", nullable = false)

	public String getCreatePerson(){

		return this.createPerson;
	}

	public void setCreatePerson(String createPerson){

		this.createPerson = createPerson;
	}

	@Column(name = "create_time", nullable = false, length = 19)

	public Timestamp getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime){

		this.createTime = createTime;
	}

	@Column(name = "stamp", nullable = false, length = 10)

	public String getStamp(){

		return this.stamp;
	}

	public void setStamp(String stamp){

		this.stamp = stamp;
	}

	@Column(name = "stamp_time", length = 19)

	public Timestamp getStampTime(){

		return this.stampTime;
	}

	public void setStampTime(Timestamp stampTime){

		this.stampTime = stampTime;
	}

	@Column(name = "forwarding")

	public Integer getForwarding(){

		return this.forwarding;
	}

	public void setForwarding(Integer forwarding){

		this.forwarding = forwarding;
	}

	@Column(name = "provide")

	public Integer getProvide(){

		return this.provide;
	}

	public void setProvide(Integer provide){

		this.provide = provide;
	}

	@Column(name = "cover_the_cost", precision = 15, scale = 7)

	public Double getCoverTheCost(){

		return this.coverTheCost;
	}

	public void setCoverTheCost(Double coverTheCost){

		this.coverTheCost = coverTheCost;
	}

	@Column(name = "make_invoice", length = 10)

	public String getMakeInvoice(){

		return this.makeInvoice;
	}

	public void setMakeInvoice(String makeInvoice){

		this.makeInvoice = makeInvoice;
	}

	@Column(name = "make_invoice_nu", precision = 12, scale = 0)

	public Float getMakeInvoiceNu(){

		return this.makeInvoiceNu;
	}

	public void setMakeInvoiceNu(Float makeInvoiceNu){

		this.makeInvoiceNu = makeInvoiceNu;
	}

	@Column(name = "transfer_describe", length = 50)

	public String getTransferDescribe(){

		return this.transferDescribe;
	}

	public void setTransferDescribe(String transferDescribe){

		this.transferDescribe = transferDescribe;
	}

}