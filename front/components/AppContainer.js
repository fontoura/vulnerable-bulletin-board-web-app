import React, { createContext, useEffect } from 'react';

const AppContext = createContext({
    sessionData: null,
    initialData: null
});

export { AppContext };

export default function AppContainer(props) {
    useEffect(() => {
        setInterval(() => {
            // TODO load session from server
        }, 1000);
    }, [])
    const { sessionData, initialData } = window;
    return <AppContext.Provider value={{ sessionData, initialData }}>
        { props.children }
    </AppContext.Provider>;
}
