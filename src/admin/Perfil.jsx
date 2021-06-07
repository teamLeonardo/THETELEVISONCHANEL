import { useRef, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import "./styles/perfil.sass"
import { subirArchivo } from "./subida"
export default () => {
    const refFile = useRef()
    const [currentImg, setCurrentImg] = useState()
    const [datos, load, error] = useCollection(db.collection("datos"), {
        snapshotListenOptions: { includeMetadataChanges: true }
    })


    const handleClickActualizar = () => {
        if (refFile) {
            refFile.current.click()

        }
    }



    const handleChangeImagen = () => {
        if (refFile) {

            const file = refFile.current.files[0];
            if (file) {
                subirArchivo(
                    "imagenes",
                    file,
                    progress => { console.log(progress) },
                    error => { console.log(error) },
                    complete => {
                        db.collection("datos")
                            .doc("032rWKBsYCGY7eUVaIae")
                            .update({ imagen: complete }).then(() => {
                                setCurrentImg(complete)
                            })
                    }
                )
            }
        } else {
            console.log("basio referencia");
        }
    }



    return <div className="perfil-cont">
        {load && "....cargando"}
        {error && "....Error"}
        {
            datos && <>
                <div className="perfil-img-avatar">
                    <img
                        src={currentImg ? currentImg : datos.docs[0].data().imagen}
                        style={{ width: "100px", height: "100px", border: "1px" }}
                        className="avatar"
                        onClick={handleClickActualizar}
                        alt=""
                    />
                    <input
                        style={{ display: "none" }}
                        onChange={handleChangeImagen}
                        type="file"
                        ref={refFile}
                        accept="image/*"
                        multiple={false}
                    />
                </div>
                <div className="perfil-nombre">
                    <span style={{ display: "none" }}>{datos.docs[0].data().nombre}</span>
                    <input
                        type="text"
                        defaultValue={datos.docs[0].data().nombre}
                        className="input-nombre"
                    />
                </div>
                <div className="perfil-descripcion">
                    <span style={{ display: "none" }}>{datos.docs[0].data().descripcion}</span>
                    <textarea
                        defaultValue={datos.docs[0].data().descripcion}
                        className="input-descripcion"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <div className="perfil-sociales">
                    <div className="control-social">
                        <span style={{ display: "none" }}>url-face</span>
                        <input type="text" className="input-face" />
                    </div>
                </div>
            </>
        }
    </div>
}