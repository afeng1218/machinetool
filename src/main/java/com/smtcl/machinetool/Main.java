package com.smtcl.machinetool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.builder.*;
import org.springframework.boot.context.web.*;
import org.springframework.context.annotation.*;
import org.springframework.scheduling.annotation.*;

/**
 * Created by GuoFeng on 2016/2/22.
 * TODO Spring Boot 启动方法
 */
@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.smtcl.machinetool")
public class Main extends SpringBootServletInitializer{

	private static Class<Main> applicationClass = Main.class;

	/*build spring boot*/
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){

		return builder.sources(applicationClass);
	}

	/*spring boot 启动主方法*/
	public static void main(String[] args){

		SpringApplication.run(applicationClass, args);
	}
}
