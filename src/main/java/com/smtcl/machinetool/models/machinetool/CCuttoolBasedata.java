package com.smtcl.machinetool.models.machinetool;

import java.util.Date;
import java.util.Set;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * CCuttoolBasedata entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cuttool_basedata", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "cuttool_no"))
public class CCuttoolBasedata implements java.io.Serializable{

	// Fields

	private Integer cuttoolId;
	private String  cuttoolNo;
	private String  barCode;
	private String  characteristicDescription;
	private String  cuttoolDescription;
	private Integer lifetimeTracking;
	private Integer priorityLevel;
	private Float   programmingDiameterLarge;
	private Float   programmingDiameterSmall;
	private Float   programmingDiameterLength;
	private String  cuttoolTeam;
	private String  cuttoolHandleType;
	private String  fun;
	private String  type;
	private Integer usingStatus;
	private String  statusDescription;
	private Integer initialLifetime;
	private Integer surplusLifetime;
	private Integer lifeAlarm;
	private Integer amountChangeEdge;
	private Integer amountProcessingTime;
	private Integer initiateStatus;
	private Integer isScrap;
	private String  initialStock;
	private String  intialGoodsAllocation;
	private Date    createTime;
	private String  createUser;
	private Date    updateTme;
	private String  updateUser;
	private String  graphical;
	private Integer sendState;
	/*private Set<CSolidCuttoolParameter> CSolidCuttoolParameters = new HashSet<CSolidCuttoolParameter>(
			0);
	private Set<CCuttoolIssuePlan> CCuttoolIssuePlans = new HashSet<CCuttoolIssuePlan>(
			0);
	private Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles = new HashSet<CCuttoolBorrowTitle>(
			0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public CCuttoolBasedata(){

	}

	/**
	 * minimal constructor
	 */
	public CCuttoolBasedata(Integer cuttoolId, String cuttoolNo,
	                        Integer lifetimeTracking, Integer usingStatus,
	                        Integer initiateStatus, Integer isScrap){

		this.cuttoolId = cuttoolId;
		this.cuttoolNo = cuttoolNo;
		this.lifetimeTracking = lifetimeTracking;
		this.usingStatus = usingStatus;
		this.initiateStatus = initiateStatus;
		this.isScrap = isScrap;
	}

	/**
	 * full constructor
	 */
	public CCuttoolBasedata(Integer cuttoolId, String cuttoolNo,
	                        String barCode, String characteristicDescription,
	                        String cuttoolDescription, Integer lifetimeTracking,
	                        Integer priorityLevel, Float programmingDiameterLarge,
	                        Float programmingDiameterSmall, Float programmingDiameterLength,
	                        String cuttoolTeam, String cuttoolHandleType, String fun,
	                        String type, Integer usingStatus, String statusDescription,
	                        Integer initialLifetime, Integer surplusLifetime,
	                        Integer lifeAlarm, Integer amountChangeEdge,
	                        Integer amountProcessingTime, Integer initiateStatus,
	                        Integer isScrap, String initialStock, String intialGoodsAllocation,
	                        Date createTime, String createUser, Date updateTme,
	                        String updateUser, String graphical, Integer sendState,
	                        Set<CSolidCuttoolParameter> CSolidCuttoolParameters,
	                        Set<CCuttoolIssuePlan> CCuttoolIssuePlans,
	                        Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles){

		this.cuttoolId = cuttoolId;
		this.cuttoolNo = cuttoolNo;
		this.barCode = barCode;
		this.characteristicDescription = characteristicDescription;
		this.cuttoolDescription = cuttoolDescription;
		this.lifetimeTracking = lifetimeTracking;
		this.priorityLevel = priorityLevel;
		this.programmingDiameterLarge = programmingDiameterLarge;
		this.programmingDiameterSmall = programmingDiameterSmall;
		this.programmingDiameterLength = programmingDiameterLength;
		this.cuttoolTeam = cuttoolTeam;
		this.cuttoolHandleType = cuttoolHandleType;
		this.fun = fun;
		this.type = type;
		this.usingStatus = usingStatus;
		this.statusDescription = statusDescription;
		this.initialLifetime = initialLifetime;
		this.surplusLifetime = surplusLifetime;
		this.lifeAlarm = lifeAlarm;
		this.amountChangeEdge = amountChangeEdge;
		this.amountProcessingTime = amountProcessingTime;
		this.initiateStatus = initiateStatus;
		this.isScrap = isScrap;
		this.initialStock = initialStock;
		this.intialGoodsAllocation = intialGoodsAllocation;
		this.createTime = createTime;
		this.createUser = createUser;
		this.updateTme = updateTme;
		this.updateUser = updateUser;
		this.graphical = graphical;
		this.sendState = sendState;
	/*	this.CSolidCuttoolParameters = CSolidCuttoolParameters;
		this.CCuttoolIssuePlans = CCuttoolIssuePlans;
		this.CCuttoolBorrowTitles = CCuttoolBorrowTitles;*/
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "cuttool_id", unique = true, nullable = false)
	public Integer getCuttoolId(){

		return this.cuttoolId;
	}

