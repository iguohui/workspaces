package com.iguohui.system.persistence.dao;

import com.iguohui.system.persistence.entity.SysUser;

public interface SysUserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(String userId);
    
    SysUser selectByUserName(String userName);
    
    SysUser selectByUserNameAndPassword(String userName,String password);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);
    
    
}