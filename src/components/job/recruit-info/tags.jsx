import React, {Component} from 'react';

import { Tag, Input, Tooltip, Button } from 'antd';

export default class EditableTagGroup extends React.Component {
  state = {
    tags: ['薪资要求高', '距离远', '经验丰富'],
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
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 9;
          const tagElem = (
            <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 9)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
      </div>
    );
  }
}

