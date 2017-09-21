import React, {Component} from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export default class Demo extends Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  render() {
    return (
      <Tree
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        <TreeNode title="parent 1">
          <TreeNode title="parent 1-0">
            <TreeNode title="leaf"/>
            <TreeNode title="leaf" />
          </TreeNode>
          <TreeNode title="parent 1-1">
            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>}/>
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}