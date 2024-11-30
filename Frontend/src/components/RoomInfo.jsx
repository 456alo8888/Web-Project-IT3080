import React from "react";
import { Link } from "react-router-dom";

const RoomInfo = ({ room }) => {
  return (
    <Link to={`/resident/${room.id}`} className="flex flex-col gap-2 text-base text-gray-500 min-h-[150px] p-4 rounded-lg border-2 bg-gray-100 transition-all hover:border-primary hover:shadow-custom-green">
      <div className="flex gap-8">
        <div>
          <span className="font-medium text-gray-800">ID phòng : </span>
          <span>{room.id}</span>
        </div>
        <div>
          <span className="font-medium text-primary">Tên phòng : </span>
          <span className="text-lg font-medium">{room.name}</span>
        </div>
      </div>
      <div className="flex gap-2 h-6">
        <span className="min-w-[100px] font-medium text-gray-800">Chủ phòng : </span>
        <span className="max-w-200 overflow-y-auto">
          {room.headResidentName ?? 'Chưa có'}
        </span>
      </div>
      <div>
        <span className="font-medium text-gray-800">Số thành viên : </span>
        <span>{room.residentCount}</span>
      </div>
    </Link>
  );
};

export default RoomInfo;
