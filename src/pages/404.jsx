import React, {Component} from 'react';

import ScrollPageContent from 'components/scroll-page-content';

export default class NotFoundPage extends Component {
    render() {
        return (
            <ScrollPageContent>
                <div className="page-content not-found-page">
                    404 page
                </div>
            </ScrollPageContent>
        );
    }
}