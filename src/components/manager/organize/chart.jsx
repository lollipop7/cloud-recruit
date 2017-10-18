import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';
import {Link} from 'react-router';
import './chart.css' 
// loading
import LoadingComponent from 'components/loading';
// antd
import { Modal, Select } from 'antd';
const Option = Select.Option;

class OrganizeChart extends Component {
  state = { 
    isLoading:false
  }
  componentDidMount(){
    // 获取数据
    this.props.getOrganizeChart();
    
  }
  componentShouldUpdate(){
    return nextProps !== this.props || nextState !== this.state
  }
  componentWillUpdate(nextProps,nextState) {
    const {organize} = nextProps;
    if(nextProps !== this.props){
        var newOrg = JSON.parse(JSON.stringify(organize).replace(/list/g, "childrens"))
        var result = {
            data:[newOrg]
        }
        function dd (result){
            var showlist = $("<ul id='org' style='display:none'></ul>");
            showall(result.data, showlist);
            $("#jOrgChart").append(showlist);
            $("#org").jOrgChart( {
                chartElement : '#jOrgChart',//指定在某个dom生成jorgchart
                dragAndDrop : false //设置是否可拖动
            });
        }
        dd(result);
        function showall(menu_list, parent) {
            $.each(menu_list, function(index, val) {
                if(val.childrens && val.childrens.length > 0){
    
                    var li = $("<li></li>");
                    li.append("<a href='javascript:void(0)' onclick=getOrgId("+val.id+");>"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
                    //递归显示
                    showall(val.childrens, $(li).children().eq(1));
                }else{
                    $("<li></li>").append("<a href='javascript:void(0)' onclick=getOrgId("+val.id+");>"+val.name+"</a>").appendTo(parent);
                }
            });
        }
        
    }
}
componentDidUpdate(nextProps,nextState){
    if(nextState != nextState){
        this.setState({isLoading:true})
    }
}
  
render() {
    const { isLoading } = this.state;
    console.log(isLoading)
    return (
        <div id='jOrgChart'>
            {isLoading &&
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}>
                    <LoadingComponent style={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: '#FFF'
                    }} />
                </div>
            }
        </div>
    );
  }
}
const mapStateToProps = state => ({
    organize: state.Manage.organize
})
const mapDispatchToProps = dispatch => ({
    getOrganizeChart: bindActionCreators(Actions.ManageActions.getOrganizeChart, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizeChart);
