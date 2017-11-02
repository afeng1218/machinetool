package com.smtcl.machinetool.service;

import org.json.*;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2016/4/15.
 * 供应商维护
 */
public interface ISupplierMaintenance{

	/**
	 * 供应商保存
	 * @param json
	 * @param request
	 * @return
	 */
	String saveSupplierMaintenance(String json,HttpServletRequest request);
}
