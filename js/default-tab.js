var default_tab = {
    "click_event_tab": [
        {
            "id": "group1",
            "text": "元素事件",
            "children": [
                {"value": 1, "text": "click", "func":"click", "description": ""},
                {"value": 2, "text": "double_click", "func":"dbclick", "description": ""},
                {"value": 3, "text": "input", "func":"val", "description": ""},
                {"value": 4, "text": "select", "func":"select", "description": ""},
                {"value": 5, "text": "set_frame", "func":"setframe", "description": ""},
                {"value": 6, "text": "focus", "func":"focus", "description": ""},
                {"value": 7, "text": "blur", "func":"blur", "description": ""},
                {"value": 8, "text": "checkbox", "func":"checkbox", "description": ""},
                {"value": 21, "text": "attr", "func":"attr", "description": ""},
                {"value": 22, "text": "prop", "func":"prop", "description": ""},
            ]
        },
        {
            "id": "group2",
            "text": "自定义事件",
            "children": [
                {"value": 1001, "text": "upload_img", "func":"uploadImg", "description": ""},
                {"value": 1002, "text": "wait_time", "func":"sleep", "description": ""},
            ]
        },
        {
            "id": "group3",
            "text": "现成数据",
            "children": [
                {"value": 2001, "text": "get_name", "func":"getStuName", "description": ""},
                {"value": 2002, "text": "get_idnum", "func":"getIDNum", "description": ""},
                {"value": 2003, "text": "get_phone_number", "func":"getTelPhone", "description": ""},
                {"value": 2100, "text": "get_random_number", "func":"getRDNum", "description": ""},
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