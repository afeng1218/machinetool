package com.smtcl.machinetool.models.machinetool;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * CMaterialParameterId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
public class CMaterialParameterId implements java.io.Serializable {

    // Fields

    private Integer id;
    private String parameterName;
    private Integer type;

    // Constructors

    /**
     * default constructor
     */
    public CMaterialParameterId() {
    }

    /**
     * full constructor
     */
    public CMaterialParameterId(Integer id, String parameterName, Integer type) {
        this.id = id;
        this.parameterName = parameterName;
        this.type = type;
    }

    // Property accessors

    @Column(name = "_id", nullable = false)
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "parameter_name", nullable = false)
    public String getParameterName() {
        return this.parameterName;
    }

    public void setParameterName(String parameterName) {
        this.parameterName = parameterName;
    }

    @Column(name = "_type", nullable = false)
    public Integer getType() {
        return this.type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public boolean equals(Object other) {
        if ((this == other))
            return true;
        if ((other == null))
            return false;
        if (!(other instanceof CMaterialParameterId))
            return false;
        CMaterialParameterId castOther = (CMaterialParameterId) other;

        return ((this.getId() == castOther.getId()) || (this.getId() != null
                && castOther.getId() != null && this.getId().equals(
                castOther.getId())))
                && ((this.getParameterName() == castOther.getParameterName()) || (this
                .getParameterName() != null
                && castOther.getParameterName() != null && this
                .getParameterName()
                .equals(castOther.getParameterName())))
                && ((this.getType() == castOther.getType()) || (this.getType() != null
                && castOther.getType() != null && this.getType()
                .equals(castOther.getType())));
    }

    public int hashCode() {
        int result = 17;

        result = 37 * result + (getId() == null ? 0 : this.getId().hashCode());
        result = 37
                * result
                + (getParameterName() == null ? 0 : this.getParameterName()
                .hashCode());
        result = 37 * result
                + (getType() == null ? 0 : this.getType().hashCode());
        return result;
    }

}