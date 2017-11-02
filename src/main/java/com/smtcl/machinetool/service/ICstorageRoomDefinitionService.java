package com.smtcl.machinetool.service;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by guofeng on 2017/9/30.
 */
public interface ICstorageRoomDefinitionService{
	String save(String cp, HttpServletRequest request);
	String cancel(String id);
	String generate(String map);
	List selectList(String id);
	List selectMateriel(String id);
	String saveInput(String map);
	String saveData(String map);
	String startUp(String map, HttpServletRequest request);
	String cancelInventory(String map);
}
