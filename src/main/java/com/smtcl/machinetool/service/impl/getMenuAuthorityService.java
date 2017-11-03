package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.service.IgetMenuAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by GuoFeng on 2016/8/15.
 */
@Service
public class getMenuAuthorityService implements IgetMenuAuthorityService {

    @Autowired
    IGenericDAO dao;

    @Override
    public Object getMenuAuthority(HttpServletRequest request) {

        return null;
    }
}
