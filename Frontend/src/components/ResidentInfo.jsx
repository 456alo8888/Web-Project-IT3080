/* eslint-disable react/prop-types */
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faPen,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { ResidentContext } from "../context/ResidentContext";
import { useParams } from "react-router-dom";

function buildName(first, mid, last) {
  return (first ? first + " " : "") + (mid ? mid + " " : "") + last;
}

const ResidentInfo = ({ resident, changeHead, headId, setHead }) => {
  const { id } = useParams();

  const { backendUrl, updateresidenttoken } = useContext(AppContext);
  const { getAllResidents } = useContext(ResidentContext);

  const [isEdit, setIsEdit] = useState(false);

  const [updateResident, setUpdateResident] = useState({
    roomNumber: resident.roomNumber,
    name: buildName(resident.firstName, resident.middleName, resident.lastName),
    age: resident.age,
    gender: resident.gender,
    idCardNumber: resident.idCardNumber,
    phoneNumber: resident.phoneNumber,
  });

  const handleChangeHead = async () => {
    try {
      const { data, status } = await axios.put(
        backendUrl + `/api/rooms/${id}/head-resident`,
        { headResidentId: resident.id }
      );

      if (status === 200) {
        setHead(resident.id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateResident((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setUpdateResident({
      roomNumber: resident.roomNumber,
      name: resident.name,
      age: resident.age,
      gender: resident.gender,
      idCardNumber: resident.idCardNumber,
      phoneNumber: resident.phoneNumber,
    });
  };

  const handleGiveUp = () => {
    resetForm();
    setIsEdit(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("roomNumber", updateResident.roomNumber);
      formData.append("name", updateResident.name);
      formData.append("gender", updateResident.gender);
      formData.append("age", Number(updateResident.age));
      formData.append("idCardNumber", updateResident.idCardNumber);
      formData.append("phoneNumber", updateResident.phoneNumber);

      const { data, status } = await axios.put(
        backendUrl + `/api/resident/${resident.id}`,
        formData,
        { headers: { updateresidenttoken } }
      );

      if (status === 200) {
        toast.success(data.message);
        getAllResidents();
        resetForm();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteResident = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa cư dân này?"
    );
    if (confirmDelete) {
      try {
        const { data, status } = await axios.delete(
          backendUrl + "/api/resident/" + resident.id,
          { idCardNumber: resident.idCardNumber },
          { headers: { updateresidenttoken } }
        );

        if (status) {
          toast.success(data.message);
          getAllResidents();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleUpdateSubmit}
      className="flex h-[32vh] p-2 rounded-lg border-2 bg-gray-100 transition-all hover:border-primary hover:shadow-custom-green"
    >
      <div className="flex flex-col justify-between items-start text-gray-500 text-xl">
        <img
          src={resident.image}
          alt="avatar"
          className="max-w-[150px]  object-cover"
        />
        <div className="flex justify-between w-[120px] m-4 mx-4 p-1">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all"
            onClick={deleteResident}
          />
          {isEdit ? (
            <div className="flex gap-3">
              <button onClick={handleGiveUp}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-red-400 cursor-pointer hover:opacity-80 hover:scale-110 transition-all"
                />
              </button>
              <button type="submit">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-primary cursor-pointer hover:opacity-80 hover:scale-110 transition-all"
                  type="submit"
                />
              </button>
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faPen}
              onClick={(e) => setIsEdit(true)}
              className="cursor-pointer hover:opacity-80 hover:scale-110 transition-all"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col relative grow min-h-[80%] p-4">
        <div className="text-lg mb-2">
          {isEdit ? (
            <div className="flex">
              <span className="font-semibold">Tên:</span>
              <input
                required
                type="text"
                name="name"
                value={updateResident.name}
                onChange={handleChange}
                className="px-1 ml-2 outline-none border focus:border-secondary max-w-[240px] rounded-sm"
                placeholder={resident.name}
              />
            </div>
          ) : (
            <p className="max-h-16 max-w-[300px] overflow-y-auto">
              <span className="font-semibold text-lg mr-2">Tên:</span>{" "}
              <span className="">{resident.name} </span>
            </p>
          )}
        </div>
        <div className="flex justify-between text-lg mb-2 ">
          {isEdit ? (
            <div className="flex ">
              <span className="font-semibold">Tuổi:</span>
              <input
                required
                type="number"
                name="age"
                value={updateResident.age}
                onChange={handleChange}
                className="px-1 ml-2 outline-none border focus:border-secondary max-w-[60px] rounded-sm"
                placeholder={resident.age}
              />
            </div>
          ) : (
            <p>
              <span className="font-semibold text-lg mr-2">Tuổi:</span>{" "}
              {resident.age}{" "}
            </p>
          )}
          {isEdit ? (
            <div className="flex">
              <span className="font-semibold">Giới tính:</span>
              <select
                name="gender"
                value={updateResident.gender}
                onChange={handleChange}
                className="px-1 ml-2 outline-none border focus:border-secondary max-w-[80px] rounded-sm"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          ) : (
            <p>
              <span className="font-semibold text-lg mr-2">Giới tính:</span>{" "}
              {resident.gender === "male" ? "Nam" : "Nữ"}{" "}
            </p>
          )}
        </div>
        <div className="text-lg mb-2">
          {isEdit ? (
            <div className="flex">
              <span className="font-semibold">CCCD:</span>
              <input
                required
                type="text"
                name="cccd"
                value={updateResident.idCardNumber}
                onChange={handleChange}
                className="px-1 ml-2 outline-none border focus:border-secondary max-w-[200px] rounded-sm"
                placeholder={resident.idCardNumber}
              />
            </div>
          ) : (
            <p>
              <span className="font-semibold text-lg mr-2">CCCD:</span>{" "}
              {resident.idCardNumber}{" "}
            </p>
          )}
        </div>
        <div className="text-lg mb-2">
          {isEdit ? (
            <div className="flex">
              <span className="font-semibold">Số điện thoại:</span>
              <input
                required
                type="text"
                name="phone"
                value={updateResident.phoneNumber}
                onChange={handleChange}
                className="px-1 ml-2 outline-none border focus:border-secondary max-w-[180px] rounded-sm"
                placeholder={resident.phoneNumber}
              />
            </div>
          ) : (
            <p>
              <span className="font-semibold text-lg mr-2">Số điện thoại:</span>{" "}
              {resident.phoneNumber}{" "}
            </p>
          )}
        </div>

        {resident.id === headId ? (
          <div className="absolute right-4 bottom-2 p-1 px-4 bg-primary text-white font-semibold border-primary border rounded-full">
            Chủ phòng
          </div>
        ) : resident.id !== headId && changeHead ? (
          <button
            onClick={handleChangeHead}
            className="absolute right-4 bottom-2 p-1 px-4 bg-white text-primary font-semibold border-primary border rounded-full"
          >
            Chủ phòng
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default ResidentInfo;
