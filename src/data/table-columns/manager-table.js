import React from 'react';

import moment from 'moment';

const renderWithATag = (text,record,index) => {
    return <a href="javascript:;" title={text}>{text}</a>;
}

module.exports = [
    {
        "title": "人员姓名",
        "dataIndex": "name",
        "key": "name",
        "width": 97
    },
    {
        "title": "工号",
        "dataIndex": "worknumber",
        "key": "worknumber",
        "width": 93
    },
    {
        "title": "部门",
        "dataIndex": "department", 
        "key": "department",
        "width": 115,
        render: renderWithATag
    },
    {
        "title": "职位",
        "dataIndex": "position",
        "key": "position",
        "width": 135,
        render: renderWithATag
    },
    {
        "title": "手机",
        "dataIndex": "mobile",
        "key": "mobile",
        "width": 119
    },
    {
        "title": "工作邮箱",
        "dataIndex": "workemail",
        "key": "workemail",
        "width": 142,
        render: renderWithATag
    },
    {
        "title": "入职时间",
        "dataIndex": "inthetime",
        "key": "inthetime",
        "width": 121
    },
    {
        "title": "工作状态",
        "dataIndex": "workstatus",
        "key": "workstatus",
        "width": 102
    },
    {
        "title": "工作性质",
        "dataIndex": "worknature",
        "key": "worknature"
    }
]