package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.service.IgetSessionDataService;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by GuoFeng on 2016/8/15.
 */
@Service
public class getSessionDataService implements IgetSessionDataService {

    @Override
    public Object getSessionData(HttpSession httpSession) {

        JSONObject result = new JSONObject();

        result.append("defaultStorage", httpSession.getAttribute("DEFAULT_STORAGE"));
        result.append("approvalAuthority", httpSession.getAttribute("APPROVAL_AUTHORITY"));

        System.out.println("defaultStorage:" + httpSession.getAttribute("DEFAULT_STORAGE"));
        System.out.println("defaultStorage:" + httpSession.getAttribute("APPROVAL_AUTHORITY"));

        return result.toString();

    }
}
