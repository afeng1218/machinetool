package com.smtcl.machinetool.configs;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;

/**
 * Created by SunJun on 2016/1/11. TODO WebMvc Resource路径扫描包配置
 */
@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter{

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {

			"classpath:/META-INF/resources/", "classpath:/resources/",
			"classpath:/static/", "classpath:/templates/", "classpath:/public/"
	};

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry){

		registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
	}

}
