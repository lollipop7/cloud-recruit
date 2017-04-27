import React, {Component} from 'react';

import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EntryPersonComponent extends Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.getEntryPerson();
    }

    componentWillUnmount() {
        this.props.resetEntryPerson();
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextState.isLoading && nextProps.entryPersonList.length > 0){
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const {isLoading} = this.state;
        const {entryPersonList=[]} = this.props;
        return (
            <div className="entry-person box-border">
                <div className="title">待入职人员</div>
                <table className="layui-table">
                    <thead>
                        <tr>
                        <th>人员姓名</th>
                        <th>应聘岗位</th>
                        <th>入职时间</th>
                        <th>电话</th>
                        <th>资料情况</th>
                        <th>确认入职</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {!isLoading && entryPersonList.length > 0 &&
                            entryPersonList.map((item,index)=>{
                                const {username='',positionname='',eventtime,telephone='',entry} = item;
                                return (
                                    <tr key={index}>
                                        <td>
                                            {username}
                                        </td>
                                        <td>
                                            {positionname}
                                        </td>
                                        <td>
                                            {eventtime}
                                        </td>
                                        <td>
                                            {telephone}
                                        </td>
                                        <td>
                                            {/*{
                                                parseInt((Math.random()*10)) % 2 == 0 ? 
                                                <span className="ellipse-button perfect">已完善</span>
                                                :
                                                <span className="ellipse-button">未完善</span>
                                            }*/}
                                        </td>
                                        <td>
                                            {
                                                parseInt((Math.random()*10)) % 2 == 0 ? 
                                                <span className="ellipse-button complete">已确认</span>
                                                :
                                                <span className="ellipse-button">未确认</span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="space"></tr>
                    </tbody>
                </table> 
                {isLoading && 
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '327px'
                    }}>
                        <LoadingComponent />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    entryPersonList: state.Home.entryPersonList
})
const mapDispatchToProps = dispatch => ({
    getEntryPerson: bindActionCreators(Actions.homeActions.getEntryPerson, dispatch),
    resetEntryPerson: bindActionCreators(Actions.homeActions.resetEntryPerson, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryPersonComponent);