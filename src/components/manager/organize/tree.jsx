import React, {Component} from 'react';
// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

// antd
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class LeftTreePage extends Component {
  state = {
   
  }
  componentDidMount(){
    this.props.getDepartMentList()
  }
  recursion(dataSource) {
    return (
      dataSource.map((tree, index) => {
        if (tree.list) {
          return (
            <TreeNode title={tree.name}>
                {this.recursion(tree.list)}
            </TreeNode>
          )
        } else {
          return (
              <TreeNode title={tree.name}>
              </TreeNode>
          )
        }
      })
    )
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  render() {
    const { departmentList:{list} } = this.props;
    return (
        <div className='pull-left tree-type'>
            {
              <Tree 
                    multiple
                    draggable
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
              >
                {this.recursion(list)}
              </Tree>
              }
        </div>
    );
  }
}
const mapStateToProps = state => ({
  departmentList: state.Manage.departmentList
})
const mapDispatchToProps = dispatch => ({
  getDepartMentList: bindActionCreators(Actions.ManageActions.getDepartMentList, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftTreePage);
 