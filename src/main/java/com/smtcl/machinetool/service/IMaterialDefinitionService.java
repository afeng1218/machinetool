package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.*;
import org.springframework.transaction.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * Created by GuoFeng on 2016/1/22. TODO 通用物料service接口
 */
public interface IMaterialDefinitionService{

	/**
	 * 初始化物料定义页面参数获取
	 *
	 * @return 初始数据List
	 */
	List getInitPar();

	/**
	 * 物料编号查询
	 *
	 * @param noValue
	 * 		物料编号
	 *
	 * @return 物料是否存在 0 不存在 1 存在
	 */
	Integer materialNoSearch(String noValue);

	/**
	 * 根据物料id查询所有物料版本
	 *
	 * @param materialId
	 * 		物料id
	 *
	 * @return 物料版本List
	 */
	List versionSearch(String materialId);

	/**
	 * 物料信息查询
	 *
	 * @param searchValue
	 * 		物料编号或者物料描述信息 % 模糊查询
	 *
	 * @return 所有物料查询结果
	 */
	List materialSearch(String searchValue);

	/**
	 * 根据物料编号获取物料信息
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 物料信息
	 */
	List materialEdit(String materialNo);

	/**
	 * 物料模型选择事件
	 *
	 * @param materialClass
	 * 		选择的物料模型
	 *
	 * @return 返回物料参数信息 和 图片
	 */
	List modelClassChoose(String materialClass);

	/**
	 * 物料定义数据上传
	 *
	 * @param materialDefinition
	 * 		上传物料定义
	 *
	 * @return 上传结果
	 */
	@Transactional
	Object materialDefinitionUpload(String materialDefinition);

	/**
	 * 物料定义 物料类别图片上传
	 *
	 * @param name
	 * 		图片名
	 * @param pic
	 * 		图片数据
	 * @param materialNo
	 * 		物料编号
	 * @param materialClass
	 * 		物料类别
	 *
	 * @return 上传结果
	 */
	Integer materialParPicUpload(String name, MultipartFile pic, String materialNo, String materialClass);

	/**
	 * 物料参数信息查询
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 物料参数 List
	 */
	List<CMaterialParameter> materialPars(String materialNo);

	/**
	 * 物料批次查询
	 *
	 * @param searchValue
	 * 		查询条件（物料编号|批次号）
	 *
	 * @return 批次信息List
	 */
	List<CBatchList> batchSearch(String searchValue);

	/**
	 * 物料序列查询
	 *
	 * @param searchValue（物料编号|序列号）
	 *
	 * @return 序列信息List
	 */
	List<CSequenceList> sequenceSearch(String searchValue);

	/**
	 * 物料删除
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 返回删除结果
	 */
	@Transactional
	Object materialDelete(String materialNo);
}
