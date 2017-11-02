package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by CJS on 2016/4/19.
 */
@Service
public class CargoSpaceDefinitionService implements ICargoSpaceDefinition{

	@Autowired
	IGenericDAO dao;

	@Override
	public List getPlace(String RoomNo){

		String hql = "from CCargoSpaceDefinition cc where cc.CStorageRoomDefinition.storageRoomNo='" + RoomNo + "'";
		//		System.out.println(hql);
		List<CCargoSpaceDefinition> list = new ArrayList<CCargoSpaceDefinition>();
		list = dao.executeQuery(hql);
		if (list.size() > 0 && list != null){
			return list;
		} else{
			return null;
		}
	}
}