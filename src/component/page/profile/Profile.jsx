export default ({value}) => {
    return (
        <div className="profile">
            <div
                className="avatar"
                style={{
                    background: `url("${value.docs[0].data().imagen
                        }") center center/cover`
                }}
            ></div>
            <div className="title"> {value.docs[0].data().nombre}</div>
            <div className="description">
                {value.docs[0].data().descripcion}
            </div>
          
        </div>
    )
}