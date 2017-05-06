import React, {Component} from 'react';

import {Table} from 'antd';

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: (text, row, index) => {
    if (index === 0) {
      return {
        children: <a href="#">{text}</a>,
        props: {
          rowSpan: 5,
        },
      }
    }
    return {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          props: {
        rowSpan: 0,
      },
    };
  },
}, {
  title: 'Age',
  dataIndex: 'age',
  // render: renderContent,
}, {
  title: 'Home phone',
  colSpan: 2,
  dataIndex: 'tel',
  // render: (value, row, index) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };
  //   if (index === 2) {
  //     obj.props.rowSpan = 2;
  //   }
  //   // These two are merged into above cell
  //   if (index === 3) {
  //     obj.props.rowSpan = 0;
  //   }
  //   if (index === 4) {
  //     obj.props.colSpan = 0;
  //   }
  //   return obj;
  // },
}, {
  title: 'Phone',
  colSpan: 0,
  dataIndex: 'phone',
  // render: renderContent,
}, {
  title: 'Address',
  dataIndex: 'address',
  // render: renderContent,
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  tel: '0571-22098909',
  phone: 18889898989,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'John Brown',
  tel: '0571-22098333',
  phone: 18889898888,
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'John Brown',
  age: 32,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'John Brown',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'London No. 2 Lake Park',
}, {
  key: '5',
  name: 'John Brown',
  age: 18,
  tel: '0575-22098909',
  phone: 18900010002,
  address: 'Dublin No. 2 Lake Park',
}];

export default class TableComponents extends Component {

    componentDidMount() {
      let data = {
        name: '刘德华',
        loginnum: 11,
        resumenum: 11,
        job: 11,
        zhilian: 11,
        focus: 20,
        pending: 20,
        cnt: 20,
      }
    }

    render() {
        return (
            <Table columns={columns} dataSource={data} bordered />
        );
    }
}