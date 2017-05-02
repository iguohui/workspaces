package com.iguohui.system.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.iguohui.system.persistence.entity.SysGroup;
import com.iguohui.system.persistence.entity.SysUser;
import com.iguohui.system.service.ISystemService;

@Component
@RequestMapping("/usermanger")
public class UserController {
	@Autowired
	ISystemService service;

	@RequestMapping("/adduser.do")
	@ResponseBody
	public String addUser(HttpServletRequest request, HttpSession session) {
		SysUser sysUser = new SysUser();
		String user_id = UUID.randomUUID().toString();
		sysUser.setUserId(user_id);
		String user_name = request.getParameter("user_name");
		String password = request.getParameter("password");
		sysUser.setUserName(user_name);
		sysUser.setPassword(password);
		sysUser.setAddress(request.getParameter("address"));
		sysUser.setNickName(request.getParameter("nick_name"));
		sysUser.setPhone(request.getParameter("phone"));
		sysUser.setSex(request.getParameter("sex"));
		sysUser.setRemark(request.getParameter("remark"));
		SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		String curDate = df.format(new Date());
		sysUser.setCreateTime(curDate);
		service.insert(sysUser);
		session.setAttribute("user_name", user_name);
		session.setAttribute("password", password);
		return null;
	}

	@RequestMapping("/checkusername.do")
	@ResponseBody
	public boolean checkUserNameExist(HttpServletRequest request) {
		String user_name = request.getParameter("user_name");
		return !service.isUserNameExist(user_name);
	}

	@RequestMapping("/getLoginUser.do")
	@ResponseBody
	public SysUser getLoginUser(HttpServletRequest request, HttpSession session) {
		String user_name = request.getParameter("user_name");
		String password = request.getParameter("password");
		if (StringUtils.isEmpty(user_name) || "null".equals(user_name)) {
			user_name = (String) session.getAttribute("user_name");
			password = (String) session.getAttribute("password");
		}
		if (StringUtils.isEmpty(user_name) || "null".equals(user_name)) {
			return null;
		}
		SysUser user = service.checkLoginCorrect(user_name, password);

		if (user != null) {
			session.setAttribute("user_name", user.getUserName());
			session.setAttribute("password", user.getPassword());
			session.setAttribute("user_id", user.getUserId());
			return user;
		}
		return null;
	}

	@RequestMapping("/logout.do")
	@ResponseBody
	public String logOut(HttpSession session) {
		session.removeAttribute("user_name");
		session.removeAttribute("password");
		return null;
	}

	@RequestMapping("/getLstGroupByUserId.do")
	@ResponseBody
	public List<SysGroup> getLstGroupByUserId(HttpServletRequest request) {
		String user_id = request.getParameter("user_id");
		return service.getLstGroupByUserId(user_id);
	}
	@RequestMapping("/getAllLstGroup.do")
	@ResponseBody
	public List <SysGroup> getAllListGroup(){
		return service.getAllListGroup();
	}
	
	@RequestMapping("/saveGroup.do")
	@ResponseBody
	public String saveGroup(HttpServletRequest reqeust){
		String str = reqeust.getParameter("data");
		@SuppressWarnings("unchecked")
		List<JSONObject> list = (List<JSONObject>) JSONObject.parse(str);
		List<SysGroup> lstNew = new ArrayList<SysGroup>();
		for (int i = 0; i < list.size(); i++) {
			JSONObject jo = list.get(i);
			SysGroup sysGroup = JSON.toJavaObject(jo, SysGroup.class);
			lstNew.add(sysGroup);
		}
		return service.saveGroup(lstNew);
	}
}
