package com.smtcl.machinetool.service;

import java.util.List;

/**
 * Created by CJS on 2016/7/4.
 */

public interface IBorrowerService{

	String searchByBno(String employeeCardNo);

	String updateBorrower(String uploadJson);

	String saveBorrower(String uploadJson);

	List blurSearch(String json);

}
