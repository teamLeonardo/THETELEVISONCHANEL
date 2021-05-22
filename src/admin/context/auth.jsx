
import React from "react"

import { auth } from "../../firebase"

function watchUserChange(callback) {

    const unsub = auth.onAuthStateChanged((user) => {
        if (user && !user.isAnonymous) {
            setTimeout(() => {
                callback({ idUser: user.uid, email: user.email })
            }, 1000);

        } else {
            callback(null)
        }

    })

    return unsub
}

export const AuthContext = React.createContext({});

export const AuthContextConsumer = AuthContext.Consumer;

export default class AuthContextProvider extends React.Component {

    state = {
        authFirebase: false,
        isLoggedIn: false,
        user: null,
        pageErrorMess: undefined
    }
    userWatchUnSub = undefined;

    componentDidMount() {
        this.userWatchUnSub = watchUserChange((userW) => {
            if (userW) {

                this.setState({
                    authFirebase: true,
                    isLoggedIn: true,
                    user: userW
                });


            } else {

                this.setState({
                    authFirebase: true,
                    isLoggedIn: false,
                    user: null,
                });

            }

        });
    }

    setMessError = (newMss) => {
        this.setState({ pageErrorMess: newMss })
    }

    componentWillUnmount() {

        if (this.userWatchUnSub) {
            this.userWatchUnSub();
        }

    }

    render() {

        return (

            <AuthContext.Provider
                value={{
                    ...this.state,
                    setMessError: this.setMessError
                }}
            >
                {this.props.children}
            </AuthContext.Provider>

        )

    }

};



