import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {

        });
        const f = () => {
            const v2 = document.querySelector(".back")
            console.log(v2.paused);
            if (v2.paused) {
                v2.play()
            } else {
                v2.pause()
            }

        }

        this.player.on("play", () => {
            f()
        })
        this.player.on("pause", () => {
            f()
        })
    }




    render() {
        return (
            <video ref={node => this.videoNode = node} className="ifr"></video>
        )
    }
}