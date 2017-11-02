package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.CParameterModel;
import com.smtcl.machinetool.service.IParameterModelService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by CJS on 2016/1/26. TODO 参数模型：参数列表查询、功能列表查询、类别功能查询对应图片信息
 */
@RestController
@ResponseBody
@RequestMapping("/parametermodel")
public class ParameterModel{

	/**
	 * 参数模型service接口
	 */
	@Autowired
	private IParameterModelService service;

	/**
	 * 查询类型列表
	 * @return
	 */
	@RequestMapping(value = "/showList0")
	public List<CParameterModel> showList0(){

		return service.showList0();
	}

	/**
	 * 查询功能列表
	 * @return
	 */
	@RequestMapping(value = "/showList1")
	public List<CParameterModel> showList1(){

		return service.showList1();
	}

	/**
	 * 查询参数列表
	 * @param function 功能
	 * @return
	 */
	@RequestMapping(value = "/showParList")
	public List<CParameterModel> showParList(@RequestParam("function") String function){

		return service.showParList(function);
	}

	/**
	 * 查询类型参数
	 * @param category 类别
	 * @param type 类型
	 * @return
	 */
	@RequestMapping(value = "/showCTypePar")
	public Object showCTypePar(@RequestParam("category") String category,int type){

		return service.showCTypePar(category,type);
	}

	/**
	 * 按照功能类型查询图片
	 * @param category 共鞥
	 * @param type 类型
	 * @return
	 */
	@RequestMapping(value = "/getPicname", method = RequestMethod.GET)
	public String getPicname(@RequestParam("category") String category, @RequestParam("type") String type){

		CParameterModel       parameterModel;
		List<CParameterModel> list = service.getPicname(category, type);
		if (list.size() <= 0 || list == null){
			return "";
		} else{
			parameterModel = list.get(0);
			return parameterModel.getPicture();
		}
	}


}





