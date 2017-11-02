package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by SunJun on 2016/4/26.
 */
@RestController
@ResponseBody
@RequestMapping("/purchaseOrder")
public class PurchaseOrder{

	@Autowired
	IPurchaseOrderService service;

	/**
	 * 保存采购订单
	 *
	 * @param request
	 * 		上传的数据
	 *
	 * @return 返回保存结果
	 */
	@RequestMapping(value = "/saveOrder", method = RequestMethod.POST)
	String saveOrder(@RequestBody String request){

		return service.saveOrder(request);
	}

	/**
	 * 采购订单题头汇总
	 *
	 * @param request
	 * 		上传数据请求头
	 *
	 * @return
	 */
	@RequestMapping(value = "/orderHeadSummary", method = RequestMethod.POST)
	Object orderHeadSummary(@RequestBody String request){

		return service.orderHeadSummary(request);
	}

	/**
	 * 采购订单行汇总
	 *
	 * @param request
	 * 		上传请求头
	 *
	 * @return
	 */
	@RequestMapping(value = "/orderRowSummary", method = RequestMethod.POST)
	Object orderRowSummary(@RequestBody String request){

		return service.orderRowSummary(request);
	}

	/**
	 * 根据订单号获取订单行
	 *
	 * @param orderNo
	 * 		订单号
	 *
	 * @return
	 */
	@RequestMapping(value = "/getOrderRowByOrderNo", method = RequestMethod.POST)
	Object getOrderRowByOrderNo(@RequestParam("orderNo") String orderNo){

		return service.getOrderRowByOrderNo(orderNo);
	}

	/**
	 * 根据订单号获取整个订单信息
	 *
	 * @param orderNo 订单号
	 *
	 * @return
	 */
	@RequestMapping(value = "/getOrderByOrderNo", method = RequestMethod.POST)
	Object getOrderByOrderNo(@RequestParam("orderNo") String orderNo){

		return service.getOrderByOrderNo(orderNo);
	}
}
