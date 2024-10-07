import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { FeeContext } from '../context/FeeContext'

const History = () => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [filterHistories, setFilterHistories] = useState([])

  const { histories, getAllHistories, fees } = useContext(FeeContext)



  // funtion to search

  const applySearch = () => {
    
    if (search) {
      setFilterHistories(histories.filter(record => record.username.toLowerCase().includes(search) || record.feeName.toLowerCase().includes(search) || record.room.toLowerCase().includes(search)))
    } else {
      setFilterHistories(histories)
    }
  }

  useEffect(() => {

    applySearch()

  }, [histories, search])



  //utility funtion

  const formatDate = (d) => {
    const date = new Date(d)
    const pad = (n) => (n < 10 ? '0' + n : n);

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }




  return (
    <div className='mb-4 px-8 w-full h-screen relative'>
      <section className='flex justify-between py-6 items-center'>
        <p className='text-2xl font-bold text-gray-600'>Lịch sử cập nhật</p>
        <div className={` focus-within:shadow-custom-green  relative w-1/3 rounded-full z-10 transition-all `}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='peer w-full p-2 px-4 border-2 outline-none  text-gray-500 rounded-full focus:border-secondary transition-all' placeholder='Tìm kiếm: ex 101, meo meo' />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute top-3 right-3 text-xl text-gray-500 peer-focus:-translate-x-2 peer-focus:scale-110 transition-all' />
        </div>
        <div className={`${show ? 'backdrop-blur-md shadow-custom-green' : ''} inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}  >
          <p className='text-center font-semibold'>Thêm cư dân</p>
          <FontAwesomeIcon icon={faPlus} className={show ? 'rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out' : 'transition-all duration-500 ease-in-out'} />
        </div>
      </section>


      <section className={`${show ? 'blur-sm opacity-60' : ''} relative p-8 py-6 h-[85%] bg-white rounded-xl transition-all`}>
        <div className='grid grid-cols-[1fr_1fr_0.5fr_0.7fr_0.7fr_1fr_1fr]  bg-gray-50 p-4 rounded-t-md'>
          <div className='text-gray-500 font-semibold'>ID</div>
          <div className='text-gray-500 font-semibold'>Tên khoản thu</div>
          <div className='text-gray-500 font-semibold'>Phòng</div>
          <div className='text-gray-500 font-semibold'>Phải thu</div>
          <div className='text-gray-500 font-semibold'>Nộp</div>
          <div className='text-gray-500 font-semibold'>Admin</div>
          <div className='text-gray-500 font-semibold'>Thời gian</div>
        </div>

        <div className='flex flex-col max-h-[90%] overflow-y-auto'>
          {filterHistories.map((record, index) => (
            <div key={index} className={`grid grid-cols-[1fr_1fr_0.5fr_0.7fr_0.7fr_1fr_1fr] min-h-[64px] p-2 px-4 items-center border-b border-b-gray-100 text-gray-700 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className='font-medium text-[18px] text-gray-500 max-w-[80%] overflow-x-auto'>{record.feeId}</div>
              <div className='font-medium text-[18px] text-gray-500'>{record.feeName}</div>
              <div className='font-medium text-[18px] text-gray-700'>{record.room}</div>
              <div className='font-medium text-[18px] text-gray-500'>{record.feeCost}</div>
              <div className='font-medium text-[18px] text-secondary'>{record.roomPayed}</div>
              <div className='font-medium text-[18px] text-gray-500'>@{record.username}</div>
              <div className='font-medium text-[18px] text-gray-500'>{formatDate(record.updateAt)}</div>

            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default History