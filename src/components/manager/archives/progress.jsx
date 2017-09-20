import React , {Component}from 'react';
import { Progress } from 'antd';
import { Table , Select , Button } from 'antd';
import archivesData from 'data/select/archives';
import archivesLeave from 'data/select/archivesLeave'

export default class ProgressComponent extends Component{
    state = {
        leftStyleState:'block',
        rightStyleState:'none',
        leftStyleColor:'#1587c7',
        rightStyleColor:''
    };
    handleClick = (value) => {
        switch(value)
            {
            case '1':
                this.setState({
                    leftStyleState:'block',
                    rightStyleState:'none',
                    leftStyleColor:'#1587c7',
                    rightStyleColor:''
                });
                break;
            case '2':
                this.setState({
                    leftStyleState:'none',
                    rightStyleState:'block',
                    leftStyleColor:'',
                    rightStyleColor:'#1587c7'
                });
                break;
            default:
                break
            }
    }

    render() {
       const {departure , info , leaveCount , material , resumeCount} = this.props.archivesData,
            {leftStyleState , rightStyleState , leftStyleColor , rightStyleColor} = this.state;
       const PercentageResume = ((material/resumeCount)*100).toFixed(2);
       const PercentageLeave = ((departure/leaveCount)*100).toFixed(2);
        return (
            <div>
                <div className="archives-progress">
                    <div 
                        className="left-progress" 
                        style={{borderColor:leftStyleColor}}
                        onClick={this.handleClick.bind(this,'1')}
                    >
                        <div className="left-progress-archives">
                            <span 
                                style={{display:'block',marginBottom:5}} 
                            >
                                在职人员存档情况：
                            </span>
                            <Progress style={{color:'#f68f6b'}} percent={PercentageResume} strokeWidth={25} />
                            <div style={{marginTop:5,color:'#1587c7'}}>
                                <span>当前员工数：{resumeCount}</span>&nbsp;&nbsp;
                                <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                                <span>已完整存档：{material}</span>
                            </div>  
                        </div>
                        <div className="left-progress-information">
                            <span style={{display:'block',marginBottom:5}}>在职人员信息完整率：</span>
                            <Progress style={{color:'#6b88f6'}}  percent={info} strokeWidth={25}  />
                        </div>
                        <div 
                            className="left-triangle"
                            style={{display:leftStyleState}}
                        >
                        </div>  
                    </div>
                    <div 
                        className="right-progress" 
                        style={{borderColor:rightStyleColor}}
                        onClick={this.handleClick.bind(this,'2')}
                    >
                            <span 
                                style={{display:'block',marginBottom:5}}
                            >
                                离职人员存档情况：
                            </span>
                            <Progress style={{color: '#f6cd6b'}} percent={PercentageLeave} strokeWidth={25}  />
                            <div style={{marginTop:5,color:'#1587c7'}}>
                                <span>离职员工数：{leaveCount}</span>&nbsp;&nbsp;
                                <span style={{color:'#979797'}}>|</span>&nbsp;&nbsp;
                                <span>已完整存档：{departure}</span>
                            </div>
                            <div 
                                className="right-triangle"
                                style={{display:rightStyleState}}
                            >
                            </div>  
                    </div>
                </div>
                <div 
                    className="archives-title" 
                    style={{height:50,display:leftStyleState}}>
                    <div style={{float:'left',marginTop:15}}>
                        <b style={{fontSize:16,fontWeight:'bold',color:'#000'}}>在职人员</b>&nbsp;&nbsp;（点击员工姓名上传
                        <b style={{color:'#f68f6b'}}>人事材料</b>；点击员工的每一项信息
                        <b style={{color:'#6b88f6'}}>快速补充人员信息</b>）
                    </div>
                    <div 
                        className="archives-select" 
                    >
                        <Select
                            defaultValue="人事材料存档率升序" 
                            style={{width: 180,height:35,lineHeight:35}}
                            onChange={this.handleSelectChange}
                        >
                            {
                                archivesData.map((item , index)=> {
                                    return(
                                        <Option key={index} value={item}>{item}</Option>
                                        )
                                })
                           
                            }
                            
                        </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button>下载材料附件</Button>
                    </div>
                </div>
                <div 
                    className="archives-title" 
                    style={{height:50,display:rightStyleState}}>
                    <div style={{float:'left',marginTop:15}}>
                        <b style={{fontSize:16,fontWeight:'bold',color:'#000'}}>离职人员</b>&nbsp;&nbsp;（点击员工姓名上传
                        <b style={{color:'#f68f6b'}}>人事材料</b>）
                    </div>
                    <div 
                        className="archives-select" 
                    >
                        <Select
                            defaultValue="人事材料存档率升序" 
                            style={{width: 180,height:35,lineHeight:35}}
                            onChange={this.handleSelectChange}
                        >
                            {
                                archivesLeave.map((item , index)=> {
                                    return(
                                        <Option key={index} value={item}>{item}</Option>
                                        )
                                })
                           
                            }
                            
                        </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button>下载材料附件</Button>
                    </div>
                </div>
            </div>
        )
    }
}