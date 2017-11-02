package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import javax.servlet.http.*;

/**
 * Created by guofeng on 2017/9/19.
 */
@RestController
@ResponseBody
@RequestMapping("/procedure")
public class CprocessProcedurePage{

	@Autowired
	ICprocessProcedureService service;

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
	 * 上传图片
	 * @param id
	 * @param name
	 * @param file
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String materialParPicUpload(@RequestParam("id") String id,
	                                   @RequestParam("name") String name,
	                                   @RequestParam("process_diagram") MultipartFile file){
		return service.upload(name, file, id);
	};

	/**
	 * 查找
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/select",method = RequestMethod.POST)
	public String select(@RequestBody String id){
		return service.select(id);
	}

	/**
	 * 删除图片
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/removeImages",method = RequestMethod.POST)
	public boolean removeImages(@RequestBody String map){
		return service.removeImages(map);
	}

	/**
	 * 删除
	 * @param map
	 * @return
	 */
	@RequestMapping(value = "/remove",method = RequestMethod.POST)
	public boolean remove(@RequestBody String map){
		return service.remove(map);
	}

	/**
	 * 审批
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/approve",method = RequestMethod.POST)
	public boolean approve(@RequestBody String id,HttpServletRequest request){
		return service.approve(id,request);
	}
}
