import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { ResidentContext } from "./ResidentContext";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {createfeetoken} = useContext(AppContext)
    const [fees, setFees] = useState([]);

    const {rooms} = useContext(ResidentContext)
    const [listFees, setListFees] = useState([])
    const [allPaymentInfo, setAllPaymentInfo] = useState([
        {
          roomId: 123,
          payment: {
            paid: [
              {
                feeId: 123,
                name: "Ủng hộ miền trung",
                resident: "Trần văn lâm",
                admin: "Nguyễn Thị Lành",
                value: 123,
                isOptional: true,
                createdAt: "2024-11-23T15:30:00Z",
              },
            ],
            unpaid: [
              {
                feeId: 67,
                name: "Tiền nhà tháng 10/2009",
                value: 123,
              },
            ],
          },
        }
      ]);
    
    
    
      //load paymentinfo
      const loadPaymentInfo = async (roomId) => {
        try {
          const { data, status } = await axios.get(
            `${backendUrl}/api/rooms/${roomId}/pay`
          );
    
          if (status === 200) {
            return { roomId, payment: data }; // Return the new payment info
          } else {
            toast.error(`Error: ${status}`);
            return null; // Return null in case of error
          }
        } catch (error) {
          toast.error(error.response.data.message);
          return null; // Return null in case of exception
        }
      };
    
      const loadAllPaymentInfo = async () => {
        try {
          // Create an array of promises for all rooms
          const promises = rooms.map((room) => loadPaymentInfo(room.id));
    
          // Wait for all promises to resolve
          const results = await Promise.all(promises);
    
          // Filter out null responses
          const validResults = results.filter((result) => result !== null);
    
          // Update state with new payment info
          setAllPaymentInfo((prev) => [...prev, ...validResults]);
        } catch (error) {
          toast.error(`Failed to load payment info: ${error.response.data.message}`);
        }
      };
    



    //funtion to load
    const initListFees = () => {

        setListFees(fees.slice(0, 5))
        console.log(fees);
        

    }



    const getAllFees = async () => {

        try {

          const { data, status } = await axios.get(backendUrl + '/api/fees', {headers: {createfeetoken}})

          data.data.length > 0 && setFees(data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
          data.data.length > 0 && setListFees((data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)))
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }



// load for state
    useEffect(() => {

        getAllFees()
        loadAllPaymentInfo()

    }, [rooms])

    // useEffect(() => {
    //     if (fees.length > 0 && listFees.length === 0) {
    //         initListFees();
    //         console.log(fees);
    //     } else {
    //         setListFees(listFees.map(f => fees.find(temp => temp._id === f._id) ))
    //     }
    // }, [fees, rooms]);




    const value = {
        fees, setFees, getAllFees,
        listFees, setListFees, initListFees,
        allPaymentInfo, setAllPaymentInfo, loadAllPaymentInfo,

    }

    return (
        <FeeContext.Provider value={value}>
            {props.children}
        </FeeContext.Provider>
    )
}

export default FeeContextProvider