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
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ResidentInfo from "./ResidentInfo";
import RoomInfo from "./RoomInfo";
import { useNavigate, useParams } from "react-router-dom";

const ResidentInRoomId = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [changeHead, SetChangeHead] = useState(false);
  const [headId, setHeadId] = useState(31);
  const [roomResident, setRoomResident] = useState([]);
  const [roomVehicles, setRoomVehicles] = useState([
    {
        "id": 324,
        "typeId": 3,
        "type": "Xe máy",
        "licensePlate": "87-P1 8787",
        "imageUrl": "https://i.pinimg.com/236x/0d/8e/35/0d8e35653e1afe16621aa5982335b876.jpg",
        "insuranceEndDate": null
    },
    {
        "id": 323,
        "typeId": 1,
        "type": "Xe điện",
        "licensePlate": "87-P1 87444",
        "imageUrl": "https://i.pinimg.com/236x/ca/64/33/ca64331fdcc52074b299c577f880746c.jpg",
        "insuranceEndDate": "2024-11-23T15:30:00Z"
    },
    {
        "id": 324,
        "typeId": 3,
        "type": "Xe máy",
        "licensePlate": "87-P1 8787",
        "imageUrl": "https://i.pinimg.com/236x/0d/8e/35/0d8e35653e1afe16621aa5982335b876.jpg",
        "insuranceEndDate": null
    },
    {
        "id": 323,
        "typeId": 1,
        "type": "Xe điện",
        "licensePlate": "87-P1 87444",
        "imageUrl": "https://i.pinimg.com/236x/ca/64/33/ca64331fdcc52074b299c577f880746c.jpg",
        "insuranceEndDate": "2024-11-23T15:30:00Z"
    },
    {
        "id": 324,
        "typeId": 3,
        "type": "Xe máy",
        "licensePlate": "87-P1 8787",
        "imageUrl": "https://i.pinimg.com/236x/0d/8e/35/0d8e35653e1afe16621aa5982335b876.jpg",
        "insuranceEndDate": null
    },
    {
        "id": 323,
        "typeId": 1,
        "type": "Xe điện",
        "licensePlate": "87-P1 87444",
        "imageUrl": "https://i.pinimg.com/236x/ca/64/33/ca64331fdcc52074b299c577f880746c.jpg",
        "insuranceEndDate": "2024-11-23T15:30:00Z"
    },
]);

  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typeId, setTypeId] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [insuranceEndDate, setInsuranceEndDate] = useState("");

  const { backendUrl, updateresidenttoken, token } = useContext(AppContext);
  const {
    showResidentForm,
    setShowResidentForm,
    residents,
    rooms,
    vehicleTypes,
    roomTypes,
  } = useContext(ResidentContext);

  console.log(rooms);
  console.log(id);

  const roomName = rooms.find((e) => e.id === Number(id))?.name;

  const getRoomResident = async () => {
    try {
      const { data, status } = await axios.get(backendUrl + `/api/rooms/${id}`);

      if (status === 200) {
        setRoomResident(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
        setHeadId(data.headResidentId);
      } else {
        toast.error(status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getRoomVehicles = async () => {
    try {
      const { data, status } = await axios.get(
        backendUrl + `/api/rooms/${id}/vehicles`
      );

      if (status === 200) {
        setRoomVehicles(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
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
  }, [rooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!vehicleImage) {
        return toast.error("Chưa chọn ảnh cư dân");
      }
      setIsLoading(true);
      // const { firstName, middleName, lastName } = splitFullName(name);

      const formData = new FormData();

      formData.append("image", vehicleImage);
      formData.append("licensePlate", licensePlate);
      formData.append("typeId", typeId);
      formData.append("insuranceEndDate", insuranceEndDate);

      const response = await axios.post(
        backendUrl + `api/rooms/${id}/vehicles`,
        formData,
        { headers: { updateresidenttoken } }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        setTypeId("");
        setVehicleImage("");
        setInsuranceEndDate("");
        setLicensePlate("");
      } else if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa xe này?"
    );
    if (confirmDelete) {
      try {
        const { data, status } = await axios.delete(
          backendUrl + `/api/rooms/${id}/vehicles/${vehicleId}`,
          {
    
            headers: { updateresidenttoken: updateresidenttoken } // Headers should be inside 'headers'
          }
        );

        if (status) {
          toast.success(data.message);
          getRoomVehicles();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Lấy ngày (dd)
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Lấy tháng (mm)
    const year = d.getFullYear(); // Lấy năm (yyyy)
    return `${day}/${month}/${year}`;
  }
  
  return (
    <div className="mb-4 w-full h-screen relative px-8 py-2 overflow-visible">
      {/* them phuong tien */}
      <form
        onSubmit={handleSubmit}
        className={`${
          showVehicleForm ? "backdrop-blur-lg" : "hidden"
        } absolute  top-32 max-w-[80%] left-[20%]  z-10 flex gap-16 px-8 py-8 bg-white items-start shadow-lg transition-all`}
      >
        <div className="flex flex-col justify-center items-center gap-4 mb-8 text-gray-500 text-lg">
          <label htmlFor="resident-image" className="">
            <img
              src={
                vehicleImage
                  ? URL.createObjectURL(vehicleImage)
                  : assets.car_placeholder
              }
              alt="avatar"
              className="w-36 bg-gray-50 rounded-full cursor-pointer hover:opacity-70 hover:scale-105 p-2 transition-all"
            />
            <input
              type="file"
              id="resident-image"
              onChange={(e) => setVehicleImage(e.target.files[0])}
              hidden
            />
          </label>
          <p className="text-gray-400 text-center">
            Tải lên <br />
            ảnh phương tiện
          </p>
        </div>
        <div className="flex flex-col gap-4 grow">
          <div className="w-full">
            <p className="mb-2 text-gray-500 font-medium">Biển số</p>
            <input
              type="text"
              onChange={(e) => setLicensePlate(e.target.value)}
              value={licensePlate}
              className="p-2 px-4 w-full  border  bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
              placeholder="ex: 29-M1-12345"
              required
            />
          </div>
          <div className="flex gap-4 min-w-[400px]">
            <div className="w-full">
              <p className="mb-2 text-gray-500 font-medium">
                Ngày hết hạn bảo hiểm
              </p>
              <input
                type="date"
                onChange={(e) => setInsuranceEndDate(e.target.value)}
                value={insuranceEndDate}
                className="w-full p-2 px-4 border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
                placeholder="ex: Ngô Tất Tố"
              />
            </div>
            <div className="w-[50%]">
              <p className="mb-2 text-gray-500 font-medium">Loại xe</p>
              <select
                name=""
                id=""
                onChange={(e) => setTypeId(e.target.value)}
                value={typeId}
                required
                className="p-2 px-4 w-full border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
              >
                {vehicleTypes.map((type) => {
                  <option value={type.id}>{type.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="flex relative justify-between items-start">
            <p className=" text-sm text-gray-500">
              <span className="text-red-400">*</span> kiểm tra kĩ thông tin
            </p>

            <button
              type="submit"
              className=" max-w-[50%] self-end p-4 px-8 mt-1 rounded-xl text-white font-medium text-lg mr-6 bg-secondary hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] hover:opacity-60 hover:-translate-x-4 transition-all"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <span className="font-medium  text-xl  text-white tracking-wide">
                  Thêm xe
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-between py-4 items-center overflow-visible">
        <p className="text-2xl font-bold text-gray-600 overflow-visible">
          <button
            onClick={() => navigate(-1)}
            className="group hover:opacity-80 transition-all"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="group-hover:-translate-x-2 px-2 transition-all"
            />
            <span className="ml-4"> Phòng {roomName} </span>
          </button>
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
        {!!updateresidenttoken && (
          <div
            onClick={(e) => setShowVehicleForm(!showVehicleForm)}
            className={`${
              showResidentForm ? "backdrop-blur-md shadow-custom-green" : ""
            } inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}
          >
            <p className="text-center font-semibold">Thêm phương tiện</p>
            <FontAwesomeIcon
              icon={faPlus}
              className={
                showResidentForm
                  ? "rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out"
                  : "transition-all duration-500 ease-in-out"
              }
            />
          </div>
        )}
      </div>

      <section
        className={`grid grid-cols-2 gap-4 gap-x-6 p-8 h-[50%] z-0 overflow-y-auto bg-white border rounded-xl transition-all duration-700 ${
          showVehicleForm ? "blur-sm bg-gray-300 opacity-60" : ""
        } `}
      >
        {roomResident.map((resident, index) => (
          <ResidentInfo
            key={index}
            resident={resident}
            changeHead={changeHead}
            headId={headId}
            setHead={setHeadId}
          />
        ))}
      </section>
        <p className="mt-6 text-xl font-bold text-gray-500 ">
          Danh sách phương tiện
        </p>
      <section className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-2 gap-4 gap-x-6 p-8 h-[30%] z-0 overflow-y-auto bg-white border rounded-xl transition-all duration-700 ${
          showVehicleForm ? "blur-sm bg-gray-300 opacity-60" : ""
        } `}>
          {roomVehicles.map((ve, index) => (
            <div key={index} className="relative min-h-[160px] flex gap-4 p-4 bg-gray-100 rounded-lg border-violet-200 border-2 hover:border-violet-400 transition-all hover:shadow-custom-violet">
              <img className="aspect-auto w-[150px] h-auto" src={ve.imageUrl} alt="anh xe" />
              <div>
                <p className="text-lg mb-2">
                  <span className="font-semibold mr-2">Biển số:</span>
                  <span>{ve.licensePlate}</span>
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold mr-2">Loại xe:</span>
                  <span className="text-violet-400 font-semibold">{ve.type}</span>
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold mr-2">Ngày hết hạn:</span>
                  <span>{formatDate(ve.insuranceEndDate) || 'Không có'}</span>
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <FontAwesomeIcon
                            icon={faTrashCan}
                            className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all"
                            onClick={() => deleteVehicle(ve.id)}
                          />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ResidentInRoomId;
