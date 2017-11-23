package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.ICSceneLayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ResponseBody
@RequestMapping("/layout")
public class layout {

    @Autowired
    ICSceneLayoutService service;

    @RequestMapping(value = "/getLayoutById", method = RequestMethod.POST)
    public List getLayoutById(@RequestBody String uploadValue){
        return service.getLayoutById(uploadValue);
    }

    @RequestMapping(value = "/saveData", method = RequestMethod.POST)
    public String saveDate(@RequestBody String data) {
        return service.saveLayout(data);
    }
}



