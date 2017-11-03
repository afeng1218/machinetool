package com.smtcl.machinetool.service;

import javax.servlet.http.HttpSession;

/**
 * Created by GuoFeng on 2016/8/15.
 */
public interface IgetSessionDataService {

    /**
     * 获取所哟的session数据
     *
     * @return
     */
    Object getSessionData(HttpSession httpSession);
}
