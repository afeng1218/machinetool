package com.smtcl.machinetool.service.impl;

import org.springframework.context.*;
import org.springframework.context.event.*;

import java.io.*;
import java.net.*;
import java.util.concurrent.*;

/**
 * Created by GuoFeng on 2016/7/20.
 */

/**
 * spring boot启动时候注册该类 自动运行该类的onApplicationEvent方法
 */
public class RFIDTCPService implements ApplicationListener<ContextRefreshedEvent>{

	public void onApplicationEvent(ContextRefreshedEvent event){

		/**
		 * 获取服务端端口
		 */
		Integer port = (Integer) event.getApplicationContext().getBean("SERVER_PORT");
		new Thread(new waitConnection(port)).start();
	}

}

/**
 * 向客户端反馈信息
 */
class runClient implements Runnable{

	Socket client = null;

	runClient(Socket client){

		this.client = client;
	}

	@Override
	public void run(){

		try{

			Thread currentThread = Thread.currentThread();
			System.out.println("客户端连接成功！当前线程ID：" + currentThread.getId());
			//获取Socket的输出流，用来向客户端发送数据
			PrintStream out = new PrintStream(client.getOutputStream());
			//获取Socket的输入流，用来接收从客户端发送过来的数据
			BufferedReader buf  = new BufferedReader(new InputStreamReader(client.getInputStream()));
			boolean        flag = true;

			while (flag){

				//接收从客户端发送过来的数据
				String str = buf.readLine();
				if (str == null || "".equals(str)){

					flag = false;

				} else{

					if ("close".equals(str)){

						System.out.println("客户端线程" + currentThread.getName() + "退出！ ID：" + currentThread.getId());
						flag = false;

					} else{

						//将接收到的字符串前面加上echo，发送到对应的客户端
						out.println("echo:" + str);
						System.out.println("客户端线程" + currentThread.getName() + " (ID:" + currentThread.getId() + ") :" + str);

					}
				}
			}
			/*关闭输出流*/
			out.close();
			/*关闭客户端连接*/
			client.close();
			return;

		} catch (Exception e){
			e.printStackTrace();
		}
	}

	public Socket getClient(){

		return client;
	}
}

/**
 * 服务端等待客户端的连接请求
 */
class waitConnection implements Runnable{

	Integer port = null;

	waitConnection(Integer port){

		this.port = port;
	}

	@Override
	public void run(){

		try{

			/*开启tcp服务端*/
			ServerSocket server = new ServerSocket(port);
			System.out.println("---------------读取RFID服务端启动成功！---------------");
			//通过调用Executors类的静态方法，创建一个ExecutorService实例
			//ExecutorService接口是Executor接口的子接口
			Executor service = Executors.newCachedThreadPool();
			Socket   client  = null;
			boolean  b       = true;
			while (b){
				//等待客户端的连接，如果没有连接过来就一直阻塞
				client = server.accept();
				/*将客户端socket保存进队列*/
				//调用execute()方法时，如果必要，会创建一个新的线程来处理任务，但它首先会尝试使用已有的线程，
				//如果一个线程空闲60秒以上，则将其移除线程池；
				//另外，任务是在Executor的内部排队，而不是在网络中排队
				service.execute(new runClient(client));
			}
			server.close();

		} catch (Exception e){

			e.printStackTrace();
			return;
		}

	}
}