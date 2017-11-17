package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by guofeng on 2017/11/17.
 */
@RestController
@ResponseBody
@RequestMapping("/toolLife")
public class ToolLife{

	@Autowired
	IToolLifeService service;

	@RequestMapping(value = "/selectLine",method = RequestMethod.POST)
	public String selectLine(@RequestBody String type){
		return service.selectLine(type);
	}
}
