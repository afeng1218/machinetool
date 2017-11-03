package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CParameterModel;
import com.smtcl.machinetool.service.IParameterModelService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/2/19.
 */
@Service
public class ParameterModelService implements IParameterModelService {

    @Autowired
    private IGenericDAO dao;

    public List<CParameterModel> showList0() {
        String hql = "from CParameterModel cp where cp.type=0";
        return dao.executeQuery(hql);
    }

    @Override
    public List<CParameterModel> showList1() {
        String hql = "from CParameterModel cp where cp.type=2";
        return dao.executeQuery(hql);
    }

    @Override
    public List<CParameterModel> showParList(String function) {

        String hql = "from CParameterModel cp where cp.category=" + function;
        return dao.executeQuery(hql);
    }

    @Override
    public List getPicname(String category, String type) {
        String hql = "from CParameterModel cpm where cpm.category='" + category + "' and cpm.type=" + type + "";
        return dao.executeQuery(hql);
    }

    @Override
    public List showCTypePar(String category, int type) {

        String hql = "from CParameterModel cpm where cpm.category='" + category + "' and cpm.type=" + type;
        List list = dao.executeQuery(hql);
        List parList = new ArrayList();

        if (list.size() > 0 && list.get(0) != null) {

            CParameterModel cParameterModel = (CParameterModel) list.get(0);

            String parameterName = cParameterModel.getParameterName();
            String parameterVal = cParameterModel.getSuggestedCuttingPar();

            if (!"".equals(parameterName)&& parameterName != null) {

                String[] parName = parameterName.split("\\|");
                String[] parValue = parameterVal.split("\\|");

                int parValueLength = parValue.length;

                for (int i = 0; i < parName.length; i++) {

                    Map map = new HashMap();
                    map.put("parName", parName[i]);
                    if (i > parValueLength - 1) {

                        map.put("parValue", "");
                    } else {
                        map.put("parValue", parValue[i]);
                    }
                    parList.add(map);
                }

            }

        }
        return parList;
    }

}
