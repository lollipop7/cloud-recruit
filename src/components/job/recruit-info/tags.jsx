import React, {Component} from 'react';

import { Tag, Input, Tooltip, Button } from 'antd';

// redux
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'actions';

 class EditableTagGroup extends Component {

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  render() {
    const {data,modalVisible,currentStage} = this.props,
          {thelable} = currentStage,
          arr = thelable?thelable.split(","):[]
    
    return (
      <div>
        {   
          arr.map((item,index)=>{
                const isLongTag = item.length > 20;
                return (
                    <Tag 
                        key={item} 
                        closable
                        onClose={()=>this.onTagClose(item)}
                    >
                        {isLongTag ? `${item.slice(0, 40)}...` : item}
                    </Tag>
                );
            })
        }
         
      </div>
    );
  }
}
const mapStateToProps = state => ({
    currentStage : state.Resume.currentStage
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableTagGroup);

