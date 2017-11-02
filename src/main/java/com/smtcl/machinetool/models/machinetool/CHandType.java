package com.smtcl.machinetool.models.machinetool;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;

/**
 * CUnit entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="c_hand_type"
    ,catalog="machinetool"
)

public class CHandType implements java.io.Serializable {


    // Fields

     private Integer id;
     private String handType;


    // Constructors

    public CHandType(){

    }

    public CHandType(String handType){

        this.handType = handType;
    }

    // Property accessors
    @Id @GeneratedValue(strategy=IDENTITY)

    @Column(name="id", unique=true, nullable=false)

    public Integer getId(){

        return id;
    }

    public void setId(Integer id){

        this.id = id;
    }
    @Column(name="hand_type", length=255)
    public String getHandType(){

        return handType;
    }

    public void setHandType(String handType){

        this.handType = handType;
    }
}