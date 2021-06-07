import { useRef, useState } from "react"
import { db } from "../../firebase"
import { ProgressUpLoad } from "../progresUpload"
import { subirArchivo, toBase64 } from "../subida"

export default () => {

    const [subiendo, setSubiendo] = useState(false)
    const [porsentaje, setPorsentaje] = useState(0)

    const [title, setTitle] = useState("")
    const [urlMiniatura, setUrlMiniatura] = useState(false)
    const [urlVideo, setUrlVideo] = useState(false)

    const refVideo = useRef()
    const refImg = useRef()

    const refInputImg = useRef(null)
    const refInputVideo = useRef(null)

    const HandleAdd = () => {
        setSubiendo(true)
        const data = {
            urlMiniatura: "",
            title: title,
            urlVideo: "",
        }
        subirArchivo("imagenes",
            urlMiniatura,
            pross => { setPorsentaje(pross); },
            error => { console.log(error); setSubiendo(false); },
            complete => {
                data.urlMiniatura = complete;
                subirArchivo("videos",
                    urlVideo,
                    pross1 => { setPorsentaje(pross1); },
                    error1 => { console.log(error1); setSubiendo(false); },
                    async complete1 => {
                        data.urlVideo = complete1;
                        await db.collection("videos").add(data);
                        setPorsentaje(0)
                        setSubiendo(false)
                    })
            })


    }

    return (
        <>
            <div className="addVideo">

                <div className="form-controll">
                    <input
                        type="text"
                        value={title}
                        placeholder="escribe title"
                        onChange={({ target }) => {
                            setTitle(target.value)
                        }}
                    />
                </div>
                <div className="form-controll">
                    <div className="imagen-c">
                        <span onClick={() => { refInputImg.current.click() }}>
                            <i className="fas fa-file-upload"></i>
                            <p>subir imagen</p>
                        </span>
                        <img
                            ref={refImg}
                            style={{ display: !urlMiniatura ? "none" : "block" }}
                            alt=""
                        />
                    </div>
                    <input
                        accept="image/*"
                        type="file"
                        style={{ display: "none" }}
                        ref={refInputImg}
                        onChange={(event) => {
                            let file = event.target.files[0];
                            toBase64(file).then((res) => {
                                refImg.current.src = res;
                                setUrlMiniatura(file)
                            })
                        }}

                    />

                </div>
                <div className="form-controll">
                    <div className="video-c">
                        <span onClick={() => { refInputVideo.current.click() }}>
                            <i className="fas fa-file-upload"></i>
                            <p>subir video</p>
                        </span>
                        <video
                            style={{ display: !urlVideo ? "none" : "block" }}
                            autoPlay
                            muted
                            ref={refVideo}
                        ></video>
                    </div>
                    <input
                        accept="video/*"
                        style={{ display: "none" }}
                        ref={refInputVideo}
                        type="file"
                        onChange={(event) => {
                            let file = event.target.files[0];
                            let blobURL = URL.createObjectURL(file);
                            if (refVideo) {
                                refVideo.current.src = blobURL
                                setUrlVideo(file)
                            }
                        }} />
                </div>
                <div className="form-controll">
                    <button onClick={HandleAdd}>Agregar</button>
                </div>
            </div>
            {(subiendo) && <ProgressUpLoad porsentaje={porsentaje} />}
        </>
    )
}