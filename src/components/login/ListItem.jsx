import React, {Component} from 'react';

export default class ListItemComponents extends Component {

    constructor() {
        super();
        this.onChange = this._onChange.bind(this);
    }

    _onChange(event) {
        const {onChange} = this.props;
        if(onChange){
            onChange(event);
        }
    }

    render() {
        const {title="",inputType="text",placeholder="",imgSrc=''} = this.props;

        return (
            <li className="table">
                <div className="table-row">
                    <div className="table-cell">
                        <span style={{backgroundImage:`url(${imgSrc})`}}>
                            {title}
                        </span>
                    </div>
                    <div className="table-cell">
                        <input 
                            type={inputType} 
                            placeholder={placeholder} 
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </li>
        );
    }
}