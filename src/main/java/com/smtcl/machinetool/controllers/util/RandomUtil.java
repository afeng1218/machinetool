package com.smtcl.machinetool.controllers.util;

/**
 * Created by GuoFeng on 2016/3/22.
 * TODO 随机生成指定位数数字
 */
public class RandomUtil{

	/**
	 * 生成随机数
	 * @param count 生成随机数的位数
	 * @return
	 */
	public static Long Random(int count){

		String result    = "";
		int    randomNum = 0;
		for (int i = 0; i < count; i++){

			do{
				randomNum = (int) Math.floor(Math.random() * 10);
			}
			while (0 == randomNum && 0 == i);
			result += randomNum;
		}
		return Long.parseLong(result);
	}

	/**
	 * 测试主方法
	 * @param args
	 */
	public static void main(String args[]){

		System.out.println(Random(11));
	}

}
