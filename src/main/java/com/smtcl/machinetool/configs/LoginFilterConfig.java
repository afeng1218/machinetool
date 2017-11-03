package com.smtcl.machinetool.configs;

import com.smtcl.machinetool.controllers.interceptorConfig.LoginFilter;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by GuoFeng on 2016/2/21. TODO 登陆验证过滤器配置 registrationBean.addUrlPatterns("*.html");配置过滤方法
 */
@Configuration
public class LoginFilterConfig{

	@Bean
	public FilterRegistrationBean filterRegistrationBean(){

		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new LoginFilter());  //要注册的过滤器
		registrationBean.addUrlPatterns("*.html");  //过滤所有html请求
		return registrationBean;

	}

}