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
import ResidentInfo from "./ResidentInfo";
import RoomInfo from "./RoomInfo";
import { useNavigate, useParams } from "react-router-dom";


const ResidentInRoomId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [changeHead, SetChangeHead] = useState(false);
  //đang để mặc định để test
  const [headId, setHeadId] = useState(31);
  const [roomResident, setRoomResident] = useState([
    {
    name: "memeoajsflkjalkfjas lkfjlakjfafffaf fafafafa fafrqrqr qrqr",
    age: 20,
    gender: "male",
    phoneNumber: "01231414151",
    idCardNumber: '111111111111',
    id: 31
  },
    {
    name: "ghggmemeo",
    age: 20,
    gender: "male",
    phoneNumber: "01231414151",
    idCardNumber: '111111111111',
    id: 32
  },
]);

  const { backendUrl, updateresidenttoken, token } = useContext(AppContext);
  const {
    showResidentForm,
    setShowResidentForm,
    getAllResidents,
    residents,
    rooms,
    getAllRooms,
  } = useContext(ResidentContext);

  console.log(rooms);
  console.log(id);
  
  
  const roomName = rooms.find((e) => e.id === Number(id))?.name;
  

  const getRoomResident = async () => {
    try {
      const { data, status } = await axios.get(backendUrl + `/api/rooms/${id}`);

      if (status === 200) {
        setRoomResident(
          data.data.sort((a, b) => Number(a.id) - Number(b.id))
        );
        setHeadId(data.headResidentId);
      } else {
        toast.error(status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getRoomResident();
  }, []);

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

        <div
          onClick={() => SetChangeHead(!changeHead)}
          className={`${
            changeHead ? "backdrop-blur-md shadow-custom-green" : ""
          } inline-flex items-center gap-4 mr-2 min-w-[200px] bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}
        >
          {changeHead ? (
            <>
              <p className="font-semibold">Xác nhận</p>
              <FontAwesomeIcon icon={faCheck} />
            </>
          ) : (
            <>
              <p className="text-center font-semibold">Thay chủ phòng</p>
            </>
          )}
        </div>
      </div>

      <section
        className={`grid grid-cols-2 gap-8 gap-x-12 p-8 h-[85%] z-0 overflow-y-auto bg-white border rounded-xl transition-all duration-700 ${
          showResidentForm ? "blur-sm bg-gray-300 opacity-60" : ""
        } `}
      >
        {roomResident.map((resident, index) => (
          <ResidentInfo key={index} resident={resident} changeHead={changeHead} headId={headId} setHead={setHeadId} />
        ))}
      </section>
    </div>
  );
};

export default ResidentInRoomId;
