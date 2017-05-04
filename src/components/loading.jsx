import React, {Component} from 'react';

export default class LoadingComponent extends Component {

    render() {
        const {style={}} = this.props;
        return (
            <div className="loader-wrapper" style={style}>
                <div className="loader08"></div>
            </div>
        );
    }
}