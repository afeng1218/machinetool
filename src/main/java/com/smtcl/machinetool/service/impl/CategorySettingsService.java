package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.util.*;

/**
 * Created by guofeng on 2016/5/30.
 */
@Service
public class CategorySettingsService implements ICategorySettingsService {

    @Autowired
    private IGenericDAO dao;
    private String SUCCESS = "1";
    private String FAILE = "-1";
    private String EMPTY = "0";

    /**
     * 图片上传路径
     */
    private String rootPath = System.getProperty("user.dir").replace("bin", "webapps") + "\\machinetool\\WEB-INF\\classes\\static\\uploadImg\\";
    //private String rootPath = this.getClass().getClassLoader().getResource("/").toURI().getPath() + "static/uploadImg/";
    /**
     * 保存
     *
     * @param map
     * @return
     */
    @Override
    public String save(String map) {
        //返回参数
        JSONObject result = new JSONObject();
        try {
            JSONObject json = new JSONObject(map);map=null;
            CParameterModel model = new CParameterModel();
            model.setId(json.getString("id"));
            model.setCategory(json.getString("category"));
            model.setType(json.getInt("type_"));
            model.setTypeName(json.getString("type_name"));
            model.setParameterName(json.getString("parameter_name"));
            model.setSuggestedCuttingPar(json.getString("suggested_cutting_par"));
            model.setDescribeName(json.getString("describeName"));
            model.setPicture("");
            String hql = "from CParameterModel cpm where cpm.id='" + json.getString("id") + "'";
            List<CParameterModel> list = dao.executeQuery(hql);
            if (list.size() > 0 && list != null) {
                model.setPicture(list.get(0).getPicture());
                dao.update(model);
            } else {
                dao.add(model);
            }
            result.append("result", "SUCCESS");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result.toString();
    }

    /**
     * 图片上传
     *
     * @param name 图片名称
     * @param file 图片文件数据
     * @param id   唯一标识
     * @return
     */
    @Override
    public String upload(String name, MultipartFile file, String id) {

        if (file.getSize() > 0) {
            try {
                byte[] bytes = file.getBytes();
                File dir = new File(rootPath);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String[] nameSplit = name.split("\\.");
                UUID uuid = UUID.randomUUID();
                String strUUid = uuid.toString();
                String replaceUUID = strUUid.replace("-", "");
                name = replaceUUID + "." + nameSplit[1];
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(rootPath + name)));
                //执行
                stream.write(bytes);
                stream.close();
                String hql = "from CParameterModel cpm where cpm.id='" + id + "'";
                List<CParameterModel> list = dao.executeQuery(hql);
                if (list.size() > 0 && list != null) {
                    CParameterModel model = list.get(0);
                    model.setCategory(id);
                    //删除图片
                    if (model != null && model.getPicture() != null && !model.getPicture().equals("")) {
                        File f = new File(rootPath + model.getPicture());
                        f.delete();
                    }
                    model.setPicture(name);
                    dao.update(model);
                }
                return SUCCESS;
            } catch (IOException e) {
                e.printStackTrace();
                //return "Fail:图片报保存失败!";
                return FAILE;
            } catch (Exception e) {
                e.printStackTrace();
                return FAILE;
            }
        } else {
            //数据为空
            return EMPTY;
        }
    }

    /**
     * 删除图片
     *
     * @param id
     * @return
     */
    @Override
    public String removeImages(String id) {

        //返回参数
        JSONObject result = new JSONObject();
        try {
            String hql = "from CParameterModel cpm where cpm.id='" + id + "'";
            List<CParameterModel> list = dao.executeQuery(hql);
            if (list.size() > 0 && list != null) {
                CParameterModel model = list.get(0);
                model.setCategory(id);
                //删除图片
                if (!model.getPicture().equals("")) {
                    File f = new File(rootPath + model.getPicture());
                    f.delete();
                }
                model.setPicture("");
                dao.update(model);
            }
            result.append("result", "SUCCESS");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();

        }

    }
}