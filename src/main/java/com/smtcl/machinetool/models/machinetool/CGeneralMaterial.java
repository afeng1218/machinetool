package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CGeneralMaterial entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_general_material", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "material_no"))
public class CGeneralMaterial implements java.io.Serializable {

    // Fields

    private Integer materialId;
    private String materialNo;
    private String materialDescribe;
    private String secondCode;
    private String materialType;
    private String materialClass;
    private String materialUnit;
    private String auxiliaryUnit;
    private String transferCoefficient;
    private String state;
    private String useOrnot;
    private Integer stockMaterialOrnot;
    private Integer versionControlOrnot;
    private Integer canStoreOrnot;
    private Integer canHandleOrnot;
    private Integer canRetainOrnot;
    private Integer storagePeriodControl;
    private String storagePeriodUnit;
    private Integer batchControl;
    private String batchControlStartPrefix;
    private String batchControlStartNo;
    private Integer sequenceControl;
    private String sequenceStartPrefix;
    private Integer libraryControl;
    private String sequenceStartNo;
    private Integer restrictedSubInventory;
    private Integer restrictedCargoSpace;
    private Double unit;
    private String buyer;
    private String inventoryPlan;
    private String planner;
    private String manufactureOrProcure;
    private Float inventoryMax;
    private Float inventoryMin;
    private Float orderAmountMin;
    private Float orderAmountMax;
    private Float costOrder;
    private Float keepRate;
    private Integer safetyInventoryDays;
    private Float safetyInventory;
    private Float safetyInventoryPercentage;
    private Integer inPreprocessing;
    private Integer inProcessing;
    private Integer postprocessing;
    private String createPerson;
    private Timestamp createTime;
    private String updatePerson;
    private Timestamp updateTime;
    private String remarks;

    // Constructors

    /** default constructor */
    public CGeneralMaterial() {
    }

    /** minimal constructor */
    public CGeneralMaterial(String materialNo, String state,
                            Integer stockMaterialOrnot, Integer versionControlOrnot,
                            Integer canStoreOrnot, Integer canHandleOrnot,
                            Integer canRetainOrnot, Integer storagePeriodControl,
                            Integer batchControl, Integer sequenceControl,
                            Integer libraryControl, Integer restrictedSubInventory,
                            Integer restrictedCargoSpace, String inventoryPlan,
                            String manufactureOrProcure) {
        this.materialNo = materialNo;
        this.state = state;
        this.stockMaterialOrnot = stockMaterialOrnot;
        this.versionControlOrnot = versionControlOrnot;
        this.canStoreOrnot = canStoreOrnot;
        this.canHandleOrnot = canHandleOrnot;
        this.canRetainOrnot = canRetainOrnot;
        this.storagePeriodControl = storagePeriodControl;
        this.batchControl = batchControl;
        this.sequenceControl = sequenceControl;
        this.libraryControl = libraryControl;
        this.restrictedSubInventory = restrictedSubInventory;
        this.restrictedCargoSpace = restrictedCargoSpace;
        this.inventoryPlan = inventoryPlan;
        this.manufactureOrProcure = manufactureOrProcure;
    }

