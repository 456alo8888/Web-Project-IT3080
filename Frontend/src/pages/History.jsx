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
  const [filterRoom, setFilterRoom] = useState([]);

  const { backendUrl } = useContext(AppContext);

  const {  } = useContext(FeeContext);
  const { rooms } = useContext(ResidentContext);


  // funtion to search
  const applySearch = () => {
    if (search) {
      setFilterRoom(
        rooms.filter(
          (room) =>
            room.name.toLowerCase().includes(search) || room.headResidentName?.toLowerCase().includes(search)
        )
      );
    } else {
      setFilterRoom(rooms);
    }
  };

  useEffect(() => {
    applySearch();
  }, [search]);

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
      <section className="flex justify-start gap-44 py-6 items-center">
        <p className="text-2xl font-bold text-gray-600">Lịch sử cập nhật</p>
        <div
          className={` focus-within:shadow-custom-green  relative w-1/3 rounded-full z-10 transition-all `}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer w-full p-2 px-4 border-2 outline-none  text-gray-500 rounded-full focus:border-secondary transition-all"
            placeholder="Tìm kiếm: 1-ABC, 2-ABC"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-3 right-3 text-xl text-gray-500 peer-focus:-translate-x-2 peer-focus:scale-110 transition-all"
          />
        </div>
      </section>

      <section
        className={`${
          show ? "blur-sm opacity-60" : ""
        } relative grid grid-cols-3 max-h-[80%] overflow-y-auto gap-6 p-8 py-6 h-[85%] bg-white rounded-xl transition-all`}
      >
        {filterRoom.map((room, index) => (
          <Link to={`/history/${room.id}`} key={index} className="flex flex-col gap-2 text-base text-gray-500 min-h-[130px] p-4 rounded-lg border-2 bg-gray-100 transition-all hover:border-primary hover:shadow-custom-green">
            <div className="flex gap-2">
              <p className="font-semibold">Tên phòng:</p>
              <span>{room.name}</span>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Chủ phòng:</p>
              <span>{room.headResidentName}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default History;
