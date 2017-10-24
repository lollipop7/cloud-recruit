import React, {Component} from 'react';

import BarChartComponent from './bar-chart';
import CreditReturnComponent from './credit-return';
import CreditFillComponent from './credit-fill';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class CreditInvestgation extends Component {
    componentDidMount(){
        const {searchCreditInvestgation , data} = this.props,
            {resumeid} = data.resumeoff
        searchCreditInvestgation({resumeid:resumeid});
    }
    render() {
       const {creditData,searchCredit, creditInfoData, isFill} = this.props;
       return(
        <div className="credit-investgation clerk-tab-container">
            <ul>
                {isFill ? <CreditReturnComponent creditInfoData={creditInfoData}/> : <CreditFillComponent {...this.props}/>}
            </ul>
        </div>    
       )    
    }
}
const mapStateToProps = state => ({
    creditData: state.Manage.creditData,
    creditInfoData: state.Manage.creditInfoData,
    isFill: state.Manage.isFill
})

const mapDispatchToProps = dispatch => ({
    showcredit:bindActionCreators(Actions.ManageActions.showcredit, dispatch),
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditInvestgation)