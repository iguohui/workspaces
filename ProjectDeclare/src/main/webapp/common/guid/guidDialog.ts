class GuildDilaog {
    private guidCode: string;
    private param: Object;
    private lstStep: Array<Object>;
    private dialogEle: JQuery;
    public title: string;

    constructor(guidCode: string, param: Object, dialogEle: JQuery, title?: string) {
        this.guidCode = guidCode;
        this.param = param;
        this.initMapStep();
        this.dialogEle = dialogEle;
        this.title = title;
    }

    initMapStep() {
        this.lstStep = [];
        let eachStep1 = this.lstStep[0] = {};
        eachStep1["step_id"] = "1";
        eachStep1["title"] = "基本信息";
        eachStep1["panel"] = "../../business/target/guid/baseInfo.html";
        eachStep1["class_name"] = "BaseGuidPanel";
        let eachStep2 = this.lstStep[1] = {};
        eachStep2["step_id"] = "2";
        eachStep2["title"] = "详细信息";
        eachStep2["panel"] = "../../business/target/guid/detailInfo.html";
        eachStep2["class_name"] = "DetailGuidPanel";
        this.lstStep["length"] = 2;
    }

    showDialog(stepNum?: number, stepId?: string) {
        if ((stepNum == null || typeof stepNum == "undefined") && (stepId == null || typeof stepId == "undefined")) {
            stepNum = 1;
        }
        let dialoglBody = this.dialogEle.find(".dialog-body");
        dialoglBody.html("");
        let guidTitles = $("<div class='guid_titles'></div>").appendTo(dialoglBody);
        guidTitles.css("width", "20%");
        let guidContent = $("<div class='guid_content'></div>").appendTo(dialoglBody);
        guidContent.css("width", "80%");
        let guidLength = this.lstStep.length;
        let findCur = false;
        let that = this;
        $.each(this.lstStep, function (i, value) {
            let guidTitle = $("<div class='guid_title' index='" + i + "'><p>第" + (i + 1) + "步：" + value["title"] + "</p></div>").appendTo(guidTitles);
            var index = null;
            guidTitle.click(function (e) {
                index = parseInt($(e.currentTarget).attr("index"));
                let selStep = that.lstStep[index];
                let selStepId = selStep["step_id"];
                let guidPanel:GuidPanel;
                if(!that.isNull(stepNum)){
                    let preSel = that.lstStep[stepNum-1];
                    let className = preSel["class_name"];
                    guidPanel = <GuidPanel>Object.create(window[className].prototype);
                }
                that.showConfirDialog(guidPanel==null?null:guidPanel.doLeave(), function () {
                    guidPanel.doLeaveOver();
                    that.showDialog(index+1, null);
                });

            });
            let panel = value["panel"];
            let step_id = value["step_id"];
            let tvaue = value;
            if (!findCur && (stepNum == i + 1 || stepId == step_id )) {//找到当前步骤
                guidTitle.addClass("active");
                stepNum = i + 1;
                guidContent.load(panel);
                let className = tvaue["class_name"];
                let guidPanel = <GuidPanel>Object.create(window[className].prototype);
                let buttons = {};
                if (stepNum != 1) {
                    buttons["上一步"] = function () {
                        that.showConfirDialog(guidPanel.doLeave(), function () {
                            guidPanel.doLeaveOver();
                            that.showDialog(stepNum - 1, null);
                        });
                    }
                }
                if (stepNum != guidLength) {
                    buttons["下一步"] = function () {
                        that.showConfirDialog(guidPanel.doLeave(), function () {
                            guidPanel.doLeaveOver();
                            that.showDialog(stepNum + 1, null);
                        });
                    }
                }
                let dialogTitle = that.title;
                if (typeof dialogTitle == "undefined") {
                    dialogTitle = "";
                } else {
                    dialogTitle = dialogTitle + "---";
                }
                that.dialogEle.dialog({
                    title: dialogTitle + "当前步骤：第" + (stepNum) + "步---" + value["title"],
                    buttons: buttons,
                });
                findCur = true;
            }
        });
    }

    showConfirDialog(info: string, callBack: Function) {
        if (!this.isNull(info)) {//TODO 弹出确定对话框,可以控制执行或者不执行回调函数
            alert(info);
        }
        callBack.call(this);
    }

    isNull(obj: any): boolean {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        }
        return false;
    }
}


abstract class GuidPanel {
    private guildDialog: GuildDilaog;

    constructor(guildDialog: GuildDilaog) {
        this.guildDialog = guildDialog;
    }

    abstract doSave(): string;

    abstract doLeave(): string;

    abstract doLeaveOver(): string;

    abstract doFinish(): string;
}

