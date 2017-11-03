package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCharacteristicDescription;
import com.smtcl.machinetool.models.machinetool.CHandType;
import com.smtcl.machinetool.service.IHandTypeService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/2/19.
 */
@Service
public class HandTypeService implements IHandTypeService {

    @Autowired
    private IGenericDAO dao;

    @Override
    public List<CHandType> getList() {
        return dao.findAll(CHandType.class);
    }

    @Override
    public List<CCharacteristicDescription> getCharacterList() {
         return dao.findAll(CCharacteristicDescription.class);
    }
}
