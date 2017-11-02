package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

import javax.servlet.http.*;
import java.text.*;
import java.util.*;

/**
 * Created by guofeng 2017/9/19
 */
@Service
public class CstorageRoomDefinitionService implements ICstorageRoomDefinitionService{

	//设置日期格式
	private SimpleDateFormat ymdhms =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Autowired
	IGenericDAO dao;

	/**
	 * 保存&&拍照
	 * @param data
	 * @param request
	 * @return
	 */
	@Override
	@Transactional
	public String save(String data, HttpServletRequest request){
		JSONObject result = new JSONObject();
		try{
			JSONObject obj=new JSONObject(data);data=null;
			//查询当前名称是否重复
			String sql="select a.* from c_inventory_head a " +
					"where a.id='"+obj.getString("Inventory_id")+"' or " +
					"a.Inventory_name='"+obj.getString("Inventory_name")+"'";
			List<HashMap> list=dao.createSQL(sql);sql=null;
			String snapshot_type="0";
			if(obj.getString("Inventory_id").equals("")){//add
				if(list!=null&&list.size()>0){list=null;return result.put("result","repeat").toString();};list=null;
				/**************************题头***************************/
				//是否直接拍照
				String title=obj.getBoolean("saveType")?"snapshot_date,":"";
				Object snapshot_date=obj.getBoolean("saveType")?"'"+obj.get("snapshot_date")+"',":"";
				//是否直接拍照end
				sql="insert into c_inventory_head(Inventory_name,Inventory_explain,Inventory_date,"+title+"Inventory_range," +
					"approval_control,number_just,number_negative,value_just,value_negative,dynamic_label,snapshot_type,new_date,new_user)"+
					"values('"+obj.getString("Inventory_name")+"'," +
					"'"+obj.getString("Inventory_explain")+"'," +
					"'"+obj.get("Inventory_date")+"'," +
					snapshot_date +
					"'"+obj.getString("Inventory_range")+"'," +
					"'"+obj.getString("approval_control")+"'," +
					""+(obj.getString("number_just").equals("")?null:obj.getString("number_just"))+"," +
					""+(obj.getString("number_negative").equals("")?null:obj.getString("number_negative"))+"," +
					""+(obj.getString("value_just").equals("")?null:obj.getString("value_just"))+"," +
					""+(obj.getString("value_negative").equals("")?null:obj.getString("value_negative"))+"," +
					""+obj.getString("dynamic_label")+"," +
					""+(obj.getBoolean("saveType")?1:0)+"," +
					"'"+ymdhms.format(new Date())+"'," +
					"'"+request.getSession().getAttribute("USER_NAME")+"')";
					title=null;snapshot_date=null;
				dao.sqlUpdate(sql);sql=null;//保存拍照&题头
				/**************************题头end***************************/
			}else{//update
				/******************************题头*****************************/
				//拍照
				String snapshot_date=obj.getBoolean("saveType")?"a.snapshot_date='"+ymdhms.format(new Date())+"',":"";
				snapshot_type=list.get(0).get("snapshot_type").toString().equals("1")?"1":(obj.getBoolean("saveType")?"1":"0");list=null;
				//拍照end
				sql="update c_inventory_head a set " +
					"a.Inventory_name='"+obj.getString("Inventory_name")+"',"+
					"a.Inventory_explain='"+obj.getString("Inventory_explain")+"',"+
					"a.Inventory_date='"+obj.getString("Inventory_date")+"',"+
					snapshot_date+ //拍照日期
					"a.Inventory_range='"+obj.getString("Inventory_range")+"',"+
					"a.approval_control='"+obj.getString("approval_control")+"',"+
					"a.number_just="+(obj.getString("number_just").equals("")?null:obj.getString("number_just"))+","+
					"a.number_negative="+(obj.getString("number_negative").equals("")?null:obj.getString("number_negative"))+","+
					"a.value_just="+(obj.getString("value_just").equals("")?null:obj.getString("value_just"))+","+
					"a.value_negative="+(obj.getString("value_negative").equals("")?null:obj.getString("value_negative"))+","+
					"a.dynamic_label="+obj.getString("dynamic_label")+","+
					"a.snapshot_type="+snapshot_type+","+//是否拍照
					"a.update_date='"+ymdhms.format(new Date())+"',"+
					"a.update_name='"+request.getSession().getAttribute("USER_NAME")+"' "+
					"where a.id='"+obj.getString("Inventory_id")+"'";
				dao.sqlUpdate(sql);sql=null;snapshot_date=null;
				/******************************题头end*****************************/
			};
			/**************************内容表****************************/
			sql="select a.* from c_inventory_head a " +
					"where a.id='"+obj.getString("Inventory_id")+"' or " +
					"a.Inventory_name='"+obj.getString("Inventory_name")+"'";
			List<HashMap> id=dao.createSQL(sql);sql=null;
			String Inventory_id=id.get(0).get("id").toString();id=null;
			//删除内容表
			sql="delete a.* from c_inventory_list as a where a.Inventory_id='"+obj.getString("Inventory_id")+"'";
			dao.sqlUpdate(sql);sql=null;
			//子库存
			if(!obj.getString("Inventory_range").equals("")){//只有子库存不为空的时候才操作内容表
				String[] Inventory_range=obj.getString("Inventory_range").split("\\|");
				String where="where 1=1";
				for(int i=0;i<Inventory_range.length;i++){
					where+=" or csrd.storage_room_no='"+Inventory_range[i]+"'";
				};Inventory_range=null;
				//获取物料基本信息
				sql="select cgm.material_no as materialNo物料编码,csl.available_quantity as availableQuantity拍照数量,"+
						" csrd.storage_room_no as storage_room_no子库存,"+
						" cgm.material_unit as material_unit单位,csdl.goods_allocation_no as cargoSpaceNo货位,"+
						" cgm.batch_control as batch_control批次,cgm.sequence_control as sequence_control序列,"+
						" cmv.material_version_no as material_version_no版本"+
						" from c_stock_list csl"+
						" left join c_general_material cgm  on csl.material_id=cgm.material_id"+
						" left join c_storage_room_definition csrd on csl.stock_id=csrd.storage_room_id"+
						" left join c_stock_detail_list csdl on csdl.material_id=cgm.material_id"+
						" left join c_material_version cmv on cgm.material_id=cmv.material_id "+where;
				List<HashMap> rangeList=dao.createSQL(sql);sql=null;where=null;
				for(int j=0,hq=1;j<rangeList.size();j++,hq++){//将物料基础信息保存到内容表
					//是否直接拍照
					String snapshot_number=snapshot_type.equals("1")?rangeList.get(j).get("availableQuantity拍照数量").toString():
							obj.getBoolean("saveType")?rangeList.get(j).get("availableQuantity拍照数量").toString():"0";
					String material_version_no=rangeList.get(j).get("material_version_no版本")==null?null:"'"+rangeList.get(j)
							.get("material_version_no版本").toString()+"'";
					String cargoSpaceNo=rangeList.get(j).get("cargoSpaceNo货位")==null?null:"'"+rangeList.get(j)
							.get("cargoSpaceNo货位").toString()+"'";
					//是否直接拍照 end
					sql="insert into c_inventory_list(Inventory_id,goods_sign,new_goods_sign,material_no,Inventory_version," +
							"snapshot_number,unit,son_stock,goods_position,batch,sequence)"+
							"values("+Inventory_id+",'"+hq+"','0'," +
							"'"+rangeList.get(j).get("materialNo物料编码")+"'," +
							""+material_version_no+"," +
							""+snapshot_number+"," +
							"'"+rangeList.get(j).get("material_unit单位")+"'," +
							"'"+rangeList.get(j).get("storage_room_no子库存")+"'," +
							""+cargoSpaceNo+"," +
							"'"+rangeList.get(j).get("batch_control批次")+"'," +
							"'"+rangeList.get(j).get("sequence_control序列")+"')";
					dao.sqlUpdate(sql);sql=null;snapshot_number=null;material_version_no=null;//保存内容
				};rangeList=null;
			};snapshot_type=null;
			/**************************内容表end****************************/
			obj=null;return result.put("result",Inventory_id).toString();
		}catch(Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
			return result.put("result","fail").toString();
		}
	}

