import React, {Component} from 'react';

export default class SelfMarkComponent extends Component {
    render() {
        const {data} = this.props;
        const {selfremark=''} = data;
        return (
            <li className="info-item">
                <h3 className="title">
                    自我评价
                </h3>
                <p 
                    className="field-list"
                    dangerouslySetInnerHTML={{__html:selfremark}}
                    style={{
                        whiteSpace: 'pre-wrap'
                    }}
                >
                </p>
            </li>
        );
    }
}