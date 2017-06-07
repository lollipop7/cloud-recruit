import React, {Component} from 'react';

export default class BoxComponent extends Component {
    render() {
        const {
            className='',
            style={},
            num=0,
            desc='',
            triangle=false,
            circle=false,
            numColor=''
        } = this.props;
        return (
            <div 
                className={`box ${className}`}
                style={style}
            >
                <div className="table">
                    <div className="table-cell">
                        <p className="num" style={{
                            color: numColor
                        }}>
                            {num}
                        </p>
                        <p className="desc">
                            {desc}
                        </p>
                    </div>
                </div>
                {
                    triangle && <div className="triangle"></div>
                }
                {
                    circle && <div className="circle"></div>
                }
            </div>
        );
    }
}