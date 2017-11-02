package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;
import org.springframework.web.multipart.*;

import javax.servlet.http.*;
import java.io.*;
import java.text.*;
import java.util.*;
import java.util.Date;

/**
 * Created by guofeng 2017/9/19.
 */
@Service
public class CprocessProcedureService implements ICprocessProcedureService{

	//设置日期格式
	private SimpleDateFormat ymdhms=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat ymd=new SimpleDateFormat("yyyy-MM-dd");
	//图片上传路径
	private String rootPath=System.getProperty("user.dir").replace("bin","webapps")+"\\machinetool\\WEB-INF\\classes\\static\\uploadImg\\";

	@Autowired
	IGenericDAO dao;

	/**
	 * 保存
	 * @param data
	 * @param request
	 * @return
	 */
	@Override
	@Transactional
	public String save(String data,HttpServletRequest request){
		try{
			JSONArray jsonArray=new JSONArray(data);
			JSONArray mapA=jsonArray.getJSONObject(0).getJSONArray("mapA");
			JSONArray mapB=jsonArray.getJSONObject(1).getJSONArray("mapB");jsonArray=null;
			if(mapA.length()>0&&mapB.length()>0){
				/*****************************工艺版本****************************/
				String sql="from CProcessProcedureVersion a where a.materialId="+mapA.getJSONObject(0).getInt("material_id");
				List<HashMap> insertUp=dao.executeQuery(sql);sql=null;
				if(insertUp!=null&&insertUp.size()==0){//add
					boolean shtype=mapA.getJSONObject(0).getBoolean("shtype");
					if(shtype){//直接审批
						sql="insert into c_process_procedure_version(create_person,create_time,approver,approve_time,process_version,material_id)" +
								"values('"+request.getSession().getAttribute("USER_NAME")+"'," +
								"'"+ymdhms.format(new Date())+"'," +
								"'"+request.getSession().getAttribute("USER_NAME")+"'," +
								"'"+ymdhms.format(new Date())+"'," +
								"'"+mapA.getJSONObject(0).getString("process_version")+"'," +
								"'"+mapA.getJSONObject(0).getString("material_id")+"')";
					}else{//普通添加
						sql="insert into c_process_procedure_version(create_person,create_time,process_version,material_id)" +
								"values('"+request.getSession().getAttribute("USER_NAME")+"'," +
								"'"+ymdhms.format(new Date())+"'," +
								"'"+mapA.getJSONObject(0).getString("process_version")+"'," +
								"'"+mapA.getJSONObject(0).getString("material_id")+"')";
					};
					dao.sqlUpdate(sql);sql=null;
				}else{//update
					sql="UPDATE c_process_procedure_version a SET " +
							"a.process_version='"+mapA.getJSONObject(0).getString("process_version")+"'," +
							"a.update_person='"+request.getSession().getAttribute("USER_NAME")+"'," +
							"a.update_time='"+ymdhms.format(new Date())+"'" +
							"WHERE a.material_id='"+mapA.getJSONObject(0).getString("material_id")+"'";
					dao.sqlUpdate(sql);sql=null;
				};insertUp=null;
				/****************************工艺版本end**************************/
				/*****************************加工工艺****************************/
				sql="from CProcessProcedure a where a.materialId="+mapA.getJSONObject(0).getInt("material_id");
				insertUp=dao.executeQuery(sql);sql=null;
				if(insertUp!=null&&insertUp.size()>0){//delete
					sql="DELETE FROM c_process_procedure WHERE material_id='"+mapA.getJSONObject(0).getInt("material_id")+"'";
					dao.sqlUpdate(sql);sql=null;
				};insertUp=null;
				for(int i=0;i<mapA.length();i++){//add
					sql="insert into c_process_procedure(material_id,process_version,process,process_name,process_description,program_name," +
							"using_equipment,create_person,create_time)" +
							"values('"+mapA.getJSONObject(i).getString("material_id")+"'," +
							"'"+mapA.getJSONObject(i).getString("process_version")+"'," +
							""+mapA.getJSONObject(i).getString("process")+"," +
							"'"+mapA.getJSONObject(i).getString("process_name")+"'," +
							"'"+mapA.getJSONObject(i).getString("process_description")+"'," +
							"'"+mapA.getJSONObject(i).getString("program_name")+"'," +
							"'"+mapA.getJSONObject(i).getString("using_equipment")+"'," +
							"'"+request.getSession().getAttribute("USER_NAME")+"'," +
							"'"+ymdhms.format(new Date())+"')";
					dao.sqlUpdate(sql);sql=null;
				};mapA=null;
				/****************************加工工艺end**************************/

				/*****************************工艺卡片****************************/
				sql="select a.process_diagram from c_process_card a where a.material_id="+mapB.getJSONObject(0).getInt("material_id");
				insertUp=dao.createSQL(sql);sql=null;
				String process_diagram="";
				if(insertUp!=null&&insertUp.size()>0){//删除历史信息
					sql="DELETE FROM c_process_card WHERE material_id='"+mapB.getJSONObject(0).getInt("material_id")+"'";
					dao.sqlUpdate(sql);sql=null;
					if(insertUp.get(0).get("process_diagram")!=null){
						process_diagram=insertUp.get(0).get("process_diagram").toString();
					};
				};insertUp=null;
				for(int i=0;i<mapB.length();i++){
					sql="insert into c_process_card(material_id,program_version,process_name,material,hardness,equipment," +
							"tool_carrier,map_no,title_name,pretend_card,program_name,order_val,process_number,designer,design_date," +
							"attachment_description,process_step_id,program_cuttool_no,cuttool_no,process_description,chip_maximum_diameter," +
							"chip_minimum_diameter,chip_speed,spindle_speed,cutting_depth,amount_feed,process_time,create_person,create_time,process_diagram)" +
							"values("+mapB.getJSONObject(i).getString("material_id")+"," +
							"'"+mapB.getJSONObject(i).getString("program_version")+"'," +
							"'"+mapB.getJSONObject(i).getString("process_name")+"'," +
							"'"+mapB.getJSONObject(i).getString("material")+"'," +
							"'"+mapB.getJSONObject(i).getString("hardness")+"'," +
							"'"+mapB.getJSONObject(i).getString("equipment")+"'," +
							"'"+mapB.getJSONObject(i).getString("tool_carrier")+"'," +
							"'"+mapB.getJSONObject(i).getString("map_no")+"'," +
							"'"+mapB.getJSONObject(i).getString("title_name")+"'," +
							"'"+mapB.getJSONObject(i).getString("pretend_card")+"'," +
							"'"+mapB.getJSONObject(i).getString("program_name")+"'," +
							"'"+mapB.getJSONObject(i).getString("order_val")+"'," +
							""+mapB.getJSONObject(i).getString("process_number")+"," +
							"'"+mapB.getJSONObject(i).getString("designer")+"'," +
							"'"+ymd.format(new Date())+"'," +
							"'"+mapB.getJSONObject(i).getString("attachment_description")+"'," +
							""+mapB.getJSONObject(i).getString("process_step_id")+"," +
							"'"+mapB.getJSONObject(i).getString("program_cuttool_no")+"'," +
							"'"+mapB.getJSONObject(i).getString("cuttool_no")+"'," +
							"'"+mapB.getJSONObject(i).getString("process_description")+"'," +
							""+mapB.getJSONObject(i).getString("chip_maximum_diameter")+"," +
							""+mapB.getJSONObject(i).getString("chip_minimum_diameter")+"," +
							""+mapB.getJSONObject(i).getString("chip_speed")+"," +
							""+mapB.getJSONObject(i).getString("spindle_speed")+"," +
							""+mapB.getJSONObject(i).getString("cutting_depth")+"," +
							""+mapB.getJSONObject(i).getString("amount_feed")+"," +
							""+mapB.getJSONObject(i).getString("process_time")+"," +
							"'"+request.getSession().getAttribute("USER_NAME")+"'," +
							"'"+ymdhms.format(new Date())+"'," +
							"'"+process_diagram+"')";
					dao.sqlUpdate(sql);sql=null;
				};mapB=null;process_diagram=null;
				/****************************工艺卡片end**************************/
			};
			return "true";
		}catch(Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
			return "false";
		}
	}

