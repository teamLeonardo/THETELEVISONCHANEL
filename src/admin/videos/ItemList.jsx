export default ({data , onEdit , onDelete})=>{
    return <div className="item-video "  >
        <ul>
            {
                Object.values(data).map((val , ind)=>{
                    return <li key={ind} >{val}</li>
                })
            }
        </ul>
        <br />
        <button onClick={()=>{ onEdit(data) }}>editar</button>
        <button onClick={()=>{ onDelete(data) }}>eliminar</button>
    </div>
}