	/**
	 * 取消货签
	 * @param id
	 * @return
	 */
	@Override
	@Transactional
	public String cancel(String id){
		try{
			if(!id.equals("")){
				String sql="update c_inventory_list as a set a.goods_sign=null where a.Inventory_id='"+id+"'";
				return dao.sqlUpdate(sql)+"";
			};
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		};
		return false+"";
	}

	/**
	 * 生成货签
	 * @param map
	 * @return
	 */
	@Transactional
	@Override
	public String generate(String map){
		JSONObject result = new JSONObject();
		try{
			JSONObject obj=new JSONObject(map);
			String id=obj.getString("Inventory_id");
			int a=obj.getInt("goods_sign");
			int b=obj.getInt("goods_sign_number");
			String sql="select a.* from c_inventory_list as a where a.Inventory_id='"+id+"'";
			List<HashMap> list=dao.createSQL(sql);sql=null;
			if(list!=null&&list.size()>0){
				if(list.get(0).get("goods_sign")!=null){list=null;return result.put("result","exist").toString();};
				for(int i=0,k=a;i<list.size();i++,k=k+b){
					sql="update c_inventory_list as a set a.goods_sign='"+k+"' " +
							"where a.Inventory_id='"+id+"' and " +
							"a.material_no='"+list.get(i).get("material_no")+"'";
					dao.sqlUpdate(sql);
				};
			};list=null;
			return result.put("result","success").toString();
		}catch (Exception e){
			e.printStackTrace();
		};
		return result.put("result","fail").toString();
	}

