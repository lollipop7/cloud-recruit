import React, {Component} from 'react';
import echarts from 'static/js/echarts.min.js';
import {Button} from 'antd';
import store from 'store';
// pie option
import chartOptions from 'data/employees-overview/organize-chart';

// loading
import LoadingComponent from 'components/loading';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// lodash
import filter from 'lodash/filter';

// 第一个饼图-员工性质分布
class OrganizeChart extends Component {

    state = {
        
    }

    componentDidMount() {
        // 获取数据
        this.props.getOrganizeChart();
        // Loading效果
        this.setState({
            isLoading: true
        });
        console.log(111,echarts)
        // 实例化echart
        this.chartInstance = echarts.init(this.refs.echarts);
        // 渲染图表
        // 使用指定的配置项和数据显示图表。
        this.chartInstance.setOption(chartOptions);
    }

    shouldComponentUpdate(nextProps,nextState) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentWillUnmount() {
        if(this.chartInstance){
            // 组件卸载后销毁echart实例
            this.destroyChart();
        }
    }

    componentWillUpdate(nextProps,nextState) {
        const {isLoading} = nextState;
        const {organize} = nextProps;
        console.log(5555,organize)
        if(nextProps !== this.props){
            // 去除loading
            this.setState({
                isLoading: false
            });
            // this.chartInstance.setOption({
            //     series: [{
            //         name: '',
            //         data: ''
            //     }]
            // });
        }
    }

    destroyChart = () => {
        echarts.dispose(this.chartInstance);
    }

    render() {
        const {pageType, organize} = this.props;
        const {isLoading,activeTab,isEmpty} = this.state;
        
        return (
            <div className="task-progress box-border pull-left" style={{'margin':'0 20px 20px 0'}} >
                <div style={{ position: 'relative' }}>
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
                    <div style={{ top: -1 }} ref="echarts" className="pie-chart">
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    organize: state.Manage.organize
})
const mapDispatchToProps = dispatch => ({
    getOrganizeChart: bindActionCreators(Actions.ManageActions.getOrganizeChart, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizeChart);