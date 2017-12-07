package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "c_layout_flowchart", catalog = "machinetool")
public class CSceneFlowChart implements java.io.Serializable{

    private Integer id;
    private String ConnectionId;
    private String PageSourceId;
    private String PageTargetId;
    private String productionLineId;

    /** default constructor */
    public CSceneFlowChart() {
    }

    /** minimal constructor */
    public CSceneFlowChart(Integer id) {
        this.id = id;
    }

    /** full constructor */
    public CSceneFlowChart(Integer id,String ConnectionId,String pageSourceId,String pageTargetId,String ProductionLineId) {
        this.id = id;
        this.ConnectionId=ConnectionId;
        this.PageSourceId= pageSourceId;
        this.PageTargetId = pageTargetId;
        this.productionLineId = productionLineId;

    }

    @Id
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "ConnectionId", length = 100)
    public String getConnectionId() {
        return this.ConnectionId;
    }

    public void setConnectionId(String ConnectionId) {
        this.ConnectionId = ConnectionId;
    }

    @Column(name = "PageSourceId", length = 100)
    public String getPageSourceId() {
        return this.PageSourceId;
    }

    public void setPageSourceId(String PageSourceId) {
        this.PageSourceId = PageSourceId;
    }

    @Column(name = "PageTargetId", length = 100)
    public String getPageTargetId() {
        return this.PageTargetId;
    }

    public void setPageTargetId(String PageTargetId) {
        this.PageTargetId = PageTargetId;
    }
    @Column(name = "production_line_id")
    public String getProductionLineId() {
        return this.productionLineId;
    }

    public void setProductionLineId(String productionLineId) {
        this.productionLineId = productionLineId;
    }

}