	/**
	 * 查询盘点内容
	 * @param id
	 * @return
	 */
	@Override
	public List selectList(String id){
		try{
			if(!id.equals("")){
				String sql="select a.*,b.material_describe from c_inventory_list as a,c_general_material as b " +
						"where a.Inventory_id='"+id+"' and a" +
						".material_no=b.material_no";id=null;
				return dao.createSQL(sql);
			};
		}catch (Exception e){
			e.printStackTrace();
		};
		return null;
	}

	/**
	 * 查询物料信息
	 * @param id
	 * @return
	 */
	@Override
	public List selectMateriel(String id){
		try{
			if(!id.equals("")){
				String sql="select cgm.material_no as materialNo物料编码,cgm.material_describe as materialDescribe说明," +
						" csl.available_quantity as availableQuantity拍照数量,csrd.storage_room_no as storage_room_no子库存," +
						" cgm.material_unit as material_unit单位,csdl.goods_allocation_no as cargoSpaceNo货位," +
						" cgm.batch_control as batch_control批次,cgm.sequence_control as sequence_control序列," +
						" cmv.material_version_no as material_version_no版本" +
						" from c_stock_list csl " +
						" left join c_general_material cgm on csl.material_id=cgm.material_id " +
						" left join c_storage_room_definition csrd on csl.stock_id=csrd.storage_room_id" +
						" left join c_stock_detail_list csdl on csdl.material_id=cgm.material_id " +
						" left join c_material_version cmv on cgm.material_id=cmv.material_id where cgm.material_no like'%"+id+"%' or " +
						" cgm.material_describe like'%"+id+"%'";id=null;
				return dao.createSQL(sql);
			};
		}catch (Exception e){
			e.printStackTrace();
		};
		return null;
	}

