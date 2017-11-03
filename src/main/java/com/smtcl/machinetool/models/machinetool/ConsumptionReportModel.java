package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;

/**
 * Created by GuoFeng on 2016/7/11.
 */
public class ConsumptionReportModel {
    private String    source;
    private String    sourceRow;
    private String    materialNo;
    private String    materialDescription;
    private String    materialType;
    private Float     number;
    private Double    unitPrice;
    private Double    sum;
    private String    storageRoom;
    private String    person;
    private Timestamp affairTime;
    private String    type;
    private String    thatEquipement;
    private String    thatWorkshop;
    private String    thatWorkshopSection;
    private String    thatTeam;
    private String    defaultEquipement;
    private String    defaultWorkshop;
    private String    defaultWorkshopSection;
    private String    defaultTeam;
    private String    productionLine;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSourceRow() {
        return sourceRow;
    }

    public void setSourceRow(String sourceRow) {
        this.sourceRow = sourceRow;
    }

    public String getMaterialNo() {
        return materialNo;
    }

    public void setMaterialNo(String materialNo) {
        this.materialNo = materialNo;
    }

    public String getMaterialDescription() {
        return materialDescription;
    }

    public void setMaterialDescription(String materialDescription) {
        this.materialDescription = materialDescription;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public Float getNumber() {
        return number;
    }

    public void setNumber(Float number) {
        this.number = number;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public String getStorageRoom() {
        return storageRoom;
    }

    public void setStorageRoom(String storageRoom) {
        this.storageRoom = storageRoom;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public Timestamp getAffairTime() {
        return affairTime;
    }

    public void setAffairTime(Timestamp affairTime) {
        this.affairTime = affairTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getThatEquipement() {
        return thatEquipement;
    }

    public void setThatEquipement(String thatEquipement) {
        this.thatEquipement = thatEquipement;
    }

    public String getThatWorkshop() {
        return thatWorkshop;
    }

    public void setThatWorkshop(String thatWorkshop) {
        this.thatWorkshop = thatWorkshop;
    }

    public String getThatWorkshopSection() {
        return thatWorkshopSection;
    }

    public void setThatWorkshopSection(String thatWorkshopSection) {
        this.thatWorkshopSection = thatWorkshopSection;
    }

    public String getThatTeam() {
        return thatTeam;
    }

    public void setThatTeam(String thatTeam) {
        this.thatTeam = thatTeam;
    }

    public String getDefaultEquipement() {
        return defaultEquipement;
    }

    public void setDefaultEquipement(String defaultEquipement) {
        this.defaultEquipement = defaultEquipement;
    }

    public String getDefaultWorkshop() {
        return defaultWorkshop;
    }

    public void setDefaultWorkshop(String defaultWorkshop) {
        this.defaultWorkshop = defaultWorkshop;
    }

    public String getDefaultWorkshopSection() {
        return defaultWorkshopSection;
    }

    public void setDefaultWorkshopSection(String defaultWorkshopSection) {
        this.defaultWorkshopSection = defaultWorkshopSection;
    }

    public String getDefaultTeam() {
        return defaultTeam;
    }

    public void setDefaultTeam(String defaultTeam) {
        this.defaultTeam = defaultTeam;
    }

    public String getProductionLine() {
        return productionLine;
    }

    public void setProductionLine(String productionLine) {
        this.productionLine = productionLine;
    }
}
