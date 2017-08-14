import React, {Component} from 'react';
import {Calendar , Icon} from 'antd';
import moment from 'moment';
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

    render(){
        let memos = []
        const {MemoContent} = this.props
        const data = moment().format('YYYY-MM-DD')
        MemoContent[data] && each(MemoContent[data],item=>{
            memos.push(item.memos)
        }) 
        return(
            <div className="memo-calendar box-border">
                <div className="memo-header title" onClick={this.handleClick}>
                    备忘日历
                </div>
                <div className="memo-body">
                    {/*<span>今日事项：</span>*/}
                    <p>
                    {
                        memos.map((item,index)=>{
                            return <span key={index}>{item}</span>
                        })
                    }
                    </p>
                    <div className="calendar-wrap">
                        <Calendar fullscreen={false}
                        onPanelChange={this.onPanelChange}/>
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

