import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { ResidentContext } from "./ResidentContext";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { createfeetoken } = useContext(AppContext)
  const [fees, setFees] = useState([]);

  const { rooms } = useContext(ResidentContext)
  const [listFees, setListFees] = useState([])
  const [allPaymentInfo, setAllPaymentInfo] = useState([]);



  //load paymentinfo
  const loadPaymentInfo = async (roomId) => {
    try {
      const { data, status } = await axios.get(
        `${backendUrl}/api/rooms/${roomId}/pay`
      );

      return { roomId, payment: data };
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

      const { data, status } = await axios.get(backendUrl + '/api/fees', { headers: { createfeetoken } })

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

  }, [/* rooms */])

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