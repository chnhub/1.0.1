
var PROJECTMAINTABLE = "mainTable";
var PROJECTIPTABLE = "allowInjectionIP";
var CHROMELASTERROR = chrome.runtime.lastError;
//全局变量尽量少用，后期处理
var changeColorBtn = document.getElementById('change-color');
var addStudentInfoBtn = document.getElementById('add-studentinfo');
var testBtn = document.getElementById('test');
var floatDivSwitch = document.getElementById('float-div-switch');
var chromeStorageBtn = document.getElementById('chrome-storage');
var chromeStorageClearAllBtn = document.getElementById('chrome-storage-clear');
var chromeStorageClearKeyBtn = document.getElementById('chrome-storage-restart');
var chromeStorageQueryBtn = document.getElementById('chrome-storage-query');
var chromeStorageAddBtn = document.getElementById('chrome-storage-add');

//自执行匿名函数，避免全局变量污染
(function(){

    var back_div_color = 0;
    changeColorBtn.onclick = function(){
        switch (back_div_color) {
            case 0:
                document.getElementById('back-div').style.backgroundColor = "green";
                back_div_color = 1;
                break;
            case 1:
                document.getElementById('back-div').style.backgroundColor = "red";
                back_div_color = 0;
                break;
        
            default:
                break;
        }

    }
})();

//var err = chrome.runtime.lastError;
var err = chrome.runtime.lastError;
function callback1() {
    alert("test");
}
(function(){
    var i = 0;
    chromeStorageClearAllBtn.onclick = function(){
        //clearChromeKeyStorage();
        var user1 = {'name': '1', 'age': 18};
        addDataToMainTab(i);
        i++;
    }
})();
addStudentInfoBtn.onclick = function(){
    console.log("----------------->生成学员信息");
    var studentinfo = new Object();
    studentinfo.name = "test";
    studentinfo.idnum = "123";
    console.log(studentinfo);

    console.log(studentinfo.name);

    getCurrentTabId((tabId) => {
        try {
            
            var port = chrome.tabs.connect(tabId, {name: 'test-connect'});

            //断开连接时触发
            port.onDisconnect.addListener(obj => {
                console.log('disconnected port');
                //alert("请进入目标页面并刷新！");
                changeTips("提示：请进入目标页面并刷新！","red");
            });
            port.postMessage({msgtype: 'addsudentinfo'});
            port.onMessage.addListener(function(msg) {
                if (msg.msgtype == "tips") {
                    console.log(msg.data);
                    changeTips(msg.data.message, msg.data.errorcode);
                }
            });

        } catch (error) {
            console.log(error);
        }
        
        

    });
   
    // sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
    // {
    //     console.log('来自content的回复：'+response);
    //     //alert(response);
    // });

};
testBtn.onclick = function(){
    window.close();
    getCurrentTabId((tabId) => {
    try {
            
        var port = chrome.tabs.connect(tabId, {name: 'test-connect'});

        //断开连接时触发
        port.onDisconnect.addListener(obj => {
            console.log('disconnected port');
            //alert("请进入目标页面并刷新！");
            changeTips("提示：请进入目标页面并刷新！","red");
        });
        port.postMessage({msgtype: 'test'});
        port.onMessage.addListener(function(msg) {
            if (msg.msgtype == "tips") {
                console.log(msg.data);
                changeTips(msg.data.message, msg.data.errorcode);
            }
        });

    } catch (error) {
        console.log(error);
    }
});
};
floatDivSwitch.onclick = function(){
    getCurrentTabId((tabId) => {
        try {               
            var port = chrome.tabs.connect(tabId, {name: 'test-connect'});    
            //断开连接时触发 用于检测该页面是否已插入脚本，但用此方法不合适
            port.onDisconnect.addListener(obj => {
                console.log('disconnected port');
                //alert("请进入目标页面并刷新！");
                changeTips("提示：请进入目标页面并刷新！","red");
            });
            port.postMessage({msgtype: 'addfloatdiv'});
            port.onMessage.addListener(function(msg) {
                //添加页面的ip至数据库
                if(msg&&msg.msgtype === "addfloatdiv"){
                    //添加url至数据库

                    addurlToTable(msg.data);
                }
            });
    
        } catch (error) {
            console.log(error);
        }
    });

};
chromeStorageBtn.onclick = function(){
    chrome.storage.sync.get(['mainTable'], function(result) {
        console.log(result);
       // console.log(result['mainTable']);
    });
    var mainArray = new Array();
    var user1 = {'name': 'diego', 'age': 18}
    var user2 = {'name': 'tony', 'age': 19}
    var mainArray = [user1, user2, "3"];
    mainArray.push(user2);
    
    // 往存储中写入数据
    // chrome.storage.sync.set({'mainTable': mainArray}, function() {
    //     console.log('保存成功1');
    // });
    // chrome.storage.sync.set({'mainTable2': mainArray}, function() {
    //     console.log('保存成功2');
    // });


};
//添加
chromeStorageAddBtn.onclick = function(){
    var ip = '192.168.191.99';
    addDataToTabNoSameValue('allowInjectionIP', ip);
};
//清除指定名称的表
$("#btn_clear_onetab").click(function (e) {
    var tabname = $("#tab_name_clear").val();
    deleteChromeStorage(tabname);
});

