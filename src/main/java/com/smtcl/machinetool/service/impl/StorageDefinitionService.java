package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CRegist;
import com.smtcl.machinetool.models.machinetool.CStorageRoomDefinition;
import com.smtcl.machinetool.service.IStorageDefinitionService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by SunJun on 2016/3/2.
 */
@Service
public class StorageDefinitionService implements IStorageDefinitionService {

    @Autowired
    IGenericDAO dao;

    @Override
    public List storageSearch(String storageNo, String storageExplain, String storageState) {

        String hql = "from CStorageRoomDefinition ";

        if (storageNo.equals("") || storageExplain.equals("") || storageState.equals("")) {

            if (storageNo.equals("") && !storageExplain.equals("") && !storageState.equals("")) {

                if (storageExplain.indexOf("%") != -1) {

                    hql += "csd where csd.storageRoomDescribe like '" + storageExplain + "' ";
                } else {

                    hql += "csd where csd.storageRoomDescribe='" + storageExplain + "' ";
                }

                hql += "and csd.storageRoomState='" + storageState + "'";

            }
            if (!storageNo.equals("") && storageExplain.equals("") && !storageState.equals("")) {

                if (storageNo.indexOf("%") != -1) {

                    hql += "csd where csd.storageRoomNo like '" + storageNo + "' ";
                } else {

                    hql += "csd where csd.storageRoomNo='" + storageNo + "' ";
                }

                hql += "and csd.storageRoomState='" + storageState + "'";

            }
            if (!storageNo.equals("") && !storageExplain.equals("") && storageState.equals("")) {

                if (storageNo.indexOf("%") != -1) {

                    hql += "csd where csd.storageRoomNo like '" + storageNo + "' ";
                } else {

                    hql += "csd where csd.storageRoomNo='" + storageNo + "' ";
                }
                if (storageExplain.indexOf("%") != -1) {

                    hql += "and csd.storageRoomDescribe like '" + storageExplain + "' ";
                } else {

                    hql += "and csd.storageRoomDescribe='" + storageExplain + "' ";
                }
            }
            if (storageNo.equals("") && storageExplain.equals("") && !storageState.equals("")) {

                hql += "csd where csd.storageRoomState='" + storageState + "' ";
            }
            if (storageNo.equals("") && !storageExplain.equals("") && storageState.equals("")) {

                if (storageExplain.indexOf("%") != -1) {

                    hql += "csd where csd.storageRoomDescribe like '" + storageExplain + "' ";
                } else {

                    hql += "csd where csd.storageRoomDescribe='" + storageExplain + "' ";
                }
            }
            if (!storageNo.equals("") && storageExplain.equals("") && storageState.equals("")) {

                if (storageNo.indexOf("%") != -1) {

                    hql += "csd where csd.storageRoomNo like '" + storageNo + "' ";
                } else {

                    hql += "csd where csd.storageRoomNo='" + storageNo + "' ";
                }
            }

        } else {

            if (storageNo.indexOf("%") != -1) {

                hql += "csd where csd.storageRoomNo like '" + storageNo + "' ";
            } else {

                hql += "csd where csd.storageRoomNo='" + storageNo + "' ";
            }
            if (storageExplain.indexOf("%") != -1) {

                hql += "and csd.storageRoomDescribe like '" + storageExplain + "' ";
            } else {

                hql += "and csd.storageRoomDescribe='" + storageExplain + "' ";
            }
            hql += "and csd.storageRoomState='" + storageState + "'";
        }

        List result = new ArrayList();
        result.add(dao.executeQuery(hql));
        result.add(dao.executeQuery("from CPersonnel"));

        return result;

    }

    @Override
    public List getPerson() {

        return dao.executeQuery("from CPersonnel");
    }

    @Override
    public void storageDelete(String storageId) {

        CStorageRoomDefinition cStorageRoomDefinition = new CStorageRoomDefinition();
        cStorageRoomDefinition.setStorageRoomId(Integer.parseInt(storageId));
        dao.delete(cStorageRoomDefinition);
    }

