package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.CAssemblyModel;
import com.smtcl.machinetool.models.machinetool.CCuttoolAssembly;

import java.util.*;

/**
 * Created by CJS on 2016/2/22.
 * TODO 刀具装配Service
 */
public interface ICuttoolAssemblyService{

	void save(CCuttoolAssembly cuttoolAssembly);

	void savewithmid(String json);

	List<CAssemblyModel> searchBycno(String cuttoolNo);
}
