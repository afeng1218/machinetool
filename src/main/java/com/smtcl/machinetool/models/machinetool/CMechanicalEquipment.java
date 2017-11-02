package com.smtcl.machinetool.models.machinetool;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * CMechanicalEquipment entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_mechanical_equipment"
		, catalog = "machinetool"
)

public class CMechanicalEquipment implements java.io.Serializable{

	// Fields

	private Integer mechanicalId;
	private String  equipmentAssetsNo;
	private String  equipmentName;
	private String  equipmentType;
	private String  deviceGroup;
	private String  mainShaftType;
	private Integer mainShaftTrip;
	private Integer distanceTableMax;
	private Integer maxSpeed;
	private Integer maxPower;
	private String  director;
	private String  workshop;
	private Set<CBorrower> CBorrowers = new HashSet<CBorrower>(0);

	// Constructors

	/**
	 * default constructor
	 */
	public CMechanicalEquipment(){

	}

	/**
	 * full constructor
	 */
	public CMechanicalEquipment(String equipmentAssetsNo, String equipmentName, String equipmentType, String deviceGroup, String mainShaftType,
	                            Integer mainShaftTrip, Integer distanceTableMax, Integer maxSpeed, Integer maxPower, String director, String
                                        workshop, Set<CBorrower> CBorrowers){

		this.equipmentAssetsNo = equipmentAssetsNo;
		this.equipmentName = equipmentName;
		this.equipmentType = equipmentType;
		this.deviceGroup = deviceGroup;
		this.mainShaftType = mainShaftType;
		this.mainShaftTrip = mainShaftTrip;
		this.distanceTableMax = distanceTableMax;
		this.maxSpeed = maxSpeed;
		this.maxPower = maxPower;
		this.director = director;
		this.workshop = workshop;
		this.CBorrowers = CBorrowers;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mechanical_id", unique = true, nullable = false)

	public Integer getMechanicalId(){

		return this.mechanicalId;
	}

	public void setMechanicalId(Integer mechanicalId){

		this.mechanicalId = mechanicalId;
	}

	@Column(name = "equipment_assets_no")

	public String getEquipmentAssetsNo(){

		return this.equipmentAssetsNo;
	}

	public void setEquipmentAssetsNo(String equipmentAssetsNo){

		this.equipmentAssetsNo = equipmentAssetsNo;
	}

	@Column(name = "equipment_name")

	public String getEquipmentName(){

		return this.equipmentName;
	}

	public void setEquipmentName(String equipmentName){

		this.equipmentName = equipmentName;
	}

	@Column(name = "equipment_type", length = 20)

	public String getEquipmentType(){

		return this.equipmentType;
	}

	public void setEquipmentType(String equipmentType){

		this.equipmentType = equipmentType;
	}

	@Column(name = "device_group", length = 20)

	public String getDeviceGroup(){

		return this.deviceGroup;
	}

	public void setDeviceGroup(String deviceGroup){

		this.deviceGroup = deviceGroup;
	}

	@Column(name = "main_shaft_type", length = 20)

	public String getMainShaftType(){

		return this.mainShaftType;
	}

	public void setMainShaftType(String mainShaftType){

		this.mainShaftType = mainShaftType;
	}

	@Column(name = "main_shaft_trip")

	public Integer getMainShaftTrip(){

		return this.mainShaftTrip;
	}

	public void setMainShaftTrip(Integer mainShaftTrip){

		this.mainShaftTrip = mainShaftTrip;
	}

	@Column(name = "distance_table_max")

	public Integer getDistanceTableMax(){

		return this.distanceTableMax;
	}

	public void setDistanceTableMax(Integer distanceTableMax){

		this.distanceTableMax = distanceTableMax;
	}

	@Column(name = "max_speed")

	public Integer getMaxSpeed(){

		return this.maxSpeed;
	}

	public void setMaxSpeed(Integer maxSpeed){

		this.maxSpeed = maxSpeed;
	}

	@Column(name = "max_power")

	public Integer getMaxPower(){

		return this.maxPower;
	}

	public void setMaxPower(Integer maxPower){

		this.maxPower = maxPower;
	}

	@Column(name = "director")

	public String getDirector(){

		return this.director;
	}

	public void setDirector(String director){

		this.director = director;
	}

	@Column(name = "workshop")

	public String getWorkshop(){

		return this.workshop;
	}

	public void setWorkshop(String workshop){

		this.workshop = workshop;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CMechanicalEquipment")

	public Set<CBorrower> getCBorrowers(){

		return this.CBorrowers;
	}

	public void setCBorrowers(Set<CBorrower> CBorrowers){

		this.CBorrowers = CBorrowers;
	}

}