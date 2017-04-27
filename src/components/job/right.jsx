import React, {Component} from 'react';

import FormComponent from './form';

export default class RightComponent extends Component {
    
    render() {
        return (
            <div className="box-border">
                <FormComponent />
            </div>
        );
    }
}