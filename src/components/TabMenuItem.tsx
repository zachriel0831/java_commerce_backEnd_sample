import React from 'react';
// import { withRouter, useHistory } from 'react-router-dom';
import _ from 'lodash';
// import config from '../configs/config';
// import { IndexContext } from '../contexts/IndexContext';


//TODO take it to config
const TabMenuList = { 'Home': '推薦', 'Manual': '手動搜尋' };

const TabItem: React.FC<any> = (props) => {

    const setActive = (e: React.MouseEvent<HTMLAnchorElement>,itemKey:string) => {
        
        props.onClick(e,itemKey);
    }
    let activeFlag = props.activeMenu ? 'active' : '';

    return <li className={`tab-item ${activeFlag}`}><a href="javascript:void(0)" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => setActive(e,props.itemKey)}>{props.tabName}</a></li>
}
const TabMenuItem: React.FC<any> = (props) => {
    let menuList: Array<React.ReactNode> = [];
    _.each(TabMenuList, (v, k) => {

        let active: boolean = false;
        if (props.activeMenu === k) {
            active = true;
        }

        menuList.push(<TabItem itemKey={k} tabName={v} activeMenu={active} onClick={props.onClick} />)
    })

    return <>
        <ul className="tab tab-block">
            {menuList}
        </ul>
    </>
}

export default TabMenuItem;