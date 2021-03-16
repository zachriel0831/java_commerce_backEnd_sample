import React, { ReactNode, useContext, AnchorHTMLAttributes, useRef, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import _ from 'lodash';
import config from '../configs/config';
import { IndexContext } from '../contexts/IndexContext';

type ItemProps = {
    key?: string,
    itemName: string,
    itemLink: string,
    icon?: string,
    style?: StyleSheet
    history: any
}

type MenuItemProps = {
    auth: boolean,
    history: History
}

const Item: React.FC<ItemProps> = ({ history, itemName, itemLink }) => {

    const itemLinkClick = () => {
        history.push(itemLink);
    }

    let url: string = window.location.hash.replace('#/', '');
    return <div className="accordion"><label className={`accordion-header c-hand`} onClick={() => itemLinkClick()}>{itemName}</label></div>
}
const MenuItem: React.FC<any> = (props) => {

    const { contextState } = useContext(IndexContext);
    const sideBarRef = useRef<any>();
    const openSideMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        let sideBarRefs = sideBarRef.current;
        sideBarRefs.style.transform = 'translateX(0)';
    }

    let routersData: Array<string> = contextState.auth ? config.routersData : config.unAuthRoutersData;
    let menuBlock: Array<ReactNode> = [];
    let pathName = window.location.hash;
    if (pathName.indexOf('/PasswordRecovery') !== -1) {

        menuBlock.push(<Item history={props.history} key={`menuItem_PasswordRecovery`} itemName={'PasswordRecovery'} itemLink='/PasswordRecovery' />)
    } else {
        _.each(routersData, (v, k) => {
            let name = v.replace(/\//g, '');
            if (name === 'FirstLogin' || name === 'PasswordChange' || name === 'RecoveryCenter' || name === 'PasswordRecovery') {
                return;
            }
            menuBlock.push(<Item history={props.history} key={`menuItem_${v}`} itemName={name} itemLink={v} />)
        })
    }


    useEffect(() => {
        let sideBarRefs = sideBarRef.current;
        sideBarRefs.style.transform = '';

    }, [props.toogleSideMenu])

    return <><div className="docs-navbar">
        <a className="off-canvas-toggle btn btn-link btn-action" href="javascript:void(0)" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => openSideMenu(e)}><i className="icon icon-menu"></i></a>
        <div className="btns d-flex">
        </div>
    </div>
        <div ref={sideBarRef} className="docs-sidebar off-canvas-sidebar" id="sidebar">
            <div className='docs-brand'>
                <a className="docs-logo" href="/">
                    <h2>eCommerce</h2>
                </a>
            </div>
            <div className="docs-nav">
                <div className="accordion-container">
                    {menuBlock}
                </div>
            </div>
        </div>
        <a className="off-canvas-overlay" href="#close"></a></>
}

export default withRouter(MenuItem);