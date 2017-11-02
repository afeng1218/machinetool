package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by CJS on 2016/4/19.
 */
@RestController
@ResponseBody
@RequestMapping("/stockDetailList")
public class StockDetailList{

	/**
	 * 库存明细service接口
	 */
	@Autowired
	IStockDetailListService service;

	/**
	 * @param uploadJson
	 * 		RoomNo     库房编号 roomplace  库位 materialNO 物料编号 use_status 物料状态 borrowNum  借用数量
	 *
	 * @return 是否可借用
	 */

	@RequestMapping(value = "/availableNum", method = RequestMethod.POST)
	String saveBorrowMsg(@RequestBody String uploadJson){

		JSONObject json       = new JSONObject(uploadJson);
		String     RoomNo     = json.getString("RoomNo");
		String     roomplace  = json.getString("roomplace");
		String     materialNO = json.getString("materialNO");
		String     use_status = json.getString("use_status");
		String     borrowNum  = json.getString("borrowNum");
		return service.availableNum(RoomNo, roomplace, materialNO, use_status, borrowNum);
	}

	/**
	 * 获取库存总量
	 * @param RoomNo 库房编号
	 * @param roomplace 库位编号
	 * @param materialNO 物料编号
	 * @param use_status 使用状态
	 * @param borrowNum  借用数量
	 * @return
	 */
	@RequestMapping(value = "/availableNum", method = RequestMethod.GET)
	public String availableNum(@RequestParam("RoomNo") String RoomNo, @RequestParam("roomplace") String roomplace, @RequestParam("materialNO")
			String materialNO, @RequestParam("use_status") String
			                           use_status, @RequestParam("borrowNum") String
			                           borrowNum){

		return service.availableNum(RoomNo, roomplace, materialNO, use_status, borrowNum);
	}

	/**
	 * 获取物料数量
	 *
	 * @param RoomNo
	 * 		库房编号
	 * @param materialNO
	 * 		物料编号
	 * @param use_status
	 * 		库房启用状态
	 *
	 * @return
	 */
	@RequestMapping(value = "/materialNum", method = RequestMethod.GET)
	public String materialNum(@RequestParam("RoomNo") String RoomNo, @RequestParam("materialNO") String materialNO, @RequestParam("use_status")
			String
			use_status){

		return service.materialNum(RoomNo, materialNO, use_status);
	}
}