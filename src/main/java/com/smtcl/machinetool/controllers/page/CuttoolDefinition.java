package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.controllers.util.*;
import com.smtcl.machinetool.dao.IGenericDAO;
import com.smtcl.machinetool.models.machinetool.CCuttoolBasedata;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.text.*;
import java.util.*;

import org.springframework.web.multipart.*;

import javax.servlet.http.*;

/**
 * Created by GuoFeng on 2016/1/25. TODO 刀具定义维护 1.刀具定义 2.图片上传
 * Changed by GuoFeng on 2016/7/20 TODO 添加读取对刀仪、发送西门子
 * Changed by GuoFeng on 2016/8/9 TODO 修改刀具保存，整合所有分散的上传模块，重新添加保存方法，添加事务处理
 */
@RestController
@ResponseBody
@RequestMapping("/cuttool")
public class CuttoolDefinition {
    //设置日期格式
    private SimpleDateFormat ymdhms =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    //@Value("${wis.appid}")
    //private String appid;

    //@Value("${wis.appkey}")
    //private String appkey;

    //@Value("${wis.server}")
    //private String server;

    /**
     * 刀具定义service
     */
    @Autowired
    ICuttoolDefinitionService service;
    /**
     * dao
     */
    @Autowired
    IGenericDAO dao;
    /**
     * RFID service
     */
    @Autowired
    IRFIDService irfidService;

    //保存刀具定义信息
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String save(@RequestBody CCuttoolBasedata c1) {
        c1.setInitiateStatus(0);
        return service.save(c1);
    }

    /**
	 * 更新刀具寿命
     * @return
     */
//    private boolean updateLife(String cno){
//        try{
//            String sql="SELECT a.cuttool_no,b.material_no,c.initial_lifetime " +
//                    "FROM c_process_card AS a " +
//                    "LEFT JOIN c_general_material AS b ON a.material_id=b.material_id " +
//                    "LEFT JOIN c_cuttool_basedata AS c ON a.cuttool_no=c.cuttool_no " +
//                    "WHERE a.cuttool_no='"+cno+"'";
//            List list=dao.createSQL(sql);sql=null;
//            int num=0;
//            //初始寿命
//            int initial_lifetime=((HashMap)list.get(0)).get("initial_lifetime")==null||
//                    ((HashMap)list.get(0)).get("initial_lifetime").toString().equals("")?0:
//                    (int)((HashMap)list.get(0)).get("initial_lifetime");
//            for(int i=0;i<list.size();i++){
//                String a=list.get(i).toString().replaceAll("=",":");
//                JSONObject b=new JSONObject(a);a=null;
//                /**********************调用wis接口,查询刀具加工次数算出刀具剩余寿命*************************/
//                String  equipmentID = b.get("material_no").toString();b=null;//工艺编码
//                String  dataTime = ymdhms.format(new Date());
//                ApiSDK  openApi = new ApiSDK(server,appid,appkey);
//                HashMap params = new HashMap();
//                params.put("equipmentID", equipmentID);equipmentID=null;
//                params.put("dataTime", dataTime);dataTime=null;
//                params.put("equipmentStatus", "free");
//                JSONObject json = new JSONObject(openApi.call("/dc/sendEquipStatus", params, "http"));
//                params=null;openApi=null;
//                int n=json==null?0:json.getInt("wcsl");//返回的数据 6替换为json
//                num=num+n;//寿命累计
//                /**********************调用wis接口,查询刀具加工次数算出刀具剩余寿命 edn**********************/
//            };list=null;
//            int surplus_lifetime=initial_lifetime-num;
//            sql="UPDATE c_cuttool_basedata AS a SET a.surplus_lifetime='"+(surplus_lifetime<0?0:surplus_lifetime)+"' WHERE a.cuttool_no='"+cno+"'";
//            dao.sqlUpdate(sql);sql=null;
//        }catch (Exception e){
//            e.printStackTrace();
//        }finally{
//            return true;
//        }
//    };

