import React, {Component} from 'react';

export default class FormComponent extends Component {

    start = {
        max: laydate.now(),
        istoday: true,
        format: 'YYYY-MM-DD',
        choose:datas=>{
            this.end.min = datas; //开始日选好后，重置结束日的最小日期
            this.end.start = datas //将结束日的初始值设定为开始日
        }
    };
    end = {
        max: laydate.now()
        ,istoday: true
        ,choose:datas=>{
            this.start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    selectStartTime(event) {
        this.start.elem = event.target,
        laydate(this.start)
    }
    selectEndTime(event) {
        this.end.elem = event.target,
        laydate(this.end)
    }

    render() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <div>
                    <div className="layui-input-block">
                        <input type="text" autoComplete="off" placeholder="职位" className="layui-input" />
                    </div>
                    <div className="layui-input-block">
                        <input type="text" autoComplete="off" placeholder="部门" className="layui-input" />
                    </div>
                </div>
                <div>
                    <div className="layui-inline">
                        <input className="layui-input" placeholder="开始时间" onClick={this.selectStartTime.bind(this)} />
                    </div>
                    <div className="layui-inline">
                        <input className="layui-input" placeholder="结束时间" onClick={this.selectEndTime.bind(this)} />
                    </div>
                    <a href="javascript:void(0);" className="button active" style={{
                        marginRight: 16,
                        position: 'relative',
                        top: 4
                    }}>
                        职位筛选
                    </a>
                    <a href="javascript:void(0);" className="button" style={{
                        marginRight: 16,
                        position: 'relative',
                        top: 4
                    }}>
                        清空条件
                    </a>
                </div>
                <a href="javascript:void(0);" style={{
                    position: 'absolute',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    display: 'inline-block',
                    backgroundColor: '#000',
                    right: 0,
                    bottom: 0
                }}></a>
            </div>
        );
    }
}