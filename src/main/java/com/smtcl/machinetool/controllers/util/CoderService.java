package com.smtcl.machinetool.controllers.util;

import com.google.zxing.*;
import com.google.zxing.common.*;
import com.google.zxing.qrcode.decoder.*;
import org.springframework.stereotype.Service;
import java.io.*;
import java.util.*;

/**
 * Created by guofeng on 2017/9/4.
 */
@Service
public class CoderService{
	public String encode(String contents, int width, int height, String uploadPath, String realUploadPath, String imageName) {
		//生成条形码时的一些配置
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		// 指定纠错等级,纠错级别（L 7%、M 15%、Q 25%、H 30%）
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		// 内容所使用字符集编码
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");

		OutputStream out =null;
		try {
			if(realUploadPath!=null&&realUploadPath!=""){

				out = new FileOutputStream(realUploadPath+"/"+imageName);
			}
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		BitMatrix bitMatrix;
		try {
			// 生成二维码
			bitMatrix = new MultiFormatWriter().encode(contents, BarcodeFormat.QR_CODE, width, height, hints);
			MatrixToImageWriter.writeToStream(bitMatrix, "png", out);
			bitMatrix.clone();
			out.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return uploadPath+"/"+imageName ;
	}
}
