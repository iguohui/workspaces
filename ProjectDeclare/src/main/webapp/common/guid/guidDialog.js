var GuildDilaog = (function () {
    function GuildDilaog(guidCode, param, dialogEle, title) {
        this.guidCode = guidCode;
        this.param = param;
        this.initMapStep();
        this.dialogEle = dialogEle;
        this.title = title;
    }
    GuildDilaog.prototype.initMapStep = function () {
        this.lstStep = [];
        var eachStep1 = this.lstStep[0] = {};
        eachStep1["step_id"] = "1";
        eachStep1["title"] = "基本信息";
        eachStep1["panel"] = "../../business/target/guid/baseInfo.html";
        eachStep1["class_name"] = "BaseGuidPanel";
        var eachStep2 = this.lstStep[1] = {};
        eachStep2["step_id"] = "2";
        eachStep2["title"] = "详细信息";
        eachStep2["panel"] = "../../business/target/guid/detailInfo.html";
        eachStep2["class_name"] = "DetailGuidPanel";
        this.lstStep["length"] = 2;
    };
    GuildDilaog.prototype.showDialog = function (stepNum, stepId) {
        if ((stepNum == null || typeof stepNum == "undefined") && (stepId == null || typeof stepId == "undefined")) {
            stepNum = 1;
        }
        var dialoglBody = this.dialogEle.find(".dialog-body");
        dialoglBody.html("");
        var guidTitles = $("<div class='guid_titles'></div>").appendTo(dialoglBody);
        guidTitles.css("width", "20%");
        var guidContent = $("<div class='guid_content'></div>").appendTo(dialoglBody);
        guidContent.css("width", "80%");
        var guidLength = this.lstStep.length;
        var findCur = false;
        var that = this;
        $.each(this.lstStep, function (i, value) {
            var guidTitle = $("<div class='guid_title' index='" + i + "'><p>第" + (i + 1) + "步：" + value["title"] + "</p></div>").appendTo(guidTitles);
            var index = null;
            guidTitle.click(function (e) {
                index = parseInt($(e.currentTarget).attr("index"));
                var selStep = that.lstStep[index];
                var selStepId = selStep["step_id"];
                var guidPanel;
                if (!that.isNull(stepNum)) {
                    var preSel = that.lstStep[stepNum - 1];
                    var className = preSel["class_name"];
                    guidPanel = Object.create(window[className].prototype);
                }
                that.showConfirDialog(guidPanel == null ? null : guidPanel.doLeave(), function () {
                    guidPanel.doLeaveOver();
                    that.showDialog(index + 1, null);
                });
            });
            var panel = value["panel"];
            var step_id = value["step_id"];
            var tvaue = value;
            if (!findCur && (stepNum == i + 1 || stepId == step_id)) {
                guidTitle.addClass("active");
                stepNum = i + 1;
                guidContent.load(panel);
                var className = tvaue["class_name"];
                var guidPanel_1 = Object.create(window[className].prototype);
                var buttons = {};
                if (stepNum != 1) {
                    buttons["上一步"] = function () {
                        that.showConfirDialog(guidPanel_1.doLeave(), function () {
                            guidPanel_1.doLeaveOver();
                            that.showDialog(stepNum - 1, null);
                        });
                    };
                }
                if (stepNum != guidLength) {
                    buttons["下一步"] = function () {
                        that.showConfirDialog(guidPanel_1.doLeave(), function () {
                            guidPanel_1.doLeaveOver();
                            that.showDialog(stepNum + 1, null);
                        });
                    };
                }
                var dialogTitle = that.title;
                if (typeof dialogTitle == "undefined") {
                    dialogTitle = "";
                }
                else {
                    dialogTitle = dialogTitle + "---";
                }
                that.dialogEle.dialog({
                    title: dialogTitle + "当前步骤：第" + (stepNum) + "步---" + value["title"],
                    buttons: buttons
                });
                findCur = true;
            }
        });
    };
    GuildDilaog.prototype.showConfirDialog = function (info, callBack) {
        if (!this.isNull(info)) {
            alert(info);
        }
        callBack.call(this);
    };
    GuildDilaog.prototype.isNull = function (obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        }
        return false;
    };
    return GuildDilaog;
}());
var GuidPanel = (function () {
    function GuidPanel(guildDialog) {
        this.guildDialog = guildDialog;
    }
    return GuidPanel;
}());
//# sourceMappingURL=guidDialog.js.map