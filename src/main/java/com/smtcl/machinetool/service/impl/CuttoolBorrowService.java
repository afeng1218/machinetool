package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.ICuttoolBorrowService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by CJS on 2016/4/21.
 * Changed by SunJun on 2016/8/11
 */
@Service
public class CuttoolBorrowService implements ICuttoolBorrowService {

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private SimpleDateFormat sdfDate = new SimpleDateFormat("yyyyMMdd");

    @Autowired
    IGenericDAO dao;

    /**
     * Changed by SunJun on 2016/8/11
     *
     * @param uploadValue
     * @return
     */
    @Override
    public String saveBorrowMsg(String uploadValue) {

        JSONObject result = new JSONObject();
        JSONArray jsonArray = new JSONArray(uploadValue);
        JSONObject titleValue = jsonArray.getJSONObject(0);
        JSONArray rowValue = jsonArray.getJSONObject(1).getJSONArray("rowValue");
        try {

            CCuttoolBorrowTitle title = new CCuttoolBorrowTitle();
            List<CStorageRoomDefinition> roomlist = new ArrayList<CStorageRoomDefinition>();
            CStorageRoomDefinition room = new CStorageRoomDefinition();
            List<CCargoSpaceDefinition> spacelist = new ArrayList<CCargoSpaceDefinition>();
            CCargoSpaceDefinition space = new CCargoSpaceDefinition();

            title.setBorrowNo(titleValue.getInt("borrow_no"));
            String cbhql = "from CBorrower cb where cb.employeeCardNo='" + titleValue.getString("employeeNo") + "'";
            List<CBorrower> cbList = new ArrayList<CBorrower>();
            CBorrower borrower = new CBorrower();
            cbList = dao.executeQuery(cbhql);
            if (cbList.size() > 0) {

                borrower = cbList.get(0);
                title.setCBorrower(borrower);
            }
            title.setBorrower(titleValue.getString("borrower"));

            if (!"".equals(titleValue.getString("surplus_lifetime"))) {

                title.setSurplusLifetime(Integer.parseInt(titleValue.getString("surplus_lifetime")));
            }
            title.setIsReturn(titleValue.getString("isReturn"));
            title.setType(titleValue.getString("type"));

            if (!titleValue.getString("equipment_id").equals("")) {

                int eID = Integer.parseInt(titleValue.getString("equipment_id"));
                title.setEquipmentId(eID);
            }

            String hql1 = "from CStorageRoomDefinition room where room.storageRoomNo='" + titleValue.getString("storage_room_no") + "'";
            roomlist = dao.executeQuery(hql1);
            room = roomlist.get(0);
            int roomid = room.getStorageRoomId();
            title.setCStorageRoomDefinition(room);
            CCuttoolBasedata cuttoolBasedata = new CCuttoolBasedata();
            List<CCuttoolBasedata> cuttools = new ArrayList<CCuttoolBasedata>();
            cuttools = dao.executeQuery("from CCuttoolBasedata  ccb where ccb.cuttoolNo='" + titleValue.getString("cuttool_no").trim() + "'");
            if (cuttools.size() > 0) {

                cuttoolBasedata = cuttools.get(0);
                title.setCCuttoolBasedata(cuttoolBasedata);

            }

            title.setWorkOrderNo(titleValue.getString("work_order_no"));
            //创建时间
            String date = sdf.format(new Date());
            Timestamp createTime = null;
            title.setCreateTime(createTime.valueOf(date));
            if (!"".equals(titleValue.getString("title_borrow_date"))) {

                title.setBorrowTime(Timestamp.valueOf(titleValue.getString("title_borrow_date") + " 00:00:00"));

            }
            if (!"".equals(titleValue.getString("title_plan_return_time"))) {

                title.setPlanReturnTime(Timestamp.valueOf(titleValue.getString("title_plan_return_time") + " 00:00:00"));
            }

            title.setCreatePerson(titleValue.getString("createPerson"));

            dao.add(title);

            //行信息保存
            /*更新行信息*/
            for (int i = 0; i < rowValue.length(); i++) {

                JSONObject row = rowValue.getJSONObject(i);
                CGeneralMaterial material = new CGeneralMaterial();
                CCuttoolBorrowTitle title2 = new CCuttoolBorrowTitle();
                CBorrowReturn borrowReturn = new CBorrowReturn();
                CBorrowReturnId borrowReturnId = new CBorrowReturnId();
                borrowReturnId.setBorrowCode(Integer.parseInt(row.getString("borrow_code")));
                borrowReturnId.setRownum(Integer.parseInt(row.getString("rownum")));
                borrowReturn.setId(borrowReturnId);

                Integer materialId = (Integer) dao.executeQuery("select cgm.materialId " +
                        " from CGeneralMaterial cgm " +
                        " where cgm.materialNo='" + row.getString("material_no").trim() + "'").get(0);

                material.setMaterialId(materialId);

                if (row.getString("brand") != null && !row.getString("brand").equals("")) {

                    borrowReturn.setMaterialVersionDes(row.getString("brand"));

                }

                borrowReturn.setCGeneralMaterial(material);
                borrowReturn.setCCuttoolBorrowTitle(title);
                borrowReturn.setBorrowNumber(Float.parseFloat(row.getString("borrow_number")));

                if (!"".equals(row.getString("returnNum")) && row.getString("returnNum") != null) {

                    borrowReturn.setReturnNumber(Float.parseFloat(row.getString("returnNum")));

                }
                if (!"".equals(row.getString("return_time")) && row.getString("return_time") != null) {

                    borrowReturn.setReturnDate(Timestamp.valueOf(row.getString("return_time") + " 00:00:00"));

                }
                borrowReturn.setBorrowDate(Timestamp.valueOf(row.getString("borrow_date") + " 00:00:00"));

                borrowReturn.setRemarks(row.getString("remarks"));
                if (!"".equals(row.getString("goods_allocation_no"))) {

                    Integer goodsAllocationId = (Integer) dao.executeQuery("select cgs.cargoSpaceId from CCargoSpaceDefinition cgs where cgs" +
                            ".cargoSpaceNo='" + row.getString("goods_allocation_no").trim() + "'").get(0);
                    borrowReturn.setGoodsAllocationId(goodsAllocationId);
                }

                borrowReturn.setCreatePerson(titleValue.getString("borrower"));
                String date2 = sdf.format(new Date());
                Timestamp createTime2 = null;
                borrowReturn.setCreateTime(createTime.valueOf(date2));

                if (!"".equals(row.getString("plan_return_time")) && row.getString("plan_return_time") != null) {

                    borrowReturn.setPlanReturnTime(Timestamp.valueOf(row.getString("plan_return_time") + " 00:00:00"));
                }
                if (!"".equals(row.getString("returnNum")) && row.getString("returnNum") != null) {

                    borrowReturn.setReturnNumber(Float.parseFloat(row.getString("returnNum")));
                }
                borrowReturn.setGoodsUseStatus(row.getString("goods_use_status"));
                dao.add(borrowReturn);

                /**
                 * 更新库存信息
                 */
                String hql = "from CStockList c where c.id.stockId=" + roomid + " and c.id.materialId=" + materialId;
                List<CStockList> stockLists = null;
                CStockList stock = null;

                stockLists = dao.executeQuery(hql);
                stock = stockLists.get(0);

                Float aviNum = stock.getAvailableQuantity();
                Float bluntNum = stock.getBluntGoodsNum();
                Float borrowNum = stock.getBorrowNumber();

                /**
                 * 设置借用数量
                 */
                stock.setBorrowNumber(borrowNum + Float.parseFloat(row.getString("borrow_number")));

                if ("新".equals(row.getString("goods_use_status"))) {

                    /**
                     * 设置现有量
                     */
                    stock.setAvailableQuantity(aviNum - Float.parseFloat(row.getString("borrow_number")));

                } else {

                    /**
                     * 设置钝品数量
                     */
                    stock.setBluntGoodsNum(bluntNum - Float.parseFloat(row.getString("borrow_number")));
                }

                dao.getCurrentSession().evict(stockLists.get(0));
                dao.saveOrUpdate(stock);

                /**
                 * 更新库存明细
                 */
                if (!"".equals(row.getString("goods_allocation_no")) && row.getString("goods_allocation_no") != null) {

                    hql = "from CStockDetailList c " +
                            " where c.id.stockId='" + roomid + "' " +
                            " and c.id.materialId='" + materialId + "' " +
                            " and c.id.goodsAllocationNo='" + row.getString("goods_allocation_no") + "'";

                    List<CStockDetailList> stockDetailLists = new ArrayList<CStockDetailList>();
                    CStockDetailList stockDetail = new CStockDetailList();
                    stockDetailLists = dao.executeQuery(hql);
                    stockDetail = stockDetailLists.get(0);
                    aviNum = stockDetail.getAvailableQuantity();
                    bluntNum = stockDetail.getBluntGoodsNum();
                    borrowNum = stockDetail.getBorrowNumber();

                    /**
                     * 更新借用数量
                     */
                    stockDetail.setBorrowNumber(borrowNum + Float.parseFloat(row.getString("borrow_number")));

                    if ("新".equals(row.getString("goods_use_status"))) {

                        stockDetail.setAvailableQuantity(aviNum - Float.parseFloat(row.getString("borrow_number")));

                    } else {

                        stockDetail.setBluntGoodsNum(bluntNum - Float.parseFloat(row.getString("borrow_number")));

                    }
                    dao.getCurrentSession().evict(stockDetailLists.get(0));
                    dao.saveOrUpdate(stockDetail);

                }

                //-------------------------
                //----------------添加物料事务处理记录------------------
                CMaterialAffairsHandle materialAffairsHandle = new CMaterialAffairsHandle();
                /*设置物料事务处理编号*/
                materialAffairsHandle.setTransactionManagerNo(Integer.parseInt(titleValue.getString("borrow_no")));
                /*设置来源类型*/
                materialAffairsHandle.setSourceType("借用-归还");
                /*设置来源*/
                //materialAffairsHandle.setSource(titleValue.getString("borrow_no") + "-" + row.getString("rownum"));
                materialAffairsHandle.setSource(titleValue.getString("cuttool_no"));//刀具号
                /*事务处理类型*/
                materialAffairsHandle.setTransactionManagerType("借用出库");
                /*事务处理活动*/
                materialAffairsHandle.setTransactionManagerActivity(titleValue.getString("borrower"));
                /*事务处理单位*/
                materialAffairsHandle.setTransactionManagerCompany("个");
                /*事务处理数量*/
                materialAffairsHandle.setTotalTransactionManager(Float.parseFloat(row.getString("borrow_number")));
                /*库房表实体类*/
                CStorageRoomDefinition storageRoomDefinition = new CStorageRoomDefinition();
                storageRoomDefinition.setStorageRoomId(roomid);
                /*库房id*/
                materialAffairsHandle.setCStorageRoomDefinition(storageRoomDefinition);
                /*物料实体类*/
                CGeneralMaterial generalMaterial = new CGeneralMaterial();
                generalMaterial.setMaterialId(materialId);
                /*物料id设置*/
                materialAffairsHandle.setCGeneralMaterial(generalMaterial);
                /*新建者*/
                materialAffairsHandle.setCreatePerson("admin");
                /*新建时间*/
                materialAffairsHandle.setCreateTime(createTime.valueOf(date));
                /*是否打印*/
                materialAffairsHandle.setStamp("否");
                dao.add(materialAffairsHandle);

            }
            //处理来源数据表
            boolean sourceCheke = jsonArray.getJSONObject(1).getBoolean("sourceCheke");
            if (sourceCheke == true) { //如果数据是从来源表中读取的则操作来源表
                System.out.println("titleValue.cuttool_no=" + titleValue.getString("cuttool_no"));
                String[] cuttool_no = titleValue.getString("cuttool_no").split("-");
                //查询来源表详细信息
                String sql = "select a.tdi_setdate,a.tdi_tool_count from c_source a where a.tc_tp2='" + cuttool_no[0] + "' ORDER BY a.tdi_setdate";
                List list = dao.createSQL(sql);
                if (list != null && list.size() > 0) {  //来源表中有数据
                    //来源表中的刀具数量是否大于0
                    int tdi_tool_count = Integer.parseInt(((HashMap) list.get(0)).get("tdi_tool_count").toString()); //刀具数量
                    String tdi_setdate = ((HashMap) list.get(0)).get("tdi_setdate").toString();  //平衡时间
                    //如果当前最小平衡时间刀具数量大于1 则减一,否则直接删除
                    if (tdi_tool_count > 1) {
                        //如果当前刀具数量大于1 则把数量减一
                        sql = "update c_source a set a.tdi_tool_count='" + (tdi_tool_count - 1) + "' where a.tc_tp2='" + cuttool_no[0] + "' and a" +
                                ".tdi_setdate='" + tdi_setdate + "'";
                    } else {
                        //如果刀具数量等于小于1 则删除该刀具来源
                        sql = "delete from c_source where tc_tp2='" + cuttool_no[0] + "' and tdi_setdate='" + tdi_setdate + "'";
                    }
                    dao.sqlUpdate(sql);
                }
            }

            result.append("result", "true");
            return result.toString();
        } catch (Exception e) {

            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            result.append("result", "false");
            return result.toString();
        }
    }

