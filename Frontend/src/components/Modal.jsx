/* eslint-disable react/prop-types */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, idFeeModal }) => {
  const { backendUrl } = useContext(AppContext);

  const [feeValue, setFeeValue] = useState([]);
  const [csvFile, setCsvFile] = useState('')
  const [feeInfo, setFeeInfo] = useState([
    {
      roomId: 12,
      room: "123-A",
      value: 123,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
    {
      roomId: 123,
      room: "123C",
      value: 90,
    },
  ]);

  const getNonOptionalFeeInfo = async () => {
    try {
      const { data, status } = await axios.get(
        backendUrl + "/api/fee/non-optional",
        {
          params: { id: idFeeModal.id },
        }
      );

      if (status === 200) {
        setFeeInfo(data[0]?.values);
      } else {
        toast.error(status);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateFee = async (roomId, value) => {
    try {
      const { data, status } = await axios.put(
        backendUrl + "/api/fees/non-optional/" + roomId,
        {
          roomId: roomId,
          value: value,
        }
      );

      if (status === 200) {
        toast.success(data.message);
        getNonOptionalFeeInfo();
      } else {
        toast.error(status);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCSVFile = async (e) => {
    setCsvFile(e.target.files[0])
    try {
      const {data} = await axios.post(backendUrl + "/api/fees/csv");
      data.data?.forEach(payinfo => {
        updateFee(payinfo?.id, payinfo.value);
      });
      getNonOptionalFeeInfo();

    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleInputChange = (index, newValue) => {
    // Create a copy of the feeInfo array
    const updatedFeeInfo = [...feeInfo];
  
    // Update the specific item's value
    updatedFeeInfo[index].value = newValue;
  
    // Set the updated array as the new state
    setFeeInfo(updatedFeeInfo);
  };


  useEffect(() => {
    getNonOptionalFeeInfo();

    return () => {};
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white min-w-[420px] translate-x-[100px] p-6 pb-8 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-2xl rotate-[225deg] transition-all ease-in-out"
          />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-medium text-gray-500">
              Tên khoản thu : <span>{idFeeModal?.name}</span>{" "}
            </p>
          </div>
          <div className="flex gap-4">
            <p className="text-lg font-medium text-gray-500">Phí : </p>
            <div className="flex grid grid-cols-2 gap-2 items-center max-h-[300px] overflow-y-auto">
              {feeInfo.map((info, index) => (
                <div
                  className="flex p-2 items-center gap-4 min-h-[36px]"
                  key={index}
                >
                  <p className="w-[50px] text-gray-800 ">{info.room}</p>
                  <input
                    className="p-1 px-2 max-w-[100px] text-primary outline-none border-b-2 focus:border-b-primary"
                    type="number"
                    value={info.value}
                    onChange={(e) => handleInputChange(index, parseInt(e.target.value))} // Update value on change
                  />
                  <button
                    onClick={(e) => updateFee(info.roomId, e.target.value)}
                    className="p-1 px-2 rounded-full hover:opacity-80 hover:-translate-x-2 transition-all bg-primary text-sm text-white"
                  >
                    thay đổi
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="file-uploader">
                  <label
                    htmlFor="csvFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload a CSV file:
                  </label>
                  <input
                    id="csvFile"
                    type="file"
                    accept=".csv" // Accept only CSV files
                    onChange={handleCSVFile} // Handle file selection
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100 transition-all"
                  />

                  {csvFile && (
                    <p className="mt-2 text-sm text-primary">
                      Selected file: <strong>{csvFile.name}</strong>
                    </p>
                  )}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
