import React , {Component}from 'react';
import { Progress } from 'antd';

export default class ProgressComponent extends Component{
    state = {

    };

    render() {
        return (
            <div className="archives-progress">
                <div className="left-progress">
                    <div className="left-progress-archives">
                        <span 
                            style={{display:'block',marginBottom:5}} 
                        >
                            在职人员存档情况：
                        </span>
                        <Progress style={{color:'#f68f6b'}} percent={30} strokeWidth={25} />
                        <div style={{marginTop:5,color:'#1587c7'}}>
                            <span>当前员工数：15</span>&nbsp;&nbsp;
                            <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                            <span>已完整存档：5</span>
                        </div>  
                    </div>
                    <div className="left-progress-information">
                        <span style={{display:'block',marginBottom:5}}>在职人员信息完整率：</span>
                        <Progress style={{color:'#6b88f6'}}  percent={50} strokeWidth={25}  />
                    </div>  
                </div>
                <div className="right-progress">
                        <span 
                            style={{display:'block',marginBottom:5}}
                        >
                            离职人员存档情况：
                        </span>
                        <Progress style={{color: '#f6cd6b'}} percent={70} strokeWidth={25}  />
                        <div style={{marginTop:5,color:'#1587c7'}}>
                            <span>离职员工数：15</span>&nbsp;&nbsp;
                            <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                            <span>已完整存档：5</span>
                        </div>  
                </div>
            </div>
        )
    }
}