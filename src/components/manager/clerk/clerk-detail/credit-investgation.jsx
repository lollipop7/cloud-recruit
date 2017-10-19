import React, {Component} from 'react';

import BarChartComponent from './bar-chart';
import CreditReturnComponent from './credit-return';
import CreditFillComponent from './credit-fill';

export default class CreditInvestgation extends Component {

    state={
        isFill: true
    }

    render() {
       const {isFill} = this.state;
       return(
        <div className="credit-investgation clerk-tab-container">
            <ul>
                {isFill ? <CreditReturnComponent/> : <CreditFillComponent/>}
            </ul>
        </div>    
       )    
    }
}