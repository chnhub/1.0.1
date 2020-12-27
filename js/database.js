/**
 * 替换表数据
 * @param {*} tabname 
 * @param {*} data 
 */
function updateChromeStorage(tabname = null, data) {
    if (!tabname) { console.log("tabname不能为空"); return; }
    // 往存储中写入数据
    chrome.storage.sync.set({ [tabname]: data }, function () {
        console.log(tabname, "写入成功：", data);
        // var bg = chrome.extension.getBackgroundPage();
        // queryChromeStorage(null,function(result){
        //     console.log("---------sync区域所有数据：↓---------");
        //     console.log(result);
        //     console.log("---------sync区域所有数据：↑---------");
        // });
    });
}
//插入
function insertChromeStorage(tabname, data){
    selectChromeStorage(tabname,function(result){
        if(!result[tabname]){console.log(`插入数据失败，${tabname}表不存在`);return};
        result[tabname].push(data);
        updateChromeStorage(tabname,result[tabname]);
    });
}
//插入唯一 field不能重复的字段
function insertChromeStorageNoSame(tabname, data, field){
    selectChromeStorage(tabname,function(result){
        if(!result[tabname]){console.log(`插入数据失败，${tabname}表不存在`);return};
        for (var i = 0; i < result[tabname].length; i++) {
            const element = result[tabname][i];
            if(data[field] === element[field]){
                console.log(`插入数据失败，${tabname}的${field}字段值重复：` + JSON.stringify(data));
                return;
            }
        }
        result[tabname].push(data);
        updateChromeStorage(tabname,result[tabname]);
    });
}
//修改field同样的数据
function updateChromeStorageByField(tabname, data, field){
    selectChromeStorage(tabname,function(result){
        if(!result[tabname]){console.log(`插入数据失败，${tabname}表不存在`);return};
        var result_bak = [];
        for (var i = 0; i < result[tabname].length; i++) {
            const element = result[tabname][i];
            if(data[0]&&data[0][field]&&data[0][field] === element[field]){
                continue;
            }
            result_bak.push(element);
        }
        
        updateChromeStorage(tabname,result_bak.concat(data));
    });
}

//删除通过字段
function deleteChromeStorage(tabname, field, field_value){
    chrome.storage.sync.get(tabname, function (result) {
        var result_new = [];
        for (var i = 0; i < result[tabname].length; i++) {
            const element = result[tabname][i];
            if(field_value === element[field]){
                continue;
            }
            result_new.push(element);
        }
        updateChromeStorage(tabname, result_new);
        selectChromeStorage(tabname, function(re){console.log(re);});
    });
}
//删除field_list中的值，为空时删除全部属于field
async function deleteChromeStorage2(tabname, field, field_list){
    var result_new = [];
    function deleteList(tabname, field, field_list) {
        return new Promise((resolve, reject) => { 
            chrome.storage.sync.get(tabname, function (result) {
                // var result_new = [];
                for (var i = 0; i < result[tabname].length; i++) {
                    const element = result[tabname][i];
                    var is_delete = false;
                    field_list.forEach(ele => {
                        if(ele === element[field]||!element["btnid"]){
                            is_delete = true;
                            return;
                        }                                               
                    });
                    if(!is_delete)result_new.push(element);                   
                }
                resolve(result_new);
            });
        });        
    }
    result_new = await deleteList(tabname, field, field_list);
    updateChromeStorage(tabname, result_new);
    selectChromeStorage(tabname, function(re){console.log(re);});

}

//查询
function selectChromeStorage(tabname, callback){
    chrome.storage.sync.get(tabname, function (result) {
        callback(result);
    });
}
//查询byfield
function selectChromeStorageByField(tabname, field, field_value, callback){
    chrome.storage.sync.get(tabname, function (result) {
        var is_exist = false;
        var duplicate_data = null 
        for (var i = 0; i < result[tabname].length; i++) {
            const element = result[tabname][i];
            if(field_value === element[field]){
                is_exist = true;
                duplicate_data = result[tabname][i];
            }
        }
        callback(is_exist, duplicate_data, result);
    });
}

// 根据字段返回符合条件数组
function getListByFiled(list, field, filed_value){
    var list_new = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if(filed_value === element[field]){
            list_new.push(element);
        }
        
    }
    return list_new;
}