package com.iguohui.system.persistence.dao;

import com.iguohui.system.persistence.entity.UserGroup;

public interface UserGroupMapper {
    int deleteByPrimaryKey(String chrId);

    int insert(UserGroup record);

    int insertSelective(UserGroup record);
    
    int updateByPrimaryKeySelective(UserGroup record);

    int updateByPrimaryKey(UserGroup record);
}