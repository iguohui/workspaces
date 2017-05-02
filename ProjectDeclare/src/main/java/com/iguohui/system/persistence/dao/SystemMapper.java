package com.iguohui.system.persistence.dao;

import java.util.List;
import java.util.Map;

import com.iguohui.system.persistence.entity.SysGroup;

public interface SystemMapper {
    
	List<Map<String,String>> selectUserName(String user_name);
	
    List<SysGroup> getLstGroupByUserId(String userId);
    
    public List<SysGroup> getAllListGroup();
    
    public int saveGroup(List<SysGroup> list);
    
    public int deleteAllGroup();
	
}