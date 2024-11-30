import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { ResidentContext } from "./ResidentContext";

export const FeeContext = createContext()

const FeeContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [allFees, setAllFees] = useState([]);
  const [displayedFees, setDisplayedFees] = useState([])

  //load paymentinfo
  // const loadRoomPaymentInfo = async (roomId) => {
  //   try {
  //     const { data, status } = await axios.get(
  //       `${backendUrl}/api/rooms/${roomId}/pay`
  //     );

  //     return { roomId, payment: data };
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //     return null; // Return null in case of exception
  //   }
  // };

  const loadDisplayedFeesInfo = async (feeIds) => {
    if (feeIds == null || feeIds.length == 0) {
      return [];
    }
    try {
      const searchParams = `?${feeIds.map(id => `id=${id}`).join('&')}`
      const { data, status } = await axios.get(
        `${backendUrl}/api/fees/status` + searchParams,
      );

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return [];
    }
  }

  const changeDisplayedFee = async (feeId, index) => {
    const newFee = (await loadDisplayedFeesInfo([feeId]))[0];
    const newFees = [...displayedFees];
    newFees[index] = newFee;
    setDisplayedFees(newFees)
  }

  const getFeesData = async () => {

    try {

      let { data: allFeesData } = await axios.get(backendUrl + '/api/fees');
      allFeesData = allFeesData.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      allFeesData.length > 0 && setAllFees(allFeesData);
      const displayedData = await loadDisplayedFeesInfo(allFeesData.slice(0, 5).map(f => f.id));
      displayedData.length > 0 && setDisplayedFees(displayedData)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }

  }



  // load for state
  useEffect(() => {
    getFeesData()

  }, [/* rooms */])

  const value = {
    allFees, getFeesData,
    displayedFees, changeDisplayedFee
  }

  return (
    <FeeContext.Provider value={value}>
      {props.children}
    </FeeContext.Provider>
  )
}

export default FeeContextProvider