import axios from "axios";
import React,{ createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ResidentContext = createContext();

const ResidentContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const [showResidentForm, setShowResidentForm] = useState(false)
    const [residents, setResidents] = useState([])

    const getAllResidents = async () => {

        try {
                
            const {data} = await axios.get(backendUrl + '/api/resident/all-resident')

            if(data.success) {
                setResidents(data.residents.sort((a, b) => Number(a.room)-Number(b.room)))
                console.log(data.residents);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    useEffect(() => {

        getAllResidents();

    }, [])

    const value = {
        showResidentForm, setShowResidentForm,
        getAllResidents, residents,
        
    }

    return (
        <ResidentContext.Provider value={value}>
            {props.children}
        </ResidentContext.Provider>
    )
}

export default ResidentContextProvider