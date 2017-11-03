package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.Lifecycle;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;

/**
 * Created by GuoFeng on 2016/7/21.
 */
@Service
public class AccountConfigurePermissionService implements IAccountConfigurePermissionService {

    @Autowired
    IGenericDAO dao;

    @Override
    public Object saveUserMenu(String request) {

        JSONObject result = new JSONObject();
        JSONObject jsonObject = new JSONObject(request);
        CAccountAuthority accountAuthority = null;
        CAccountAuthorityId accountAuthorityId = null;
        String name = jsonObject.getString("username");
        JSONArray menu = jsonObject.getJSONArray("userTreeNode");

        try {

            /**
             * 删除用户菜单信息
             */
            dao.executeQuery("delete from CAccountAuthority caa where caa.id.account='" + name + "'");

            for (int i = 0; i < menu.length(); i++) {

                JSONObject menuJSONObject = menu.getJSONObject(i);

                accountAuthority = new CAccountAuthority();
                accountAuthorityId = new CAccountAuthorityId();

				/*设置id信息*/
                accountAuthorityId.setAccount(name);
                accountAuthorityId.setFunctionNode(Integer.parseInt(menuJSONObject.getString("nodeId")));

				/*设置id*/
                accountAuthority.setId(accountAuthorityId);
                /*设置菜单权限*/
                accountAuthority.setAuthority(Integer.parseInt(menuJSONObject.getString("authority")));
                accountAuthority.setFunction("");
                /**
                 * 是否是管理员 TODO 默认不是管理员
                 */
                accountAuthority.setIsAdmin(0);

                dao.saveOrUpdate(accountAuthority);

            }

            result.append("result", "true");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();
        }

    }

    @Override
    public Object deleteUser(String name) {

        JSONObject result = new JSONObject();

        try {

            dao.executeQuery("delete from CRegist cr where cr.name='" + name + "'");
            result.append("result", "true");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            result.append("result", e.getMessage());
            return result.toString();
        }
    }

    @Override
    public Object checkUser(String name) {

        JSONObject result = new JSONObject();
        try {

            List list = dao.executeQuery("select cr.name from CRegist cr where cr.name='" + name + "'");
            if (list.size() > 0 && list.get(0) != null) {

                result.append("result", "true");

            } else {

                result.append("result", "false");
            }

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
        }
        return result.toString();
    }

    @Override
    public Object saveUser(String uploadUser) {

        JSONObject result = new JSONObject();
        JSONObject userJSON = new JSONObject(uploadUser);
        CRegist user = new CRegist();

        try {

            user.setName(userJSON.getString("name"));
            user.setPassword(userJSON.getString("password"));
            if (!"".equals(userJSON.getString("hiddenStorageId"))) {

                user.setStorageRoomId(Integer.parseInt(userJSON.getString("hiddenStorageId")));
            }
            user.setNeedPasswordOrnot(userJSON.getString("needPassWord"));
            user.setLimitedWarehouseOrnot(userJSON.getString("limitStorageRoom"));
            user.setDirector(userJSON.getString("redirect"));
            user.setOrderApprovalAuthority(userJSON.getString("orderApprovalAuthority"));
            user.setClassification(userJSON.getString("class"));
            user.setOrganization(userJSON.getString("organization"));

            dao.saveOrUpdate(user);

            result.append("result", "true");

        } catch (Exception e) {

            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            result.append("result", e.getMessage());
        }
        return result.toString();
    }

    @Override
    public Object checkNeedPassword(String name) {

        JSONObject result = new JSONObject();
        try {

            List<CRegist> list = dao.executeQuery("from CRegist cr where cr.name='" + name + "'");
            if (list.size() > 0 && list.get(0) != null) {

                CRegist regist = list.get(0);

                if (regist.getNeedPasswordOrnot().equals("是")) {

                    result.append("result", "true");

                } else {

                    result.append("result", "false");
                }

            } else {

                result.append("result", "true");
            }

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
        }
        return result.toString();
    }
}
