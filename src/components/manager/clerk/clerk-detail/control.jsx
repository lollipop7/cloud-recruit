import React, {Component} from 'react';
import { Button } from 'antd';

export default class ControlComponent extends Component {


    render() {
        return (
            <div className="control">
                <div className="pull-left">
                    <Button
                        style={{
                            width: 70,
                        }}
                    ></Button>
                </div>
                <div className="pull-right">
                    <div className="hint">
                        <img src="static/images/manager/clerk/hint.png" alt="提示"/>
                    </div>
                    <div className="ps">
                        <img src="static/images/manager/clerk/ps.png" alt="备注"/>
                    </div>
                    <div className="print"> 
                        <img src="static/images/manager/clerk/print.png" alt="打印"/>
                    </div>
                </div>
                {/* <div className="clearfix"></div> */}
            </div>
        );
    }
}