    @Override
    public String storageUpload(String upload) {

        JSONObject result = new JSONObject();
        JSONArray uploadValue = new JSONArray(upload);
        JSONArray updateStorage = uploadValue.getJSONObject(0).getJSONArray("update");//update 库房数据
        JSONArray deleteStorage = uploadValue.getJSONObject(0).getJSONArray("delete");//delete库房数据

        try {

            for (int i = 0; i < updateStorage.length(); i++) {

                CStorageRoomDefinition cStorageRoomDefinition = new CStorageRoomDefinition();
                JSONObject jsonObject = updateStorage.getJSONObject(i);

                cStorageRoomDefinition.setStorageRoomNo(jsonObject.getString("storageNo"));
                cStorageRoomDefinition.setStorageRoomDescribe(jsonObject.getString("storageName"));
                cStorageRoomDefinition.setStorageRoomState(jsonObject.getString("storageState"));
                cStorageRoomDefinition.setCouldNet(jsonObject.getString("couldNet"));
                if (!jsonObject.getString("invalidDate").equals("")) {

                    cStorageRoomDefinition.setInvalidDate(Timestamp.valueOf(jsonObject.getString("invalidDate") + " 00:00:00"));

                }
                cStorageRoomDefinition.setPlanMethod(jsonObject.getString("planMethod"));
                cStorageRoomDefinition.setPositionControl(jsonObject.getString("storageControl"));
                cStorageRoomDefinition.setStorageRoomPosition(jsonObject.getString("storageSpace"));
                cStorageRoomDefinition.setPrincipalCustodian(jsonObject.getString("principalCustodian"));
                /*是否是立体库*/
                cStorageRoomDefinition.setIsStereoLibrary(jsonObject.getInt("stereoLibrary"));
                cStorageRoomDefinition.setCreator(jsonObject.getString("creater"));

                if (!jsonObject.get("storageId").equals("null")) {

                    Integer storageId = Integer.parseInt(jsonObject.get("storageId").toString());
                    cStorageRoomDefinition.setStorageRoomId(storageId);

                    dao.saveOrUpdate(cStorageRoomDefinition);

                } else {

                    dao.add(cStorageRoomDefinition);

                }

            }
            /*标志位*/
            for (int i = 0; i < deleteStorage.length(); i++) {

                CStorageRoomDefinition cStorageRoomDefinition = new CStorageRoomDefinition();
                JSONObject jsonObject = deleteStorage.getJSONObject(i);

                try {

                    dao.executeQuery("delete from CStorageRoomDefinition csrd " +
                            " where csrd.storageRoomNo='" + jsonObject.getString("storageNo") + "'");

                } catch (Exception e) {

                    e.printStackTrace();
                    result.append("result", "库房编号：" + jsonObject.getString("storageNo") + "删除失败！库房已被使用！");
                    return result.toString();

                }
            }

            result.append("result", "SUCCESS");

            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();
        }

    }

    @Override
    public String searchByid(String Json) {

        String roomNo = "";
        String isLitiku = "";
        JSONObject res = new JSONObject();
        JSONObject jsonObject = new JSONObject(Json);
        String hql1 = "from CRegist creg where creg.name='" + jsonObject.getString("person") + "'";
        List<CRegist> regists = dao.executeQuery(hql1);

        if (regists.get(0).getStorageRoomId() != null) {

            int room = regists.get(0).getStorageRoomId();
            String hql = " from CStorageRoomDefinition csrd " +
                    " where csrd.storageRoomId=" + room;
            List<CStorageRoomDefinition> roomList = dao.executeQuery(hql);
            roomNo = roomList.get(0).getStorageRoomNo();
            isLitiku = roomList.get(0).getIsStereoLibrary().toString();

        }

        res.append("roomNo", roomNo);
        res.append("isLitiku", isLitiku);
        return res.toString();
    }

    @Override
    public Object storageNoSearch(String storageNo) {

        JSONObject resut = new JSONObject();

        List searchNo = dao.executeQuery("select csrd.storageRoomId " +
                " from CStorageRoomDefinition csrd " +
                " where csrd.storageRoomNo='" + storageNo + "'");

        if (searchNo.size() > 0 && searchNo.get(0) != null) {

            resut.append("result", "true");
            return resut.toString();

        } else {

            resut.append("result", "false");
            return resut.toString();
        }

    }

    @Override
    public Object storageOccupySearch(String storageId, String storageNo) {

        int flag = 0;
        JSONObject result = new JSONObject();
        String hql = "select cal.acceptWarehouseId from CApplicationLine cal where cal.acceptWarehouseId='" + storageId + "'";
        List list = dao.executeQuery(hql);
        /**
         * 采购申请行
         */
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 采购申请 ");
        }

