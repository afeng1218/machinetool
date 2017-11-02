package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.*;
import java.util.*;

/**
 * 采购协议
 * <p>
 * Created by guofeng on 2016/4/20.
 */

@RestController
@ResponseBody
@RequestMapping("/purchaseAgreement")
public class PurchaseAgreement{

	@Autowired
	private IPurchaseAgreement service;

	/**
	 * 采购协议保存
	 *
	 * @param json
	 * @param request
	 *
	 * @return
	 */
	@RequestMapping(value = "/savePurchaseAgreement", method = RequestMethod.POST)
	public String savePurchaseAgreement(@RequestBody String json, HttpServletRequest request){

		return service.savePurchaseAgreement(json, request);
	}

	/**
	 * 查询采购协议行的物料是否已经存在协议中
	 *
	 * @param json
	 *
	 * @return
	 */
	@RequestMapping(value = "/selectPurchaseAgreement", method = RequestMethod.POST)
	public String selectPurchaseAgreement(@RequestBody String json){

		return service.selectPurchaseAgreement(json);
	}

	/**
	 * 删除协议行
	 *
	 * @param json
	 *
	 * @return
	 */
	@RequestMapping(value = "/deletePurchaseAgreement", method = RequestMethod.POST)
	public String deletePurchaseAgreement(@RequestBody String json){

		return service.deletePurchaseAgreement(json);
	}

	/**
	 * 协议审核
	 *
	 * @param json
	 *
	 * @return
	 */
	@RequestMapping(value = "/approvalPurchaseAgreement", method = RequestMethod.POST)
	public String approvalPurchaseAgreement(@RequestBody String json){

		return service.approvalPurchaseAgreement(json);
	}

	/**
	 * 协议汇总-head
	 *
	 * @param json
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAgreementSummaryHead", method = RequestMethod.POST)
	public String getAgreementSummaryHead(@RequestBody String json){

		return service.getAgreementSummaryHead(json);
	}

	/**
	 * 协议汇总-head-row
	 *
	 * @param order_code
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAgreementSummaryRow", method = RequestMethod.GET)
	public String getAgreementSummaryRow(@RequestParam("order_code") String order_code){

		return service.getAgreementSummaryRow(order_code);
	}

	/**
	 * 获取供应商物料的某个版本的协议价格
	 *
	 * @param supplierNo
	 * @param materialNo
	 * @param version
	 *
	 * @return
	 */
	@RequestMapping(value = "/getAgreementUnitPrice", method = RequestMethod.GET)
	public Object getAgreementUnitPrice(@RequestParam("supplierNo") String supplierNo,
	                                    @RequestParam("materialNo") String materialNo,
	                                    @RequestParam("version") String version){

		return service.getAgreementUnitPrice(supplierNo, materialNo, version);

	}

}