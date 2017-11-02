package com.smtcl.machinetool.service;

import java.util.List;

/**
 * Created by SunJun on 2016/3/7. TODO 库位Service
 */
public interface IStorageLocationDefinitionService{

	/**
	 * 库位信息初始化
	 *
	 * @return 初始化信息返回
	 */
	List init();

	/**
	 * 库位查询
	 *
	 * @param storageDescription
	 * 		库房描述
	 * @param storageLocationNo
	 * 		库位编号
	 * @param storageLocationDescription
	 * 		库位描述
	 *
	 * @return 库位查询结果List
	 */
	List storageLocationSearch(String storageDescription, String storageLocationNo, String storageLocationDescription);

	/**
	 * 获取单位信息
	 *
	 * @return
	 */
	List getUnit();

	/**
	 * 获取所有库房信息
	 *
	 * @return
	 */
	List getAllStorage();

	/**
	 * 库位信息上传
	 *
	 * @param upload
	 * 		封装上传的Json格式数据
	 *
	 * @return
	 */
	String storageLocationUpload(String upload);

	/**
	 * 库位信息查询
	 *
	 * @param storageLocationNo
	 * 		库位编号
	 *
	 * @return
	 */
	Object storageLocationNoSearch(String storageLocationNo);

	/**
	 * 根据库房id带出库位信息
	 *
	 * @param storageId
	 *
	 * @return
	 */
	Object storageLocation(String storageId);

}