	public void setCuttoolId(Integer cuttoolId){

		this.cuttoolId = cuttoolId;
	}

	@Column(name = "cuttool_no", unique = true, nullable = false, length = 20)
	public String getCuttoolNo(){

		return this.cuttoolNo;
	}

	public void setCuttoolNo(String cuttoolNo){

		this.cuttoolNo = cuttoolNo;
	}

	@Column(name = "bar_code", length = 20)
	public String getBarCode(){

		return this.barCode;
	}

	public void setBarCode(String barCode){

		this.barCode = barCode;
	}

	@Column(name = "characteristic_description", length = 20)
	public String getCharacteristicDescription(){

		return this.characteristicDescription;
	}

	public void setCharacteristicDescription(String characteristicDescription){

		this.characteristicDescription = characteristicDescription;
	}

	@Column(name = "cuttool_description", length = 50)
	public String getCuttoolDescription(){

		return this.cuttoolDescription;
	}

	public void setCuttoolDescription(String cuttoolDescription){

		this.cuttoolDescription = cuttoolDescription;
	}

	@Column(name = "lifetime_tracking", nullable = false)
	public Integer getLifetimeTracking(){

		return this.lifetimeTracking;
	}

	public void setLifetimeTracking(Integer lifetimeTracking){

		this.lifetimeTracking = lifetimeTracking;
	}

	@Column(name = "priority_level")
	public Integer getPriorityLevel(){

		return this.priorityLevel;
	}

	public void setPriorityLevel(Integer priorityLevel){

		this.priorityLevel = priorityLevel;
	}

	@Column(name = "programming_diameter_large", precision = 20, scale = 6)
	public Float getProgrammingDiameterLarge(){

		return this.programmingDiameterLarge;
	}

	public void setProgrammingDiameterLarge(Float programmingDiameterLarge){

		this.programmingDiameterLarge = programmingDiameterLarge;
	}

	@Column(name = "programming_diameter_small", precision = 20, scale = 6)
	public Float getProgrammingDiameterSmall(){

		return this.programmingDiameterSmall;
	}

	public void setProgrammingDiameterSmall(Float programmingDiameterSmall){

		this.programmingDiameterSmall = programmingDiameterSmall;
	}

	@Column(name = "programming_diameter_length", precision =20, scale = 6)
	public Float getProgrammingDiameterLength(){

		return this.programmingDiameterLength;
	}

	public void setProgrammingDiameterLength(Float programmingDiameterLength){

		this.programmingDiameterLength = programmingDiameterLength;
	}

	@Column(name = "cuttool_team", length = 20)
	public String getCuttoolTeam(){

		return this.cuttoolTeam;
	}

	public void setCuttoolTeam(String cuttoolTeam){

		this.cuttoolTeam = cuttoolTeam;
	}

	@Column(name = "cuttool_handle_type", length = 20)
	public String getCuttoolHandleType(){

		return this.cuttoolHandleType;
	}

	public void setCuttoolHandleType(String cuttoolHandleType){

		this.cuttoolHandleType = cuttoolHandleType;
	}

	@Column(name = "fun", length = 20)
	public String getFun(){

		return this.fun;
	}

	public void setFun(String fun){

		this.fun = fun;
	}

	@Column(name = "type", length = 20)
	public String getType(){

		return this.type;
	}

	public void setType(String type){

		this.type = type;
	}

	@Column(name = "using_status", nullable = false)
	public Integer getUsingStatus(){

		return this.usingStatus;
	}

	public void setUsingStatus(Integer usingStatus){

		this.usingStatus = usingStatus;
	}

	@Column(name = "status_description", length = 30)
	public String getStatusDescription(){

		return this.statusDescription;
	}

	public void setStatusDescription(String statusDescription){

		this.statusDescription = statusDescription;
	}

