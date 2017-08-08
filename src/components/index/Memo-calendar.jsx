import React, {Component} from 'react';
import {Calendar , Icon} from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
 class CalendarComponent extends Component {
    onPanelChange(value, mode) {
        console.log(value, mode);
    }
    memoModal = () => {
        this.props.showmemomodal()
    }
    render(){
        return(
           <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4,height:378 }}>
               <div className="Calendar-title">
                   备忘日历
                   <Icon type="plus-circle-o" style={{cursor:'pointer'}} onClick={this.memoModal}  />
               </div>
                <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
           </div>
        )
    }
}
const mapStateToProps = state => ({
    memoModalVisible: state.Home.memoModalVisible,
})
const mapDispatchToProps = dispatch => ({
    showmemomodal: bindActionCreators(Actions.homeActions.showmemomodal, dispatch)
})
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(CalendarComponent)