package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

import javax.servlet.http.*;
import java.io.*;
import java.net.*;
import java.sql.*;
import java.text.*;
import java.util.*;
import java.util.Date;

/**
 * Created by guofeng on 2016/7/5.
 */
@Service
public class FaliaoService implements IFaliaoService{

	@Autowired
	IGenericDAO dao;
	@Autowired
	IUtilService utilService;

	/**
	 * 立体库文件路径
	 */
	@Value("${send.stereoLibrary.pickorder}")
	private String SEND_STEREOLIBRARY_PICKORDER;

	//获取刀具行
	@Override
	public String selectRow(String cuttool_no){
		try{
			String sql = "select c.material_no,c.material_describe,b.unit,a.using_status,e.available_quantity ,b.material_version,b" +
					".material_id,b.number " +
					"from " +
					"c_cuttool_basedata a " +
					"LEFT JOIN c_cuttool_assembly b on b.cuttool_no = a.cuttool_no " +
					"LEFT JOIN c_general_material c on c.material_id = b.material_id " +
					"LEFT JOIN c_stock_list e on c.material_id = e.material_id where " +
					"a.cuttool_no = '"+cuttool_no+"'";//and b.easy_consume = '1'";
			List list = dao.createSQLQuery(sql);
			System.out.println(new JSONArray(list).toString());
			return new JSONArray(list).toString();
		}catch (Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}

	/**
	 * 发料-保存
	 * @param data
	 * @return
	 */
	@Override
	@Transactional
	public String saveData(String data, HttpServletRequest request){
		//返回参数
		JSONObject result = new JSONObject();
		try{
			JSONArray map = new JSONArray(data);//String data 转换为JSONArray
			//题头
			JSONObject head = map.getJSONObject(0).getJSONArray("head").getJSONObject(0);
			//行
			JSONArray row = map.getJSONObject(0).getJSONArray("row");
			//文件名-立体库
			String fileName  = map.getJSONObject(0).getString("fileName");
			System.out.println("data="+data);
			//判断此物料是否可发
			for (int i = 0; i < row.length(); i++){
				JSONObject rowData = row.getJSONObject(i);//行数据
				String huowei = rowData.getString("huowei"); //货位查询条件
				if(!huowei.equals("")){
					huowei = " AND c.goods_allocation_no = '" + huowei + "'";
				}
				String pinpai = rowData.getString("pinpai"); //品牌查询条件
				if(!pinpai.equals("")){
					pinpai = " AND c.version_exception = '"+pinpai+"'";
				}
				String sql = "SELECT a.stock_id,b.storage_room_no,a.material_id,a.available_quantity,c.goods_allocation_no " +
						" FROM c_stock_list a " +
						" LEFT JOIN c_storage_room_definition b ON a.stock_id = b.storage_room_id " +
						" LEFT JOIN c_stock_detail_list c ON b.storage_room_id = c.stock_id  AND c.material_id = a.material_id" +
						" WHERE b.storage_room_no = '"+head.getString("kufang")+"' AND a.material_id = '"+rowData.getInt("wuliao")+"' " + huowei + pinpai;
				List list = dao.createSQLQuery(sql);
				//如果此物料不存在该库房则不允许保存
				if(list.size() == 0){
					//货位为空时
					if(!huowei.equals("")){
						result.append("result","0");
						//品牌为空时
					}else if(!pinpai.equals("")){
						result.append("result","1");
						//库房没有此物料
					}else{
						result.append("result","2");
					}
					result.append("wuliao",rowData.getString("wuliao_name"));
					result.append("row",i + 1);
					return result.toString();
				}
			}
			/*****************************************立体库对接********************************************/
//			File path = new File(SEND_STEREOLIBRARY_PICKORDER);
//			//判断立体库共享文件夹是否存在
//			if (path.exists()){
//				File[] listFiles = path.listFiles();
//				//判断立体库文件夹是否存在,如果存在则提示繁忙
//				for (File f : listFiles){
//					if (f.getName().equals(fileName)){
//						result.append("result", "3");   //立体库繁忙
//						return result.toString();
//					}
//				}
//				if (fileName.equals("orderpick.txt") || fileName.equals("orderput.txt")
//						||fileName.equals("orderpick.err")|| fileName.equals("orderput.err")){
//					for (File f : listFiles){
//						if (f.getName().equals(fileName)){
//							result.append("result", "3");   //立体库繁忙
//							return result.toString();
//						}
//					}
//				}
//			}else{
//				result.append("result", "4");   //立体库共享文件夹不存在
//				return result.toString();
//			}
			/*****************************************立体库对接 end ********************************************/
			//发料题头
			CIssueTitle cissueTitle = new CIssueTitle();
			//物料行数据
			CCuttoolConsumption ccuttoolConsumption = new CCuttoolConsumption();
			//物料事物处理
			CMaterialAffairsHandle cmaterialaffairshandle = new CMaterialAffairsHandle();
			//题头是否有数据
			if(head.length() > 0){
				/*****************************发料题头表*******************************/
				cissueTitle.setPickPerson(head.getString("lingliaoren"));//领料人
				if (!head.getString("shiyongshebei").equals("")){
					cissueTitle.setUsingEquipmentId(head.getInt("shiyongshebei_id"));//使用设备
				};
				cissueTitle.setUsingCuttool(head.getString("fadaodaoju"));//使用刀具
				cissueTitle.setStorageRoomId(head.getInt("kufang"));//库房
				cissueTitle.setRemarks(head.getString("beizhu"));//备注
				cissueTitle.setIsRelatedCuttool(head.getInt("guanliandaoju"));//关联刀具
				if(head.getString("faliaohao").equals("")){
					cissueTitle.setIssueNo("F"+utilService.getSerialString("CIssueTitle", "issueNo", "issueNo", ""));//发料号
					System.out.println(1);
					dao.add(cissueTitle); //添加刀具题头
				}else{//修改备注
					cissueTitle.setIssueNo(head.getString("faliaohao"));//发料号
					String sql = "update c_issue_title set remarks='"+head.getString("beizhu")+"' where issue_no='"+head.getString("faliaohao")+"'";
					System.out.println("sql="+sql);
					dao.sqlUpdate(sql);
					System.out.println(1.5);
				}
				/*****************************发料题头表 end *******************************/
			}
			//物料行
			if(row.length() > 0){
				/********************************道具消耗表***********************************/
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  //设置日期格式
				//生成立体库文件的定义
//				File   file = new File(SEND_STEREOLIBRARY_PICKORDER + "/" + fileName);
//				Writer writer    = new FileWriter(file);
//				BufferedWriter bf = new BufferedWriter(writer);
				try{
					for (int i = 0, k = 1; i < row.length(); i++, k++){
						//行数据
						JSONObject rowData = row.getJSONObject(i);
						ccuttoolConsumption.setMaterialId(rowData.getInt("wuliao"));//物料ID
						ccuttoolConsumption.setNumber(Float.parseFloat(rowData.getString("fafangshuliang")));//数量
						ccuttoolConsumption.setReason(cissueTitle.getRemarks());//原因
						//ccuttoolConsumption.setSource(cissueTitle.getUsingCuttool());//来源&刀具号
						ccuttoolConsumption.setSource(cissueTitle.getIssueNo());//来源&发料号
						ccuttoolConsumption.setType("发料");
						ccuttoolConsumption.setSourceRow(k+""); //来源行
						ccuttoolConsumption.setPerson(head.getString("lingliaoren"));//人员
						ccuttoolConsumption.setCreatePerson(request.getSession().getAttribute("USER_NAME").toString());//创建者
						ccuttoolConsumption.setCreateTime(Timestamp.valueOf(df.format(new Date())));//创建时间
						ccuttoolConsumption.setStorageRoomId(head.getInt("kufang_val"));//库房
						if (!rowData.getString("huowei_id").equals("")){
							ccuttoolConsumption.setGoodsAllocationId(rowData.getInt("huowei_id"));//货位
						}
						if (!head.getString("shiyongshebei").equals("")){
							ccuttoolConsumption.setEquipmentId(head.getInt("shiyongshebei_id"));//使用设备
						}

						/*********************寿命计算**************************/
						if(!head.getString("fadaodaoju").equals("")){//选择发到刀具才会计算寿命

							//首先按着刀具编号与发料的物料从消耗表里读取上次计算时间到当前时间的数量和
							String sql ="SELECT SUM(a.number) as sum_nuber,a.amount_processing_time FROM (" +
									"SELECT DISTINCT a.using_cuttool, b.number,c.amount_processing_time FROM c_issue_title a " +
									"LEFT JOIN c_cuttool_consumption b ON b.source = a.using_cuttool " +
									"LEFT JOIN c_cuttool_basedata c ON c.cuttool_no = a.using_cuttool " +
									"WHERE a.using_cuttool = '"+ccuttoolConsumption.getSource()+"' and b.material_id = '"+ccuttoolConsumption.getMaterialId()+"') a";
							List list = dao.createSQL(sql);

							if(list.size() > 0 && list != null){
								System.out.println("list="+list);
								int sum_nuber = 0;

								System.out.println("aaaa==="+((HashMap)list.get(0)).get("sum_nuber"));
								//System.out.println(list.get(10));

							}
						}
						/*********************寿命计算 end **************************/

						System.out.println(2);
						dao.add(ccuttoolConsumption); //添加刀具消耗
						/********************************道具消耗表 end ***********************************/

						//从库存里面减去相应的报废数量
						int shengyushuliang = rowData.getInt("keyongshuliang") - rowData.getInt("fafangshuliang");
						/********************************库存表************************************/
						String huowei = rowData.getString("huowei"); //货位查询条件
						String pinpai = rowData.getString("pinpai"); //品牌查询条件
						if (!huowei.equals("")){
							huowei = " AND c.goods_allocation_no = '" + huowei + "'";
						}
						if(!pinpai.equals("")){
							pinpai = " AND c.version_exception = '" + pinpai + "'";
						}
						String sql = "UPDATE c_stock_list a " +
								" LEFT JOIN c_storage_room_definition b ON a.stock_id = b.storage_room_id " +
								" LEFT JOIN c_stock_detail_list c ON b.storage_room_id = c.stock_id  SET a.available_quantity='" + shengyushuliang
								+ "',c.available_quantity='" + shengyushuliang + "' WHERE b.storage_room_no = '" + head.getString("kufang") + "' " +
								" AND a.material_id = '" + ccuttoolConsumption.getMaterialId()
								+ "'" + huowei + pinpai;
						System.out.println(3);
						dao.sqlUpdate(sql);   //修改库存
						/********************************库存表 end ************************************/

						/****************************物料事物处理表的操作***********************************/
						cmaterialaffairshandle.setTransactionManagerNo(utilService.getSerialNumber("CMaterialAffairsHandle", "transactionManagerNo", "transactionManagerNo", ""));//事务处理号
						cmaterialaffairshandle.setSourceType("库房发料");   //来源类型
						cmaterialaffairshandle.setTransactionManagerActivity(cissueTitle.getPickPerson()/*领料人*/);//事务处理单位
						cmaterialaffairshandle.setTransactionManagerCompany(rowData.getString("danwei"));//事物处理单位
						cmaterialaffairshandle.setTotalTransactionManager(ccuttoolConsumption.getNumber());//事物处理数量
						//库房实体类
						CStorageRoomDefinition cstorageRoomDefinition = new CStorageRoomDefinition();
						cstorageRoomDefinition.setStorageRoomId(ccuttoolConsumption.getStorageRoomId());
						cmaterialaffairshandle.setCStorageRoomDefinition(cstorageRoomDefinition);   //事务处理库房ID
						//物料实体类
						CGeneralMaterial cgeneralMaterial = new CGeneralMaterial();
						cgeneralMaterial.setMaterialId(ccuttoolConsumption.getMaterialId());
						cmaterialaffairshandle.setCGeneralMaterial(cgeneralMaterial);   //事务处理物料ID
						//cmaterialaffairshandle.setSource(cissueTitle.getIssueNo() + "-" + k); //来源
						cmaterialaffairshandle.setSource(cissueTitle.getUsingCuttool()); //来源(刀具编号)
						cmaterialaffairshandle.setTransactionManagerType("杂发出库");//事物处理类型
						cmaterialaffairshandle.setCreatePerson(ccuttoolConsumption.getCreatePerson());//创建者
						cmaterialaffairshandle.setCreateTime(ccuttoolConsumption.getCreateTime());//创建时间
						cmaterialaffairshandle.setStamp("否");//是否打印
						System.out.println(4);
						dao.add(cmaterialaffairshandle);   //事务处理表操作
						/****************************物料事物处理表的操作 end ***********************************/
						//立体库对接文件填充内容

						//自由模式发料
//						if(cissueTitle.getUsingCuttool().equals("")){
//							//发料号；物料编码；数量
//							bf.write(cissueTitle.getIssueNo() + ";" + rowData.getString("wuliao_name") + ";" + rowData.getString("fafangshuliang"));
//							bf.newLine();
//						}
					}
//					//整体刀具发料
//					if(!cissueTitle.getUsingCuttool().equals("")){
//						//发料号；刀具编号；数量
//						bf.write(cissueTitle.getIssueNo() + ";" + cissueTitle.getUsingCuttool() + ";1");
//						bf.newLine();
//					}
//					bf.flush();
//					bf.close();
					//立体库对接文件填充内容 end
				}catch (Exception e){
					result.append("result","5");    //发料失败，未知的错误
					e.printStackTrace();
//					bf.close();
//					file.delete();
					TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
					System.out.println(e.getMessage());
					return result.toString();
				}
			}
			result.append("result","6");    //发料成功
			result.append("cissueTitle",cissueTitle.getIssueNo());//单号
			return result.toString();
		}catch (Exception e){
			result.append("result","5");    //发料失败，未知的错误
			e.printStackTrace();
			System.out.println(e.getMessage());
			return result.toString();
		}
	}
}