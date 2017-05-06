import React from 'react';

const totalRow = 9;

const rednerContent = (text,record,index) => {
    const obj = {
        children: text,
        props: {}
    }
    if(index === (totalRow - 1)){
        obj.props.colSpan = 0;
    }
    return obj;
}

module.exports = [
    {
        "title": "所属机构",
        "dataIndex": "organization",
        "key": "organization",
        "width": 95,
        "render": (text,record,index) => {
            const obj = {
                children: text,
                props: {
                    rowSpan: 0
                }
            }
            if(index === 0){
                obj.props.rowSpan = totalRow;
            }
            return obj;
        }
    },
    {
        "title": "姓名",
        "dataIndex": "name",
        "key": "name",
        "width": 65,
        "render": rednerContent
    },
    {
        "title": "登陆次数",
        "dataIndex": "loginnum", 
        "key": "loginnum",
        "width": 79,
        "render": rednerContent
    },
    {
        "title": "简历总数",
        "dataIndex": "resumenum",
        "key": "resumenum",
        "width": 79,
        "render": rednerContent
    },
    {
        "title": "简历导入量(51job)",
        "dataIndex": "51job",
        "key": "51job",
        "width": 137,
        "render": rednerContent
    },
    {
        "title": "简历导入量(智联)",
        "dataIndex": "zhilian",
        "key": "zhilian",
        "width": 130,
        "render": rednerContent
    },
    {
        "title": "关注职位数",
        "dataIndex": "focus",
        "key": "focus",
        "width": 92,
        "render": rednerContent
    },
    {
        "title": "待处理申请者",
        "dataIndex": "pending",
        "key": "pending",
        "width": 105,
        "render": rednerContent
    },
    {
        "title": "申请",
        "dataIndex": "cnt",
        "key": "cnt",
        "width": 65,
        "render": rednerContent
    },
    {
        "title": "预约",
        "dataIndex": "subscribe",
        "key": "subscribe",
        "width": 61,
        "render": rednerContent
    },
    {
        "title": "面试",
        "dataIndex": "interview",
        "key": "interview",
        "width": 61,
        "render": rednerContent
    },
    {
        "title": "复试",
        "dataIndex": "sinterview",
        "key": "sinterview",
        "width": 61,
        "render": rednerContent
    },
    {
        "title": "入职",
        "dataIndex": "induction",
        "key": "induction",
        "width": 61,
        "render": rednerContent
    },
    {
        "title": "已处理",
        "dataIndex": "complete",
        "key": "complete",
        "render": (text,record,index) => {
            const obj = {
                children: text,
                props: {}
            }
            if(index === (totalRow - 1)){
                obj.props.colSpan = 13;
            }
            return obj;
        }
    }
]