package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.annotation.*;
import javax.servlet.http.*;

/**
 * Created by guofeng on 2016/4/18.
 */
@RestController
@ResponseBody
@RequestMapping("/purchaseBuyer")
public class PurchaseBuyer{

	@Autowired
	IPurchaseBuyer service;

	@RequestMapping(value = "/saveValue",method = RequestMethod.POST)
	public String saveValue(@RequestBody String json){
		return service.savePurchaseBuyer(json);
	}
}
