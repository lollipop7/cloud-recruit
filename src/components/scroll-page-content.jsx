import React, {Component} from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

export default class ScrollPageContent extends Component {

    state = {
        navbarHeight: 56
    }

    componentDidMount() {
        this.setState({
            height: window.innerHeight - this.state.navbarHeight
        });
    }

    render() {
        const {height=0} = this.state;
        return (
            <div className="page">
                <Scrollbars style={{ height: height}}>
                    {this.props.children}
                </Scrollbars>
            </div>
        );
    }
}