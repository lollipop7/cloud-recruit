import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
import {Button} from 'antd';
import store from 'store';
// pie option
import chartOptions from 'data/employees-overview/first-pie';

// loading
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// lodash
import filter from 'lodash/filter';

// 饼图下载分享
import OperateEmployeesPie from './operate';

// 第一个饼图-员工性质分布
class FirstChartComponent extends Component {

    state = {
        isLoading: false,
        activeTab: 0,
        isEmpty: false
    }
    
    chartInstance = null;

    componentDidMount() {
        const { type } = this.props;
        this.setState({
            isLoading: true
        });
        // 实例化echart
        this.chartInstance = echarts.init(this.refs.echarts);
        // 渲染图表
        // 使用指定的配置项和数据显示图表。
        this.chartInstance.setOption(chartOptions);
        this.props.getEmployeeQuality({counttype: type});
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUnmount() {
        if(this.chartInstance){
            // 组件卸载后销毁echart实例
            // this.destroyChart();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        const {employeeQuality} = nextProps,
            {isLoading} = nextState;
        if( nextProps.employeeQuality !== this.props.employeeQuality && isLoading){
            // 去除loading
            this.setState({
                isLoading: false
            });
            let result = [];
            employeeQuality.forEach( (item,index) => {
                result.push({
                    value: item.cnt,
                    name:  item.cname
                });
            });
            if(result.length === 0) {
                result = chartOptions.series[0].data;
                this.setState({
                    isEmpty: true
                });
            }
            this.chartInstance.setOption({
                series: [{
                    name: '员工性质分布',
                    data: result
                }]
            });
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        const {isLoading,activeTab} = this.state;
        return nextProps.employeeQuality !== this.props.employeeQuality 
        || nextState.isLoading !== isLoading 
        || nextState.activeTab !== activeTab;
    }

    destroyChart = () => {
        echarts.dispose(this.chartInstance);
    }

    render() {
        const {isLoading,activeTab,isEmpty} = this.state;
        return (
            <div className="task-progress box-border pull-left" style={{'margin':'0 20px 20px 0'}} >
                <div style={{ position: 'relative' }}>
                    <div className='pie-title'>员工性质分布</div>
                    <OperateEmployeesPie/>
                    {isLoading &&
                        <div style={{
                            position: 'absolute',
                            width: 483,
                            height: 310,
                            zIndex: 1
                        }}>
                            <LoadingComponent style={{
                                position: 'absolute',
                                width: '100%',
                                backgroundColor: '#FFF'
                            }} />
                        </div>
                    }
                    {isEmpty &&
                        <div className="canvas-mask" style={{
                                lineHeight: '310px',
                                left: 0
                            }}>
                                暂无数据
                        </div>
                    }
                    <div style={{
                        top: -1
                    }} ref="echarts" className="pie-chart">
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    employeeQuality: state.Manage.employeeQuality
})
const mapDispatchToProps = dispatch => ({
    getEmployeeQuality: bindActionCreators(Actions.ManageActions.getEmployeeQuality, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FirstChartComponent);