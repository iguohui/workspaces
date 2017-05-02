package com.iguohui.system.service;

import java.util.List;

import com.iguohui.system.persistence.entity.SysGroup;
import com.iguohui.system.persistence.entity.SysUser;

public interface ISystemService {
	
	int deleteByPrimaryKey(String userId);

	int insert(SysUser record);

	int insertSelective(SysUser record);

	SysUser selectByPrimaryKey(String userId);

	int updateByPrimaryKeySelective(SysUser record);

	int updateByPrimaryKey(SysUser record);
	
	boolean isUserNameExist(String user_name);
	
	SysUser checkLoginCorrect(String user_name,String password);
	
	public List<SysGroup> getLstGroupByUserId(String user_id);
	
	public List<SysGroup> getAllListGroup();
	
	public String saveGroup(List<SysGroup> list);
}
