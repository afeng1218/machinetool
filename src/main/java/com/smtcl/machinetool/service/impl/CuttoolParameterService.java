package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCuttoolBasedata;
import com.smtcl.machinetool.models.machinetool.CSolidCuttoolParameter;
import com.smtcl.machinetool.models.machinetool.CSolidCuttoolParameterId;
import com.smtcl.machinetool.models.machinetool.CuttoolParModel;
import com.smtcl.machinetool.service.ICuttoolParameterService;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by CJS on 2016/2/23.
 */
@Service
public class CuttoolParameterService implements ICuttoolParameterService {

    @Autowired
    IGenericDAO dao;

    @Override
    public void cParsSave(String scp) {

        JSONArray cparArray = new JSONArray(scp);
        List<CCuttoolBasedata> clist = new ArrayList<CCuttoolBasedata>();
        CCuttoolBasedata cuttool = new CCuttoolBasedata();
        List<CSolidCuttoolParameter> slist = new ArrayList<CSolidCuttoolParameter>();


        String cno = cparArray.getJSONObject(0).get("cuttoolno").toString();
        String fhql = "from CSolidCuttoolParameter cscp where cscp.CCuttoolBasedata.cuttoolNo='" + cno + "'";
        slist = dao.executeQuery(fhql);
        if (slist.size() > 0) {
            for (int j = 0; j < slist.size(); j++) {
                CSolidCuttoolParameter cparameter = new CSolidCuttoolParameter();
                cparameter = slist.get(j);
                dao.delete(cparameter);
            }
        }
        String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo='" + cno + "'";
        clist = dao.executeQuery(hql);
        cuttool = clist.get(0);
        int cid = cuttool.getCuttoolId();
        for (int i = 0; i < cparArray.length(); i++) {
            CSolidCuttoolParameter cuttoolParameter = new CSolidCuttoolParameter();
            CSolidCuttoolParameterId cuttoolParameterid = new CSolidCuttoolParameterId();
            cuttoolParameterid.setParameter(cparArray.getJSONObject(i).get("parameter").toString());
            cuttoolParameterid.setCuttoolId(cid);
            cuttoolParameter.setId(cuttoolParameterid);
            float val = Float.parseFloat(cparArray.getJSONObject(i).get("value").toString());
            cuttoolParameter.setValue(val);
            int total_class = Integer.parseInt(cparArray.getJSONObject(i).get("total_class").toString());
            cuttoolParameter.setTotalClass(total_class);
            dao.saveOrUpdate(cuttoolParameter);
        }
    }

    @Override
    public List<CuttoolParModel> searchCPar(String cuttoolNo) {
        List<CCuttoolBasedata> clist = new ArrayList<CCuttoolBasedata>();
        CCuttoolBasedata cuttool = new CCuttoolBasedata();
        List<CuttoolParModel> mlist = new ArrayList<CuttoolParModel>();

        List<CSolidCuttoolParameter> list = new ArrayList<CSolidCuttoolParameter>();
        CSolidCuttoolParameter cuttoolParameter = new CSolidCuttoolParameter();
        String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo='" + cuttoolNo + "'";
        clist = dao.executeQuery(hql);
        cuttool = clist.get(0);
        int cid = cuttool.getCuttoolId();
        String hql2 = "from CSolidCuttoolParameter cscp where cscp.id.cuttoolId=" + cid;
        list=dao.executeQuery(hql2);

        for(int i=0;i<list.size();i++){
            CuttoolParModel model = new CuttoolParModel();
            model.setParname(list.get(i).getId().getParameter());
            model.setValue(list.get(i).getValue());
            model.setTotalClass(list.get(i).getTotalClass());
            model.setOrderNo(i);
            mlist.add(model);
        }
        return mlist;
    }
}
