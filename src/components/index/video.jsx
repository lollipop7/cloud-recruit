import React , { Component } from "react"

export default class VideoComponent extends Component {
    render () {
        return (
            <div className="Corporate-video" style={{marginTop:16,background:'white'}}>
                <div 
                    className="title box-border" 
                >企业视频</div>
                <video 
                    src="http://systemcove-10037104.cossh.myqcloud.com/51jrqcorp/1010113/%E6%B1%87%E4%BB%98%E5%A4%A9%E4%B8%8B%E4%BC%81%E4%B8%9A%E5%AE%A3%E4%BC%A0%E7%89%87-854x480.mp4" 
                    controls="controls"
                    autoplay="autoplay"
                    style={{width:244}}
                >
                </video>
            </div>
            
        )
    }
}