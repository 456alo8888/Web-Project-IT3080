/* eslint-disable react/prop-types */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ResidentContext = createContext();

const ResidentContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [showResidentForm, setShowResidentForm] = useState(false);
  const [residents, setResidents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const getAllRooms = async () => {
    try {
      const { data, status } = await axios.get(backendUrl + "/api/rooms");

      setRooms(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getAllVehicleTypes = async () => {
    try {
      const { data, status } = await axios.get(backendUrl + "/api/rooms/vehicles/types");

      setVehicleTypes(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getAllRoomTypes = async () => {
    try {
      const { data, status } = await axios.get(backendUrl + "/api/rooms/types");

      setRoomTypes(data.data.sort((a, b) => Number(a.id) - Number(b.id)));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


  useEffect(() => {
    getAllRooms();
    getAllVehicleTypes();
    getAllRoomTypes();
  }, []);

  const value = {
    showResidentForm,
    setShowResidentForm,
    residents,
    rooms, getAllRooms,
    vehicleTypes, getAllVehicleTypes,
    roomTypes, getAllRoomTypes,
  };

  return (
    <ResidentContext.Provider value={value}>
      {props.children}
    </ResidentContext.Provider>
  );
};

export default ResidentContextProvider;
