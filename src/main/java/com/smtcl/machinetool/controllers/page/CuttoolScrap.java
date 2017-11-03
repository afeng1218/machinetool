package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.ICuttoolScrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by GuoFeng on 2016/6/2.
 */
@RestController
@ResponseBody
@RequestMapping("/cuttoolScrap")
public class CuttoolScrap {

    @Autowired
    ICuttoolScrapService service;

    @RequestMapping(value = "/saveScrapMsg", method = RequestMethod.POST)
    String saveScrapMsg(@RequestBody String uploadValue){

        return service.saveScrapMsg(uploadValue);
    }
    @RequestMapping(value = "/isTotalScrap", method = RequestMethod.POST)
    String isTotalScrap(@RequestBody String uploadJson){

        return service.isTotalScrap(uploadJson);
    }
}
