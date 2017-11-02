package com.smtcl.machinetool.service;

import java.util.List;

/**
 * Created by SunJun on 2016/3/8.
 * TODO 库存明细查询
 */
public interface IInventoryDetailService {

    /**
     * 库存明细信息获取
     *
     * @param request
     * 		ajax上传的json格式字符串 { 'storageNo': $('#stock input:first').val(), 'storageLocationNo': storageLocationNo, 'materialNo': materialNo,
     * 		'materialVersion': materialVersion, 'materialExplain': materialExplain, 'state': state, 'batchBegin': batchBegin, 'batchEnd': batchEnd,
     * 		'sequenceBegin': sequenceBegin, 'sequenceEnd': sequenceEnd }
     *
     * @return 库存信息List数据
     */
    List getInventory(String request);

    /**
     * 库位信息获取
     *
     * @param storageId 库房id
     * @return 库房下的所有库位
     */
    List getStorageLocation(String storageId);

    /**
     * 物料版本获取
     * @param materialNo 物料编号
     * @return 该物料编号下的所有物料版本
     */
    String searchMaterialVersion(String materialNo);
}
