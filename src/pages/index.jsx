import React, {Component} from 'react';

import TimeComponent from 'components/index/time';
import MissionComponent from 'components/index/mission';
import ResumeComponent from 'components/index/resume';
import TaskProgressComponent from 'components/index/task-progress';
import EntryPersonComponent from 'components/index/entry-person';

import ScrollPageContent from 'components/scroll-page-content';

import {cancelRequest} from 'utils/ajax';

export default class IndexPage extends Component {

    componentDidMount() {
        NProgress.done();
    }

    componentWillUnmount() {
        // cancelRequest();
    }

    render() {
        return (
            <ScrollPageContent>
                <div className="page-content index-page">
                    <div className="list-block">
                        <div className="pull-left">
                            <TimeComponent />
                            <MissionComponent />
                        </div>
                        <div className="pull-right" style={{backgroundColor: '#FFF'}}>
                            <ResumeComponent />
                        </div>
                    </div>
                    <div className="list-block">
                        <div className="pull-left">
                            <TaskProgressComponent />
                        </div>
                        <div className="pull-right">
                            <EntryPersonComponent />
                        </div>
                    </div>
                </div>
            </ScrollPageContent>
        );
    }
}