package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.*;

import java.io.*;
import java.sql.*;
import java.text.*;
import java.util.*;
import java.util.Date;

/**
 * Created by guofeng on 2016/8/24.
 */
@Service
public class SourceService implements ISourceService{

	/****
	 * 来源path
	 */
	@Value("${source.path}")
	private String SOURCE_PATH;

	/**
	 * 通用dao
	 */
	@Autowired
	private IGenericDAO dao;

	/***
	 * 来源按钮是否显示
	 * @return
	 */
	@Override
	public Object getSourceState(){
		String   paths  = SOURCE_PATH;
		JSONObject result = new JSONObject();
		try {

			/**
			 * 来源按钮是否可编辑,如果来源表中有数据则 来源按钮可点击
			 */
			String sql = "select a.* from c_source a";
			List c_source_length = dao.createSQL(sql);
			if(c_source_length!=null && c_source_length.size() > 0){
				result.append("result", "true");
			}else{
				result.append("result", "false");
			}
			/**
			 * 从西门子共享文件夹中读取INI数据,存放到来源数据表中。
			 */
			if (!paths.equals("") || paths != null ) {
				File file = new File(paths);
				if (file.exists() && file.listFiles().length > 0) {
					System.out.println("有数据文件");
					JSONArray returnData = new JSONArray();
					//共享文件夹中的数据文件 ini
					File fr = new File(paths).listFiles()[0];
					BufferedReader br = new BufferedReader(new FileReader(fr));

					HashMap map = new HashMap();
					int j = 1;
					String TDI_SETDATE = "";    //平衡时间
					String TC_TP2 = "";         //刀具编号
					String TC_TP9 = "";         //监控类型
					String TDI_MACHINE = "";    //机床名称
					String TDI_WORK = "";       //请求批次号
					String TDI_PART = "";       //工件编号
					String TDI_ACCESS = "";     //刀具使用时间
					String TDI_TOOL_COUNT = "";  //刀具数量
					for (String line = br.readLine(); line != null; line = br.readLine()) {
						String[] s = line.split("=");
						if (s.length > 1){
							String value = s[1].replaceAll("\"", "");
							if (j==1){
								TDI_SETDATE = value;
								++j;continue;
							}
							String name = s[0].substring(1,s[0].indexOf("["));
							if(name.equals("TC_TP2")){
								TC_TP2 += value + "★";
							}else if(name.equals("TC_TP9")){
								TC_TP9 += value + "★";
							}else if(name.equals("TDI_MACHINE")){
								TDI_MACHINE += value + "★";
							}else if(name.equals("TDI_WORK")){
								TDI_WORK += value + "★";
							}else if(name.equals("TDI_PART")){
								TDI_PART += value + "★";
							}else if(name.equals("TDI_ACCESS")){
								TDI_ACCESS += value + "★";
							}else if(name.equals("TDI_TOOL_COUNT")){
								TDI_TOOL_COUNT += value + "★";
							}
						}
					}
					br.close();
					//删除共享文件中的INI文件；
					fr.delete();
					if(TC_TP2.endsWith("★")){
						TC_TP2 = TC_TP2.substring(0,TC_TP2.length()-1);
						TC_TP9 = TC_TP9.substring(0,TC_TP9.length()-1);
						TDI_MACHINE = TDI_MACHINE.substring(0,TDI_MACHINE.length()-1);
						TDI_WORK = TDI_WORK.substring(0,TDI_WORK.length()-1);
						TDI_PART = TDI_PART.substring(0,TDI_PART.length()-1);
						TDI_ACCESS = TDI_ACCESS.substring(0,TDI_ACCESS.length()-1);
						TDI_TOOL_COUNT = TDI_TOOL_COUNT.substring(0,TDI_TOOL_COUNT.length()-1);
						if(TC_TP2.split("★").length > 0){
							for(int i=0;i < TC_TP2.split("★").length;i++){
								CSource csource = new CSource();
								csource.setTdiSetdate(TDI_SETDATE);
								csource.setTcTp2(TC_TP2.split("★")[i]);
								csource.setTcTp9(TC_TP9.split("★")[i]);
								csource.setTdiMachine(TDI_MACHINE.split("★")[i]);
								csource.setTdiWork(TDI_WORK.split("★")[i]);
								csource.setTdiPart(TDI_PART.split("★")[i]);
								csource.setTdiAccess(TDI_ACCESS.split("★")[i]);
								csource.setTdiToolCount(TDI_TOOL_COUNT.split("★")[i]);
								dao.add(csource);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
			result.append("result", e.getMessage());
			return result.toString();
		}
		return result.toString();
	}

	/**
	 * 来源数据
	 * @return
	 */
	@Override
	public String getSourceData(){
		JSONArray map = new JSONArray();
		try{
			//查询刀具编码
			String sql = "SELECT a.cuttool_no,a.cuttool_description,b.tdi_machine,b.tdi_tool_count,b.tdi_setdate FROM (SELECT substring_index(a.cuttool_no,\"-\",1) AS " +
					"cuttool_no_s, " +
					"a.cuttool_no,a.cuttool_description FROM c_cuttool_basedata a) a, " +
					"c_source b WHERE  a.cuttool_no LIKE CONCAT(b.tc_tp2,'%') AND a.cuttool_no_s = b.tc_tp2";
			List list = dao.createSQL(sql);
			System.out.println("list="+list);
			for (int i=0;i<list.size();i++){
				JSONObject result = new JSONObject();
				result.put("cuttool_no",((HashMap)list.get(i)).get("cuttool_no"));
				result.put("cuttool_description",((HashMap)list.get(i)).get("cuttool_description"));
				result.put("tdi_machine",((HashMap)list.get(i)).get("tdi_machine"));
				result.put("tdi_tool_count",((HashMap)list.get(i)).get("tdi_tool_count"));
				result.put("tdi_setdate",((HashMap)list.get(i)).get("tdi_setdate"));
				map.put(result);
			}
			return map.toString();
		}catch (Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}
}