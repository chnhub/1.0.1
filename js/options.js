
{
    //表数据
    var click_event_tab = null;
    var selector_mode = null;
    var event_list = null;
    var btnmenu_tab = null;
    // 插入的行，变色需要
    var cell_start_index = null;
    var cell_end_index = null;
    var cell_click_times = 0;
    // 选中cell的index
    var cell_select_position = {};


    var collapse_json = { data: [{ "id": "1", "name": "生成学员信息" }, { "id": "2", "name": "生成教练信息" }] };
    $('#accordion').on('show.bs.collapse', this, function (e) {
        // do something…

    });
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
     * 
     * @param {"初始化collapse的参数对象"} obj selector:collapse的选择器，id:collapse的id，name:collapse的name，
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
    function getTable(obj) {//<div class="table-responsive">
        var table = `
			<table id = "table_${obj.id}" class="table text-nowrap">
			</table>
            
            <div id="toolbar_${obj.id}" class="toolbar d-flex"  tableid='table_${obj.id}'>
					<div class="btn-group btn-group-sm p-1" role="group" aria-label="left-group">
						<button class="btn btn-secondary table-row-add">添加</button>
						<button class="btn btn-light table-row-del">删除</button>
						
					</div>
					<div class="btn-group btn-group-sm ml-auto p-1" role="group" aria-label="right-group">
						<button class="btn btn-secondary table-row-save">保存</button>
					</div>

            </div>
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
    function initTable(obj) {
        var data = [];
        data = getListByFiled(event_list, 'btnid', `collapse_${obj.id}`);
        $(`#table_${obj.id}`).bootstrapTable({
            //dataField: "data", // 接收数据json的默认键
            data: data,
            //pagination: false,
            //editable: true,
            clickToSelect: true,
            //height: 300,
            toolbar: `#toolbar_${obj.id}`,
            rowStyle: setRowStyle,
            columns: [{
                width: 38,
                field: "box",
                align: "center",
                checkbox: true
            }, {
                width: 30,
                field: "index",
                title: "#",
                align: "center",
                formatter: function (value, row, index) {
                    return index+1;
                }
            }, {
                width: 100,
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
                width: 200,
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
                width: 400,
                field: "selector",
                title: "Selector",
                align: "center",

            }, {
                width: 500,
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
                width: 150,
                field: "params",
                title: "Params",
                align: "center",

            }, {
                width: 150,
                field: "order",
                title: "Order",
                align: "center",

            }, {
                width: 150,
                field: "order",
                title: "Order",
                align: "center",
                editable: {
                    type: 'text',
                    title: '年龄',
                },
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
        //$(`#table_${obj.id}`).bootstrapTable("resetWidth");

    }
    function setRowStyle(row, index) {
        var style = {};
        if (typeof(cell_start_index)==="number"&&typeof(cell_end_index)==="number"&&index >= cell_start_index &&index < cell_end_index ) {
            //style={css:{'background-color':'#ed5565'}};
            style={classes: 'bg-warning'};
        }
        //style={css:{'background-color':'#ed5565'}};
        //style={ classes:'bg-warning'};
        return {};
    }
    function initPageEvent(params) {
        var select_cell_index = 0;// 选中的行号
        //选中一行
        $(`.table`).on('check.bs.table', function (table, row, target) {
            // ...
            select_cell_index = parseInt(target[0].dataset["index"]);
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
            var tabcell_selected = $.map($(`#${tabid}`).bootstrapTable('getSelections'), function (row,a,b,c) {
                return row.id;
            })           
            var tab_show_length = tab.totalRows;
            //插入一行
            function insertRow(index) {
                $(`#${tabid}`).bootstrapTable('insertRow',{"index":index, "row":{
                    "name": "描述",
                    "id": getuuid(),
                    "btnid": tabid.split("table_")[1],
                    "selectormode": "2",
                    "selector": "#id",
                    //"eventid": "1",
                    //"params": null,
                    "code": "",
                    "order": 1
                }});
            }
            cell_click_times ++;
            if(tabcell_selected.length>0){
                //cell_start_index = select_cell_index ;
                //cell_end_index = select_cell_index + cell_click_times;
                insertRow(select_cell_index);              
            }else{ 
                //cell_start_index = tab_show_length - cell_click_times + 1;
                //cell_end_index = tab_show_length + 1;
                insertRow(tab_show_length);             
            }
            

            var tab_want_height = 300;
            var tab_height = $(`#${tabid}`).parents(".bootstrap-table").height();
            if(tab_height&&tab_height >= tab_want_height){
                $(`#${tabid}`).bootstrapTable('resetView',{height: tab_want_height});
                
                if(select_cell_index){
                    //$(`#${tabid}`).bootstrapTable('scrollTo',{unit: 'rows', value: 1});
                }else{
                    $(`#${tabid}`).bootstrapTable('scrollTo','bottom');
                }

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
    }

    function saveTableData(tableid, data) {
        if(!data) return;
        collapseid = tableid.split("table_")[1];
        if (!data||data.length<1) {
            deleteChromeStorage2('event_list', 'btnid', [`collapse_${collapseid}`]);
            return;
        }
        for(var i = 0; i < data.length; i++){
            data[i].box = false;
        	data[i].order = i;
            data[i].id.length<30||(data[i].id = getuuid());
        	data[i].btnid = `collapse_${collapseid}`;
        }
        updateChromeStorageByField('event_list', data, 'btnid');
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