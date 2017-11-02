package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IStorageLocationDefinitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by SunJun on 2016/3/7. TODO 库位定义
 */
@RestController
@ResponseBody
@RequestMapping("/storageLocationDefinition")
public class StorageLocationDefinition{

	/**
	 * 库位service接口
	 */
	@Autowired
	IStorageLocationDefinitionService service;

	/**
	 * 库位信息初始化
	 *
	 * @return
	 */
	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public List init(){

		return service.init();
	}

	/**
	 * 根据条件查找的库位信息
	 *
	 * @param storageDescription
	 * 		库房描述
	 * @param storageLocationNo
	 * 		库位编号
	 * @param storageLocationDescription
	 * 		库位描述
	 *
	 * @return
	 */
	@RequestMapping(value = "/storageLocationSearch", method = RequestMethod.GET)
	public List storageLocationSearch(@RequestParam("storageRoomNo") String storageDescription, @RequestParam("storageLocationNo") String
			storageLocationNo, @RequestParam("storageLocationDescription") String storageLocationDescription){

		return service.storageLocationSearch(storageDescription, storageLocationNo, storageLocationDescription);
	}

	/**
	 * 获取单位
	 *
	 * @return
	 */
	@RequestMapping(value = "/getUnit", method = RequestMethod.GET)
	public List getUnit(){

		return service.getUnit();
	}

	/**
	 * 获取所有库房信息
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAllStorage", method = RequestMethod.GET)
	public List getAllStorage(){

		return service.getAllStorage();
	}

	/**
	 * 更新库位信息
	 *
	 * @param upload
	 *
	 * @return
	 */
	@RequestMapping(value = "/storageLocationUpload", method = RequestMethod.POST)
	public String storageLocationUpload(@RequestBody String upload){

		return service.storageLocationUpload(upload);
	}

	/**
	 * 根据库位编号查找库位信息
	 *
	 * @param storageLocationNo
	 *
	 * @return
	 */
	@RequestMapping(value = "/storageLocationNoSearch", method = RequestMethod.GET)
	public Object storageLocationNoSearch(@RequestParam("storageLocationNo") String storageLocationNo){

		return service.storageLocationNoSearch(storageLocationNo);
	}

	/**
	 * 根据选择的库房动态带出库位信息
	 *
	 * @param storageId
	 *
	 * @return
	 */
	@RequestMapping(value = "/getStorageLocation", method = RequestMethod.GET)
	public Object storageLocation(@RequestParam("storageId") String storageId){

		return service.storageLocation(storageId);
	}

}