	/**
	 * 盘点录入
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String saveInput(String map){
		try{
			String sql="";
			System.out.println("map="+map);
			JSONArray array=new JSONArray(map);
			DecimalFormat df=new DecimalFormat("#0.0");
			for(int i=0;i<array.length();i++){
				JSONObject obj=array.getJSONObject(i);
				if(i==0){//删除旧数据
					sql="delete a.* from c_inventory_list as a where a.Inventory_id='"+obj.getString("Inventory_id")+"'";
					dao.sqlUpdate(sql);sql=null;
				};
				//数据重构
				String adjustment_number="";//调整数量
				String percentage="";//百分比
				if(!obj.getString("Inventory_number").equals("")){
					adjustment_number=(obj.getDouble("Inventory_number")-obj.getDouble("snapshot_number"))+"";
					percentage=df.format(Double.parseDouble(adjustment_number)/obj.getDouble("snapshot_number")*100);
				};
				sql="insert into c_inventory_list(Inventory_id,goods_sign,new_goods_sign," +
					"material_no,Inventory_version,snapshot_number,unit,Inventory_number," +
					"son_stock,goods_position,batch,sequence,adjustment_number,percentage,Inventory_user)"+
					"values("+obj.getString("Inventory_id")+"," +
					"'"+obj.getString("goods_sign")+"'," +
					"'"+obj.getString("new_goods_sign")+"'," +
					"'"+obj.getString("material_no")+"'," +
					"'"+obj.getString("Inventory_version")+"'," +
					""+obj.getString("snapshot_number")+"," +
					"'"+obj.getString("unit")+"'," +
					"'"+obj.getString("Inventory_number")+"'," +
					"'"+obj.getString("son_stock")+"'," +
					"'"+obj.getString("goods_position")+"'," +
					"'"+obj.getString("batch")+"'," +
					"'"+obj.getString("sequence")+"'," +
					"'"+adjustment_number+"'," +
					"'"+percentage+"'," +
					"'"+obj.getString("Inventory_user")+"')";
				dao.sqlUpdate(sql);sql=null;obj=null;
			};array=null;
			return true+"";
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}
		return null;
	}

	/**
	 * 审批保存
	 * @param map
	 * @return
	 */
	@Override
	@Transactional
	public String saveData(String map){
		try{
			String sql=null;
			JSONArray array=new JSONArray(map);
			for(int i=0;i<array.length();i++){
				JSONObject obj=array.getJSONObject(i);
				sql="update c_inventory_list as a " +
					"set a.approval_type='"+obj.getString("approval_type")+"'," +
					"a.approval_user='"+obj.getString("approval_user")+"' " +
					"where a.Inventory_id="+obj.getString("id")+" and " +
					"a.material_no='"+obj.getString("material_no")+"'";
				dao.sqlUpdate(sql);sql=null;
			};
			return true+"";
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}
		return null;
	}

	/**
	 * 启动调整
	 * @param map
	 * @param request
	 * @return
	 */
	@Override
	@Transactional
	public String startUp(String map, HttpServletRequest request){
		try{
			JSONObject obj=new JSONObject(map);
			//盘点题头表
			String id=obj.getString("id");
			String sql="update c_inventory_head as a set a.adjustment_type=1 where a.id="+id;
			dao.sqlUpdate(sql);sql=null;
			//事物处理表
			String name=obj.getString("name");
			sql="insert into c_material_affairs_handle(" +
					"transaction_manager_no,source_type,source," +
					"transaction_manager_type,transaction_manager_activity,create_person," +
					"create_time)values("+id+",'盘点调整','"+name+"','物理库存盘点调整','库存调整'," +
					"'"+request.getSession().getAttribute("USER_NAME")+"'," +
					"'"+ymdhms.format(new Date())+"')";
			dao.sqlUpdate(sql);sql=null;
			id=null;name=null;
			return true+"";
		}catch (Exception e){
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//回滚
		}
		return null;
	}

	/**
	 * 取消盘点
	 * @param map
	 * @return
	 */
	@Override
	public String cancelInventory(String map){
		try{

		}catch (Exception e){

		}
		return null;
	}
}