    //模糊查询刀具信息
    @RequestMapping(value = "/blursearch", method = RequestMethod.POST)
    public List search(@RequestBody String json) {
        List list = new ArrayList();
        List<CCuttoolBasedata> basedataList = new ArrayList<CCuttoolBasedata>();
        basedataList = service.blursearch(json);
        if (basedataList != null || basedataList.size() > 0) {
            for (int i = 0; i < basedataList.size(); i++) {
                Map<String, Object> tooldata = new HashMap<String, Object>();
                String cno = basedataList.get(i).getCuttoolNo();
//                if(updateLife(cno)){ //更新刀具寿命
                    String cinitStatus = "";
                    int isEnable = basedataList.get(i).getInitiateStatus();
                    if (isEnable == 1) {
                        cinitStatus = "是";
                    }
                    if (isEnable == 0) {
                        cinitStatus = "否";
                    }
                    String cdes = basedataList.get(i).getCuttoolDescription();
                    //			判处理整型数据，避免出现取数据时发生空指针异常
                    String cdiaSmall;
                    String cdiaLarge;
                    String cdiaLength;
                    String cinitLifetime;
                    String csurLifetime;
                    if (basedataList.get(i).getProgrammingDiameterSmall() == null) {
                        cdiaSmall = "";
                    } else {
                        cdiaSmall = basedataList.get(i).getProgrammingDiameterSmall().toString();
                    }
                    if (basedataList.get(i).getProgrammingDiameterLarge() == null) {
                        cdiaLarge = "";
                    } else {
                        cdiaLarge = basedataList.get(i).getProgrammingDiameterLarge().toString();
                    }
                    if (basedataList.get(i).getProgrammingDiameterLength() == null) {
                        cdiaLength = "";
                    } else {
                        cdiaLength = basedataList.get(i).getProgrammingDiameterLength().toString();
                    }
                    if (basedataList.get(i).getInitialLifetime() == null) {
                        cinitLifetime = "";
                    } else {
                        cinitLifetime = Integer.toString(basedataList.get(i).getInitialLifetime());
                    }
                    if (basedataList.get(i).getSurplusLifetime() == null) {
                        csurLifetime = "";
                    } else {
                        csurLifetime = Integer.toString(basedataList.get(i).getSurplusLifetime());
                    }
                    String crenshu = "";
                    //				String cfun                       = basedataList.get(i).getFunction();
                    String cfun = basedataList.get(i).getFun();
                    String ctype = basedataList.get(i).getType();
                    String ccharacteristicDescription = basedataList.get(i).getCharacteristicDescription();
                    String cstatusDescription = basedataList.get(i).getStatusDescription();
                    String isScrap = "";
                    int cisScrap = basedataList.get(i).getIsScrap();
                    if (cisScrap == 1) {
                        isScrap = "是";
                    }
                    if (cisScrap == 0) {
                        isScrap = "否";
                    }
                    String cstorenum = basedataList.get(i).getIntialGoodsAllocation();
                    String nowPlace = basedataList.get(i).getInitialStock();
                    String cstoreroom = basedataList.get(i).getInitialStock();
                    tooldata.put("cstorenum", cstorenum);
                    tooldata.put("nowPlace", nowPlace);
                    tooldata.put("cstoreroom", cstoreroom);
                    tooldata.put("cNo", cno);
                    tooldata.put("cinitiateStatus", cinitStatus);
                    tooldata.put("cdes", cdes);
                    tooldata.put("cdiameterSmall", cdiaSmall);
                    tooldata.put("cdiameterLarge", cdiaLarge);
                    tooldata.put("cdiameterLength", cdiaLength);
                    tooldata.put("crenshu", crenshu);
                    tooldata.put("cfun", cfun);
                    tooldata.put("ctype", ctype);
                    tooldata.put("ccharacteristicDescription", ccharacteristicDescription);
                    tooldata.put("cstatusDescription", cstatusDescription);
                    tooldata.put("cinitialLifetime", cinitLifetime);
                    tooldata.put("csurplusLifetime", csurLifetime);
                    tooldata.put("cisScrap", isScrap);
                    //发送状态
                    tooldata.put("send_state", basedataList.get(i).getSendState() == null ? 0 : basedataList.get(i).getSendState());
                    list.add(tooldata);
//                }
            }
            return list;
        } else {
            System.out.print("没有符合项");
            return null;
        }
    }

