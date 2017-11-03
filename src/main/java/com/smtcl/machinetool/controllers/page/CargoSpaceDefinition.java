package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/4/19.
 */
@RestController
@ResponseBody
@RequestMapping("/cargoSpaceDefinition")
public class CargoSpaceDefinition{

	@Autowired
	ICargoSpaceDefinition service;

	/**
	 *
	 * @param RoomNo
	 * 按库房号查询库位
	 *
	 * @return
     */
	@RequestMapping(value = "/searchByRoomNo", method = RequestMethod.GET)
	public List getPlace(@RequestParam("RoomNo") String RoomNo){
		return service.getPlace(RoomNo);
	}
}
