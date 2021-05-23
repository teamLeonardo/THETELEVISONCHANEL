import { Redirect, Route, Switch } from "react-router"
import { configRouterAdmin } from "./configRouters"
import Main from "./Main"

export default function Admin() {
    return (
        <Switch>
            {
                configRouterAdmin.rout.map(({ path: pathChild, componente }, index) => {
                    return <Route key={index} exact path={configRouterAdmin.path + pathChild} component={() => <Main componente={componente} />} />
                })
            }
            <Redirect from={configRouterAdmin.path} to={configRouterAdmin.path + configRouterAdmin.rout[0].path} />
        </Switch>
    )
}