package com.smtcl.machinetool.models.machinetool;

import javax.persistence.*;

/**
 * CSource entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_source", catalog = "machinetool")
public class CSource implements java.io.Serializable {

	// Fields

	private Integer id;
	private String tdiSetdate;
	private String tcTp2;
	private String tcTp9;
	private String tdiMachine;
	private String tdiWork;
	private String tdiPart;
	private String tdiAccess;
	private String tdiToolCount;

	// Constructors

	/** default constructor */
	public CSource() {
	}

	/** minimal constructor */
	public CSource(Integer id) {
		this.id = id;
	}

	/** full constructor */
	public CSource(Integer id, String tdiSetdate, String tcTp2, String tcTp9,
			String tdiMachine, String tdiWork, String tdiPart,
			String tdiAccess, String tdiToolCount) {
		this.id = id;
		this.tdiSetdate = tdiSetdate;
		this.tcTp2 = tcTp2;
		this.tcTp9 = tcTp9;
		this.tdiMachine = tdiMachine;
		this.tdiWork = tdiWork;
		this.tdiPart = tdiPart;
		this.tdiAccess = tdiAccess;
		this.tdiToolCount = tdiToolCount;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "TDI_SETDATE")
	public String getTdiSetdate() {
		return this.tdiSetdate;
	}

	public void setTdiSetdate(String tdiSetdate) {
		this.tdiSetdate = tdiSetdate;
	}

	@Column(name = "TC_TP2")
	public String getTcTp2() {
		return this.tcTp2;
	}

	public void setTcTp2(String tcTp2) {
		this.tcTp2 = tcTp2;
	}

	@Column(name = "TC_TP9")
	public String getTcTp9() {
		return this.tcTp9;
	}

	public void setTcTp9(String tcTp9) {
		this.tcTp9 = tcTp9;
	}

	@Column(name = "TDI_MACHINE")
	public String getTdiMachine() {
		return this.tdiMachine;
	}

	public void setTdiMachine(String tdiMachine) {
		this.tdiMachine = tdiMachine;
	}

	@Column(name = "TDI_WORK")
	public String getTdiWork() {
		return this.tdiWork;
	}

	public void setTdiWork(String tdiWork) {
		this.tdiWork = tdiWork;
	}

	@Column(name = "TDI_PART")
	public String getTdiPart() {
		return this.tdiPart;
	}

	public void setTdiPart(String tdiPart) {
		this.tdiPart = tdiPart;
	}

	@Column(name = "TDI_ACCESS")
	public String getTdiAccess() {
		return this.tdiAccess;
	}

	public void setTdiAccess(String tdiAccess) {
		this.tdiAccess = tdiAccess;
	}

	@Column(name = "TDI_TOOL_COUNT")
	public String getTdiToolCount() {
		return this.tdiToolCount;
	}

	public void setTdiToolCount(String tdiToolCount) {
		this.tdiToolCount = tdiToolCount;
	}

}