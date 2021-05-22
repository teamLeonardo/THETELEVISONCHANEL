import "./FormContact.sass"
export default ()=>{
    return <div className="formContacto">
        <div className="formControlContact">
            <span>Name</span>
            <input type="text" required />
        </div>
        <div className="formControlContact">
            <span>Email</span>
            <input type="email" required />
        </div>
        <div className="formControlContact">
            <span>Matter</span>
            <input type="text" />
        </div>
        <div className="formControlContact">
            <span>Message</span>
            <textarea rows="3" cols="6" />
        </div>
        <button>Enviar</button>
    </div>
}