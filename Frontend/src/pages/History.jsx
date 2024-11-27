import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { FeeContext } from "../context/FeeContext";
import { ResidentContext } from "../context/ResidentContext";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
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
  const [filterRoom, setFilterRoom] = useState([]);

  const { backendUrl } = useContext(AppContext);

  const { fees } = useContext(FeeContext);
  const { rooms } = useContext(ResidentContext);

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
      toast.error(error.message);
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
      toast.error(`Failed to load payment info: ${error.message}`);
    }
  };

  // funtion to search

  const applySearch = () => {
    if (search) {
      setFilterRoom(
        rooms.filter(
          (room) =>
            room.id.toString().includes(search) 
        )
      );
    } else {
      setFilterRoom(rooms);
    }
  };

  useEffect(() => {
    loadAllPaymentInfo();
    console.log(rooms);
    
  }, [rooms]);

  useEffect(() => {
    applySearch();
  }, [allPaymentInfo, search]);

  //utility funtion

  const formatDate = (d) => {
    const date = new Date(d);
    const pad = (n) => (n < 10 ? "0" + n : n);

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  return (
    <div className="mb-4 px-8 w-full h-screen relative">
      <section className="flex justify-between py-6 items-center">
        <p className="text-2xl font-bold text-gray-600">Lịch sử cập nhật</p>
        <div
          className={` focus-within:shadow-custom-green  relative w-1/3 rounded-full z-10 transition-all `}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer w-full p-2 px-4 border-2 outline-none  text-gray-500 rounded-full focus:border-secondary transition-all"
            placeholder="Tìm kiếm: ex 101, meo meo"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-3 right-3 text-xl text-gray-500 peer-focus:-translate-x-2 peer-focus:scale-110 transition-all"
          />
        </div>
        <div
          className={`${
            show ? "backdrop-blur-md shadow-custom-green" : ""
          } inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}
        >
          <p className="text-center font-semibold">Thêm cư dân</p>
          <FontAwesomeIcon
            icon={faPlus}
            className={
              show
                ? "rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out"
                : "transition-all duration-500 ease-in-out"
            }
          />
        </div>
      </section>

      <section
        className={`${
          show ? "blur-sm opacity-60" : ""
        } relative grid grid-cols-3 max-h-[80%] overflow-y-auto gap-6 p-8 py-6 h-[85%] bg-white rounded-xl transition-all`}
      >
        {filterRoom.map((room, index) => (
          <Link to={`/history/${room.id}`} key={index} className="flex flex-col gap-2 text-base text-gray-500 min-h-[150px] p-4 rounded-lg border-2 bg-gray-100 transition-all hover:border-primary hover:shadow-custom-green">
            <div className="flex gap-2">
              <p className="font-semibold">Tên phòng:</p>
              <span>{room.name}</span>
            </div>
            <div className="flex gap-2">
              <p className="">Chưa đóng:</p>
              <span className="text-red-300 font-semibold">{allPaymentInfo.find(e => e.roomId === room.id)?.payment?.unpaid.length}</span>
            </div>
            <div className="flex gap-2">
              <p>Đã đóng:</p>
              <span className="text-primary font-semibold">{allPaymentInfo.find(e => e.roomId === room.id)?.payment?.paid.length}</span>
            </div>

          </Link>
        ))}
      </section>
    </div>
  );
};

export default History;
