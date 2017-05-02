package com.iguohui.system.persistence.dao;

import com.iguohui.system.persistence.entity.SysGroup;

public interface SysGroupMapper {
    int deleteByPrimaryKey(String groupId);

    int insert(SysGroup record);

    int insertSelective(SysGroup record);

    SysGroup selectByPrimaryKey(String groupId);

    int updateByPrimaryKeySelective(SysGroup record);

    int updateByPrimaryKey(SysGroup record);
}