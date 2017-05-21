import React, {Component} from 'react';

import LoadingComponent from 'components/loading';
import BaseInfoComponent from './info/base-info';
import OtherInfoComponent from './info/other-info';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class JobInfoComponent extends Component {

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps;
    }

    render() {
        const {isLoading} = this.props;
        return (
            <div>
                {isLoading &&
                    <div style={{
                        position: 'relative',
                        height: 418
                    }}>
                        <LoadingComponent className="absolute-center" />
                    </div>
                }
                {!isLoading &&
                    <ul className="job-form" style={{
                        textAlign: 'left',
                        padding: 0,
                        margin: '16px 30px'
                    }}>
                        <BaseInfoComponent {...this.props} />
                        <OtherInfoComponent {...this.props} />
                    </ul>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    jobInfo: state.Job.jobInfo,
    isLoading: state.Job.isLoadingInfo
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobInfoComponent);