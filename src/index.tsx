import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IndexContextProvider } from './contexts/IndexContext';
import config from './configs/config';
import _ from 'lodash';
import withPages from './hocs/withPages';
import axios, { AxiosRequestConfig } from 'axios';
import '../node_modules/spectre.css/dist/spectre.min.css';
import '../node_modules/spectre.css/dist/spectre-icons.min.css';
import '../node_modules/spectre.css/dist/spectre-exp.min.css';
import '../node_modules/spectre.css/docs/dist/docs.min.css'

//正式環境
const init = async () => {
  console.log('initializing App ...');
  let routersData = config.routersData;
  const axioConfig: AxiosRequestConfig = {
    baseURL: config.mode === 0 ? config.backEndUrl : config.backEndUrl, //TODO
    data: localStorage.getItem('token') ? localStorage.getItem('token') : 'test',
    method: 'POST',
    url: '/index',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: false,
  }

  // await axios(axioConfig).then((response: any) => {
    let unAuthRoute: Array<any> = [];
      routersData = config.unAuthRoutersData;

      _.each(routersData, (v, k) => {
        const txnComponent: any = withPages(lazy(() => import(`./pages${v}`)));
        console.log('path ', v);
        unAuthRoute.push(<Route exact sensitive={true} path={v} key={v} component={txnComponent} />);
      })

    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<>loading...</>}>
          <HashRouter>
            <IndexContextProvider>
                <App unAuthRoute={unAuthRoute} />
            </IndexContextProvider>
          </HashRouter>
        </Suspense>
      </React.StrictMode>,
      document.getElementById('root')
    );
  // });
}

init();

//測試環境
// let route: Array<any> = [];
// _.each(config.unAuthRoutersData, (v, k) => {
//   const txnComponent: any = withPages(lazy(() => import(`./pages${v}`)));
//   console.log('path ', v);
//   route.push(<Route exact sensitive={true} path={v} key={v} component={txnComponent} />);
// })

// ReactDOM.render(
//   <React.StrictMode>
//     <Suspense fallback={<>loading...</>}>
//       <HashRouter>
//         <IndexContextProvider>
//           <App auth={false}>
//             <Switch>
//               {route}
//             </Switch>
//           </App>
//         </IndexContextProvider>
//       </HashRouter>
//     </Suspense>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
