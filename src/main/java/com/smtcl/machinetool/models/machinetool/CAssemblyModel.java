package com.smtcl.machinetool.models.machinetool;

/**
 * Created by CJS on 2016/4/8.
 */
public class CAssemblyModel{

	private int no;
	private String mname;
	private String mdes;
	private int mnum;
	private String unit;
	private int easyConsume;
	private int chipCutting;
	private String brand;
	private Float availableNum;
	private String date;
	private int listnum;
	private int encodingBody;
	private int restricted_cargo_space;

	public int getRestricted_cargo_space() {
		return restricted_cargo_space;
	}

	public void setRestricted_cargo_space(int restricted_cargo_space) {
		this.restricted_cargo_space = restricted_cargo_space;
	}

	public int getListnum(){

		return listnum;
	}

	public void setListnum(int listnum){

		this.listnum = listnum;
	}

	public int getNo(){

		return no;
	}

	public void setNo(int no){

		this.no = no;
	}

	public String getMname(){

		return mname;
	}

	public void setMname(String mname){

		this.mname = mname;
	}

	public String getMdes(){

		return mdes;
	}

	public void setMdes(String mdes){

		this.mdes = mdes;
	}

	public String getUnit(){

		return unit;
	}

	public void setUnit(String unit){

		this.unit = unit;
	}

	public int getMnum(){

		return mnum;
	}

	public void setMnum(int mnum){

		this.mnum = mnum;
	}

	public int getEasyConsume(){

		return easyConsume;
	}

	public void setEasyConsume(int easyConsume){

		this.easyConsume = easyConsume;
	}

	public int getChipCutting(){

		return chipCutting;
	}

	public void setChipCutting(int chipCutting){

		this.chipCutting = chipCutting;
	}

	public String getBrand(){

		return brand;
	}

	public void setBrand(String brand){

		this.brand = brand;
	}

	public Float getAvailableNum(){

		return availableNum;
	}

	public void setAvailableNum(Float availableNum){

		this.availableNum = availableNum;
	}

	public String getDate(){

		return date;
	}

	public void setDate(String date){

		this.date = date;
	}

	public int getEncodingBody() {
		return encodingBody;
	}

	public void setEncodingBody(int encodingBody) {
		this.encodingBody = encodingBody;
	}
}
