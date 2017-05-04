import React, {Component} from 'react';
import {Button} from 'antd';
import LoadingComponent from 'components/loading';
import echarts from 'static/js/echarts.min.js';

import extend from 'lodash/extend';

// 指定图表的配置项和数据
import options from 'data/chart/line';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class ResumeComponent extends Component {

    tabList = [7,30,180,360];

    chartInstance = null;

    state = {
        isLoading: false,
        activeTab: 0
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.resumeWareHousing();
        // 实例化图表
        this.chartInstance = echarts.init(this.refs.echarts);
        // 使用刚指定的配置项和数据显示图表。
        this.chartInstance.setOption(options);
    }

    componentWillUpdate(nextProps,nextState) {
        const {data} = nextProps;
        if(data.content && nextState.isLoading) {
            this.setState({
                isLoading: false
            });
            let xaxis = data.content['zhilian'].map((item,index)=>{
                return item.labelname;
            });
            let job = data.content['51job'].map((item,index)=>{
                return item.cnt;
            });
            let zhilian = data.content['zhilian'].map((item,index)=>{
                return item.cnt;
            });
            //更改数据
            this.chartInstance.setOption({
                xAxis: {
                    data: xaxis.slice(0,360)
                },
                series: [
                    {
                        name:'前程无忧',
                        data: job.slice(0,360)
                    },
                    {
                        name: '智联招聘',
                        data: zhilian.slice(0,360)
                    }
                ]
            });
        }
    }

    handleClick = (index) => {
        if(index === this.state.activeTab) return ;
        this.setState({
            activeTab:index,
            isLoading: true
        });
        // 销毁实例化图表
        // this.destroyChart();
        // this.props.resumeWareHousing(this.tabList[index]);
    }

    render() {
        const {isLoading,activeTab} = this.state;
        return (
            <div style={{
                position: 'relative',
                width: 914,
                height: 380
            }}>
                {isLoading && 
                    <LoadingComponent style={{
                        position: 'absolute',
                        top: 68,
                        height: 310,
                        width: '100%',
                        backgroundColor: '#FFF',
                        zIndex: 2
                    }} />
                }
                <div className="chart-tab" style={{
                    top: 13,
                    right: 35
                }}>
                    {
                        this.tabList.map((item,index)=>{
                            return (
                                <Button 
                                    key={index} 
                                    type={ index === activeTab ? 'primary' : ''}
                                    onClick={this.handleClick.bind(this,index)}
                                    disabled={ index !== activeTab && isLoading ? true : false}
                                >{item}天</Button>
                            )
                        })
                    }
                </div>
                <div ref="echarts" className="box-border" style={{
                    width:'914px',
                    height:'380px'
                }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.Home.resumeData
})
const mapDispatchToProps = dispatch => ({
    resumeWareHousing: bindActionCreators(Actions.homeActions.resumeWareHousing, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResumeComponent);