import React, {Component} from 'react';

export default class Demo extends Component {
  
  render() {
    return (
      <div className='pull-left organize-tree-right'>
          <div className='department-title'><div></div>客户服务售前售后部门</div>
          <div className='down-line'></div>

          {/* 下级部门 */}

          <div className='sub-department'>
            <div className='sub-title'>下级部门（2）</div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span>部门名称</span>
                <span className='left-width'>部门人数</span>
              </div>
              <div className='sub-depart-table-lab'>
                <span className='left'>客户服务售前售后部门</span>
                <span className='right'>1人</span>
              </div>
              <div className='sub-depart-table-lab'>
                <span className='left'>客户服务售前售后部门</span>
                <span className='right'>1人</span>
              </div>
            </div>
          </div>

          {/* 部门在职员工 */}

          <div className='sub-department-two'>
            <div className='sub-title'>部门在职员工（2）<span className='pull-right operate'>批量调整</span></div>
            <div className='sub-depart-table'>
              <div className='sub-depart-table-title'>
                <span className='one'>姓名</span>
                <span className='two'>部门</span>
                <span className='three'>岗位</span>
                <span className='four'>操作</span>
              </div>
              <div className='sub-depart-table-lab'>
                <span className='one'>张三</span>
                <span className='two'>客户服务售前售后部门</span>
                <span className='three'>前端工程师</span>
                <span className='four'>调换部门</span>
              </div>
              <div className='sub-depart-table-lab'>
                <span className='one'>张三</span>
                <span className='two'>客户服务售前售后部门</span>
                <span className='three'>前端工程师</span>
                <span className='four'>调换部门</span>
              </div>
            </div>
          </div>
      </div>
    );
  }
}