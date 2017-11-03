package com.smtcl.machinetool.service.impl;

import ch.qos.logback.core.net.*;
import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.hibernate.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by GuoFeng on 2016/1/22.
 */
@Service
public class MaterialDefinitionService implements IMaterialDefinitionService {

    @Autowired
    private IGenericDAO dao;

    private Integer SUCCESS = 1;
    private Integer FAILE = -1;
    private Integer EMPTY = 0;
    private Integer MATERIAL_EXIST = 0;
    private Integer MATERIAL_NO_EXIST = 1;
    private Integer MATERIAL_SAFE_FIALED = -1;
    private Integer ERROR = -1;

    private static final Logger log = LoggerFactory.getLogger(MaterialDefinitionService.class);

    /**
     * 图片上传路径
     */
    //private String rootPath = this.getClass().getClassLoader().getResource("/").toURI().getPath() + "static/uploadImg/";

    private String rootPath = System.getProperty("user.dir").replace("bin", "webapps") + "\\machinetool\\WEB-INF\\classes\\static\\uploadImg\\";

    //初始化数据获取
    @Override
    public List getInitPar() {

        ArrayList list = new ArrayList();
        //初始化单位获取
        list.add(dao.findAll(CUnit.class));
        //初始化类别获取
        String hql = "from CParameterModel cpm where cpm.type=1";//查询物料类别
        list.add(dao.executeQuery(hql));
        //初始化供应商
        hql = "from CSupplier";
        list.add(dao.executeQuery(hql));
        //初始化人员
        hql = "from CPersonnel";
        list.add(dao.executeQuery(hql));
        //初始化采购员
        hql = "from CBuyer";
        list.add(dao.executeQuery(hql));

        return list;

    }

    //物料编号查询
    @Override
    public Integer materialNoSearch(String noValue) {

        String hql = "from CGeneralMaterial cgm where cgm.materialNo='" + noValue + "'";
        List list = dao.executeQuery(hql);
        if (list.size() > 0) {

            return SUCCESS;
        } else {

            return FAILE;
        }
    }

    //版本查询
    @Override
    public List versionSearch(String materialId) {

        String hql;
        if (materialId.indexOf('%') == -1) {

            hql = "from CMaterialVersion cmv where cmv.id.materialId='" + materialId + "'";
        } else {

            hql = "from CMaterialVersion cmv where cmv.id.materialId like '" + materialId + "'";
        }
        return dao.executeQuery(hql);
    }

    //物料信息查询
    @Override
    public List materialSearch(String searchValue) {

        String hql = null;
        List result = new ArrayList<>();
        try {

            //没有模糊查询
            if (searchValue.indexOf('%') == -1) {

                hql = "from CGeneralMaterial cgm where cgm.materialNo='" + searchValue + "' or cgm.materialDescribe='" + searchValue + "'";
                result = dao.executeQuery(hql);

            } else {//模糊查询

                hql = "from CGeneralMaterial cgm where cgm.materialNo like '" + searchValue + "' or cgm.materialDescribe like '" + searchValue + "'";
                result = dao.executeQuery(hql);

            }

        } catch (Exception e) {

            System.out.println(e);

        }

        return result;

    }

    //物料模型获取
    @Override
    public List modelClassChoose(String materialClass) {

        ArrayList searchValue = new ArrayList<>();
        String hql = "from CParameterModel cpm where cpm.category='" + materialClass + "' and cpm.type=1";
        List list = dao.executeQuery(hql);
        if (list.size() > 0) {
            CParameterModel cParameterModel = (CParameterModel) list.get(0);
            List img = new ArrayList();
            img.add(cParameterModel.getPicture());
            searchValue.add(img);

            String parameterName = cParameterModel.getParameterName();
            String parameterVal = cParameterModel.getSuggestedCuttingPar();
            String[] parName = parameterName.split("\\|");
            String[] parValue = parameterVal.split("\\|");
            int parValueLength = parValue.length;
            List parList = new ArrayList();
            for (int i = 0; i < parName.length; i++) {

                Map map = new HashMap<>();
                map.put("parName", parName[i]);
                if (i > parValueLength - 1) {

                    map.put("parValue", "");

                } else {

                    map.put("parValue", parValue[i]);

                }

                parList.add(map);

            }
            searchValue.add(parList);
        }
        return searchValue;
    }

    //物料定义-物料编辑 数据上传
    @Override
    public Object materialDefinitionUpload(String materialDefinition) {
		/*保存结果*/
        JSONObject result = new JSONObject();

        try {


            JSONArray materialJSONArray = new JSONArray(materialDefinition);
            //获取物料编辑信息
            String isMaterialEdit = materialJSONArray.getJSONObject(0).getString("isMaterialEdit");
            //物料编号
            String materialNo = materialJSONArray.getJSONObject(1).getString("materialId");

            //获取有效版本数
            Integer enableVersion = materialJSONArray.getJSONObject(2).getInt("enableVersion");
            //获取物料参数个数
            Integer parCount = materialJSONArray.getJSONObject(7 + enableVersion).getInt("parCount");

            /*--------------------------------物料信息封装---------------------------------*/

            //通用物料信息保存
            CGeneralMaterial saveMaterial = new CGeneralMaterial();
            //获取通用物料信息
            String materialDescribe = materialJSONArray.getJSONObject(3 + enableVersion).getString("materialDescription");//物料描述信息
            String barCode = materialJSONArray.getJSONObject(4 + enableVersion).get("barCode").toString();//二维码信息
            //主页面json对象
            JSONObject mainPage = materialJSONArray.getJSONObject(5 + enableVersion);
            //主要页面信息获取
            String mainUnit = mainPage.getString("mainUnitValue");
            String supportUnit = mainPage.getString("supportUnitValue");
            String unitTransaction = mainPage.getString("unitTransaction");
            String materialType = mainPage.getString("materialTypeValue");
            String materialCategory = mainPage.getString("materialCategoryValue");
            String enableStateValue = mainPage.getString("enableStateValue");
            String marks = mainPage.get("marks").toString();
            //库存页面json对象
            JSONObject stockPage = materialJSONArray.getJSONObject(6 + enableVersion);
            //库存页面信息获取
            Integer stockMaterial = stockPage.getInt("stockMaterial");
            Integer versionControl = stockPage.getInt("versionControl");
            Integer storage = stockPage.getInt("storage");
            Integer handle = stockPage.getInt("handle");
            Integer retain = stockPage.getInt("retain");
            Integer batchStoragePeriod = stockPage.getInt("batchStoragePeriod");
            String storagePeriod = stockPage.getString("storagePeriod");
            Integer batchControl = stockPage.getInt("batchControl");
            String batchControlStartNo = stockPage.getString("batchControlStartNo");
            Integer sequenceControl = stockPage.getInt("sequenceControl");
            String sequenceControlStartNo = stockPage.getString("sequenceControlStartNo");
            Integer stockControl = stockPage.getInt("stockControl");
            Integer limitInventoryCheckBox = stockPage.getInt("limitInventoryCheckBox");
            Integer limitLibrary = stockPage.getInt("limitLibrary");

            //采购页面json对象获取
            JSONObject buyPage = materialJSONArray.getJSONObject(8 + enableVersion + parCount);
            //获取采购页面信息
            String buyer = buyPage.getString("buyer");
            String getUnit = buyPage.getString("unit");
            Double unit = null;
            if (!getUnit.isEmpty()) {

                unit = Double.parseDouble(getUnit);
            }

            //计划页面json对象获取
            JSONObject planPage = materialJSONArray.getJSONObject(9 + enableVersion + parCount);
            JSONObject planPageSafeStock = materialJSONArray.getJSONObject(10 + enableVersion + parCount);
            //计划页面信息获取
            String planMethod = planPage.getString("planMethod");
            String planMan = planPage.getString("planMan");
            String makeOrPurchase = planPage.getString("makeOrPurchase");
            String getMinMaxMin = planPage.getString("minMaxMin");
            Float minMaxMin = null;
            if (!getMinMaxMin.isEmpty()) {

                minMaxMin = Float.parseFloat(getMinMaxMin);
            }
            String getMinMaxMax = planPage.getString("minMaxMax");
            Float minMaxMax = null;
            if (!getMinMaxMax.isEmpty()) {

                minMaxMax = Float.parseFloat(getMinMaxMax);
            }

            String getOrderMin = planPage.getString("orderMin");
            Float orderMin = null;
            if (!getOrderMin.isEmpty()) {

                orderMin = Float.parseFloat(getOrderMin);
            }

            String getOrderMax = planPage.getString("orderMax");
            Float orderMax = null;
            if (!getOrderMax.isEmpty()) {

                orderMax = Float.parseFloat(getOrderMax);
            }

            String getCostOrder = planPage.getString("costOrder");
            Float costOrder = null;
            if (!getCostOrder.isEmpty()) {

                costOrder = Float.parseFloat(getCostOrder);

            }

            String getCostSafeKeep = planPage.getString("costSafeKeep");
            Float costSafeKeep = null;
            if (!getCostSafeKeep.isEmpty()) {

                costSafeKeep = Float.parseFloat(getCostSafeKeep);

            }

            //供应商 保留字段 不处理
            String sourceSupplier = planPage.getString("sourceSupplier");

            //安全库存信息获取
            String getSafetyStockDays = planPageSafeStock.getString("safeStockDays");
            Integer safeStockDays = null;
            if (!getSafetyStockDays.isEmpty()) {

                safeStockDays = Integer.parseInt(getSafetyStockDays);

            }

            String getSafetyStockPercent = planPageSafeStock.getString("safeStockPercent");
            Float safetyStockPercent = null;
            if (!getSafetyStockPercent.isEmpty()) {

                safetyStockPercent = Float.parseFloat(getSafetyStockPercent);

            }

            //提前期信息获取
            JSONObject preDayPage = materialJSONArray.getJSONObject(11 + enableVersion + parCount);

            String getPreProcess = preDayPage.getString("preProcess");
            Integer preProcess = null;
            if (!getPreProcess.isEmpty()) {

                preProcess = Integer.parseInt(getPreProcess);

            }

            String getInProcess = preDayPage.getString("inProcess");
            Integer inProcess = null;
            if (!getInProcess.isEmpty()) {

                inProcess = Integer.parseInt(getInProcess);

            }

            String getPostProcess = preDayPage.getString("postProcess");
            Integer postProcess = null;
            if (!getPostProcess.isEmpty()) {

                postProcess = Integer.parseInt(getPostProcess);

            }

            //设置物料信息
            //主要页面信息设置
            saveMaterial.setMaterialNo(materialNo);
            saveMaterial.setMaterialDescribe(materialDescribe);
            saveMaterial.setSecondCode(barCode);
            saveMaterial.setMaterialUnit(mainUnit);
            saveMaterial.setAuxiliaryUnit(supportUnit);
            saveMaterial.setTransferCoefficient(unitTransaction);
            saveMaterial.setMaterialType(materialType);
            saveMaterial.setMaterialClass(materialCategory);
            saveMaterial.setState(enableStateValue);
            saveMaterial.setRemarks(marks);
            saveMaterial.setStockMaterialOrnot(stockMaterial);
            saveMaterial.setVersionControlOrnot(versionControl);
            saveMaterial.setCanStoreOrnot(storage);
            saveMaterial.setCanHandleOrnot(handle);
            saveMaterial.setCanRetainOrnot(retain);
            saveMaterial.setStoragePeriodControl(batchStoragePeriod);
            saveMaterial.setStoragePeriodUnit(storagePeriod);
            saveMaterial.setBatchControl(batchControl);
            saveMaterial.setBatchControlStartPrefix("");//起始前缀为空 等待后续功能完善
            saveMaterial.setBatchControlStartNo(batchControlStartNo);
            saveMaterial.setSequenceControl(sequenceControl);
            saveMaterial.setSequenceStartPrefix("");//起始前缀为空 等待后续功能完善
            saveMaterial.setSequenceStartNo(sequenceControlStartNo);
            saveMaterial.setLibraryControl(stockControl);
            saveMaterial.setRestrictedSubInventory(limitInventoryCheckBox);
            saveMaterial.setRestrictedCargoSpace(limitLibrary);
            saveMaterial.setBuyer(buyer);
            saveMaterial.setUnit(unit);
            saveMaterial.setInventoryPlan(planMethod);
            saveMaterial.setPlanner(planMan);
            saveMaterial.setManufactureOrProcure(makeOrPurchase);
            saveMaterial.setInventoryMin(minMaxMin);
            saveMaterial.setInventoryMax(minMaxMax);
            saveMaterial.setOrderAmountMin(orderMin);
            saveMaterial.setOrderAmountMax(orderMax);
            saveMaterial.setCostOrder(costOrder);
            saveMaterial.setKeepRate(costSafeKeep);
            saveMaterial.setSafetyInventoryDays(safeStockDays);
            saveMaterial.setSafetyInventoryPercentage(safetyStockPercent);
            saveMaterial.setInPreprocessing(preProcess);
            saveMaterial.setInProcessing(inProcess);
            saveMaterial.setPostprocessing(postProcess);

            saveMaterial.setUseOrnot("否");//默认 使用字段 "否"

            if (isMaterialEdit.equals("1")) {

                String searchMaterial = "from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'";
                List<CGeneralMaterial> list = dao.executeQuery(searchMaterial);
                saveMaterial.setMaterialId(list.get(0).getMaterialId());
                dao.getCurrentSession().evict(list.get(0));
                dao.update(saveMaterial);

            } else {

                //判断物料编号是否存在
                String searchMaterial = "from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'";
                List list = dao.executeQuery(searchMaterial);
                if (list.size() > 0) {//物料存在

                    result.append("result", "exist");
                    return result.toString();

                } else {
                    dao.saveOrUpdate(saveMaterial);
                }

            }

            //通过物料编号获取物料id
            String hql = "from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'";
            List<CGeneralMaterial> materialIdList = dao.executeQuery(hql);
            Integer materialId = materialIdList.get(0).getMaterialId();
            //版本信息保存
            List<CMaterialVersion> saveMaterialVersionList = new ArrayList<>();
            CMaterialVersionId materialVersionId = new CMaterialVersionId();
            CGeneralMaterial cGeneralMaterial = new CGeneralMaterial();

            CMaterialVersion saveMaterialVersion;

            for (int i = 0; i < enableVersion; i++) {
                saveMaterialVersion = new CMaterialVersion();
                materialVersionId = new CMaterialVersionId();
                JSONObject jsonObject = materialJSONArray.getJSONObject(3 + i);
                materialVersionId.setMaterialId(materialId);
                materialVersionId.setMaterialVersionNo(jsonObject.getString("materialVersionNo"));
                saveMaterialVersion.setId(materialVersionId);
                cGeneralMaterial.setMaterialId(materialId);
                saveMaterialVersion.setCGeneralMaterial(cGeneralMaterial);
                saveMaterialVersion.setVersionExplain(jsonObject.getString("versionExplain"));
                saveMaterialVersion.setStartDate(Timestamp.valueOf(jsonObject.getString("startDate")));
                saveMaterialVersion.setDefaultVersionOrnot(Integer.parseInt(jsonObject.getString("defaultVersionOrnot")));
                saveMaterialVersionList.add(saveMaterialVersion);
            }
            //参数页面信息设置
            cGeneralMaterial.setMaterialId(materialId);
            List<CMaterialParameter> saveMaterialParameterList = new ArrayList<>();
            CMaterialParameterId cMaterialParameterId = new CMaterialParameterId();
            CMaterialParameter saveMaterialParameter;
            for (int i = 0; i < parCount; i++) {

                saveMaterialParameter = new CMaterialParameter();
                cMaterialParameterId = new CMaterialParameterId();

                JSONObject jsonObject = materialJSONArray.getJSONObject(8 + enableVersion + i);

                cMaterialParameterId.setId(materialId);
                cMaterialParameterId.setParameterName(jsonObject.getString("parName"));
                /*设置物料类型 1（物料参数）*/
                cMaterialParameterId.setType(1);

                saveMaterialParameter.setId(cMaterialParameterId);
                /*设置物料参数类别 0（物料参数） 1（刀具参数）*/
                saveMaterialParameter.setClass_(0);

                String parValue = jsonObject.getString("parValue");

                if (!parValue.isEmpty()) {

                    saveMaterialParameter.setParameterValue(parValue);

                }
                saveMaterialParameterList.add(saveMaterialParameter);
            }
            if (isMaterialEdit.equals("0")) {//是新增物料信息
                for (CMaterialParameter cmp : saveMaterialParameterList) {

                    dao.add(cmp);

                }
                for (CMaterialVersion cmv : saveMaterialVersionList) {

                    dao.add(cmv);

                }
            } else if (isMaterialEdit.equals("1")) {

				/*删除旧版本信息*/
                dao.executeQuery("delete from CMaterialVersion cmv " +
                        " where cmv.id.materialId='" + materialId + "' ");

                //保存参数信息
                for (CMaterialParameter cmp : saveMaterialParameterList) {

                    List<CMaterialParameter> check = dao.executeQuery("from CMaterialParameter cmp " +
                            " where cmp.id.id='" + materialId + "' " +
                            " and cmp.id.parameterName='" + cmp.getId().getParameterName() + "'" +
                            " and cmp.id.type=1 " +
                            " and cmp.class_=0 ");
                    if (check.size() > 0) {

                        dao.getCurrentSession().evict(check.get(0));
                        dao.update(cmp);

                    } else {

                        dao.add(cmp);

                    }

                }
                //保存版本信息
                for (CMaterialVersion cmv : saveMaterialVersionList) {

                    dao.add(cmv);
                }
            }
            result.append("result", "success");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            log.error(e.getMessage());
            result.append("result", e.getMessage());

            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

            return result.toString();

        }
    }

