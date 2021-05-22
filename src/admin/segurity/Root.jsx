import React from 'react';
import Loader from '../../component/Loader';

import { AuthContext } from '../context/auth';

class Root extends React.Component {

    render() {

        const {
            children,
        } = this.props;

        const {
            authFirebase,
        } = this.context;

        if (!authFirebase) {

            return <Loader />

        }

        return children;

    };

}

Root.contextType = AuthContext;

export default Root;