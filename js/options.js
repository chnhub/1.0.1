// notes：共同约定，tab_id和collapse_id的id都是相同的，这也是区分不同按钮表的重要依据
{
    //表数据(被迫全局存数据，chrome查询数据是用回调函数的，不太优雅)
    var click_event_tab = null;
    var selector_mode = null;
    var event_list = null;
    var btnmenu_tab = null;
    // 插入的行，变色需要
    var cell_start_index = {};
    var cell_end_index = null;
    var cell_click_times = 0;
    // 选中cell的位置，每个按钮表存一个，编辑后自动跳回原来位置
    var cell_select_position = {};
    // 全局变量
    var tab_want_height = 300 + 52.75 + 39;


    var collapse_json = { data: [{ "id": "1", "name": "生成学员信息" }, { "id": "2", "name": "生成教练信息" }] };
    $(document).ready(function(){
        //alert("加载完成")
    });

    //页面初始化函数
    (async function auto() {
        click_event_tab = await queryChromeStorage2("click_event_tab");
        selector_mode = await queryChromeStorage2("selector_mode");
        event_list = await queryChromeStorage2("event_list");
        btnmenu_tab = await queryChromeStorage2("btnmenu");
        initOptions();
        initPageEvent();
    })();

    function initOptions() {
        initCollapse("#accordion", btnmenu_tab);
    }
    // $(".card>div>a").click(this,function(e){
    // 	alert(this.innerText);
    // });
    //设置editable 弹出模式
    //$.fn.editable.defaults.mode = 'inline';
    //初始化每个card框架
    function initCollapse(selector, params) {
        if(!selector&&!params)return;
        for (var i = 0; i < params.length; i++) {

            var obj = new Object();
            obj.selector = selector;
            obj.id = params[i].id
            obj.name = params[i].name
            obj.data = getTable(obj);

            var str = getCollapse(obj);
            $(selector).append(str);
            initTable(obj);
        }

    }
    /**
     * card模板
     * @param {"初始化collapse的参数对象"} obj cselector:collapse的选择器，id:collapse的id，name:collapse的name，
     */
    function getCollapse(obj) {
        if (!obj) return null;
        obj.selector;
        obj.id;
        obj.name;
        obj.data;
        var strCollapse = `
						<div class="card">
							<div class="card-header">
								<a class="card-link" data-toggle="collapse" href="#collapse_${obj.id}">
									${obj.name}
								</a>
							</div>
							<div id="collapse_${obj.id}" class="collapse" data-parent=${obj.selector}>
								<div class="card-body">
									${obj.data}
								</div>
							</div>
						</div>`;
        return strCollapse;
    }
    //table模板
    function getTable(obj) {//<div class="table-responsive" style="height:${tab_want_height+20}px">
        var table = `<div class="" >

            <div id="toolbar_${obj.id}" class="toolbar d-flex"  tableid='table_${obj.id}'>
                <div class="btn-group btn-group-sm p-1" role="group" aria-label="left-group">
                    <button class="btn btn-secondary table-row-add">添加</button>
                    <button class="btn btn-light table-row-del">删除</button>
                    
                </div>
                <div class="btn-group btn-group-sm ml-auto p-1" role="group" aria-label="right-group">
                    <button class="btn btn-secondary table-row-save">保存</button>
                </div>

            </div>
            <table id = "table_${obj.id}" class="table text-nowrap">
                <thead>
                <tr>
                <th data-field="id">ID</th>
                <th data-field="name">Item Name</th>
                <th data-field="price">Item Price</th>
                </tr>
                </thead>
            </table>
            <div>
            `;
            //</div>
            /**				
                <div class="toolbar d-flex"  tableid='table_${obj.id}'>
					<div class="btn-group btn-group-sm p-1" role="group" aria-label="left-group">
						<button class="btn btn-secondary table-row-add">添加</button>
						<button class="btn btn-light table-row-del">删除</button>
						
					</div>
					<div class="btn-group btn-group-sm ml-auto p-1" role="group" aria-label="right-group">
						<button class="btn btn-secondary table-row-save">保存</button>
					</div>

                </div>
                 */
        return table;
    }
    //初始化事件tab列表
    function initTable(obj) {
        var data = [];
        data = getListByFiled(event_list, 'btnid', `collapse_${obj.id}`);
        $(`#table_${obj.id}`).bootstrapTable({
            //dataField: "data", // 接收数据json的默认键
            data: data,
            //pagination: false,
            //editable: true,
            //clickToSelect: true,
            //height: tab_want_height,
            undefinedText:"",
            toolbar: `#toolbar_${obj.id}`,
            rowStyle: setRowStyle,
            columns: [{
                width: 38,
                field: "box",
                align: "center",
                checkbox: true
            }, {
                width: 35,
                field: "index",
                title: "#",
                align: "center",
                formatter: function (value, row, index) {
                    return index+1;
                }
            }, {
                width: 150,
                field: "name",
                title: "Name",
                align: "center",
                editable: {
                    type: 'text',
                    title: 'Name',
                    validate: function (v) {
                        if (!v) return '不能为空';
                    }
                }
            }, {
                width: 100,
                field: "selectormode",
                title: "SelectorMode",
                align: "center",
                editable: {
                    emptytext: "不能为空",
                    //mode: "inline",
                    // placement: 'top',
                    type: 'select',
                    title: '事件',
                    id: "selectormode",
                    defaultValue: "test",
                    source: function () {
                        return [
                            {
                                "value": "1", "text": "jquery", "order": 1
                            },
                            {
                                "value": "2", "text": "xpath", "order": 2
                            }
                        ];
                    },
                    //success: function(response, newValue) {  return true;}
                }
            }, {
                width: 250,
                field: "selector",
                title: "Selector",
                align: "center",
                formatter: function (value, row, index) {
                    // /\"/g是替换全部
                    var d = row.selector.replace(/\"/g, `&quot;`);// 双引号要替换
                    //d = d.replace(/\'/g, `\\'`);
                    return d;
                },
                editable: {
                    emptytext: "不能为空",
                    //mode: "inline",
                    // placement: 'top',
                    type: 'textarea',
                    title: '选择器',
                    id: "selector",
                    placeholder: "元素的选择器",
                    pk: "selector"
                    //success: function(response, newValue) {  return true;}
                }
            }, {
                width: 150,
                field: "eventid",
                title: "Event",
                align: "center",
                //编辑框的模式：支持popup和inline两种模式，默认是popup
                editable: {
                    emptytext: "不能为空",
                    //mode: "inline",
                    // placement: 'top',
                    type: 'select',
                    title: '事件',
                    id: "event",
                    defaultValue: "test",
                    pk: "value",
                    source: function () {
                        return click_event_tab;
                    },
                    //success: function(response, newValue) {  return true;}
                }

            }, {
                width: 250,
                field: "params",
                title: "Params",
                align: "center",
                editable: {
                    //emptytext: "--",
                    //mode: "inline",
                    // placement: 'top',
                    type: 'textarea',
                    title: '参数',
                    id: "selector",
                    placeholder: function(row){
                        return "元素参数";
                    },
                    pk: "selector"
                    //success: function(response, newValue) {  return true;}
                }
            }, {
                width: 150,
                field: "order",
                title: "Order",
                align: "center",

            }, {
                width: 150,
                field: "id",
                title: "id",
                align: "center",
            }],
            onEditableSave: function (field, row, index, $el, a, b) {
                //alert(index);
                cell_select_position[`table_${obj.id}`] = $(`#table_${obj.id}`).bootstrapTable('getScrollPosition');
                //$(`#table_${obj.id}`).bootstrapTable('scrollTo',{unit: 'rows', value: index});
            },
            onEditableInit:function(){
                //alert("editable init");
                $(`#table_${obj.id}`).bootstrapTable('scrollTo',{unit: 'px', value: cell_select_position[`table_${obj.id}`] });
                delete cell_select_position[`table_${obj.id}`];
            }
        });
        //setTableHeight(`table_${obj.id}`);
        //$(`#table_${obj.id}`).bootstrapTable("resetWidth");

    }
    //没辙 兼容性太难调
    function setTableHeight(tabid = null){
        //var tab_height = $(`#${tabid}`).parents(".bootstrap-table").height();
        var tabs = $("table[id^='table']");
        for (let i = 0; i < tabs.length; i++) {
            const element = tabs[i];
            var tab_height = $(tabs[i]).parents(".bootstrap-table").height();
            if(tab_height&&tab_height >= tab_want_height){
                $(tabs[i]).bootstrapTable('resetView',{height: tab_want_height});
                
            }

        }
        

    }
    //插入一行着色
    function setRowStyle(row, index) {
        var style = {};
        // if (typeof(cell_start_index)==="number"&&typeof(cell_end_index)==="number"&&index >= cell_start_index &&index < cell_end_index ) {
        //     //style={css:{'background-color':'#ed5565'}};
        //     style={classes: 'bg-warning'};
        // }
        if(!row["btnid"])return {};
        if(row["btnid"].split("collapse_").length<1)return {};
        var tabid = "table_" + row["btnid"].split("collapse_")[1];
        if (parseInt(index) === parseInt(cell_start_index[tabid])) {
            //style={css:{'background-color':'#ed5565'}};
            style={classes: 'bg-warning'};
        }
        //style={css:{'background-color':'#ed5565'}};
        //style={ classes:'bg-warning'};
        return style;
    }
    //初始化页面上的事件
    function initPageEvent(params) {
        var select_cell_index = 0;// 选中的行号
        
        //选中一行
        $(`.table`).on('click-row.bs.table', function (event, row, $ele, dfield) {
            $ele = $("#right_tips_div");
            $ele.children("p").html(dfield);
            rightTips(row.eventid, dfield);
        });
        //选中一行
        $(`.table`).on('check.bs.table', function (table, row, target) {
            // ...
            select_cell_index = parseInt(target[0].dataset["index"]);
            //点击次数清零
            cell_click_times = 0;
            //alert(target[0].dataset["index"]);
        });
        //取消一行
        $(`.table`).on('uncheck.bs.table', function (table, row, target) {
            // ...
            select_cell_index = null;
            //alert(target[0].dataset["index"]);
        });
         //添加按钮
        $(".table-row-add").click(function (params, a, b, c) {

            var tabid = params.target.parentElement.parentElement.getAttribute('tableid');
            console.log(tabid);
            var tab =  $(`#${tabid}`).bootstrapTable('getOptions');
            var select_items = $.map($(`#${tabid}`).bootstrapTable('getSelections'), function (row,a,b,c) {
                return row.id;
            })           
            var tab_show_length = tab.totalRows;
            //table每行cell模板
            function insertRow(index) {
                $(`#${tabid}`).bootstrapTable('insertRow',{"index":index, "row":{
                    "name": "描述",
                    "id": getuuid(),
                    "btnid": "collapse_" + tabid.split("table_")[1],
                    "selectormode": "1",
                    "selector": "#",
                    "eventid": "1",
                    //"params": null,
                    //"code": "",
                    //"order": 1
                }});
            }
            cell_click_times ++;
            if(select_items.length>0){
                cell_start_index[tabid] = select_cell_index + cell_click_times - 1;
                //cell_end_index = select_cell_index + cell_click_times;
                insertRow(select_cell_index);              
            }else{ 
                select_cell_index = 0;
                //cell_start_index[tabid] = tab_show_length - cell_click_times + 1;
                cell_start_index[tabid] = tab_show_length;
                //cell_end_index = tab_show_length + 1;
                insertRow(tab_show_length);             
            }
            

            //var tab_want_height = 300;
            var tab_height = $(`#${tabid}`).parents(".bootstrap-table").height();
            var toolbar_height = $(`#${tabid}`).parents(".bootstrap-table").height();
            
            if(tab_height&&tab_height >= tab_want_height){
                //$(`#${tabid}`).bootstrapTable('resetView',{height: tab_want_height});
                $(`#${tabid}`).bootstrapTable('resetView',{height:tab_want_height});
            }
            //傻了 知道tableid可以直接获取选中数量，未选中标记最后一行，选中标记前一行，不需要监控check.bs.table
            if(select_items.length > 0){
                //$(`#${tabid}`).bootstrapTable('scrollTo',{unit: 'rows', value: 1});
            }else{
                $(`#${tabid}`).bootstrapTable('scrollTo','bottom');
            }

        });
        //删除按钮
        $(".table-row-del").on('click', function (params, a, b, c) {

            var tabid = params.target.parentElement.parentElement.getAttribute('tableid');
            //var select_item = $(`#${tabid}`).bootstrapTable('getSelections');
            $table = $(`#${tabid}`);
            var select_item = $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id
            })
            
            if (select_item.length > 0) {
                // select_item.forEach(id => {
                //     deleteChromeStorage('event_list', 'id', id);    
                // });
                //deleteChromeStorage2('event_list', 'id', select_item);    
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: select_item
                })
                
                
            } else {
                alert("请选择");
            }
        });
        //保存按钮
        $(".table-row-save").on('click', function (params, a, b, c) {

            var tabid = params.target.parentElement.parentElement.getAttribute('tableid');
            $tabid = $(`#${tabid}`);
            var tabdata= $tabid.bootstrapTable('getData');
            if(!tabdata) return;
            //alert(tabid);
            saveTableData(tabid, tabdata);
        });
        // $('.collapse').collapse('show',function (params) {

        // }); shown.bs.collapse
        $('#accordion').on('shown.bs.collapse',function (e,b,c,d,e) {
            // do something…
            //效果不好
            setTableHeight();
        });

    }
    //右侧div提示内容
    function rightTips(eveid, data) {
        $ele = $("#right_tips_div");
        var list = selectChromeStorage2(click_event_tab, "children");
        list = getListByFiled(list, "value", parseInt(eveid));
        $ele.children("p").html(list[0].description);
        //$ele.html(list[0].description);
    }
    //保存表的数据根据每个按钮
    function saveTableData(tableid, data) {
        if(!data) return;
        collapseid = tableid.split("table_")[1];
        //空证明全删了，直接根据btnid清空表
        if (!data||data.length<1) {
            deleteChromeStorage2('event_list', 'btnid', [`collapse_${collapseid}`]);
            alert("保存成功！");
            return;
        }
        for(var i = 0; i < data.length; i++){
            data[i].box = false;
        	data[i].order = i;
            data[i].id.length<30&&(data[i].id = getuuid());// 之前是或逻辑 现在改成与
            data[i].btnid = `collapse_${collapseid}`;
        }
        updateChromeStorageByField('event_list', data, 'btnid');
        alert("保存成功！");
    }

    function queryChromeStorage2(key, callback = null) {

        //function query(){
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, function (result) {
                resolve(result[key]);
            });
        });
        //}

        // console.log(1);
        // var result = await query();
        // console.log("1111111111111111111111111111111111"+result);
        // console.log(2);
    }

    //获取唯一ID
    function getuuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}

