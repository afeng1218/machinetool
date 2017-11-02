package com.smtcl.machinetool.models.machinetool;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CAuthorityMenu entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "c_authority_menu", catalog = "machinetool")
public class CAuthorityMenu implements java.io.Serializable{

	// Fields

	private Integer nodeId;
	private String  nodeName;
	private Integer nodeLevel;
	private Integer childNum;
	private Integer isMenu;
	private Integer PNode;
	private String  linkPage;
	/*private Set<CAccountAuthority> CAccountAuthorities = new HashSet<CAccountAuthority>(
			0);*/

	// Constructors

	/**
	 * default constructor
	 */
	public CAuthorityMenu(){

	}

	/**
	 * full constructor
	 */
	public CAuthorityMenu(String nodeName, Integer nodeLevel, Integer childNum,
	                      Integer isMenu, Integer PNode, String linkPage,
	                      Set<CAccountAuthority> CAccountAuthorities){

		this.nodeName = nodeName;
		this.nodeLevel = nodeLevel;
		this.childNum = childNum;
		this.isMenu = isMenu;
		this.PNode = PNode;
		this.linkPage = linkPage;
		//this.CAccountAuthorities = CAccountAuthorities;
	}

	// Property accessors
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "node_id", unique = true, nullable = false)
	public Integer getNodeId(){

		return this.nodeId;
	}

	public void setNodeId(Integer nodeId){

		this.nodeId = nodeId;
	}

	@Column(name = "node_name")
	public String getNodeName(){

		return this.nodeName;
	}

	public void setNodeName(String nodeName){

		this.nodeName = nodeName;
	}

	@Column(name = "node_level")
	public Integer getNodeLevel(){

		return this.nodeLevel;
	}

	public void setNodeLevel(Integer nodeLevel){

		this.nodeLevel = nodeLevel;
	}

	@Column(name = "child_num")
	public Integer getChildNum(){

		return this.childNum;
	}

	public void setChildNum(Integer childNum){

		this.childNum = childNum;
	}

	@Column(name = "isMenu")
	public Integer getIsMenu(){

		return this.isMenu;
	}

	public void setIsMenu(Integer isMenu){

		this.isMenu = isMenu;
	}

	@Column(name = "p_node")
	public Integer getPNode(){

		return this.PNode;
	}

	public void setPNode(Integer PNode){

		this.PNode = PNode;
	}

	@Column(name = "link_page")
	public String getLinkPage(){

		return this.linkPage;
	}

	public void setLinkPage(String linkPage){

		this.linkPage = linkPage;
	}

	/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "CAuthorityMenu")
	public Set<CAccountAuthority> getCAccountAuthorities(){

		return this.CAccountAuthorities;
	}

	public void setCAccountAuthorities(
			Set<CAccountAuthority> CAccountAuthorities){

		this.CAccountAuthorities = CAccountAuthorities;
	}*/

}