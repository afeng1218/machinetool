package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

import java.io.*;
import java.net.*;
import java.util.*;

/**
 * Created by guofeng on 2017/11/17.
 */
@Service
public class ToolLifeService implements IToolLifeService{

	@Autowired
	IGenericDAO dao;

	/**
	 * 获取所有生产线
	 * @return
	 * @param map
	 */
	@Override
	public String selectLine(String map){
		JSONObject return_=new JSONObject();
		JSONObject obj=new JSONObject(map);
		try{
			String sql="SELECT DISTINCT(a.production_line_id) AS production_line_id,a.production_line_name FROM c_scene_layout AS a";
			String where="";
			if(obj.getString("type").equals("all")){
				List list=dao.createSQL(sql);sql=null;
				where=" AND a.production_line_id="+(list!=null&&list.size()>0?((HashMap)list.get(0)).get("production_line_id"):"''");
				return_.put("line",list);list=null;
			}else{
				where = " AND a.production_line_id="+(obj.getString("production_line_id").equals("undefined")?"''":obj.getString("production_line_id"));
			};
			sql="SELECT a.* FROM c_scene_layout AS a WHERE a.resource_code IS NOT NULL"+where;
			return_.put("tool",dao.createSQL(sql));sql=null;
		}catch (Exception e){
			e.printStackTrace();
		}finally{
			return return_.toString();
		}
	}

	/**
	 * 查询机床设备的详细信息
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String selectRowData(String map){
		JSONObject obj=new JSONObject(map);
		try{
			String production_line_id=obj.getString("production_line_id");
			String resource_code=obj.getString("resource_code");
			if(!production_line_id.equals("")&&!resource_code.equals("")){
				String sql="SELECT a.*,b.initial_lifetime,b.life_alarm FROM c_tool_life AS a " +
						"LEFT JOIN c_cuttool_basedata AS b ON a.cuttool_no=b.cuttool_no " +
						"WHERE a.production_line_id='"+production_line_id+"' AND a.resource_code='"+resource_code+"'";
				List list=dao.createSQL(sql);sql=null;
				if(list!=null&&list.size()>0){//直接查询
					obj.put("rowData",list);list=null;
				};
			};
			return obj.toString();
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}
		return null;
	}

	/**
	 * 更新刀具寿命
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String saveData(String map){
		String return_="false";
		try{
			JSONArray add= new JSONArray(map).getJSONObject(0).getJSONArray("add");
			JSONArray update= new JSONArray(map).getJSONObject(0).getJSONArray("update");
			for(int i=0;i<add.length();i++){
				JSONObject data=add.getJSONObject(i);
				String sql="insert into c_tool_life(production_line_id,resource_code,tool_number,cuttool_no)values(" +
						""+data.getInt("production_line_id")+"," +
						"'"+data.getString("resource_code")+"'," +
						"'"+data.getString("tool_number")+"'," +
						"'"+data.getString("cuttool_no")+"')";
				dao.sqlUpdate(sql);sql=null;
				if(!data.getString("cuttool_no").equals("")){//更新残余寿命
					sql="UPDATE c_cuttool_basedata AS a" +
						" SET a.surplus_lifetime='"+data.getString("surplus_lifetime")+"'"+
						" WHERE a.cuttool_no='"+data.getString("cuttool_no")+"'";
					dao.sqlUpdate(sql);sql=null;
				};data=null;
			};
			for(int i=0;i<update.length();i++){
				JSONObject data=update.getJSONObject(i);
				String sql="UPDATE c_tool_life AS a" +
						" SET a.cuttool_no='"+data.getString("cuttool_no")+"'"+
						" WHERE a.production_line_id="+data.getInt("production_line_id")+
						" AND a.resource_code='"+data.getString("resource_code")+"'"+
						" AND a.tool_number='"+data.getString("tool_number")+"'";
				dao.sqlUpdate(sql);sql=null;
				if(!data.getString("cuttool_no").equals("")){//更新残余寿命
					sql="UPDATE c_cuttool_basedata AS a" +
							" SET a.surplus_lifetime='"+data.getString("surplus_lifetime")+"'"+
							" WHERE a.cuttool_no='"+data.getString("cuttool_no")+"'";
					dao.sqlUpdate(sql);sql=null;
				};data=null;
			};
			return_="true";
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}finally{
			return return_;
		}
	}

	/**
	 * 从机床获取刀具剩余寿命
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String loadData(String map){
		JSONObject return_=new JSONObject();
		Socket socket=null;
		DataOutputStream out=null;
		BufferedReader buf=null;
		return_.put("return","-1");
		try{
			JSONObject obj=new JSONObject(map);
			String ip=obj.getString("ip");
			String servic="2000|"+obj.getString("resource_code")+"|"+ip;
			for(int i=0;i<20;i++){servic+="|T_LIFECURRENT "+(i+1);};
			//1.建立客户端socket连接，指定服务器位置及端口
			socket=new Socket();
			socket.connect(new InetSocketAddress(ip, 8000), 1000);//设置连接请求超时时间10 s
			out = new DataOutputStream (socket.getOutputStream());
			buf = new BufferedReader(new InputStreamReader(socket.getInputStream(),"UTF-8"));
			out.write(servic.getBytes());//传输数据
			out.flush();
			return_.put("map",buf.readLine());
			//2.关闭资源
			buf.close();
			out.close();
			socket.close();
			//3.返回数据
			return_.put("return","1");
		}catch (Exception e){
			buf.close();
			out.close();
			socket.close();
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}finally{
			return return_.toString();
		}
	}

	/**
	 * 上传刀具寿命值
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String uploadLifetime(String map){
		String return_="-1";
		Socket socket=null;
		DataOutputStream out=null;
		BufferedReader buf=null;
		try{
			JSONObject obj=new JSONObject(map);
			String ip=obj.getString("ip");
			String servic="2001|"+
					obj.getString("resource_code")+"|"+
					ip+"|T_LIFECURRENT "+
					obj.getString("tool_number").split("t")[1]+
					"="+obj.getString("surplus_lifetime");
			socket=new Socket();
			socket.connect(new InetSocketAddress(ip, 8000), 1000);//设置连接请求超时时间100 s
			ip=null;
			out = new DataOutputStream (socket.getOutputStream());
			buf = new BufferedReader(new InputStreamReader(socket.getInputStream(),"UTF-8"));
			out.write(servic.getBytes());//传输数据
			out.flush();
			return_=buf.readLine();//成功返回1 否则-1
			buf.close();
			out.close();
			socket.close();
		}catch (Exception e){
			buf.close();
			out.close();
			socket.close();
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}finally{
			return return_;
		}
	}
}
