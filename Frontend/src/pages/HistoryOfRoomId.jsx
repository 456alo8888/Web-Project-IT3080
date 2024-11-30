import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { ResidentContext } from "../context/ResidentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const HistoryOfRoomId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchFee, setSearchFee] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
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
  });
  const { backendUrl, updateresidenttoken, token } = useContext(AppContext);
  const { rooms } = useContext(ResidentContext);

  const roomName = rooms.find((e) => e.id === Number(id))?.name;

  const loadPaymentInfo = async () => {
    try {
      const { data, status } = await axios.get(
        `${backendUrl}/api/rooms/${id}/pay`
      );

      if (status === 200) {
        setPaymentInfo(data);
      } else {
        toast.error(`Error: ${status}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loadPaymentInfo();
  }, [rooms]);

  console.log(rooms);
  console.log(id);

  useEffect(() => {}, []);

  const formatDate = (d) => {
    const date = new Date(d)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };
  
  return (
    <div className="mb-4 w-full h-screen relative px-8 py-2 overflow-visible">
      <div className="flex justify-between py-4 items-center overflow-visible">
        <p className="text-2xl font-bold text-gray-600 overflow-visible">
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="hover:-translate-x-2 px-2 transition-all"
            />
          </button>
          <span className="ml-4"> Phòng {roomName} </span>
        </p>
      </div>
      <section className="flex gap-2 p-8 py-6 h-[85%] z-0  bg-white border rounded-xl transition-all duration-700">
        <div className="flex-1">
          <div className="grid grid-cols-[1.0fr_0.6fr_0.6fr_0.6fr_0.6fr_0.8fr] bg-gray-200 p-4 px-4 text-gray-500 rounded-t-md">
            <div className="font-medium">Tên phí</div>
            <div className="font-medium">Admin</div>
            <div className="font-medium">Số tiền</div>
            <div className="font-medium">Người đóng</div>
            <div className="font-medium">Thời gian</div>
            <div className="font-medium ml-4">Loại phí</div>
          </div>
          <div className="flex flex-col max-h-[60vh] overflow-y-auto">
            {paymentInfo?.paid?.map((payment, index) => (
              <div
                key={index}
                className={`group grid grid-cols-[1.0fr_0.6fr_0.6fr_0.6fr_0.6fr_0.8fr] min-h-[64px] p-2 px-4 items-center border-b border-b-gray-100 text-gray-700 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div>{payment.name} </div>
                <div>{payment.admin} </div>
                <div className="pl-6 text-primary font-medium">{payment.value}</div>
                <div>{payment.resident}</div>
                <div>{formatDate(payment.createdAt)}</div>
                <div>{payment.isOptional ? <span className="text-violet-500 text-sm pl-4">Tự nguyện</span> : <span className="text-red-500 text-sm pl-4">Bắt buộc</span>}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-[3fr_1fr] bg-gray-200 p-4 px-4 text-gray-500 rounded-t-md">
            <div className="font-medium">Tên</div>
            <div className="font-medium">Cần đóng </div>
          </div>
          <div className="flex flex-col max-h-[60vh] overflow-y-auto">
            {paymentInfo?.unpaid?.map((payment, index) => (
              <div
                key={index}
                className={`group grid grid-cols-[3fr_1fr] min-h-[64px] p-2 px-4 items-center border-b border-b-gray-100 text-gray-700 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div>{payment.name} </div>
                <div className="pl-6 font-medium text-red-500">{payment.value} </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryOfRoomId;