        /**
         * 库位表
         */
        hql = "select ccsd.CStorageRoomDefinition.storageRoomId from CCargoSpaceDefinition ccsd where ccsd.CStorageRoomDefinition.storageRoomId='" +
                storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 库位 ");
        }
        /**
         * 刀具借用题头
         */
        hql = "select ccbt.CStorageRoomDefinition.storageRoomId from CCuttoolBorrowTitle ccbt where ccbt.CStorageRoomDefinition.storageRoomId='" +
                storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 刀具借用题头 ");
        }
        /**
         * 发料题头
         */
        hql = "select cit.storageRoomId from CIssueTitle cit where cit.storageRoomId='" + storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 发料题头 ");
        }

        /**
         * 订单题头
         */
        hql = "select coh.accepteStorageRoomId from COrderHead coh where coh.accepteStorageRoomId='" + storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 订单题头 ");
        }
        /**
         * 订单接受
         */
        hql = "select coa.acceptStorageRoomId from COrderAccept coa where coa.acceptStorageRoomId='" + storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 订单接受 ");
        }
        /**
         * 用户注册表
         */
        hql = "select cr.storageRoomId from CRegist cr where cr.storageRoomId='" + storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", "用户注册");
        }
        /**
         * 物料事务处理
         */
        hql = "select cma.CStorageRoomDefinition.storageRoomId from CMaterialAffairsHandle cma " +
                " where cma.CStorageRoomDefinition.storageRoomId='" + storageId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", "物料事务处理");
        }

        /**
         * 判断是否被占用
         */
        if (flag == 0) {

            result.append("result", "true");
        }
        return result.toString();
    }

    @Override
    public Object storageLocationOccupySearch(String storageRoomId, String storageLocationId, String storageLocationNo) {

        int flag = 0;
        JSONObject result = new JSONObject();
        String hql = "select cbr.goodsAllocationId from CBorrowReturn cbr where cbr.goodsAllocationId='" + storageLocationId + "'";
        List list;

        /**
         * 借用归还表
         */
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 借用归还 ");
        }

        /**
         * 刀具消耗表
         */

        hql = "select ccc.goodsAllocationId from CCuttoolConsumption ccc " +
                " where ccc.storageRoomId='" + storageRoomId + "' " +
                " and ccc.goodsAllocationId='" + storageLocationId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 刀具消耗 ");
        }

        /**
         * 订单接受表
         */
        hql = "select coa.cargoSpaceId from COrderAccept coa " +
                " where coa.acceptStorageRoomId='" + storageRoomId + "' " +
                " and coa.cargoSpaceId='" + storageLocationId + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 订单接受 ");
        }

        /**
         * 库存明细表
         */
        hql = "select csd.id.goodsAllocationNo from CStockDetailList csd " +
                " where csd.id.stockId='" + storageRoomId + "' " +
                " and csd.id.goodsAllocationNo='" + storageLocationNo + "'";
        list.clear();
        list = dao.executeQuery(hql);
        if (list.size() > 0 && list.get(0) != null) {

            flag = 1;
            result.append("result", " 库存明细 ");
        }

        if (flag == 0) {

            result.append("result", "true");
        }
        return result.toString();
    }

    @Override
    public String isLitiku(String json) {

        JSONObject jsonObject = new JSONObject(json);
        JSONObject res = new JSONObject();
        String roomNo = jsonObject.getString("croomNo");
        String hql = "from CStorageRoomDefinition csrd where csrd.storageRoomNo='" + roomNo + "'";
        List<CStorageRoomDefinition> roomList = new ArrayList<CStorageRoomDefinition>();
        CStorageRoomDefinition room = new CStorageRoomDefinition();
        roomList = dao.executeQuery(hql);
        if (roomList.size() > 0) {
            room = roomList.get(0);
            if (room.getIsStereoLibrary() == 0) {
                res.append("res", "no");
            } else {
                res.append("res", "yes");
            }
            return res.toString();
        } else {
            res.append("res", "no");
            return res.toString();
        }
    }

    @Override
    public Object searchStorageNoById(String storageId) {

        JSONObject result = new JSONObject();

        try {

            String storageNo = dao.executeQuery("select csd.storageRoomNo from CStorageRoomDefinition csd where csd.storageRoomId='" + storageId + "'").get(0).toString();
            result.append("result", "true");
            result.append("resultData", storageNo);

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
        }
        return result.toString();
    }
}
