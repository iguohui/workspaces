/**
 * Created by iguoh on 2017/4/30.
 */
function Hello<T>(arg:T):T{
    return arg;
}

var output = Hello<string>("hello");