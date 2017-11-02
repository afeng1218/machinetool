package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

@RestController
@ResponseBody
@RequestMapping("/categorySettings")
public class CategorySettings{

	@Autowired
	ICategorySettingsService service;

	//保存信息
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String save(@RequestBody String map){
		return service.save(map);
	}

	//删除图片
	@RequestMapping(value = "/removeImages", method = RequestMethod.POST)
	public String removeImages(@RequestBody String id){
		return service.removeImages(id);
	}

	//上传图片
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String materialParPicUpload(@RequestParam("id") String id,
	                                    @RequestParam("name") String name,
	                                    @RequestParam("picture") MultipartFile file){
		return service.upload(name,file,id);
	}
}
