package com.smtcl.machinetool.service.impl;

import java.io.*;
import java.net.*;

/**
 * Created by GuoFeng on 2016/7/20.
 */
public class TCPTest{

//	public static void main(String[] args) throws Exception{

//		//客户端请求与本机在20008端口建立TCP连接
//		Socket client = new Socket("192.168.18.11", 9000);
//		//获取键盘输入
//		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
//		//获取Socket的输出流，用来发送数据到服务端
//		PrintStream out = new PrintStream(client.getOutputStream());
//		//清空缓冲区
//		out.flush();
//
//		//获取Socket的输入流，用来接收从服务端发送过来的数据
//		BufferedReader buf  = new BufferedReader(new InputStreamReader(client.getInputStream()));
//		boolean        flag = true;
//		while (flag){
//
//			System.out.print("输入信息：");
//			String str = input.readLine();
//			//发送数据到服务端
//			out.write(str.getBytes());
//			//清空缓冲区
//			out.flush();
//
//			if ("bye".equals(str)){
//				flag = false;
//			} else{
//
//				try{
//
//					//从服务器端接收数据有个时间限制（系统自设，也可以自己设置），超过了这个时间，便会抛出该异常
//					char[] chars = new char[256];
//					buf.read(chars);
//					System.out.println(chars);
//
//				} catch (SocketTimeoutException e){
//
//					System.out.println("Time out, No response");
//				}
//			}
//		}
//		buf.close();
//		out.close();
//		if (client != null){
//			//如果构造函数建立起了连接没有建立起连，则关闭套接字，如果接，自然不用关闭
//			client.close(); //只关闭socket，其关联的输入输出流也会被关闭
//		}
//	}

//	public static void main(String[] args) {
//		try {
//			//1.建立一个服务器Socket(ServerSocket)绑定指定端口
//			ServerSocket serverSocket=new ServerSocket(8800);
//			//2.使用accept()方法阻止等待监听，获得新连接
//			Socket socket=serverSocket.accept();
//			//3.获得输入流
//			InputStream is=socket.getInputStream();
//			BufferedReader br=new BufferedReader(new InputStreamReader(is));
//			//获得输出流
//			OutputStream os=socket.getOutputStream();
//			PrintWriter pw=new PrintWriter(os);
//			//4.读取用户输入信息
//			String info=null;
//			while(!((info=br.readLine())==null)){
//				System.out.println("TCPTest："+info);
//			}
//			//给客户一个响应
//			String reply="200|1001|192.168.0.10|99|20|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0";
//			pw.write(reply);
//			pw.flush();
//			//5.关闭资源
//			pw.close();
//			os.close();
//			br.close();
//			is.close();
//			socket.close();
//			serverSocket.close();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}


	public static void main(String[] args) throws Exception{
		Socket socket=new Socket("192.168.0.184",8000);
		DataOutputStream  out = new DataOutputStream (socket.getOutputStream());
		BufferedReader buf = new BufferedReader(new InputStreamReader(socket.getInputStream(),"UTF-8"));
		out.write("2001|1001|192.168.0.184|31|16|77|123|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0".getBytes());//传输数据
		//2000|1001|192.168.0.184|100|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0
		//2001|1001|192.168.0.184|100|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0
		out.flush();
		String back=buf.readLine();
		System.out.println("back="+back);
		//2.关闭资源
		buf.close();
		out.close();
		socket.close();
	}
}
