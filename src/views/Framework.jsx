import React, {Component} from 'react';
import NavBarComponents from 'components/navbar';

export default class  extends Component {
    
    render() {
        const {location} = this.props,
            pathname = location.pathname,
            patternLogin = /\/login/i, // 匹配login路径
            patternResume = /(\/resumeInfo)/i; // 匹配 /resumeInfo/:resumeId/:logId
        return (
            <div>
                {!patternLogin.test(pathname) && !patternResume.test(pathname) && <NavBarComponents location={location} />}
                {this.props.children}
            </div>
        );
    }
}