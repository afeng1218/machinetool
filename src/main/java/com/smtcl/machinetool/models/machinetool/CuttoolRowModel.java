package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;

/**
 * Created by CJS on 2016/5/2.
 */
public class CuttoolRowModel {

    private Integer borrowCode;
    private String  type;
    private Integer rownum;
    private String CuttoolNo;
    private String MaterialNo;
    private String MaterialBrand;
    private String MaterialDes;
    private String MaterialUnit;
    private String createPerson;
    private String borrower;
    private Float borrowNumber;
    private Float returnNumber;
    private Float scrapNum;
    private String workno;
    private Integer equipmentid;
    private String equipmentName;
    private int surplusLifetime;
    private Timestamp borrowDate;
    private Timestamp returnDate;
    private String remarks;
    private Integer goodsAllocationId;
    private String goodsAllocationNo;
    private String goodsNo;
    private Timestamp createTime;
    private String updatePerson;
    private Timestamp updateTime;
    private Timestamp planReturnTime;
    private Float scrapNumber;
    private String goodsUseStatus;
    private Integer batchNumberId;
    private Integer sequenceId;
    private int isEncodingBody;

    public int getIsEncodingBody() {
        return isEncodingBody;
    }

    public void setIsEncodingBody(int isEncodingBody) {
        this.isEncodingBody = isEncodingBody;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSurplusLifetime() {
        return surplusLifetime;
    }

    public void setSurplusLifetime(int surplusLifetime) {
        this.surplusLifetime = surplusLifetime;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public String getGoodsAllocationNo() {
        return goodsAllocationNo;
    }

    public void setGoodsAllocationNo(String goodsAllocationNo) {
        this.goodsAllocationNo = goodsAllocationNo;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getGoodsNo() {
        return goodsNo;
    }

    public void setGoodsNo(String goodsNo) {
        this.goodsNo = goodsNo;
    }

    public String getMaterialBrand() {
        return MaterialBrand;
    }

    public void setMaterialBrand(String materialBrand) {
        MaterialBrand = materialBrand;
    }

    public String getMaterialUnit() {
        return MaterialUnit;
    }

    public void setMaterialUnit(String materialUnit) {
        MaterialUnit = materialUnit;
    }

    public Integer getBorrowCode() {
        return borrowCode;
    }

    public void setBorrowCode(Integer borrowCode) {
        this.borrowCode = borrowCode;
    }

    public Integer getRownum() {
        return rownum;
    }

    public void setRownum(Integer rownum) {
        this.rownum = rownum;
    }

    public String getCuttoolNo() {
        return CuttoolNo;
    }

    public void setCuttoolNo(String cuttoolNo) {
        CuttoolNo = cuttoolNo;
    }

    public String getMaterialNo() {
        return MaterialNo;
    }

    public void setMaterialNo(String materialNo) {
        MaterialNo = materialNo;
    }

    public String getMaterialDes() {
        return MaterialDes;
    }

    public void setMaterialDes(String materialDes) {
        MaterialDes = materialDes;
    }

    public String getCreatePerson() {
        return createPerson;
    }

    public void setCreatePerson(String createPerson) {
        this.createPerson = createPerson;
    }

    public Float getBorrowNumber() {
        return borrowNumber;
    }

    public void setBorrowNumber(Float borrowNumber) {
        this.borrowNumber = borrowNumber;
    }

    public Float getReturnNumber() {
        return returnNumber;
    }

    public void setReturnNumber(Float returnNumber) {
        this.returnNumber = returnNumber;
    }

    public Float getScrapNum() {
        return scrapNum;
    }

    public void setScrapNum(Float scrapNum) {
        this.scrapNum = scrapNum;
    }

    public String getWorkno() {
        return workno;
    }

    public void setWorkno(String workno) {
        this.workno = workno;
    }

    public Integer getEquipmentid() {
        return equipmentid;
    }

    public void setEquipmentid(Integer equipmentid) {
        this.equipmentid = equipmentid;
    }

    public Timestamp getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Timestamp borrowDate) {
        this.borrowDate = borrowDate;
    }

    public Timestamp getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Timestamp returnDate) {
        this.returnDate = returnDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Integer getGoodsAllocationId() {
        return goodsAllocationId;
    }

    public void setGoodsAllocationId(Integer goodsAllocationId) {
        this.goodsAllocationId = goodsAllocationId;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public String getUpdatePerson() {
        return updatePerson;
    }

    public void setUpdatePerson(String updatePerson) {
        this.updatePerson = updatePerson;
    }

    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    public Timestamp getPlanReturnTime() {
        return planReturnTime;
    }

    public void setPlanReturnTime(Timestamp planReturnTime) {
        this.planReturnTime = planReturnTime;
    }

    public Float getScrapNumber() {
        return scrapNumber;
    }

    public void setScrapNumber(Float scrapNumber) {
        this.scrapNumber = scrapNumber;
    }

    public String getGoodsUseStatus() {
        return goodsUseStatus;
    }

    public void setGoodsUseStatus(String goodsUseStatus) {
        this.goodsUseStatus = goodsUseStatus;
    }

    public Integer getBatchNumberId() {
        return batchNumberId;
    }

    public void setBatchNumberId(Integer batchNumberId) {
        this.batchNumberId = batchNumberId;
    }

    public Integer getSequenceId() {
        return sequenceId;
    }

    public void setSequenceId(Integer sequenceId) {
        this.sequenceId = sequenceId;
    }
}
