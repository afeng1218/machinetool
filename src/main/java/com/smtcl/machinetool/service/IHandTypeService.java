package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.CCharacteristicDescription;
import com.smtcl.machinetool.models.machinetool.CHandType;

import java.util.*;

/**
 * Created by CJS on 2016/2/19.
 */
public interface IHandTypeService{

	/**
	 * handType
	 *
	 * @return 查询结果
	 */
	List<CHandType> getList();

	List<CCharacteristicDescription> getCharacterList();
}
