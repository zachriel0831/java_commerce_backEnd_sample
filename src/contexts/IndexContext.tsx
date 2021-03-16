import React, { useState } from 'react';

type SetValue = (value: initSystemValues) => void;
type initSystemValues = {
    auth: boolean,
    theme: string,
    route: Array<String>,
    matchingDatas: any,
    userData: any,
}
interface InitState {
    contextState: initSystemValues;
    setContextState: SetValue;
}
console.log('initializing IndexContext ...');

const IndexContext = React.createContext<InitState>({

    contextState: {
        auth: false,
        theme: 'default',
        route: [],
        matchingDatas: {},
        userData:{}
    },
    setContextState: () => { }, //TODO
});

const IndexContextProvider: React.FC = props => {
    console.log('initializing IndexContextProvider ...');

    const [contextState, setContextState] = useState<initSystemValues>({
        auth: false,
        theme: 'default',
        route: [],
        matchingDatas: {},
        userData: {},
    });

    return (
        <IndexContext.Provider value={{
            contextState,
            setContextState
        }} >
            {props.children}
        </IndexContext.Provider >
    )
}

export { IndexContext, IndexContextProvider };
