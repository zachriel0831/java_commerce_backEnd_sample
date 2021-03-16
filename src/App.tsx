import React, { useState, useContext, useEffect, ReactNode, lazy } from 'react';
import './css/App.css';
import MenuItem from './components/MenuItem';
import { IndexContext } from './contexts/IndexContext';
import { Switch } from 'react-router-dom';
import { useHistory, Route } from 'react-router-dom';
import _ from 'lodash';
import config from './configs/config';
import withPages from './hocs/withPages';
import utils from './utils/utils';

const App = ({ unAuthRoute }: { unAuthRoute: Array<ReactNode> }) => {
  const { contextState, setContextState } = useContext(IndexContext);
  const [sideMenuState, setSideMenuState] = useState<boolean>(false);
  let authRoutes: Array<String> = contextState.route;
  let history = useHistory();
  let hasCookie = utils.getCookie('matchingDatas');
  const closeSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (utils.isMobile()) {
      setSideMenuState(!sideMenuState);
    }
  }
  let route: Array<any> = [];
  let routes = config.routersData;
  let systemConfig: any = {};

  const goRouting = () => {
    let pathName = history.location.pathname as never;
    let skipReload = config.localReload;

    if (!skipReload.includes(pathName)) {
      history.push('/Home')

    }
  }


  useEffect(() => {
    //TODO
    _.each(routes, (v, k) => {
      const txnComponent: any = withPages(lazy(() => import(`./pages${v}`)));
      // console.log('path ', v);        
      route.push(<Route exact sensitive={true} path={v} key={v} component={txnComponent} />);
    })

    // utils.setCookie('matchingDatas', result);

    systemConfig.auth = true;
    systemConfig.route = route;
    systemConfig.theme = 'default';
    systemConfig.matchingDatas = hasCookie ? JSON.parse(hasCookie) : {}
    setContextState(systemConfig);

    goRouting();
  }, []);

  return (
    <div className='docs-container off-canvas off-canvas-sidebar-show'>
      <MenuItem toogleSideMenu={sideMenuState} history={history} />
      <div className='off-canvas-content' onClick={(e: React.MouseEvent<HTMLDivElement>) => closeSideMenu(e)}>
        <div className='docs-content'>
          <div className='container' style={{ maxWidth: '1800px' }}>
            {/* {children} */}
            <Switch>
              {authRoutes}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
