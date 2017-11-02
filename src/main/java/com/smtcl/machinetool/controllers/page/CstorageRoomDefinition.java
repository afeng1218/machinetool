package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2017/9/30.
 */
@RestController
@ResponseBody
@RequestMapping("/cstorageRoomDefinition")
public class CstorageRoomDefinition{
	@Autowired
	ICstorageRoomDefinitionService service;
	/**
	 * 保存
	 * @param cp
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/save",method = RequestMethod.POST)
	public String save(@RequestBody String cp, HttpServletRequest request){
		return service.save(cp,request);
	}
	/**
	 * 取消货签
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/cancel",method = RequestMethod.POST)
	public String cancel(@RequestBody String id){
		return service.cancel(id);
	}
	/**
	 * 生成货签
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/generate",method = RequestMethod.POST)
	public String generate(@RequestBody String map){
		return service.generate(map);
	}
	/**
	 * 取消盘点
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/cancelInventory",method = RequestMethod.POST)
	public String cancelInventory(@RequestBody String map){
		return service.cancelInventory(map);
	}

	/**
	 * 查询盘点内容
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectList",method = RequestMethod.POST)
	public List selectList(@RequestBody String id){
		return service.selectList(id);
	}
	/**
	 * 查询物料信息
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/selectMateriel",method = RequestMethod.POST)
	public List selectMateriel(@RequestBody String id){
		return service.selectMateriel(id);
	}
	/**
	 * 盘点录入
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/saveInput",method = RequestMethod.POST)
	public String saveInput(@RequestBody String map){
		return service.saveInput(map);
	}
	/**
	 * 审批保存
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/saveData",method = RequestMethod.POST)
	public String saveData(@RequestBody String map){
		return service.saveData(map);
	}
	/**
	 * 启动调整
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/startUp",method = RequestMethod.POST)
	public String startUp(@RequestBody String map, HttpServletRequest request){
		return service.startUp(map,request);
	}
}