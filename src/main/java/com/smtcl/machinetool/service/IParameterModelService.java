package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.CParameterModel;

import java.util.*;

/**
 * Created by CJS on 2016/2/19.
 * TODO 参数模型service
 */

public interface IParameterModelService{

    /**
     * 查询参数类型
     *
     * @return
     */
    List<CParameterModel> showList0();

    /**
     * 查询功能类型
     *
     * @return
     */
    List<CParameterModel> showList1();

    /**
     * 参数模型查询
     *
     * @param function
     *
     * @return
     */
    List<CParameterModel> showParList(String function);

    /**
     * 获取图片名
     *
     * @param category
     * 		类别
     * @param type
     * 		类型
     *
     * @return 图片名List
     */
    List getPicname(String category, String type);

    /**
     * 获取刀具类型参数
     *
     * @param category
     *         类型名称
     * @return
     */
    List showCTypePar(String category,int type);

}
