package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.CCharacteristicDescription;
import com.smtcl.machinetool.models.machinetool.CHandType;
import com.smtcl.machinetool.service.IHandTypeService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/1/27.
 */
@RestController
@ResponseBody
@RequestMapping("/handtype")
public class HandType{

	@Autowired
	IHandTypeService service;

	@RequestMapping("/getList")
	public List<CHandType> getList(){

		return service.getList();
	}

	@RequestMapping("/getCharacterList")
	public List<CCharacteristicDescription> getCharacterList(){

		return service.getCharacterList();
	}
}
