import React, {Component} from 'react';

import data from 'data/entry-person';

export default class EntryPersonComponent extends Component {
    render() {
        return (
            <div className="entry-person box-border">
                <div className="title">待入职人员</div>
                <table className="layui-table">
                    <thead>
                        <tr>
                        <th>人员姓名</th>
                        <th>应聘岗位</th>
                        <th>入职时间</th>
                        <th>电话</th>
                        <th>资料情况</th>
                        <th>确认入职</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            data.map((item,index)=>{
                                const {name,jobname,time,tel,complete,entry} = item;
                                return (
                                    <tr key={index}>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {jobname}
                                        </td>
                                        <td>
                                            {time}
                                        </td>
                                        <td>
                                            {tel}
                                        </td>
                                        <td>
                                            {
                                                parseInt((Math.random()*10)) % 2 == 0 ? 
                                                <span className="ellipse-button perfect">已完善</span>
                                                :
                                                <span className="ellipse-button">未完善</span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                parseInt((Math.random()*10)) % 2 == 0 ? 
                                                <span className="ellipse-button complete">已确认</span>
                                                :
                                                <span className="ellipse-button">未确认</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="space"></tr>
                    </tbody>
                </table> 
            </div>
        );
    }
}