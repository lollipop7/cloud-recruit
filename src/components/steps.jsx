import React, {Component} from 'react';
import Steps,{Step} from 'rc-steps';

// lodash
import find from 'lodash/find';
import forIn from 'lodash/forIn';
import omitBy from 'lodash/omitBy';


const steps = [
    {
        status: 'wait',
        title: '申请职位',
        icon: 1
    }, 
    {
        status: 'wait',
        title: '预约',
        icon: 2
    }, 
    {
        status: 'wait',
        title: '面试',
        icon: 3
    },
    {
        status: 'wait',
        title: '复试',
        icon: 4
    },
    {
        status: 'wait',
        title: 'offer',
        icon: 5
    },
    {
        status: 'wait',
        title: '入职',
        icon: 6
    },
    {
        status: 'wait',
        title: '结束',
        icon: 7
    }
]

export default class StepsComponent extends Component {

    steps = [
        {
            status: 'wait',
            title: '申请职位',
            icon: 1
        }, 
        {
            status: 'wait',
            title: '预约',
            icon: 2
        }, 
        {
            status: 'wait',
            title: '面试',
            icon: 3
        },
        {
            status: 'wait',
            title: '复试',
            icon: 4
        },
        {
            status: 'wait',
            title: 'offer',
            icon: 5
        },
        {
            status: 'wait',
            title: '入职',
            icon: 6
        },
        {
            status: 'wait',
            title: '结束',
            icon: 7
        }
    ]

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.stagesMap !== nextProps.stagesMap;
    }

    render() {
        const {stagesMap} = this.props;
        if(stagesMap){
            const currentStage = find(stagesMap,item=>{
                return item.iscurrentstage === '1';
            })
            let filterStageMap = omitBy(stagesMap,item=>{
                return item.iscurrentstage !== '0';
            });
            forIn(stagesMap,item=>{
                this.steps[item.stageid-1].status = 'finish';
            });
            this.steps[currentStage.stageid-1].status = 'process';
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
                        this.steps.map((s, i) => {
                            return (
                                <Step
                                    key={i}
                                    status={s.status}
                                    title={s.title}
                                    icon={s.icon ? s.icon : null}
                                />
                            );
                        })
                    }
                </Steps>
            </div>
        );
    }
}