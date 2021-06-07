import "./styles/progressUpload.sass"
export const ProgressUpLoad = ({ porsentaje }) => {

    return <div className="ProgressUpload">

        <div className="containerProgress">
            <div className={`progress-bar progress-bar-${porsentaje}`}></div>
            <div className="commentProgress">
                <span>cargando las imagenes {porsentaje}%</span>
            </div>
        </div>
    </div>

}