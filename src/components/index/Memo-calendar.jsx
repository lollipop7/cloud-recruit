import React, {Component} from 'react';
import {Calendar , Icon ,Tooltip} from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
import each from 'lodash/each';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoCalendarComponent extends Component {
    state = {
        memos :[]
    }

    handleClick =() => {
        this.props.showMemoModal();
        // console.log('click');
    }

    onPanelChange = (value, mode) => {
       alert(value, mode);
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
            let memos=[]
            const {MemoContent} = this.props
            const date = moment().format('YYYY-MM-DD')
           for (let i in MemoContent){
               const arr =MemoContent[i]
                memos.push(arr)
           }
           this.setState({
                memos:memos
            }) 
        })   
    }
    //渲染日期
    dateCellRender = (value) => {
        const memos = this.state.memos
        const date = moment().format('DD')
        if (memos.length!=0){
            for (let k=0;k<memos.length;k++){
                //已添加备忘录的日期处理
                let dater= memos[k].length!=0 ? parseInt(memos[k][0].labelname.slice(8,10)):[]
                //条件过滤渲染
                if (memos[k].length!=0 && dater>=parseInt(date) && value.date()==dater){
                    return <span style={{color:"#0086c9"}}>●</span> 
                }else if (memos[k].length!=0 && dater<parseInt(date) && value.date()==dater) {
                    return <span style={{color:"#da9891"}}>●</span>
                }
            }      
        }  
    }
    //选择日期方法
    onSelect = (value)=> {
        const date = moment(value).format("YYYY-MM-DD")
        this.props.getDateMemoContent({onDate:date})      
    }
    render(){
        let memos = [] , dateArr = []
        const {MemoContent , DateMemoContent} = this.props
        const date = moment().format('YYYY-MM-DD')
        MemoContent[date] && each(MemoContent[date],item=>{
            memos.push(item.memos)
        })
        for (let i in DateMemoContent) {
            dateArr=DateMemoContent[i]
        }
        return(
            <div className="memo-calendar box-border">
                <div className="memo-header title" onClick={this.handleClick}>
                    备忘日历
                </div>
                <div className="memo-body">
                    {
                        dateArr.length!=0 &&  
                        <div style={{height:80}}>
                            <span>{dateArr[0].labelname}：</span>
                            <p>
                                {
                                    dateArr.map((item,index)=>{
                                        return <span key={index}>
                                                    {item.memos}
                                                    { index === dateArr.length-1 ? "" : <b>、</b> }
                                            </span>
                                    })
                                }
                            </p>
                        </div>
                    }
                    {
                        dateArr.length==0 && 
                        <div style={{height:80}}>
                            <span>今日事项：</span>
                            <p>
                                {
                                    memos.length!=0?memos.map((item,index)=>{
                                        return <span key={index}>
                                                    {item}
                                                    { index === memos.length-1 ? "" : <b>、</b> }
                                               </span>
                                    }):"未添加今日事项。。。"
                                }
                            </p>
                        </div>
                    }
                    <div className="calendar-wrap" style={{width:230,height:230}}>
                        <Calendar 
                            fullscreen={false}
                            dateCellRender={this.dateCellRender}
                            onSelect = {this.onSelect}
                            onMousemove= {this.onSelect}
                        />
                        <div style={{marginTop:15,textAlign:"center",height:20}}>
                            <span><span style={{color:"#da9891"}}>●</span>&nbsp;&nbsp;过期</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span><span style={{color:"#0086c9"}}>●</span>&nbsp;&nbsp;预先记录</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    showMemoModal: bindActionCreators(Actions.homeActions.showMemoModal, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoCalendarComponent);

