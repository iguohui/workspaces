package com.iguohui.system.persistence.entity;

public class UserGroup {
    private String chrId;

    private String userId;

    private String groupId;

    private String createTime;

    private String updateTime;

    public String getChrId() {
        return chrId;
    }

    public void setChrId(String chrId) {
        this.chrId = chrId == null ? null : chrId.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId == null ? null : groupId.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime == null ? null : updateTime.trim();
    }
}