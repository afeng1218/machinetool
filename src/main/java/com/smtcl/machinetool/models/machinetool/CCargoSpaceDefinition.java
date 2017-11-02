package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * CCargoSpaceDefinition entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_cargo_space_definition", catalog = "machinetool", uniqueConstraints = @UniqueConstraint(columnNames = "cargo_space_no"))
public class CCargoSpaceDefinition implements java.io.Serializable {

    // Fields

    private Integer cargoSpaceId;
    private CUnit CUnitByDimensionUnit;
    private CStorageRoomDefinition CStorageRoomDefinition;
    private CUnit CUnitByQuantityUnit;
    private CUnit CUnitByVolumeUnit;
    private CUnit CUnitByWeightUnit;
    private String cargoSpaceNo;
    private String barcode;
    private String cargoSpaceExplain;
    private String cargoSpaceState;
    private Timestamp invalidDate;
    private Float maxNumber;
    private Float volumeSize;
    private Float weight;
    private Float dimension;
    private String coordinate;
    private Set<CMaterialAffairsHandle> CMaterialAffairsHandles = new HashSet<CMaterialAffairsHandle>(
            0);

    // Constructors

    /**
     * default constructor
     */
    public CCargoSpaceDefinition() {
    }

    /**
     * minimal constructor
     */
    public CCargoSpaceDefinition(CStorageRoomDefinition CStorageRoomDefinition) {
        this.CStorageRoomDefinition = CStorageRoomDefinition;
    }

    /**
     * full constructor
     */
    public CCargoSpaceDefinition(CUnit CUnitByDimensionUnit,
                                 CStorageRoomDefinition CStorageRoomDefinition,
                                 CUnit CUnitByQuantityUnit, CUnit CUnitByVolumeUnit,
                                 CUnit CUnitByWeightUnit, String cargoSpaceNo, String barcode,
                                 String cargoSpaceExplain, String cargoSpaceState,
                                 Timestamp invalidDate, Float maxNumber, Float volumeSize,
                                 Float weight, Float dimension, String coordinate,
                                 Set<CMaterialAffairsHandle> CMaterialAffairsHandles) {
        this.CUnitByDimensionUnit = CUnitByDimensionUnit;
        this.CStorageRoomDefinition = CStorageRoomDefinition;
        this.CUnitByQuantityUnit = CUnitByQuantityUnit;
        this.CUnitByVolumeUnit = CUnitByVolumeUnit;
        this.CUnitByWeightUnit = CUnitByWeightUnit;
        this.cargoSpaceNo = cargoSpaceNo;
        this.barcode = barcode;
        this.cargoSpaceExplain = cargoSpaceExplain;
        this.cargoSpaceState = cargoSpaceState;
        this.invalidDate = invalidDate;
        this.maxNumber = maxNumber;
        this.volumeSize = volumeSize;
        this.weight = weight;
        this.dimension = dimension;
        this.coordinate = coordinate;
        this.CMaterialAffairsHandles = CMaterialAffairsHandles;
    }

    // Property accessors
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "cargo_space_id", unique = true, nullable = false)
    public Integer getCargoSpaceId() {
        return this.cargoSpaceId;
    }

    public void setCargoSpaceId(Integer cargoSpaceId) {
        this.cargoSpaceId = cargoSpaceId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dimension_unit")
    public CUnit getCUnitByDimensionUnit() {
        return this.CUnitByDimensionUnit;
    }

    public void setCUnitByDimensionUnit(CUnit CUnitByDimensionUnit) {
        this.CUnitByDimensionUnit = CUnitByDimensionUnit;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "storage_room_id", nullable = false)
    public CStorageRoomDefinition getCStorageRoomDefinition() {
        return this.CStorageRoomDefinition;
    }

    public void setCStorageRoomDefinition(
            CStorageRoomDefinition CStorageRoomDefinition) {
        this.CStorageRoomDefinition = CStorageRoomDefinition;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quantity_unit")
    public CUnit getCUnitByQuantityUnit() {
        return this.CUnitByQuantityUnit;
    }

    public void setCUnitByQuantityUnit(CUnit CUnitByQuantityUnit) {
        this.CUnitByQuantityUnit = CUnitByQuantityUnit;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "volume_unit")
    public CUnit getCUnitByVolumeUnit() {
        return this.CUnitByVolumeUnit;
    }

    public void setCUnitByVolumeUnit(CUnit CUnitByVolumeUnit) {
        this.CUnitByVolumeUnit = CUnitByVolumeUnit;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "weight_unit")
    public CUnit getCUnitByWeightUnit() {
        return this.CUnitByWeightUnit;
    }

    public void setCUnitByWeightUnit(CUnit CUnitByWeightUnit) {
        this.CUnitByWeightUnit = CUnitByWeightUnit;
    }

    @Column(name = "cargo_space_no", unique = true, length = 30)
    public String getCargoSpaceNo() {
        return this.cargoSpaceNo;
    }

    public void setCargoSpaceNo(String cargoSpaceNo) {
        this.cargoSpaceNo = cargoSpaceNo;
    }

    @Column(name = "barcode")
    public String getBarcode() {
        return this.barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    @Column(name = "cargo_space_explain", length = 50)
    public String getCargoSpaceExplain() {
        return this.cargoSpaceExplain;
    }

    public void setCargoSpaceExplain(String cargoSpaceExplain) {
        this.cargoSpaceExplain = cargoSpaceExplain;
    }

    @Column(name = "cargo_space_state", length = 30)
    public String getCargoSpaceState() {
        return this.cargoSpaceState;
    }

    public void setCargoSpaceState(String cargoSpaceState) {
        this.cargoSpaceState = cargoSpaceState;
    }

    @Column(name = "invalid_date", length = 19)
    public Timestamp getInvalidDate() {
        return this.invalidDate;
    }

    public void setInvalidDate(Timestamp invalidDate) {
        this.invalidDate = invalidDate;
    }

    @Column(name = "max_number", precision = 12, scale = 0)
    public Float getMaxNumber() {
        return this.maxNumber;
    }

    public void setMaxNumber(Float maxNumber) {
        this.maxNumber = maxNumber;
    }

    @Column(name = "volume_size", precision = 12, scale = 0)
    public Float getVolumeSize() {
        return this.volumeSize;
    }

    public void setVolumeSize(Float volumeSize) {
        this.volumeSize = volumeSize;
    }

    @Column(name = "weight", precision = 12, scale = 0)
    public Float getWeight() {
        return this.weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    @Column(name = "dimension", precision = 12, scale = 0)
    public Float getDimension() {
        return this.dimension;
    }

    public void setDimension(Float dimension) {
        this.dimension = dimension;
    }

    @Column(name = "coordinate", length = 50)
    public String getCoordinate() {
        return this.coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CCargoSpaceDefinition")
    public Set<CMaterialAffairsHandle> getCMaterialAffairsHandles() {
        return this.CMaterialAffairsHandles;
    }

    public void setCMaterialAffairsHandles(
            Set<CMaterialAffairsHandle> CMaterialAffairsHandles) {
        this.CMaterialAffairsHandles = CMaterialAffairsHandles;
    }

}