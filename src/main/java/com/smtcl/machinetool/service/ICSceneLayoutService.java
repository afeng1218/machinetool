package com.smtcl.machinetool.service;

import java.util.List;

public interface ICSceneLayoutService {

    List getLayoutById(String uploadValue);

    String saveLayout(String data);
}