    /** full constructor */
    public CGeneralMaterial(String materialNo, String materialDescribe,
                            String secondCode, String materialType, String materialClass,
                            String materialUnit, String auxiliaryUnit,
                            String transferCoefficient, String state, String useOrnot,
                            Integer stockMaterialOrnot, Integer versionControlOrnot,
                            Integer canStoreOrnot, Integer canHandleOrnot,
                            Integer canRetainOrnot, Integer storagePeriodControl,
                            String storagePeriodUnit, Integer batchControl,
                            String batchControlStartPrefix, String batchControlStartNo,
                            Integer sequenceControl, String sequenceStartPrefix,
                            Integer libraryControl, String sequenceStartNo,
                            Integer restrictedSubInventory, Integer restrictedCargoSpace,
                            Double unit, String buyer, String inventoryPlan, String planner,
                            String manufactureOrProcure, Float inventoryMax,
                            Float inventoryMin, Float orderAmountMin, Float orderAmountMax,
                            Float costOrder, Float keepRate, Integer safetyInventoryDays,
                            Float safetyInventory, Float safetyInventoryPercentage,
                            Integer inPreprocessing, Integer inProcessing,
                            Integer postprocessing, String createPerson, Timestamp createTime,
                            String updatePerson, Timestamp updateTime, String remarks) {
        this.materialNo = materialNo;
        this.materialDescribe = materialDescribe;
        this.secondCode = secondCode;
        this.materialType = materialType;
        this.materialClass = materialClass;
        this.materialUnit = materialUnit;
        this.auxiliaryUnit = auxiliaryUnit;
        this.transferCoefficient = transferCoefficient;
        this.state = state;
        this.useOrnot = useOrnot;
        this.stockMaterialOrnot = stockMaterialOrnot;
        this.versionControlOrnot = versionControlOrnot;
        this.canStoreOrnot = canStoreOrnot;
        this.canHandleOrnot = canHandleOrnot;
        this.canRetainOrnot = canRetainOrnot;
        this.storagePeriodControl = storagePeriodControl;
        this.storagePeriodUnit = storagePeriodUnit;
        this.batchControl = batchControl;
        this.batchControlStartPrefix = batchControlStartPrefix;
        this.batchControlStartNo = batchControlStartNo;
        this.sequenceControl = sequenceControl;
        this.sequenceStartPrefix = sequenceStartPrefix;
        this.libraryControl = libraryControl;
        this.sequenceStartNo = sequenceStartNo;
        this.restrictedSubInventory = restrictedSubInventory;
        this.restrictedCargoSpace = restrictedCargoSpace;
        this.unit = unit;
        this.buyer = buyer;
        this.inventoryPlan = inventoryPlan;
        this.planner = planner;
        this.manufactureOrProcure = manufactureOrProcure;
        this.inventoryMax = inventoryMax;
        this.inventoryMin = inventoryMin;
        this.orderAmountMin = orderAmountMin;
        this.orderAmountMax = orderAmountMax;
        this.costOrder = costOrder;
        this.keepRate = keepRate;
        this.safetyInventoryDays = safetyInventoryDays;
        this.safetyInventory = safetyInventory;
        this.safetyInventoryPercentage = safetyInventoryPercentage;
        this.inPreprocessing = inPreprocessing;
        this.inProcessing = inProcessing;
        this.postprocessing = postprocessing;
        this.createPerson = createPerson;
        this.createTime = createTime;
        this.updatePerson = updatePerson;
        this.updateTime = updateTime;
        this.remarks = remarks;
    }

