import React, {Component} from 'react';

import EmailInfoComponent from './email-info';
import EmailEditorComponents from './email-editor';

export default class RightComponents extends Component {
    render() {
        return (
            <div className="box-border">
                <EmailInfoComponent />
                <EmailEditorComponents />
            </div>
        );
    }
}