package com.smtcl.machinetool.service.impl;

import java.io.*;
import java.net.*;

/**
 * Created by GuoFeng on 2016/7/20.
 */
public class TCPTest{

	public static void main(String[] args) throws Exception{

		//客户端请求与本机在20008端口建立TCP连接
		Socket client = new Socket("192.168.18.11", 9000);
		//获取键盘输入
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		//获取Socket的输出流，用来发送数据到服务端
		PrintStream out = new PrintStream(client.getOutputStream());
		//清空缓冲区
		out.flush();

		//获取Socket的输入流，用来接收从服务端发送过来的数据
		BufferedReader buf  = new BufferedReader(new InputStreamReader(client.getInputStream()));
		boolean        flag = true;
		while (flag){

			System.out.print("输入信息：");
			String str = input.readLine();
			//发送数据到服务端
			out.write(str.getBytes());
			//清空缓冲区
			out.flush();

			if ("bye".equals(str)){
				flag = false;
			} else{

				try{

					//从服务器端接收数据有个时间限制（系统自设，也可以自己设置），超过了这个时间，便会抛出该异常
					char[] chars = new char[256];
					buf.read(chars);
					System.out.println(chars);

				} catch (SocketTimeoutException e){

					System.out.println("Time out, No response");
				}
			}
		}
		buf.close();
		out.close();
		if (client != null){
			//如果构造函数建立起了连接没有建立起连，则关闭套接字，如果接，自然不用关闭
			client.close(); //只关闭socket，其关联的输入输出流也会被关闭
		}
	}

}
