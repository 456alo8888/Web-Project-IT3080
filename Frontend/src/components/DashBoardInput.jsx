/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, useToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FeeContext } from "../context/FeeContext";

const DashBoardInput = ({ fee, room, openModal }) => {
  const { backendUrl } = useContext(AppContext);
  const { allPaymentInfo } = useContext(FeeContext);
  const [paymentInfo, setPaymentInfo] = useState({
    payed: 200,
    needPay: 200,
    havethisfee: true,
  });

  // const getPaymentInfo = async () => {
  //   try {
  //     const { data, status } = await axios.get(
  //       backendUrl + `/api/rooms/${room?.id}/pay`
  //     );

  //     if (status === 200) {
  //       if (fee.isOptional) {
  //         const val = data.paid?.find((e) => e.feeId === fee.id)?.value || 0;
  //         setPaymentInfo((prev) => ({
  //           ...prev,
  //           payed: val,
  //           havethisfee: true,
  //         }));
  //       } else {
  //         const info = data.paid?.find((e) => e.feeId === fee.id);
  //         info
  //           ? setPaymentInfo({
  //               payed: info.value,
  //               needPay: info.value,
  //               havethisfee: true,
  //             })
  //           : setPaymentInfo({
  //               payed: 0,
  //               needPay: data.unpaid?.find((e) => e.id === fee.id)?.value,
  //               havethisfee: true,
  //             });
  //       }
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const getPaymentInfo = () => {
    if (fee.isOptional) {
      const entry1 = allPaymentInfo.find(
        (paymentInfo) => paymentInfo.roomId === room.id
      );
      const entry2 = entry1?.payment?.paid?.find(
        (record) => record.feeId === fee.id
      );
      if (entry2) {
        setPaymentInfo({
          payed: entry2.value,
          needPay: 0,
          havethisfee: true,
        });
      } else {
        setPaymentInfo({
          payed: 0,
          needPay: 0,
          havethisfee: true,
        });
      }
    } else {
      const entry1 = allPaymentInfo.find(
        (paymentInfo) => paymentInfo.roomId === room.id
      );
      const entry2 = entry1?.payment?.paid?.find(
        (record) => record.feeId === fee.id
      );
      if (entry2) {
        setPaymentInfo({
          payed: entry2.value,
          needPay: entry2.value,
          havethisfee: true,
        });
      } else {
        const entry3 = entry1?.payment?.unpaid.find(
          (record) => record.feeId === fee.id
        );
        if (entry3) {
          setPaymentInfo({
            payed: 0,
            needPay: entry3.value,
            havethisfee: true,
          });
        } else {
          setPaymentInfo({
            payed: 0,
            needPay: 0,
            havethisfee: false,
          });
        }
      }
    }
  };

  useEffect(() => {
    getPaymentInfo();
  }, [fee, room]);

  if (!paymentInfo.havethisfee) {
    return (
      <div className="text-sm font-medium text-gray-400">không tham gia</div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-1 px-4 pr-8">
      {fee.isOptional ? (
        <div className=" w-[80px] rounded-lg py-1 px-2 font-medium text-violet-400 border-b-2 border-b-violet-200 outline-none focus:border-b-violet-400 transition-all">
          {paymentInfo.payed}
        </div>
      ) : (
        <div className="text-gray-400 flex">
          <p
            className={` ${
              paymentInfo.payed > 0 ? "text-primary" : ""
            } font-medium min-w-[30px]`}
          >
            {paymentInfo.payed}{" "}
          </p>
          <p className={` ${"text-red-300"} font-medium `}>
            / {paymentInfo.needPay}
          </p>
        </div>
      )}
      <button
        onClick={() => openModal(fee, room, paymentInfo)}
        className="p-1 px-3 text-sm rounded-full bg-secondary shadow-md text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 hover:-translate-x-1 transition-all"
      >
        nộp
      </button>
    </div>
  );
};

export default DashBoardInput;
