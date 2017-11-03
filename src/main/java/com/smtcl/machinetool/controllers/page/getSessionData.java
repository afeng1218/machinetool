package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IgetSessionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by GuoFeng on 2016/8/15.
 */
@RestController
@ResponseBody
@RequestMapping("/getSessionData")
public class getSessionData {

    @Autowired
    IgetSessionDataService service;

    /**
     * 获取session数据
     *
     * @param httpSession
     * @return
     */
    @RequestMapping(value = "/getUserName", method = RequestMethod.GET)
    public Object getUserName(HttpSession httpSession) {

        return service.getSessionData(httpSession);
    }

    /**
     * @param httpSession
     * @return
     */
    @RequestMapping(value = "/getAuthority")
    public Object getAuthority(HttpSession httpSession) {

        return null;
    }
}

