package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Created by SunJun on 2016/7/12.
 */
@RestController
@ResponseBody
@RequestMapping("/sendStereoLibrary")
public class SendStereoLibrary {

    @Autowired
    ISendStereoLibraryService service;

    /**
     * 发送立体库
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public Object send(@RequestBody String request) {

        return service.send(request);
    }

    /**
     * 获取立体库状态
     *
     * @param fileName
     * @return
     */
    @RequestMapping(value = "/stereoLibraryState", method = RequestMethod.GET)
    public Object stereoLibraryState(@RequestParam("fileName") String fileName) {

        return service.stereoLibraryState(fileName, "");
    }

}
