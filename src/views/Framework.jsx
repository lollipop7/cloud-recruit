import React, {Component} from 'react';
// import PropTypes from 'prop-types';

export default class FrameworkView extends Component {

    // propTypes = {
    //     children: PropTypes.isRequired,
    // }
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}