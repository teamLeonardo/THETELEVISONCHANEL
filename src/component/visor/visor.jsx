import "./visor.css";
import { useDownloadURL } from "react-firebase-hooks/storage"
import { storage } from "../../firebase";
import { useEffect, useRef, useState } from "react";


export default ({ onclose, state, video }) => {


  const [play, setPlay] = useState(false)
  const [volumen, setVolumen] = useState(false)

  const ReffVideo1 = useRef(null)



  useEffect(() => {
    if (state === true && video && ReffVideo1) {

      chang()

    }
    return () => {
      setPlay(false)
      setVolumen(false)
    }
  }, [state, video, ReffVideo1])


  const chang = () => {
    if (ReffVideo1) {
      if (ReffVideo1.current.paused) {
        ReffVideo1.current.play()
      } else {
        ReffVideo1.current.pause()
      }
      setPlay(!play)
    }
  }

  function setOnPlay() {
    const canvas = document.getElementById('camba');
    if (canvas && ReffVideo1) {
      const ctx = canvas.getContext('2d');
      var $this = ReffVideo1.current; //cache
      $this.addEventListener('loadedmetadata', function () {
        canvas.width = $this.videoWidth;
        canvas.height = $this.videoHeight;
      });

      canvas.height = $this.videoHeight;
      (function loop() {
        if (!$this.paused && !$this.ended) {
          ctx.drawImage($this, 0, 0);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      })();
    }
  }

  return (
    <section className="visor">
      {
        (state === true && video) && (
          <>
            <div className="fonrt">
              <video
                ref={ReffVideo1}
                loop={false}
                style={{backgroundColor: "#000"}}
                onPlay={setOnPlay}
                onMouseOutCapture={() => console.log("capture out")}
                onMouseOverCapture={() => console.log("capture over")}
                className="ifr"
                onEndedCapture={() => setPlay(false)}
                muted={!volumen}
              >
                <source src={video} typeof="video/mp4" />
              </video>
              <span id="play" onClick={chang}>
                {
                  !play ? (
                    <i className="fas fa-play"></i>
                  ) : (
                    <i className="fas fa-pause"></i>
                  )
                }
              </span>
              <span id="volumen" onClick={() => setVolumen(!volumen)}>
                {
                  volumen ? (
                    <i className="fas fa-volume-up"></i>
                  ) : (
                    <i className="fas fa-volume-mute"></i>
                  )
                }
              </span>
            </div>
            <canvas id="camba" className="back" />
          </>
        )
      }
      <span className="close-visor" onClick={() => onclose(false)}>
        <i className="fas fa-times-circle"></i>
      </span>

    </section >
  );
};
