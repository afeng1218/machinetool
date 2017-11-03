package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/4/18.
 */
@RestController
@ResponseBody
@RequestMapping("/commonSearchPage")
public class CommonSearchPage{

	@Autowired
	ICommonSearchPageService service;

	/**
	 * 通用查询
	 *
	 * @param condition
	 * 		查询条件
	 *
	 * @return 返回数据
	 */
	@RequestMapping(value = "/commonSearch", method = RequestMethod.POST)
	public List commonStorageSearch(@RequestBody String condition){

		return service.commonSearch(condition);
	}
}
