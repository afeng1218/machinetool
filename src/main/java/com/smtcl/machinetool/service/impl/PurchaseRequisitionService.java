package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.sql.*;
import java.text.*;
import java.util.*;
import java.util.Date;

/**
 * Created by GuoFeng on 2016/3/22.
 */
@Service
public class PurchaseRequisitionService implements IPurchaseRequisitionService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    IGenericDAO dao;

    @Autowired
    IUtilService utilService;

    @Override
    public List getSupplier() {

        String hql = "select new Map(csp.supplierCode as supplierCode,csp.supplier as supplier) from CSupplier csp";
        return dao.executeQuery(hql);
    }

    @Override
    public String getRequisitionNo() {

        JSONObject result = new JSONObject();
        Integer no = utilService.getSerialNumber("CApplicationHead", "applicationNo", "an", "");
        result.append("requisitionNo", no);
        return result.toString();
    }

    @Override
    public String saveRequisition(String uploadValue) {

        JSONObject result = new JSONObject();
        JSONArray jsonArray = new JSONArray(uploadValue);
        int isAdd = jsonArray.getJSONObject(0).getInt("isAdd");
        JSONObject requisitionValue = jsonArray.getJSONObject(1);
        JSONArray rowValue = jsonArray.getJSONObject(2).getJSONArray("rowValue");

        try {

			/*判断传过来的编号是空就是新建申请 自动生成编号 否则直接保存编号*/
            String no = requisitionValue.getString("no");

            /**
             * 如果是编辑申请并且申请行信息已经删除 删除这个申请的所有信息
             */
            if ((rowValue.length() == 0 || rowValue == null) && isAdd == 0) {

                dao.executeQuery("delete from CApplicationHead cah where cah.applicationNo='" + no + "'");
                dao.executeQuery("delete from CApplicationLine cal where cal.id.applicationNo='" + no + "'");

                result.append("result", "true");
                result.append("applicationNo", no);
                return result.toString();

            } else {

				/*开始添加题头数据*/
                CApplicationHead cApplicationHead = new CApplicationHead();
                Integer applicationNo;
                if (no.equals("")) {

                    applicationNo = utilService.getSerialNumber("CApplicationHead", "applicationNo", "an", "");
                    cApplicationHead.setApplicationNo(applicationNo);

                } else {

                    applicationNo = Integer.parseInt(no);
                    cApplicationHead.setApplicationNo(applicationNo);

                }
                cApplicationHead.setType(requisitionValue.getString("type"));
                cApplicationHead.setState(requisitionValue.getString("state"));
                //cApplicationHead.setWriter(requisitionValue.getString("applicant"));

				/*创建时间 如果是添加信息 使用new date，如果是编辑 首先获取创建时间 再update*/
                String date = sdf.format(new Date());
                Timestamp createTime = null;
                /*编制人信息*/
                String editPerson = requisitionValue.getString("editPerson").trim();
                if (1 == isAdd) {

					/*创建时间*/
                    cApplicationHead.setCreateTime(Timestamp.valueOf(date));
                    /*如果是新建 编制人 就是 新建者*/
                    cApplicationHead.setCreatePerson(editPerson);
                    cApplicationHead.setWriter(editPerson);

                } else {

                    Map map = (Map) dao.executeQuery("select new Map(cah.createTime as createTime,cah.createPerson as createPerson) " +
                            " from CApplicationHead cah where cah.applicationNo='" + requisitionValue.getString("no") + "'").get(0);
                    /*创建时间*/
                    createTime = (Timestamp) map.get("createTime");
                    /*创建者*/
                    String createPerson = (String) map.get("createPerson");

					/*创建时间*/
                    cApplicationHead.setCreateTime(createTime);
                    /*编制人*/
                    cApplicationHead.setWriter(editPerson);
                    /*新建者*/
                    cApplicationHead.setCreatePerson(createPerson);
                }

				/*查询机构*/
                String organization = dao.executeQuery("select cr.organization from CRegist cr where cr.name='" + editPerson + "'").get(0)
                        .toString();
                cApplicationHead.setOrganization(organization);
                cApplicationHead.setExplaining(requisitionValue.getString("explain"));

				/*保存或者更新*/
                dao.saveOrUpdate(cApplicationHead);

                /**
                 * 更新申请行信息
                 */
                dao.executeQuery("delete from CApplicationLine cal where cal.id.applicationNo='" + applicationNo + "'");

                for (int i = 0; i < rowValue.length(); i++) {

                    JSONObject row = rowValue.getJSONObject(i);

                    CApplicationLine cApplicatioLine = new CApplicationLine();
                    CApplicationLineId cApplicatioLineId = new CApplicationLineId();

                    cApplicatioLineId.setApplicationNo(applicationNo);
                    cApplicatioLineId.setLineNo(Integer.parseInt(row.getString("row")));

					/*List<CApplicationLine> list=dao.executeQuery("select ");*/

                    cApplicatioLine.setId(cApplicatioLineId);
                    /*cApplicatioLine.setCApplicationHead(cApplicationHead);*/
                    Integer materialId = (Integer) dao.executeQuery("select cgm.materialId from CGeneralMaterial cgm where cgm.materialNo='" +
                            row.getString("materialNo").trim() + "'").get(0);
                    cApplicatioLine.setMaterialId(materialId);
                    cApplicatioLine.setNumber(Float.parseFloat(row.getString("num")));

                    cApplicatioLine.setDemandTime(Timestamp.valueOf(row.getString("needDate") + " 00:00:00"));

                    String storageRoom = row.getString("storageRoom").trim();
                    if (!storageRoom.equals("")) {
                        Integer acceptStorageRoom = (Integer) dao.executeQuery("select csrd.storageRoomId from CStorageRoomDefinition csrd where " +
                                "csrd" +
                                ".storageRoomNo='" + storageRoom + "'").get(0);
                        cApplicatioLine.setAcceptWarehouseId(acceptStorageRoom);

                    } else {
                        /*默认就是账号的默认库房 查询默认库房信息*/
                        List storageIdList = dao.executeQuery("select cr.storageRoomId " +
                                " from CRegist cr " +
                                " where cr.name='" + editPerson + "'");
                        if (storageIdList.get(0) != null) {

                            cApplicatioLine.setAcceptWarehouseId(Integer.parseInt(storageIdList.get(0).toString()));

                        }

                    }

                    cApplicatioLine.setLastMonthConsumption(Float.parseFloat(row.getString("lastMonthConsume")));
                    cApplicatioLine.setState(row.getString("state"));
                    /*应该还有目的地 也就是库房描述 TODO 这里先不做处理，通过库房id可以查找*/
                    cApplicatioLine.setApplicant(row.getString("applicant"));

                    //TODO 这里供应商应为 通用物料没有这个字段 暂时先不做处理
                    //cApplicatioLine.setSupplierNo(Integer.parseInt(requisitionValue.getString("supplierNo")));
                    //cApplicatioLine.setSupplier(requisitionValue.getString("supplier"));

                    cApplicatioLine.setBrand(row.getString("brand"));
                    cApplicatioLine.setCurrentInventory(Float.parseFloat(row.getString("currentInventory")));
                    cApplicatioLine.setAllInventory(Float.parseFloat(row.getString("allInventory")));
                    cApplicatioLine.setBuildPerson(editPerson);

					/*创建时间 如果是添加信息 使用new date，如果是编辑 首先获取创建时间 再update*/
                    if (1 == isAdd) {

                        cApplicatioLine.setBuildTime(Timestamp.valueOf(date));

                    } else {

                        cApplicatioLine.setBuildTime(createTime);
                    }

                    if (1 == row.getInt("haveApprover")) {

                        cApplicatioLine.setApprover(row.getString("approver"));
                    }
                    /*申请行保存*/
                    dao.saveOrUpdate(cApplicatioLine);
                }

                result.append("result", "true");
                result.append("applicationNo", applicationNo);
                return result.toString();

            }

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();
        }

    }

    @Override
    public String deleteRequisition(String requisitionNo) {

        requisitionNo = requisitionNo.trim();
        JSONObject result = new JSONObject();
        try {

            List<CApplicationLine> cApplicationLineList = dao.executeQuery("from CApplicationLine cal where cal.id.applicationNo='" + requisitionNo
                    + "'");
            for (CApplicationLine cApplicationLine : cApplicationLineList) {

                dao.delete(cApplicationLine);
            }

            CApplicationHead cApplicationHead = new CApplicationHead();
            cApplicationHead.setApplicationNo(Integer.parseInt(requisitionNo));
            dao.delete(cApplicationHead);

            result.append("result", "true");

        } catch (Exception e) {

            result.append("result", "false");
            e.printStackTrace();
        }
        return result.toString();
    }

    @Override
    public List getStorageRoom() {

        String storageHql = "select new Map(csr.storageRoomNo as storageRoomNo) from CStorageRoomDefinition csr";
        return dao.executeQuery(storageHql);
    }

    @Override
    public String getMaterialRequisitionMsg(String materialNo, String searchStorage) {

        materialNo = materialNo.trim();
		/*searchStorage = searchStorage.trim();*/
        Double lastMonthConsumption = 0.0;
        Double allConsumption = 0.0;
        Double currentConsumption = 0.0;
        JSONObject jsonObject = new JSONObject();
        JSONArray brand = new JSONArray();
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        String materialHql = "from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'";
        List<CGeneralMaterial> list = dao.executeQuery(materialHql);
        CGeneralMaterial cGeneralMaterial = list.get(0);

		/*查看物料是否有版本控制*/
        if (1 == cGeneralMaterial.getVersionControlOrnot()) {

            List<CMaterialVersion> versions = dao.executeQuery("from CMaterialVersion cmv where cmv.CGeneralMaterial.materialNo='" + cGeneralMaterial
                    .getMaterialNo() + "'");
            for (int i = 0; i < versions.size(); i++) {

                JSONObject oneBrand = new JSONObject();
				/*版本名称*/
                oneBrand.append("brand", versions.get(i).getVersionExplain());
				/*是否默认版本*/
                oneBrand.append("isDefaultVersion", versions.get(i).getDefaultVersionOrnot());
                brand.put(oneBrand);
            }
            jsonObject.append("materialBrand", brand);
        } else {
			/*没有版本控制*/
            jsonObject.append("materialBrand", "");
        }

        jsonObject.append("unit", cGeneralMaterial.getMaterialUnit());

		/*上月消耗*/
        cal.set(Calendar.YEAR, (date.getYear() + 1900));
        cal.set(Calendar.MONTH, (date.getMonth() - 1));
        cal.set(Calendar.DAY_OF_MONTH, 1);
        List<Double> cCuttoolConsumption = dao.executeQuery("select sum(ccc.number) from CCuttoolConsumption ccc,CGeneralMaterial cgm " +
                " where ccc.materialId=cgm.materialId " +
                " and cgm.materialNo='" + materialNo + "' " +
                " and DATE_FORMAT(ccc.createTime,'%Y%m')=DATE_FORMAT('" + sdf.format(cal.getTime()) + "','%Y%m') ");

        if (cCuttoolConsumption.size() > 0) {

            lastMonthConsumption = cCuttoolConsumption.get(0);
        }
        jsonObject.append("lastMonthConsumption", lastMonthConsumption);

		/*当前库存*/
        List<Double> currentConsumptionList = dao.executeQuery("select sum(csl.availableQuantity) from CStockList csl,CGeneralMaterial cgm," +
                "CStorageRoomDefinition csrd " +
                " where csl.id.materialId=cgm.materialId " +
                " and cgm.materialNo='" + materialNo + "' " +
                " and csl.id.stockId=csrd.storageRoomId " +
                " and csrd.storageRoomNo='" + searchStorage + "'");
        if (currentConsumptionList.size() > 0) {

            currentConsumption = currentConsumptionList.get(0);
        }
        jsonObject.append("currentConsumption", currentConsumption);

		/*总库存*/
        List<Double> allConsumptionList = dao.executeQuery("select sum(csl.availableQuantity) from CStockList csl,CGeneralMaterial cgm " +
                " where csl.id.materialId=cgm.materialId " +
                " and cgm.materialNo='" + materialNo + "'");
        allConsumption = allConsumptionList.get(0);
        jsonObject.append("allConsumption", allConsumption);

		/*目的地 申请人获取*/
		/*List<Map> storageMsg = dao.executeQuery("select new Map(csrd.storageRoomDescribe as storageRoomDescribe,csrd.principalCustodian as " +
				"principalCustodian)from " +
				"CStorageRoomDefinition csrd " +
				"where csrd" +
				".storageRoomNo='" + searchStorage + "'");
		jsonObject.append("destination", storageMsg.get(0).get("storageRoomDescribe"));
		jsonObject.append("applicant", storageMsg.get(0).get("principalCustodian"));*/

        return jsonObject.toString();
    }

    @Override
    public String getCurrentConsumption(String materialNo, String storageNo) {

        JSONObject jsonObject = new JSONObject();

        materialNo = materialNo.trim();
        storageNo = storageNo.trim();
		/*当前库存*/
        List<Float> currentConsumptionList = dao.executeQuery("select sum(csl.availableQuantity) from CStockList csl,CGeneralMaterial cgm," +
                " CStorageRoomDefinition csrd  " +
                " where csl.id.materialId=cgm.materialId " +
                " and csl.id.stockId=csrd.storageRoomId" +
                " and cgm.materialNo='" + materialNo + "' " +
                " and csrd.storageRoomNo='" + storageNo + "'");

        if (currentConsumptionList.size() > 0 && currentConsumptionList.get(0) != null) {

            jsonObject.append("currentConsumption", currentConsumptionList.get(0));
        } else {

            jsonObject.append("currentConsumption", 0);
        }

        return jsonObject.toString();
    }

    @Override
    public String getMaterialVersion(String materialNo) {

        materialNo = materialNo.trim();
        JSONObject result = new JSONObject();
        String hql = "select cmv.id.materialVersionNo from CMaterialVersion cmv,CGeneralMaterial cgm where " +
                " cmv.id.materialId=cgm.materialId " +
                " and cgm.materialNo='" + materialNo + "' " +
                " and cmv.defaultVersionOrnot=1";
        String version = "";
        List list = dao.executeQuery(hql);
        if (list.size() > 0) {

            version = list.get(0).toString();
        }
        result.append("version", version);
        return result.toString();
    }

    @Override
    public String getRequisitionHeadOrRow(String requestBody) {

		/*封装上传信息*/
        JSONObject upload = new JSONObject(requestBody);
        List result = null;
        String hql = "";
        String searchState = upload.getString("searchState");
        String applyNo = upload.getString("applyNo");
        String applyPerson = upload.getString("applyPerson");
        String state = upload.getString("state");
        String materialNo = upload.getString("materialNo");
        //String     materialVersion = upload.getString("materialVersion");
        String createDateStart = upload.getString("createDateBegin");
        String createDateEnd = upload.getString("createDateEnd");
        String needDateStart = upload.getString("needDateBegin");
        String needDateEnd = upload.getString("needDateEnd");
		/*申请题头*/
        if (searchState.equals("true")) {

            hql = "select distinct cah from CApplicationHead cah,CApplicationLine cal,CGeneralMaterial cgm where ";

            if (applyNo.equals("") || applyNo.equals("%")) {

                hql += " cah.applicationNo like '%' ";
            } else {

                hql += " cah.applicationNo='" + applyNo + "'";
            }
            if (applyPerson.equals("") || applyPerson.equals("%")) {

                hql += " and cal.applicant like '%' ";
            } else {

                hql += " and cal.applicant='" + applyPerson + "'";
            }
            if (state.equals("")) {

                hql += " and cah.state like '%' ";
            } else {

                hql += " and cah.state='" + state + "'";
            }
            if (materialNo.equals("%")) {

                hql += " and cah.applicationNo=cal.id.applicationNo " +
                        " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo like '%'";
            } else {

                hql += " and cah.applicationNo=cal.id.applicationNo " +
                        " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo='" + materialNo + "'";
            }
            /**
             * TODO 物料版本条件暂时没有添加 申请提交时并未选择物料版本信息
             */
            if (createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cah.createTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cah.createTime,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cah.createTime,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            }
            result = dao.executeQuery(hql);

			/*申请行*/
        } else if (searchState.equals("false")) {

            hql = "select cal,cgm.material_no as materialNo,cgm.material_describe as materialDescribe,cgm.material_unit as unit," +
                    " cgm.unit as unitPrice,csrd.storageoomNo as storageRoomNo,cah.type as type) " +
                    " from CApplicationLine cal,CGeneralMaterial cgm,CStorageRoomDefinition csrd,CApplicationHead cah " +
                    " where " +
                    " cal.materialId=cgm.materialId " +
                    " and cal.id.applicationNo=cah.applicationNo ";
            if (applyNo.equals("") || applyNo.equals("%")) {

                hql += " and cal.id.applicationNo like '%' ";
            } else {

                hql += " and cal.id.applicationNo='" + applyNo + "'";
            }
            if (applyPerson.equals("") || applyPerson.equals("%")) {

                hql += " and cal.applicant like '%' ";
            } else {

                hql += " and cal.applicant='" + applyPerson + "'";
            }
            if (state.equals("")) {

                hql += " and cal.state like '%' ";
            } else {

                hql += " and cal.state='" + state + "'";
            }
            if (materialNo.equals("%")) {

                hql += " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo like '%' ";
            } else {

                hql += " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo='" + materialNo + "'";
            }
            if (createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
                        " and  DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            }

            if (needDateStart.equals("%") && !needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d')<=DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
            } else if (!needDateStart.equals("%") && needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d')>=DATE_FORMAT('" + needDateStart + " 00:00:00','%Y%m%d')";
            } else if (!needDateStart.equals("%") && !needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d') between DATE_FORMAT('" + needDateStart + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
            }

            result = dao.executeQuery(hql);

        } else if (searchState.equals("0")) {

            hql = "select new Map(cal,cgm.materialNo as materialNo,cgm.materialDescribe as materialDescribe,cgm.materialUnit as " +
                    "unit,csrd.storageRoomNo as storageRoomNo) " +
                    " from CApplicationLine cal,CGeneralMaterial cgm,CStorageRoomDefinition csrd " +
                    " where " +
                    " cal.acceptWarehouseId=csrd.storageRoomId ";
					/*" and (cal.id.applicationNo <> coa.applyNo or cal.id.lineNo <> coa.applyLineNo ) ";*/
					/*" and cah.orderCode=ca.id.orderCode ";*/
					/*" and cgm.materialNo=ca.materialNo " +
					" and cal.brand=ca.brand";*/

            if (applyNo.equals("") || applyNo.equals("%")) {

                hql += " and cal.id.applicationNo like '%' ";
            } else {

                hql += " and cal.id.applicationNo='" + applyNo + "'";
            }
            if (applyPerson.equals("") || applyPerson.equals("%")) {

                hql += " and cal.applicant like '%' ";
            } else {

                hql += " and cal.applicant='" + applyPerson + "'";
            }
            if (state.equals("")) {

                hql += " and cal.state like '%' ";
            } else {

                hql += " and cal.state='" + state + "'";
            }
            if (materialNo.equals("%")) {

                hql += " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo like '%' ";
            } else {

                hql += " and cal.materialId=cgm.materialId " +
                        " and cgm.materialNo='" + materialNo + "'";
            }
            if (createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d')>=DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d')";
            } else if (!createDateStart.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.buildTime,'%Y%m%d') between DATE_FORMAT('" + createDateStart + " 00:00:00','%Y%m%d') " +
                        " and  DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            }

            if (needDateStart.equals("%") && !needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d')<=DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
            } else if (!needDateStart.equals("%") && needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d')>=DATE_FORMAT('" + needDateStart + " 00:00:00','%Y%m%d')";
            } else if (!needDateStart.equals("%") && !needDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cal.demandTime,'%Y%m%d') between DATE_FORMAT('" + needDateStart + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + needDateEnd + " 00:00:00','%Y%m%d')";
            }

			/*封装查询结果 查询协议*/
            List<Map> list = dao.executeQuery(hql);
            JSONArray jsonArray = new JSONArray(list);
			/*判断申请是否有对应协议*/
            for (int i = 0; i < jsonArray.length(); i++) {

                JSONObject jsonObject = (JSONObject) jsonArray.get(i);

				/*判断申请行是否已经生成订单*/
                Integer applicationNo = jsonObject.getJSONObject("0").getJSONObject("id").getInt("applicationNo");
                Integer applicationLineNo = jsonObject.getJSONObject("0").getJSONObject("id").getInt("lineNo");

				/*查询申请是否生成过订单*/
                List list1 = dao.executeQuery("select coa.id.orderNo from COrderAccept coa " +
                        " where coa.applyNo='" + applicationNo + "' and coa.applyLineNo='" + applicationLineNo + "'");

				/*申请已经生成订单 从查询结果中删除*/
                if (list1.size() > 0 && list1.get(0) != null) {

					/*移除已经生成订单的申请*/
                    jsonArray.remove(i);

					/*循环变量减一*/
                    i--;

					/*否则查询是否存在协议*/
                } else {

                    List<Map> exitAgreement = dao.executeQuery("select new Map(ca.unitPrice as unitPrice,coh.supplier as supplierName,coh" +
                            ".CSupplier" +
                            ".supplierCode as supplierCode) " +
                            "from CAgreement ca,COrderHead coh " +
                            " where " +
                            " ca.id.orderCode=coh.orderNo " +
                            " and coh.class_='采购协议' " +
                            " and ca.materialNo='" + jsonObject.getString("materialNo") + "' " +
                            " and ca.brand='" + jsonObject.getJSONObject("0").getString("brand") + "' " +
                            " and ca.state='已审批' ");

					/*不存在协议 单价个 供应商都是空*/
                    if (exitAgreement == null || exitAgreement.size() == 0) {

                        ((JSONObject) jsonArray.get(i)).append("unitPrice", "");
                        ((JSONObject) jsonArray.get(i)).append("supplier", "");
                        ((JSONObject) jsonArray.get(i)).append("supplierNo", "");

						/*存在协议 填写单价和 供应商*/
                    } else {

                        ((JSONObject) jsonArray.get(i)).append("unitPrice", exitAgreement.get(0).get("unitPrice").toString());
                        ((JSONObject) jsonArray.get(i)).append("supplier", exitAgreement.get(0).get("supplierName").toString());
                        ((JSONObject) jsonArray.get(i)).append("supplierNo", exitAgreement.get(0).get("supplierCode").toString());
                    }

                }

            }

            return jsonArray.toString();

        }

        return new JSONArray(result).toString();
    }

    @Override
    public List getRequisitionRowByApplyNo(String applyNo) {

        String hql = "select new Map(cal,cgm.materialNo as materialNo,cgm.materialDescribe as materialDescribe,cgm.materialUnit as unit," +
                " cgm.unit as unitPrice,csrd.storageRoomNo as storageRoomNo,cah.type as type) " +
                " from CApplicationLine cal,CGeneralMaterial cgm,CStorageRoomDefinition csrd," +
                "  CApplicationHead cah" +
                " where " +
                " cal.materialId=cgm.materialId " +
                " and cal.acceptWarehouseId=csrd.storageRoomId " +
                " and cal.id.applicationNo=cah.applicationNo " +
                " and cal.id.applicationNo='" + applyNo + "' ";
        return dao.executeQuery(hql);
    }

    @Override
    public List getPageAuthorityAndRequisitionRow(String no, String account, String pageName) {

        List result = new ArrayList();
        Map map = new HashMap();
        int isAdmin = (Integer) dao.executeQuery("select caa.isAdmin from CAccountAuthority caa where caa.id.account='" + account + "'").get(0);
        if (1 == isAdmin) {

            map.put("authority", 1);
            result.add(map);
        } else {

            List page = dao.executeQuery("select caa.authority from CAccountAuthority caa,CAuthorityMenu cam where caa.id.functionNode=cam.nodeId " +
                    " and cam.linkPage='" + pageName + "' " +
                    " and caa.id.account='" + account + "'");
            if (page.size() > 0 && (Integer) page.get(0) == 1) {

                map.put("authority", 1);
                result.add(map);

            } else {

                map.put("authority", 0);
                result.add(map);

            }
        }

		/*查询申请请题头*/
        Map head = new HashMap();
        List headList = dao.executeQuery("select new Map(cah.writer as writer,cah.explaining as explaining) " +
                " from CApplicationHead cah " +
                " where cah.applicationNo='" + no + "'");
        head.put("head", headList);
        result.add(head);

		/*查询申请行*/
        Map row = new HashMap();
        List rowList = dao.executeQuery("select new Map(cal,cgm.materialDescribe as materialDescribe,cgm.materialUnit as unit," +
                " csrd.storageRoomNo as storageRoomNo, csrd.storageRoomDescribe as storageRoomDescribe,cgm.materialNo as materialNo) " +
                " from CApplicationLine cal,CGeneralMaterial cgm ,CStorageRoomDefinition csrd " +
                " where " +
                " cal.id.applicationNo='" + no + "' " +
                " and cal.materialId=cgm.materialId " +
                " and cal.acceptWarehouseId=csrd.storageRoomId ");
        row.put("row", rowList);
        result.add(row);

        return result;
    }

}
