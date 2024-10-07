import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const [fees, setFees] = useState([])
    const [listFees, setListFees] = useState([])
    const [histories, setHistories] = useState([])



    //funtion to load
    const initListFees = () => {

        setListFees(fees.slice(0, 5))

    }



    const getAllFees = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/fee/all-fee')

            if (data.success) {
                setFees(data.fees.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } else {
                toast.error(error.message)
            }
            console.log(data);


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    const getAllHistories = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/history/all-history')

            if (data.success) {
                setHistories(data.histories.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt)))
            } else {
                toast.error(error.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }





// load for state
    useEffect(() => {

        getAllFees()
        getAllHistories()

    }, [])

    useEffect(() => {
        if (fees.length > 0 && listFees.length === 0) {
            initListFees();
            console.log(fees);
        } else {
            setListFees(listFees.map(f => fees.find(temp => temp._id === f._id) ))
        }
    }, [fees]);




    const value = {
        fees, setFees, getAllFees,
        listFees, setListFees, initListFees,
        histories, getAllHistories,

    }

    return (
        <FeeContext.Provider value={value}>
            {props.children}
        </FeeContext.Provider>
    )
}

export default FeeContextProvider