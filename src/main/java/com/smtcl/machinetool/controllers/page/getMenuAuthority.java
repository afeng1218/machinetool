package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IgetMenuAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by SunJun on 2016/8/15.
 */
@RestController
@ResponseBody
@RequestMapping("/getMenuAuthority")
public class getMenuAuthority {

    @Autowired
    IgetMenuAuthorityService service;

    @RequestMapping(value = "/menuAuthority", method = RequestMethod.GET)
    public Object menuAuthority(HttpServletRequest request) {

        return service.getMenuAuthority(request);
    }

}
