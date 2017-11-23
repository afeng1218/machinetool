package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
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
	public String selectLine(@RequestBody String map){
		return service.selectLine(map);
	};

	@RequestMapping(value = "/selectRowData",method = RequestMethod.POST)
	public String selectRowData(@RequestBody String map){
		return service.selectRowData(map);
	}

	@RequestMapping(value = "/saveData",method = RequestMethod.POST)
	public String saveData(@RequestBody String map, HttpServletRequest request){
		return service.saveData(map,request);
	}

	@RequestMapping(value = "/loadData", method = RequestMethod.POST)
	public String loadData(@RequestBody String map){
		return  service.loadData(map);
	}
	@RequestMapping(value = "/uploadLifetime", method = RequestMethod.POST)
	public String uploadLifetime(@RequestBody String map, HttpServletRequest request){
		return  service.uploadLifetime(map,request);
	}
}
