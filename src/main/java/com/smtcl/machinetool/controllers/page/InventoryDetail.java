package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IInventoryDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by SunJun on 2016/3/8. TODO 库存明细：库房查询、库位查询、物料查询
 */
@RestController
@ResponseBody
@RequestMapping("/inventoryDetail")
public class InventoryDetail{

	/**
	 * 库存明细service接口
	 */
	@Autowired
	IInventoryDetailService service;

	/**
	 * 获取库存信息
	 * @param request 请求体
	 * @return
	 */
	@RequestMapping(value = "/getInventory", method = RequestMethod.POST)
	public List getInventory(@RequestBody String request){

		return service.getInventory(request);
	}

	/**
	 * 获取库位信息
	 * @param storageId 库房id
	 * @return
	 */
	@RequestMapping(value = "/storageLocation", method = RequestMethod.GET)
	public List getStorageLocation(@RequestParam("storageId") String storageId){

		return service.getStorageLocation(storageId);
	}

	/**
	 * 查询物料版本
	 * @param materialNo 物料编号
	 * @return
	 */
	@RequestMapping(value = "/searchMaterialVersion", method = RequestMethod.GET)
	public String searchMaterialVersion(@RequestParam("materialNo") String materialNo){

		return service.searchMaterialVersion(materialNo);
	}

}
