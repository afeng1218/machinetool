package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.CMaterialParameter;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/1/18. TODO 物料定义 物料维护 版本定义 版本维护
 */
@RestController
@ResponseBody
@RequestMapping("/materialDefinition")
public class MaterialDefinition{

	/**
	 * 物料定义service接口
	 */
	@Autowired
	private IMaterialDefinitionService service;

	/**
	 * 获取物料初始化参数
	 * @return
	 */
	@RequestMapping(value = "/initPar", method = RequestMethod.GET)
	public List getInitPar(){

		return service.getInitPar();
	}

	/**
	 * 判断物料编号是否存在
	 * @param noValue 物料编号
	 * @return
	 */
	@RequestMapping(value = "/materialNoSearch", method = RequestMethod.GET)
	public int materialNoSearch(@RequestParam("noValue") String noValue){

		System.out.print(noValue);
		return service.materialNoSearch(noValue);
	}

	/**
	 * 物料版本查询
	 * @param materialId 物料id
	 * @return
	 */
	@RequestMapping(value = "/versionSearch", method = RequestMethod.GET)
	public List versionSearch(@RequestParam("materialId") String materialId){

		System.out.print(materialId);
		return service.versionSearch(materialId);
	}

	/**
	 * 物料查询
	 * @param searchValue 查询的value值
	 * @return
	 */
	@RequestMapping(value = "/materialSearch", method = RequestMethod.GET)
	public List materialSearch(@RequestParam("searchValue") String searchValue){

		return service.materialSearch(searchValue);
	}

	/**
	 * 物料编辑信息获取
	 * @param materialNo
	 * @return
	 */
	@RequestMapping(value = "/materialEdit", method = RequestMethod.GET)
	public List materialEdit(@RequestParam("materialNo") String materialNo){

		return service.materialEdit(materialNo);

	}

	/**
	 * 物料类别选择数据带出接口
	 * @param materialClass 物料类别
	 * @return
	 */
	@RequestMapping(value = "/modelClassChoose", method = RequestMethod.GET)
	public List modelClassChoose(@RequestParam("materialClass") String materialClass){

		return service.modelClassChoose(materialClass);
	}

	/**
	 * 物料定时数据上传
	 * @param materialDefinition 上传信息的请求体
	 * @return
	 */
	@RequestMapping(value = "/materialDefinitionUpload", method = RequestMethod.POST)
	public Object materialDefinitionUpload(@RequestBody String materialDefinition){

		return service.materialDefinitionUpload(materialDefinition);
	}

	/**
	 * 图片上传
	 * @param name 图片名称
	 * @param pic 图片数据
	 * @param materialNo 物料编号
	 * @param materialClass 物料类被别
	 * @return
	 */
	@RequestMapping(value = "/materialParPicUpload", method = RequestMethod.POST)
	public Integer materialParPicUpload(@RequestParam("name") String name, @RequestParam("materialParPic") MultipartFile pic,
	                                    @RequestParam("materialNo") String materialNo, @RequestParam("materialClass") String materialClass){

		return service.materialParPicUpload(name, pic, materialNo, materialClass);
	}

	/**
	 * 根据无力编号查询物料信息
	 * @param materialNo 物料编号
	 * @return
	 */
	@RequestMapping(value = "/parsByMno", method = RequestMethod.GET)
	public List materialPars(@RequestParam String materialNo){

		List<CMaterialParameter> materialParameters = service.materialPars(materialNo);
		List                     list               = new ArrayList();
		for (int i = 0; i < materialParameters.size(); i++){
			Map<String, Object> parsmap  = new HashMap<String, Object>();
			String              mtype    = "";
			String              picname  = "";
			String              parname  = "";
			String              parvalue = "";
			//mtype = materialParameters.get(0).getCGeneralMaterial().getCParameterModel().getCategory();
			//picname = materialParameters.get(0).getCGeneralMaterial().getMaterialType();
			parname = materialParameters.get(i).getId().getParameterName();
			parvalue = materialParameters.get(i).getParameterValue();
			System.out.print(parname + "：" + parvalue);
			parsmap.put("mtype", mtype);
			parsmap.put("parname", parname);
			parsmap.put("parvalue", parvalue);
			list.add(parsmap);
		}
		return list;
	}

	/**
	 * 无力啊批次查询
	 * @param searchValue 查询value值
	 * @return
	 */
	@RequestMapping(value = "/batchSearch", method = RequestMethod.GET)
	public List batchSearch(@RequestParam("searchValue") String searchValue){

		return service.batchSearch(searchValue);
	}

	/**
	 * 物料序列查询
	 * @param searchValue 查询value值
	 * @return
	 */
	@RequestMapping(value = "/sequenceSearch", method = RequestMethod.GET)
	public List sequenceSearch(@RequestParam("searchValue") String searchValue){

		return service.sequenceSearch(searchValue);
	}

	/**
	 * 物料删除
	 *
	 * @param materialNo
	 * 		物料编号
	 *
	 * @return 删除返回结果
	 */
	@RequestMapping(value = "/materialDelete", method = RequestMethod.GET)
	public Object materialDelete(@RequestParam("materialNo") String materialNo){

		return service.materialDelete(materialNo);

	}

}
