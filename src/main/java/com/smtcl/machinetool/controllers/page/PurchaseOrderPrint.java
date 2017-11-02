package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by guofeng on 2016/5/23.
 */
@RestController
@ResponseBody
@RequestMapping("/purchaseOrderPrint")
public class PurchaseOrderPrint{

	@Autowired
	IPurchaseOrderPrintService service;

	/**
	 * 采购订单查询
	 *
	 * @return
	 */
	@RequestMapping(value = "/showPrint", method = RequestMethod.POST)
	String showPrint(@RequestBody String map){
		return service.showPrint(map);
	}

	/**
	 * 打印状态更改
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/checkPrint", method = RequestMethod.POST)
	String checkPrint(@RequestBody String map){
		return service.checkPrint(map);
	}
}
