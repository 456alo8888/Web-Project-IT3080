import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { ResidentContext } from '../context/ResidentContext'
import { FeeContext } from '../context/FeeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSortDown } from '@fortawesome/free-solid-svg-icons'
import DashBoardInput from '../components/DashBoardInput'
import { toast } from 'react-toastify'
import axios from 'axios'

const Home = () => {

  //data from context
  const { backendUrl, updatefeetoken, token, username} = useContext(AppContext)
  const { residents } = useContext(ResidentContext)
  const { fees, getAllFees, listFees, setListFees, initListFees } = useContext(FeeContext)

  console.log(residents, listFees);


  //state for dashboard
  const [showModalFees, setShowModalFees] = useState(-1)
  const [showChart, setShowChart] = useState(false)

  //effect 
  useEffect(() => {

    initListFees()

  }, [])


  //function to handle submit

  const handleSubmit = async (fee, res, value) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/fee/update-fee', { feeId: fee._id, room: res.room, payed: value, username: username }, { headers: { updatefeetoken } })

      if (data.success) {
        toast.success(data.message)
        getAllFees()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  //function to handle modalfees

  const toggleModal = (value) => {
    if (showModalFees === -1) {
      setShowModalFees(value)
    } else if (showModalFees == value) {
      setShowModalFees(-1)
    } else {
      setShowModalFees(value)
    }
  }

  const handleChangeFee = (index, newfee) => {

    setListFees(listFees.map((f, i) => i === index ? newfee : f))
    setShowModalFees(-1)

  }


  return (
    <div className='relative w-full h-screen p-2 px-8'>
      {/* -----chart----- */}
      <section className={`${showChart ?'backdrop-blur-md shadow-md' : 'hidden'} absolute z-50 right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 bg-white w-[80%] h-[80%]`}>

      </section>

      <section className='flex justify-between py-4 items-center'>
        <p className='text-2xl font-bold text-gray-600'>Bảng quản lí thu chi</p>
        <div onClick={(e) => setShowChart(!showChart)} className={`${showChart ? 'backdrop-blur-md shadow-custom-green' : ''} inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}  >
                    <p className='text-center font-semibold'>Xem thống kê</p>
                    <FontAwesomeIcon icon={faPlus} className={showChart ? 'rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out' : 'transition-all duration-500 ease-in-out'} />
                </div>
      </section>

      <section className={`${showChart ? 'blur-sm opacity-60' : ''} relative p-8 py-6 h-[88%] bg-white rounded-xl transition-all`}>

        <div className='relative z-10 overflow-visible grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] p-4 rounded-t-md bg-gray-50 text-gray-500'>
          <div className=' flex items-center'>
            <div className=' font-bold text-[16px] text-center break-words overflow-y-auto max-h-12 '>Phòng</div>
          </div>
          {listFees.map((fee, index) =>
          (
            <div key={index} onClick={() => toggleModal(index)} className='relative overflow-visible z-10 flex justify-between gap-2 border-l pl-2 pr-4 select-none'>
              <div className='font-medium text-[16px] text-center break-words overflow-y-auto max-h-12 '>{fee.name}</div>
              <FontAwesomeIcon icon={faSortDown} className={` ${showModalFees === index ? 'translate-y-1 opacity-55' : ''} text-lg hover:opacity-60 transition-all`} />
              {/* -----------modal ------------     */}
              <div className={`${showModalFees === index ? 'visible opacity-100' : 'invisible opacity-0'} absolute z-50 flex flex-col top-full mt-2 right-0 border-2 shadow-md max-h-[350px] w-full  bg-white p-2 transition-all`}>
                <div className='overflow-y-auto'>

                  {fees.map((f, index3) => (
                    <div onClick={(e) => handleChangeFee(index, f)} key={f._id} className={` ${f._id === fee._id ? 'bg-[rgba(126,188,110,1)] text-white': listFees.find(temp => temp._id === f._id) ? 'bg-[rgba(126,188,110,0.2)] opacity-80 ' : index3 % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${f.feeType === 'TU_NGUYEN' ? 'text-violet-400' : f.feeType === 'BAT_BUOC' ? 'text-red-300' :'text-sky-300'} shrink-0 min-w-full p-2 font-medium border-b border-b-gray-300 hover:opacity-70 hover:bg-secondary hover:text-white transition-all cursor-pointer`}>
                      {f.name}
                    </div>
                  ))}
                </div>
              </div>
              {/* ------ end modal -------- */}

            </div>

          )
          )}
        </div>

        <div className='relative z-0 flex flex-col max-h-[90%] overflow-y-auto'>
          {residents.map((res, index) => (
            <div key={index} className={`grid grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] min-h-[64px] p-2 px-4 items-center border-b border-b-gray-100 text-gray-700 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className='font-medium text-[18px] text-gray-500'>{res.room}</div>
              {listFees.map((fee, index2) => (
                <div key={index2} className=''>
                  <DashBoardInput fee={fee} res={res} handleSubmit={handleSubmit} />
                </div>
              ))}
            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Home