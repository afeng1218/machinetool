package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.*;
import org.springframework.web.multipart.*;

import java.util.*;

/**
 * Created by guofeng on 2016/5/30.
 */
public interface ICategorySettingsService{

	/**
	 * 数据保存
	 * @param map
	 * @return 保存反馈结果（success|false）
	 */
	String save(String map);

	/**
	 * 图片上传
	 * @param name 图片名称
	 * @param file 图片文件数据
	 * @param id   唯一标识
	 * @return 上传反馈结果（success|false）
	 */
	String upload(String name, MultipartFile file,String id);

	/**
	 * 删除图片
	 * @param id
	 * @return
	 */
	String removeImages(String id);
}