    //根据刀具编号查询刀具信息
    @RequestMapping(value = "/searchbyno", method = RequestMethod.GET)
    public List searchbyno(@RequestParam String cuttoolNo) {

        List list = new ArrayList();
        List<CCuttoolBasedata> clist = new ArrayList<CCuttoolBasedata>();
        clist = service.searchbyno(cuttoolNo);
        if (clist != null || clist.size() > 0) {
            for (int i = 0; i < clist.size(); i++) {
                Map<String, Object> cdata = new HashMap<String, Object>();
                int cId = clist.get(0).getCuttoolId();
                String cno = clist.get(i).getCuttoolNo();
                String cinitStatus = "";
                int isEnable = clist.get(i).getInitiateStatus();
                if (isEnable == 1) {
                    cinitStatus = "是";
                }
                if (isEnable == 0) {
                    cinitStatus = "否";
                }
                String cdes = clist.get(i).getCuttoolDescription();
                //			判处理整型数据，避免出现取数据时发生空指针异常
                String cdiaSmall;
                String cdiaLarge;
                String cdiaLength;
                String cinitLifetime;
                String csurLifetime;
                if (clist.get(i).getProgrammingDiameterSmall() == null) {
                    cdiaSmall = "";
                } else {
                    cdiaSmall = clist.get(i).getProgrammingDiameterSmall().toString();
                }
                if (clist.get(i).getProgrammingDiameterLarge() == null) {
                    cdiaLarge = "";
                } else {
                    cdiaLarge = clist.get(i).getProgrammingDiameterLarge().toString();
                }
                if (clist.get(i).getProgrammingDiameterLength() == null) {
                    cdiaLength = "";
                } else {
                    cdiaLength = clist.get(i).getProgrammingDiameterLength().toString();
                }
                if (clist.get(i).getInitialLifetime() == null) {
                    cinitLifetime = "";
                } else {
                    cinitLifetime = Integer.toString(clist.get(i).getInitialLifetime());
                }
                if (clist.get(i).getSurplusLifetime() == null) {
                    csurLifetime = "";
                } else {
                    csurLifetime = Integer.toString(clist.get(i).getSurplusLifetime());
                }
                String crenshu = "";
                //				String cfun                       = clist.get(i).getFunction();
                String cfun = clist.get(i).getFun();
                String ctype = clist.get(i).getType();

                List<String> typeIdList = dao.executeQuery("select cpm.id from CParameterModel cpm " +
                        " where cpm.category='" + ctype + "' " +
                        " and cpm.type=2 ");
                String typeId = typeIdList!=null&&typeIdList.size()>0?typeIdList.get(0):"";

                String ccharacteristicDescription = clist.get(i).getCharacteristicDescription();
                String cstatusDescription = clist.get(i).getStatusDescription();
                String isScrap = "";
                int cisScrap = clist.get(i).getIsScrap();
                if (cisScrap == 1) {
                    isScrap = "是";
                }
                if (cisScrap == 0) {
                    isScrap = "否";
                }
                String barCode = clist.get(i).getBarCode();
                String handtype = clist.get(i).getCuttoolHandleType();
                String level;
                if (clist.get(i).getPriorityLevel() == null) {
                    level = "";
                } else {
                    level = Integer.toString(clist.get(i).getPriorityLevel());
                }
                String istrack = "";
                int cistrack = clist.get(i).getLifetimeTracking();
                if (cistrack == 1) {
                    istrack = "是";
                }
                if (cistrack == 0) {
                    istrack = "否";
                }

                String usingStatus = "";
                int status = clist.get(i).getUsingStatus();
                if (status == 1) {
                    usingStatus = "新";
                }
                if (status == 0) {
                    usingStatus = "旧";
                }
                String statusDes = clist.get(i).getStatusDescription();
                String pic = clist.get(i).getGraphical();
                int lifeAlarm = 0;
                if (clist.get(i).getLifeAlarm() != null) {
                    lifeAlarm = clist.get(i).getLifeAlarm();
                }

                cdata.put("typeId", typeId);
                cdata.put("cNo", cno);
                cdata.put("cinitiateStatus", isEnable);
                cdata.put("cdes", cdes);
                cdata.put("cdiameterSmall", cdiaSmall);
                cdata.put("cdiameterLarge", cdiaLarge);
                cdata.put("cdiameterLength", cdiaLength);
                cdata.put("crenshu", crenshu);
                cdata.put("cfun", cfun);
                cdata.put("ctype", ctype);
                cdata.put("ccharacteristicDescription", ccharacteristicDescription);
                cdata.put("cstatusDescription", cstatusDescription);
                cdata.put("cinitialLifetime", cinitLifetime);
                cdata.put("csurplusLifetime", csurLifetime);
                cdata.put("cisScrap", cisScrap);
                cdata.put("barCode", barCode);
                cdata.put("handtype", handtype);
                cdata.put("level", level);
                cdata.put("istrack", cistrack);
                cdata.put("usingStatus", status);
                cdata.put("statusDes", statusDes);
                cdata.put("pic", pic);
                cdata.put("lifeAlarm", lifeAlarm);
                list.add(cdata);
            }
            return list;
        }
        return null;
    }

