package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by GuoFeng on 2016/7/25.
 */
@RestController
@ResponseBody
@RequestMapping("/storageAcceptPrint")
public class StorageAcceptPrint{

	/**
	 * 入库验收单打印service接口
	 */
	@Autowired
	IStorageAcceptPrintService service;

	/**
	 * 获取所有的入库验收单
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAllStorageAcceptList", method = RequestMethod.POST)
	Object getAllStorageAcceptList(@RequestBody String request){

		return service.getAllStorageAcceptList(request);
	}

}
