import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { ResidentContext } from "../context/ResidentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import ResidentInfo from "./ResidentInfo";
import RoomInfo from "./RoomInfo";

// function splitFullName(fullName) {
//   const nameParts = fullName.trim().split(/\s+/); // Split by any whitespace

//   const firstName = nameParts[0] || "";
//   const middleName =
//     nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
//   const lastName = nameParts[nameParts.length - 1] || "";

//   return { firstName, middleName, lastName };
// }

const ResidentForm = () => {
  const [residentImg, setResidentImg] = useState("");
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [cccd, setCccd] = useState("");
  const [phone, setPhone] = useState("");
  const [isHeadResident, setIsHeadResident] = useState(false);

  const [filterRooms, setFilterRooms] = useState([]);
  const [search, setSearch] = useState("");

  const { backendUrl, updateresidenttoken, token } = useContext(AppContext);
  const { showResidentForm, setShowResidentForm, getAllResidents, residents, rooms, getAllRooms } =
    useContext(ResidentContext);

  console.log("ROOMS:", rooms);

  const applyFilter = () => {
    if (search) {
      setFilterRooms(
        rooms.filter(
          (room) =>
            room.id?.toString().includes(search) ||
            room.name?.toLowerCase().includes(search) ||
            room.headResidentName?.toLowerCase().includes(search)||
            ( search.includes('num =') && search.includes(room.residentCount) )
        )
      );
    } else {
      setFilterRooms(rooms);
    }
  };

  useEffect(() => {
    if (token) {
      getAllRooms();
    }
  }, [token]);

  useEffect(() => {
    applyFilter();
  }, [search, rooms, residents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!residentImg) {
        return toast.error("Chưa chọn ảnh cư dân");
      }

      // const { firstName, middleName, lastName } = splitFullName(name);

      const formData = new FormData();

      formData.append("image", residentImg);
      formData.append("room", room);
      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);
      // formData.append("middleName", middleName);
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("age", Number(age));
      formData.append("idCardNumber", cccd);
      formData.append("phoneNumber", phone);
      formData.append("isHeadResident", isHeadResident);

      const { data } = await axios.post(
        backendUrl + "/api/resident/create-resident",
        formData,
        { headers: { updateresidenttoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setResidentImg("");
        setRoom("");
        setName("");
        setGender("male");
        setAge("");
        setCccd("");
        setPhone("");

        getAllResidents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="mb-4 w-full h-screen relative px-8 py-2">
      <div className="flex justify-between py-4 items-center">
        <p className="text-2xl font-bold text-gray-600">Thông tin cư dân</p>
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
          onClick={(e) => setShowResidentForm(!showResidentForm)}
          className={`${
            showResidentForm ? "backdrop-blur-md shadow-custom-green" : ""
          } inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}
        >
          <p className="text-center font-semibold">Thêm cư dân</p>
          <FontAwesomeIcon
            icon={faPlus}
            className={
              showResidentForm
                ? "rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out"
                : "transition-all duration-500 ease-in-out"
            }
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${
          showResidentForm ? "backdrop-blur-lg" : "hidden"
        } absolute right-[200px] top-32  z-10 flex gap-16 px-8 py-8 bg-white max-w-6xl items-start shadow-lg transition-all`}
      >
        <div className="flex flex-col justify-center items-center gap-4 mb-8 text-gray-500 text-lg">
          <label htmlFor="resident-image" className="">
            <img
              src={
                residentImg
                  ? URL.createObjectURL(residentImg)
                  : assets.avatar_placeholder
              }
              alt="avatar"
              className="w-36 rounded-full cursor-pointer hover:opacity-70 hover:scale-105 p-2 transition-all"
            />
            <input
              type="file"
              id="resident-image"
              onChange={(e) => setResidentImg(e.target.files[0])}
              hidden
            />
          </label>
          <p className="text-gray-400 text-center">
            Tải lên <br />
            ảnh cư dân
          </p>
        </div>
        <div className="flex flex-col grow">
          <div className="flex gap-12 mb-4">
            <div className="w-[40%]">
              <p className="mb-2 text-gray-500 font-medium">Số phòng</p>
              <input
                type="text"
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                className="p-2 px-4 w-full  border  bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
                placeholder="ex: 101"
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-2 text-gray-500 font-medium">Tên chủ hộ</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-2 px-4 border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
                placeholder="ex: Ngô Tất Tố"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-[30%]">
              <p className="mb-2 text-gray-500 font-medium">Giới tính</p>
              <select
                name=""
                id=""
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                required
                className="p-2 px-4 max-w-full border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
            <div className="w-full">
              <p className="mb-2 text-gray-500 font-medium">
                Số căn cước công dân
              </p>
              <input
                type="text"
                onChange={(e) => setCccd(e.target.value)}
                value={cccd}
                className="w-full p-2 px-4 border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 tracking-wider transition-all"
                placeholder="ex: 040012345678"
                required
              />
            </div>
          </div>
          <div className="flex gap-12 mb-4">
            <div className="w-[45%]">
              <p className="mb-2 text-gray-500 font-medium">Tuổi </p>
              <input
                type="number"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                className="p-2 px-4 pr-0 w-full  border  bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 transition-all"
                placeholder="ex: 20(trên 17)"
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-2 text-gray-500 font-medium">Số điện thoại</p>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="w-full p-2 px-4 border bg-gray-50 focus:border-secondary outline-none rounded-md text-gray-500 tracking-wider transition-all"
                placeholder="ex: 0969888666"
                required
              />
            </div>
          </div>
          <div className="flex relative justify-between items-start">
            <p className="absolute bottom-0 text-sm text-gray-500">
              <span className="text-red-400">*</span> kiểm tra kĩ thông tin
            </p>
            <label className=" flex items-center gap-4">
              <p className="text-gray-500 font-medium">Chủ phòng</p>
              <input
                type="checkbox"
                checked={isHeadResident}
                onChange={(e) => setIsHeadResident(e.target.checked)}
                className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full "
              />
            </label>

            <button
              type="submit"
              className=" max-w-[40%] self-end p-4 px-8 mt-1 rounded-xl text-white font-medium text-lg mr-6 bg-secondary hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] hover:opacity-60 hover:-translate-x-4 transition-all"
            >
              Gửi thông tin
            </button>
          </div>
        </div>
      </form>

      <section
        className={`grid grid-cols-3 gap-8 gap-x-6 p-8 h-[85%] z-0 overflow-y-auto bg-white border rounded-xl transition-all duration-700 ${
          showResidentForm ? "blur-sm bg-gray-300 opacity-60" : ""
        } `}
      >
        {filterRooms.map((room, index) => (
          <RoomInfo key={index} room={room} />
        ))}
      </section>
    </div>
  );
};

export default ResidentForm;
