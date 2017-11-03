package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.ICuttoolBorrowService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GuoFeng on 2016/4/21.
 * Changed by GuoFeng on 2016/8/11
 */
@RestController
@ResponseBody
@RequestMapping("/cuttoolBorrow")
public class CuttoolBorrow{

	@Autowired
	ICuttoolBorrowService service;

	@RequestMapping(value = "/setTaskNo", method = RequestMethod.POST)
	String setTaskNo(@RequestBody String uploadJson){

		return service.setTaskNo(uploadJson);
	}

	@RequestMapping(value = "/saveBorrowMsg", method = RequestMethod.POST)
	String saveBorrowMsg(@RequestBody String uploadValue){

		return service.saveBorrowMsg(uploadValue);
	}

	@RequestMapping(value = "/saveReturnMsg", method = RequestMethod.POST)
	String saveReturnMsg(@RequestBody String uploadValue){

		return service.saveReturnMsg(uploadValue);
	}

	@RequestMapping(value = "/getHeadOrRow", method = RequestMethod.POST)
	List getHeadOrRow(@RequestBody String requestBody){

		return service.getHeadOrRow(requestBody);
	}

	/**
	 * 通过借用号或者刀具编号获取刀具借用行信息
	 * @param requestBody
	 * @return
	 */
	@RequestMapping(value = "/getRowByBorrowNoOrCuttoolNo", method = RequestMethod.POST)
	List getRowByBorrowNo(@RequestBody String requestBody){

		return service.getRowByBorrowNo(requestBody);
	}

	/**
	 * Created by GuoFeng on 2016/8/11
	 * 刀具是否可以借用判断查询
	 *
	 * @param cuttoolNo 刀具编号
	 *
	 * @return
	 */
	@RequestMapping(value = "/canBorrowOrNot", method = RequestMethod.GET)
	Object canBorrowOrNot(@RequestParam String cuttoolNo){

		return service.canBorrowOrNot(cuttoolNo);
	}

}