//清除指定key数据
chromeStorageClearKeyBtn.onclick = function(){
    //clearChromeKeyStorage('mainTable');
    clearChromeKeyStorage();
    addChromeKeyStorage(PROJECTMAINTABLE, new Array());
    addChromeKeyStorage("allowInjectionIP", []);
};
//查询
chromeStorageQueryBtn.onclick = function(){
    var bg = chrome.extension.getBackgroundPage(); // 垃圾搜狗不支持
    bg.queryChromeStorage(null,function(result){
        console.log("---------sync区域所有数据：↓---------");
        console.log(result);
        console.log("---------sync区域所有数据：↑---------");
    });
};

function deleteChromeStorage(tabname) {
    if(!tabname)return "tablename不能为空";
    // 从存储中读取数据
    chrome.storage.sync.get(tabname, function(result) {
        //console.log("需要清除的数据：" + tabname + JSON.stringify(result) + "：↓");
        if(!result[tabname]){changeTips(tabname + "表不存在！","green");return;}        
        console.log("需要清除的数据：" + "：↓");
        console.log(result);
        // sync 区域
        chrome.storage.sync.remove(tabname, function(){
            //do something
            console.log(tabname + "已删除！");
            changeTips(tabname + "内容已删除！","green");
        });
    });

    // // sync 区域
    // chrome.storage.sync.clear(function(){
    //     //do something
    //     console.log("sync区域所有数据已清除");
    // });
}


// addStudentInfoBtn.onclick = function(){
//     console.log("----------------->生成学员信息");
//     getCurrentTabId((tabId) => {
//         var port = chrome.tabs.connect(tabId, {name: 'test-connect'});
//         port.postMessage({question: '你是谁啊？'});
//         port.onMessage.addListener(function(msg) {
//             alert('收到消息：'+msg.answer);
//             if(msg.answer && msg.answer.startsWith('我是'))
//             {
//                 port.postMessage({question: '哦，原来是你啊！'});
//             }
//         });
//     });

// }
//一次性消息
function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}
//长连接


// chrome.tabs.query(
//     {active: true, currentWindow: true},
//     function(tabs) {
//         var port = chrome.tabs.connect(//建立通道
//             tabs[0].id,
//             {name: "test-connect"}//通道名称
//         );
//         port.postMessage({question: '你是谁啊？'});
// });


// 获取当前选项卡ID
function getCurrentTabId(callback)
{

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
        {
            if(callback) callback(tabs.length ? tabs[0].id: null);
        });
}
/**
 * 提示框
 * @param {*} text 
 * @param {*} backcolor 
 */
function changeTips(text, backcolor = "greenyellow") {
    switch (backcolor) {
        case 0:
            backcolor = "green";
            break;
        case 1:
            backcolor = "red";
            break;
    }
    document.getElementById("tips-div").style.backgroundColor = backcolor;
    $("#tips-div>p").text(text);

    $("#tips-div").addClass("shanshan");
    setTimeout(function(){
        $("#tips-div").removeClass("shanshan");
    },3000)
}

/**
  * 清除特定storage数据
  * @param {*} tabname 需要清除storage中的key值，tabname为空清除全部
  */
