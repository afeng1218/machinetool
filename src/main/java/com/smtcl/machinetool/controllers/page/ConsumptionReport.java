package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IConsumptionReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GuoFeng on 2016/7/11.
 */
@RestController
@ResponseBody
@RequestMapping("/consumption")
public class ConsumptionReport {

    @Autowired
    IConsumptionReportService service;
    //模糊查询刀具信息
    @RequestMapping(value = "/blurSearch", method = RequestMethod.POST)
    public List blurSearch(@RequestBody String json) {
       return service.blurSearch(json);
    }
}
