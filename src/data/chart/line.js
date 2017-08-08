module.exports = {
    title: {
        // text: '简历入库情况',
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
        top: 28,
        right: 35,
        itemWidth: 15,
        data:[{
            name: '前程无忧',
            icon: `image://static/images/index/rect-1.png`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12
            }
        },{
            name: '智联招聘',
            icon: `image://static/images/index/rect-2.png`,
            textStyle: {
                color: '#6b6b6b',
                fontSize: 12
            }
        },{
            name: '其他',
            icon: `image://static/images/index/rect-3.png`,
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
        // min: 'dataMin',
        // max: 'dataMax',
        data: [],
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12,
                align: 'left'
            }
        },
        splitLine: {
            show: true
        }
    },
    yAxis: {
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12,
                baseline: 'bottom'
            }
        },
        splitLine: {
            show: true
        }
    },
    series: [
        {
            name: '前程无忧',
            type: 'line',
            smooth: false,
            lineStyle: {
                normal: {
                    color: '#ac4100'
                }
            },
            data: []
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
            data: []
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
            data: []
        }
    ]
}