    @Override
    public List getHeadOrRow(String requestBody) {

        JSONObject upload = new JSONObject(requestBody);
        List<CCuttoolBorrowTitle> result = new ArrayList<CCuttoolBorrowTitle>();
        List<CuttoolHeadModel> headModels = new ArrayList<CuttoolHeadModel>();
        String hql = "";

        String resuleBy = upload.getString("resuleBy");
        String cuttool_taskNo = upload.getString("cuttool_taskNo");

        String borrower = upload.getString("borrower");
        String equipmentID = upload.getString("equipmentID");
        String status = upload.getString("status");
        String roomID = upload.getString("roomID");
        String cuttoolNo = upload.getString("cuttoolNo");
        String materialNo = upload.getString("materialNo");
        String createDateBegin = upload.getString("createDateBegin");
        String createDateEnd = upload.getString("createDateEnd");
        String planReturnBegin = upload.getString("planReturnBegin");
        String planReturnEnd = upload.getString("planReturnEnd");

        /**
         * 查询题头
         */
        if ("1".equals(resuleBy)) {

            hql = "select distinct cbt from CCuttoolBorrowTitle cbt,CBorrowReturn cbr " +
                    " where cbt.borrowNo=cbr.id.borrowCode ";

            /**
             * 刀具任务号
             */
            if (!cuttool_taskNo.equals("") && !cuttool_taskNo.equals("%")) {

                int borrowNo = Integer.parseInt(cuttool_taskNo);
                hql += " and cbt.borrowNo=" + borrowNo;
            }
            /**
             * 借用者
             */
            if (!borrower.equals("") && !borrower.equals("%")) {

                hql += " and cbt.borrower='" + borrower + "'";
            }
            /**
             * 机床（暂时没有做）
             */

            /*if (!equipmentID.equals("") && !equipmentID.equals("%")) {


                hql += " and cbt.equipmentId='" + equipmentID + "'";

            }*/
            /**
             * 状态
             */
            if (!"".equals(status) && !status.equals("全部")) {

                if (status.equals("已归还")) {

                    hql += " and cbt.isReturn='是' ";

                } else if (status.equals("在借")) {

                    hql += " and cbt.isReturn='否' ";
                }
            }
            /**
             * 库房
             */
            if (!roomID.equals("") && !roomID.equals("%")) {

                hql += " and cbt.CStorageRoomDefinition.storageRoomId='" + roomID + "'";
            }
            /**
             * 刀具编号
             */
            if (!cuttoolNo.equals("") && !cuttoolNo.equals("%")) {

                hql += " and cbt.CCuttoolBasedata.cuttoolNo='" + cuttoolNo + "'";

            }
            /**
             * 物料
             */
            if (!"".equals(materialNo) && !materialNo.equals("%")) {

                hql += " and cbr.CGeneralMaterial.materialNo='" + materialNo + "'";
            }
            /**
             * 日期限制
             */
            if (createDateBegin.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.createTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";

            } else if (!createDateBegin.equals("%") && createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.createTime,'%Y%m%d')>=DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d')";

            } else if (!createDateBegin.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.createTime,'%Y%m%d') between DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            }

