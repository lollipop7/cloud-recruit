import React , { Component } from "react";
import {Tooltip , message} from 'antd';
import Clipboard from "clipboard";

export default class VideoComponent extends Component {
    state = {
        videoUrl:"http://systemcove-10037104.cossh.myqcloud.com/51jrqcorp/1010113/51%E9%87%91%E8%9E%8D%E5%9C%88%E5%AE%A3%E4%BC%A0%E7%89%87%E6%9C%80%E7%BB%88%E7%89%88%2820170802%29-1920x1080.mp4"
    }
    componentWillUnmount(){
        //复制简历分享地址
       const clipboard = new Clipboard('.title');
       clipboard.on('success', function() {
           message.success('复制成功',2);
       });

       clipboard.on('error', function(e) {
           message.error('复制失败',3);
       });    
   }
    render () {
        const {videoUrl} = this.state;
        return (
            <div className="Corporate-video" style={{marginTop:16,background:'white'}}>
                <Tooltip placement="topRight" title="点击复制视频分享链接">
                    <div 
                        className="title box-border" 
                        data-clipboard-action="copy"
                        data-clipboard-text={videoUrl}
                    >
                        企业视频
                    </div>
                </Tooltip>
                <video 
                    src={this.state.videoUrl}
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