package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by SunJun on 2016/3/22. TODO 采购申请controller
 */
@RestController
@ResponseBody
@RequestMapping("/purchaseRequisition")
public class purchaseRequisition{

	@Autowired
	IPurchaseRequisitionService service;

	/**
	 * 供应商信息获取
	 *
	 * @return 供应商编号 描述 json数据
	 */
	@RequestMapping(value = "/getSupplier", method = RequestMethod.GET)
	List getSupplier(){

		return service.getSupplier();
	}

	/**
	 * 获取采购申请编号
	 *
	 * @return 获取的编号
	 */
	@RequestMapping(value = "/getRequisitionNo", method = RequestMethod.GET)
	String getRequisitionNo(){

		return service.getRequisitionNo();
	}

	/**
	 * 保存采购申请信息
	 *
	 * @param uploadValue
	 * 		上传数据
	 *
	 * @return 保存结果
	 */
	@RequestMapping(value = "/saveRequisition", method = RequestMethod.POST)
	String saveRequisition(@RequestBody String uploadValue){

		return service.saveRequisition(uploadValue);
	}

	/**
	 * 删除采购申请
	 *
	 * @param requisitionNo
	 * 		采购申请编号
	 *
	 * @return 删除反馈结果
	 */
	@RequestMapping(value = "/deleteRequisition", method = RequestMethod.GET)
	String deleteRequisition(@RequestParam("requisitionNo") String requisitionNo){

		return service.deleteRequisition(requisitionNo);
	}

	/**
	 * 获取库房列表信息
	 *
	 * @return 返回库房List
	 */
	@RequestMapping(value = "/getStorageRoom", method = RequestMethod.GET)
	List getStorageRoom(){

		return service.getStorageRoom();
	}

	/**
	 * 根据物料编号查询和计算物料申请信息
	 *
	 * @param materialNo
	 * 		上传物料编号
	 *
	 * @return 查询结果
	 */
	@RequestMapping(value = "/getMaterialRequisitionMsg", method = RequestMethod.GET)
	String getMaterialRequisitionMsg(@RequestParam("materialNo") String materialNo, @RequestParam("searchStorage") String searchStorage){

		return service.getMaterialRequisitionMsg(materialNo, searchStorage);
	}

	/**
	 * 根据物料编号 库房编号查询当前库存
	 *
	 * @param materialNo
	 * 		物料编号
	 * @param storageNo
	 * 		库房编号
	 *
	 * @return 查询结果
	 */
	@RequestMapping(value = "/getCurrentConsumption", method = RequestMethod.GET)
	String getCurrentConsumption(@RequestParam("materialNo") String materialNo, @RequestParam("storageNo") String storageNo){

		return service.getCurrentConsumption(materialNo, storageNo);
	}

	/**
	 * 获取物料默认版本编号
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 物料默认版本
	 */
	@RequestMapping(value = "/getMaterialVersion", method = RequestMethod.GET)
	String getMaterialVersion(@RequestParam("materialNo") String materialNo){

		return service.getMaterialVersion(materialNo);
	}

	/**
	 * 获取申请题头或者行信息
	 *
	 * @param requestBody
	 * 		request body
	 *
	 * @return 返回题头获取行信息结果
	 */
	@RequestMapping(value = "/getRequisitionHeadOrRow", method = RequestMethod.POST)
	String getRequisitionHeadOrRow(@RequestBody String requestBody){

		return service.getRequisitionHeadOrRow(requestBody);
	}

	/**
	 * 根据申请号查询申请行信息
	 *
	 * @param applyNo
	 * 		申请编号
	 *
	 * @return 申请行信息
	 */
	@RequestMapping(value = "/getRequisitionRowByApplyNo", method = RequestMethod.GET)
	List getRequisitionRowbYApplyNo(@RequestParam("applyNo") String applyNo){

		return service.getRequisitionRowByApplyNo(applyNo);
	}

	/**
	 * 获取账号修改保存权限、采购申请行信息
	 *
	 * @param no
	 * 		采购申请编号
	 * @param account
	 * 		账号
	 * @param pageName
	 * 		页面name
	 *
	 * @return 返回审批权限、采购申请行信息
	 */
	@RequestMapping(value = "/getPageAuthorityAndRequisitionRow", method = RequestMethod.GET)
	List getPageAuthorityAndRequisitionRow(@RequestParam("no") String no, @RequestParam("account") String account,
	                                       @RequestParam("pageName") String pageName){

		return service.getPageAuthorityAndRequisitionRow(no, account, pageName);
	}

}
