package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;

/**
 * Created by GuoFeng on 2016/5/2.
 */
public class CuttoolHeadModel {

    private Integer borrowNo;
    private String CBorrower;
    private String roomNo;
    private String CNo;
    private String CDes;
    private String borrower;
    private Integer equipmentId;
    private String equipmentName;
    private Integer surplusLifetime;
    private String isReturn;
    private String workOrderNo;
    private String type;
    private Integer goodsAllocationId;
    private Timestamp planReturnTime;
    private Timestamp borrowTime;
    private Timestamp returnTime;
    private String createPerson;
    private Timestamp createTime;
    private String updatePerson;
    private Timestamp updateTime;


    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getCDes() {
        return CDes;
    }

    public void setCDes(String CDes) {
        this.CDes = CDes;
    }

    public Integer getBorrowNo() {
        return borrowNo;
    }

    public void setBorrowNo(Integer borrowNo) {
        this.borrowNo = borrowNo;
    }

    public String getCBorrower() {
        return CBorrower;
    }

    public void setCBorrower(String CBorrower) {
        this.CBorrower = CBorrower;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String rooomNo) {
        this.roomNo = rooomNo;
    }

    public String getCNo() {
        return CNo;
    }

    public void setCNo(String CNo) {
        this.CNo = CNo;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public Integer getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Integer equipmentId) {
        this.equipmentId = equipmentId;
    }

    public Integer getSurplusLifetime() {
        return surplusLifetime;
    }

    public void setSurplusLifetime(Integer surplusLifetime) {
        this.surplusLifetime = surplusLifetime;
    }

    public String getIsReturn() {
        return isReturn;
    }

    public void setIsReturn(String isReturn) {
        this.isReturn = isReturn;
    }

    public String getWorkOrderNo() {
        return workOrderNo;
    }

    public void setWorkOrderNo(String workOrderNo) {
        this.workOrderNo = workOrderNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getGoodsAllocationId() {
        return goodsAllocationId;
    }

    public void setGoodsAllocationId(Integer goodsAllocationId) {
        this.goodsAllocationId = goodsAllocationId;
    }

    public Timestamp getPlanReturnTime() {
        return planReturnTime;
    }

    public void setPlanReturnTime(Timestamp planReturnTime) {
        this.planReturnTime = planReturnTime;
    }

    public Timestamp getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(Timestamp borrowTime) {
        this.borrowTime = borrowTime;
    }

    public Timestamp getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Timestamp returnTime) {
        this.returnTime = returnTime;
    }

    public String getCreatePerson() {
        return createPerson;
    }

    public void setCreatePerson(String createPerson) {
        this.createPerson = createPerson;
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
}
