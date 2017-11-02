package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.models.machinetool.*;
import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by guofeng on 2016/8/24.
 */
@RestController
@ResponseBody
@RequestMapping("/source")
public class Source{

    @Autowired
    ISourceService service;

    //来源按钮 是否高亮显示
    @RequestMapping(value = "/getSourceState", method = RequestMethod.GET)
    public Object getSourceState() {
        return service.getSourceState();
    }

    //来源数据
    @RequestMapping(value = "/getSourceData", method = RequestMethod.GET)
    public String getSourceData() {
        return service.getSourceData();
    }
}
