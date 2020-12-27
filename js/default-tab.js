var default_tab = {
    "click_event_tab": [
        {
            "id": "group1",
            "text": "元素事件",
            "children": [
                {"value": 1, "text": "click", "func":"click", "description": ""},
                {"value": 2, "text": "double_click", "func":"dbclick", "description": ""},
                {"value": 3, "text": "input", "func":"val", "description": ""},
                {"value": 4, "text": "select", "func":"", "description": ""},
            ]
        },
        {
            "id": "group2",
            "text": "自定义事件",
            "children": [
                {"value": 1001, "text": "upload_img", "func":"", "description": ""},
                {"value": 1002, "text": "wait_time", "func":"", "description": ""},
            ]
        },
        {
            "id": "group3",
            "text": "现成数据",
            "children": [
                {"value": 2001, "text": "get_random_number", "func":"", "description": ""},
                {"value": 2002, "text": "get_idnum", "func":"", "description": ""},
                {"value": 2003, "text": "get_phone_number", "func":"", "description": ""},
                {"value": 2004, "text": "upload_img", "func":"", "description": ""},
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
            "id": "3", "name": "生成车辆信息", "order": 3
        }
    ],
    "event_list": [
        {
            "name": "事件1",
            "id": "1",
            "btnid": "collapse_1",
            "selectormode": "1",
            "selector": "#id",
            "eventid": "1",
            "params": "",
            "code": "",
            "order": 1
        },
        {
            "name": "事件2",
            "id": "1",
            "btnid": "collapse_1",
            "selectormode": "2",
            "selector": "#id",
            "eventid": "1",
            "params": "",
            "code": "",
            "order": 1
        }
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