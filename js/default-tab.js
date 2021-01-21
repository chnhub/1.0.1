var default_tab = {
    "click_event_tab": [
        {
            "id": "group1",
            "text": "元素事件",
            "children": [
                {"value": 1, "text": "click", "func":"click", "description": "元素单击事件<br>(jquery:click)参数: <br>1. 无参数，调用jquery.trigger(\"click\")"},
                {"value": 2, "text": "double_click", "func":"dbclick", "description": "元素双击事件<br>(jquery:dbclick)参数: <br>1. 无参数，调用jquery.trigger(\"dbclick\")"},
                {"value": 3, "text": "input", "func":"val", "description": "元素赋值内容<br>(jquery:val)参数：<br>1. text: 元素需要替换文本内容"},
                {"value": 4, "text": "select", "func":"select", "description": "下拉框选择<br>(ele:select)参数：<br>1. text: 需要选择的文本内容或者select的value"},
                {"value": 5, "text": "set_frame", "func":"setframe", "description": "设置框架<br>(ele:setframe)参数: <br>1. 无参数"},
                {"value": 6, "text": "focus", "func":"focus", "description": "元素获取焦点<br>(jquery:focus)参数: <br>1. 与jqery.focus()方法参数一致"},
                {"value": 7, "text": "blur", "func":"blur", "description": "元素失去焦点<br>(jquery:blur)参数: <br>1. 与jqery.blur()方法参数一致"},
                {"value": 8, "text": "checkbox", "func":"checkbox", "description": "是否勾选checkbox<br>(ele:checkbox)参数: <br>1. bool: 默认为true，true为勾选，flase为不勾选"},
                {"value": 21, "text": "attr", "func":"attr", "description": "获取或设置元素属性<br>(jquery:attr)参数: <br>1. 与jqery.attr()方法参数一致"},
                {"value": 22, "text": "prop", "func":"prop", "description": "获取或设置元素属性<br>(jquery:prop)参数: <br>1. 与jqery.prop()方法参数一致"},
                {"value": 23, "text": "html", "func":"html", "description": "获取或设置元素内容<br>(jquery:html)参数: <br>1. 与jqery.html()方法参数一致"},
            ]
        },
        {
            "id": "group2",
            "text": "自定义事件",
            "children": [
                {"value": 1001, "text": "upload_img", "func":"uploadImg", "description": "上传图片<br>(ele:uploadImg)参数：<br>selector: 图片元素的选择器，为#时则仅上传图片<br>1. imgpath: 图片的url（可直接写stu与coa两张自带的图片，空则默认stu）<br>2. uploadpath:上传图片的url（不支持跨域）<br>3. prepath: 设置元素的图片url的前缀，空默认'../../../photos'<br>4. field: 返回数据中图片地址的字段，空默认为'path'，支持简单多级json'data.img.path'"},
                {"value": 1002, "text": "wait_time", "func":"sleep", "description": "强制等待或显示等待下个事件<br>(ele:sleep)参数：<br>1. number: 等待*秒后执行下个事件<br>------------<br>[number,number]必须有','<br>1. number: 在*秒中执行下个事件，执行成功立即停止等待（根据下个事件的元素是否定位到）<br>2. number-N: 每*毫秒执行一次"},
            ]
        },
        {
            "id": "group3",
            "text": "现成数据",
            "children": [
                {"value": 2001, "text": "get_name", "func":"getStuName", "description": "获取随机名字<br>(ele:getStuName)参数：<br>1. prename: 名字前缀，空默认为'测试'<br>- 返回:[前缀+市+4位伪随机数]，[市]获取页面标题截取省-市之间或市之前内容，未截取到则默认为空，伪随机数每秒一个"},
                {"value": 2002, "text": "get_idnum", "func":"getIDNum", "description": "获取随机身份证号<br>(ele:getIDNum)参数：<br>1. 无参数"},
                {"value": 2003, "text": "get_phone_number", "func":"getTelPhone", "description": "获取随机手机号<br>(ele:getTelPhone)参数：<br>1. prenumber: 手机号前缀，空默认为'136'<br>- 返回: [前缀+伪随机数]<br>伪随机数根据秒数生成，每秒一个"},
                {"value": 2100, "text": "get_random_number", "func":"getRDNum", "description": "获取随机数字<br>(ele:getRDNum)参数：<br>1. length: 随机数的长度<br>2. pre-N: 随机数前缀，默认空<br>3. suffix-N: 随机数后缀，默认空<br>- 返回: [前缀+随机数+后缀]"},
            ]
        }
    ],
    "selector_mode": [
        {
            "value": "1", "text": "jquery", "order": 1
        },
        {
            "value": "2", "text": "xpath", "func":"", "order": 2
        }
    ],
    "btnmenu": [
        {
            "id": "1", "name": "生成学员信息", "order": 1
        },
        {
            "id": "2", "name": "生成教练信息", "order": 2
        },
        {
            "id": "3", "name": "生成驾校信息", "order": 3
        },
        {
            "id": "4", "name": "生成车辆信息", "order": 4
        },
        {
            "id": "5", "name": "生成考核员信息", "order": 5
        },
        {
            "id": "6", "name": "生成安全员信息", "order": 6
        }

    ],
    "event_list": [
        {
            box: false,
            btnid: "collapse_1",
            eventid: "5",
            id: "45bba13c-4101-4183-b973-69b8378a3707",
            name: "切换至学员iframe",
            order: 0,
            selector: "iframe[src*='dfo/biz_web/stu/Studentinfo.do']",
            selectormode: "1",
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "2001",
            id: "d8b45175-c0e7-4b80-bf96-e2c6f897d3e0",
            name: "输入随机名字",
            order: 1,
            selector: "#eStudentName",
            selectormode: "1",
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "2002",
            id: "44a2ebcc-41ec-4954-a983-05293ddeaf5e",
            name: "输入随机身份证号",
            order: 2,
            selector: "#eIDNum,#eIDNum2",
            selectormode: "1",
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "2003",
            id: "e967cf59-7f34-45a3-87c6-5a482b6e1edf",
            name: "输入随机手机号",
            order: 3,
            params: "136",
            selector: "#eTelphoneNum",
            selectormode: "1",
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "3",
            id: "4ce24841-cb80-480f-a35d-011b037e5d80",
            name: "输入联系地址",
            order: 4,
            params: "测试地址",
            selector: "#eAddress",
            selectormode: "1",
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "1",
            id: "f9e66b19-2e97-43fa-be21-3f5d47329a54",
            name: "点击展开学员类型列表",
            order: 5,
            selector: "input[name='studenttype']",
            selectormode: "1"
        },{
            box: false,
            btnid: "collapse_1",
            eventid: "1",
            id: "6b313e65-1376-4cda-a7a4-66f1cbbb8b68",
            name: "选中初驾学员",
            order: 6,
            selector: `//div[contains(@class, "x-combo-list-item") and contains(text(), "初驾学员")]`,
            selectormode: "2",
        },{
            "box": false,
            "btnid": "collapse_2",
            "eventid": "5",
            "id": "b8480c01-5069-4e0e-aae7-fbd36e7dd4ec",
            "name": "描述",
            "order": 0,
            "selector": `iframe[id*="iframeResult"]`,
            "selectormode": "1",
        },{
            box: false,
            btnid: "collapse_2",
            eventid: "4",
            id: "b9f86cb2-0e6f-4efc-a3a1-c2dbf8152783",
            name: "描述",
            order: 1,
            params: "fiat",
            selector: "/html/body/form/select",
            selectormode: "2"
        },

    ],
    "event_list_mode": [
        {
            "name": "描述",
            "id": "1",
            "btnid": "1",
            "selectormode": "1",
            "selector": "#id",
            "eventid": "1",
            "params": "",
            "code": "",
            "order": 1
        }
    ]
};