function clearChromeKeyStorage(tabname = null){
    var bg = chrome.extension.getBackgroundPage();
    bg.queryChromeStorage(null,function(result){
        console.log("---------sync区域所有数据：↓---------");
        console.log(result);
        console.log("---------sync区域所有数据：↑---------");
    });
    if(tabname){      
        // 从存储中读取数据
        chrome.storage.sync.get(tabname, function(result) {

            //console.log("需要清除的数据：" + tabname + JSON.stringify(result) + "：↓");
            console.log("需要清除的数据：" + "：↓");
            console.log(result);
        });
        // sync 区域
        chrome.storage.sync.remove(tabname, function(){
            //do something
            console.log(tabname + "已删除！");
        });

    }else{
        // sync 区域
        chrome.storage.sync.clear(function(){
            //do something
            console.log("sync区域所有数据已清除");
        });
    }

    // sync 区域
    // chrome.storage.sync.clear(function(){
    //     //do something
    //     console.log("sync区域数据已清除");
    // });

    // // local 区域
    // chrome.storage.local.clear(function(){
    //     //do something
    //     console.log("local区域数据已清除");
    // });
}
/**
 * 写入特定storage数据
 * @param {*} tabname 
 * @param {*} data 
 */
function addChromeKeyStorage(tabname = null, data){
    if(!tabname){console.log("tabname不能为空");return;}
    // 往存储中写入数据
    chrome.storage.sync.set({[tabname]: data}, function() {                
        console.log(tabname + "写入成功!");
        var bg = chrome.extension.getBackgroundPage();
        bg.queryChromeStorage(null,function(result){
            console.log("---------sync区域所有数据：↓---------");
            console.log(result);
            console.log("---------sync区域所有数据：↑---------");
        });
    });
}
/**
 * 向主表mainTable添加数据
 * @param {"插入主表的数据"} data 
 */
function addDataToMainTab(data){
    var bg = chrome.extension.getBackgroundPage();
    bg.queryChromeStorage(PROJECTMAINTABLE,function(result){
        result[PROJECTMAINTABLE].push(data);
        addChromeKeyStorage(PROJECTMAINTABLE,result[PROJECTMAINTABLE]);

    });

    
}
/**
 * 向特定表插入特定数据
 * @param {*} tabname 
 * @param {*} data 
 */
function addDataToTab(tabname, data){
    var bg = chrome.extension.getBackgroundPage();
    bg.queryChromeStorage(tabname,function(result){
        if(!result[tabname]){console.log(tabname+"表不存在");return};
        result[tabname].push(data);
        addChromeKeyStorage(tabname,result[tabname]);
    });
}
/**
 * 向特定表插入特定数据，不能重复，类似set
 * @param {*} tabname 
 * @param {*} data 
 */
function addDataToTabNoSameValue(tabname, data){
    var bg = chrome.extension.getBackgroundPage();
    bg.queryChromeStorage(tabname,function(result){
        if(!result[tabname]){console.log(tabname+"表不存在");return};
        for (var i = 0; i < result[tabname].length; i++) {
            const element = result[tabname][i];
            if(data === element){
                console.log(tabname + "->" + JSON.stringify(data) + "->已存在");
                return;
            }
        }
        result[tabname].push(data);
        addChromeKeyStorage(tabname,result[tabname]);
    });
}
/**
 * 添加ip或域名到表
 * @param {"页面的url"} url 
 */
function addurlToTable(url){
    //url分两种处理 1.ip地址    2.域名  --艹 根本不需要分别处理
    // \b:\/\/\b\d+\.\d+\.\d+\.\d+ 匹配ip
    var reg = /\b:\/\/\b\d+\.\d+\.\d+\.\d+/;
    //if(reg.test(url)){}
    url = url.substring(length = url.indexOf("://") + 3, url.indexOf("/", length));
    url&&addDataToTabNoSameValue(PROJECTIPTABLE,url);

}
/**
 * 删除ip或域名到表
 * @param {"页面的url"} url 
 */
function delurlToTable(url){
    
}

// notes: json字符串中变量作为key需要加[]，比如[key]:values;
// notes: 对象转字符串JSON.stringify(result) 