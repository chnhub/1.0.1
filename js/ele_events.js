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
     * @param {string} dec 描述
     */
    base_events: function ($ele, events_name, params, row = []) {
        console.log("base_events被调用了");
        //this.test(1, 2);
        if(!events_name)return null;
        var script = null;
        var eve = events_name; // 方法名字
        var eve_ = "";  //方法参数不带括号()
        var eve__ = "";  //方法参数带括号()
        $ele&&($ele = $($ele)); //以防万一再包一层jquery
        //多个参数时进行切割
        if(params&&(typeof(params)==="string")&&params.split(",")!=-1){
            params = params.split(",");
        }
        //数组参数处理
        if(params instanceof Array){
            for(var i = 0; i < params.length; i++){
                eve_ = eve_ + `params[${i}]`;
                i!=params.length - 1&&(eve_ = eve_ + ',');
            }
        }else{ eve_ = "params" }
        eve__ = eve_;
        eve__?eve__ = `(${eve__})`:eve__ = `()`;//判断是否有参数
        //eve_ = `(${eve_})`;
        //console.log(eve_);
        if ($ele) {
            if($ele.length<1&&params != "sleep"){
                console&&console.log("%c%s",
                "color: red; background: yellow;",`ERROR: [id:${row.id}][name:${row.name}]未定位到元素!(${$ele.selector})↓`,row);
                return;
            }
            var _eve = $ele;
            if(typeof($ele) == "function"){
                //调用传入的方法 fun(p);
                script = `_eve${eve__}`;
            }else{
                 //调用对象的方法 object.fun(p);
                script = `_eve.${eve}${eve__}`;
                script = '';
                for(var i = 0; i < _eve.length; i++){
                switch (eve) {
                    case "val":
                        script = script + `_eve.eq(${i}).trigger("focus").${eve}${eve__}.trigger("blur");`;
                        break;

                    case "select":
                        _eve.eq(i).find("option:selected").attr("selected", false);
                        _eve.eq(i).find(`option:contains('${params}')`).attr("selected", true);
                        //script = script + `_eve.eq(${i}).trigger("focus").${eve}${eve_}.trigger("blur");`;
                        if(_eve.find("option:selected").text() != params){
                            _eve.eq(i).find(`option[value='${params}']`).attr("selected","selected");
                        }
                        break;

                    case "click": case "blur": case "focus": case "blur": case "change": case "dblclick": case "keydown": case "keyup": case "keyup": case "mousedown": case "mouseup":
                        script = script + `_eve.eq(${i}).trigger("${eve}");`;
                        break;

                    case "getStuName": case "getIDNum": case "getTelPhone": //默认全是输入
                        var temp = `this.${eve}${eve__}`;
                        if(i == 0){script = `_eve.val(this.${eve}${eve__});`}// 仅在第一次拼接赋值语句
                        //script = script + `_eve.eq(${i}).trigger("focus").val(this.${eve}${eve_}).trigger("blur");`;
                        script = script + `_eve.eq(${i}).trigger("focus").trigger("blur");`;
                        break;
                    case "checkbox":
                        if(!params)eve_=true;
                        script = script + `_eve.eq(${i}).prop("checked",JSON.parse(${eve_}))`;
                        break;
                    case "sleep":
                        script = script + `this.${eve}${eve__}`;
                        break;
                    case "uploadImg":
                        script = script + `this.${eve}(${eve_},_eve.eq(${i}))`;
                        break;

                    default:
                        script = script + `_eve.eq(${i}).${eve}${eve__}`;
                        break;
                }
                }
            }
        }else {
            //调用本页面的方法 this.fun(p);
            script = `this.${eve}${eve__}`;// 应该加this.
        }
        console.log(script);
        var retu = eval(script);
        console.log("执行结果：",retu);
        return retu;
    },
    base_events_xpath: function(xpath, iframe = document, events_name, params, row = []){
        var $ele = $(document.evaluate(xpath, iframe).iterateNext());       
        this.base_events($ele, events_name, params, row);
    },
    base_events_jquery: function($ele, iframe = document, events_name, params, row = []){      
        this.base_events($($ele, iframe), events_name, params, row);
    },
    test1: function(a, b){
        console.log(a, b)
    },
    base_events_wait:function($ele, iframe, events_name, params, row = [], wait_time) {
        console.log(`延迟${wait_time}秒调用`);
        var obj = this;
        setTimeout(function() {
            switch (parseInt(row.selectormode)) {
                case 2:
                    obj.base_events_xpath($ele, iframe, events_name, params, row);
                    break;
            
                default:
                    obj.base_events($ele, events_name, params, row);
                    break;
            }
            
        }, wait_time * 1000);
    },
    //或者使用for循环
    sleep: function(delay) {
        console.log(`${delay}s前......`);
        //for(var t = Date.now(); Date.now() - t <= delay*1000;);
        (function(){
            setTimeout(function() {
                console.log(`${delay}s后......`);
            }, delay * 1000);
        })(delay);
        
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
				console && console.log(this.sId +'   ////idnum////   ' +j);
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
	getStuName:function(default_before_name = "测试"){
		var htmltitle = document.title;
		//htmltitle?htmltitle = htmltitle.split("市")[0].length>1?htmltitle=htmltitle.split("市")[0]+"学员":"测试学员":"测试学员";
		//生成学员姓名
		var htmltitle = $(".header_l").text();
		if(htmltitle&&htmltitle.indexOf("市")>=0&&htmltitle.indexOf("省")>=0){
			htmltitle = htmltitle.substring(htmltitle.indexOf("省")+1, htmltitle.indexOf("市")) + "学员";
        }else if(htmltitle&&htmltitle.indexOf("市")>=0){
            htmltitle = htmltitle.substring(0, htmltitle.indexOf("市"));
        }else  {
			htmltitle = "";
		}

		var gtime = parseInt((new Date() - 0)/1000);
		gtime = gtime - parseInt(gtime/10000)*10000;
		return htmltitle + default_before_name + ("00000000"+gtime).substr(-4);
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
    getRDNum:function(len = 1, pre = null, suffix = null){
        var rdnum = Math.round(Math.random()*(Math.pow(10,len)));
		return pre + rdnum + suffix;
    },
    /** 学员有关 */
    /** 图片有关 */
    //上传图片
    uploadImg: function(imgpath, uploadpath, urlprefix, ele){
        var obj = this;
        var ele_img = arguments[arguments.length-1];
        var imgph =  this.getImgBase64(imgpath, function(base64) {
            if (!base64) return;
            var imgobj = new Object();
            imgobj.ele = ele;
            imgobj.imgbase64 = base64;
            imgobj.name = 'file1';
            imgobj.filename = 'photo.jpg';
            imgobj.urlprefix = '../../../photos/'; //服务器路径图片前缀
            urlprefix&&(imgobj.urlprefix = urlprefix);
            imgobj.uploadpath = uploadpath;
            obj.uploadimg(imgobj, function(data){
                    //$(sel.imgPhoto, stuDoc).attr("src", imgobj.urlprefix + '/' + data.path);
                    imgobj.ele&&$(imgobj.ele).attr("src", imgobj.urlprefix + '/' + data.path);
                    ELE_EVENTS.log(null,JSON.stringify(data));
            });
        });
        return `图片路径：${imgph}  上传地址：${uploadpath}`;
    },
    getImgBase64: function(imgUrl, callback) {
       
        if(!imgUrl)imgUrl = "stu";
        var reg = "^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\\/])+$";
        var re = new RegExp(reg);
        //未填写路径拿本地图片
        if (!re.test(imgUrl)){   
            if (imgUrl.toLowerCase().indexOf("stu") != -1) imgUrl = "/img/stu.jpg";
            else if (imgUrl.toLowerCase().indexOf("coa") != -1) imgUrl = "/img/coa.jpg";
            else imgUrl = "/img/stu.jpg";
            imgUrl = chrome.extension.getURL(imgUrl);
        }
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                //console.log("blob", blob)
                // 至关重要
                var oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    // 此处拿到的已经是 base64的图片了
                    var base64 = e.target.result;
                    callback && callback(base64);
                };
                oFileReader.readAsDataURL(blob);
            }
        }
        xhr.send();
        return imgUrl;
    },
    /**
	 * 
	 * @param {*} imgobj.imgbase64	- 图片base64格式 
	 * @param {*} imgobj.name	- 上传文件的参数name值（一般为file1、file2...具体以后台为准） 
	 * @param {*} imgobj.filename	- 上传文件的全名，后台解析用（例：photo.jpg）
	 * @param {*} callback	- 回调函数，参数为...
	 */
	uploadimg: function(imgobj, callback) {
		imgobj.name || (imgobj.name = 'file1');
		imgobj.filename || (imgobj.filename = 'null.jpg');

		var imgtype = imgobj.imgbase64.substring(imgobj.imgbase64.indexOf("image/") + 6, imgobj.imgbase64.indexOf(";"));
		var data = atob(imgobj.imgbase64.split(',')[1]);
		var ia = new Uint8Array(data.length);
		for (let i = 0; i < data.length; i++) {
			ia[i] = data.charCodeAt(i);
		}
		var blob = new Blob([ia], { type: 'image/' + imgtype });

		var formdata = new FormData();
		formdata.append(imgobj.name, blob, imgobj.filename);

		$.ajax({
           // url: 'dfo/com_web/sys/Files/uploadPhotoHttp.do',
            url: imgobj.uploadpath,
			data: formdata,
			type: "Post",
			dataType: 'json',
			async: true,
			cache: false,//上传文件无需缓存
			processData: false,//用于对data参数进行序列化处理 这里必须false
			contentType: false, //必须
			///去掉这个参数，服务器才能正常返回，否则返回997
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-Requested-With', { toString: function () { return ''; } });
			},
			success: function (data) {
				//console.log(data)
				callback(data);
			},
			error: function (data) {
				console.log(data)
			}
		});

	},
    /** 图片有关 */
    log: function(color = "info", data){
        var numargs = arguments.length; // 获取实际被传递参数的数值。
        var expargs = this.log.length; // 期望传的参数个数
        var clr = "black";
        var bg = "white";
        var script = "";
        switch (color) {
            case "error":
                clr = "red";
                bg = "yellow";
                break;

            default:
                break;
        }
        for (let i = 0; i < arguments.length; i++) {
            if (i==0) continue;
            const element = arguments[i];
            script = script + `,arguments[${i}]`;
        }
        script = `console&&console.log("%c%s",
                'color: ${clr}; background: ${bg};'${script});`
        eval(script);
    }
}