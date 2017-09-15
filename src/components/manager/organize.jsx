import React, {Component} from 'react';

 export default class OrganizePage extends Component {

     componentDidMount(){
        NProgress.done();
     }

     render(){
        const {routes} = this.props;
        return (
            <div>
                top
                middle
                footer
            </div>
        );
     }
 }