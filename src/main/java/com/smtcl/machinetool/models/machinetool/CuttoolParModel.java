package com.smtcl.machinetool.models.machinetool;

/**
 * Created by GuoFeng on 2016/6/16.
 */
public class CuttoolParModel {
    private int id;
    private String cno;
    private String parname;
    private Float value;
    private Integer totalClass;
    private Integer orderNo;

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCno() {
        return cno;
    }

    public void setCno(String cno) {
        this.cno = cno;
    }

    public String getParname() {
        return parname;
    }

    public void setParname(String parname) {
        this.parname = parname;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public Integer getTotalClass() {
        return totalClass;
    }

    public void setTotalClass(Integer totalClass) {
        this.totalClass = totalClass;
    }
}
