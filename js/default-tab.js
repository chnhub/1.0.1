var default_tab = {
    "click_event_tab": [
        {
            "id": "group1",
            "text": "元素事件",
            "children": [
                {"value": 1, "text": "click", "description": ""},
                {"value": 2, "text": "double_click", "description": ""},
                {"value": 3, "text": "input", "description": ""},
                {"value": 3, "text": "select", "description": ""},
            ]
        },
        {
            "id": "group2",
            "text": "自定义事件",
            "children": [
                {"value": 1001, "text": "upload_img", "description": ""},
                {"value": 1002, "text": "wait_time", "description": ""},
            ]
        },
        {
            "id": "group3",
            "text": "现成数据",
            "children": [
                {"value": 2001, "text": "get_random_number", "description": ""},
                {"value": 2002, "text": "get_idnum", "description": ""},
                {"value": 2003, "text": "get_phone_number", "description": ""},
                {"value": 2004, "text": "upload_img", "description": ""},
            ]
        }
    ],
    "selector_mode": [
        {
            "value": "1", "text": "jquery", "order": 1
        },
        {
            "value": "2", "text": "xpath", "order": 2
        }
    ],
    "btnmenu": [
        {
            "id": "1", "name": "生成学员信息", "order": 1
        },
        {
            "id": "2", "name": "生成教练信息", "order": 2
        }
    ],
    "event_list": [
        {
            "name": "事件1",
            "id": "1",
            "btnid": "1",
            "selectormode": "1",
            "selector": "#id",
            "eventid": "1",
            "params": "",
            "code": "",
            "order": 1
        },
        {
            "name": "事件2",
            "id": "2",
            "btnid": "1",
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