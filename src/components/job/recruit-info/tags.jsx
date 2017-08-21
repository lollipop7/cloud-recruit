import React, {Component} from 'react';

import { Tag, Input, Tooltip, Button } from 'antd';
import find from 'lodash/find';

export default class EditableTagGroup extends Component {
  render() {
    const  tags = this.props.data;
    const data = find(tags,item=>{
                return item.iscurrentstage === '1';
            })
    return (
      <div>
        {   
          tags!=undefined && (data.thelable ? data.thelable.split(","):[]).map((item,index)=>{
                const isLongTag = item.length > 20;
                return (
                    <Tag 
                        key={item} 
                        closable
                        onClose={()=>this.onTagClose(item)}
                    >
                        {isLongTag ? `${item.slice(0, 40)}...` : item}
                    </Tag>
                )
            })
        }
        
      </div>
    );
  };
};
