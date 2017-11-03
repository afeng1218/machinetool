package com.smtcl.machinetool.controllers.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;

/**
 * Created by GuoFeng on 2016/3/4. TODO Base64编解码程序 主要用于数据库用户名密码加密 加密数据传输
 */
public class Base64Util{

	/**
	 * 加密次数
	 */
	private static final int times = 3;

	/**
	 * 提供加密n次
	 * @param mingwen 密文
	 * @return
	 */
	public static String encodeBase64(String mingwen){

		int           num           = (times <= 0) ? 1 : times;
		BASE64Encoder base64Encoder = new BASE64Encoder();
		String        code          = "";
		if (mingwen == null || mingwen.equals("")){

		} else{
			code = mingwen;
			for (int i = 0; i < num; i++){

				code = base64Encoder.encode(code.getBytes());
			}
		}
		return code;
	}

	/**
	 * 揭秘n次
	 * @param mi
	 * @return
	 */
	public static String decodeBase64(String mi){

		int           num           = (times <= 0) ? 1 : times;
		BASE64Decoder base64Decoder = new BASE64Decoder();
		String        mingwen       = "";
		if (mi == null || mi.equals("")){

		} else{
			mingwen = mi;
			for (int i = 0; i < num; i++){

				try{

					byte[] by = base64Decoder.decodeBuffer(mingwen);
					mingwen = new String(by);

				} catch (IOException e){
					e.printStackTrace();
				}
			}
		}
		return mingwen;
	}

	/**
	 * 测试住方法
	 * @param args 参数
	 */
	public static void main(String[] args){

		String name     = "machinetool";
		String password = "machiO!@^1231";

		String localName     = "root";
		String localPassword = "123456";

		System.out.println(encodeBase64(localName));
		System.out.println(encodeBase64(localPassword));
	}

}
