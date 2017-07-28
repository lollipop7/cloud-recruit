import React, { Component } from 'react';

import { Button, Tag } from 'antd';

import hotJobData from 'data/create-job/hot-job'; 
import recentJobData from 'data/create-job/recent-job'; 

export default class TopComponent extends Component {
    
    render() {
        return(
            <ul>
                <li className="hot-job"> 
                    <div className="inline-block back-btn">
                        <Button>&lt;&nbsp;返回</Button>
                    </div>
                    <div className="inline-block hot-job-list">
                        <span>热招职位：</span>
                        {
                            hotJobData.map((item,index) => {
                                return (
                                    <div className="inline-block" key={index}>
                                        <span className="hot-job-item">{item}</span>
                                        { index === hotJobData.length-1 ? "" : <b>|</b> }
                                    </div>
                                )
                            })
                        }
                    </div>
                </li>
                <li className="recent-job">
                    <span>最近发布职位：</span>
                    {
                        recentJobData.map((item,index) => {
                            const isLongTag = item.length > 20;
                            return (
                                <Tag
                                    key = {index}
                                    closable>
                                    {isLongTag ? `${item.slice(0,20)}...` : item}
                                </Tag>
                            )
                        })
                    }
                </li>
            </ul>
        )
    }
}