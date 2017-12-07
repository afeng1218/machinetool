package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CSceneFlowChart;
import com.smtcl.machinetool.models.machinetool.CSceneLayout;
import com.smtcl.machinetool.service.ICSceneLayoutService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;
import java.util.List;

@Service
public class CSceneLayoutService implements ICSceneLayoutService {

    @Autowired
    IGenericDAO dao;

	/**
     * 查询已经布局好的机床
     * @param uploadValue
     * @return
     */
    @Override
    public List getLayoutById(String uploadValue) {
        try{
            JSONObject json = new JSONObject(uploadValue);
            String workshop_id=json.getString("workshop_id");
            String production_line_id=json.getString("production_line_id");
            String sql = "from CSceneLayout cs where cs.workshopId ='" + workshop_id + "' and cs.productionLineId ='"+production_line_id+"'";
            List<CSceneLayout> list = dao.executeQuery(sql);
            if (list.size() > 0 && list != null) {
                return list;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

	/**
     * 现场布局 保存 修改
     * @param data
     * @return
     */
    @Override
    @Transactional
    public String saveLayout(String data) {
        String return_="false";
        try{
            /*查询条件解析*/
            JSONArray add = new JSONArray(data).getJSONObject(0).getJSONArray("add");
            JSONArray update = new JSONArray(data).getJSONObject(0).getJSONArray("update");
            for(int i=0;i<add.length();i++){
                JSONObject obj=add.getJSONObject(i);
                String sql = "insert into c_scene_layout(workshop_id,production_line_id,production_line_name,resource_code,equipment_group,category,model,rate,x,y,resource_id,ip)" +
                        " values(" + obj.getString("workshop_id") + "," +
                        "" + obj.getString("production_line_id") + "," +
                        "'" + obj.getString("production_line_name") + "'," +
                        "'" + obj.getString("resource_code") + "'," +
                        "'" + obj.getString("equipment_group") + "'," +
                        "'" + obj.getString("category") + "'," +
                        "'" + obj.getString("model") + "'," +
                        "" +  obj.getString("rate") + "," +
                        "" + obj.getInt("position_x") + "," +
                        "" + obj.getInt("position_y") + "," +
                        "'" + obj.getString("resource_id") + "'," +
                        "'" + obj.getString("ip") + "')";
                dao.sqlUpdate(sql);
                sql=null;
                obj=null;
            };
            add=null;
            for (int j=0;j<update.length();j++){
                JSONObject obj=update.getJSONObject(j);
                String sql = "update c_scene_layout set " +
                        "ip='"+obj.getString("ip")+"'," +
                        "x="+obj.getInt("position_x")+"," +
                        "y="+obj.getInt("position_y")+"," +
                        "equipment_group='"+obj.getString("equipment_group")+"'," +
                        "resource_code='"+obj.getString("resource_code")+"'," +
                        "rate="+obj.getString("rate")+"," +
                        "production_line_name='"+obj.getString("production_line_name")+"'," +
                        "model='"+obj.getString("model")+"'," +
                        "category='"+obj.getString("category")+"' " +
                        "where resource_id = '"+obj.getString("resource_id")+"'";
                dao.sqlUpdate(sql);
                sql=null;
                obj=null;
            }
            update=null;
            return_="true";
        }catch (Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
        }finally{
            return return_;
        }
    }

    /**
     * 现场布局 删除
     * @param data
     * @return
     */
    @Override
    @Transactional
    public String deleteLayout(String data) {
        JSONObject json = new JSONObject(data);
        String return_="false";
        try {
            /*查询条件解析*/
            String sql = "delete from c_scene_layout where resource_id = '"+json.getString("id")+"'";
            String tclsql = "delete from c_tool_life where production_line_id = '"+json.getString("production_line_id")+"' and resource_code = '"+json.getString("resource_code")+"'";
            dao.sqlUpdate(sql);
            dao.sqlUpdate(tclsql);
            sql=null;
            tclsql=null;
            json=null;
            return_="true";

        }catch (Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
        }
    return return_;
   }

    /**
     * 查询连线
     * @param
     * @return
     */
    @Override
    public List getFlowchart(String uploadValue) {
        try{
            JSONObject json = new JSONObject(uploadValue);
            String production_line_id= json.getString("production_line_id");
            String sql = "from CSceneFlowChart cf where cf.productionLineId = '"+production_line_id+"'";
            List<CSceneFlowChart> list = dao.executeQuery(sql);
            if (list.size() > 0 && list != null) {
                return list;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 现场布局 保存连线
     * @param data
     * @return
     */
    @Override
    @Transactional
    public String saveFlowchart(String data) {
        String return_="false";
        try{
            /*查询条件解析*/
            JSONArray add = new JSONObject(data).getJSONArray("connects");
            JSONObject dobj =add.getJSONObject(0);
            String fsql = "delete from c_layout_flowchart where production_line_id = '"+dobj.getString("production_line_id")+"' and workshop_id = '"+dobj.getString("workshop_id")+"'";
            dao.sqlUpdate(fsql);
            for(int i=0;i<add.length();i++){
                JSONObject obj=add.getJSONObject(i);
                String sql = "insert into c_layout_flowchart(ConnectionId,PageSourceId,PageTargetId,production_line_id,workshop_id)" +
                        " values('" + obj.getString("ConnectionId") + "'," +
                        "'" + obj.getString("PageSourceId") + "'," +
                        "'" + obj.getString("PageTargetId") + "'," +
                        "'" + obj.getString("production_line_id") + "'," +
                        "'" + obj.getString("workshop_id") + "')";
                dao.sqlUpdate(sql);
                fsql=null;
                sql=null;
                obj=null;
            }
            return_="true";
        }catch (Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
        }finally{
            return return_;
        }
    }
}