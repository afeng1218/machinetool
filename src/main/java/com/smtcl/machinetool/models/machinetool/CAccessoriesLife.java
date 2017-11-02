package com.smtcl.machinetool.models.machinetool;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * CAccessoriesLife entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="c_accessories_life"
    ,catalog="machinetool"
)

public class CAccessoriesLife  implements java.io.Serializable {


    // Fields    

     private Integer cuttoolId;
     private String accessoriesNo;
     private Float allConsumption;
     private Float processTime;
     private Timestamp lastCalculationTime;
     private Float cumulativeProcessTime;


    // Constructors

    /** default constructor */
    public CAccessoriesLife() {
    }

	/** minimal constructor */
    public CAccessoriesLife(String accessoriesNo) {
        this.accessoriesNo = accessoriesNo;
    }
    
    /** full constructor */
    public CAccessoriesLife(String accessoriesNo, Float allConsumption, Float processTime, Timestamp lastCalculationTime, Float cumulativeProcessTime) {
        this.accessoriesNo = accessoriesNo;
        this.allConsumption = allConsumption;
        this.processTime = processTime;
        this.lastCalculationTime = lastCalculationTime;
        this.cumulativeProcessTime = cumulativeProcessTime;
    }

   
    // Property accessors
    @Id @GeneratedValue(strategy=IDENTITY)
    
    @Column(name="cuttool_id", unique=true, nullable=false)

    public Integer getCuttoolId() {
        return this.cuttoolId;
    }
    
    public void setCuttoolId(Integer cuttoolId) {
        this.cuttoolId = cuttoolId;
    }
    
    @Column(name="accessories_no", nullable=false, length=30)

    public String getAccessoriesNo() {
        return this.accessoriesNo;
    }
    
    public void setAccessoriesNo(String accessoriesNo) {
        this.accessoriesNo = accessoriesNo;
    }
    
    @Column(name="all_consumption", precision=12, scale=0)

    public Float getAllConsumption() {
        return this.allConsumption;
    }
    
    public void setAllConsumption(Float allConsumption) {
        this.allConsumption = allConsumption;
    }
    
    @Column(name="process_time", precision=12, scale=0)

    public Float getProcessTime() {
        return this.processTime;
    }
    
    public void setProcessTime(Float processTime) {
        this.processTime = processTime;
    }
    
    @Column(name="last_calculation_time", length=19)

    public Timestamp getLastCalculationTime() {
        return this.lastCalculationTime;
    }
    
    public void setLastCalculationTime(Timestamp lastCalculationTime) {
        this.lastCalculationTime = lastCalculationTime;
    }
    
    @Column(name="cumulative_process_time", precision=12, scale=0)

    public Float getCumulativeProcessTime() {
        return this.cumulativeProcessTime;
    }
    
    public void setCumulativeProcessTime(Float cumulativeProcessTime) {
        this.cumulativeProcessTime = cumulativeProcessTime;
    }
   








}