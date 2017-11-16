package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2017/11/9.
 */
@RestController
@ResponseBody
@RequestMapping("/collectelementdefine")
public class CollectelEmentDefine{

	@Autowired
	ICollectelEmentDefine service;

	@RequestMapping(value = "/save",method = RequestMethod.POST)
	public String save(@RequestBody String map,HttpServletRequest request){
		return service.save(map,request);
	}

	@RequestMapping(value = "/selectTitle", method = RequestMethod.POST)
	public List selectTitle(String newTime,String endTime){
		return service.selectTitle(newTime,endTime);
	}

	@RequestMapping(value = "/selectRow",method = RequestMethod.POST)
	public String selectRow(String id){
		return service.selectRow(id);
	};
}
