import "./visor.css";
import { useDownloadURL } from "react-firebase-hooks/storage"
import { storage } from "../../firebase";
import { useRef, useState } from "react"

export default ({ onclose, state, video }) => {
  const [vide, load, erro] = useDownloadURL(storage().ref(video))
  const [btnshow, setBtnShow] = useState(0)

  // console.log(FonrtVideoRef.current);
  const PlayInpause = (e) => {
    const v2 = document.querySelector(".back"),
      v1 = document.querySelector(".ifr");
    if (v1.paused && v2.paused) {
      v1.play()
      v2.play()
      setBtnShow(1)
    }
    else {
      v1.pause()
      v2.pause()
      setBtnShow(2)
    }


  }
  return (
    <section className="visor">
      {
        (state === true && vide) && (
          <>
            <div className="fonrt" onMouseOver={() => setBtnShow(2)} onMouseOut={() => setBtnShow(0)}>
              <video className="ifr" autoPlay onPlayCapture={(e) => { console.log(e); }} >
                <source src={vide} typeof="video/mp4" />
              </video>
              {
                (btnshow !== 0) && (
                  <span onClick={PlayInpause}>
                    {
                      btnshow === 2 ?
                        <i className="fas fa-play"></i>
                        : btnshow === 1 &&
                        <i className="fas fa-pause"></i>
                    }
                  </span>
                )
              }
            </div>
            <video className="back" autoPlay muted>
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
