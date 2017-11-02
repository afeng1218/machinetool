package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2016/4/15.
 */
@RestController
@ResponseBody
@RequestMapping("/supplierMaintenance")
public class SupplierMaintenance{

	@Autowired
	ISupplierMaintenance service;

	/**
	 * 供应商保存
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveValue", method = RequestMethod.POST)
	public String saveValue(@RequestBody String json,HttpServletRequest request){
		return service.saveSupplierMaintenance(json,request);
	}
}
