package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2016/7/5.
 */

@RestController
@ResponseBody
@RequestMapping("/faliao")
public class faliao{

	@Autowired
	IFaliaoService service;
	//获取刀具行
	@RequestMapping(value = "/selectRow", method = RequestMethod.POST)
	String saveScrapMsg(@RequestBody String data){
		return service.selectRow(data);
	}

	//保存
	@RequestMapping(value = "/saveData", method = RequestMethod.POST)
	String saveData(@RequestBody String data, HttpServletRequest request){
		return service.saveData(data, request);
	}
}
