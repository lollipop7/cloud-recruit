module.exports = {
    color: [ '#ffb530', '#61aa61', '#1587c7', '#c25255'],
    tooltip: { //提示框组件
        trigger: 'axis'
    },
    grid: {
        top: 71,
        right: 0,
        bottom: 23,
        left: 9,
        containLabel: true
    },
    legend: {//图例组件
        top: 28,
        left: 88,
        itemWidth: 12,
        itemHeight: 12,
        data:[{//图例的数据数组
            name: '工作/份<12个月',
            icon: `circle`,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12
            }
        },{
            name: '12个月≤工作/份<24个月',
            icon: `circle`,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12
            }
        },{
            name: '24个月≤工作/份<36个月',
            icon: `circle`,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12
            }
        },{
            name: '36个月≤工作/份',
            icon: `#4d4d4d`,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12
            }
        }]
    },
    xAxis: {
        type: 'value',
        boundaryGap: false,
        data: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36],
        axisTick: {
            show: false
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
        type: 'category',
        data: ['第一份工作', '第二份工作', '第三份工作', '第四份工作', '第N份工作'],
        boundaryGap: false,
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#4d4d4d',
                fontSize: 12,
                verticalAlign: 'middle'
            }
        },
        splitLine: {
            show: true
        }
    },
    series: [   //这里三个系列共用一个平行坐标系
        {
            name: '工作/份<12个月',
            type: 'bar',
            data: [19]
        },
        {
            name: ' 12个月≤工作/份<24个月',
            type: 'bar',
            data: [11]
        },
        {
            name: '24个月≤工作/份<36个月',
            type: 'bar',
            data: [24]
        },
        {
            name: '36个月≤工作/份',
            type: 'bar',
            data: [33.5]
        }
    ]
}