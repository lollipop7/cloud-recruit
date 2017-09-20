import React, {Component} from 'react';
import ProgressComponent from './archives/progress';
import TableComponent from './archives/table';

//redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class ArchivesPage extends Component {

     componentDidMount(){
        this.props.getArchivesList();
        this.props.getArchivesData();
        NProgress.done();
        
     }

     render(){
        const {routes , archivesList , archivesData} = this.props;    
        return (
            <div className="archives-right">
                <div className="box-border right-panel">
                    <ProgressComponent archivesData={archivesData}/>
                    <div>
                        <TableComponent archivesList={archivesList}/>
                    </div>
                    
                </div>
            </div>
        );
     }
 }

 const mapStateToProps = state => ({
    archivesList: state.Manage.archivesList,
    archivesData: state.Manage.archivesData
 })
 const mapDispatchToProps = dispatch => ({
    getArchivesList:bindActionCreators(Actions.ManageActions.getArchivesList, dispatch),
    getArchivesData:bindActionCreators(Actions.ManageActions.getArchivesData, dispatch)
 })
 export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(ArchivesPage)