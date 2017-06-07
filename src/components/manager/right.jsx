import React, {Component} from 'react';

import TopComponent from './top';
import TableControlComponent from './control';

export default class RightComponent extends Component {
    render() {
        return (
            <div className="right-panel">
                <TopComponent />
                <TableControlComponent />
            </div>
        );
    }
}