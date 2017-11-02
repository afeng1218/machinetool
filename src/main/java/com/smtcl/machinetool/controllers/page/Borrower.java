package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.BorrowerModel;
import com.smtcl.machinetool.models.machinetool.CBorrower;
import com.smtcl.machinetool.service.IBorrowerService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by CJS on 2016/7/4.
 */
@RestController
@ResponseBody
@RequestMapping("/borrower")
public class Borrower {

    @Autowired
    IBorrowerService service;

    //保存借用者信息
    @RequestMapping(value = "/saveBorrower", method = RequestMethod.POST)
    public String saveBorrower(@RequestBody String uploadJson) {

        return service.saveBorrower(uploadJson);
    }

    @RequestMapping(value = "/updateBorrower", method = RequestMethod.POST)
    public String updateBorrower(@RequestBody String uploadJson) {

        return service.updateBorrower(uploadJson);
    }

    @RequestMapping(value = "/searchByBno", method = RequestMethod.GET)
    public String searchByBno(@RequestParam("employeeCardNo") String employeeCardNo) {

        return service.searchByBno(employeeCardNo);
    }

    //模糊查询刀具信息
    @RequestMapping(value = "/blurSearch", method = RequestMethod.POST)
    public List blurSearch(@RequestBody String json) {
        List<BorrowerModel> borrowerModels = new ArrayList<BorrowerModel>();
        List<CBorrower> list = new ArrayList<CBorrower>();
        list = service.blurSearch(json);
        if (list.size() > 0) {
            for (int i = 0; i < list.size(); i++) {
                BorrowerModel borrowerModel = new BorrowerModel();
                String employeeCardNo = list.get(i).getEmployeeCardNo();
                String borrowedName = list.get(i).getBorrowedName();
                String workshop = list.get(i).getWorkshop();
                String workshopSection = list.get(i).getWorkshopSection();
                String team = list.get(i).getTeam();
                String productionLine = list.get(i).getProductionLine();
                String usingEquipment = list.get(i).getUsingEquipment();
                String organization = list.get(i).getOrganization();
                String equipmentName="";
                if(list.get(i).getCMechanicalEquipment()!=null){
                     equipmentName = list.get(i).getCMechanicalEquipment().getEquipmentName();
                }else{
                }

                Float allowBorrowNumber = list.get(i).getAllowBorrowNumber();
                if(allowBorrowNumber!=null){
                    borrowerModel.setAllowBorrowNumber(allowBorrowNumber);
                }else{
                    borrowerModel.setAllowBorrowNumber(0f);
                }


                String classification = list.get(i).getClassification();
                if(classification!=null){
                    borrowerModel.setClassification(classification);
                }else{
                    borrowerModel.setClassification("");
                }
//                String              createTime         = list.get(i).getCreateTime().toString();
                borrowerModel.setEmployeeCardNo(employeeCardNo);
                borrowerModel.setBorrowedName(borrowedName);
                borrowerModel.setWorkshop(workshop);
                borrowerModel.setWorkshopSection(workshopSection);
                borrowerModel.setTeam(team);
                borrowerModel.setProductionLine(productionLine);
                borrowerModel.setEquipmentName(equipmentName);
                borrowerModel.setUsingEquipment(usingEquipment);
                borrowerModel.setAllowBorrowNumber(allowBorrowNumber);
                borrowerModel.setOrganization(organization);
                borrowerModel.setCreateTime(list.get(i).getCreateTime());
                borrowerModels.add(borrowerModel);
            }
            return borrowerModels;
        } else {
            return null;
        }
    }
}
