import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [username, setUsername] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : '')
    const [adminId, setAdminId] = useState(localStorage.getItem('adminId') ? localStorage.getItem('adminId') : '')

    const [admins, setAdmins] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [updatefeetoken, setUpdatefeetoken] = useState(localStorage.getItem('updatefeetoken') ? localStorage.getItem('updatefeetoken') : '');
    const [createfeetoken, setCreatefeetoken] = useState(localStorage.getItem('createfeetoken') ? localStorage.getItem('createfeetoken') : '');
    const [updateresidenttoken, setUpdateresidenttoken] = useState(localStorage.getItem('updateresidenttoken') ? localStorage.getItem('updateresidenttoken') : '');
    const [receivetoken, setReceivetoken] = useState(localStorage.getItem('receivetoken') ? localStorage.getItem('receivetoken') : '');
    const [roottoken, setRoottoken] = useState(localStorage.getItem('roottoken') ? localStorage.getItem('roottoken') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL



    const getAllAdmins = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-admin', { headers: { roottoken } })

            if (data.success) {
                setAdmins(data.admins.filter(a => a.isRoot === false))
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }

    }

    useEffect(() => {
        if (roottoken)
            getAllAdmins()
    }, [])




    const value = {
        username, setUsername,
        token, setToken, 
        updatefeetoken, setUpdatefeetoken, 
        createfeetoken, setCreatefeetoken, 
        updateresidenttoken, setUpdateresidenttoken, 
        receivetoken, setReceivetoken, 
        roottoken, setRoottoken,
        backendUrl,
        admins, getAllAdmins,
        adminId, setAdminId

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider