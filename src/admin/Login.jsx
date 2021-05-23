import "./styles/login.css"
import imgenes from "./assets/leo.jpeg"
import { useState } from "react"
import { auth } from "../firebase";
export default () => {
    const [active, setActive] = useState(false);
    const [pass, setPass] = useState("");

    const hamdleClick = async function () {
        const mail = "leonardosm3.14@gmail.com";

        if (pass) {
            await auth.signInWithEmailAndPassword(mail, pass)
        }

    }

    return <div className="login">
        <div className="container-login">

            <div className="ti-desc">
                <div className="tit">Login</div>
                <div className="desc">Please sign in to continue</div>
            </div>
            <div className="cont-saludos">
                <span>
                    hello again,
                </span>
                <span>
                    TTCHANE2L
                </span>
                <img className="avatar-login" src={imgenes} alt="" />
            </div>
            <div className="cont-input" onMouseOverCapture={() => setActive(true)} >
                <label className={(active || pass.length > 0) && "active"}>PASSWORD</label>
                <span className={`ico-input ${(active || pass.length > 0) && "active"}`}><i className="fas fa-key"></i></span>
                <input
                    type="password"
                    className={(active || pass.length > 0) && "active"}
                    value={pass}
                    onChange={(re) => setPass(re.target.value)}
                    onBlurCapture={() => setActive(false)}
                />
            </div>
            <button onClick={hamdleClick} className="btn-login">
                LOGIN
            </button>
        </div>
    </div>
}