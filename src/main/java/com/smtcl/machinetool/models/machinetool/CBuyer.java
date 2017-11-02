package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * CBuyer entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="c_buyer"
    ,catalog="machinetool"
)

public class CBuyer  implements java.io.Serializable {

    // Fields    
     private Integer id;
     private String buyer;
     private String explainText;

    // Constructors
    /** default constructor */
    public CBuyer() {
    }

	/** minimal constructor */
    public CBuyer(String buyer) {
        this.buyer = buyer;
    }
    
    /** full constructor */
    public CBuyer(String buyer, String explainText) {
        this.buyer = buyer;
        this.explainText = explainText;
    }

    // Property accessors
    @Id @GeneratedValue(strategy=IDENTITY)
    
    @Column(name="id", nullable=false)

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    @Column(name="buyer", nullable=false)

    public String getBuyer() {
        return this.buyer;
    }
    
    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }
    
    @Column(name="explain_text")

    public String getExplainText() {
        return this.explainText;
    }
    
    public void setExplainText(String explainText) {
        this.explainText = explainText;
    }
}