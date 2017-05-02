$(function () {
    var dialogEle = $(".guid_dialog").dialog({
        width:1000,
        height:600,
        modal:true,
    });
    var dlg = new GuildDilaog("11",null,dialogEle,"目标填报");
    dlg.showDialog();
});

//基本信息
class BaseGuidPanel extends GuidPanel{
    doSave(): string {
        return "保存了";
    }

    doLeave(): string {
        return "doLeave";
    }

    doLeaveOver(): string {
      return this.doSave();
    }

    doFinish(): string {
        return null;
    }
}

//详细信息
class DetailGuidPanel extends GuidPanel{
    doSave(): string {
        return null;
    }

    doLeave(): string {
        return null;
    }

    doLeaveOver(): string {
        return null;
    }

    doFinish(): string {
        return null;
    }

}