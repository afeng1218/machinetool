package com.smtcl.machinetool.service;

import com.smtcl.machinetool.models.machinetool.CCuttoolBasedata;
import org.springframework.transaction.annotation.*;
import org.springframework.web.multipart.*;

import javax.servlet.http.*;
import java.util.*;

/**
 * Created by GuoFeng on 2016/2/19. TODO 刀具定义
 * Changed by GuoFeng on 2016/8/8 TODO 添加对刀仪和发送西门子接口模块
 */
public interface ICuttoolDefinitionService{

	/**
	 * 刀具信息保存
	 *
	 * @param c1
	 * 		刀具上传数据
	 */
	String save(CCuttoolBasedata c1);

	/**
	 * 刀具模糊查询
	 *
	 * @param jsonarr
	 * 		上传查询信息
	 *
	 * @return 查询结果
	 */
	List<CCuttoolBasedata> blursearch(String jsonarr);

	/**
	 * 查询所有刀具
	 *
	 * @return 刀具查询结果
	 */
	List<CCuttoolBasedata> getList();

	/**
	 * 图片上传
	 *
	 * @param name
	 * 		图片名称
	 * @param file
	 * 		图片文件数据
	 *
	 * @return 上传反馈结果（success|false）
	 */
	String upload(String name, MultipartFile file);

	/**
	 * 通过编号查询刀具信息
	 *
	 * @param cuttoolNo
	 * 		刀具编号
	 *
	 * @return 刀具查询结果
	 */
	List searchbyno(String cuttoolNo);

	/**
	 * 启用刀具
	 * @param cno
	 * @param croom
	 * @param cplace
	 * @return
	 */
	@Transactional
	String enableCuttool(String cno, String croom, String cplace);

	String searchByCno(String cno);

	String getPicName(String cuttoolNo);

	String saveCPar(String uploadValue);

	String upadtePar(String uploadValue);

	List searchCParBycno(String cuttoolNo, int type);

	/**
	 * Created by GuoFeng on 2016/7/20
	 * 获取对刀仪状态
	 *
	 * @return
	 */
	Object getMicrosetState();

	/**
	 * Created by GuoFeng on 2016/7/20
	 * 获取对刀仪数据
	 *
	 * @param path
	 *
	 * @return
	 */
	Object getMicroset(String path);

	/**
	 * Created by GuoFeng on 2016/7/20
	 * 发送西门子
	 * @param json
	 * @return
	 */
	String sendState(String json);

	/**
	 * Created by GuoFeng on 2016/8/9
	 * 保存所有刀具信息
	 * @param request
	 * @return
	 */
	@Transactional
	Object saveAllCuttoolMsg(String request);

	/**
	 * name:guofeng 2016-09-22
	 * 删除刀具
	 * @param cuttoll_no
	 * @return
	 */
	String deleteCuttool(String cuttoll_no);

	/**
	 * 删除二维码图片
	 * @param data
	 */
	void removeImages(String id);
}
