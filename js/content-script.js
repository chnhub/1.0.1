(function () {
	
	var PROJECTIPTABLE = "allowInjectionIP";// 主表名
	var CLICK_EVENT_TAB = [];// 事件表
	var float_div_width = 100;
	var float_div_height = 100;
	var CHROME_LAST_ERROR = null; //chrome的报错信息


	//页面加载完毕后执行
	document.addEventListener('DOMContentLoaded', function () {
		console.log('我被执行了！页面加载完成');
		initContentPage(); //异步 因为chrome读取本地数据是异步的

	});
	async function initContentPage() {
		CLICK_EVENT_TAB =await selectChromeStorage2("click_event_tab", "children");
		//CLICK_EVENT_TAB =await selectChromeStorage("click_event_tab");

		addFloatDiv_bk();

	}

	// 监听长连接
	chrome.runtime.onConnect.addListener(function (port) {
		console.log(port);
		if (port.name == 'test-connect') {
			port.onMessage.addListener(function (msg) {
				console.log('收到长连接消息：', msg);
				// if (msg.msgtype && msg.msgtype == "addsudentinfo") {
				// 	var message = addStudentinfo();
				// 	var key = "message";
				// 	message?port.postMessage({msgtype: 'tips', data: {errorcode:1, [key]: message}}):null;
				// }else if (msg.msgtype && msg.msgtype == "test") {
				// 	test();
				//port.postMessage({errorcode:0});
				// }
				if (!msg.msgtype) return;
				switch (msg.msgtype) {
					case "addsudentinfo":
						break;
					case "addfloatdiv":
						addFloatDiv();
						port.postMessage({ msgtype: "addfloatdiv", errorcode: 0, data: window.location.href });
						break;
					// case "addfloatdiv_bk":
					// 	addFloatDiv_bk();
					// 	break;
					case "isshowfloatdiv":
						port.postMessage({ msgtype: "isshowfloatdiv", errorcode: isShowFloatDiv() ? 0 : 1 });
						break;
					case "delfloatdiv":
						delFloatDiv();
						break;
					case "gethtmlurl":
						port.postMessage({ msgtype: "gethtmlurl", errorcode: 0, data: window.location.href });
						break;
					default:
						port.postMessage({ msgtype: msg.msgtype, errorcode: -1, message: "无该方法" });
						break;
				}
			});
		}
	});

	//浮动菜单初始化
	function initFloatMenuDiv() {

	}
	//btn模板
	function setBtnCss(btnid, css = null) {
		var css_model = {
			"height": "auto",
			"width": "80%",
			"padding":"0px 0px 0px 0px",
			"margin":"4px 0px 0px 0px",
			"overflow": "hidden",
			"text-overflow":"ellipsis",
			"white-space": "nowrap",
			"font-family": "'Times New Roman', Times, Serif",
			"font-size":"8px",
			"opacity":"0.7",
			"border-radius":"3px",
			"background-color":"#f66f6a",
			"color":"white",
			"border":"0",
			"box-sizing": "content-box",
		};
		$(btnid).css(css_model);
	}
	function addFloatDiv() {
		var bak_img = 'https://pic1.zhimg.com/50/v2-e8c008eded46759eac39a009d588f8d6_r.gif';
		var bak_img2 = chrome.extension.getURL("/img/cute.gif");
		var floatdivid = "#floatdiv";
		// 获取屏幕的高宽度
		var cw = $(window).width();
		var ch = $(window).height();
		var mousex = 0;
		var mousey = 0;
		var div_template = `
		<div id='floatdiv'style='z-index:99999; height:${float_div_height}px;width:${float_div_width}px;background-size:100% 100%;text-align: center;position: fixed; bottom:60px;right:10px;'>

				<div style="height:100%;width:100%;position: absolute;overflow: hidden;">
					<div id="floatdiv_sub" style='height:100%;width:${float_div_width + 18}px;display:none;overflow-y: scroll;'>
						<button id='testbtn1' style="height:auto;width:80%;padding:0px 0px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-family:\'Times New Roman\', Times, Serif;font-size:5px;">
							<span title="哈哈哈">生成学员信息</span>
						</button>
					</div>
				</div>
		</div>`;
		// <div id='floatdiv'style='z-index:99999; height:100px;width:100px;background-size:100% 100%;text-align: center;position: fixed; bottom:60px;right:10px;overflow-y:scroll;'>
			// 	<div style=" height: 100%; width: 100%;position: relative;overflow: hidden;">
			// 		<div style=" position: absolute;overflow-y: scroll;">
			// 			<div id="floatdiv_sub" style='height:100%;width:100%;display:none;'>
			// 				<button id='testbtn1' style="height:auto;width:80%;padding:0px 0px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-family:\'Times New Roman\', Times, Serif;font-size:5px;">
			// 					生成学员信息
			// 				</button>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
		$(floatdivid).remove();
		$("body").append(div_template);//添加div
		$(floatdivid).css({ "background-image": "url(" + bak_img2 + ")", "background-color": "rgb(245, 245, 245)", "border-radius": "8px","opacity": "0.8"});
		var tabname = "btnmenu";
		//等待查询完毕后添加按钮
		async function addbtnmenu(tabname) {
			function wait(){
				return new Promise((resolve, reject) => { 
					logChromeStorage(tabname, function (result) {
						result[tabname]&&(result = result[tabname]);
						for (let i = 0; i < result.length; i++) {
							const element = result[i];
							//$("#floatdiv_sub").append(`<button id='conbtn_${element.id}' class="btnmenu" style="height:auto;width:80%;padding:0px 0px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-family:\'Times New Roman\', Times, Serif;font-size:5px;">${result[i]["name"]}</button>`);
							//$("#floatdiv_sub").append(`<button id='conbtn_${element.id}' class="btnmenu"><span title="${result[i]["name"]}">${result[i]["name"]}</span></button>`);
							$("#floatdiv_sub").append(`<button id='conbtn_${element.id}' class="btnmenu"><span title= "${result[i]["name"]}">${result[i]["name"]}</span></span></button>`);
						}
						resolve();
					});
				});
			}
			await wait(); //等待btnmenu数据查询完成
			setBtnCss(".btnmenu"); //设置按钮样式
			$(".btnmenu").click(function (target) {
				$(target.currentTarget).attr("disabled", true);//禁用按钮
				//检查插件是否可用
				try {
					chrome.storage.sync.get("", function () {});
				} catch (error) {
					if (error.message.indexOf(`Extension context invalidated`) != -1){
						alert("请重新刷新该页面激活插件！");
					}
					return;
				}

				var btnmenu_id = target.currentTarget.id.split("conbtn_")[1];
				console.log("btnmenu_id:",btnmenu_id);
				selectChromeStorageByField("event_list", "btnid", `collapse_${btnmenu_id}`, function (data) {
					var page_frame = null;//需要特殊处理的连个事件
					var wait_time = null;//设计的不行 后期cell中加个字段
					var set_var = {};
					for (let i = 0; i < data.length; i++) {
						const el = data[i];
						el.selector=="#"?el.selector="":1;
						$ele = null;
						//单独处理setframe，先处理不同的事件
						/*
						if(parseInt(el["eventid"])==5) {
							if(!$(el.selector).length > 0){console&&console.log("%c%s",
							"color: red; background: yellow;",`ERROR: [id:${el.id}][name:${el.name}]未定位到元素!(${el.selector})↓`, el);
							alert(`未定位到frame：${el.selector}`);
							return;
							}
							page_frame = $(el.selector)[0].contentWindow.document;
							continue;
						};*/
						console.log("事件：",i+1);
						//禁用执行
						if(parseInt(el.status) == 0){
							ELE_EVENTS.log("warning",`warning: [id:${el.id}][name:${el.name}]事件已禁用!(${el.selector})↓`, el);
							continue;
						}
						
						//单独处理setframe，先处理不同的事件
						switch(parseInt(el["eventid"])){
							case 5://setframe 要特殊处理
								if(!$(el.selector).length > 0){
									console&&console.log("%c%s",
									"color: red; background: yellow;",`ERROR: [id:${el.id}][name:${el.name}]未定位到元素!(${el.selector})↓`, el);
									alert(`未定位到frame：${el.selector}`);
									return;
								}
								page_frame = $(el.selector)[0].contentWindow.document;
								continue;
							case 1002:// sleep函数特殊处理
								wait_time = el["params"];
								el.selectormode = 0;
								//$ele = null;
								continue;
						}
						try {
						//不同定位方式分别处理
						switch (parseInt(el.selectormode)) {
							case 2: //xpath
								try {
									if (page_frame) {
										$ele = $(document.evaluate(el.selector, page_frame).iterateNext());			
									}else{
										$ele = $(document.evaluate(el.selector, document).iterateNext());			
									}
								} catch (error) {
									ELE_EVENTS.log("error",`ERROR: [id:${el.id}][name:${el.name}]未定位到元素!(${el.selector})↓`, el);
									console.log(error);
									continue;
								}

								break;				
							case 1: //jquery
								//特殊处理：切换框架，仅支持两层框架嵌套
								if(page_frame){
									$ele = $(el.selector, page_frame);								
								}else{
									$ele = $(el.selector);
								}
								break;
						}
						var result = null;
						CLICK_EVENT_TAB.some(e => {
							if(parseInt(e["value"]) === parseInt(el["eventid"])){	
								//$ele.trigger("focus");
								switch (parseInt(e["value"])) {
									case 100200:
										//ELE_EVENTS.base_events($ele, e.func, i, el);
										break;
								
									default:
									
										if(wait_time){											
											result = ELE_EVENTS.base_events_wait(el.selector, page_frame, e.func, el.params, el, wait_time);
										}else{
											result = ELE_EVENTS.base_events($ele, e.func, el.params, el);
										}

										wait_time = null;
										break;
								}					
								return true;
								//$ele.trigger("blur");
							}
							
						});
						
					} catch (error) {
						ELE_EVENTS.log("error",error);
					}
					}
				});

				//alert("dianjile ");
				
				$(target.currentTarget).attr("disabled", false);//解禁按钮
			}); //添加菜单按钮事件
		}
		addbtnmenu(tabname);// 必须用等待 异步查询数据完成
		
		// 鼠标按下时获取鼠标在屏幕的位置
		$(floatdivid).mousedown(function (e) {

			cw = $(window).width();
			ch = $(window).height();
			e = e || window.event;
			mousex = e.clientX;
			mousey = e.clientY;
			//console.log("原：", mousex, mousey);
			// 获取鼠标在元素上的位置（鼠标按下时在元素上得位置）
			var X = e.clientX - $(floatdivid).offset().left;
			var Y = e.clientY - $(floatdivid).offset().top + $(document).scrollTop();
			//禁用点击事件12
			$(document).mousemove(function (e) {

				$("body").css({ "-moz-user-select": "none", "-webkit-user-select": "none", "user-select": "none" });
				e = e || window.event;
				var x = e.clientX - X;
				var y = e.clientY - Y;
				//console.log("现：", e.clientX, e.clientY);
				if(Math.abs(e.clientX - mousex) < 5&&Math.abs(e.clientY - mousey) < 5) return;
				$("#floatdiv_sub > button").css({ "pointer-events": "none" });

				if ($("#fullscreen-back-div").length === 0) {
					$("body").append("<div id='fullscreen-back-div' style='z-index:99998;position: fixed;left: 0px; right: 0px;top: 0px;bottom: 0px;background-color:red;background-color:rgb(255, 255, 255, 0.5)';-moz-user-select:none;-webkit-user-select:none;user-select:none;></div>");
				}

				//console.log(e.clientX ,e.clientY);
				//添加逻辑鼠标移动小于10还是会触发click

				if (x < 0) x = 0;
				if (y < 0) y = 0;
				if (x + $('#floatdiv').width() > cw) x = cw - $('#floatdiv').width();
				if (y + $('#floatdiv').height() > ch) y = ch - $('#floatdiv').height();
				$('#floatdiv').css({
					'left': x,
					'top': y
				})
			})
		});
		// 鼠标抬起事件
		$(document).mouseup(function () {
			$("#floatdiv_sub > button").css({ "pointer-events": "" });
			$("body").css({ "-moz-user-select": "", "-webkit-user-select": "", "user-select": "" });
			$("#fullscreen-back-div").remove();
			$(document).unbind("mousemove");

		});
		$(floatdivid).mouseenter(function () {
			//$("#floatdiv_sub").css({"display":""});
			
			//$("#floatdiv_sub").removeAttr("hidden");
			//console.log("fadeIn");
			$("#floatdiv_sub").stop(true,true).fadeIn();
		});
		$(floatdivid).mouseleave(function () {
			//$("#floatdiv_sub").css({"display":"none"});
			//$(floatdivid).css("background-image", "url(" + bak_img2 + ")");
			//$("#floatdiv_sub").attr("hidden", "hidden");
			$("#floatdiv_sub").stop(true,true).fadeOut();
		});

		$("#testbtn1").click(function () {

			console.log("执行添加学员的方法");
			//test();
			ELE_EVENTS.recordTime((a,b)=>{
				console.log("hhhhhhhhhhhhhhhhh",b);
				if (b>3000) return;
			},10);
		});
		$("#floatdiv").dblclick(function () {
			$("#floatdiv").remove();
		});

	}
	//向页面注入浮动菜单
	function addFloatDiv2() {
		var bak_img = 'https://pic1.zhimg.com/50/v2-e8c008eded46759eac39a009d588f8d6_r.gif';
		var bak_img2 = chrome.extension.getURL("/img/cute.gif");
		var floatdivid = "#floatdiv";
		$(floatdivid).remove();
		$("body").append(`<div id='floatdiv'style='z-index:999; height:100px;width:100px;background-size:100% 100%;text-align: center;position: fixed; bottom:60px;right:10px'><div style='height:100%;width:100%;font-size:10px;' hidden='hidden'><button id='testbtn1' style="height:auto;width:80%;padding:0px 0px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-family:\'Times New Roman\', Times, Serif;font-size:5px;">生成学员信息</button></div></div>`);
		$(floatdivid).css({ "background-image": "url(" + bak_img2 + ")", "background-color": "rgb(245, 245, 245)", "border-radius": "8px" });
		// 获取屏幕的高宽度
		var cw = $(window).width();
		var ch = $(window).height();
		// 鼠标按下时获取鼠标在屏幕的位置
		$(floatdivid).mousedown(function (e) {
			e = e || window.event;
			// 获取鼠标在元素上的位置（鼠标按下时在元素上得位置）
			var X = e.clientX - $(floatdivid).offset().left;
			var Y = e.clientY - $(floatdivid).offset().top + $(document).scrollTop();
			//禁用点击事件12
			$(document).mousemove(function (e) {
				$("#floatdiv_sub > button").css({ "pointer-events": "none" });
				$("body").css({ "-moz-user-select": "none", "-webkit-user-select": "none", "user-select": "none" });
				if ($("#fullscreen-back-div").length === 0) {
					$("body").append("<div id='fullscreen-back-div' style='z-index:998;position: fixed;left: 0px; right: 0px;top: 0px;bottom: 0px;background-color:red;background-color:rgb(255, 255, 255, 0.5)';-moz-user-select:none;-webkit-user-select:none;user-select:none;></div>");
				}
				//console.log(e.clientX ,e.clientY);
				//添加逻辑鼠标移动小于10还是会触发click
				e = e || window.event;
				var x = e.clientX - X;
				var y = e.clientY - Y;
				if (x < 0) x = 0;
				if (y < 0) y = 0;
				if (x + $('#floatdiv').width() > cw) x = cw - $('#floatdiv').width();
				if (y + $('#floatdiv').height() > ch) y = ch - $('#floatdiv').height();
				$('#floatdiv').css({
					'left': x,
					'top': y
				})
			})
		});
		// 鼠标抬起事件
		$(document).mouseup(function () {
			$("#floatdiv_sub > button").css({ "pointer-events": "" });
			$("body").css({ "-moz-user-select": "", "-webkit-user-select": "", "user-select": "" });
			$("#fullscreen-back-div").remove();
			$(document).unbind("mousemove");

		});
		$(floatdivid).mouseover(function () {
			//$(floatdivid).css({"background-image":""});
			$("#floatdiv_sub").removeAttr("hidden");
		});
		$(floatdivid).mouseout(function () {
			$(floatdivid).css("background-image", "url(" + bak_img2 + ")");
			$("#floatdiv_sub").attr("hidden", "hidden");
		});

		$("#testbtn1").click(function () {

			console.log("执行添加学员的方法");
			test();
		});
		$("#floatdiv").dblclick(function () {
			$("#floatdiv").remove();
		});


	}
	//删除页面浮动菜单
	function delFloatDiv() {
		$("#floatdiv").remove();
	}
	//浮动菜单是否显示
	function isShowFloatDiv() {
		if ($("#floatdiv").length > 0) { return true; } else { return false }
	}

	//自动向页面注入浮动菜单
	function addFloatDiv_bk() {
		logChromeStorage(PROJECTIPTABLE, function (result) {
			var isaddfloatdiv = false;
			if (result[PROJECTIPTABLE].length > 0) {
				var pageurl = window.location.href;
				for (var i = 0; i < result[PROJECTIPTABLE].length; i++) {
					if (pageurl.indexOf(result[PROJECTIPTABLE][i]) >= 0) { isaddfloatdiv = true; break; }
				}
				isaddfloatdiv && addFloatDiv();
			}
		});
	}
	//学员注册
	function test(params) {

		var sel = new Object();
		sel.stuiframe = "iframe[src*='dfo/biz_web/stu/Studentinfo.do']"
		sel.schooliframe = "#iframeResult";
		sel.eStudentName = '#eStudentName';
		sel.eIDNum = '#eIDNum';
		sel.eIDNum2 = '#eIDNum2';
		sel.eTelphoneNum = '#eTelphoneNum';
		sel.eAddress = '#eAddress';
		sel.studenttype = "input[name='studenttype']";
		sel.qclassType = '#qclassType';
		sel.imgPhoto = "#imgPhoto";
		sel.uploadImgBtn = '//button[contains(@class, "uploadIcon") and contains(text(), "上传")]';

		var stu = new Object();
		stu.eStudentName = WEStu.getStuName("test");
		stu.eIDNum = WEID.init();
		stu.eIDNum2 = stu.eIDNum;
		stu.eTelphoneNum = WEStu.getTelPhone();
		stu.eAddress = '测试地址';
		stu.studenttype = '//div[contains(@class, "x-combo-list-item") and contains(text(), "初驾学员")]';
		stu.qclassType = '//div[contains(@class, "x-combo-list-item") and contains(text(), "普通班")]';
		stu.imgPhoto = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3061473502,4241211073&fm=11&gp=0.jpg'
		stu.imgPhoto2 = "http://192.168.191.99:20001/photos/upload/001/202011/00120201102095942.jpg";
		var stuDoc = $(sel.stuiframe);
		if (stuDoc.length == 0) {
			alert("未找到注册窗口");
			return;
		} else if (stuDoc.length > 1) {
			alert("存在多个注册窗口");
			return;
		}
		stuDoc = $(sel.stuiframe)[0].contentWindow.document;
		var t1 = jqueryplus("#eIDNum", "", stuDoc).jquery.trigger("focus");
		//$("#eIDNum", stuDoc).trigger("input");

		$(sel.eStudentName, stuDoc).trigger("focus").val(stu.eStudentName).trigger("blur");

		$(sel.eIDNum, stuDoc).trigger("focus").val(stu.eIDNum).trigger("blur");
		$(sel.eIDNum2, stuDoc).trigger("focus").val(stu.eIDNum).trigger("blur");
		$(sel.eAddress, stuDoc).trigger("focus").val(stu.eAddress).trigger("blur");
		$(sel.eTelphoneNum, stuDoc).trigger("focus").val(stu.eTelphoneNum).trigger("blur");

		//选择学员类型
		$(sel.studenttype, stuDoc).trigger("click");

		var c1 = document.evaluate(stu.studenttype, stuDoc).iterateNext()
		$(c1).trigger("click");
		//选择班级
		$(sel.qclassType, stuDoc).trigger("click");
		recordTime(function (time, timeInterval) {
			var c1 = document.evaluate(stu.qclassType, stuDoc).iterateNext()
			var cont = $(c1);
			cont.trigger("click");
			if (cont.length > 0) return 'timeIntervalOff';

		}, 4);

		//上传照片
		//$(sel.imgPhoto, stuDoc).attr("src", stu.imgPhoto);
		var uploadbtn = document.evaluate(sel.uploadImgBtn, stuDoc).iterateNext()
		//$(uploadbtn).trigger("focus").trigger("click");
		//$("#imgUploadPhoto", stuDoc).attr("src", stu.imgPhoto2);
		var str2 = 'C:\\fakepath\\1.jpg';
		var str3 = 'E:\\Private\\Picture\\photo.jpg';
		var str4 = 'file:///E:/Private/Picture/photo.jpg';
		var str5 = 'E:/Private/Picture/photo.jpg';
		//$("#imgUploadPhoto", stuDoc).attr("src", str5);
		$("#file1", stuDoc).val(str2);
		//$("#file1-file", stuDoc).trigger("change");
		//$("#file1-file", stuDoc).attr("type", "text");
		//$("#file1-file", stuDoc).val(str3);
		//$("#ePhoto", stuDoc).val(str5);
		//模拟按下回车键
		var e = jQuery.Event("keydown");//模拟一个键盘事件
		e.keyCode = 9;//keyCode=13是回车
		//$("#eIDNum").trigger(e);//模拟页码框按下回车
		//uploadimg1();
		var imgobj = new Object();
		imgobj.imgbase64 = null;
		imgobj.name = null;
		imgobj.filename = null;
		imgobj.urlprefix = '../../../photos/'; //服务器路径图片前缀
		getImgBase64FromHttp2(stu.imgPhoto2, function (base64) {
			//console.log(base64);
			imgobj.imgbase64 = base64;
			imgobj.name = 'file1';
			imgobj.filename = 'photo.jpg';
			uploadimg(imgobj,function(data){
				 $(sel.imgPhoto, stuDoc).attr("src", imgobj.urlprefix + '/' + data.path);
				 $("#ePhoto", stuDoc).val(data.path);
			});
		});
	}

/* ----------------- 图片处理 ----------------- */
	/**
	 * 
	 * @param {*} imgobj.imgbase64	- 图片base64格式 
	 * @param {*} imgobj.name	- 上传文件的参数name值（一般为file1、file2...具体以后台为准） 
	 * @param {*} imgobj.filename	- 上传文件的全名，后台解析用（例：photo.jpg）
	 * @param {*} callback	- 回调函数，参数为...
	 */
	function uploadimg(imgobj, callback) {
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
			url: 'dfo/com_web/sys/Files/uploadPhotoHttp.do',
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

	}
	function getImgBase64FromHttp(imgurl, callback) {
		var image = new Image();
		image.src = imgurl + '?v=' + Math.random(); // 处理缓存
		image.crossOrigin = "*";  // 支持跨域图片
		image.onload = function () {

			var canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0, image.width, image.height);
			var str = imgurl.split('.');
			str[str.length - 1] == "jpg" && (str[str.length - 1] = "jpeg");
			var dataURL = canvas.toDataURL("image/" + (str[str.length - 1] ? str[str.length - 1] : "jpeg"));  // 可选其他值 image/jpeg
			callback && callback(dataURL);
		}
	}
	function getImgBase64FromHttp2(imgUrl, callback) {
		window.URL = window.URL || window.webkitURL;
		var xhr = new XMLHttpRequest();
		xhr.open("get", imgUrl, true);
		// 至关重要
		xhr.responseType = "blob";
		xhr.onload = function () {
			if (this.status == 200) {
				//得到一个blob对象
				var blob = this.response;
				console.log("blob", blob)
				// 至关重要
				var oFileReader = new FileReader();
				oFileReader.onloadend = function (e) {
					// 此处拿到的已经是 base64的图片了
					var base64 = e.target.result;
					callback && callback(base64);
					//console.log("方式一》》》》》》》》》", base64);
				};
				oFileReader.readAsDataURL(blob);
				//====为了在页面显示图片，可以删除====
				//       var img = document.createElement("img");
				//       img.onload = function (e) {
				//         window.URL.revokeObjectURL(img.src); // 清除释放
				//       };
				//       let src = window.URL.createObjectURL(blob);
				//       img.src = src
				//document.getElementById("container1").appendChild(img);
				//====为了在页面显示图片，可以删除==== 
			}
		}
		xhr.send();
	}
/* ----------------- 图片处理 ----------------- */

	var a = 0;
	//生成学员信息
	function addStudentinfo() {
		// var element = $("#imgPhoto");
		// element = element.contents().find("#imgPhoto")
		//---------定位配置---------
		var stuiframe = "iframe[src*='dfo/biz_web/stu/Studentinfo.do']"
		var studentname = "input[name='studentname']";
		var idnum = "input[name='idnum']";
		var eIDNum2 = "input[name='eIDNum2']";
		var idtype = "input[name='idtype']";
		var telphonenum = "input[name='telphonenum']"
		//var zipcode = "input[name='zipcode']"; 此方法会定位到多个
		var zipcode = "input[id*='ext-comp'][name='zipcode']";
		var address = "input[name='address']";
		var studenttype = "input[name='studenttype']";
		var drivecartype = "input[name='drivecartype']";
		var imgid = "#imgPhoto";
		//^^^^^^^^^定位配置^^^^^^^^^
		//---------内容---------
		var stu = new Object();
		stu.studentname = "test1";
		stu.idnum = "330102199003073877";
		stu.idtype = "身份证";
		stu.telphonenum = "13610000001"
		stu.zipcode = "3301";
		stu.address = "Test地址";
		stu.studenttype = "初驾学员";
		stu.drivecartype = "C1";
		stu.imgPhoto = "http://122.225.207.133:20001/photos/upload/001/202011/00120201102095942.jpg";
		//^^^^^^^^^^^^^^^^^^^^^^^^^


		//定位框架下的内容iframe，优化可把学员注册整个一块封装为对象
		var stuView = $(stuiframe);
		if (stuView.length > 0) {
			//可能存在定位到多个iframe
			var stuDocument = stuView[0].contentWindow.document;
			if (stuDocument) {
				// imgEle = $(imgid, stuDocument);
				// var imgpath = "http://192.168.191.99:20001/photos/upload/001/202011/00120201102095942.jpg";
				// imgEle.attr("src", imgpath);
				//垃圾设计，重复代码多，封装为对象
				imgEle = jqueryplus(imgid, description = "定位学员图片元素", stuDocument);
				studentnameEle = jqueryplus(studentname, description = "定位学员姓名元素", stuDocument);
				idnumEle = jqueryplus(idnum, description = "定位学员身份证号元素", stuDocument);
				eIDNum2Ele = jqueryplus(eIDNum2, description = "定位学员确认身份证号元素", stuDocument);
				idtypeEle = jqueryplus(idtype, description = "定位学员证件类型元素", stuDocument);
				telphonenumEle = jqueryplus(telphonenum, description = "定位学员电话元素", stuDocument);
				zipcodeEle = jqueryplus(zipcode, description = "定位学员邮编元素", stuDocument);
				addressEle = jqueryplus(address, description = "定位学员地址元素", stuDocument);
				studenttypeEle = jqueryplus(studenttype, description = "定位学员类型元素", stuDocument);
				drivecartypeEle = jqueryplus(drivecartype, description = "定位学员车型元素", stuDocument);

				if (imgEle.msg.errorcode == 0) { imgEle.jquery.attr("src", stu.imgPhoto) } else { return imgEle.msg.message.msg };
				if (studentnameEle.msg.errorcode == 0) { studentnameEle.jquery.focus().val(stu.studentname).blur(); idnumEle.jquery.click();/*focusLikeEntert(studentnameEle.jquery);*/ } else { return studentnameEle.msg.message.msg };
				if (idnumEle.msg.errorcode == 0) { idnumEle.jquery.focus().val(stu.idnum).blur() } else { return idnumEle.msg.message.msg };
				if (eIDNum2Ele.msg.errorcode == 0) { eIDNum2Ele.jquery.val(stu.idnum) } else { return eIDNum2Ele.msg.message.msg };

				if (idtypeEle.msg.errorcode == 0) { idtypeEle.jquery.val(stu.idtype) } else { return idtypeEle.msg.message.msg };
				if (telphonenumEle.msg.errorcode == 0) { telphonenumEle.jquery.val(stu.telphonenum) } else { return telphonenumEle.msg.message.msg };
				if (zipcodeEle.msg.errorcode == 0) { zipcodeEle.jquery.val(stu.zipcode) } else { return zipcodeEle.msg.message.msg };
				if (addressEle.msg.errorcode == 0) { addressEle.jquery.val(stu.address) } else { return addressEle.msg.message.msg };
				if (studenttypeEle.msg.errorcode == 0) { studenttypeEle.jquery.val(stu.studenttype) } else { return studenttypeEle.msg.message.msg };
				if (drivecartypeEle.msg.errorcode == 0) { drivecartypeEle.jquery.val(stu.drivecartype) } else { return drivecartypeEle.msg.message.msg };
			}

		} else {
			return "提示：请打开学员注册标签!";
		}


		// if (a == 0) {
		// 	document.getElementById("su").value = "查查查";
		// 	//$('.kw').val("查查查");
		// 	$('#kw').val("查查查1");
		// 	//document.getElementById('kw').value  = "查查查";
		// 	a = 1;
		// } else {
		// 	document.getElementById("su").value = "哈哈哈";
		// 	$('#kw').val("哈哈哈");
		// 	document.getElementById('kw').value = "哈哈哈";
		// 	a = 0;
		// }


	}

	//定时触发focus
	function focusLikeEntert(jquery = $()) {
		jquery.focus();
		window.setTimeout(function () {
			jquery.blur();
		}, 1000);

		// jquery.click();
	}
	//传{x="",y=""}对象时，参数{x:1, y:2}不需要按照顺序传
	/***
	 * return jqueryobj:{jquery(jQuery类型),msg(字符串类型)}
	 * 		---msg:{
	 * 			errorcode: 0:成功，
	 * 			1：失败，定位失败，
	 * 			2：失败，元素隐藏
	 * 			3: 失败，定位到多个元素}
	 */
	function jqueryplus(path, description = null, document = null) {
		var msg = { msgtype: "selectelement", errorcode: 1, message: { select: path, description: description, msg: '未定位到元素！' } };
		var ele = null;
		var jqueryobj = new Object();
		jqueryobj.msg = msg;
		jqueryobj.jquery = null;

		if (document) {
			ele = $(path, document);
		} else {
			ele = $(path);
		}
		//元素是否存在

		if (ele.length > 1) {
			msg.errorcode = 3;
			msg.message.msg = "定位到多个元素!"
			jqueryobj.msg = msg;
		} else if (ele.length == 1) {
			jqueryobj.jquery = ele;
			msg.errorcode = 0;
			msg.message.msg = "已定位到元素！";
			jqueryobj.msg = msg;
			if (ele.css("visibility") == "hidden") {
				msg.errorcode = 2;
				msg.message.msg = "元素隐藏了！";
			}
		} else {
			msg.errorcode = 1;
			msg.message.msg = "未定位到元素！"
			jqueryobj.msg = msg;
		}



		//个性化打印
		switch (msg.errorcode) {
			case 1: case 2: case 3:
				console.log("%c%s",
					"color: red; background: yellow;",
					JSON.stringify(jqueryobj.msg));
				break;

			default:
				console.log(JSON.stringify(jqueryobj.msg));
				break;
		}


		return jqueryobj;

	}
	function jqueryplus1(ele) {
		var t1 = typeof (ele);
		if (typeof (ele) == 'string') { }
		else if (typeof (ele) == 'object') { }
		jqueryplus("");
	}

	//元素是否可用
	function isAvailable(ele) {

		var msg = { msgtype: "selectelement", errorcode: 1, message: { select: path, description: description, msg: '未定位到元素！' } };

		var jqueryobj = new Object();
		jqueryobj.msg = msg;
		jqueryobj.jquery = null;

		//元素是否存在
		if (ele.length > 1) {
			msg.errorcode = 3;
			msg.message.msg = "定位到多个元素!"
			jqueryobj.msg = msg;
		} else if (ele.length == 1) {
			msg.errorcode = 0;
			msg.message.msg = "已定位到元素！";
			jqueryobj.msg = msg;
			if (ele.css("visibility") == "hidden") {
				msg.errorcode = 2;
				msg.message.msg = "元素隐藏了！";
			} else {
				jqueryobj.jquery = ele;

			}
		} else {
			msg.errorcode = 1;
			msg.message.msg = "未定位到元素！"
			jqueryobj.msg = msg;
		}

		//个性化打印
		switch (msg.errorcode) {
			case 1: case 2: case 3:
				console.log("%c%s",
					"color: red; background: yellow;",
					JSON.stringify(jqueryobj.msg));
				break;

			default:
				console.log(JSON.stringify(jqueryobj.msg));
				break;
		}

	}

	//代码异步执行*秒
	function functionTotime(params) {
		function showLogin() {
			console.log("1");
		}

		var i = 0;
		//setInterval("showLogin()",0);
		var timefun = setInterval(i++, 0);
		while (true) {

		}
	}

	async function asyncfucntion(callback, time = 3) {
		var i = 0;
		var timefun = setInterval(i++, time);


		return '100'
	}
	function recordTime(callbak, time = 2) {
		if (typeof (time) != "number") return;
		var i = 0;
		var times = 300;
		function test() {
			if (i >= time) { clearInterval(timefun); return };
			var backstr = callbak(time - i, timefun);
			i = (i * 1000 + times) / 1000;
			console.log(i);
			if (backstr == "timeIntervalOff") { clearInterval(timefun); console.log("定时器已关闭"); return };
		}
		var timefun = setInterval(test, times);
	}
	function funyibu() {
		var a = 0;
		/*
		var startTime,endTime;     
		var startDate=new Date(); 
		startTime=startDate.getTime(); 
		var endDate=new Date(); 
		endTime=endDate.getTime(); 
		console.log(endTime-startTime);*/// 计算代码执行时间
		recordTime(function (time) {

			console.log("第一个：" + time);
			a = time;

		}, 5);

		// recordTime2(function(time){
		//   //console.log("第二个：" + time);

		// }, 5);
		// while (a!=1) {

		//   console.log("哈哈");
		// }

	}
	///异步执行代码


	/**
	 * 打印/查询表
	 * @param {"表名"} key 
	 * @param {"callback:result(查询的结果)"} callback 
	 */
	function logChromeStorage(key, callback) {

		chrome.storage.sync.get(key, function (result) {
			callback(result);
		});

	}

	/**
	 * 向特定表插入特定数据，不能重复，类似set
	 * @param {*} tabname 
	 * @param {*} data 
	 */
	function addDataToTabNoSameValue(tabname, data) {
		var bg = chrome.extension.getBackgroundPage();
		bg.logChromeStorage(tabname, function (result) {
			if (!result[tabname]) { console.log(tabname + "表不存在"); return };
			for (var i = 0; i < result[tabname].length; i++) {
				const element = result[tabname][i];
				if (data === element) {
					console.log(tabname + "->" + JSON.stringify(data) + "->已存在");
					return;
				}
			}
			result[tabname].push(data);
			addChromeKeyStorage(tabname, result[tabname]);
		});
	}

	/**
	 * 写入特定storage数据
	 * @param {*} tabname 
	 * @param {*} data 
	 */
	function addChromeKeyStorage(tabname = null, data) {
		if (!tabname) { console.log("tabname不能为空"); return; }
		// 往存储中写入数据
		chrome.storage.sync.set({ [tabname]: data }, function () {
			console.log(tabname + "写入成功!");
			var bg = chrome.extension.getBackgroundPage();
			bg.logChromeStorage(null, function (result) {
				console.log("---------sync区域所有数据：↓---------");
				console.log(result);
				console.log("---------sync区域所有数据：↑---------");
			});
		});
	}
	//查询byfield
	async function selectChromeStorageByField(tabname, field, field_value, callback){
		// function wait(){
		// 	return new Promise((resolve, reject) => { 
		// 		chrome.storage.sync.get(tabname, function (result) {
		// 			var list_new = [];

		// 			for (var i = 0; i < result[tabname].length; i++) {
		// 				const element = result[tabname][i];
		// 				if(field_value === element[field]){
		// 					list_new.push(element);
		// 				}
		// 			}
		// 			resolve(list_new);
		// 		});
		// 	});
		// }
		var result = [], data = [];
		result = await selectChromeStorage(tabname);
		for (var i = 0; i < result.length; i++) {
			const element = result[i];
			if(field_value === element[field]){
				data.push(element);
			}
		}
		callback(data); //等待btnmenu数据查询完成

	}
	
	function selectChromeStorage(key, callback = null) {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get(key, function (result) {
				resolve(result[key]);
			});
		});
	}	
	async function selectChromeStorage2(tabname, field_name) {

		var result = await selectChromeStorage(tabname);
		var data = [];
		for (var i = 0; i < result.length; i++) {
			const element = result[i];
			if(element[field_name]){
				data = data.concat(element[field_name]);
			}
		}
		return data;
		

	}	
})();
