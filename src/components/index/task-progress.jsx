import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
import {Button} from 'antd';
// pie option
import chartOptions from 'data/chart/pie';

// loading
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// lodash
import filter from 'lodash/filter';

class TaskProgressComponent extends Component {

    state = {
        isLoading: false,
        activeTab: 0
    }

    tabList= [7,30,180,360];
    
    chartInstance = null;

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        // 实例化echart
        this.chartInstance = echarts.init(this.refs.echarts);
        // 渲染图表
        // 使用指定的配置项和数据显示图表。
        this.chartInstance.setOption(chartOptions);
        this.props.getTaskProgress(this.tabList[this.state.activeTab]);
    }

    componentWillUnmount() {
        if(this.chartInstance){
            // 组件卸载后销毁echart实例
            // this.destroyChart();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        const {taskProgress} = nextProps,
            {isLoading} = nextState;
        if(taskProgress.length && nextProps.taskProgress !== this.props.taskProgress && isLoading){
            // 去除loading
            this.setState({
                isLoading: false
            });
             /**
             * stageid 
             * 1: 职位申请
             * 2: 预约管理
             * 3: 面试管理
             * 4: 复试管理
             * 5: 发送office
             * 6: 入职管理
             * 7: 结束管理
             */
            const {data} = chartOptions.legend,
            filterData = filter(taskProgress,item=>{
                return item.stageid !== 2 && item.stageid !== 7;
            });
            let result = [];
            filterData.forEach( (item,index) => {
                const {cnt,stageid} = item;
                result.push({
                    value: cnt,
                    name:  data[index].name
                });
            });
            this.chartInstance.setOption({
                series: [{
                    name: '任务完成指数',
                    data: result
                }]
            });
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        const {isLoading,activeTab} = this.state;
        return nextProps.taskProgress !== this.props.taskProgress 
        || nextState.isLoading !== isLoading 
        || nextState.activeTab !== activeTab;
    }

    destroyChart = () => {
        echarts.dispose(this.chartInstance);
    }

    handleClick = (index) => {
        if(index === this.state.activeTab) return ;
        this.setState({
            activeTab:index,
            isLoading: true
        });
        // 销毁实例化图表
        // this.destroyChart();
        this.props.getTaskProgress(this.tabList[index]);
    }

    render() {
        const {isLoading,activeTab} = this.state;
        return (
            <div className="task-progress box-border" style={{
                position: 'relative'
            }}>
                <div className="title" onClick={this.onCancelRequest}>任务完成指数</div>
                {isLoading &&
                    <div style={{
                        position: 'absolute',
                        width: 244,
                        height: 276
                    }}>
                        <LoadingComponent />
                    </div>
                }
                <div className="chart-tab">
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
                <div ref="echarts" className="pie-chart">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    taskProgress: state.Home.taskProgress
})
const mapDispatchToProps = dispatch => ({
    getTaskProgress: bindActionCreators(Actions.homeActions.getTaskProgress, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskProgressComponent);