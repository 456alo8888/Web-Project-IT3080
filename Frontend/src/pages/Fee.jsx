import {
  faFilter,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ResidentContext } from "../context/ResidentContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FeeContext } from "../context/FeeContext";
import Modal from "../components/Modal";
import { Form } from "react-router-dom";

const Fee = () => {
  const [search, setSearch] = useState("");
  const [showCreateFee, setShowCreateFee] = useState(false);
  const [filterFees, setFilterFees] = useState([]);
  const [filters, setFilters] = useState([]);

  //data from context
  const { backendUrl, createfeetoken, token } = useContext(AppContext);
  const { residents, rooms } = useContext(ResidentContext);
  const { fees, getAllFees } = useContext(FeeContext);

  //for loading submit
  const [loading, setLoading] = useState(false);

  //state for create fee
  const [csvFile, setCsvFile] = useState();
  const [isOptional, setIsOptional] = useState(true);
  const [lowerBound, setLowerBound] = useState(0);
  const [typeId, setTypeId] = useState(1);
  const [nonOptionalType, setNonOptionalType] = useState([
    { id: 1, name: "tiền xe" },
    { id: 2, name: "tiền điện" },
    { id: 3, name: "tiền nuoc" },
  ]);

  //state for diaglog NONOPTIONAL FEE INFO
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idFeeModal, setIdFeeModal] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [name, setName] = useState("");
  const [feeType, setFeeType] = useState("BAT_BUOC");
  const [feepayInfo, setFeepayInfo] = useState([]);
  const [deadline, setDeadline] = useState(new Date());
  const [costBAT_BUOC, setCostBAT_BUOC] = useState("");

  //for load fee data and filter

  const loadFeeTypes = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/fees/non-optional/types"
      );

      if (data.success) {
        setNonOptionalType(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteFee = async (_id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khoản thu này?"
    );
    if (confirmDelete) {
      try {
        const { data, status } = await axios.delete(
          backendUrl + "/api/fee/delete/" + _id
        );

        if (status === 200) {
          toast.success("Xóa thành công");
          getAllFees();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const toggleFilter = (value) => {
    if (filters.includes(value)) {
      setFilters(filters.filter((f) => f !== value));
    } else {
      setFilters([...filters, value]);
    }
    console.log(filters);
  };

  const applyFilter = async () => {
    if (filters.length || search) {
      let searchFee = fees.filter((fee) =>
        fee.name.toLowerCase().includes(search)
      );

      const today = new Date();

      if (filters.includes("HET_HAN_TRONG_1_TUAN")) {
        searchFee = searchFee.filter(
          (f) => getDaysBetweenDates(f.deadline, today) <= 7
        );
      }

      if (filters.includes("DA_HOAN_THANH")) {
        searchFee = searchFee.filter((fee) => fee.finished === fee.count);
      }

      if (filters.includes("THANG_NAY")) {
        searchFee = searchFee.filter((fee) => {
          const deadlineDay = new Date(fee.deadline);
          return (
            deadlineDay.getFullYear() === today.getFullYear() &&
            deadlineDay.getMonth() === today.getMonth()
          );
        });
      }

      setFilterFees(searchFee);
      console.log(searchFee);
    } else {
      setFilterFees(fees);
      console.log(fees);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [fees, search, filters]);

  useEffect(() => {
    getAllFees();
    loadFeeTypes();
  }, [token]);

  //for createFee

  useEffect(() => {
    resetPayinfo();
  }, [residents]);

  const resetPayinfo = () => {
    const newFeePayInfo = rooms.map((e) => ({
      name: e.name,
      value: 0,
    }));

    setFeepayInfo(newFeePayInfo);
  };

  const handleCostChange = (index, newValue) => {
    setFeepayInfo((prev) =>
      prev.map((resident, i) =>
        i === index ? { ...resident, cost: newValue } : resident
      )
    );

    console.log(feepayInfo);
  };

  const handleCSVFile = async (e) => {
    const csv = e.target.file[0];
    setCsvFile(e.target.files[0]);
    console.log(csv);
    try {
      const form = new FormData();
      
      form.append("feeFile", csv)
      const { data } = await axios.post(backendUrl + "/api/fees/csv", form);
      setFeepayInfo(
        data.data.map((payinfo) => ({
          name: payinfo.name,
          value: payinfo.value,
        }))
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let info = structuredClone(feepayInfo);

    if (feeType === "TU_NGUYEN") {
      info = feepayInfo.map((e) => ({ ...e, value: 0 }));
    }

    const today = new Date();
    const deadlineDate = new Date(deadline);
    console.log(deadlineDate, today);

    if (deadlineDate < today) {
      toast.error("Hạn nộp phải lớn hơn hôm nay");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("isOptional", feeType === "BAT_BUOC" ? false : true);
      formData.append("name", name);
      formData.append("lowerBound", lowerBound);
      formData.append("typeId", typeId);
      formData.append("month", month);
      formData.append("year", year);
      formData.append("feeList", JSON.stringify(info));
      formData.append("deadline", deadline);

      const { data } = await axios.post(backendUrl + "/api/fees", formData, {
        headers: { createfeetoken },
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDeadline("");
        resetPayinfo();
        getAllFees();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //utility funtion

  const formatDate = (d) => {
    const date = new Date(d);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Format as dd/mm/yyyy
    return `${day}/${month}/${year}`;
  };

  const isExpired = (d) => {
    const deadline = new Date(d);
    const today = new Date();

    return deadline < today ? true : false;
  };

  function getDaysBetweenDates(date1, date2) {
    // Convert date strings to Date objects
    const startDate = new Date(date1);
    const endDate = new Date();

    // Get time values in milliseconds
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    // Calculate the difference in milliseconds
    const timeDifference = endTime - startTime;

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.abs(Math.round(daysDifference)); // Return absolute value and round off
  }

  return (
    <div className="w-full h-screen relative p-2 px-8">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        idFeeModal={idFeeModal}
      />
      <div className="flex justify-between py-4 items-center">
        <p className="text-2xl font-bold text-gray-600">Danh sách khoản thu</p>
        <div
          className={` focus-within:shadow-custom-green  relative w-1/3 rounded-full z-10 transition-all `}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer w-full p-2 px-4 border-2 outline-none  text-gray-500 rounded-full focus:border-secondary transition-all"
            placeholder="ex: tiền điện, tiền nước"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-3 right-3 text-xl text-gray-500 peer-focus:-translate-x-2 peer-focus:scale-110 transition-all"
          />
        </div>
        <div
          onClick={(e) => setShowCreateFee(!showCreateFee)}
          className={`${
            showCreateFee ? "backdrop-blur-sm shadow-custom-green" : ""
          } inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}
        >
          <p className="text-center font-semibold">Tạo khoản thu mới</p>
          <FontAwesomeIcon
            icon={faPlus}
            className={
              showCreateFee
                ? "rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out"
                : "transition-all duration-500 ease-in-out"
            }
          />
        </div>
      </div>

      {/* create fee */}
      <form
        onSubmit={handleSubmit}
        className={`${
          showCreateFee ? "backdrop-blur-lg" : "hidden"
        } absolute right-1/2 translate-x-1/2 top-32  z-10 flex gap-16 px-8 py-8 bg-white max-w-[750px] items-start shadow-lg transition-all`}
      >
        <div className="flex flex-col items-start gap-6 min-w-[600px]">
          <div className="flex justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <p className="text-gray-500 font-medium text-lg ">
                Loại khoản thu:
              </p>
              <select
                name=""
                id=""
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="text-gray-500 bg-gray-50 border-b-2 outline-none p-1 px-2  focus:border-secondary transition-all"
              >
                <option value="BAT_BUOC">Bắt buộc</option>
                <option value="KHONG_BAT_BUOC">Không bắt buọc </option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-500 font-medium text-lg ">Hạn nộp</p>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="text-gray-500 border-b-2 outline-none p-1 px-2  focus:border-secondary transition-all"
              />
            </div>
          </div>
          {feeType === "KHONG_BAT_BUOC" ? (
            <div className="flex items-center gap-4 w-full">
              <p className="text-gray-500 font-medium text-lg ">
                Tên khoản thu:
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-w-[300px] border-b-2 outline-none p-1 px-2 text-gray-500 focus:border-secondary transition-all"
                required
                placeholder="ex: Tiền điện tháng 8"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 ">
              <p className="text-gray-500 font-medium text-lg ">
                Tên phí bắt buộc:
              </p>
              <select
                name=""
                id=""
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className="text-gray-500 bg-gray-50 border-b-2 outline-none p-1 px-2  focus:border-secondary transition-all"
              >
                {nonOptionalType.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {feeType === "BAT_BUOC" && (
            <div className="flex gap-16 justify-between">
              <div className="flex items-center gap-4 ">
                <p className="text-gray-500 font-medium text-lg ">Tháng :</p>
                <select
                  name=""
                  id=""
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="text-gray-500 bg-gray-50 border-b-2 outline-none p-1 px-2  focus:border-secondary transition-all"
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (index) => (
                      <option key={index} value={index}>
                        Tháng {index}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex items-center gap-4 ">
                <p className="text-gray-500 font-medium text-lg">Năm : </p>
                <input
                  type="number"
                  className="text-primary border-b-2 outline-none p-1 px-2  focus:border-secondary transition-all"
                  placeholder="2024"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex mt-4 gap-12 items-start justify-start w-full max-h-[300px]">
            <p className="text-lg text-gray-500 font-medium">
              Phí :<br />{" "}
              <span className="text-sm text-secondary">(ngàn đồng)</span>{" "}
            </p>
            {feeType === "HOA_DON" ? (
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                {feepayInfo.map((resident, index) => (
                  <div className="min-h-[34px]" key={index}>
                    <span className="text-normal text-gray-500">
                      {resident.room} :
                    </span>
                    <input
                      type="number"
                      value={resident.cost}
                      onChange={(e) => {
                        handleCostChange(index, e.target.value);
                      }}
                      className="max-w-[200px] text-red-400 mx-2 p-1 px-2 border-b-2 outline-none focus:border-b-secondary transition-all"
                      placeholder="ex: 200"
                      required
                    />
                  </div>
                ))}
              </div>
            ) : feeType === "BAT_BUOC" ? (
              <>
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
              </>
            ) : (
              <p className="text-red-400 p-1 px-2 border-b-2">
                {" "}
                * không giới hạn
              </p>
            )}
          </div>

          <button
            type="submit"
            className="min-w-[30%]  flex justify-center max-w-[40%] self-end p-4 px-8 mt-1 rounded-xl text-white font-medium text-lg mr-6 bg-secondary hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] hover:opacity-60 hover:-translate-x-4 transition-all"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            ) : (
              <span className="font-medium text-white tracking-wide">
                Tạo khoản thu
              </span>
            )}
          </button>
        </div>
      </form>

      {/* main section */}
      <section
        className={`p-8 py-6 h-[85%] z-0  bg-white border rounded-xl transition-all duration-700 ${
          showCreateFee || isModalOpen ? "blur-sm bg-gray-300 opacity-60" : ""
        } `}
      >
        {/* filter */}
        <div className="flex justify-between items-center mb-4 select-none">
          <div className="inline-flex items-center gap-4 p-2 px-4 rounded-full text-xl text-gray-600  hover:translate-x-2 transition-all">
            <FontAwesomeIcon icon={faFilter} />
            <span>Bộ lọc :</span>
          </div>

          <div className="flex px-6 gap-8">
            <div
              onClick={(e) => toggleFilter("THANG_NAY")}
              className={`${
                filters.includes("THANG_NAY")
                  ? "bg-secondary border-none text-white"
                  : ""
              }  inline-flex items-center gap-4 p-2 px-4 rounded-full text-gray-500 border-2 hover:-translate-x-2 cursor-pointer transition-all`}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Tạo trong tháng này</span>
            </div>
            <div
              onClick={(e) => toggleFilter("DA_HOAN_THANH")}
              className={`${
                filters.includes("DA_HOAN_THANH")
                  ? "bg-secondary border-none text-white"
                  : ""
              }  inline-flex items-center gap-4 p-2 px-4 rounded-full text-gray-500 border-2 hover:-translate-x-2 cursor-pointer transition-all`}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Đã hoàn thành</span>
            </div>
            <div
              onClick={(e) => toggleFilter("HET_HAN_TRONG_1_TUAN")}
              className={`${
                filters.includes("HET_HAN_TRONG_1_TUAN")
                  ? "bg-secondary border-none text-white"
                  : ""
              }  inline-flex items-center gap-4 p-2 px-4 rounded-full text-gray-500 border-2 hover:-translate-x-2 cursor-pointer transition-all`}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Hết hạn trong 1 tuần</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1fr_1fr] bg-gray-50 p-4 px-4 text-gray-500 rounded-t-md">
          <div className="font-medium">ID</div>
          <div className="font-medium">Tên</div>
          <div className="font-medium">Phí</div>
          <div className="font-medium text-center">Hoàn thành</div>
          <div className="font-medium text-center">Ngày tạo</div>
          <div className="font-medium ml-4">Hạn nộp</div>
        </div>
        <div className="flex flex-col max-h-[60vh] overflow-y-auto">
          {filterFees.map((fee, index) => (
            <div
              key={index}
              className={`group grid grid-cols-[1fr_1.2fr_0.8fr_0.8fr_1fr_1fr] min-h-[64px] p-2 px-4 items-center border-b border-b-gray-100 text-gray-700 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="max-w-[130px] break-words text-sm text-gray-400">
                {" "}
                {fee.id}{" "}
              </div>
              <div className="text-gray-600 "> {fee.name} </div>
              <div className="">
                {" "}
                {!fee.isOptional ? (
                  <div
                    className=" text-red-300 p-2 bg-red-50 rounded-full font-semibold text-center cursor-pointer hover:opacity-80 "
                    onClick={() => {
                      setIsModalOpen(true);
                      setIdFeeModal(fee);
                    }}
                  >
                    {" "}
                    Bắt buộc <FontAwesomeIcon icon={faPen} />
                  </div>
                ) : (
                  <div className="max-w-[130px] text-center p-2 px-2 bg-violet-50 text-violet-400 text-sm font-semibold rounded-full">
                    {" "}
                    Tự nguyện{" "}
                  </div>
                )}{" "}
              </div>
              <div className="text-center font-medium">
                <span className="font-medium text-primary">
                  {" "}
                  {fee?.finished}{" "}
                </span>
                /{" "}
                <span className="font-medium text-gray-500">
                  {" "}
                  {fee?.count || "gì đây"}{" "}
                </span>
              </div>
              <div className="text-center text-gray-400 ">
                {" "}
                {formatDate(fee.createdAt)}{" "}
              </div>
              <div className="text-center text-gray-400">
                {isExpired(fee.deadline) ? (
                  <span className="line-through">
                    {formatDate(fee.deadline)}
                  </span>
                ) : (
                  <span> {formatDate(fee.deadline)} </span>
                )}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteFee(fee._id)}
                  className="ml-6 invisible group-hover:visible"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fee;
