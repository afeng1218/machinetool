package com.smtcl.machinetool.service.impl;

import com.fasterxml.jackson.databind.*;
import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCuttoolBasedata;
import com.smtcl.machinetool.models.machinetool.CMaterialParameter;
import com.smtcl.machinetool.models.machinetool.CMaterialParameterId;
import com.smtcl.machinetool.service.*;
import org.jdom2.*;
import org.jdom2.output.*;
import org.jdom2.output.Format;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.interceptor.*;
import org.springframework.web.multipart.*;

import javax.servlet.http.*;
import java.io.*;
import java.sql.Timestamp;
import java.text.*;
import java.util.*;

/**
 * Created by GuoFeng on 2016/2/19.
 * Changed by GuoFeng on 2016/8/8
 */
@Service
public class CuttoolDefinitionService implements ICuttoolDefinitionService {

    /**
     * 对刀仪共享文件夹目录
     */
    @Value("${microset.path}")
    private String MICROSET_PATH;

    /**
     * 对刀仪 需发送文件夹目录
     */
    @Value("${microset.send.path}")
    private String MIRCORET_SEND_PATH;

    /**
     * 发送西门子的目录
     */
    @Value("${send.siemens.path}")
    private String SEND_SIEMENS_PATH;

    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    private SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 获取图片上传路径
     */
    private String rootPath = System.getProperty("user.dir").replace("bin", "webapps") + "\\machinetool\\WEB-INF\\classes\\static\\uploadImg\\";
    //private String rootPath = this.getClass().getClassLoader().getResource("/").toURI().getPath() + "static/uploadImg/";

    /**
     * 通用dao
     */
    @Autowired
    private IGenericDAO dao;

    /**
     * 刀具装配service
     */
    @Autowired
    ICuttoolAssemblyService cuttoolAssemblyService;

    @Override
    public String save(CCuttoolBasedata c1) {

        try {

            String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + c1.getCuttoolNo() + "'";

            List<CCuttoolBasedata> clist = null;
            CCuttoolBasedata basedata = null;

            CCuttoolBasedata cCuttoolBasedata = new CCuttoolBasedata();

            cCuttoolBasedata = c1;

            clist = dao.executeQuery(hql);

            if (clist.size() > 0) {

                basedata = clist.get(0);

                /**
                 * 设置刀具id
                 */
                cCuttoolBasedata.setCuttoolId(basedata.getCuttoolId());
                /**
                 * 设置创建时间
                 */
                cCuttoolBasedata.setCreateTime(basedata.getCreateTime());
                /**
                 * 设置创建人
                 */
                cCuttoolBasedata.setCreateUser(basedata.getCreateUser());
                /**
                 * 设置启用状态
                 */
                cCuttoolBasedata.setInitiateStatus(basedata.getInitiateStatus());
                /**
                 * 设置更新时间
                 */
                cCuttoolBasedata.setUpdateTme(Timestamp.valueOf(sdf2.format(new Date())));
                /**
                 * 设置刀具初始库房
                 */
                cCuttoolBasedata.setInitialStock(basedata.getInitialStock());
                /**
                 * 设置发送状态
                 */
                cCuttoolBasedata.setSendState(basedata.getSendState());

                /**
                 * 这里是删除session中相同的对象
                 */
                dao.getCurrentSession().evict(clist.get(0));
                dao.saveOrUpdate(cCuttoolBasedata);
                return "success";

            } else {

                String date = sdf2.format(new Date());
                Timestamp createTime = null;

                cCuttoolBasedata.setInitiateStatus(0);
                cCuttoolBasedata.setCreateTime(Timestamp.valueOf(date));

                dao.add(c1);
                return "success";

            }

        } catch (Exception e) {

            e.printStackTrace();
            throw e;
        }

    }

