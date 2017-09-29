import React , { Component } from "react";
import {Tooltip , message ,Button ,Input , Modal} from 'antd';
import Clipboard from "clipboard";

export default class VideoComponent extends Component {
    state = {
        videoUrl:"http://systemcove-10037104.cossh.myqcloud.com/51jrqcorp/1010113/51%E9%87%91%E8%9E%8D%E5%9C%88%E5%AE%A3%E4%BC%A0%E7%89%87%E6%9C%80%E7%BB%88%E7%89%88%2820170802%29-1920x1080.mp4"
    }
    componentDidMount(){
        this.clickBtn()
    }
    clickBtn = ()=>{
        const clipboard = new Clipboard('.btn');
        clipboard.on('success', function() {
            message.success('复制链接成功',3);
            clipboard.destroy();
        });
        clipboard.on('error', function(e) {
            message.error('复制链接失败，请刷新浏览器重新复制',3);
            clipboard.destroy();
        }); 
    }
    
    render () {
        const {videoUrl} = this.state;
        return (
            <div className="Corporate-video" style={{marginTop:16,background:'white'}}>
                <Tooltip
                    overlayClassName="Corporate-video-Tooltip" 
                    placement="topRight" 
                    title={<Input
                        style={{height:30}}
                        value={videoUrl}
                        addonAfter={
                            <Button
                                style={{height:30}} 
                                value='复制链接'
                                className="btn"
                                type="primary"
                                data-clipboard-action="copy"
                                data-clipboard-text={videoUrl}
                                onClick = {this.clickBtn}
                            >
                                复制链接
                            </Button>}
                    />}>
                    <div 
                        className="title box-border"    
                    >
                        企业视频
                    </div>
                </Tooltip>
                <video 
                    src={videoUrl}
                    controls="controls"
                    autoplay="autoplay"
                    loop
                    style={{width:244}}
                >
                </video>
            </div>
            
        )
    }
}