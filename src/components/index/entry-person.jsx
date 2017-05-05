import React, {Component} from 'react';

import {Table} from 'antd';
import columns from 'data/table-columns/index-table';

import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class EntryPersonComponent extends Component {

    state = {
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        let data = [];
        for(let i=0;i<10;i++){
            data.push({
                key: `${i}`,
                username: '',
                positionname: '',
                eventtime: '',
                telephone: '',
                entry: ''
            });
        }
        this.setState({
            datasource: data
        });
        this.props.getEntryPerson();
    }

    componentWillUnmount() {
        this.props.resetEntryPerson();
    }

    componentWillUpdate(nextProps,nextState) {
        const list = nextProps.entryPersonList;
        if(nextState.isLoading && list.length > 0){
            
            let data = [];
            data = list.map((item,index)=>{
                const {username= '',positionname='',eventtime= '',telephone= ''} = item;
                return {
                            key: `${index}`,
                            username: username,
                            positionname: positionname,
                            eventtime: eventtime,
                            telephone: telephone
                        }
            });
            this.setState({
                isLoading: false,
                datasource: data
            });
        }
    }

    render() {
        const {isLoading=false,datasource=[]} = this.state;
        const {entryPersonList=[]} = this.props;
        return (
            <div className="entry-person box-border">
                <div className="title">待入职人员</div>
                <Table 
                    columns={columns}
                    dataSource={datasource}
                    pagination={false}
                />
                {isLoading && 
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: 350,
                        bottom: 0,
                        backgroundColor: '#FFF'
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