    //图片上传
    @Override
    public Integer materialParPicUpload(String name, MultipartFile pic, String materialNo, String materialClass) {

        if (pic.getSize() > 0) {
            try {
                byte[] bytes = pic.getBytes();

                File dir = new File(rootPath);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String[] nameSplit = name.split("\\.");
                UUID uuid = UUID.randomUUID();
                String strUUid = uuid.toString();
                String replaceUUID = strUUid.replace("-", "");
                name = replaceUUID + "." + nameSplit[1];
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(rootPath + name)));
                stream.write(bytes);
                stream.close();

                //数据库信息保存
                String hql = "from CParameterModel cpm where cpm.category='" + materialClass + "'";
                List<CParameterModel> list = dao.executeQuery(hql);
                CParameterModel cParameterModel = list.get(0);
                cParameterModel.setPicture(name);
                dao.update(cParameterModel);

                return SUCCESS;
                /*return "Save Picture Success!";*/

            } catch (IOException e) {

                e.printStackTrace();
                return FAILE;
                //return "Fail:图片报保存失败!";

            } catch (Exception e) {

                e.printStackTrace();
                return FAILE;

            }
        } else {

            return EMPTY;//数据为空

        }
    }

    //物料编辑信息查询
    @Override
    public List materialEdit(String materialNo) {

        List searchResult = new ArrayList();
        try {

            String hql = "from CGeneralMaterial cgm" +
                    " where cgm.materialNo='" + materialNo + "' ";
            List<CGeneralMaterial> material = dao.executeQuery(hql);
            Integer materialId = material.get(0).getMaterialId();
            String mateialClass = material.get(0).getMaterialClass();
            searchResult.add(material);

            String hql1 = "from CMaterialParameter cmp " +
                    "where cmp.id.id='" + materialId + "' " +
                    " and cmp.class_=0 " +
                    " and cmp.id.type=1 ";

            List<CMaterialParameter> cMaterialParameters = dao.executeQuery(hql1);
            searchResult.add(cMaterialParameters);

            String hql2 = "from CMaterialVersion cmv where cmv.CGeneralMaterial.materialId='" + materialId + "'";
            List<CMaterialVersion> materialVersion = dao.executeQuery(hql2);

			/*物料库存查询*/
            List materialStorage = dao.executeQuery("select csl.id.materialId from CStockList csl where csl.id.materialId='" + materialId + "'");
            searchResult.add(materialVersion);

            Map map = new HashMap();
            List list = dao.executeQuery("select cpm.picture from CGeneralMaterial cgm,CParameterModel cpm" +
                    " where cgm.materialClass=cpm.category " +
                    " and cgm.materialClass='" + mateialClass + "'");
            map.put("picture", list.get(0));
            searchResult.add(map);map=null;
            /*物料存在库存*/
            if (materialStorage.size() > 0 && materialStorage.get(0) != null) {
                searchResult.add(1);
				/*物料不存在库存*/
            } else {
                searchResult.add(0);
            }
            return searchResult;

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        }

    }

    /*物料参数查询*/
    @Override
    public List<CMaterialParameter> materialPars(String materialNo) {

        List<CGeneralMaterial> generalMaterials = new ArrayList<CGeneralMaterial>();
        CGeneralMaterial generalMaterial = new CGeneralMaterial();
        List<CMaterialParameter> materialParameters = new ArrayList<CMaterialParameter>();
        String hql = "from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'";
        generalMaterials = dao.executeQuery(hql);
        generalMaterial = generalMaterials.get(0);
        int mid = generalMaterial.getMaterialId();
        String hql2 = "from CMaterialParameter cmp " +
                " where cmp.id.id='" + mid + "' " +
                " and cmp.type=1 " +
                " and cmp.class_=0 ";
        materialParameters = dao.executeQuery(hql2);
        return materialParameters;
    }

    @Override
    public List<CBatchList> batchSearch(String searchValue) {

        String hql = "from CBatchList cbl where cbl.batchNo like '" + searchValue + "' or cbl.CGeneralMaterial.materialNo like '" + searchValue +
                "'";
        return dao.executeQuery(hql);
    }

    @Override
    public List<CSequenceList> sequenceSearch(String searchValue) {

        String hql = "from CSequenceList csq where csq.CGeneralMaterial.materialNo like '" + searchValue + "' or csq.sequenceNo like '" +
                searchValue + "' ";
        return dao.executeQuery(hql);
    }

    @Override
    public Object materialDelete(String materialNo) {

        int flag = 0;
        Integer materialId = null;
        List list = null;
        JSONObject result = new JSONObject();
        try {

			/*物料did*/
            materialId = (Integer) dao.executeQuery("select cgm.materialId " +
                    " from CGeneralMaterial cgm " +
                    "where cgm.materialNo='" + materialNo + "'").get(0);

            /**
             * 采购协议
             */
            list = dao.executeQuery("select ca.materialNo from CAgreement ca where ca.materialNo='" + materialNo + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "采购协议");
                flag = 1;
            }
            /**
             * 采购申请
             */
            list = dao.executeQuery("select cal.materialId from CApplicationLine cal where cal.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "采购申请");
                flag = 1;
            }
            /**
             * 批次
             */
            list = dao.executeQuery("select cbl.batchId from CBatchList cbl where cbl.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "批次");
                flag = 1;
            }
            /**
             * 借用归还
             */
            list = dao.executeQuery("select cbr.id.borrowCode from CBorrowReturn cbr where cbr.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "借用归还");
                flag = 1;
            }
            /**
             * 刀具装配
             */
            list = dao.executeQuery("select cca.assemblyid from CCuttoolAssembly cca where cca.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "刀具装配");
                flag = 1;
            }
            /**
             * 刀具消耗
             */
            list = dao.executeQuery("select cccs.materialId from CCuttoolConsumption cccs where cccs.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "刀具消耗");
                flag = 1;
            }
            /**
             * 物料事务处理
             */
            list = dao.executeQuery("select cmah.transactionManagerId " +
                    " from CMaterialAffairsHandle cmah " +
                    " where cmah.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "物料事务处理");
                flag = 1;
            }
            /**
             * 采购订单
             */
            list = dao.executeQuery("select coa.id.orderNo " +
                    " from COrderAccept coa " +
                    " where coa.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "物料事务处理");
                flag = 1;
            }
            /**
             * 工艺卡片
             */
            list = dao.executeQuery("select cpc.materialId " +
                    " from CProcessCard cpc " +
                    " where cpc.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "工艺卡片");
                flag = 1;
            }
            /**
             * 加工工序
             */
            list = dao.executeQuery("select cpp.materialId " +
                    " from CProcessProcedure cpp " +
                    " where cpp.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "加工工序");
                flag = 1;
            }
            /**
             * 加工工艺版本
             */
            list = dao.executeQuery("select cpv.materialId " +
                    " from CProcessProcedureVersion cpv " +
                    " where cpv.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "加工工艺版本");
                flag = 1;
            }
            /**
             * 序列
             */
            list = dao.executeQuery("select csl.sequenceId " +
                    " from CSequenceList csl " +
                    " where csl.CGeneralMaterial.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "序列");
                flag = 1;
            }
            /**
             * 库存
             */
            list = dao.executeQuery("select csl.id.materialId " +
                    " from CStockList csl " +
                    " where csl.id.materialId='" + materialId + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "库存");
                flag = 1;
            }

            /**
             * 如果没有占用就直接删除物料版本和物料信息
             */
            if (0 == flag) {

                dao.executeQuery("delete from CMaterialVersion cmv where cmv.id.materialId='" + materialId + "'");
                dao.executeQuery("delete from CGeneralMaterial cgm where cgm.materialNo='" + materialNo + "'");
                result.append("result", true);
            }
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            /**
             * 事务回滚
             */
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return result.toString();

        }

    }
}
