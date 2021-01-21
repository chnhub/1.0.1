
var PROJECT_MAIN_TABLE = "mainTable";// 主表名
var PROJECT_IP_TABLE = "allowInjectionIP";// 允许插入IP表名
var CHROME_LAST_ERROR = null; //chrome的报错信息
var Tab = null;

//初始化页面
(function () {
    //页面初始化调用
    (function () {

        initTab();
        //insertFloatDiv();
        
    })();
})();
//添加右键菜单
chrome.contextMenus.create({
    title: "嘿嘿",
    onclick: function () {       
        sendMessage2({ msgtype: 'gethtmlurl' }, false, function(msg){
            initFloatDiv(msg.data);
        });
        
        //getCurrentTabId((tabID) => { console.log("ChromeTabID:" + tabID); sendMessage(tabID, { msgtype: 'addfloatdiv' }, false); });
    }
});

//根据ip是否插入浮动菜单div（已废弃：原本设计定时后台发送消息给content-script处理，后改为页面加载完成后直接触发）
function insertFloatDiv(params) {
    var times = 1000;//多长时间执行一次ms
    function timefun() {
        //1. 检测页面是否存在浮动菜单
        getCurrentTabId((tabID) => {
            tabID && sendMessage(tabID, { msgtype: 'addfloatdiv_bk' }, true);
        });
        //2. 不存在则发消息给content-script添加菜单

        queryChromeStorage(PROJECT_IP_TABLE, function (result) {
            console.log(result);
        });
    }
    var timefun = setInterval(timefun, times);

}


/* start----------------功能项----------------start */

/**
 * 是否显示浮动菜单
 * @param {"页面的url"} url 
 */
function initFloatDiv(url){
    getCurrentTabId((tabID) => {
        tabID && sendMessage(tabID, {msgtype: 'isshowfloatdiv'}, false, function(msg){
            if (msg.errorcode === 0) {
                getCurrentTabId((tabID) => {
                    tabID && sendMessage(tabID, {msgtype: 'delfloatdiv'});
                    delDataInTab(PROJECT_IP_TABLE, url);
                });
            }else{
                    tabID && sendMessage(tabID, {msgtype: 'addfloatdiv'}, false);
                    addurlToTable(url);
            }
        });
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
    url&&addDataToTabNoSameValue(PROJECT_IP_TABLE,url);

}
/* end----------------功能项----------------end */

/* start----------------快捷操作业务表----------------start */
function delClickEventTab(tabname, data){
    tabname||(tabname = "click_Event_Tab");
    var tabChilden =["children","value"];
    // 从存储中读取数据
    chrome.storage.sync.get(tabname, function(result){
        //console.log("需要清除的数据：" + tabname + JSON.stringify(result) + "：↓");
        //var l = result[tabname].length; // 原数组长度
  
        if (result[tabname]) {
            for(var i = 0; i < result[tabname].length; i++){
                // if(data.indexOf(result[tabname][i])>=0){
                //     result[tabname].splice(i, 1);
                //     break;
                // }
                for(var j = 0; j < result[tabname][i][tabChilden[0]].length; j++){
                    if(data.indexOf(result[tabname][i][tabChilden[0]])||result[tabname][i][tabChilden[0]].indexOf(data)){
                        //删除数组内容
                        result[tabname][i][tabChilden[0]].splice(i, 1);
                        break;
                    }
                }

            }
            // sync 区域
            chrome.storage.sync.set({[tabname]: result[tabname]}, function(){
                //do something
                console.log(tabname,"表已更新:" + data);
            });
        }

    });
}
function initTab(){
    settingConfigInit(PROJECT_MAIN_TABLE);
    settingConfigInit("allowInjectionIP");
    initTabByName("click_event_tab");
    initTabByName("selector_mode");
    initTabByName("event_list");
    initTabByName("btnmenu");
    var data =  queryChromeStorage2("click_event_tab");
    console.log(data);
}
//初始化指定表名
function initTabByName(tabname){
    //data : {[{"text":"元素事件", "children":[{"value": 1, "text": "click"}]}]  }
    //var defaultTabData = [{"value":"group1", "text":"元素事件", "children":[{"value": 1, "text": "click"}]}, {"value":"group2", "text":"自定义事件", "children":[{"value": 2, "text": "wait"}]}];
    //default_tab 从default_tab.js引入
    var defaultTabData = default_tab[tabname];
    settingConfigInit(tabname, defaultTabData);
}

/* end----------------快捷操作业务表----------------end */


/* start----------------数据库----------------start */
/**
 * 创建新表
 * @param {"创建表名称"} tableName 
 * @param {"表创建时默认数据"} data
 */
function settingConfigInit(tableName, data = null) {
    //var tableName = PROJECT_MAIN_TABLE;
    data?1:data = new Array();
    //var mainTable = new Array();
    chrome.storage.sync.get([tableName], function (result) {
        console.log("tableName为" + tableName);
        console.log(result[tableName]);
        if (result[tableName]) {
            console.log('已存在' + tableName + '表');

        } else {
            chrome.storage.sync.set({ [tableName]: data }, function () {
                console.log('创建' + tableName + '表');
            });
        }

    });

}

/**
 * 打印/查询表
 * @param {"表名"} key 
 * @param {"callback:result(查询的结果)"} callback 
 */
function queryChromeStorage(key, callback) {
    chrome.storage.sync.get(key, function (result) {
        callback(result);
    });

}
function queryChromeStorage2(key, callback = null) {

    //function query(){
       return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, function (result) {
                resolve(result);
            });
        });
    //}

    // console.log(1);
    // var result = await query();
    // console.log("1111111111111111111111111111111111"+result);
    // console.log(2);
}
/**
 * 清除表中特定数据
 * @param {*} tabname 需要清除storage中的表名，tabname为空清除全部（目前只支持二级json）
 */
