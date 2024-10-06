import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const [fees, setFees] = useState([])

    const getAllFees = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/fee/all-fee')

            if (data.success) {
                setFees(data.fees.sort((a, b) => b.createdAt - a.createdAt))
            } else {
                toast.error(error.message)
            } 
            console.log(data);
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }



    useEffect(() => {

        getAllFees()

    }, [])




    const value = {
        fees, setFees, getAllFees,

    }

    return (
        <FeeContext.Provider value={value}>
            {props.children}
        </FeeContext.Provider>
    )
}

export default FeeContextProvider