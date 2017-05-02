var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
$(function () {
    var dialogEle = $(".guid_dialog").dialog({
        width: 1000,
        height: 600,
        modal: true
    });
    var dlg = new GuildDilaog("11", null, dialogEle, "目标填报");
    dlg.showDialog();
});
//基本信息
var BaseGuidPanel = (function (_super) {
    __extends(BaseGuidPanel, _super);
    function BaseGuidPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseGuidPanel.prototype.doSave = function () {
        return "保存了";
    };
    BaseGuidPanel.prototype.doLeave = function () {
        return "doLeave";
    };
    BaseGuidPanel.prototype.doLeaveOver = function () {
        return this.doSave();
    };
    BaseGuidPanel.prototype.doFinish = function () {
        return null;
    };
    return BaseGuidPanel;
}(GuidPanel));
//详细信息
var DetailGuidPanel = (function (_super) {
    __extends(DetailGuidPanel, _super);
    function DetailGuidPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetailGuidPanel.prototype.doSave = function () {
        return null;
    };
    DetailGuidPanel.prototype.doLeave = function () {
        return null;
    };
    DetailGuidPanel.prototype.doLeaveOver = function () {
        return null;
    };
    DetailGuidPanel.prototype.doFinish = function () {
        return null;
    };
    return DetailGuidPanel;
}(GuidPanel));
//# sourceMappingURL=targetPanel.js.map