    @Override
    public List<CCuttoolBasedata> blursearch(String json) {

        JSONArray jsonArray = new JSONArray(json);
        List<CCuttoolBasedata> cuttoolBasedataList = new ArrayList<CCuttoolBasedata>();
        String cno = jsonArray.getJSONObject(0).get("cno").toString();
        String des = jsonArray.getJSONObject(0).get("des").toString();
        String dia_small = jsonArray.getJSONObject(0).get("dia_small").toString();
        String dia_large = jsonArray.getJSONObject(0).get("dia_large").toString();
        String length = jsonArray.getJSONObject(0).get("length").toString();
        String renshu = jsonArray.getJSONObject(0).get("renshu").toString();
        String isScrap = jsonArray.getJSONObject(0).get("isScrap").toString();
        int isscrap;
        if ("是".equals(isScrap)) {
            isscrap = 1;
        } else {
            isscrap = 0;
        }
        String cha_des = jsonArray.getJSONObject(0).get("cha_des").toString();
        String isEnable = jsonArray.getJSONObject(0).get("isEnable").toString();
        int isenable;
        if ("是".equals(isEnable)) {
            isenable = 1;
        } else {
            isenable = 0;
        }
        String time_from = jsonArray.getJSONObject(0).get("time_from").toString();
        String time_to = jsonArray.getJSONObject(0).get("time_to").toString();
        String fun = jsonArray.getJSONObject(0).get("fun").toString();
        String type = jsonArray.getJSONObject(0).get("type").toString();
        //String                 org_materials       = jsonArray.getJSONObject(0).get("org_materials").toString();

        //		System.out.println(cno + des + dia_small + dia_large + length + renshu + isScrap + cha_des + isEnable + time_from + time_to + fun +
        // type);
        String hql = "from CCuttoolBasedata ccb where 1=1";
        if (!"".equals(cno)) {
            hql += " and ccb.cuttoolNo like '" + cno + "%'";
        }
        if (!"".equals(des)) {
            hql += " and ccb.cuttoolDescription like '" + des + "%'";
        }
        if (!"".equals(dia_small)) {
            hql += " and ccb.programmingDiameterSmall >= " + dia_small;
        }
        if (!"".equals(dia_large)) {
            hql += " and ccb.programmingDiameterLarge <= " + dia_large;
        }
        if (!"".equals(length)) {
            hql += " and ccb.programmingDiameterLength like '" + length + "%'";
        }
        if (!"".equals(isScrap)) {
            hql += " and ccb.isScrap ='" + isscrap + "'";
        }
        if (!"".equals(cha_des)) {
            hql += " and ccb.characteristicDescription like '" + cha_des + "%'";
        }
        if (!"".equals(isEnable)) {
            hql += " and ccb.initiateStatus ='" + isenable + "'";
        }
        if (!"".equals(fun)) {
            hql += " and ccb.function like '" + fun + "'";
        }
        if (!"".equals(type)) {
            hql += " and ccb.type like '" + type + "'";
        }
        //残余生命区间判断
        if ("".equals(time_from) && !"".equals(time_to)) {
            hql += " and ccb.surplusLifetime between " + 0 + " and " + time_to + "";
        }
        if (!"".equals(time_from) && "".equals(time_to)) {
            hql += " and ccb.surplusLifetime between " + time_from + " and " + 9999 + "";
        }
        if (!"".equals(time_from) && !"".equals(time_to)) {
            hql += " and ccb.surplusLifetime between " + time_from + " and " + time_to + "";
        }

		/*刀具基础表中尚无刃数字段
        if (!"".equals(renshu)){
			hql += " and ccb.cuttoolDescription like '" + renshu + "%'";
		}
		*/
//        		System.out.print("hql="+hql);
        cuttoolBasedataList = dao.executeQuery(hql);
        return cuttoolBasedataList;
    }

    @Override
    public List<CCuttoolBasedata> getList() {

        return dao.findAll(CCuttoolBasedata.class);
    }

