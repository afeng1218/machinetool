
/**
 * [Product] machineTool [Copyright] Copyright © 2016 ICSS All Rights Reserved. [FileName] DatabaseConfig.java [History] Version Date Author Content
 * -------- --------- ---------- ------------------------ v1.0.0 2016年1月8日 longpeng 最初版本
 * <p>
 * changed by GuoFeng v1.0.1 2016年7月13日
 **/

package com.smtcl.machinetool.configs;

import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.*;
import com.alibaba.druid.support.http.*;
import org.hibernate.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.context.embedded.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.*;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * <b>Summary: </b> TODO 数据库驱动配置、用户名 密码 hibernate配置，sessionFactory、transactionManager配置 <b>Remarks: </b> TODO
 * dataSource数据库相关配置：用户名密码通过Base64加密，修改数据库用户名密码请到controllers\\util\\Base64Util.java中生成用户名密码密文 并且修改 application.properties文件
 */
@Configuration
@EnableTransactionManagement
public class DatabaseConfig{

	@Value("${hibernate.dialect}")
	private String HIBERNATE_DIALECT;

	@Value("${hibernate.show_sql}")
	private String HIBERNATE_SHOW_SQL;

	@Value("${hibernate.format_sql}")
	private String HIBERNATE_FORMAT_SQL;

	@Value("${hibernate.hbm2ddl.auto}")
	private String HIBERNATE_HBM2DDL_AUTO;

	@Value("${entitymanager.packagesToScan}")
	private String ENTITYMANAGER_PACKAGES_TO_SCAN;

	@Value("${second.entitymanager.packagesToScan}")
	private String SECOND_ENTITYMANAGER_PACKAGES_TO_SCAN;

	/**
	 * 默认数据源
	 *
	 * @return
	 */
	@Primary
	@Bean(name = "dataSource", initMethod = "init", destroyMethod = "close")
	@ConfigurationProperties(prefix = "spring.druid.first")
	public DataSource dataSource(){

		return new DruidDataSource();
	}

	/**
	 * druid多数据源
	 *
	 * @return
	 */
	@Bean(name = "druidDataSource", initMethod = "init", destroyMethod = "close")
	@ConfigurationProperties(prefix = "spring.druid.second")
	public DataSource druidDataSource(){

		return new DruidDataSource();
	}

	/**
	 * 配置druid的数据监控页面路径还有拦截路径
	 *
	 * @return
	 */
	@Bean
	public ServletRegistrationBean druidServlet(){

		StatViewServlet         statViewServlet         = new StatViewServlet();
		ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(statViewServlet, "/druid/*");
		/**
		 * 允许清空数据
		 */
		servletRegistrationBean.addInitParameter("resetEnable", "true");
		/**
		 * 用户名
		 */
		servletRegistrationBean.addInitParameter("loginUsername", "druid");
		/**
		 * 密码
		 */
		servletRegistrationBean.addInitParameter("loginPassword", "druid");

		return servletRegistrationBean;
	}

	@Bean
	public FilterRegistrationBean filterRegistrationBean(){

		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new WebStatFilter());
		filterRegistrationBean.addUrlPatterns("/*");
		filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
		filterRegistrationBean.addInitParameter("sessionStatMaxCount", "2000");
		filterRegistrationBean.addInitParameter("sessionStatEnable", "true");
		filterRegistrationBean.addInitParameter("principalSessionName", "session_user_key");
		filterRegistrationBean.addInitParameter("profileEnable", "true");
		return filterRegistrationBean;
	}

	/**
	 * SessionFactory、hibernate配置
	 */
	private LocalSessionFactoryBean sessionFactoryConfig(DataSource dataSource, String entityPackage){

		LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
		/**
		 * hibernate设置数据源
		 */
		sessionFactoryBean.setDataSource(dataSource);
		/**
		 * 实体类扫描包路径配置
		 */
		sessionFactoryBean.setPackagesToScan(entityPackage);
		/**
		 * hibernate配置类
		 */
		Properties hibernateProperties = new Properties();
		hibernateProperties.put("hibernate.dialect", HIBERNATE_DIALECT);
		hibernateProperties.put("hibernate.show_sql", HIBERNATE_SHOW_SQL);
		hibernateProperties.put("hibernate.format_sql", HIBERNATE_FORMAT_SQL);
		hibernateProperties.put("hibernate.hbm2ddl.auto", HIBERNATE_HBM2DDL_AUTO);
		sessionFactoryBean.setHibernateProperties(hibernateProperties);

		return sessionFactoryBean;
	}

	/**
	 * 默认数据源配置
	 *
	 * @return
	 */
	@Primary
	@Bean(name = "sessionFactory")
	public LocalSessionFactoryBean sessionFactory(@Qualifier("dataSource") DataSource dataSource){

		return sessionFactoryConfig(dataSource, ENTITYMANAGER_PACKAGES_TO_SCAN);
	}

	/**
	 * 第二个数据源配置
	 *
	 * @param dataSource
	 *
	 * @return
	 */
	@Bean(name = "secondSessionFactory")
	public LocalSessionFactoryBean secondSessionFactory(@Qualifier("druidDataSource") DataSource dataSource){

		return sessionFactoryConfig(dataSource, SECOND_ENTITYMANAGER_PACKAGES_TO_SCAN);
	}

	/**
	 * 默认hibernate事物处理 配置
	 */
	@Primary
	@Bean(name = "transactionManager")
	public HibernateTransactionManager transactionManager(@Qualifier("sessionFactory") SessionFactory sessionFactory){

		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(sessionFactory);
		return transactionManager;
	}

	/**
	 * 第二个hibernate事务处理
	 *
	 * @param sessionFactory
	 *
	 * @return
	 */
	@Bean(name = "secondTransactionManager")
	public HibernateTransactionManager secondTransactionManager(@Qualifier("secondSessionFactory") SessionFactory sessionFactory){

		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(sessionFactory);
		return transactionManager;
	}

}