	/**
	 * 上传图片
	 * @param name
	 * @param file
	 * @param id
	 * @return
	 */
	@Override
	@Transactional
	public String upload(String name,MultipartFile file,String id){
		if(file.getSize()>0){
			try {
				byte[] bytes=file.getBytes();
				File dir=new File(rootPath);
				if(!dir.exists()){
					dir.mkdirs();
				};dir=null;
				String[] nameSplit=name.split("\\.");
				UUID uuid=UUID.randomUUID();
				String strUUid=uuid.toString();uuid=null;
				String replaceUUID=strUUid.replace("-","");
				name=replaceUUID+"."+nameSplit[1];nameSplit=null;replaceUUID=null;
				BufferedOutputStream stream=new BufferedOutputStream(new FileOutputStream(new File(rootPath+name)));
				//执行
				stream.write(bytes);bytes=null;
				stream.close();stream=null;
				String hql="from CProcessCard a where a.materialId='"+id+"'";
				List<CProcessCard>list=dao.executeQuery(hql);hql=null;
				if(list.size()>0&&list!=null){
					CProcessCard model=list.get(0);list=null;
					//删除图片
					if(model!=null&&model.getProcessDiagram()!=null&&!model.getProcessDiagram().equals("")){
						File f=new File(rootPath+model.getProcessDiagram());
						f.delete();
					};
					hql="UPDATE c_process_card a SET a.process_diagram='"+name+"' WHERE a.material_id='"+id+"'";
					dao.sqlUpdate(hql);hql=null;model=null;name=null;id=null;
				};
				return "1";
			}catch(IOException e){
				e.printStackTrace();
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
				//return "Fail:图片报保存失败!";
				return "-1";
			}catch(Exception e){
				e.printStackTrace();;
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
				return "-1";
			}
		}else{
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
			//数据为空
			return "0";
		}
	}

