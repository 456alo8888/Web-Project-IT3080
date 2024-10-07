import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [username, setUsername] = useState(localStorage.getItem('username') ? localStorage.getItem('username') : '')
    const [admins, setAdmins] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [updatefeetoken, setUpdatefeetoken] = useState(localStorage.getItem('updatefeetoken') ? localStorage.getItem('updatefeetoken') : '');
    const [createfeetoken, setCreatefeetoken] = useState(localStorage.getItem('createfeetoken') ? localStorage.getItem('createfeetoken') : '');
    const [updateresidenttoken, setUpdateresidenttoken] = useState(localStorage.getItem('updateresidenttoken') ? localStorage.getItem('updateresidenttoken') : '');
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
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getAllAdmins()
    }, [])




    const value = {
        username, setUsername,
        token, setToken, updatefeetoken, setUpdatefeetoken, createfeetoken, setCreatefeetoken, updateresidenttoken, setUpdateresidenttoken, roottoken, setRoottoken,
        backendUrl,
        admins, getAllAdmins,

    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider