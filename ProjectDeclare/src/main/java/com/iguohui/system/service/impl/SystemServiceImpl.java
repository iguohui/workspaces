package com.iguohui.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.iguohui.system.persistence.dao.SysUserMapper;
import com.iguohui.system.persistence.dao.SystemMapper;
import com.iguohui.system.persistence.entity.SysGroup;
import com.iguohui.system.persistence.entity.SysUser;
import com.iguohui.system.service.ISystemService;

@Service
public class SystemServiceImpl implements ISystemService {
	@Autowired
	SysUserMapper userMapper;
	@Autowired
	SystemMapper systemMapper;

	public int deleteByPrimaryKey(String userId) {
		return userMapper.deleteByPrimaryKey(userId);
	}

	public int insert(SysUser record) {
		return userMapper.insert(record);
	}

	public int insertSelective(SysUser record) {
		return userMapper.insert(record);
	}

	public SysUser selectByPrimaryKey(String userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	public int updateByPrimaryKeySelective(SysUser record) {
		return userMapper.updateByPrimaryKeySelective(record);
	}

	public int updateByPrimaryKey(SysUser record) {
		return userMapper.updateByPrimaryKey(record);
	}

	/**
	 * 判断用户名是否存在
	 */
	public boolean isUserNameExist(String user_name) {
		List list = systemMapper.selectUserName(user_name);
		if (CollectionUtils.isEmpty(list)) {
			return false;
		}
		return true;
	}

	public SysUser checkLoginCorrect(String user_name, String password) {
		return  userMapper.selectByUserNameAndPassword(user_name, password);
	}

	public List<SysGroup> getLstGroupByUserId(String user_id) {
		return systemMapper.getLstGroupByUserId(user_id);
	}
	
	public List<SysGroup> getAllListGroup(){
		return systemMapper.getAllListGroup();
	}

	public String saveGroup(List<SysGroup> list){
		int r1 = systemMapper.deleteAllGroup();
		int r = systemMapper.saveGroup(list);
		if (r>0) {
			return null;
		}
		return "保存失败!";
	}
	
}