	/**
	 * 查找
	 * @param id
	 * @return
	 */
	@Override
	public String select(String id){
		JSONObject result=new JSONObject();
		try{
			String hql="from CProcessProcedureVersion a where a.materialId="+id;
			result.put("title",dao.executeQuery(hql));hql=null;
			hql="select a.* from c_process_procedure a where a.material_id="+id;
			result.put("mapA",dao.createSQL(hql));hql=null;
			hql=" select a.*,b.cuttool_description from c_process_card a,c_cuttool_basedata b  where a.cuttool_no=b.cuttool_no and a.material_id="+id;
			result.put("mapB",dao.createSQL(hql));hql=null;
		}catch (Exception e){
			e.printStackTrace();
		};
		return result.toString();
	}

	/**
	 * 删除图片
	 * @param map
	 * @return
	 */
	@Override
	public boolean removeImages(String map){
		boolean removeYesNo=false;
		try{
			JSONObject obj=new JSONObject(map);
			String id=obj.getString("id");
			String name=obj.getString("name");
			String sql="UPDATE c_process_card a SET a.process_diagram='' WHERE a.material_id='"+id+"'";
			if(!name.equals("")){
				File f = new File(rootPath+name);
				f.delete();name=null;
			};id=null;
			removeYesNo=dao.sqlUpdate(sql);sql=null;
			return removeYesNo;
		}catch (Exception e){
			e.printStackTrace();
		};
		return removeYesNo;
	}

	/**
	 * 删除工艺
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public boolean remove(String map){
		boolean removeYesNo=false;
		try{
			JSONObject obj=new JSONObject(map);
			String id=obj.getString("id");
			String name=obj.getString("name");
			if(!id.equals("")){
				String sql="delete c_process_procedure_version,c_process_procedure,c_process_card " +
						"from c_process_procedure_version " +
						"left join c_process_procedure on c_process_procedure_version.material_id=c_process_procedure.material_id " +
						"left join c_process_card on c_process_procedure_version.material_id=c_process_card.material_id " +
						"where c_process_procedure_version.material_id='"+id+"'";
				removeYesNo=dao.sqlUpdate(sql);sql=null;
				if(!name.equals("")){
					File f = new File(rootPath+name);
					f.delete();name=null;
				};
				return removeYesNo;
			};
		}catch(Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		};
		return removeYesNo;
	}

	/**
	 * 删除工艺
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public boolean approve(String id,HttpServletRequest request){
		boolean removeYesNo=false;
		try{
			if(!id.equals("")){
				String sql="UPDATE c_process_procedure_version a SET " +
						"a.approver='"+request.getSession().getAttribute("USER_NAME")+"'," +
						"a.approve_time='"+ymdhms.format(new Date())+"' WHERE a" +
						".material_id='"+id+"'";
				removeYesNo=dao.sqlUpdate(sql);sql=null;
				return removeYesNo;
			};
		}catch (Exception e){
			e.printStackTrace();
		}
		return removeYesNo;
	}
}