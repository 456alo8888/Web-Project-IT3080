import React, { createContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [username, setUsername] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : '')

    
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [updatefeetoken, setUpdatefeetoken] = useState(localStorage.getItem('updatefeetoken') ? localStorage.getItem('updatefeetoken') : '');
    const [createfeetoken, setCreatefeetoken] = useState(localStorage.getItem('createfeetoken') ? localStorage.getItem('createfeetoken') : '');
    const [updateresidenttoken, setUpdateresidenttoken] = useState(localStorage.getItem('updateresidenttoken') ? localStorage.getItem('updateresidenttoken') : '');
    const [roottoken, setRoottoken] = useState(localStorage.getItem('roottoken') ? localStorage.getItem('roottoken') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL



    const value = {
        username, setUsername,
        token, setToken, updatefeetoken, setUpdatefeetoken, createfeetoken, setCreatefeetoken, updateresidenttoken, setUpdateresidenttoken, roottoken, setRoottoken,
        backendUrl,

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider