import React, {Component} from 'react';
import moment from 'moment';
import { Input, Radio, Tooltip } from 'antd';
const RadioGroup = Radio.Group;
import TimeComponent from 'components/time';


export default class OtherInfoComponent extends Component {

    state = {
        // workType: 1,
        isurgent: false,//是否紧急
        isintelligent:false,//是否智能匹配
        starttime:'',//开始时间
        endtime:'',//结束时间
    }

    onChange = (field,e) => {
        this.setState({
            [field]: e.target.value,
        });
    }
    onChangeIntelligent = () => {
        this.setState({
            isintelligent:!this.state.isintelligent
        });
    }

    resetForm() {
        const {onStartChange,onEndChange} = this.refs.TimeComponent;
        this.setState({
            isurgent: false,
            isintelligent:false,
        });
        onStartChange(null);
        onEndChange(null);
    }

    onTimeChange=(field,value)=> {
        this.setState({
            [field]: value ? moment(value).format('YYYY-MM-DD')+' 00:00:00' : ''
        });
    }

    getFormData = () => {
        const { starttime , endtime , isurgent , isintelligent } = this.state;
        const {handleStartOpen,handleEndOpenChange} = this.refs.TimeComponent;
        if(starttime === ''){
            handleStartOpen(true);
            return false;
        }
        if(endtime === ''){
            handleEndOpenChange(true);
            return false;
        }
        return {...this.state}
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
             const {
                urgent,//是否紧急
                intelligent,//是否智能匹配
                starttime,//开始时间
                endtime,//结束时间
            } = this.props.data;
            this.setState({
                isurgent:urgent,//是否紧急
                isintelligent:intelligent,//是否智能匹配
                starttime:moment(starttime).format("YYYY-MM-DD 00:00:00"),//开始时间
                endtime:moment(endtime).format("YYYY-MM-DD 00:00:00"),//结束时间
          
            })
        })
    };

    render() {
        // workType 工作类型
        // workDuty 工作职责
        // dicatate 工作资格
        // isUrgent 是否紧急
        const {
            isurgent , 
            isintelligent,
            starttime=null ,
            endtime=null,
        } = this.state;
        return (
            <li className="other-info">
                <h2 className="title">
                    其他信息
                </h2>
                <ul>

                    <li>
                        <TimeComponent 
                            showField={true} 
                            style={{width:185}}
                            onChange={this.onTimeChange}
                            ref="TimeComponent"
                            starttime = {starttime}
                            endtime = {endtime}
                        />
                    </li>
                    <li>
                        <span>是否紧急：</span>
                        <RadioGroup onChange={this.onChange.bind(this,'isurgent')} value={isurgent}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </RadioGroup>
                    </li>
                    <li>
                        <div className="inline-block">
                            <Radio 
                                onChange={this.onChangeIntelligent} 
                                checked={isintelligent}
                            >
                                智能筛选投递该职位的简历
                            </Radio>
                            <Tooltip    overlayClassName="help-tooltip"
                                        placement="right" 
                                        title={"通过工作年限、学历、年龄智能筛选投递到该职位的简历，匹配度低的简历转入人才库被过滤的人才分类。"}>
                                <i className="help-icon"></i>
                            </Tooltip>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}