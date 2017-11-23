package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCargoSpaceDefinition;
import com.smtcl.machinetool.models.machinetool.CSceneLayout;
import com.smtcl.machinetool.service.ICSceneLayoutService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

import java.util.ArrayList;
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
            List<CSceneLayout> list = new ArrayList<CSceneLayout>();
            list = dao.executeQuery(sql);
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
                String sql = "insert into c_scene_layout(workshop_id,production_line_id,production_line_name,resource_code,equipment_group,category,model,rate,x,y,ip)" +
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
                        "where id = "+obj.getString("id")+" ";
                dao.sqlUpdate(sql);
                sql=null;
                obj=null;
            };
            update=null;
            return_="true";
        }catch (Exception e){
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
        }finally{
            return return_;
        }
    }
}