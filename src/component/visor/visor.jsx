import "video.js/dist/video-js.css"
import "./visor.css";
import { useDownloadURL } from "react-firebase-hooks/storage"
import { storage } from "../../firebase";
import VideoPlayer from "./viedo";
import { useEffect, useRef, useState } from "react";


export default ({ onclose, state, video }) => {


  const [play, setPlay] = useState(false)
  const [volumen, setVolumen] = useState(false)

  const ReffVideo1 = useRef(null)
  const ReffVideo2 = useRef(null)

  const [vide, load, erro] = useDownloadURL(storage().ref(video))


  useEffect(() => {
    if (state === true && vide && ReffVideo1 && ReffVideo2) {

      ReffVideo2.current.play()
      ReffVideo1.current.play()

    }
  }, [state, vide, ReffVideo1, ReffVideo2])


  const chang = () => {
    if (!play) {
      ReffVideo2.current.play()
      ReffVideo1.current.play()
    }else{
      ReffVideo2.current.pause()
      ReffVideo1.current.pause()
    }
    setPlay(!play)
  }

  return (
    <section className="visor">
      {
        (state === true && vide) && (
          <>
            <div className="fonrt">
              <video
                ref={ReffVideo1}
                loop={false}
                onMouseOutCapture={() => console.log("capture out")}
                onMouseOverCapture={() => console.log("capture over")}
                className="ifr"
                muted={!volumen}
              >
                <source src={vide} typeof="video/mp4" />
              </video>
              <span id="play" onClick={chang}>
                {
                  play ? (
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
            <video loop={false} ref={ReffVideo2} className="back" muted>
              <source src={vide} typeof="video/mp4" />
            </video>
          </>
        )
      }
      {load && <span>cargando</span>}
      {erro && <span>error</span>}
      <span className="close-visor" onClick={() => onclose(false)}>
        <i className="fas fa-times-circle"></i>
      </span>

    </section >
  );
};
