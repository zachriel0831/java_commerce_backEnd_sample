import React from 'react';
// import { IndexContext } from '../contexts/IndexContext'
import _ from 'lodash';
// import { useTranslation } from "react-i18next";
// import { useHistory,HashRouter, Route, Switch, RouteComponentProps  } from 'react-router-dom';
// import withPages from '../hocs/withPages';
// import config from '../configs/config';


const LoginOut: React.FC<any> = (props) => {

    localStorage.removeItem('token');

    window.location.reload();

    return <>
        <div>LoginOut</div>
        <div></div>


    </>
}

export default LoginOut;