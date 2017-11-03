package com.smtcl.machinetool.controllers.page;

import com.smtcl.machinetool.service.IStorageDefinitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by GuoFeng on 2016/3/1. TODO 库房定义 库房基础数据查询 获取人员信息 库房信息删除
 */
@RestController
@ResponseBody
@RequestMapping("/storageDefinition")
public class StorageDefinition {

    /**
     * 库房定义service接口
     */
    @Autowired
    IStorageDefinitionService service;

    /**
     * 库房查询
     *
     * @param storageNo
     * @param storageExplain
     * @param state
     * @return
     */
    @RequestMapping(value = "/storageSearch", method = RequestMethod.GET)
    public List storageSearch(@RequestParam("storageNo") String storageNo, @RequestParam("storageExplain") String storageExplain, @RequestParam
            ("storageState") String state) {

        return service.storageSearch(storageNo, storageExplain, state);
    }

    /**
     * 获取人员
     *
     * @return
     */
    @RequestMapping(value = "/getPerson", method = RequestMethod.GET)
    public List getPerson() {

        return service.getPerson();
    }

    /**
     * 库房删除
     *
     * @param storageId
     */
    @RequestMapping(value = "/storageDelete", method = RequestMethod.GET)
    public void storageDelete(@RequestParam("storageId") String storageId) {

        service.storageDelete(storageId);
    }

    /**
     * 库房数据保存
     *
     * @param upload
     * @return
     */
    @RequestMapping(value = "/storageUpload", method = RequestMethod.POST)
    public String storageUpload(@RequestBody String upload) {

        return service.storageUpload(upload);
    }

    /**
     * 库房编号查询
     *
     * @param storageNo
     * @return
     */
    @RequestMapping(value = "/storageNoSearch", method = RequestMethod.GET)
    public Object storageSearch(@RequestParam("storageNo") String storageNo) {

        return service.storageNoSearch(storageNo);
    }

    /**
     * 通过id查找库房数据
     *
     * @param Json
     * @return
     */
    @RequestMapping(value = "/searchByid", method = RequestMethod.POST)
    public String searchByid(@RequestBody String Json) {

        return service.searchByid(Json);
    }

    /**
     * 库房占用查询
     *
     * @return
     */
    @RequestMapping(value = "/storageOccupySearch", method = RequestMethod.GET)
    public Object storageOccupySearch(@RequestParam("storageId") String storageId, @RequestParam("storageNo") String storageNo) {

        return service.storageOccupySearch(storageId, storageNo);
    }

    /**
     * 库位占用查询
     *
     * @param storageRoomId
     * @param storageLocationId
     * @param storageLocationNo
     * @return
     */
    @RequestMapping(value = "/storageLocationOccupySearch", method = RequestMethod.GET)
    public Object storageLocationOccupySearch(@RequestParam("storageRoomId") String storageRoomId,
                                              @RequestParam("storageLocationId") String storageLocationId,
                                              @RequestParam("storageLocationNo") String storageLocationNo) {

        return service.storageLocationOccupySearch(storageRoomId, storageLocationId, storageLocationNo);

    }

    /**
     * 是否为立体库
     *
     * @param Json
     * @return
     */

    @RequestMapping(value = "/isLitiku", method = RequestMethod.POST)
    public String isLitiku(@RequestBody String Json) {

        return service.isLitiku(Json);
    }

    /**
     * 通过库房id查询库房no
     * @param storageId
     * @return
     */
    @RequestMapping(value = "/searchStorageNoById", method = RequestMethod.GET)
    public Object searchStorageNoById(@RequestParam("storageId") String storageId) {

        return service.searchStorageNoById(storageId);
    }

}