    //查询所有刀具
    List<CCuttoolBasedata> cuttoolBasedataList = new ArrayList<CCuttoolBasedata>();

    @RequestMapping("/getList")
    public List<CCuttoolBasedata> getList() {

        return service.getList();
    }

    //上传图片
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String upload(@RequestParam("name") String name, @RequestParam("cuttoolpic") MultipartFile file) {
        return service.upload(name, file);
    }

    @RequestMapping(value = "/getPicName", method = RequestMethod.GET)
    public String getPicName(@RequestParam("cuttoolNo") String cuttoolNo) {

        return service.getPicName(cuttoolNo);
    }

    @RequestMapping(value = "/enableCuttool", method = RequestMethod.GET)
    public String enableCuttool(@RequestParam("cno") String cno, @RequestParam("croom") String croom, @RequestParam("cplace") String cplace) {

        return service.enableCuttool(cno, croom, cplace);
    }

    @RequestMapping(value = "/searchByCno", method = RequestMethod.GET)
    public String searchByCno(@RequestParam("cuttoolNo") String cuttoolNo) {

        return service.searchByCno(cuttoolNo);
    }

    @RequestMapping(value = "/saveCPar", method = RequestMethod.POST)
    String saveCPar(@RequestBody String uploadValue) {

        return service.saveCPar(uploadValue);
    }

    @RequestMapping(value = "/upadtePar", method = RequestMethod.POST)
    String upadtePar(@RequestBody String uploadValue) {

        return service.upadtePar(uploadValue);
    }

    @RequestMapping(value = "/searchCParBycno", method = RequestMethod.GET)
    public List searchCParBycno(@RequestParam("cuttoolNo") String cuttoolNo, @RequestParam("type") int type) {

        return service.searchCParBycno(cuttoolNo, type);
    }

    /**
     * created by GuoFeng on 2016/7/20
     * 获取对刀仪共享文件加文件状态
     *
     * @return
     */
    @RequestMapping(value = "/getMicrosetState", method = RequestMethod.GET)
    public Object getMicrosetState() {

        return service.getMicrosetState();
    }

    /**
     * created by GuoFeng on 2016/7/20
     * 获取对刀仪指定目录共享文件夹数据
     *
     * @param path
     * @return
     */
    @RequestMapping(value = "/getMicroset", method = RequestMethod.POST)
    public Object getMicroset(@RequestParam("path") String path) {

        return service.getMicroset(path);
    }

    /**
     * created by GuoFeng on 2016/7/20
     * 发送西门子
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/sendState", method = RequestMethod.POST)
    public String sendState(@RequestBody String json) {

        return service.sendState(json);
    }

    /**
     * created by GuoFeng on 2016/7/20
     * 写入RFID
     *
     * @return
     */
    @RequestMapping(value = "/sendRFID", method = RequestMethod.GET)
    public Object sendRFID(@RequestParam("content") String content) {

        return irfidService.send(content);
    }

    /**
     * created by GuoFeng on 2016/8/9
     * 刀具保存
     *
     * @param request 上传的保存数据
     * @return
     */
    @RequestMapping(value = "/saveAllCuttoolMsg", method = RequestMethod.POST)
    public Object saveAllCuttoolMsg(@RequestBody String request) {

        return service.saveAllCuttoolMsg(request);

    }

