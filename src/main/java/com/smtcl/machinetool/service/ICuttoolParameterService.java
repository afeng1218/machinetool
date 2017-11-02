package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.CuttoolParModel;

import java.util.List;

/**
 * Created by CJS on 2016/2/23.
 * TODO 刀具参数Service
 */
public interface ICuttoolParameterService{

	/**
	 * 刀具参数信息保存
	 *
	 * @param scp
	 * 		上传参数信息
	 */
	void cParsSave(String scp);

	List<CuttoolParModel> searchCPar(String cuttoolNo);
}
