/**
 * 元素操作模块
 *  前提必须引用juqery
 */
if (typeof jQuery == 'undefined') { 
    throw new Error("ele_events: jquery未加载!");
}

var ELE_EVENTS = ELE_EVENTS||{

    /**
     * 
     * @param {'Object'} $ele 变量
     * @param {string} events_name 变量能点出来的属性或函数
     * @param {string|Array} params 方法的参数，以数组形式表示function(params[0], params[1]...)
     */
    base_events: function ($ele, events_name, params) {
        console.log("base_events被调用了");
        //this.test(1, 2);
        if(!events_name)return null;
        var script = null;
        var eve = events_name; // 方法名字
        var eve_ = "";  //方法名后面的内容‘（）’
        if(params instanceof Array){
            for(var i = 0; i < params.length; i++){
                eve_ = eve_ + `params[${i}]`;
                i!=params.length - 1&&(eve_ = eve_ + ',');
            }
        }else{ eve_ = "params" }
        eve_?eve_ = `(${eve_})`:eve_ = `()`;
        //eve_ = `(${eve_})`;
        //console.log(eve_);
        if ($ele) {
            var _eve = $ele;
            if(typeof($ele) == "function"){
                //调用传入的方法 fun(p);
                script = `_eve${eve_}`;
            }else{
                 //调用对象的方法 object.fun(p);
                script = `_eve.${eve}${eve_}`;
                switch (eve) {
                    case "click": case "blur": case "focus": case "blur": case "change": case "dblclick": case "keydown": case "keyup": case "keyup": case "mousedown": case "mouseup":
                        script = `_eve.trigger("${eve}")`;
                        break;
                    default:
                        script = `_eve.${eve}${eve_}`;
                        break;
                }
            }
        }else {
            //调用本页面的方法 this.fun(p);
            script = `${eve}${eve_}`;
        }
        console.log(script);
        var retu = eval(script);
        console.log("执行结果：",retu);
        return retu;
    },
    test1: function(a, b){
        console.log(a, b)
    }
}