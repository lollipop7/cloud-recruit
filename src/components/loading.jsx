import React, {Component} from 'react';

export default class LoadingComponent extends Component {

    render() {
        return (
            <div className="loading-wrapper">
                <div className="loading-inner">
                    <div className="row clearfix">
                        <div className="square one"></div> 
                        <div className="square two"></div>
                        <div className="square three"></div>
                    </div>
                    <div className="row clearfix">
                        <div className="square eight"></div> 
                        <div className="square nine"></div>
                        <div className="square four"></div>
                    </div>
                    <div className="row clearfix">
                        <div className="square seven"></div> 
                        <div className="square six"></div>
                        <div className="square five"></div>
                    </div>
                </div>
            </div>
        );
    }
}