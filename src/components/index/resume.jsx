import React, {Component} from 'react';

export default class ResumeComponent extends Component {

    componentDidMount() {
            var myChart = echarts.init(this.refs.echarts);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '简历入库情况',
                    textStyle: {
                        color: '#4d4d4d',
                        fontSize: 16,
                        fontFamily: 'Microsoft YaHei',
                        fontWeight: 'bolder'
                    },
                    padding: 0,
                    top: 13,
                    left: 13
                },
                color: ['#ac4100','#00b1c6','#f9a326'],
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: 23,
                    top: 78,
                    right: 43,
                    bottom: 15,
                    containLabel: true
                },
                legend: {
                    top: 42,
                    left: 8,
                    data:[{
                        name: '前程无忧',
                        icon: 'roundRect',
                        textStyle: {
                            color: '#6b6b6b',
                            fontSize: 12
                        }
                    },{
                        name: '智联招聘',
                        icon: 'roundRect',
                        textStyle: {
                            color: '#6b6b6b',
                            fontSize: 12
                        }
                    },{
                        name: '其他',
                        icon: 'roundRect',
                        textStyle: {
                            color: '#6b6b6b',
                            fontSize: 12
                        }
                    }]
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {show: true, type: ['stack', 'tiled']},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['第一周','第二周','第三周','第四周'],
                    axisTick: {
                        show: false // 不显示刻度
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#4d4d4d',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        show: true,
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false // 不显示刻度
                    }
                },
                series: [{
                    name: '前程无忧',
                    type: 'line',
                    smooth: false,
                    lineStyle: {
                        normal: {
                            color: '#ac4100'
                        }
                    },
                    data: [10, 20, 30, 10 ]
                },
                {
                    name: '智联招聘',
                    type: 'line',
                    smooth: false,
                    lineStyle: {
                        normal: {
                            color: '#00b1c6'
                        }
                    },
                    data: [30, 22, 34, 91]
                },
                {
                    name: '其他',
                    type: 'line',
                    smooth: false,
                    lineStyle: {
                        normal: {
                            color: '#f9a326'
                        }
                    },
                    data: [20, 32, 61, 24]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
    }

    render() {
        return (
            <div ref="echarts" className="box-border" style={{
                width:'914px',
                height:'380px',
                
            }}>
            </div>
        );
    }
}