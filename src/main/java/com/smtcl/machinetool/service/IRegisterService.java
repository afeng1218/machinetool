package com.smtcl.machinetool.service;

/**
 * Created by GuoFeng on 2016/2/27.
 * TODO 用户注册Service
 */
public interface IRegisterService {

    /**
     * 用户注册
     *
     * @param name
     * 		用户名
     * @param password
     * 		密码
     * @param date
     * 		注册时间
     *
     * @return 返回注册结果
     */
    public String register(String name, String password, String date);
}