    @Override
    public String upload(String name, MultipartFile file) {

        JSONObject result = new JSONObject();
        if (!file.isEmpty()) {

            try {

                byte[] bytes = file.getBytes();
                File dir = new File(rootPath);
                if (!dir.exists()) {

                    dir.mkdirs();

                }
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(rootPath + name)));
                stream.write(bytes);
                stream.close();

                result.append("result", "true");
                return result.toString();

            } catch (Exception e) {

                e.printStackTrace();
                result.append("result", e.getMessage());
                return result.toString();
            }

        } else {

            result.append("result", "true");
            return result.toString();

        }
    }

    @Override
    public List searchbyno(String cuttoolNo) {

        String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + cuttoolNo + "'";
        return dao.executeQuery(hql);
    }

    @Override
    public String enableCuttool(String cno, String croom, String cplace) {

        JSONObject result = new JSONObject();

        try {

            CCuttoolBasedata cuttoolBasedata = new CCuttoolBasedata();
            List<CCuttoolBasedata> list = new ArrayList<CCuttoolBasedata>();
            String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + cno + "'";

            list = dao.executeQuery(hql);

            cuttoolBasedata = list.get(0);

            if (cuttoolBasedata.getInitiateStatus() == 0) {

                result.append("resultStatus", "noEnabled");
            }

            cuttoolBasedata.setInitiateStatus(1);
            cuttoolBasedata.setInitialStock(croom);
            cuttoolBasedata.setIntialGoodsAllocation(cplace);

            dao.getCurrentSession().evict(cuttoolBasedata);
            dao.saveOrUpdate(cuttoolBasedata);

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
    public String searchByCno(String cno) {

        JSONObject jsonObject = new JSONObject();
        CCuttoolBasedata cuttoolBasedata = new CCuttoolBasedata();
        List<CCuttoolBasedata> list = new ArrayList<CCuttoolBasedata>();
        String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + cno + "'";

        try {

            list = dao.executeQuery(hql);
            if (list.size() > 0 && list.get(0) != null) {

                cuttoolBasedata = list.get(0);
                jsonObject.append("res", "yes");
                jsonObject.append("surplusLifetime", cuttoolBasedata.getSurplusLifetime());
                return jsonObject.toString();

            } else {

                jsonObject.append("res", "no");
                return jsonObject.toString();
            }

        } catch (Exception e) {

            e.printStackTrace();
            jsonObject.append("res", e.getMessage());
            return jsonObject.toString();
        }
    }

    @Override
    public String getPicName(String cuttoolNo) {

        JSONObject jsonObject = new JSONObject();
        CCuttoolBasedata cuttoolBasedata = new CCuttoolBasedata();
        List<CCuttoolBasedata> list = new ArrayList<CCuttoolBasedata>();
        String hql = "from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + cuttoolNo + "'";

        list = dao.executeQuery(hql);

        if (list.size() > 0) {

            cuttoolBasedata = list.get(0);
            jsonObject.append("res", cuttoolBasedata.getGraphical());
            return jsonObject.toString();

        } else {

            return null;
        }
    }

    @Override
    public String saveCPar(String uploadValue) {

        JSONObject result = new JSONObject();

        try {

            JSONArray jsonArray = new JSONArray(uploadValue);
            JSONArray rowValue = jsonArray.getJSONObject(0).getJSONArray("rowValue");
            JSONObject CTypeObj = jsonArray.getJSONObject(1);
            JSONObject CClassObj = jsonArray.getJSONObject(2);
            Integer cid = (Integer) dao.executeQuery("select ccb.cuttoolId from CCuttoolBasedata ccb where ccb.cuttoolNo ='" +
                    jsonArray.getJSONObject(3).getString("cno").trim() + "'").get(0);

            for (int i = 0; i < rowValue.length(); i++) {

                JSONObject row = rowValue.getJSONObject(i);

                CMaterialParameter parModel = new CMaterialParameter();
                CMaterialParameterId parameterId = new CMaterialParameterId();

                int CType = CTypeObj.getInt("type");
                int CClass = CClassObj.getInt("class");

                parameterId.setId(cid);
                parameterId.setParameterName(row.getString("parName"));
                parameterId.setType(CType);

                parModel.setId(parameterId);

                parModel.setParameterValue(row.getString("parVal"));
                parModel.setClass_(CClass);

                dao.saveOrUpdate(parModel);

            }
            result.append("result", "true");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public String upadtePar(String uploadValue) {

        JSONArray jsonArray = new JSONArray(uploadValue);
        JSONArray rowValue = jsonArray.getJSONObject(0).getJSONArray("rowValue");
        JSONObject CTypeObj = jsonArray.getJSONObject(1);
        Integer cid = (Integer) dao.executeQuery("select ccb.cuttoolId from CCuttoolBasedata ccb where ccb.cuttoolNo ='" +
                jsonArray.getJSONObject(3).getString("cno").trim() + "'").get(0);
        for (int i = 0; i < rowValue.length(); i++) {
            JSONObject row = rowValue.getJSONObject(i);
            String ParName = row.getString("parName");
            String hql = "from CMaterialParameter cmp where" +
                    " cmp.id.id='" + cid + "' " +
                    " and cmp.id.parameterName='" + ParName + "' " +
                    " and cmp.class_=1 ";

            List<CMaterialParameter> parameterList = dao.executeQuery(hql);
            CMaterialParameter parameter = parameterList.get(0);
            parameter.getId().setType(CTypeObj.getInt("type"));
            parameter.setParameterValue(row.getString("parVal"));
            dao.saveOrUpdate(parameter);
        }
        return null;
    }

    @Override
    public List searchCParBycno(String cuttoolNo, int type) {

        Integer cid = (Integer) dao.executeQuery("select ccb.cuttoolId from CCuttoolBasedata ccb where ccb.cuttoolNo ='" + cuttoolNo + "'").get(0);
        String hql = "from CMaterialParameter cmp where cmp.id.id=" + cid + " and cmp.id.type=" + type;
        return dao.executeQuery(hql);
    }

    @Override
    public Object getMicrosetState() {

        int flag = 0;
        String[] paths = MICROSET_PATH.split(";");
        JSONObject result = new JSONObject();
        JSONArray pathsA = new JSONArray();
        File file = null;

        try {

            if (paths.length == 0 || paths == null) {

                result.append("result", "false");
                return result.toString();

            } else {

                for (int i = 0; i < paths.length; i++) {

                    file = new File(paths[i]);

                    if (file.exists()&& file.listFiles().length > 0) {

                        flag = 1;
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.append("path", paths[i]);
                        pathsA.put(jsonObject);

                    }

                }
                if (flag == 0) {

                    result.append("result", "false");
                    return result.toString();

                } else {

                    result.append("result", "true");
                    result.append("paths", pathsA);
                    return result.toString();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();
        }

    }

    @Override
    public Object getMicroset(String path) {

        int index = 0;
        JSONObject result = new JSONObject();
        JSONArray returnData = new JSONArray();
        String[] paths = MICROSET_PATH.split(";");
        FileWriter fileWriter = null;
        BufferedWriter bw = null;
        BufferedReader br = null;
        int flag = 0;
        String cutNo = "";
        String sisterNo = "";
        int getCutToolNo = 0;
        try {

            if (paths.length < 1) {

                result.append("result", "缺少指定文件夹！");
                return result.toString();

            } else {

                /**
                 *  对刀仪目录
                 */
                File fr = new File(path).listFiles()[0];
                /**
                 * 发送西门子的路径
                 */
                //File fw = new File(SEND_SIEMENS_PATH);
                File fw = new File(MIRCORET_SEND_PATH);

                br = new BufferedReader(new FileReader(fr));

				/*获取刀具编号*/
                for (String line = br.readLine(); line != null; line = br.readLine()) {

                    String[] s = line.split("=");
                    String name = "";
                    String value = "";
                    if (s.length > 1) {

                        name = s[0].substring(s[0].indexOf("$") + 1, s[0].indexOf("["));
                        value = s[1].replaceAll("\"", "");

						/*姐妹刀号*/
                        if (name.equals("TC_TP1")) {

                            sisterNo = value;
                            getCutToolNo++;
                        }
                        /*道具号*/
                        if (name.equals("TC_TP2")) {

                            cutNo = value;
                            getCutToolNo++;
                        }
                        if (getCutToolNo == 2) {

                            break;
                        }
                    }

                }

				/*关闭*/
                try {
                    if (br != null) {

                        br.close();
                        br = null;
                    }

                } catch (Exception e) {

                    e.printStackTrace();
                    result.append("result", e.getMessage());
                    return result.toString();
                }

				/*拼接刀具编号*/
                if (!sisterNo.equals("0")) {

                    cutNo += "-" + sisterNo;
                }
                /*获取初始寿命 残余寿命和报警值*/
                List<Map> list = dao.executeQuery("select new Map(ccbd.initialLifetime as initialLifetime," +
                        " ccbd.surplusLifetime as surplusLifetime,ccbd.lifeAlarm as lifeAlarm)" +
                        " from CCuttoolBasedata ccbd " +
                        " where ccbd.cuttoolNo='" + cutNo + "' " +
                        " and ccbd.initiateStatus=1");

                if (list.size() > 0 && list.get(0) != null) {

					/*获取map*/
                    Map map = list.get(0);

					/*重新打开文件*/
                    br = new BufferedReader(new FileReader(fr));

                    //判断西门子是否有ini文件
//                    for (int i = 0; i < fw.listFiles().length; i++) {
//
//                        String end = fw.listFiles()[i].getName().split("\\.")[1];
//                        if (end.equals("ini") || end.equals("INI")) {
//
//                            flag = 1;
//                            break;
//                        }
//                    }

                    //if (flag == 0) {
                        /*文件夹没有ini文件*/
                        //fileWriter = new FileWriter(SEND_SIEMENS_PATH + "/" + sdf.format(new Date()) + ".INI");
                        fileWriter = new FileWriter(MIRCORET_SEND_PATH + sdf.format(new Date()) + ".INI");
                        bw = new BufferedWriter(fileWriter);
                    //}

                    for (String line = br.readLine(); line != null; line = br.readLine()) {

                        String[] s = line.split("=");
                        String name = "";
                        String value = "";
                        if (s.length > 1) {

                            name = s[0].substring(s[0].indexOf("$") + 1, s[0].indexOf("["));
                            value = s[1].replaceAll("\"", "");
                            JSONObject jsonObject = new JSONObject();
                            jsonObject.append("name", name);
                            jsonObject.append("value", value);

                            returnData.put(jsonObject);

                        }

                        if (flag == 1) {

                            //文件保存零时文件中

                        } else {

							/*寿命报警值*/
                            if (name.equals("TC_MOP3")) {

                                if (map.get("lifeAlarm") == null) {

                                    value = "0";
                                } else {

                                    value = map.get("lifeAlarm").toString();
                                }
                                line = line.split("=")[0] + "=" + value;

								/*残余寿命*/
                            } else if (name.equals("TC_MOP4")) {

                                if (map.get("surplusLifetime") == null) {

                                    value = "0";
                                } else {

                                    value = map.get("surplusLifetime").toString();
                                }
                                line = line.split("=")[0] + "=" + value;

							/*初始寿命*/
                            } else if (name.equals("TC_MOP13")) {

                                if (map.get("initialLifetime") == null) {

                                    value = "0";

                                } else {

                                    value = map.get("initialLifetime").toString();
                                }
                                line = line.split("=")[0] + "=" + value;
                            }

                            if (index != 0) {

                                bw.newLine();
                            }
                            bw.write(line);

                        }

						/*索引加一*/
                        index = 1;
                    }

                    try {

                        if (br != null) {

                            br.close();
                            br = null;
                        }
                        if (bw != null) {

                            bw.close();
                            bw = null;
                        }

                        fr.delete();
                        result.append("result", "true");
                        result.append("returnData", returnData);

                        return result.toString();

                    } catch (Exception e) {

                        e.printStackTrace();
                        result.put("result", e.getMessage());
                        return result.toString();
                    }

                } else {

                    result.append("result", "刀具面板没有添加\"" + cutNo + "\"编号刀具！");
                    return result.toString();

                }

            }

        } catch (Exception e) {

            e.printStackTrace();
            result.put("result", e.getMessage());
            return result.toString();

        }
    }

    /**
     * name: 郭峰
     * <p>
     * date: 2016-06-24
     * <p>
     * 发送西门子
     *
     * @param json
     * @return
     */
    @Override
    public String sendState(String json) {

        JSONObject result = new JSONObject();

        try {

            List<CCuttoolBasedata> list = blursearch(json);
            System.out.println("list=" + list);
            int k = 0;
            if (list != null || list.size() > 0) {

                //生成根节点
                Element root = new Element("ExportMasterdata");
                Document Doc = new Document(root);

                for (int i = 0; i < list.size(); i++) {

                    //所有未发送的刀具 && 已新增的刀具
                    if ((list.get(i).getSendState() == null ||
                            list.get(i).getSendState().equals(0)) &&
                            list.get(i).getInitiateStatus().equals(1)) {
                        String cuttonnlNo[] = list.get(i).getCuttoolNo().split("-");
                        //刀具编号
                        String daoJuBianHao = cuttonnlNo[0];
                        //初始寿命(最大寿命)
                        int initial_lifetime = 0;
                        if (list.get(i).getInitialLifetime() != null) {
                            if (!list.get(i).getInitialLifetime().equals("")) {
                                initial_lifetime = list.get(i).getInitialLifetime();
                            }
                        }
                        //残余寿命(剩余件数)
                        int surplus_lifetime = 0;
                        if (list.get(i).getSurplusLifetime() != null) {
                            if (!list.get(i).getSurplusLifetime().equals("")) {
                                surplus_lifetime = list.get(i).getSurplusLifetime();
                            }
                        }
                        //寿命报警值
                        String life_alarm = "4";

                        // 创建节点 ToolList;
                        Element ToolList = new Element("ToolList");
                        // 给 ToolList 节点添加子节点DataElem；
                        Element DataElem = new Element("DataElem");

                        /*************** TC_TP end *****************/
                        //TC_TP
                        // 给 DataElem 节点添加子节点 TC_TP；
                        Element TC_TP = new Element("TC_TP");
                        DataElem.addContent(TC_TP);

                        //姐妹刀号
                        //将TC_TP添加子节点 TC_TP1
                        Element TC_TP1 = new Element("TC_TP1");
                        TC_TP1.addContent("0");
                        TC_TP.addContent(TC_TP1);

                        //刀具编号
                        //将TC_TP添加子节点 TC_TP2
                        Element TC_TP2 = new Element("TC_TP2");
                        TC_TP2.addContent(daoJuBianHao);
                        TC_TP.addContent(TC_TP2);

                        //默认值
                        Element TC_TP3 = new Element("TC_TP3");
                        TC_TP3.addContent("1");
                        TC_TP.addContent(TC_TP3);
                        Element TC_TP4 = new Element("TC_TP4");
                        TC_TP4.addContent("1");
                        TC_TP.addContent(TC_TP4);
                        Element TC_TP5 = new Element("TC_TP5");
                        TC_TP5.addContent("1");
                        TC_TP.addContent(TC_TP5);
                        Element TC_TP6 = new Element("TC_TP6");
                        TC_TP6.addContent("1");
                        TC_TP.addContent(TC_TP6);
                        Element TC_TP7 = new Element("TC_TP7");
                        TC_TP7.addContent("1");
                        TC_TP.addContent(TC_TP7);
                        Element TC_TP8 = new Element("TC_TP8");
                        TC_TP8.addContent("0");
                        TC_TP.addContent(TC_TP8);
                        Element TC_TP9 = new Element("TC_TP9");
                        TC_TP9.addContent("2");
                        TC_TP.addContent(TC_TP9);
                        Element TC_TP10 = new Element("TC_TP10");
                        TC_TP10.addContent("0");
                        TC_TP.addContent(TC_TP10);
                        Element TC_TP11 = new Element("TC_TP11");
                        TC_TP11.addContent("0");
                        TC_TP.addContent(TC_TP11);
                        /*************** TC_TP new *****************/

                        /*************** TC_TPG new *****************/
                        // TC_TPG
                        // 给 DataElem 节点添加子节点 TC_TPG；
                        Element TC_TPG = new Element("TC_TPG");
                        DataElem.addContent(TC_TPG);
                        //默认值
                        Element TC_TPG1 = new Element("TC_TPG1");
                        TC_TPG1.addContent("0");
                        TC_TPG.addContent(TC_TPG1);
                        Element TC_TPG2 = new Element("TC_TPG2");
                        TC_TPG2.addContent("0");
                        TC_TPG.addContent(TC_TPG2);
                        Element TC_TPG3 = new Element("TC_TPG3");
                        TC_TPG3.addContent("0");
                        TC_TPG.addContent(TC_TPG3);
                        Element TC_TPG4 = new Element("TC_TPG4");
                        TC_TPG4.addContent("0");
                        TC_TPG.addContent(TC_TPG4);
                        Element TC_TPG5 = new Element("TC_TPG5");
                        TC_TPG5.addContent("0");
                        TC_TPG.addContent(TC_TPG5);
                        Element TC_TPG6 = new Element("TC_TPG6");
                        TC_TPG6.addContent("0");
                        TC_TPG.addContent(TC_TPG6);
                        Element TC_TPG7 = new Element("TC_TPG7");
                        TC_TPG7.addContent("0");
                        TC_TPG.addContent(TC_TPG7);
                        Element TC_TPG8 = new Element("TC_TPG8");
                        TC_TPG8.addContent("0");
                        TC_TPG.addContent(TC_TPG8);
                        Element TC_TPG9 = new Element("TC_TPG9");
                        TC_TPG9.addContent("0");
                        TC_TPG.addContent(TC_TPG9);
                        /*************** TC_TPG end *****************/

                        // DataElem
                        // 给 DataElem 节点添加子节点 DataElem；
                        Element DataElem1 = new Element("DataElem");
                        DataElem1.setAttribute("Index", "1");
                        DataElem.addContent(DataElem1);

                        /*************** TC_DP new *****************/
                        // TC_DP
                        // 给 DataElem1 节点添加子节点 TC_DP；
                        Element TC_DP = new Element("TC_DP");
                        DataElem1.addContent(TC_DP);

                        // TC_DP1
                        // 给 TC_DP 节点添加子节点 TC_DP1；
                        Element TC_DP1 = new Element("TC_DP1");
                        /***** 刀具类型，对应TMS中的刀具类型 *****/
                        TC_DP1.addContent("120");
                        TC_DP.addContent(TC_DP1);

                        //T C_DP2
                        // 给 TC_DP 节点添加子节点 TC_DP2；
                        Element TC_DP2 = new Element("TC_DP2");
                        TC_DP2.addContent("1");
                        TC_DP.addContent(TC_DP2);

                        // TC_DP3
                        // 给 TC_DP 节点添加子节点 TC_DP3；
                        Element TC_DP3 = new Element("TC_DP3");
                        TC_DP3.addContent("11");
                        TC_DP.addContent(TC_DP3);

                        // TC_DP4
                        // 给 TC_DP 节点添加子节点 TC_DP4；
                        Element TC_DP4 = new Element("TC_DP4");
                        TC_DP4.addContent("0");
                        TC_DP.addContent(TC_DP4);

                        // TC_DP5
                        // 给 TC_DP 节点添加子节点 TC_DP5；
                        Element TC_DP5 = new Element("TC_DP5");
                        TC_DP5.addContent("0");
                        TC_DP.addContent(TC_DP5);

                        // TC_DP6
                        // 给 TC_DP 节点添加子节点 TC_DP6；
                        Element TC_DP6 = new Element("TC_DP6");
                        TC_DP6.addContent("3");
                        TC_DP.addContent(TC_DP6);

                        // TC_DP7 - TC_DP25 设置默认值
                        // 给 TC_DP 节点添加子节点 TC_DP7 - TC_DP25；
                        for (int j = 7; j <= 25; j++) {
                            Element NEW_TC_DP = new Element("TC_DP" + j);
                            if (j == 9) {
                                NEW_TC_DP.addContent("2");
                            } else {
                                NEW_TC_DP.addContent("0");
                            }
                            TC_DP.addContent(NEW_TC_DP);
                        }
                        /*************** TC_DP end *****************/

                        /*************** <TC_MOP> new *****************/
                        // TC_MOP
                        // 给 DataElem1 节点添加子节点 TC_MOP；
                        Element TC_MOP = new Element("TC_MOP");
                        DataElem1.addContent(TC_MOP);

                        // TC_MOP1
                        // 给 TC_MOP 节点添加子节点 TC_MOP1；
                        Element TC_MOP1 = new Element("TC_MOP1");
                        TC_MOP1.addContent("0");
                        TC_MOP.addContent(TC_MOP1);

                        // TC_MOP2
                        // 给 TC_MOP 节点添加子节点 TC_MOP2；
                        Element TC_MOP2 = new Element("TC_MOP2");
                        TC_MOP2.addContent("0");
                        TC_MOP.addContent(TC_MOP2);

                        // TC_MOP3
                        // 给 TC_MOP 节点添加子节点 TC_MOP3；
                        Element TC_MOP3 = new Element("TC_MOP3");
                        /************* 寿命报警阀值 *************/
                        TC_MOP3.addContent(life_alarm);
                        TC_MOP.addContent(TC_MOP3);

                        // TC_MOP4
                        // 给 TC_MOP 节点添加子节点 TC_MOP4；
                        Element TC_MOP4 = new Element("TC_MOP4");
                        /************* 剩余件数 *************/
                        TC_MOP4.addContent(surplus_lifetime + "");
                        TC_MOP.addContent(TC_MOP4);

                        // TC_MOP5
                        // 给 TC_MOP 节点添加子节点 TC_MOP5；
                        Element TC_MOP5 = new Element("TC_MOP5");
                        TC_MOP5.addContent("0");
                        TC_MOP.addContent(TC_MOP5);

                        // TC_MOP6
                        // 给 TC_MOP 节点添加子节点 TC_MOP6；
                        Element TC_MOP6 = new Element("TC_MOP6");
                        TC_MOP6.addContent("0");
                        TC_MOP.addContent(TC_MOP6);

                        // TC_MOP7
                        // 给 TC_MOP 节点添加子节点 TC_MOP7；
                        Element TC_MOP7 = new Element("TC_MOP7");
                        TC_MOP7.addContent("0");
                        TC_MOP.addContent(TC_MOP7);

                        // TC_MOP8
                        // 给 TC_MOP 节点添加子节点 TC_MOP8；
                        Element TC_MOP8 = new Element("TC_MOP8");
                        TC_MOP8.addContent("0");
                        TC_MOP.addContent(TC_MOP8);

                        // TC_MOP9
                        // 给 TC_MOP 节点添加子节点 TC_MOP9；
                        Element TC_MOP9 = new Element("TC_MOP9");
                        TC_MOP9.addContent("0");
                        TC_MOP.addContent(TC_MOP9);

                        // TC_MOP10
                        // 给 TC_MOP 节点添加子节点 TC_MOP10；
                        Element TC_MOP10 = new Element("TC_MOP10");
                        TC_MOP10.addContent("0");
                        TC_MOP.addContent(TC_MOP10);

                        // TC_MOP11
                        // 给 TC_MOP 节点添加子节点 TC_MOP11；
                        Element TC_MOP11 = new Element("TC_MOP11");
                        TC_MOP11.addContent("0");
                        TC_MOP.addContent(TC_MOP11);

                        // TC_MOP12
                        // 给 TC_MOP 节点添加子节点 TC_MOP12；
                        Element TC_MOP12 = new Element("TC_MOP12");
                        TC_MOP12.addContent("0");
                        TC_MOP.addContent(TC_MOP12);

                        // TC_MOP13
                        // 给 TC_MOP 节点添加子节点 TC_MOP13；
                        Element TC_MOP13 = new Element("TC_MOP13");
                        /************* 最大寿命 *************/
                        TC_MOP13.addContent(initial_lifetime + "");
                        TC_MOP.addContent(TC_MOP13);

                        // TC_MOP14
                        // 给 TC_MOP 节点添加子节点 TC_MOP14；
                        Element TC_MOP14 = new Element("TC_MOP14");
                        TC_MOP14.addContent("0");
                        TC_MOP.addContent(TC_MOP14);

                        // TC_MOP15
                        // 给 TC_MOP 节点添加子节点 TC_MOP15；
                        Element TC_MOP15 = new Element("TC_MOP15");
                        TC_MOP15.addContent("0");
                        TC_MOP.addContent(TC_MOP15);
                        /*************** <TC_MOP> end *****************/

                        /*************** TDI new *****************/
                        // TDI
                        // 给 DataElem 节点添加子节点 TDI；
                        Element TDI = new Element("TDI");
                        DataElem.addContent(TDI);

                        // TDI_WZSCHRANK_ID
                        // 给 TDI 节点添加子节点 TDI_WZSCHRANK_ID；
                        Element TDI_WZSCHRANK_ID = new Element("TDI_WZSCHRANK_ID");
                        TDI_WZSCHRANK_ID.addContent("1");
                        TDI.addContent(TDI_WZSCHRANK_ID);

                        // TDI_TOOLID_DESCRIPTION
                        // 给 TDI 节点添加子节点 TDI_TOOLID_DESCRIPTION；
                        Element TDI_TOOLID_DESCRIPTION = new Element("TDI_TOOLID_DESCRIPTION");
                        TDI_TOOLID_DESCRIPTION.addContent("");
                        TDI.addContent(TDI_TOOLID_DESCRIPTION);

                        // TDI_TOOL_COMMENT
                        // 给 TDI 节点添加子节点 TDI_TOOL_COMMENT；
                        Element TDI_TOOL_COMMENT = new Element("TDI_TOOL_COMMENT");
                        TDI_TOOL_COMMENT.addContent("");
                        TDI.addContent(TDI_TOOL_COMMENT);
                        /*************** TDI end *****************/

                        //将DataElem变成ToolList的子节点
                        ToolList.addContent(DataElem);
                        root.addContent(ToolList);
                        // 使xml文件 缩进效果
                        Format format = Format.getPrettyFormat();
                        XMLOutputter XMLOut = new XMLOutputter(format);

                        Date date = new Date();
                        SimpleDateFormat sdf = new SimpleDateFormat("YYYYMMddHHmmss");

                        System.out.println("发送西门子=" + SEND_SIEMENS_PATH + "ToolMasterData_" + sdf.format(date) + k + ".xml");

                        FileOutputStream writer = new FileOutputStream(SEND_SIEMENS_PATH + "ToolMasterData_" + sdf.format(date) + ".xml");
                        //西门子文件路径
                        XMLOut.output(Doc, writer);
                        //XMLOut.output(Doc, new FileOutputStream("D:\\ToolMasterData_xml.xml"));
                        writer.close();

                        //修改刀具发放状态
                        String cuttoolNo = list.get(i).getCuttoolNo();
                        String sql = "update c_cuttool_basedata set send_state='1' where cuttool_no='" + cuttoolNo + "'";
                        dao.sqlUpdate(sql);
                        k++;
                    }
                }
            }

            result.append("result", "yes");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", "no");
            return result.toString();

        }
    }

    @Override
    public Object saveAllCuttoolMsg(String request) {

		/*返回保存结果*/
        JSONObject resultData = new JSONObject();
        try {

            JSONObject allMsg = new JSONObject(request);
            /*获取刀具基础数据json*/
            JSONObject cutBaseMsg = allMsg.getJSONObject("cutBaseMsg");
            /*json字符串转化成对象*/
            ObjectMapper objectMapper = new ObjectMapper();

            CCuttoolBasedata cCuttoolBasedata = objectMapper.readValue(cutBaseMsg.toString(), CCuttoolBasedata.class);

           /* cCuttoolBasedata.setCuttoolNo(cutBaseMsg.getString("cuttoolNo"));
            cCuttoolBasedata.setBarCode(cutBaseMsg.getString("barCode"));
            cCuttoolBasedata.setCharacteristicDescription(cutBaseMsg.getString("characteristicDescription"));
            cCuttoolBasedata.setCuttoolDescription(cutBaseMsg.getString("cuttoolDescription"));

            if (!"".equals(cutBaseMsg.getString("lifetimeTracking"))){

                cCuttoolBasedata.setLifetimeTracking(Integer.parseInt(cutBaseMsg.getString("lifetimeTracking")));
            }
            if(!"".equals(cutBaseMsg.getString("priorityLevel"))){

                cCuttoolBasedata.setPriorityLevel(Integer.parseInt(cutBaseMsg.getString("priorityLevel")));
            }
            if(!"".equals(cutBaseMsg.getString("programmingDiameterLarge"))){

                cCuttoolBasedata.setProgrammingDiameterLarge(Float.parseFloat(cutBaseMsg.getString("programmingDiameterLarge")));
            }
            if(!"".equals(cutBaseMsg.getString("programmingDiameterSmall"))){

                cCuttoolBasedata.setProgrammingDiameterSmall(Float.parseFloat(cutBaseMsg.getString("programmingDiameterSmall")));
            }
            if(!"".equals(cutBaseMsg.getString("programmingDiameterLength"))){

                cCuttoolBasedata.setProgrammingDiameterLength(Float.parseFloat(cutBaseMsg.getString("programmingDiameterLength")));
            }
            cCuttoolBasedata.setCuttoolHandleType(cutBaseMsg.getString("cuttoolHandleType"));
            cCuttoolBasedata.setFun(cutBaseMsg.getString("fun"));
            cCuttoolBasedata.setType(cutBaseMsg.getString("type"));
            cCuttoolBasedata.setUsingStatus(cutBaseMsg.getInt("usingStatus"));
            cCuttoolBasedata.setInitiateStatus(cutBaseMsg.getInt("initiateStatus"));
            cCuttoolBasedata.setStatusDescription(cutBaseMsg.getString("statusDescription"));
            if(!"".equals(cutBaseMsg.getString("initialLifetime"))){

                cCuttoolBasedata.setInitialLifetime(Integer.parseInt(cutBaseMsg.getString("initialLifetime")));
            }
            if(!"".equals(cutBaseMsg.getString("surplusLifetime"))){

                cCuttoolBasedata.setSurplusLifetime(Integer.parseInt(cutBaseMsg.getString("surplusLifetime")));
            }
            if(!"".equals(cutBaseMsg.getString("lifeAlarm"))){

                cCuttoolBasedata.setLifeAlarm(Integer.parseInt(cutBaseMsg.getString("lifeAlarm")));
            }
            if(!"".equals(cutBaseMsg.getString("isScrap"))){

                cCuttoolBasedata.setIsScrap(Integer.parseInt(cutBaseMsg.getString("isScrap")));
            }
            cCuttoolBasedata.setInitialStock(cutBaseMsg.getString("initialStock"));
            cCuttoolBasedata.setIntialGoodsAllocation(cutBaseMsg.getString("intialGoodsAllocation"));
            cCuttoolBasedata.setGraphical(cutBaseMsg.getString("graphical"));
*/
            /**
             * 保存基础数据
             */
            save(cCuttoolBasedata);
            /**
             * 刀具装配信息保存
             */
            if(allMsg.has("assemble")){

                cuttoolAssemblyService.savewithmid(allMsg.getJSONArray("assemble").toString());
            }
            /**
             *类型参数信息
             */
            if (allMsg.getJSONArray("tyle").getJSONObject(0).getJSONArray("rowValue").length() > 0) {

                saveCPar(allMsg.getJSONArray("tyle").toString());
            }
            /**
             * 功能参数信息
             */

            if (allMsg.getJSONArray("function").getJSONObject(0).getJSONArray("rowValue").length() > 0) {

                saveCPar(allMsg.getJSONArray("function").toString());
            }

            resultData.append("result", "true");
            return resultData.toString();

        } catch (Exception e) {

            e.printStackTrace();
            resultData.append("result", e.getMessage());
            /**
             * 事务回滚
             */
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

            return resultData.toString();
        }

    }

    /**
     * name:guofeng 2016-09-22 删除刀具
     * @param cuttoll_no
     * @return
     */
    @Override
    public String deleteCuttool(String cuttoll_no){
        JSONObject resultData = new JSONObject();
        try{
            JSONObject map = new JSONObject(cuttoll_no);
            String sql = "SELECT * FROM c_material_affairs_handle a WHERE (a.source_type='借用-归还' OR a.source_type='库房发料') AND a.source = '"+map
                    .getString("cuttool_no")+"'";
            List list = dao.createSQL(sql);
            if(list!=null&&list.size()>0){
                resultData.put("result",false);
            }else{
                List cuttool_id = dao.createSQL("select a.* from c_cuttool_basedata a where a.cuttool_no='"+map.getString("cuttool_no")+"'");
                sql = "DELETE FROM c_material_parameter WHERE _id='"+((HashMap)cuttool_id.get(0)).get("cuttool_id")+"'";
                dao.sqlUpdate(sql);
                sql = "DELETE FROM c_cuttool_assembly WHERE cuttool_no='"+map.getString("cuttool_no")+"'";
                dao.sqlUpdate(sql);
                sql = "DELETE FROM c_cuttool_basedata WHERE cuttool_no='"+map.getString("cuttool_no")+"'";
                dao.sqlUpdate(sql);
                resultData.put("result",true);
            }
            return resultData.toString();
        }catch (Exception e){
            //事务回滚
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            System.out.println(e.getMessage());
        }
        return resultData.put("result",false).toString();
    }

    /**
     * 删除二维码图片
     *
     * @param id
     */
    @Override
    public void removeImages(String id){
        try{
            if(!id.equals("")){
                File f = new File(rootPath + id+".png");
                f.delete(); f=null;
            };
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
