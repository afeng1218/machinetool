package com.smtcl.machinetool.service;

import org.springframework.transaction.annotation.*;

/**
 * Created by CJS on 2016/6/2.
 */
public interface ICuttoolScrapService {

    @Transactional
    String saveScrapMsg(String uploadValue);

    String isTotalScrap(String uploadJson);
}
