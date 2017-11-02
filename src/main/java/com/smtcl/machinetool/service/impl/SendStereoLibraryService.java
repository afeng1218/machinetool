package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import sun.tools.native2ascii.resources.MsgNative2ascii;

import java.io.*;
import java.net.InetAddress;

/**
 * Created by SunJun on 2016/7/12.
 */
@Service
public class SendStereoLibraryService implements ISendStereoLibraryService {

    /**
     * 立体库ip地址
     */
    @Value("${send.stereoLibrary.ip}")
    private String SEND_STEREOLIBRARY_IP;
    /**
     * 立体库 物料申请路径
     */
    @Value("${send.stereoLibrary.material}")
    private String SEND_STEREOLIBRARY_MATERIAL;

    /**
     * 立体库 物料入库
     */
    @Value("${send.stereoLibrary.putorder}")
    private String SEND_STEREOLIBRARY_PUTORDER;

    /**
     * 立体库 物料出库
     */
    @Value("${send.stereoLibrary.pickorder}")
    private String SEND_STEREOLIBRARY_PICKORDER;

    @Override
    public Object send(String request) {

        /**
         * 发送路径
         */
        String sendPath = "";

        JSONObject requestJSON = new JSONObject(request);

        /**
         * 判断来源
         */
        String source = requestJSON.getString("source");

        /**
         * 如果是物料申请
         */
        if ("material".equals(source)) {

            sendPath = SEND_STEREOLIBRARY_MATERIAL;
        }
        /**
         * 如果是入库
         */
        if ("putorder".equals(source)) {

            sendPath = SEND_STEREOLIBRARY_PUTORDER;
        }
        /**
         * 如果是出库
         */
        if ("pickorder".equals(source)) {

            sendPath = SEND_STEREOLIBRARY_PICKORDER;
        }


        JSONArray sendValue = requestJSON.getJSONArray("sendValue");
        String fileName = requestJSON.getString("fileName");

        JSONObject result = new JSONObject();
        File file = null;
        File path = new File(sendPath);
        BufferedWriter bf = null;
        Writer writer = null;
        try {

            InetAddress inet = InetAddress.getByName(SEND_STEREOLIBRARY_IP);
            if (inet.isReachable(2000)) {

                /**
                 * 新建发送文件
                 */
                file = new File(sendPath + "/" + fileName);

                bf = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "UNICODE"));

                for (int i = 0; i < sendValue.length(); i++) {

                    JSONObject jsonObject = sendValue.getJSONObject(i);
                    bf.write(jsonObject.getString("sendLine"));
                    bf.newLine();
                }
                bf.flush();

                result.append("result", "true");
                return result.toString();

            } else {

                result.append("result", "立体库文件夹不存在！");
                return result.toString();
            }

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();

        } finally {

            try {

                if (bf != null) {

                    bf.close();
                    bf = null;
                }

            } catch (Exception e) {

                e.printStackTrace();
                result.append("result", e.getMessage());
                return result.toString();
            }
        }

    }

    @Override
    public Object stereoLibraryState(String fileName, String sendPath) {

        JSONObject result = new JSONObject();
        File path = new File(sendPath);
        try {

            InetAddress inet = InetAddress.getByName(SEND_STEREOLIBRARY_IP);
            if (inet.isReachable(2000)) {

                File[] listFiles = path.listFiles();
                for (File f : listFiles) {

                    if (f.getName().equals(fileName)) {

                        result.append("result", "立体库工作繁忙！");
                        return result.toString();

                    }
                }

            } else {

                result.append("result", "立体库文件夹不存在！");
                return result.toString();
            }

            result.append("result", "true");
            return result.toString();

        } catch (Exception e) {

            e.printStackTrace();
            result.append("result", e.getMessage());
            return result.toString();

        }

    }
}
