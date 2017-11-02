package com.smtcl.machinetool.service;

import org.springframework.transaction.annotation.*;

import java.util.List;

/**
 * Created by CJS on 2016/4/21.
 */
public interface ICuttoolBorrowService {

	/**
     * 保存发放信息
     * @param uploadValue
     * @return
     */
    @Transactional
    String saveBorrowMsg(String uploadValue);

    List getHeadOrRow(String requestBody);

    List getRowByBorrowNo(String requestBody);

	/**
     * 保存归还信息
     * @param uploadValue
     * @return
     */
    @Transactional
    String saveReturnMsg(String uploadValue);

    String setTaskNo(String uploadJson);

	/**
     * 刀具是否可以借用判断查询
     * @param cuttoolNo 刀具编号
     * @return
     */
    Object canBorrowOrNot(String cuttoolNo);

}
