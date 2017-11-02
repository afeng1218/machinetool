package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by guofeng on 2016/9/1.
 */
@RestController
@ResponseBody
@RequestMapping("/MechanicalEquipment")
public class MechanicalEquipment {

    @Autowired
    IMechanicalEquipmentService service;

    //机床设备保存
    @RequestMapping(value = "/saveData", method = RequestMethod.POST)
    public String save(@RequestBody String data) {
        return service.saveData(data);
    }
}
