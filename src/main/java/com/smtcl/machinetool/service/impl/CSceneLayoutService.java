package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCargoSpaceDefinition;
import com.smtcl.machinetool.models.machinetool.CSceneLayout;
import com.smtcl.machinetool.service.ICSceneLayoutService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CSceneLayoutService implements ICSceneLayoutService {

    @Autowired
    IGenericDAO dao;

    @Override
    public List getLayoutById(String uploadValue) {

        JSONObject json = new JSONObject(uploadValue);
        String workshop_id=json.getString("workshop_id");
        String production_line_id=json.getString("production_line_id");

        String sql = "from CSceneLayout cs where cs.workshopId ='" + workshop_id + "' and cs.productionLineId ='"+production_line_id+"'";
        List<CSceneLayout> list = new ArrayList<CSceneLayout>();
        list = dao.executeQuery(sql);
//        System.out.println("list="+list);
        if (list.size() > 0 && list != null) {
            return list;
        } else {
            return null;
        }
    }

    @Override
    public String saveLayout(String data) {


    /*查询条件解析*/
        JSONArray add = new JSONArray(data).getJSONObject(0).getJSONArray("add");
        JSONArray update = new JSONArray(data).getJSONObject(0).getJSONArray("update");
        System.out.println("add="+add);
        System.out.println("update="+update);

        for(int i=0;i<add.length();i++){
            JSONObject obj=add.getJSONObject(i);
            String production_line_name = obj.getString("production_line_name");
            String resource_code = obj.getString("resource_code");
            String equipment_group = obj.getString("equipment_group");
            String category = obj.getString("category");
            String model = obj.getString("model");
            String rate = obj.getString("rate");
            String x = obj.getString("position_x");
            String y = obj.getString("position_y");
            String workshop_id = obj.getString("workshop_id");
            String production_line_id = obj.getString("production_line_id");
            String ip = obj.getString("ip");
            String sql = "insert into c_scene_layout(workshop_id,production_line_id,production_line_name,resource_code,equipment_group,category,model,rate,x,y,ip)" +
                    " values('" + workshop_id + "'," +
                    "'" + production_line_id + "'," +
                    "'" + production_line_name + "'," +
                    "'" + resource_code + "'," +
                    "'" + equipment_group + "'," +
                    "'" + category + "'," +
                    "'" + model + "'," +
                    "'" + rate + "'," +
                    "'" + x + "'," +
                    "'" + y + "'," +
                    "'" + ip + "')";
            dao.sqlUpdate(sql);
        }
        for (int j=0;j<update.length();j++){
            JSONObject obj=update.getJSONObject(j);
            //obj.getString("workshop_id");
            obj.getString("position_x");
            obj.getString("position_y");
            obj.getString("equipment_group");
            obj.getString("resource_code");
            obj.getString("rate");
            obj.getString("production_line_name");
            obj.getString("ip");
            obj.getString("model");
            //obj.getString("production_line_id");
            obj.getString("category");

            String sql = "update c_scene_layout set " +
                    "ip = '"+obj.getString("ip")+"'," +
                    "position_x = '"+obj.getString("position_x")+"'," +
                    "position_y = '"+obj.getString("position_y")+"'," +
                    "equipment_group = '"+obj.getString("equipment_group")+"'," +
                    "resource_code = '"+obj.getString("resource_code")+"'," +
                    "rate = '"+obj.getString("rate")+"'," +
                    "production_line_name = '"+obj.getString("production_line_name")+"'," +
                    "model = '"+obj.getString("model")+"'," +
                    "category = '"+obj.getString("category")+" where workshop_id = '"+obj.getString("workshop_id")+"' " +
                    "and production_line_id = '"+obj.getString("production_line_id")+"'";
            dao.sqlUpdate(sql);

        }

        /**
         * 物料编号
         */
//
//        for(int i=0;i<json.length();i++) {
//
//            String resource_id = json.getJSONObject(i).getString("resource_id");
//            String production_line_name = json.getJSONObject(i).getString("production_line_name");
//            String resource_code = json.getJSONObject(i).getString("resource_code");
//            String equipment_group = json.getJSONObject(i).getString("equipment_group");
//            String category = json.getJSONObject(i).getString("category");
//            String model = json.getJSONObject(i).getString("model");
//            String rate = json.getJSONObject(i).getString("rate");
//            String x = json.getJSONObject(i).getString("position_x");
//            String y = json.getJSONObject(i).getString("position_y");
//            String workshop_id = json.getJSONObject(i).getString("workshop_id");
//            String production_line_id = json.getJSONObject(i).getString("production_line_id");
//            String ip = json.getJSONObject(i).getString("ip");
//
////            String sql = "select id from c_scene_layout as a where a.workshop_id = "+workshop_id+" and  a.production_line_id = "+production_line_id;
////            List  list = dao.createSQL(sql);
////            if(list!=null && list.size()>0){
////                sql = "update c_scene_layout set production_line_name = '"+production_line_name+"'"
////
////            }else {
//
//            String sql = "insert into c_scene_layout(workshop_id,production_line_id,production_line_name,resource_code,equipment_group,category,model,rate,x,y,resource_id,ip)" +
//                    " values('" + workshop_id + "'," +
//                    "'" + production_line_id + "'," +
//                    "'" + production_line_name + "'," +
//                    "'" + resource_code + "'," +
//                    "'" + equipment_group + "'," +
//                    "'" + category + "'," +
//                    "'" + model + "'," +
//                    "'" + rate + "'," +
//                    "'" + x + "'," +
//                    "'" + y + "'," +
//                    "'" + resource_id + "'," +
//                    "'" + ip + "')";
//
//            dao.sqlUpdate(sql);
//        }

        return "true";

    }
}