import React, {Component,PropTypes} from 'react';

import {Button,Modal,Input} from 'antd';

// lodash
import trim from 'lodash/trim';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

class LeftNavComponent extends Component {

    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool,
        onClick: PropTypes.func
    }

    state = {
        _selectedIndex: 0,
        createLabelModalVisible: false,
        lablename: '',
        createLableLoading: false,
        deleteLabelModalVisible: false,
        deleteLabelLoading: false,
        deleteLabelName: '',
        deleteLabelId: ''
    }

    componentWillUpdate(nextProps,nextState) {
        if(nextProps.createLabelRes && nextState.createLableLoading){
            this.setState({
                createLableLoading: false,
                createLabelModalVisible: false,
                lablename: ''
            });
            setTimeout(()=>{
                this.props.getTalentCategory();
            },500);
        }
        if(nextProps.deleteLabelRes && nextState.deleteLabelLoading){
            this.setState({
                deleteLabelLoading: false,
                deleteLabelModalVisible: false,
                deleteLabelName: '',
                deleteLabelId: ''
            });
            setTimeout(()=>{
                this.props.getTalentCategory();
            },500);
        }
    }

    handleClick(index,record) {
        if(this.state._selectedIndex === index) return;
        this.setState({
            _selectedIndex: index
        });
        const {onClick} = this.props;
        if(onClick){
            onClick(record);
        }
    }

    setCreateLabelModalVisible = (createLabelModalVisible) => {
        // 设置创建分类Modal的显示与隐藏
        this.setState({createLabelModalVisible});
    }

    setDeleteLabelModalVisible = (deleteLabelModalVisible) => {
        // 设置删除分类Modal的显示与隐藏
        this.setState({deleteLabelModalVisible});
    }

    createLabel = () => {
        // 创建分类标签
        const {lablename} = this.state;
        if(trim(lablename) === ''){
            this.refs.Input.focus();
            this.setError(true);
            return ;
        } 
        this.setState({
            createLableLoading: true
        });
        this.props.createLabel({lablename});
    }

    deleteLabel = () => {
        // 删除分类标签
        const {deleteLabelName,deleteLabelId} = this.state;
        if(deleteLabelName === '' || deleteLabelId === '') return ;
        this.setState({
            deleteLabelLoading: true
        }); 
        this.props.deleteLabel({
            lableid: deleteLabelId,
            lablename: deleteLabelName
        });
    }

    setError = (error) => {
        // 设置是否显示错误文本
        this.setState({error});
    }

    showCreateLabelModal = () => {
        // 显示创建分类标签Modal
        this.setCreateLabelModalVisible(true);
    }

    showDeleteLabelModal = (record={},e) => {
        // 显示删除分类Modal
        // 阻止时间冒泡
        e.stopPropagation();
        const {lablename,id} =record;
        this.setState({
            deleteLabelName: lablename,
            deleteLabelId: id
        });
        this.setDeleteLabelModalVisible(true);
    }

    handleChange = (e) => {
        // 输入框onChange事件
        let val = trim(e.target.value);
        this.setState({
            lablename: val
        });
        if(val.length > 0){
            this.setError(false);
        }
    }

    render() {
        const {
            _selectedIndex,
            createLabelModalVisible,
            error,
            lablename,
            createLableLoading,
            deleteLabelModalVisible,
            deleteLabelLoading,
            deleteLabelName
        } = this.state,
            {
                title='',
                data=[],
                isLoading
            } = this.props;
        return (
            <ul className="left-nav box-border">
                <li style={{height: '842px'}}>
                    <a className="title" href="javascript:void(0);">{title}</a>
                    <dl>
                        {data.map((item,index)=>{
                            const {type,title,num=0} = item;
                            return (
                                <dd 
                                    key={index} 
                                    onClick={this.handleClick.bind(this,index,item)}
                                    className={_selectedIndex === index ? 'active' : ''}
                                >
                                    {title} 
                                    ({isLoading ?
                                        <div 
                                            className={_selectedIndex === index ? 'preloader-white' : 'preloader'} 
                                            style={{
                                                position: 'relative',
                                                top: 3,
                                                width: 16,
                                                height: 16
                                            }}
                                        >
                                        </div> :
                                        num
                                    })
                                    {type === 'custom' && _selectedIndex !== index &&
                                        <a href="javascript:;" className="delete" onClick={(e)=>{this.showDeleteLabelModal(item,e)}}>
                                            <img 
                                                src="./static/images/talent/delete.png" 
                                                alt="删除"
                                            />
                                        </a>
                                    }
                                </dd>
                            )
                        })}
                    </dl>
                </li>
                <li>
                    <div className="float-button" onClick={this.showCreateLabelModal}>
                        <Button />
                        <span>新建类别</span>
                    </div>
                </li>
                {/*新建分类标签Modal*/}
                <Modal
                    title="新建分类"
                    wrapClassName="vertical-center-modal talent-modal"
                    visible={createLabelModalVisible}
                    confirmLoading={createLableLoading}
                    onOk={this.createLabel}
                    onCancel={() => this.setCreateLabelModalVisible(false)}
                >   
                    <div style={{
                        margin: '0 auto',
                        width: 395,
                        position: 'relative'
                    }}>
                        <Input
                            ref="Input"
                            style={{
                                width: 395,
                                height: 40,
                                fontSize: '16px',
                                border: error ? '1px solid #ff3131' : ''
                            }}
                            value={lablename}
                            placeholder="请输入分类名称" 
                            onChange={this.handleChange}
                        />
                        {error &&
                            <div style={{
                                position: 'absolute',
                                fontSize: '12px',
                                marginTop: 3,
                                marginLeft: 5,
                                color: '#ff3131'
                            }}>
                                必填
                            </div>
                        }
                    </div>
                </Modal>
                {/*删除分类Modal*/}
                <Modal 
                    title="删除分类"
                    wrapClassName="vertical-center-modal talent-modal"
                    visible={deleteLabelModalVisible}
                    onOk={this.deleteLabel}
                    confirmLoading={deleteLabelLoading}
                    onCancel={()=>{this.setDeleteLabelModalVisible(false)}}
                >
                    <p style={{
                        paddingLeft: 20
                    }}>是否删除【{deleteLabelName}】此分类？</p>
                </Modal>
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    createLabelRes: state.Talent.createLabelRes,
    deleteLabelRes: state.Talent.deleteLabelRes
})
const mapDispatchToProps = dispatch => ({
    createLabel: bindActionCreators(Actions.TalentActions.createLabel, dispatch),
    deleteLabel: bindActionCreators(Actions.TalentActions.deleteLabel, dispatch),
    getTalentCategory: bindActionCreators(Actions.TalentActions.getTalentCategory, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftNavComponent);