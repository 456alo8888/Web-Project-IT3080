import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";
import { ResidentContext } from "./ResidentContext";

export const FeeContext = createContext();

const FeeContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [allFees, setAllFees] = useState([]);
  const [displayedFees, setDisplayedFees] = useState([]);
  const [staticData, setStaticData] = useState( {
    totalFeeCount: 34,        // Tổng phí đã tạo
    totalFeeFinished: 20,     // Tổng phí đã xong
    yearlyFeeCount: 23,       // Tổng phí trong năm nay
    yearlyFeeFinished: 2,     // Tổng phí đã xong trong năm
    monthlyFeeCount: 5,       // Tổng phí trong tháng
    monthlyFeeFinished: 0,    // Tổng phí đã xong trong tháng

    residentCount: 400,       // Tổng số cư dân
    finishedRoomCount: 14,    // Số phòng hoàn thiện hết phí
    nonFinishedRoomCount: 2,  // Số phòng chưa hoàn thiện hết phí (có thể < (số phòng - số phòng hoàn thiện), do có một số phòng trống)
    topMonthlyFees: [
        {
            id: 45,
            name: "Tiền đi ngủ",
            paymentCount: 9,
        },
        {
            id: 10,
            name: "Tiền đi net",
            paymentCount: 5,
        },
        {
            id: 45,
            name: "Tiền đi ngủ",
            paymentCount: 4,
        },
        {
            id: 10,
            name: "Tiền đi net",
            paymentCount: 3,
        },
        {
            id: 45,
            name: "Tiền đi ngủ",
            paymentCount: 2,
        },
        {
            id: 10,
            name: "Tiền đi net",
            paymentCount: 1,
        },
    ], // Danh sách các phí được nộp nhiều nhất trong tháng, thứ tự giảm dần theo số lần nộp
});
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
  const loadStaticData = async () => {
    try {
      const { data, status } = await axios.get(
        `${backendUrl}/api/fees/stats`
      );

      setStaticData(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const loadDisplayedFeesInfo = async (feeIds) => {
    if (feeIds == null || feeIds.length == 0) {
      return [];
    }
    try {
      const searchParams = `?${feeIds.map((id) => `id=${id}`).join("&")}`;
      const { data, status } = await axios.get(
        `${backendUrl}/api/fees/status` + searchParams
      );

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return [];
    }
  };

  const changeDisplayedFee = async (feeId, index) => {
    const newFee = (await loadDisplayedFeesInfo([feeId]))[0];
    const newFees = [...displayedFees];
    newFees[index] = newFee;
    setDisplayedFees(newFees);
  };

  const getFeesData = async () => {
    try {
      let { data: allFeesData } = await axios.get(backendUrl + "/api/fees");
      allFeesData = allFeesData.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      allFeesData.length >= 0 && setAllFees(allFeesData);
      const displayedData = await loadDisplayedFeesInfo(
        allFeesData.slice(0, 5).map((f) => f.id)
      );
      if (displayedFees.length == 0) {
        displayedData.length > 0 && setDisplayedFees(displayedData.reverse());
      } else {
        const latestData = await loadDisplayedFeesInfo(
          displayedFees.map((f) => f.id)
        );
        setDisplayedFees(
          displayedFees.map((f) => latestData.find((d) => d.id === f.id))
        );
      }
      console.log(allFeesData);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // load for state
  useEffect(
    () => {
      getFeesData();
      loadStaticData()
    },
    [
      /* rooms */
    ]
  );

  const value = {
    allFees,
    getFeesData,
    displayedFees,
    changeDisplayedFee,
    staticData,
  };

  return (
    <FeeContext.Provider value={value}>{props.children}</FeeContext.Provider>
  );
};

export default FeeContextProvider;
