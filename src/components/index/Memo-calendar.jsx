import React, {Component} from 'react';
import {Calendar , Icon} from 'antd';
import moment from 'moment';
moment.locale('zh-cn');
import each from 'lodash/each';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class MemoCalendarComponent extends Component {

    handleClick =() => {
        this.props.showMemoModal();
        // console.log('click');
    }

    onPanelChange = (value, mode) => {
        console.log(value, mode);
    }
    //点击日期方法
    onSelect = () => {
        //alert(22)
    }
    render(){
        let memos = []
        const {MemoContent} = this.props
        const date = moment().format('YYYY-MM-DD')
        MemoContent[date] && each(MemoContent[date],item=>{
            memos.push(item.memos)
        }) 
        return(
            <div className="memo-calendar box-border">
                <div className="memo-header title" onClick={this.handleClick}>
                    备忘日历
                </div>
                <div className="memo-body">
                    <span>今日事项：</span>
                    <p>
                    {
                        memos.map((item,index)=>{
                            return <span key={index}>
                                    {item}
                                    { index === memos.length-1 ? "" : <b>、</b> }
                                    </span>
                        })
                    }
                    </p>
                    <div className="calendar-wrap" style={{width:230,height:230}}>
                        <Calendar 
                            fullscreen={false}
                            onPanelChange={this.onPanelChange}
                            onSelect = {this.onSelect}
                        />
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