    // Property accessors
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "material_id", unique = true, nullable = false)
    public Integer getMaterialId() {
        return this.materialId;
    }

    public void setMaterialId(Integer materialId) {
        this.materialId = materialId;
    }

    @Column(name = "material_no", unique = true, nullable = false)
    public String getMaterialNo() {
        return this.materialNo;
    }

    public void setMaterialNo(String materialNo) {
        this.materialNo = materialNo;
    }

    @Column(name = "material_describe")
    public String getMaterialDescribe() {
        return this.materialDescribe;
    }

    public void setMaterialDescribe(String materialDescribe) {
        this.materialDescribe = materialDescribe;
    }

    @Column(name = "second_code")
    public String getSecondCode() {
        return this.secondCode;
    }

    public void setSecondCode(String secondCode) {
        this.secondCode = secondCode;
    }

    @Column(name = "material_type")
    public String getMaterialType() {
        return this.materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    @Column(name = "material_class")
    public String getMaterialClass() {
        return this.materialClass;
    }

    public void setMaterialClass(String materialClass) {
        this.materialClass = materialClass;
    }

    @Column(name = "material_unit")
    public String getMaterialUnit() {
        return this.materialUnit;
    }

    public void setMaterialUnit(String materialUnit) {
        this.materialUnit = materialUnit;
    }

    @Column(name = "auxiliary_unit")
    public String getAuxiliaryUnit() {
        return this.auxiliaryUnit;
    }

    public void setAuxiliaryUnit(String auxiliaryUnit) {
        this.auxiliaryUnit = auxiliaryUnit;
    }

    @Column(name = "transfer_coefficient")
    public String getTransferCoefficient() {
        return this.transferCoefficient;
    }

    public void setTransferCoefficient(String transferCoefficient) {
        this.transferCoefficient = transferCoefficient;
    }

    @Column(name = "state", nullable = false)
    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Column(name = "use_ornot")
    public String getUseOrnot() {
        return this.useOrnot;
    }

    public void setUseOrnot(String useOrnot) {
        this.useOrnot = useOrnot;
    }

    @Column(name = "stock_material_ornot", nullable = false)
    public Integer getStockMaterialOrnot() {
        return this.stockMaterialOrnot;
    }

    public void setStockMaterialOrnot(Integer stockMaterialOrnot) {
        this.stockMaterialOrnot = stockMaterialOrnot;
    }

    @Column(name = "version_control_ornot", nullable = false)
    public Integer getVersionControlOrnot() {
        return this.versionControlOrnot;
    }

    public void setVersionControlOrnot(Integer versionControlOrnot) {
        this.versionControlOrnot = versionControlOrnot;
    }

    @Column(name = "can_store_ornot", nullable = false)
    public Integer getCanStoreOrnot() {
        return this.canStoreOrnot;
    }

    public void setCanStoreOrnot(Integer canStoreOrnot) {
        this.canStoreOrnot = canStoreOrnot;
    }

    @Column(name = "can_handle_ornot", nullable = false)
    public Integer getCanHandleOrnot() {
        return this.canHandleOrnot;
    }

    public void setCanHandleOrnot(Integer canHandleOrnot) {
        this.canHandleOrnot = canHandleOrnot;
    }

    @Column(name = "can_retain_ornot", nullable = false)
    public Integer getCanRetainOrnot() {
        return this.canRetainOrnot;
    }

    public void setCanRetainOrnot(Integer canRetainOrnot) {
        this.canRetainOrnot = canRetainOrnot;
    }

    @Column(name = "storage_period_control", nullable = false)
    public Integer getStoragePeriodControl() {
        return this.storagePeriodControl;
    }

    public void setStoragePeriodControl(Integer storagePeriodControl) {
        this.storagePeriodControl = storagePeriodControl;
    }

    @Column(name = "storage_period_unit", length = 20)
    public String getStoragePeriodUnit() {
        return this.storagePeriodUnit;
    }

    public void setStoragePeriodUnit(String storagePeriodUnit) {
        this.storagePeriodUnit = storagePeriodUnit;
    }

    @Column(name = "batch_control", nullable = false)
    public Integer getBatchControl() {
        return this.batchControl;
    }

    public void setBatchControl(Integer batchControl) {
        this.batchControl = batchControl;
    }

    @Column(name = "batch_control_start_prefix", length = 10)
    public String getBatchControlStartPrefix() {
        return this.batchControlStartPrefix;
    }

    public void setBatchControlStartPrefix(String batchControlStartPrefix) {
        this.batchControlStartPrefix = batchControlStartPrefix;
    }

    @Column(name = "batch_control_start_no", length = 10)
    public String getBatchControlStartNo() {
        return this.batchControlStartNo;
    }

    public void setBatchControlStartNo(String batchControlStartNo) {
        this.batchControlStartNo = batchControlStartNo;
    }

    @Column(name = "sequence_control", nullable = false)
    public Integer getSequenceControl() {
        return this.sequenceControl;
    }

    public void setSequenceControl(Integer sequenceControl) {
        this.sequenceControl = sequenceControl;
    }

    @Column(name = "sequence_start_prefix", length = 10)
    public String getSequenceStartPrefix() {
        return this.sequenceStartPrefix;
    }

    public void setSequenceStartPrefix(String sequenceStartPrefix) {
        this.sequenceStartPrefix = sequenceStartPrefix;
    }

    @Column(name = "library_control", nullable = false)
    public Integer getLibraryControl() {
        return this.libraryControl;
    }

    public void setLibraryControl(Integer libraryControl) {
        this.libraryControl = libraryControl;
    }

    @Column(name = "sequence_start_no", length = 10)
    public String getSequenceStartNo() {
        return this.sequenceStartNo;
    }

    public void setSequenceStartNo(String sequenceStartNo) {
        this.sequenceStartNo = sequenceStartNo;
    }

    @Column(name = "restricted_sub_inventory", nullable = false)
    public Integer getRestrictedSubInventory() {
        return this.restrictedSubInventory;
    }

    public void setRestrictedSubInventory(Integer restrictedSubInventory) {
        this.restrictedSubInventory = restrictedSubInventory;
    }

    @Column(name = "restricted_cargo_space", nullable = false)
    public Integer getRestrictedCargoSpace() {
        return this.restrictedCargoSpace;
    }

    public void setRestrictedCargoSpace(Integer restrictedCargoSpace) {
        this.restrictedCargoSpace = restrictedCargoSpace;
    }

    @Column(name = "unit", precision = 15, scale = 7)
    public Double getUnit() {
        return this.unit;
    }

    public void setUnit(Double unit) {
        this.unit = unit;
    }

    @Column(name = "buyer")
    public String getBuyer() {
        return this.buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    @Column(name = "inventory_plan", nullable = false)
    public String getInventoryPlan() {
        return this.inventoryPlan;
    }

    public void setInventoryPlan(String inventoryPlan) {
        this.inventoryPlan = inventoryPlan;
    }

    @Column(name = "planner", length = 12)
    public String getPlanner() {
        return this.planner;
    }

    public void setPlanner(String planner) {
        this.planner = planner;
    }

    @Column(name = "manufacture_or_procure", nullable = false)
    public String getManufactureOrProcure() {
        return this.manufactureOrProcure;
    }

    public void setManufactureOrProcure(String manufactureOrProcure) {
        this.manufactureOrProcure = manufactureOrProcure;
    }

    @Column(name = "inventory_max", precision = 15, scale = 7)
    public Float getInventoryMax() {
        return this.inventoryMax;
    }

    public void setInventoryMax(Float inventoryMax) {
        this.inventoryMax = inventoryMax;
    }

    @Column(name = "inventory_min", precision = 15, scale = 7)
    public Float getInventoryMin() {
        return this.inventoryMin;
    }

    public void setInventoryMin(Float inventoryMin) {
        this.inventoryMin = inventoryMin;
    }

    @Column(name = "order_amount_min", precision = 15, scale = 7)
    public Float getOrderAmountMin() {
        return this.orderAmountMin;
    }

    public void setOrderAmountMin(Float orderAmountMin) {
        this.orderAmountMin = orderAmountMin;
    }

    @Column(name = "order_amount_max", precision = 15, scale = 7)
    public Float getOrderAmountMax() {
        return this.orderAmountMax;
    }

    public void setOrderAmountMax(Float orderAmountMax) {
        this.orderAmountMax = orderAmountMax;
    }

    @Column(name = "cost_order", precision = 15, scale = 7)
    public Float getCostOrder() {
        return this.costOrder;
    }

    public void setCostOrder(Float costOrder) {
        this.costOrder = costOrder;
    }

    @Column(name = "keep_rate", precision = 15, scale = 7)
    public Float getKeepRate() {
        return this.keepRate;
    }

    public void setKeepRate(Float keepRate) {
        this.keepRate = keepRate;
    }

    @Column(name = "safety_inventory_days")
    public Integer getSafetyInventoryDays() {
        return this.safetyInventoryDays;
    }

    public void setSafetyInventoryDays(Integer safetyInventoryDays) {
        this.safetyInventoryDays = safetyInventoryDays;
    }

    @Column(name = "safety_inventory", precision = 15, scale = 7)
    public Float getSafetyInventory() {
        return this.safetyInventory;
    }

    public void setSafetyInventory(Float safetyInventory) {
        this.safetyInventory = safetyInventory;
    }

    @Column(name = "safety_inventory_percentage", precision = 15, scale = 7)
    public Float getSafetyInventoryPercentage() {
        return this.safetyInventoryPercentage;
    }

    public void setSafetyInventoryPercentage(Float safetyInventoryPercentage) {
        this.safetyInventoryPercentage = safetyInventoryPercentage;
    }

    @Column(name = "in_preprocessing")
    public Integer getInPreprocessing() {
        return this.inPreprocessing;
    }

    public void setInPreprocessing(Integer inPreprocessing) {
        this.inPreprocessing = inPreprocessing;
    }

    @Column(name = "in_processing")
    public Integer getInProcessing() {
        return this.inProcessing;
    }

    public void setInProcessing(Integer inProcessing) {
        this.inProcessing = inProcessing;
    }

    @Column(name = "postprocessing")
    public Integer getPostprocessing() {
        return this.postprocessing;
    }

    public void setPostprocessing(Integer postprocessing) {
        this.postprocessing = postprocessing;
    }

    @Column(name = "create_person", length = 15)
    public String getCreatePerson() {
        return this.createPerson;
    }

    public void setCreatePerson(String createPerson) {
        this.createPerson = createPerson;
    }

    @Column(name = "create_time", length = 19)
    public Timestamp getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Column(name = "update_person", length = 15)
    public String getUpdatePerson() {
        return this.updatePerson;
    }

    public void setUpdatePerson(String updatePerson) {
        this.updatePerson = updatePerson;
    }

    @Column(name = "update_time", length = 19)
    public Timestamp getUpdateTime() {
        return this.updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @Column(name = "remarks", length = 100)
    public String getRemarks() {
        return this.remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

}