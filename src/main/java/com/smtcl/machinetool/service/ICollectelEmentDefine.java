package com.smtcl.machinetool.service;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2017/11/9.
 */
public interface ICollectelEmentDefine{
	String save(String map, HttpServletRequest request);
	List selectTitle(String newTime, String endTime);
	String selectRow(String id);
}