	@Column(name = "initial_lifetime")
	public Integer getInitialLifetime(){

		return this.initialLifetime;
	}

	public void setInitialLifetime(Integer initialLifetime){

		this.initialLifetime = initialLifetime;
	}

	@Column(name = "surplus_lifetime")
	public Integer getSurplusLifetime(){

		return this.surplusLifetime;
	}

	public void setSurplusLifetime(Integer surplusLifetime){

		this.surplusLifetime = surplusLifetime;
	}

	@Column(name = "life_alarm")
	public Integer getLifeAlarm(){

		return this.lifeAlarm;
	}

	public void setLifeAlarm(Integer lifeAlarm){

		this.lifeAlarm = lifeAlarm;
	}

	@Column(name = "amount_change_edge")
	public Integer getAmountChangeEdge(){

		return this.amountChangeEdge;
	}

	public void setAmountChangeEdge(Integer amountChangeEdge){

		this.amountChangeEdge = amountChangeEdge;
	}

	@Column(name = "amount_processing_time")
	public Integer getAmountProcessingTime(){

		return this.amountProcessingTime;
	}

	public void setAmountProcessingTime(Integer amountProcessingTime){

		this.amountProcessingTime = amountProcessingTime;
	}

	@Column(name = "initiate_status", nullable = false)
	public Integer getInitiateStatus(){

		return this.initiateStatus;
	}

	public void setInitiateStatus(Integer initiateStatus){

		this.initiateStatus = initiateStatus;
	}

	@Column(name = "isScrap", nullable = false)
	public Integer getIsScrap(){

		return this.isScrap;
	}

	public void setIsScrap(Integer isScrap){

		this.isScrap = isScrap;
	}

	@Column(name = "initial_stock", length = 20)
	public String getInitialStock(){

		return this.initialStock;
	}

	public void setInitialStock(String initialStock){

		this.initialStock = initialStock;
	}

	@Column(name = "intial_goods_allocation", length = 20)
	public String getIntialGoodsAllocation(){

		return this.intialGoodsAllocation;
	}

	public void setIntialGoodsAllocation(String intialGoodsAllocation){

		this.intialGoodsAllocation = intialGoodsAllocation;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "create_time", length = 0)
	public Date getCreateTime(){

		return this.createTime;
	}

	public void setCreateTime(Date createTime){

		this.createTime = createTime;
	}

	@Column(name = "create_user", length = 20)
	public String getCreateUser(){

		return this.createUser;
	}

	public void setCreateUser(String createUser){

		this.createUser = createUser;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "update_tme", length = 0)
	public Date getUpdateTme(){

		return this.updateTme;
	}

	public void setUpdateTme(Date updateTme){

		this.updateTme = updateTme;
	}

	@Column(name = "update_user", length = 20)
	public String getUpdateUser(){

		return this.updateUser;
	}

	public void setUpdateUser(String updateUser){

		this.updateUser = updateUser;
	}

	@Column(name = "graphical")
	public String getGraphical(){

		return this.graphical;
	}

	public void setGraphical(String graphical){

		this.graphical = graphical;
	}

	@Column(name = "send_state")
	public Integer getSendState(){

		return this.sendState;
	}

	public void setSendState(Integer sendState){

		this.sendState = sendState;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "CCuttoolBasedata")
	public Set<CSolidCuttoolParameter> getCSolidCuttoolParameters(){

		return this.CSolidCuttoolParameters;
	}

	public void setCSolidCuttoolParameters(
			Set<CSolidCuttoolParameter> CSolidCuttoolParameters){

		this.CSolidCuttoolParameters = CSolidCuttoolParameters;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "CCuttoolBasedata")
	public Set<CCuttoolIssuePlan> getCCuttoolIssuePlans(){

		return this.CCuttoolIssuePlans;
	}

	public void setCCuttoolIssuePlans(Set<CCuttoolIssuePlan> CCuttoolIssuePlans){

		this.CCuttoolIssuePlans = CCuttoolIssuePlans;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "CCuttoolBasedata")
	public Set<CCuttoolBorrowTitle> getCCuttoolBorrowTitles(){

		return this.CCuttoolBorrowTitles;
	}

	public void setCCuttoolBorrowTitles(
			Set<CCuttoolBorrowTitle> CCuttoolBorrowTitles){

		this.CCuttoolBorrowTitles = CCuttoolBorrowTitles;
	}*/

}