import { useHistory } from "react-router"
import { configRouterAdmin } from "./configRouters"
import "./styles/main.sass"

const Item = ({ className, name, onClick ,active }) => {
    return <div className={`item ${active && "active"}`} onClick={() => onClick()}>
        <i className={className}></i>
        <span>{name}</span>
    </div>
}

export default ({ componente: Component }) => {

    const { push } = useHistory()
    return <div className="conta-main">
        <section className="container">
            <Component />
        </section>
        <div className="bottom-bar">
            {
                configRouterAdmin.rout.map(({ name, classs, path }, index) => {
                    const l = window.location.pathname
                    console.log(l);
                    return <Item
                        key={index}
                        active={
                            (l === (configRouterAdmin.path + path)) ? true : false
                        }
                        name={name}
                        className={classs}
                        onClick={() => push(configRouterAdmin.path + path)}
                    />
                })
            }
        </div>
    </div>
}