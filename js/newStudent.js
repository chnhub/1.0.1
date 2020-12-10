/**
 * 生成学员信息
 */




/** 模拟生成 不包含 香港、澳门、台湾、国外 的其他省份省会城市的身份证号
* how : Id.init();
* author : win7killer
* date : 2013/12/20
* ver : 1.0
*/
var WEID = WEID || {
	aProvince : [ 11 ,12 ,13 ,14 ,15 ,21 ,22 ,23 ,31 ,32 ,33 ,34 ,35 ,36 ,37 ,41 ,42 ,43 ,44 ,45 ,46 ,50 ,51 ,52 ,53 ,54 ,61 ,62 ,63 ,64 ,65  ],
	aCity : ['0101', '0201'],
	sId : '',
	iBirDate : '',
	repTimes : 50,
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
	init:function(){
		return this.toId();
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
};

/** 生成学员手机号
 * 
 */
var WEtelPhone = WEtelPhone||{


}

var WEStu = WEStu ||{
	
	stuAreaCode : null,
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
	getTelPhone:function(){
		//var tel = new Date() - 606062573653;
		var gtime = parseInt((new Date() - 0)/1000);
		gtime = gtime - parseInt(gtime/1000000)*1000000;
		return "136" + ("00000000"+gtime).substr(-8);
	},

}



/////////生成身份证2/////////

