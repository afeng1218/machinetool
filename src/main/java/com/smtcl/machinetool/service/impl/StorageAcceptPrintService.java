package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by SunJun on 2016/7/25.
 */
@Service
public class StorageAcceptPrintService implements IStorageAcceptPrintService {

    @Autowired
    IGenericDAO dao;

    @Override
    public Object getAllStorageAcceptList(String requestBody) {

        try {

            List result = null;
            List returnData = new ArrayList();
            JSONObject request = new JSONObject(requestBody);

			/*订单号*/
            String orderNo = request.getString("orderNo");
            /*采购员*/
            String buyer = request.getString("buyer");
            /*PRNo*/
            String PRNo = request.getString("PRNo");
            /*库房编号*/
            String storageNo = request.getString("storageNo");
            /*供应商*/
            String supplier = request.getString("supplier");
            /*是否已打印*/
            String isPrint = request.getString("isPrint");
            /*入库开始时间*/
            String createDateBegin = request.getString("createDateBegin");
            /*入库结束时间*/
            String createDateEnd = request.getString("createDateEnd");

            List<Integer> list = dao.createSQLQuery("select distinct cmah.transaction_manager_no " +
                    " from c_material_affairs_handle cmah " +
                    " where cmah.transaction_manager_type='接受入库' " +
                    " group by cmah.transaction_manager_no");

            for (int i = 0; i < list.size(); i++) {

                String sql = "select distinct coh.accept_order_side as acceptOrderSide, coh.supplier as supplier,coh.material_class as materialClass," +
                        " coh.PR_no as prNo,cgm.material_no as materialNo,cgm.material_describe as materialDescribe," +
                        " cgm.material_unit as materialUnit,coa.delivery_number as deliveryNumber,coa.accepted_number as acceptedNumber, " +
                        " coa.unit_price as unitPrice,(coa.accepted_number * coa.unit_price) as acceptPrice, " +
                        " (coa.accepted_number * coa.unit_price * 0.17) as taxRate," +
                        " (coa.accepted_number * coa.unit_price + coa.accepted_number * coa.unit_price * 0.17) as allPrice, cmah.create_time as createTime," +
                        " csrd.principal_custodian as principalCustodian,coh.buyer as buyer " +
                        " from c_material_affairs_handle cmah left join c_application_line cal on cmah.transaction_manager_no=cal.application_no, " +
                        " c_order_head coh," +
                        " c_order_accept coa, " +
                        " c_storage_room_definition csrd, " +
                        " c_general_material cgm " +
                        " where cmah.stock_id=csrd.storage_room_id " +
                        " and cmah.transaction_manager_no=coh.order_no " +
                        " and coa.order_no=cmah.transaction_manager_no " +
                        " and coa.material_id=cgm.material_id " +
                        " and cmah.transaction_manager_type='接受入库' " +
                        " and cmah.transaction_manager_no='" + list.get(i) + "' ";
                /*订单号*/
                if (orderNo.indexOf("%") != -1) {

                    sql += " and coh.order_no like '" + orderNo + "'";

                } else {

                    sql += " and coh.order_no='" + orderNo + "'";
                }

				/*采购员*/
                if (buyer.indexOf("%") != -1) {

                    sql += " and coh.buyer like '" + buyer + "'";

                } else {

                    sql += " and coh.buyer='" + buyer + "'";
                }

				/*库房编号*/
                if (storageNo.indexOf("%") != -1) {

                    sql += " and csrd.storage_room_no like '" + storageNo + "'";

                } else {

                    sql += " and csrd.storage_room_no='" + storageNo + "'";
                }
                /*供应商*/
                if (supplier.indexOf("%") != -1) {

                    sql += " and coh.supplier like '" + supplier + "'";

                } else {

                    sql += " and coh.supplier='" + supplier + "'";
                }
                /*是否已打印*/
                if (isPrint.indexOf("%") != -1) {

                    sql += " and cmah.stamp like '" + isPrint + "'";
                } else {

                    sql += " and cmah.stamp='" + isPrint + "'";
                }
                /*日期范围*/
                if (createDateBegin.indexOf("%") == -1 && createDateEnd.indexOf("%") == -1) {

                    sql += " and (cmah.create_time between " +
                            " '" + createDateBegin + "' and '" + createDateEnd + "' )";

                } else if (createDateBegin.indexOf("%") == -1 && createDateEnd.indexOf("%") != -1) {

                    sql += " and cmah.create_time > '" + createDateBegin + "'";

                } else if (createDateBegin.indexOf("%") != -1 && createDateEnd.indexOf("%") == -1) {

                    sql += " and cmah.create_time<'" + createDateEnd + "'";
                }

				/*获取该编号下的所有入库单*/
                result = dao.createSQL(sql);

                returnData.add(result);

            }
            return returnData;

        } catch (Exception e) {
            e.printStackTrace();
            return "{'result':'" + e.getMessage() + "'}";
        }
    }
}
