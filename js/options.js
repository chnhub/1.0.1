
{
    var click_event_tab = null;
    var selector_mode = null;

    var collapse_json = { data: [{ "id": "1", "name": "生成学员信息" }, { "id": "2", "name": "生成教练信息" }] };
    $('#accordion').on('show.bs.collapse', this, function (e) {
        // do something…

    });
    (async function auto() {
        click_event_tab = await queryChromeStorage2("click_event_tab");
        console.log(click_event_tab);
        console.log(1);
        selector_mode = await queryChromeStorage2("selector_mode");
        console.log(2);
        initOptions();
        console.log(3);
    })();

    function initOptions() {
        initCollapse("#accordion", collapse_json.data);
    }
    // $(".card>div>a").click(this,function(e){
    // 	alert(this.innerText);
    // });
    //设置editable 弹出模式
    //$.fn.editable.defaults.mode = 'inline';

    function initCollapse(selector, params) {
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
    function getTable(obj) {
        var table = `<div class="table-responsive">
			<table id = "table_${obj.id}" class="table table-hover>
				<thead class="thead-light">
				</thead>
			</table>
				<div class="toolbar d-flex"  tableid='table_${obj.id}'>
					<div class="btn-group btn-group-sm p-1" role="group" aria-label="left-group">
						<button class="btn btn-secondary table-row-add">添加</button>
						<button class="btn btn-light table-row-del">删除</button>
						
					</div>
					<div class="btn-group btn-group-sm ml-auto p-1" role="group" aria-label="right-group">
						<button class="btn btn-secondary table-row-save">保存</button>
					</div>

				</div>
			</div>`;
        return table;
    }
    function initTable(obj) {
        var data = [{ "code": "1001", "id": "event_1", "selector": "#button", "event": "1", "params": "", "order": "test" }, { "code": "1002", "id": "event_2", "selector": "#btn2", "event": "2", }];
        $(`#table_${obj.id}`).bootstrapTable({
            //dataField: "data", // 接收数据json的默认键
            data: data,
            //pagination: false,
            //editable: true,
            clickToSelect: true,
            //toolbar: ".toolbar",
            columns: [{
                checkbox: true
            }, {
                width: 10,
                field: "index",
                title: "#",
                align: "center",
                formatter: function (value, row, index) {
                    return index;
                }
            }, {
                width: 100,
                field: "id",
                title: "ID",
                align: "center",
                editable: {
                    type: 'text',
                    title: '年龄',
                    validate: function (v) {
                        if (!v) return '不能为空';
                    }
                }
            }, {
                width: 200,
                field: "selectormode",
                title: "SelectorMode",
                align: "center",

            }, {
                width: 400,
                field: "selector",
                title: "Selector",
                align: "center",

            }, {
                width: 100,
                field: "event",
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
                    pk: 1,
                    source: function () {
                        return click_event_tab;
                    },
                    //success: function(response, newValue) {  return true;}
                }

            }, {
                field: "params",
                title: "Params",
                align: "center",

            }, {
                field: "order",
                title: "Order",
                align: "center",

            }, {
                field: "order",
                title: "Order",
                align: "center",
                editable: {
                    type: 'text',
                    title: '年龄',
                },
            }],
            onEditableSave: function (field, row, oldValue, $el, a, b) {
                alert(row.code);

            },
        });
    }
    //添加按钮
    $(".table-row-add").click(function (params, a, b, c) {
        var tabid = params.target.parentElement.parentElement.getAttribute('tableid');
        console.log($(params.target).attr('tableid'));

    });
    //删除按钮
    $(".table-row-del").click(function (params, a, b, c) {

        var a = params.target.parentElement.parentElement.getAttribute('tableid');
        var b = $(`#${a}`).bootstrapTable('getSelections');
        if (b) {
            b.forEach(ele => {
                alert(ele.id);
            });

        } else {
            alert("请选择");
        }


    });


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
}