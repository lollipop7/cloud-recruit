import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';

import {cancelRequest} from 'utils/ajax';

export default class JobPage extends Component {

    render() {
        return (
            <ScrollPageContent>
                {this.props.children}
            </ScrollPageContent>
        );
    }
}