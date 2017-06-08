import React, {Component} from 'react';

import TopComponent from './top';
import ControlComponent from './control';
import TableComponent from './table';

export default class RightComponent extends Component {
    render() {
        return (
            <div className="right-panel">
                <TopComponent />
                <ControlComponent />
                <TableComponent />
            </div>
        );
    }
}