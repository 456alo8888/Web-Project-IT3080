/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, useToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FeeContext } from "../context/FeeContext";

const DashBoardInput = ({ fee, room, openModal }) => {
  const { displayedFees } = useContext(FeeContext);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const getPaymentInfo = () => {
    const entry = displayedFees.find(f => f.id === fee.id)?.values?.find(v => v.roomId === room.id);
    if (fee.isOptional) {
      if (entry) {
        setPaymentInfo({
          paidAmount: entry.paidAmount,
          needPay: fee.lowerBound,
          join: true,
          isPaid: true,
        });
      } else {
        setPaymentInfo({
          paidAmount: 0,
          needPay: fee.lowerBound,
          join: true,
          isPaid: false,
        });
      }
    } else {
      if (entry == null) {
        setPaymentInfo({
          paidAmount: 0,
          needPay: 0,
          join: false,
          isPaid: false
        });
      } else {
        setPaymentInfo({
          paidAmount: entry.paidAmount,
          needPay: entry.needAmount,
          join: true,
          isPaid: entry.isPaid,
        });
      }
    }
  };

  useEffect(() => {
    getPaymentInfo();
  }, [fee, room]);


  if (paymentInfo == null) {
    return (
      <div className="text-sm font-medium text-gray-400">đang tải...</div>
    );
  }
  if (!paymentInfo.join) {
    return (
      <div className="text-sm font-medium text-gray-400">không tham gia</div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-1 px-4 pr-8">
      {fee.isOptional && !paymentInfo.isPaid
        ? (
          <div className=" w-[80px] rounded-lg py-1 px-2 font-medium text-violet-400 border-b-2 border-b-violet-200 outline-none focus:border-b-violet-400 transition-all">
            {paymentInfo.paidAmount}
          </div>
        ) 
        : (
          <div className="text-gray-400 flex">
            <p
              className={` ${
                paymentInfo.isPaid ? "text-primary" : ""
              } font-medium min-w-[30px]`}
            >
              {paymentInfo.paidAmount}{" "}
            </p>
            <p className={` ${fee.isOptional ? "text-violet-400" : "text-red-300"} font-medium `}>
              / {paymentInfo.needPay}
            </p>
          </div>
        )
      }
      { 
        !paymentInfo.isPaid &&
        <button
          onClick={() => openModal(fee, room, paymentInfo)}
          className="p-1 px-3 text-sm rounded-full bg-secondary shadow-md text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 hover:-translate-x-1 transition-all"
        >
          nộp
        </button>
      }
    </div>
  );
};

export default DashBoardInput;
