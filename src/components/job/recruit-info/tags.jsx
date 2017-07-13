import React, {Component} from 'react';

import { Tag, Input, Tooltip, Button } from 'antd';

export default class EditableTagGroup extends Component {
  state = {
    tags: [],
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  render() {
    const { tags } = this.state;
    return (
      <div>
         {
            tags.map((item,index)=>{
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

