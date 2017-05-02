import React, {Component} from 'react';
import NavBarComponents from 'components/navbar';

export default class FrameworkView extends Component {
    
    render() {
        const {location} = this.props;
        return (
            <div>
                {location.pathname != '/login' && <NavBarComponents location={location} />}
                {this.props.children}
            </div>
        );
    }
}