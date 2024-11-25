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

  const getAllResidents = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/resident/all-resident"
      );

      if (data.success) {
        setResidents(
          data.residents.sort((a, b) => Number(a.room) - Number(b.room))
        );
        console.log("resident", residents);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllRooms = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/rooms");

      if (data.success) {
        setRooms(data.rooms.sort((a, b) => Number(a.room) - Number(b.room)));
        console.log("ROOMS: ", data.rooms);
      } else {
        toast.error(data.message);
    }
} catch (error) {
        setRooms([
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha fafafaf fafatgag ga afa a f afaafaf ",
          },
          {
            id: 123143,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 4123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 1623,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
          {
            id: 123,
            name: "123ab",
            residentCount: 4,
            headResidentName: "haha",
          },
        ]);
      console.log(error);
      toast.error(error.message);
    }
  };

 
  useEffect(() => {
    getAllResidents();
    getAllRooms();
  }, []);

  const value = {
    showResidentForm,
    setShowResidentForm,
    getAllResidents,
    residents,
    rooms,
    getAllRooms,
  };

  return (
    <ResidentContext.Provider value={value}>
      {props.children}
    </ResidentContext.Provider>
  );
};

export default ResidentContextProvider;
