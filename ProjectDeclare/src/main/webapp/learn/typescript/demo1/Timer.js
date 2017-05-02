/**
 * Created by iguoh on 2017/4/30.
 */
var Timer;
(function (Timer) {
    var Test = (function () {
        function Test(e) {
            this.element = e;
            this.element.innerHTML = "现在时间是：";
            this.span = document.createElement("span");
            this.element.appendChild(this.span);
            this.span.innerHTML = new Date().toTimeString();
        }
        Test.prototype.start = function () {
            var _this = this;
            this.timer = setInterval(function () { return _this.span.innerHTML = new Date().toTimeString(); }, 500);
        };
        Test.prototype.stop = function () {
            clearInterval(this.timer);
        };
        return Test;
    }());
    Timer.Test = Test;
})(Timer || (Timer = {}));
//# sourceMappingURL=Timer.js.map