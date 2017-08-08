import React, {Component} from 'react';
import {Calendar} from 'antd';

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
        return(
            <div className="memo-calendar box-border">
                <div className="memo-header title" onClick={this.handleClick}>
                    备忘日历
                </div>
                <div className="memo-body">
                    <p>未记录今日需处理的事务！</p>
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

