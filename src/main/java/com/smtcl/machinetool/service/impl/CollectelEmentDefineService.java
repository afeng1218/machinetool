package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

import javax.servlet.http.*;
import java.text.*;
import java.util.*;

/**
 * Created by guofeng on 2017/11/9.
 */
@Service
public class CollectelEmentDefineService implements ICollectelEmentDefine{

	private SimpleDateFormat ymdhms =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	private IUtilService service;

	@Autowired
	private IGenericDAO dao;

	/**
	 * 质量管理-收集要素定义保存
	 * @name 郭峰
	 * @param map
	 * @param request
	 * @return
	 */
	@Override
	@Transactional
	public String save(String map, HttpServletRequest request){
		JSONObject result = new JSONObject();
		try{
			int maxId=service.getMaxId("CCollectElementDefine","id");
			JSONArray a=new JSONArray(map);map=null;
			/*************主表数据处理*************/
			JSONArray add=a.getJSONObject(0).getJSONArray("project").getJSONObject(0).getJSONArray("add");
			JSONArray update=a.getJSONObject(0).getJSONArray("project").getJSONObject(0).getJSONArray("update");
			JSONArray remove=a.getJSONObject(0).getJSONArray("project").getJSONObject(0).getJSONArray("remove");
			//新增主数据
			if(add!=null&&add.length()>0){
				for(int i=0;i<add.length();i++){
					CCollectElementDefine define=new CCollectElementDefine();
					define.setDetectionProject(add.getJSONObject(i).getString("detection_project"));
					define.setPrompt(add.getJSONObject(i).getString("prompt"));
					define.setDefineType(add.getJSONObject(i).getString("define_type"));
					define.setEnable(add.getJSONObject(i).getString("enable"));
					define.setActivityPrompt(add.getJSONObject(i).getString("activity_prompt"));
					define.setNewTime(ymdhms.format(new Date())+"");
					define.setNewCreator(request.getSession().getAttribute("USER_NAME").toString());
					dao.add(define);define=null;
					if(i==0){maxId=service.getMaxId("CCollectElementDefine","id");};
				};
			};
			add=null;
			//修改主数据
			if(update!=null&&update.length()>0){
				for(int i=0;i<update.length();i++){
					CCollectElementDefine define=new CCollectElementDefine();
					define.setId(update.getJSONObject(i).getInt("id"));
					define.setDetectionProject(update.getJSONObject(i).getString("detection_project"));
					define.setPrompt(update.getJSONObject(i).getString("prompt"));
					define.setDefineType(update.getJSONObject(i).getString("define_type"));
					define.setEnable(update.getJSONObject(i).getString("enable"));
					define.setActivityPrompt(update.getJSONObject(i).getString("activity_prompt"));
					define.setUpdateTime(ymdhms.format(new Date()));
					define.setUpdateCreator(request.getSession().getAttribute("USER_NAME").toString());
					dao.update(define);define=null;
				};
			};
			update=null;
			//删除主数据
			if(remove!=null&&remove.length()>0){
				String WHERE="";
				for(int i=0;i<remove.length();i++){
					WHERE+="a.id='"+remove.getJSONObject(i).getInt("id")+"' OR ";
				};
				WHERE=WHERE.substring(0,WHERE.length()-3);
				String sql="DELETE a,b,c FROM c_collect_element_define as a " +
						"LEFT JOIN c_collect_element_define_defect as b ON a.id=b.node_id " +
						"LEFT JOIN c_collect_element_define_limit as c ON a.id=c.node_id " +
						"WHERE "+WHERE;
				dao.sqlUpdate(sql);
				sql=null;WHERE=null;
			};
			remove=null;
			/*************主数据处理 end***********/
			/**************附属数据****************/
			JSONObject ggxz=a.getJSONObject(0).getJSONArray("projectRow").getJSONObject(0).getJSONObject("ggxz");//规格限制
			JSONArray qxz=a.getJSONObject(0).getJSONArray("projectRow").getJSONObject(0).getJSONArray("qxz");//缺陷值
			a=null;
			//删除规格限制以及缺陷值的数据
			if(!ggxz.getString("id").equals("")){
				maxId=ggxz.getInt("id");
				String sql = "DELETE a,b FROM c_collect_element_define_limit as a " +
						"LEFT JOIN c_collect_element_define_defect as b ON a.node_id=b.node_id " +
						" WHERE a.node_id="+maxId;
				dao.sqlUpdate(sql);sql=null;
			};
			//规格限制数据处理
			CCollectElementDefineLimit limit =new CCollectElementDefineLimit();
			limit.setNodeId(maxId);//为首个检测项目添加附属记录，其余检测项目 没有ID的时候不理会；
			limit.setTargetValue(ggxz.getString("target_value"));
			limit.setCustomUp(ggxz.getString("custom_up"));
			limit.setCustomDown(ggxz.getString("custom_down"));
			limit.setSpecificationsUp(ggxz.getString("specifications_up"));
			limit.setSpecificationsDown(ggxz.getString("specifications_down"));
			limit.setReasonableUp(ggxz.getString("reasonable_up"));
			limit.setReasonableDown(ggxz.getString("reasonable_down"));
			dao.add(limit);//添加规格限制
			limit=null;ggxz=null;
			//缺陷值数据处理
			if(qxz!=null&&qxz.length()>0){
				for(int i=0;i<qxz.length();i++){
					CCollectElementDefineDefect defectId=new CCollectElementDefineDefect();
					defectId.setNodeId(maxId);
					defectId.setExplain(qxz.getJSONObject(i).getString("explain_define"));
					defectId.setSimpleCode(qxz.getJSONObject(i).getString("simple_code"));
					dao.add(defectId);defectId=null;
				};
			};
			qxz=null;
			result.put("result",true);
			/**************附属数据 end************/
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
			result.put("result",false);
		}finally{
			return result.toString();
		}
	}

	/**
	 * 查询要素收集题头
	 * @param newTime
	 * @param endTime
	 * @return
	 */
	@Override
	public List selectTitle(String newTime, String endTime){
		String SQL="SELECT a.*,'load' AS 'class' FROM c_collect_element_define AS a WHERE 1=1";
		String WHERE=" AND";
		if(!newTime.equals("")){
			WHERE+=" a.new_time>='"+newTime+"' AND";
		};
		if(!endTime.equals("")){
			WHERE+=" a.new_time<='"+endTime+"'";
		};
		if(WHERE.endsWith("AND")){
			WHERE=WHERE.substring(0,WHERE.length()-3);
		};
		return dao.createSQL(SQL+WHERE);
	}

	/**
	 * 查询收集要素附属数据
	 * @param id
	 * @return
	 */
	@Override
	public String selectRow(String id){
		JSONObject result=new JSONObject();
		String SQL="SELECT a.* FROM c_collect_element_define_limit AS a WHERE node_id="+id;
		result.put("ggxz",dao.createSQL(SQL));SQL=null;
		SQL="SELECT a.* FROM c_collect_element_define_defect AS a WHERE node_id="+id;
		result.put("qxz",dao.createSQL(SQL));SQL=null;
		return result.toString();
	}
}
