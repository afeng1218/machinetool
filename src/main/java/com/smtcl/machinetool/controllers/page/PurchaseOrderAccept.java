package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by SunJun on 2016/5/18.
 */
@RestController
@ResponseBody
@RequestMapping("/purchaseOrderAccept")
public class PurchaseOrderAccept{

	/**
	 * 采购订单接受server接口
	 */
	@Autowired
	IPurchaseOrderAcceptService service;

	/**
	 * 获取所有已审批的订单行
	 *
	 * @param searchVal
	 *
	 * @return
	 */
	@RequestMapping(value = "/getOrderRow", method = RequestMethod.POST)
	public Object getOrderRow(@RequestBody String searchVal){

		return service.getOrderRow(searchVal);
	}

	/**
	 * 保存订单接受数量
	 *
	 * @param saveVal
	 * 		上传数据
	 *
	 * @return 返回保存结果
	 */
	@RequestMapping(value = "/orderAcceptSave", method = RequestMethod.POST)
	public Object orderAcceptSave(@RequestBody String saveVal){

		return service.orderAcceptSave(saveVal);
	}

}
