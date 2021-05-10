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



    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <video ref={node => this.videoNode = node} className="video-js ifr vjs-big-play-centered"></video>
        )
    }
}