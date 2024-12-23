import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ResidentContext } from "../context/ResidentContext";

const RoomInfo = ({ room }) => {
  const { roomTypes } = useContext(ResidentContext);

  return (
    <Link
      to={`/resident/${room.id}`}
      className="flex flex-col gap-2 text-base text-gray-500 min-h-[160px] p-4 rounded-lg border-2 bg-gray-100 transition-all hover:border-primary hover:shadow-custom-green"
    >
      <div className="flex gap-8">
        <div>
          <span className="font-medium text-primary">Phòng : </span>
          <span className="text-lg font-medium">{room.name}</span>
        </div>
      </div>
      <div className="flex gap-2 h-6">
        <span className="min-w-[100px] font-medium text-gray-800">
          Chủ phòng :{" "}
        </span>
        <span className="max-w-200 overflow-y-auto">
          {room.headResidentName ?? "Chưa có"}
        </span>
      </div>
      <div className="flex gap-8">
        <div>
          <span className="font-medium text-gray-800">Số thành viên : </span>
          <span>{room.residentCount}</span>
        </div>
        <div>
          <span className="font-medium text-gray-800">Số xe : </span>
          <span>{room.vehicleCount ?? 0}</span>
        </div>
      </div>
      <div className="flex gap-8">
        <div>
          <span className="font-medium text-gray-800">Loại : </span>
          <span className="font-medium text-primary">
            {roomTypes.find((e) => e.id == room?.typeId)?.name}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-800">Diện tích : </span>
          <span>{roomTypes.find((e) => e.id == room?.typeId)?.area}</span>
          <span> m<sup>2</sup></span>
        </div>
      </div>
    </Link>
  );
};

export default RoomInfo;
