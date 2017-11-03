package com.smtcl.machinetool.service;

/**
 * Created by GuoFeng on 2016/7/12.
 */
public interface ISendStereoLibraryService {

    /**
     * 发送立体库
     *
     * @return
     */
    Object send(String request);

    /**
     * 获取立体库状态
     *
     * @param fileName
     * @return
     */
    Object stereoLibraryState(String fileName, String sendPath);
}
