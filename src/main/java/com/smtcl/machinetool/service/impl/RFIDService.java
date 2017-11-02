package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.stereotype.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.*;

/**
 * Created by SunJun on 2016/7/18.
 */
@Service
public class RFIDService implements IRFIDService {

    @Override
    public Object send(String content) {

        JSONObject result = new JSONObject();

        try {

            /**
             * 获取当前请求
             */
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes()).getRequest();

            /**
             * 获取请求ip地址
             */
            String hostIp = request.getRemoteAddr();

            Socket s = new Socket(hostIp, 9000);
            //获取输出流
            DataOutputStream out = new DataOutputStream(s.getOutputStream());
            //获取Socket的输入流，用来接收从服务端发送过来的数据
            BufferedReader buf = new BufferedReader(new InputStreamReader(s.getInputStream(),"UTF-8"));

            /**
             * 向服务端写数据
             */
            out.write(content.getBytes());
            out.flush();

            char[] chars = new char[125];

            //获取服务端反馈数据
            buf.read(chars);

            //关闭输入流
            buf.close();
            //关闭输出流
            out.close();
            //关闭客户端连接
            s.close();

            String returnData = "";
            for (char c : chars) {

                if (c == '\0') {

                    break;
                }
                returnData += c;
            }

			/*如果是读取RFID 获取反馈结果之后*/
            if (content.substring(0, 1).equals("0")) {
                //returnData = "444*2%LB4&";//生产时把这行去掉
                String cuttoolNo = returnData.split("\\*")[0];
                String sisterNo = returnData.split("\\*")[1].split("%")[0].split("&")[0];
                if (!"".equals(sisterNo.trim())) {

                    cuttoolNo += "-"+sisterNo;
                }
                result.append("dataResult", cuttoolNo);

				/*如果是写入RFID*/
            } else {

                result.append("dataResult", returnData);
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
