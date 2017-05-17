import React, {Component} from 'react';

class StyleButton extends React.Component {

    onToggle = e => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

export default class BlockStyleControls extends Component {

    BLOCK_TYPES = [
        {label: 'H1', style: 'header-one',className:''},
        {label: 'H2', style: 'header-two',className:''},
        {label: 'H3', style: 'header-three',className:''},
        {label: 'H4', style: 'header-four',className:''},
        {label: 'H5', style: 'header-five',className:''},
        {label: 'H6', style: 'header-six',className:''},
        {label: 'Blockquote', style: 'blockquote',className:''},
        {label: 'UL', style: 'unordered-list-item',className:''},
        {label: 'OL', style: 'ordered-list-item',className:''},
        {label: 'Code Block', style: 'code-block',className:''}
    ]

    render() {
        const {editorState,onToggle} = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return (
            <div className="RichEditor-controls">
                {this.BLOCK_TYPES.map((type) =>
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={onToggle}
                        style={type.style}
                    />
                )}
            </div>
        )
    }
}