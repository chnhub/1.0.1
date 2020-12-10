/** 模拟生成 不包含 香港、澳门、台湾、国外 的其他省份省会城市的身份证号
* how : Id.init();
* author : win7killer
* date : 2013/12/20
* ver : 1.0
*/
var ID = ID || {
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
		var end = new Date() - 18*365*24*60*60*1000;
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


/////////生成身份证2/////////