function delDataInTab(tabname = null, data = null){
    queryChromeStorage(null,function(result){
        console.log("---------sync区域所有数据：↓---------");
        console.log(result);
        console.log("---------sync区域所有数据：↑---------");
    });
    if(!tabname){        
        // sync 区域
        chrome.storage.sync.clear(function(){
            //do something
            console.log("sync区域所有数据已清除");
        });
        return;
    }
    if(!data){

        return;
    }

    // 从存储中读取数据
    chrome.storage.sync.get(tabname, function(result){
        //console.log("需要清除的数据：" + tabname + JSON.stringify(result) + "：↓");
        console.log("需要清除的数据：" + "↓");
        console.log(data);
        var l = result[tabname].length; // 原数组长度
        if (result[tabname]) {
            for(var i = 0; i < result[tabname].length; i++){
                // if(data.indexOf(result[tabname][i])>=0){
                //     result[tabname].splice(i, 1);
                //     break;
                // }
                if (result[tabname][i]&&JSON.stringify(result[tabname][i]).indexOf(data)) {
                    result[tabname].splice(i, 1);
                    break;
                }
            }
            if(l===result[tabname].length){console.log(tabname,"表无该数据：", data);return;}
            // sync 区域
            chrome.storage.sync.set({[tabname]: result[tabname]}, function(){
                //do something
                console.log(tabname,"表已更新",l-result[tabname].length,"行");
            });
        }

    });

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
        console.log(tabname,"写入成功：", data);
        var bg = chrome.extension.getBackgroundPage();
        queryChromeStorage(null,function(result){
            console.log("---------sync区域所有数据：↓---------");
            console.log(result);
            console.log("---------sync区域所有数据：↑---------");
        });
    });
}

/**
 * 向特定表插入特定数据，不能重复，类似set
 * @param {*} tabname 
 * @param {*} data 
 */
function addDataToTabNoSameValue(tabname, data){
    var bg = chrome.extension.getBackgroundPage();
    queryChromeStorage(tabname,function(result){
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
/* end----------------数据库----------------end */

/* start----------------发送消息----------------start */
/**
 * 获取当前页面id
 * @param {"回调函数：参数为tabid"} callback 
 */
function getCurrentTabId(callback) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

/**
 * 发送message到tabID页面
 * @param {*} tabID 
 * @param {*} message 
 */
function sendMessage(tabID, message, notips = true, callback = null) {
    try {
        var port = chrome.tabs.connect(tabID, { name: 'test-connect' });

        //断开连接时触发
        port.onDisconnect.addListener(obj => {
            console.log('disconnected port');
            //alert("请进入目标页面并刷新！");
            //changeTips("提示：请进入目标页面并刷新！","red");
            //alert("提示：请进入目标页面并刷新！");
            CHROME_LAST_ERROR = chrome.runtime.lastError;
            if (CHROME_LAST_ERROR && CHROME_LAST_ERROR.message && CHROME_LAST_ERROR.message.indexOf("Could not establish connection") >= 0) {

                if (notips) {
                    console.log("%c%s",
                        "color: red; background: yellow;",
                        ("chrome.runtime.lastError: " + CHROME_LAST_ERROR.message));
                } else {
                    alert("请进入目标页面并刷新！")
                }
            }
            // CHROME_LAST_ERROR&&CHROME_LAST_ERROR.message&&CHROME_LAST_ERROR.message.indexOf("Could not establish connection")>=0&&(notips||alert("请进入目标页面并刷新！"))||console.log("%c%s",
            // "color: red; background: yellow;",
            // JSON.stringify("chrome.runtime.lastError: "+CHROME_LAST_ERROR.message));       
        });
        //port.postMessage({msgtype: 'addfloatdiv'});
        port.postMessage(message);
        port.onMessage.addListener(function (msg) {
            //console.log("background.js收到消息:" + JSON.stringify(msg));
            callback&&callback(msg);
        });
    } catch (error) {
        console.log(error);
    }
}
/**
 * 发送message到默认当前页面
 * @param {*} message 
 * @param {"是否以日志方式提示错误"} notips 
 * @param {"回调函数"} callback 
 */
function sendMessage2(message, notips = true, callback = null) {
    getCurrentTabId((tabID)=>{
        sendMessage(tabID, message, notips, callback) 
    });
    
}
/* end----------------发送消息----------------end */