	/**
	 * 删除刀具
     * @param cuttoll_no
     * @return
     */
    @RequestMapping(value = "/deleteCuttool", method = RequestMethod.POST)
    public String deleteCuttool(@RequestBody String cuttoll_no){

        return service.deleteCuttool(cuttoll_no);
    }

	/**
	 * 生成二维码
     * @param data
     * @return
     */
    private CoderService coderService;
    @Autowired
    private void setCoderService(CoderService coderService) {
        this.coderService = coderService;
    }
    @RequestMapping(value = "/pinErwm", method = RequestMethod.POST)
    public String pinErwm(@RequestBody String data,HttpSession session) throws Exception{
        JSONObject resultData = new JSONObject();
        try{
            JSONArray objArry = new JSONArray(data);
            String type=objArry.getJSONObject(0).getString("type");
            String body=""; //协议所需数据
            //String realUploadPath = session.getServletContext().getRealPath("\\WEB-INF\\classes\\static\\uploadImg");
            String realUploadPath = System.getProperty("user.dir").replace("bin", "webapps") + "\\machinetool\\WEB-INF\\classes\\static\\uploadImg\\";

            String imageName =null;
            if(type.equals("1")){   //刀具借用
                String borrow_no = objArry.getJSONObject(0).getString("borrow_no");
                body="PICK/";
                for(int i=0;i<objArry.length();i++){
                    body+=objArry.getJSONObject(i).getString("material_no")+"/"+
                            objArry.getJSONObject(i).getString("borrow_number")+"/"+
                            objArry.getJSONObject(i).getString("cargo_space_no")+"/";
                }objArry=null;
                imageName =  borrow_no+".png" ;
            }else if(type.equals("2")){  //刀具归还
                body="STORE/";
                String return_no = objArry.getJSONObject(0).getString("return_no");
                for(int i=0;i<objArry.length();i++){
                    body+=objArry.getJSONObject(i).getString("materialNo")+"/"+
                            objArry.getJSONObject(i).getInt("returnNum")+"/"+
                            objArry.getJSONObject(i).getString("goodPlace")+"/";
                }objArry=null;
                imageName =  return_no+".png" ;
            }else if(type.equals("3")){//订单接受
                body="STORE/";
                String orderNo = objArry.getJSONObject(0).getString("orderNo");
                for(int i=0;i<objArry.length();i++){
                    body+=objArry.getJSONObject(i).getString("materialNo")+"/"+
                            objArry.getJSONObject(i).getInt("acceptNumber")+"/"+
                            objArry.getJSONObject(i).getString("storageLocationNo")+"/";
                }objArry=null;
                imageName =  orderNo+".png" ;
            }else if(type.equals("4")){//采购退货
                String orderNo = objArry.getJSONObject(0).getString("orderNo");
                body="PICK/";
                for(int i=0;i<objArry.length();i++){
                    body+=objArry.getJSONObject(i).getString("materialNo")+"/"+
                            objArry.getJSONObject(i).getString("acceptNumber")+"/"+
                            objArry.getJSONObject(i).getString("storageLocationNo")+"/";
                }objArry=null;
                imageName =  orderNo+".png" ;
            }else{//发料处理
                String faliaohao = objArry.getJSONObject(0).getString("faliaohao");
                body="PICK/";
                for(int i=0;i<objArry.length();i++){
                    body+=objArry.getJSONObject(i).getString("wuliao_name")+"/"+
                            objArry.getJSONObject(i).getString("fafangshuliang")+"/"+
                            objArry.getJSONObject(i).getString("huowei")+"/";
                }objArry=null;
                imageName =  faliaohao+".png" ;
            };
            // 模拟订单详情
            int width = 300,height = 300;
            coderService.encode(body+"END", width, height, null, realUploadPath, imageName);
            return resultData.put("url","uploadImg/"+imageName).toString();
        }catch (Exception e){
            e.printStackTrace();
        };
        return resultData.put("url","null").toString();
    };

    @RequestMapping(value = "/removeImages",method = RequestMethod.POST)
    public void removeImages(@RequestBody String id){
        service.removeImages(id);
    }
}
