import React, {Component} from 'react';
import Steps,{Step} from 'rc-steps';
import { Tooltip } from 'antd';
import moment from 'moment'

// lodash
import find from 'lodash/find';
import forIn from 'lodash/forIn';
import omitBy from 'lodash/omitBy';

export default class StepsComponent extends Component {

    steps = [
        {
            status: 'wait',
            title: '申请职位',
            icon: 1,
            time:""
        }, 
        {
            status: 'wait',
            title: '预约',
            icon: 2,
            time:""
        }, 
        {
            status: 'wait',
            title: '面试',
            icon: 3,
            time:""
        },
        {
            status: 'wait',
            title: '复试',
            icon: 4,
            time:""
        },
        {
            status: 'wait',
            title: 'offer',
            icon: 5,
            time:""
        },
        {
            status: 'wait',
            title: '待入职',
            icon: 6,
            time:""
        },
        {
            status: 'wait',
            title: '结束',
            icon: 7,
            time:""
        }
    ]
   
    render() {
        let stagesMapArr = []
        let steps = JSON.parse(JSON.stringify(this.steps));
        const {stagesMap} = this.props;
        if(stagesMap){
            const currentStage = find(stagesMap,item=>{
                return item.iscurrentstage === '1';
            })
            let filterStageMap = omitBy(stagesMap,item=>{
                return item.iscurrentstage !== '0';
            });
            for (let item in stagesMap){
                stagesMapArr.push(stagesMap[item])
            }  
            forIn(stagesMap,item=>{
                steps[item.stageid-1].status = 'finish';
                //  steps[item.stageid-1].time = stagesMapArr[item.stageid-1].eventtime ? moment(stagesMapArr[item.stageid-1].eventtime).format('YYYY-MM-DD, hh:mm:ss') : stagesMapArr[item.stageid-1].deliverytime;
                 //console.log(steps[item.stageid-1].time,'000',stagesMapArr[item.stageid-1])
            });
            steps[currentStage.stageid-1].status = 'process';  
            for (let i=0;i<stagesMapArr.length;i++){
                if (stagesMapArr[i].stageid==steps[i].icon){
                    steps[i].time=stagesMapArr[i].eventtime ? stagesMapArr[i].eventtime : stagesMapArr[i].deliverytime
                }
            } 
        }
        return (
            <div className="steps noprint" style={{
                position: 'absolute',
                width: 608,
                right: -41,
                bottom: 0
            }}>
                <Steps current={1} labelPlacement="vertical">
                    {
                        steps.map((s, i) => {
                                return (                          
                                    <Step
                                        key={i}
                                        status={s.status}
                                        title={s.title}
                                        icon={<Tooltip 
                                                title={
                                                    <div>
                                                        <p>{s.time?'时间：'+ s.time : "" }</p> 
                                                        <span>状态：{s.status}</span>
                                                    </div>
                                                    }
                                            >
                                            <span>{s.icon ? s.icon : null}</span>
                                        </Tooltip>}
                                    >            
                                    </Step>
                                );
                        })
                    }
                </Steps>
            </div>
        );
    }
}