package com.smtcl.machinetool.service;

import java.util.List;

/**
 * Created by SunJun on 2016/3/2. TODO 库房定义Service
 */
public interface IStorageDefinitionService{

	/**
	 * 库房信息查询
	 *
	 * @param storageNo
	 * 		库房编号
	 * @param storageExplain
	 * 		库房描述
	 * @param storageState
	 * 		库房状态
	 *
	 * @return 库房信息List
	 */
	List storageSearch(String storageNo, String storageExplain, String storageState);

	/**
	 * 查询库房是否存在
	 *
	 * @param storageNo
	 * 		库房编号
	 *
	 * @return 返回查询结果
	 */
	Object storageNoSearch(String storageNo);

	/**
	 * 人员信息获取
	 *
	 * @return 人员List
	 */
	List getPerson();

	/**
	 * 删除库房信息
	 *
	 * @param storageId
	 * 		库房id
	 */
	void storageDelete(String storageId);

	/**
	 * 库房信息上传
	 *
	 * @param upload
	 * 		封装上传的Json格式数据
	 *
	 * @return 上传结果
	 */
	String storageUpload(String upload);

	/**
	 * 查询库房通过库房id进行查询
	 *
	 * @param Json
	 *
	 * @return
	 */
	String searchByid(String Json);

	/**
	 * 查看库房是否被占用
	 *
	 * @param storageId
	 * @param storageNo
	 *
	 * @return
	 */
	Object storageOccupySearch(String storageId, String storageNo);

	/**
	 * 库位占用查询
	 *
	 * @param storageRoomId
	 * 		库房id
	 * @param storageLocationId
	 * 		库位id
	 * @param storageLocationNo
	 * 		库位编号
	 *
	 * @return
	 */
	Object storageLocationOccupySearch(String storageRoomId, String storageLocationId, String storageLocationNo);

	/**
	 * 判断是否是立体库
	 * @param json 上传的库位信息
	 * @return
	 */
	String isLitiku(String json);

	/**
	 * 通过库房id获取库房no
	 * @param storageId 库房id
	 * @return
	 */
	Object searchStorageNoById(String storageId);
}
