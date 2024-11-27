import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const [fees, setFees] = useState([
        {
            isOptional: true,
            lowerBound: 123,
            deadline: "2024-11-23T15:30:00Z",
            name: "Ủng hộ lũ lụt miền Trung",
            id: 123,
            createdAt: "2024-11-23T15:30:00Z",
            count: null,
            finished: 98
        }, 
        {
            isOptional: false,
            deadline: "2024-11-23T15:30:00Z",
            name: "Tiền nhà 11/2024",
            id: 166234,
            createdAt: "2024-11-23T15:30:00Z",
            count: 100,
            finished: 98
        },
        {
            isOptional: true,
            lowerBound: 123,
            deadline: "2024-11-23T15:30:00Z",
            name: "Ủng hộ lũ lụt miền Trung",
            id: 12143123,
            createdAt: "2024-11-23T15:30:00Z",
            count: null,
            finished: 98
        }, 
        {
            isOptional: false,
            deadline: "2024-11-23T15:30:00Z",
            name: "Tiền nhà 11/2024",
            id: 12345655,
            createdAt: "2024-11-23T15:30:00Z",
            count: 100,
            finished: 98
        },
        {
            isOptional: true,
            lowerBound: 5123,
            deadline: "2024-11-23T15:30:00Z",
            name: "Ủng hộ lũ lụt miền Trung",
            id: 52123,
            createdAt: "2024-11-23T15:30:00Z",
            count: null,
            finished: 98
        }, 
        {
            isOptional: false,
            deadline: "2024-11-23T15:30:00Z",
            name: "Tiền nhà 11/2024",
            id: 751234,
            createdAt: "2024-11-23T15:30:00Z",
            count: 100,
            finished: 98
        },
        {
            isOptional: true,
            lowerBound: 35123,
            deadline: "2024-11-23T15:30:00Z",
            name: "Ủng hộ lũ lụt miền Trung",
            id: 88123423,
            createdAt: "2024-11-23T15:30:00Z",
            count: null,
            finished: 98
        }, 
        {
            isOptional: false,
            deadline: "2024-11-23T15:30:00Z",
            name: "Tiền nhà 11/2024",
            id: 517234,
            createdAt: "2024-11-23T15:30:00Z",
            count: 100,
            finished: 98
        },
    ]);

    const [listFees, setListFees] = useState([])
    



    //funtion to load
    const initListFees = () => {

        setListFees(fees.slice(0, 5))

    }



    const getAllFees = async () => {

        try {

            const { data, status } = await axios.get(backendUrl + '/api/fees')

            if (status === 200) {

                data.data.length > 0 && setFees(data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            } else {
                toast.error(status)
            }
            console.log(data);


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }




// load for state
    useEffect(() => {

        getAllFees()

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

    }

    return (
        <FeeContext.Provider value={value}>
            {props.children}
        </FeeContext.Provider>
    )
}

export default FeeContextProvider