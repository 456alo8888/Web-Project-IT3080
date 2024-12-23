/* eslint-disable react/prop-types */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FeeContext } from "../context/FeeContext";

const AddPaymentModal = ({ fee, room, onClose, paymentInfo }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payAmount, setPayAmount] = useState(paymentInfo?.needPay);
  const [residentId, setResidentId] = useState(31);

  const [roomResident, setRoomResident] = useState([]);
  const { backendUrl, receivetoken, adminId } = useContext(AppContext);
  const { getFeesData } = useContext(FeeContext);

  const submitAddPayment = async () => {
    setIsLoading(true);
    console.log(receivetoken);

    try {
      const { data, status } = await axios.post(
        backendUrl + `/api/fees/${fee.id}/pay`,
        {
          residentId: residentId,
          value: payAmount,
          roomId: room.id,
          adminId: Number(adminId),
        },
        { headers: { receivefeetoken: receivetoken } }
      );

      toast.success("Thành công");
      setIsSuccess(true);
      getFeesData();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoomResident = async () => {
    try {
      const { data, status } = await axios.get(
        backendUrl + `/api/rooms/${room.id}`
      );

      if (status === 200) {
        setRoomResident(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
        setResidentId(data.data[0]?.id);
      } else {
        toast.error(status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getRoomResident();

    return () => { };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 "
    onClick={onClose}>
      <div className="bg-white min-w-[420px] translate-x-[100px] p-6 pb-8 shadow-lg relative"
      onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute group p-4 top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-4xl  group-hover:rotate-[45deg] group-hover:scale-110 rotate-[225deg] transition-all ease-in-out"
          />
        </button>

        {/* Modal Content */}
        <section className="flex flex-col gap-6 text-gray-500 text-lg ">
          {!isSuccess ? (
            <div className="self-center p-4 text-3xl font-semibold text-primary">
              Thanh toán
            </div>
          ) : (
            <div className="self-center p-4 text-2xl font-bold text-primary">
              <img className="w-[150px]" src={assets.success_ani}></img>
            </div>
          )}
          <p className="font-semibold">
            Tên phòng : <span>{room?.name}</span>
          </p>
          <p className="font-semibold ">
            Tên khoản thu : <span>{fee?.name}</span>
          </p>
          <div className="flex items-center">
            <p className="font-semibold ">Loại khoản thu :</p>
            {fee.isOptional ? (
              <span className="inline-block ml-2 bg-violet-50 text-violet-300 p-2 px-4 rounded-full">
                Tự nguyện
              </span>
            ) : (
              <span className="inline-block ml-2 bg-red-50 text-red-300 p-2 px-4 rounded-full">
                Bắt buộc
              </span>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold ">Số tiền đóng:</p>
            <input
              type="number"
              className={`w-[100px] p-2 py-1 outline-none border-b-2 transition-all ${fee.isOptional
                  ? "focus:border-b-violet-500 text-violet-300"
                  : "focus:border-b-red-500 text-red-300"
                }  `}
              value={payAmount}
              autoFocus
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder="ex: 100"
            />
          </div>
          <div className="flex gap-4">
            <p className="font-semibold ">Người đóng</p>
            <select
              name=""
              id=""
              value={residentId}
              className="min-w-[100px] text-gray-500 bg-gray-50 border-b-2 outline-none p-1 px-2  focus:border-secondary transition-allF"
              onChange={(e) => setResidentId(e.target.value)}
            >
              {roomResident.map((resident, index) => (
                <option key={index} value={resident.id}>
                  {" "}
                  {resident.name}
                </option>
              ))}
            </select>
          </div>
          {!isSuccess && <button
            onClick={submitAddPayment}
            className="min-w-[50%]  flex justify-center max-w-[60%] self-end p-4 px-8 mt-1 rounded-xl text-white font-medium text-lg mr-6 bg-secondary hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] hover:opacity-60 hover:-translate-x-4 transition-all"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
              <span className="font-semibold  text-lg  text-white tracking-wide">
                Nộp tiền
              </span>
            )}
          </button>
          }
        </section>
      </div>
    </div>
  );
};

export default AddPaymentModal;
