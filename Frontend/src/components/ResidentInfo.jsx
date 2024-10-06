import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faPen, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { ResidentContext } from '../context/ResidentContext';



const ResidentInfo = ({ resident }) => {

  const { backendUrl, updateresidenttoken } = useContext(AppContext)
  const { getAllResidents } = useContext(ResidentContext)

  const [isEdit, setIsEdit] = useState(false)

  const [updateResident, setUpdateResident] = useState({
    room: resident.room,
    numMember: resident.numMember,
    name: resident.name,
    age: resident.age,
    gender: resident.gender,
    cccd: resident.cccd,
    phone: resident.phone,
  })


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateResident((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  }

  const resetForm = () => {

    setUpdateResident({
      room: resident.room,
      numMember: resident.numMember,
      name: resident.name,
      age: resident.age,
      gender: resident.gender,
      cccd: resident.cccd,
      phone: resident.phone,
    })

  }

  const handleGiveUp = () => {

    resetForm();
    setIsEdit(false);

  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()
      formData.append('room', updateResident.room)
      formData.append('name', updateResident.name)
      formData.append('gender', updateResident.gender)
      formData.append('age', Number(updateResident.age))
      formData.append('numMember', Number(updateResident.numMember))
      formData.append('cccd', updateResident.cccd)
      formData.append('phone', updateResident.phone)

      const { data } = await axios.post(backendUrl + '/api/resident/update-resident', formData, { headers: { updateresidenttoken } })

      if (data.success) {
        toast.success(data.message);
        getAllResidents();
        resetForm();
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const deleteResident = async () => {

    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa cư dân này?')
    if (confirmDelete) {
      try {

        const { data } = await axios.post(backendUrl + '/api/resident/delete-resident', { room: resident.room }, { headers: { updateresidenttoken } })

        if (data.success) {
          toast.success(data.message);
          getAllResidents();
        } else {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }

  }



  return (
    <form onSubmit={handleUpdateSubmit} className='flex h-[32vh] p-2 rounded-lg border-2 bg-gray-100'>
      <div className='flex flex-col justify-between items-start text-gray-500 text-xl'>
        <img src={resident.image} alt="avatar" className='max-w-[150px]  object-cover' />
        <div className='flex justify-between w-[120px] m-4 mx-4 p-1'>
          <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={deleteResident} />
          {isEdit ?
            <div className='flex gap-3'>
              <button onClick={handleGiveUp}>
                <FontAwesomeIcon icon={faXmark} className='text-red-400 cursor-pointer' />
              </button>
              <button type='submit'>
                <FontAwesomeIcon icon={faCheck} className='text-primary cursor-pointer' type='submit' />
              </button>
            </div>
            : <FontAwesomeIcon icon={faPen} onClick={(e) => setIsEdit(true)} className='cursor-pointer' />}
        </div>
      </div>
      <div className='flex flex-col grow min-h-[80%] p-4'>
        <div className='text-lg mb-2 flex justify-between'>
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Số phòng:</span>
              <input required type="text" name='room' value={updateResident.room} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[40px] rounded-sm' placeholder={resident.room} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Số phòng:</span> {resident.room} </p>
          }
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Thành viên:</span>
              <input required type="number" name='numMember' value={updateResident.numMember} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[20px] rounded-sm' placeholder={resident.numMember} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Thành viên:</span> {resident.numMember} </p>
          }        </div>
        <div className='text-lg mb-2'>
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Tên:</span>
              <input required type="text" name='name' value={updateResident.name} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[240px] rounded-sm' placeholder={resident.name} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Tên:</span> {resident.name} </p>
          }
        </div>
        <div className='flex justify-between text-lg mb-2'>
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Tuổi:</span>
              <input required type="number" name='age' value={updateResident.age} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[40px] rounded-sm' placeholder={resident.age} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Tuổi:</span> {resident.age} </p>
          }
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Giới tính:</span>
              <select name='gender' value={updateResident.gender} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[80px] rounded-sm'>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Giới tính:</span> {resident.gender === ' male' ? 'Nam' : 'Nữ' } </p>
          }
        </div>
        <div className='text-lg mb-2'>
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>CCCD:</span>
              <input required type="text" name='cccd' value={updateResident.cccd} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[200px] rounded-sm' placeholder={resident.cccd} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>CCCD:</span> {resident.cccd} </p>
          }
        </div>
        <div className='text-lg mb-2'>
          {isEdit ?
            <div className='flex'>
              <span className='font-semibold'>Số điện thoại:</span>
              <input required type="text" name='phone' value={updateResident.phone} onChange={handleChange} className='px-1 ml-2 outline-none border focus:border-secondary max-w-[130px] rounded-sm' placeholder={resident.phone} />
            </div>
            :
            <p><span className='font-semibold text-lg mr-2'>Số điện thoại:</span> {resident.phone} </p>
          }
        </div>

        <div>

        </div>

      </div>
    </form>
  )
}

export default ResidentInfo