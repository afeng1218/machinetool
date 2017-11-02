package com.smtcl.machinetool.controllers.interceptorConfig;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

/**
 * Created by SunJun on 2016/2/21. TODO 登陆验证拦截类 拦截所有html请求 进行登陆验证
 */
public class LoginFilter implements Filter{

	@Override
	public void init(FilterConfig filterConfig) throws ServletException{

		System.out.println("-------------------初始化过滤器--------------------");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException{

		System.out.println("-------------------这里是登陆验证------------------");
		HttpServletRequest  req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		/*设置请求编码*/
		req.setCharacterEncoding("UTF-8");
		/*获取session*/
		HttpSession session = req.getSession();

		//可以排除不需要过滤的url
		String requestURI = req.getRequestURI();

        /*过滤排除登录页面和注册页面请求*/
		if (requestURI.endsWith("login.html") || requestURI.endsWith("register.html")){

			chain.doFilter(request, response);
			return;

            /*退出操作*/
		} else if (requestURI.endsWith("exit.html")){

			/**
			 * 删除session 重定向到登录页面
			 */
			session.invalidate();
			res.sendRedirect("login.html");
			return;

		} else{

            /*如果没有登录直接跳转登录页面 反之放过*/
			String loginState = (String) session.getAttribute("SUCCESS");

			if (loginState == null || "".equals(loginState) || loginState.equals("FALSE")){

				res.sendRedirect("login.html");
				return;

			} else{

				chain.doFilter(request, response);
				return;

			}
		}

	}

	@Override
	public void destroy(){

	}
}
