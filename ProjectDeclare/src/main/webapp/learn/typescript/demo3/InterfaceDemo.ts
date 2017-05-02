/**
 * Created by iguoh on 2017/4/30.
 */
interface LabelValue{
    label:string;
}
function printLabel(labelObj:LabelValue){
    console.log(labelObj);
}
var obj = {label:"hello"};
printLabel(obj);

var ar:number[]=[3,4,5];
