/**
 * Created by iguoh on 2017/4/30.
 */
var div=document.createElement("div");
document.body.appendChild(div);
var obj = new Timer.Test(div)
var btnStart = document.createElement("button");
btnStart.innerHTML="start";
btnStart.onclick = function () {
    obj.start();
}
document.body.appendChild(btnStart);
var btnStop = document.createElement("button");
btnStop.innerHTML="stop";
btnStop.onclick = function () {
    obj.stop();
}
document.body.appendChild(btnStop);
