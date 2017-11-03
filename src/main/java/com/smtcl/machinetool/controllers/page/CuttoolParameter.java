package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.ICuttoolParameterService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GuoFeng on 2016/2/18.
 * TODO 刀具参数
 */
@RestController
@ResponseBody
@RequestMapping("/cuttoolParameter")
public class CuttoolParameter{

	@Autowired
	ICuttoolParameterService service;

	@RequestMapping(value = "/save")
	public String savePar(@RequestBody String scp){
		System.out.println(scp);
		service.cParsSave(scp);
		return "success";
	}

	//根据刀具编号查询刀具参数信息
	@RequestMapping(value = "/searchCPar", method = RequestMethod.GET)
	public List searchCPar(@RequestParam String cuttoolNo){
		return service.searchCPar(cuttoolNo);
	}
}