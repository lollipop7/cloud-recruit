import React, {Component} from 'react';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

export default class LeftTreePage extends Component {
  state = {
    treeData: [
        {
          "key": 1,
          "icon": "appstore",
          "title": "软件测试科",
          "url": "",
          "children": [
            {
              "key": 4,
              "title": "广电组",
              "url": "",
              "children": [
                {
                  "key": 8,
                  "title": "客制化",
                  "url": "",
                  "children": [
                    {
                      "key": 19,
                      "title": "版本测试",
                      "url": ""
                    }
                  ]
                }, {
                  "key": 9,
                  "title": "客供",
                  "url": ""
                }
              ]
            }, {
              "key": 5,
              "title": "光通组",
              "url": "",
              "children": [
                {
                    "key": 16,
                    "text": "版本测试",
                    "title": "",
                    "url": ""
                }
              ]
            }
          ]
        }, {
          "key": 2,
          "icon": "setting",
          "title": "硬件测试科",
          "url": ""
        }, {
          "key": 3,
          "icon": "mail",
          "title": "EMC测试科",
          "url": ""
        }
      ]
  }
  recursion(dataSource) {
    return (
      dataSource.map((menu, index) => {
        if (menu.children) {
          return (
            <TreeNode title={menu.title}>
                {this.recursion(menu.children)}
            </TreeNode>
          )
        } else {
          return (
                <TreeNode title={menu.title}>
                </TreeNode>)
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
      const {treeData} = this.state;
    return (
        <div>
            {
                <Tree
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}>
                {this.recursion(treeData)}
              </Tree>
              }
        </div>
    );
  }
}

 