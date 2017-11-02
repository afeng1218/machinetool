package com.smtcl.machinetool.service;

import org.springframework.web.multipart.*;

import javax.servlet.http.*;

/**
 * Created by guofeng 2017/9/19.
 */
public interface ICprocessProcedureService{
	String save(String data, HttpServletRequest request);
	String upload(String name, MultipartFile file, String id);
	String select(String id);
	boolean removeImages(String map);
	boolean remove(String map);
	boolean approve(String id, HttpServletRequest request);
}
