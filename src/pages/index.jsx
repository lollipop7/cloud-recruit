import React, {Component} from 'react';

import TimeComponent from 'components/index/time';
import MissionComponent from 'components/index/mission';

export default class IndexPage extends Component {

    render() {
        return (
            <div className="page-content index-page">
                <div className="pull-left">
                    <TimeComponent />
                    <MissionComponent />
                </div>
                <div className="pull-right">

                </div>
            </div>
        );
    }
}