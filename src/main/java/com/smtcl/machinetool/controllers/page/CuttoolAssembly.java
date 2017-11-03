package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.ICuttoolAssemblyService;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/2/22.
 * TODO 刀具装配类
 */
@RestController
@ResponseBody
@RequestMapping("/assembly")
public class CuttoolAssembly{

	@Autowired
	ICuttoolAssemblyService service;

	@RequestMapping(value = "/savewithmid", method = RequestMethod.POST)
	public void savewithmid(@RequestBody String json){

		service.savewithmid(json);
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public void save(@RequestBody String c1){

		JSONArray        versionArray = new JSONArray(c1);
		CCuttoolAssembly c            = new CCuttoolAssembly();
		for (int i = 0; i < versionArray.length(); i++){

			//c.setAssembly(i);
			c.setCuttoolNo(versionArray.getJSONObject(i).get("cuttoolNo").toString());
			c.setOrderNo(Integer.parseInt(versionArray.getJSONObject(i).get("orderNo").toString()));
			c.setUnit(versionArray.getJSONObject(i).get("unit").toString());
			c.setNumber(Integer.parseInt(versionArray.getJSONObject(i).get("number").toString()));
			c.setChipCutting(Integer.parseInt(versionArray.getJSONObject(i).get("chipCutting").toString()));
			//c.setDate((Timestamp) new Date());
			c.setEasyConsume(Integer.parseInt(versionArray.getJSONObject(i).get("easyConsume").toString()));
			c.setEncodingBody(Integer.parseInt(versionArray.getJSONObject(i).get("encodingBody").toString()));
			c.setMaterialVersion(versionArray.getJSONObject(i).get("brand").toString());
			service.save(c);
		}
	}

	@RequestMapping(value = "/searchBycno", method = RequestMethod.GET)
	public List<CAssemblyModel> searchBycno(@RequestParam("cuttoolNo") String cuttoolNo){

		return service.searchBycno(cuttoolNo);
	}
}
