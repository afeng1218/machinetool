package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CAccountApply;
import com.smtcl.machinetool.service.IRegisterService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by SunJun on 2016/2/27.
 */
@Service
public class RegisterService implements IRegisterService {

    @Autowired
    IGenericDAO dao;

    @Override
    public String register(String name, String password, String date) {

        String hql = "from CAccountApply caa where caa.account='" + name + "'";
        List list = dao.executeQuery(hql);
        JSONObject jsonObject = new JSONObject();
        if (dao.executeQuery("from CRegist cr where cr.name='" + name + "'").size() > 0) {

            jsonObject.append("RESULT", "EXIST");
            return jsonObject.toString();
        } else {
            if (list.size() > 0) {

                jsonObject.append("RESULT", "FALSE");
                return jsonObject.toString();
            } else {

                CAccountApply cAccountApply = new CAccountApply();
                cAccountApply.setAccount(name);
                cAccountApply.setPassword(password);
                cAccountApply.setApplyTime(Timestamp.valueOf(date));
                dao.add(cAccountApply);

                jsonObject.append("RESULT", "TRUE");
                return jsonObject.toString();
            }
        }

    }
}
