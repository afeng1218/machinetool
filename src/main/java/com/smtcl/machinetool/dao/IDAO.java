package com.smtcl.machinetool.dao;

import org.omg.Dynamic.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/1/22. TODO 通用dao 数据库：增、删、改、查的操作
 */
public interface IDAO{

	/**
	 * 添加对象
	 *
	 * @param c
	 * 		添加的对象元素
	 * @param <T>
	 * 		泛型
	 */
	<T> void add(T c);

	/**
	 * 保存或者更新
	 *
	 * @param c
	 * @param <T>
	 */
	<T> void saveOrUpdate(T c);

	/**
	 * 删除对象
	 *
	 * @param c
	 * 		需要删除的表对象
	 * @param <T>
	 * 		泛型
	 */
	<T> void delete(T c);

	/**
	 * 更新表
	 *
	 * @param c
	 * 		更新的表对象
	 * @param <T>
	 * 		泛型
	 */
	<T> void update(T c);

	/**
	 * 查询所有
	 *
	 * @param c
	 * 		查询的表对象Class
	 * @param Parameters
	 * 		参数
	 * @param <T>
	 * 		泛型
	 *
	 * @return 查询结果
	 */
	<T> List<T> findAll(Class<T> c, Parameter... Parameters);

	/**
	 * 按条件查询表
	 *
	 * @param hql
	 * 		hql查询语句
	 * @param Parameters
	 * 		参数
	 * @param <T>
	 * 		泛型
	 *
	 * @return 返回list数据
	 */
	<T> List<T> executeQuery(String hql, Parameter... Parameters);

	/**
	 * 使用sql语句查询
	 *
	 * @param sql
	 * 		sql语句
	 * @param Parameters
	 * 		参数
	 * @param <T>
	 * 		泛型
	 *
	 * @return 返回list数据
	 */
	<T> List<T> createSQLQuery(String sql, Parameter... Parameters);

	/**
	 * 使用sql修改
	 *
	 * @param sql
	 * @param <T>
	 */
	<T> void sqlUpdate(String sql);
}