            if (planReturnBegin.equals("%") && !planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.planReturnTime,'%Y%m%d')<=DATE_FORMAT('" + planReturnEnd + " 00:00:00','%Y%m%d')";

            } else if (!planReturnBegin.equals("%") && planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.planReturnTime,'%Y%m%d')>=DATE_FORMAT('" + planReturnBegin + " 00:00:00','%Y%m%d')";

            } else if (!planReturnBegin.equals("%") && !planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbt.planReturnTime,'%Y%m%d') between DATE_FORMAT('" + planReturnBegin + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + planReturnEnd + " 00:00:00','%Y%m%d')";
            }

            result = dao.executeQuery(hql);

            if (result.size() > 0) {

                for (int i = 0; i < result.size(); i++) {

                    CCuttoolBorrowTitle borrowTitle = new CCuttoolBorrowTitle();

                    CuttoolHeadModel headModel = new CuttoolHeadModel();

                    borrowTitle = result.get(i);

                    headModel.setBorrowNo(borrowTitle.getBorrowNo());
                    headModel.setBorrower(borrowTitle.getBorrower());

                    //如果是整体刀具模式则获取刀具编号
                    String isTotalBorrow = borrowTitle.getType();

                    if ("整体刀具模式".equals(isTotalBorrow)) {

                        headModel.setCNo(borrowTitle.getCCuttoolBasedata().getCuttoolNo());
                        headModel.setCDes(borrowTitle.getCCuttoolBasedata().getCuttoolDescription());

                    }

                    headModel.setWorkOrderNo(borrowTitle.getWorkOrderNo());
                    headModel.setEquipmentId(borrowTitle.getEquipmentId());
                    headModel.setCreateTime(borrowTitle.getCreateTime());
                    headModel.setBorrowTime(borrowTitle.getBorrowTime());
                    headModel.setPlanReturnTime(borrowTitle.getPlanReturnTime());
                    headModel.setSurplusLifetime(borrowTitle.getSurplusLifetime());
                    headModel.setReturnTime(borrowTitle.getReturnTime());

                    if (borrowTitle.getEquipmentId() != null) {

                        int eid = borrowTitle.getEquipmentId();
                        List<CMechanicalEquipment> equlist = new ArrayList<CMechanicalEquipment>();
                        CMechanicalEquipment equipment = new CMechanicalEquipment();
                        equlist = dao.executeQuery("from CMechanicalEquipment cme where cme.mechanicalId='" + eid + "'");

                        if (equlist.size() > 0) {

                            equipment = equlist.get(0);
                            headModel.setEquipmentName(equipment.getEquipmentName());
                        }
                    }
                    headModels.add(headModel);
                }
            }
            return headModels;

            /**
             * 归还行
             */
        } else if ("2".equals(resuleBy)) {

            hql = "select distinct cbr from CBorrowReturn cbr where ";

            /**
             * 刀具任务号
             */
            if (!cuttool_taskNo.equals("") && !cuttool_taskNo.equals("%")) {

                int borrowNo = Integer.parseInt(cuttool_taskNo);
                hql += " cbr.id.borrowCode=" + borrowNo;

            } else {

                hql += " cbr.id.borrowCode like '%' ";
            }

            /**
             * 借用者
             */
            if (!borrower.equals("") && !borrower.equals("%")) {

                hql += " and cbr.createPerson='" + borrower + "'";
            }
            /**
             * 机床id 暂时没有处理
             */

            /**
             * 物料
             */
            if (!materialNo.equals("") && !materialNo.equals("%")) {

                hql += " and cbr.CGeneralMaterial.materialNo='" + materialNo + "'";

            }
            /**
             * 状态
             */
            if (!"".equals(status) && !status.equals("全部")) {

                if (status.equals("已归还")) {

                    hql += " and cbr.CCuttoolBorrowTitle.isReturn='是' ";

                } else if (status.equals("在借")) {

                    hql += " and cbr.CCuttoolBorrowTitle.isReturn='否' ";
                }
            }
            /**
             * 刀具
             */
            if (!"".equals(cuttoolNo) && !cuttoolNo.equals("%")) {

                hql += " and cbr.CCuttoolBorrowTitle.CCuttoolBasedata.cuttoolNo='" + cuttoolNo + "'";
            }
            /**
             * 库房
             */
            if (!"".equals(roomID) && !roomID.equals("%") && roomID != null) {

                hql += " and cbr.CCuttoolBorrowTitle.CStorageRoomDefinition.storageRoomId='" + cuttoolNo + "'";
            }
            /**
             * 日期控制
             */
            if (createDateBegin.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.createTime,'%Y%m%d')<=DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";

            } else if (!createDateBegin.equals("%") && createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.createTime,'%Y%m%d')>=DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d')";

            } else if (!createDateBegin.equals("%") && !createDateEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.createTime,'%Y%m%d') between DATE_FORMAT('" + createDateBegin + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + createDateEnd + " 00:00:00','%Y%m%d')";
            }

            if (planReturnBegin.equals("%") && !planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.planReturnTime,'%Y%m%d')<=DATE_FORMAT('" + planReturnEnd + " 00:00:00','%Y%m%d')";

            } else if (!planReturnBegin.equals("%") && planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.planReturnTime,'%Y%m%d')>=DATE_FORMAT('" + planReturnBegin + " 00:00:00','%Y%m%d')";

            } else if (!planReturnBegin.equals("%") && !planReturnEnd.equals("%")) {

                hql += " and DATE_FORMAT(cbr.planReturnTime,'%Y%m%d') between DATE_FORMAT('" + planReturnBegin + " 00:00:00','%Y%m%d') " +
                        " and DATE_FORMAT('" + planReturnEnd + " 00:00:00','%Y%m%d')";
            }

            List<CBorrowReturn> rowlist = dao.executeQuery(hql);

            List<CuttoolRowModel> row = new ArrayList<CuttoolRowModel>();

            if (rowlist.size() > 0) {

                for (int i = 0; i < rowlist.size(); i++) {

                    CBorrowReturn borrowReturn = new CBorrowReturn();
                    CuttoolRowModel rowModel = new CuttoolRowModel();

                    borrowReturn = rowlist.get(i);
                    rowModel.setBorrowCode(borrowReturn.getId().getBorrowCode());
                    String hql2 = "select distinct cbt from CCuttoolBorrowTitle cbt where cbt.borrowNo=" + borrowReturn.getId().getBorrowCode();

                    dao.executeQuery(hql2);

                    CCuttoolBorrowTitle cuttoolBorrowTitle = new CCuttoolBorrowTitle();
                    List<CCuttoolBorrowTitle> cbtlist = new ArrayList<CCuttoolBorrowTitle>();
                    cbtlist = dao.executeQuery(hql2);
                    cuttoolBorrowTitle = cbtlist.get(0);

                    if (cuttoolBorrowTitle.getCCuttoolBasedata() != null) {

                        String cno = cuttoolBorrowTitle.getCCuttoolBasedata().getCuttoolNo();
                        rowModel.setCuttoolNo(cno);
                        rowModel.setWorkno(cuttoolBorrowTitle.getWorkOrderNo());
                        if (cuttoolBorrowTitle.getSurplusLifetime() != null) {

                            rowModel.setSurplusLifetime(cuttoolBorrowTitle.getSurplusLifetime());

                        }
                    }
                    if (cuttoolBorrowTitle.getEquipmentId() != null) {

                        int equipmentid = cuttoolBorrowTitle.getEquipmentId();
                        List<CMechanicalEquipment> equipmentList = new ArrayList<CMechanicalEquipment>();
                        CMechanicalEquipment equipment = new CMechanicalEquipment();
                        equipmentList = dao.executeQuery("from CMechanicalEquipment cme where cme.mechanicalId='" + equipmentid + "'");

                        if (equipmentList.size() > 0) {

                            equipment = equipmentList.get(0);
                            rowModel.setEquipmentName(equipment.getEquipmentName());
                        }
                    }
                    /**
                     * 获取物料默认版本
                     */
                    List<String> versionList = dao.executeQuery("select cmv.versionExplain as versionExplain from CGeneralMaterial cgm,CMaterialVersion cmv " +
                            " where cgm.materialId=cmv.id.materialId " +
                            " and cgm.materialNo='" + borrowReturn.getCGeneralMaterial().getMaterialNo() + "' " +
                            " and cmv.defaultVersionOrnot=1 ");

                    String version = "";
                    if (versionList.size() > 0 && versionList.get(0) != null) {

                        version = versionList.get(0);
                    }
                    rowModel.setMaterialNo(borrowReturn.getCGeneralMaterial().getMaterialNo());
                    rowModel.setMaterialDes(borrowReturn.getCGeneralMaterial().getMaterialDescribe());
                    rowModel.setMaterialBrand(version);
                    rowModel.setBorrowNumber(borrowReturn.getBorrowNumber());
                    rowModel.setReturnNumber(borrowReturn.getReturnNumber());
                    rowModel.setScrapNumber(borrowReturn.getScrapNumber());
                    rowModel.setScrapNum(borrowReturn.getScrapNumber());
                    rowModel.setBorrower(borrowReturn.getCreatePerson());
                    rowModel.setCreateTime(borrowReturn.getCreateTime());
                    rowModel.setBorrowDate(borrowReturn.getBorrowDate());
                    rowModel.setReturnDate(borrowReturn.getReturnDate());
                    rowModel.setPlanReturnTime(borrowReturn.getPlanReturnTime());
                    rowModel.setGoodsAllocationId(borrowReturn.getGoodsAllocationId());
                    row.add(rowModel);
                }
            }
            return row;
        }
        return null;
    }

    @Override
    public List getRowByBorrowNo(String requestBody) {

        JSONObject upload = new JSONObject(requestBody);
        String borrowNo = upload.getString("cuttool_taskNo");
        String cuttoolNo = upload.getString("cuttoolNo");

        String hql = "";
        String hql2 = "";

        /**
         * 刀具发放
         */
        if ("".equals(cuttoolNo)) {

            hql = " from CBorrowReturn cbr where cbr.id.borrowCode='" + borrowNo + "'";

            hql2 = " from CCuttoolBorrowTitle cbt where cbt.borrowNo='" + borrowNo + "'";

            /**
             * 刀具归还
             */
        } else {

            hql = "from CBorrowReturn cbr " +
                    " where cbr.id.borrowCode='" + borrowNo + "'";
                    /*" and cbr.CCuttoolBorrowTitle.isReturn='否'";*/

            hql2 = "from CCuttoolBorrowTitle cbt " +
                    " where cbt.borrowNo='" + borrowNo + "'";
                    /*" and cbt.isReturn='否' ";*/

        }


        List<CBorrowReturn> rowlist = new ArrayList<CBorrowReturn>();
        List<CuttoolRowModel> row = new ArrayList<CuttoolRowModel>();
        List<CCuttoolBorrowTitle> titleList = new ArrayList<CCuttoolBorrowTitle>();

        titleList = dao.executeQuery(hql2);

        CCuttoolBorrowTitle title = titleList.get(0);

        int roomID = title.getCStorageRoomDefinition().getStorageRoomId();

        rowlist = dao.executeQuery(hql);

        if (rowlist.size() > 0) {

            for (int i = 0; i < rowlist.size(); i++) {

                CBorrowReturn borrowReturn = new CBorrowReturn();
                CuttoolRowModel rowModel = new CuttoolRowModel();

                if (title.getCCuttoolBasedata() != null) {

                    if (title.getCCuttoolBasedata().getCuttoolNo() != null) {

                        rowModel.setCuttoolNo(title.getCCuttoolBasedata().getCuttoolNo());

                    }
                    if (title.getSurplusLifetime() != null) {

                        rowModel.setSurplusLifetime(title.getSurplusLifetime());

                    }

                }
                if (title.getType() != null) {

                    rowModel.setType(title.getType());

                }
                if (title.getEquipmentId() != null) {

                    int equipmentid = title.getEquipmentId();
                    List<CMechanicalEquipment> equipmentList = new ArrayList<CMechanicalEquipment>();
                    CMechanicalEquipment equipment = new CMechanicalEquipment();
                    equipmentList = dao.executeQuery("from CMechanicalEquipment cme where cme.mechanicalId='" + equipmentid + "'");

                    if (equipmentList.size() > 0) {

                        equipment = equipmentList.get(0);
                        rowModel.setEquipmentName(equipment.getEquipmentName());

                    }
                }
                borrowReturn = rowlist.get(i);
                String hql3 = "from CStorageRoomDefinition c where c.storageRoomId=" + roomID;
                List<CStorageRoomDefinition> roomLists = new ArrayList<CStorageRoomDefinition>();
                CStorageRoomDefinition room = new CStorageRoomDefinition();
                roomLists = dao.executeQuery(hql3);
                room = roomLists.get(0);
                rowModel.setGoodsNo(room.getStorageRoomNo());
                rowModel.setRownum(borrowReturn.getId().getRownum());
                rowModel.setCreatePerson(borrowReturn.getCreatePerson());
                rowModel.setMaterialNo(borrowReturn.getCGeneralMaterial().getMaterialNo());
                //编码主体标记
                if (title.getCCuttoolBasedata() != null) {

                    if (title.getCCuttoolBasedata().getCuttoolNo() != null) {

                        String cno = rowModel.getCuttoolNo();
                        int mid = borrowReturn.getCGeneralMaterial().getMaterialId();
                        String bmhql = "select ca.encodingBody from CCuttoolAssembly ca where ca.cuttoolNo='" + cno + "' and material_id="
                                + mid;
                        int isEncodingBody = (Integer) dao.executeQuery(bmhql).get(0);

                        if (isEncodingBody == 1) {

                            rowModel.setIsEncodingBody(1);

                        } else {

                            rowModel.setIsEncodingBody(0);

                        }
                    }
                }
                rowModel.setMaterialDes(borrowReturn.getCGeneralMaterial().getMaterialDescribe());
                rowModel.setMaterialUnit(borrowReturn.getCGeneralMaterial().getMaterialUnit());
                rowModel.setBorrowNumber(borrowReturn.getBorrowNumber());
                rowModel.setReturnNumber(borrowReturn.getReturnNumber());
                rowModel.setScrapNum(borrowReturn.getScrapNumber());
                rowModel.setCreateTime(borrowReturn.getCreateTime());
                rowModel.setMaterialBrand(borrowReturn.getMaterialVersionDes());
                //                rowModel.setMaterialBrand(borrowReturn.);
                rowModel.setBorrowDate(borrowReturn.getBorrowDate());
                rowModel.setPlanReturnTime(borrowReturn.getPlanReturnTime());
                rowModel.setReturnDate(borrowReturn.getReturnDate());
                rowModel.setGoodsAllocationId(borrowReturn.getGoodsAllocationId());

                if (borrowReturn.getGoodsAllocationId() != null) {

                    String ghql = "select ccsd.cargoSpaceNo from CCargoSpaceDefinition ccsd where ccsd.cargoSpaceId=" + borrowReturn
                            .getGoodsAllocationId();
                    String goodAllocationNo = (String) dao.executeQuery(ghql).get(0);
                    rowModel.setGoodsAllocationNo(goodAllocationNo);

                }

                row.add(rowModel);

            }
        }
        return row;
    }

    @Override
    public String saveReturnMsg(String uploadValue) {

        JSONObject upload = new JSONObject(uploadValue);
        JSONObject result = new JSONObject();
        try {

            JSONObject titleJson = upload.getJSONObject("title");
            JSONArray rowArray = upload.getJSONArray("rowVal");

            /**
             * 更新日期
             */
            String date = sdf.format(new Date());
            Timestamp createTime = null;

            List<CCuttoolBorrowTitle> titleList = null;
            CCuttoolBorrowTitle title = null;

            String titleHql = "select distinct cbt " +
                    " from CCuttoolBorrowTitle cbt " +
                    " where cbt.borrowNo='" + titleJson.getString("borrowNo") + "'";

            titleList = dao.executeQuery(titleHql);

            title = titleList.get(0);

             /*归还题头 归还时间*/
            title.setReturnTime(createTime.valueOf(date));
            /*归还题头 更新时间*/
            title.setUpdateTime(createTime.valueOf(date));
            /*归还题头 更新人*/
            title.setUpdatePerson(titleJson.getString("username"));
//            if (title.getType().equals("整体刀具模式")) {
//                title.setIsReturn("是");
//            }

            for (int i = 0; i < rowArray.length(); i++) {

                JSONObject rowJson = rowArray.getJSONObject(i);

                List<CBorrowReturn> list = null;
                CBorrowReturn cbr = null;

                String hql = "from CBorrowReturn br " +
                        " where br.id.borrowCode='" + titleJson.getString("borrowNo") + "' " +
                        " and br.id.rownum='" + rowJson.getString("rowNo") + "'";


                list = dao.executeQuery(hql);
                cbr = list.get(0);

                Float returnNum = cbr.getReturnNumber();
                if (returnNum == null) {

                    returnNum = 0f;

                }

			    /*归还行 归还时间*/
                cbr.setReturnDate(createTime.valueOf(date));
                /*归还行 归还数量*/
                cbr.setReturnNumber(rowJson.getInt("returnNum") + returnNum);
                if(rowJson.getInt("returnNum") + returnNum == cbr.getBorrowNumber()){
                    title.setIsReturn("是");
                }
                /*归还行 更新时间*/
                cbr.setUpdateTime(createTime.valueOf(date));
                /*归还行 更新人*/
                cbr.setUpdatePerson(titleJson.getString("username"));

                /**
                 * 删除归还数据缓存
                 */
                dao.getCurrentSession().evict(list.get(0));
                /**
                 * 重新保存
                 */
                dao.saveOrUpdate(cbr);

                //---change start======
                List<CStorageRoomDefinition> roomlist = null;
                CStorageRoomDefinition room = null;
                String hqlRoom = "from CStorageRoomDefinition room where room.storageRoomNo='" + titleJson.getString("roomNo") + "'";

                roomlist = dao.executeQuery(hqlRoom);
                room = roomlist.get(0);

                int roomid = room.getStorageRoomId();

                Integer materialId = (Integer) dao.executeQuery("select cgm.materialId " +
                        " from CGeneralMaterial cgm " +
                        " where cgm.materialNo='" + rowJson.getString("materialNo").trim() + "'").get(0);

                String goodallocationNo = rowJson.getString("goodPlace");

                /**
                 * 更新库存
                 */
                String hqlStock = "from CStockList c " +
                        " where c.id.stockId='" + roomid + "' " +
                        " and c.id.materialId='" + materialId + "'";

                List<CStockList> stockLists = null;
                CStockList stock = null;

                stockLists = dao.executeQuery(hqlStock);
                stock = stockLists.get(0);

                Float bluntNum = stock.getBluntGoodsNum();
                Float borrowNum = stock.getBorrowNumber();
                Float availableNum = stock.getAvailableQuantity();
                String isNew = rowJson.getString("isNew");

                if ("新".equals(isNew)) {

                    stock.setAvailableQuantity(availableNum + rowJson.getInt("returnNum"));

                } else {

                    stock.setBluntGoodsNum(bluntNum + rowJson.getInt("returnNum"));
                }

                stock.setBorrowNumber(borrowNum - rowJson.getInt("returnNum"));

                /**
                 * 删除库存缓存对象
                 */
                dao.getCurrentSession().evict(stockLists.get(0));
                dao.saveOrUpdate(stock);

                /**
                 * 更新库存明细
                 */
                if (!"".equals(goodallocationNo) && goodallocationNo != null) {

                    String hqlStockDetail = "from CStockDetailList c " +
                            " where c.id.stockId='" + roomid + "' " +
                            " and c.id.materialId='" + materialId + "' " +
                            " and c.id.goodsAllocationNo='" + goodallocationNo + "'";

                    List<CStockDetailList> stockDetailLists = null;
                    CStockDetailList stockDetail = null;
                    stockDetailLists = dao.executeQuery(hqlStockDetail);
                    stockDetail = stockDetailLists.get(0);

                    bluntNum = stockDetail.getBluntGoodsNum();
                    borrowNum = stockDetail.getBorrowNumber();
                    availableNum = stockDetail.getAvailableQuantity();
                    isNew = rowJson.getString("isNew");

                    if ("新".equals(isNew)) {

                        stockDetail.setAvailableQuantity(availableNum + rowJson.getInt("returnNum"));

                    } else {

                        stockDetail.setBluntGoodsNum(bluntNum + rowJson.getInt("returnNum"));

                    }
                    stockDetail.setBorrowNumber(borrowNum - rowJson.getInt("returnNum"));

                    /**
                     * 删除库存明细对象缓存
                     */
                    dao.getCurrentSession().evict(stockDetailLists.get(0));
                    dao.saveOrUpdate(stockDetail);

                }

                //----------------添加物料事务处理记录------------------
                CMaterialAffairsHandle materialAffairsHandle = new CMaterialAffairsHandle();
                /*设置物料事务处理编号*/
                materialAffairsHandle.setTransactionManagerNo(Integer.parseInt(titleJson.getString("borrowNo")));
                /*设置来源类型*/
                materialAffairsHandle.setSourceType("借用-归还");
                /*设置来源*/
                //materialAffairsHandle.setSource(titleJson.getString("borrowNo") + "-" + rowJson.getString("rowNo"));
                materialAffairsHandle.setSource(titleJson.getString("cuttool_no"));//刀具号
                /*事务处理类型*/
                materialAffairsHandle.setTransactionManagerType("归还入库");
                /*事务处理活动*/
                materialAffairsHandle.setTransactionManagerActivity(titleJson.getString("returnPerson"));
                /*事务处理单位*/
                materialAffairsHandle.setTransactionManagerCompany("个");
                /*事务处理数量*/
                materialAffairsHandle.setTotalTransactionManager((float) rowJson.getInt("returnNum"));
                /*库房表实体类*/
                CStorageRoomDefinition storageRoomDefinition = new CStorageRoomDefinition();
                storageRoomDefinition.setStorageRoomId(roomid);
                /*库房id*/
                materialAffairsHandle.setCStorageRoomDefinition(storageRoomDefinition);
                /*物料实体类*/
                CGeneralMaterial generalMaterial = new CGeneralMaterial();
                generalMaterial.setMaterialId(materialId);
                /*物料id设置*/
                materialAffairsHandle.setCGeneralMaterial(generalMaterial);
                /*新建者*/
                materialAffairsHandle.setCreatePerson("admin");
                /*新建时间*/
                Timestamp returnCreateTime = null;
                String date2 = sdf.format(new Date());
                materialAffairsHandle.setCreateTime(returnCreateTime.valueOf(date2));
                /*是否打印*/
                materialAffairsHandle.setStamp("否");

                dao.add(materialAffairsHandle);

            }
            /**
             * 删除缓存以后重新保存题头数据
             */
            dao.getCurrentSession().evict(titleList.get(0));
            dao.saveOrUpdate(title);

            result.append("result", "true");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            /**
             * 回滚
             */
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            result.append("result", e.getMessage());
            return result.toString();
        }
    }

    @Override
    public String setTaskNo(String uploadJson) {

        JSONObject upload = new JSONObject(uploadJson);
        JSONObject result = new JSONObject();
        List<Integer> list;
        String date = sdfDate.format(new Date()).toString();
        String taskNo = upload.getString("taskNo");

        String sql = "select MAX(cbt.borrowNo) from CCuttoolBorrowTitle cbt";
        list = dao.executeQuery(sql);
        //判断是否已有单号，无则按日期新增
        if (list.get(0) != null) {
            //            有则判断最大值是否在今天
            String taskNo1 = list.get(0).toString();
            int intMaxNo = Integer.parseInt(taskNo1.substring(0, 6));
            int intNowDate = Integer.parseInt(date.substring(2, date.length()));
            if ((intNowDate - intMaxNo) > 0) {

                String subDate1 = date.substring(2, date.length());
                result.append("taskNo", subDate1 + "001");

            } else {

                int intNo = list.get(0);
                date.substring(2, date.length());
                result.append("taskNo", intNo + 1);
            }

        } else {

            String subDate = date.substring(2, date.length());
            result.append("taskNo", subDate + "001");
        }
        return result.toString();
    }

    @Override
    public Object canBorrowOrNot(String cuttoolNo) {

        JSONObject result = new JSONObject();

        String hql = "select cbt.borrowNo " +
                " from CCuttoolBorrowTitle cbt " +
                " where cbt.CCuttoolBasedata.cuttoolNo='" + cuttoolNo + "' " +
                " and cbt.isReturn='否' ";

        List list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            result.append("result", "true");

        } else {

            result.append("result", "false");

        }

        return result.toString();
    }
}
