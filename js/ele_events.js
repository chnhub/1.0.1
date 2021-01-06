/**
 * 元素操作模块
 *  前提必须引用juqery
 */
if (typeof jQuery == 'undefined') { 
    throw new Error("ele_events: jquery未加载!");
}

var ELE_EVENTS = ELE_EVENTS||{
    /**身份证有关 */
    aProvince : [ 11 ,12 ,13 ,14 ,15 ,21 ,22 ,23 ,31 ,32 ,33 ,34 ,35 ,36 ,37 ,41 ,42 ,43 ,44 ,45 ,46 ,50 ,51 ,52 ,53 ,54 ,61 ,62 ,63 ,64 ,65  ],
	aCity : ['0101', '0201'],
	sId : '',
	iBirDate : '',
	repTimes : 50,
    /**身份证有关 */
    stuAreaCode : null,

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
        eve_?eve_ = `(${eve_})`:eve_ = `()`;//判断是否有参数
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
                    case "val":
                        script = `_eve.trigger("focus").${eve}${eve_}.trigger("blur")`;
                        break;
                    case "click": case "blur": case "focus": case "blur": case "change": case "dblclick": case "keydown": case "keyup": case "keyup": case "mousedown": case "mouseup":
                        script = `_eve.trigger("${eve}")`;
                        break;
                    case "getStuName": case "getIDNum": case "getTelPhone": 
                        script = `_eve.trigger("focus").val(this.${eve}${eve_}).trigger("blur")`;
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
    },

    /** 身份证有关 */
    getIDNum:function(){
		return this.toId();
	},
    getRandom:function (iMin,iMax){
		return Math.round(Math.random()*(iMax-iMin))+iMin;
	},
	addZero:function(str,num){
		str=str.toString();
		for(var i=0,len=num-str.length;i<len;i++){
			str='0'+str;
		}
		return str;
	},
	toProvince : function(){
		return this.aProvince[ this.getRandom(0 , this.aProvince.length-1)];//不包含 香港、澳门、台湾、国外
	},
	toCity : function(){
		return this.aCity[ this.getRandom(0 , this.aCity.length - 1)];
		//return '0101';//省会
	},
	toBirthday : function(){
		var ia=new Date();
		var start = new Date() - 50*365*24*60*60*1000;
		var end = new Date() - 35*365*24*60*60*1000;
		var ageDate = this.getRandom( start , end );
		ia.setTime( ageDate );
		return ia.getFullYear() + '' + this.addZero( ia.getMonth() + 1 , 2 ) + this.addZero( ia.getDate() , 2 );//随机生日
	},
	toLast : function(){
		for(var i=0, arrLastFour = []; i<4; i++){
			arrLastFour.push(this.getRandom(0,9));
		}
		return arrLastFour.join('');
	},
	toId:function(){
		//this.repTimes
		for( var j=0; j <50 ; j++){
			this.sId = '' + this.toProvince() +''+ this.toCity() + this.toBirthday() + this.toLast();
			var iSum = 0;
			for ( var i = 17; i >= 0; i--) {
				iSum += (Math.pow(2, i) % 11) * parseInt(this.sId.charAt(17 - i), 11);	
			}
			if (iSum % 11 == 1) {
				console && console.log(this.sId +'   ////////   ' +j);
				return this.sId;
			}
		}
	},
    /** 身份证有关 */
    /** 学员有关 */
    /**
	 * 
	 * @param {*} areacodePath 标题的jquery选择器
	 */
	getStuName:function(areacodePath, default_before_name = "测试学员"){
		var htmltitle = document.title;
		//htmltitle?htmltitle = htmltitle.split("市")[0].length>1?htmltitle=htmltitle.split("市")[0]+"学员":"测试学员":"测试学员";
		//生成学员姓名
		var htmltitle = $(".header_l").text();
	
		if(htmltitle&&htmltitle.indexOf("市")>=0&&htmltitle.indexOf("省")>=0){
			htmltitle = htmltitle.substring(htmltitle.indexOf("省")+1, htmltitle.indexOf("市")) + "学员";
		}else {
			htmltitle = default_before_name;
		}

		var gtime = parseInt((new Date() - 0)/1000);
		gtime = gtime - parseInt(gtime/10000)*10000;
		return htmltitle + ("00000000"+gtime).substr(-4);
	},
	getAreaCode:function(areacodePath){

	},
	getTelPhone_:function(){
		//var tel = new Date() - 606062573653;
		var gtime = parseInt((new Date() - 0)/1000);
		gtime = gtime - parseInt(gtime/1000000)*1000000;
		return "136" + ("00000000"+gtime).substr(-8);
    },
    getTelPhone:function(pre_tel = "136"){ 
		//var tel = new Date() - 606062573653;
		var gtime = this.getRDTime();
		//gtime = gtime - parseInt(gtime/1000000)*1000000;
		return pre_tel + ("0000000000000"+gtime).substr(-(11-pre_tel.length));
    },
    getRDTime:function(len = 3){
        var gtime = parseInt((new Date() - 0)/Math.pow(10,len));
		return gtime;
    },
    getRDNum:function(len = 1){
        var rdnum = Math.round(Math.random()*(Math.pow(10,len)));
		return rdnum;
    },
    /** 学员有关 */
}