import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import AdminInfo from '../components/AdminInfo';

const Admin = () => {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updateFeeAuthority, setUpdateFeeAuthority] = useState(true)
  const [createFeeAuthority, setCreateFeeAuthority] = useState(false)
  const [updateResidentAuthority, setUpdateResidentAuthority] = useState(false)
  const [receiveAuthority, setReceiveAuthority] = useState(false)
  const [name, setName] = useState('')


  const { backendUrl, roottoken, admins, getAllAdmins, token } = useContext(AppContext)



  useEffect(() => {

    if (!!roottoken) {
      getAllAdmins()
    }

  }, [token])



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append('username', username)
      formData.append('password', password)
      formData.append('updateFeeAuth', updateFeeAuthority)
      formData.append('createFeeAuth', createFeeAuthority)
      formData.append('updateResidentAuth', updateResidentAuthority)
      formData.append('receiveAuthority', receiveAuthority)
      formData.append('name', name)

      const { data } = await axios.post(backendUrl + '/api/admin/signup', formData, { headers: { roottoken } })

      if (data.success) {
        toast.success(data.message)
        setUsername('')
        setPassword('')
        setUpdateFeeAuthority(true)
        setCreateFeeAuthority(false)
        setUpdateResidentAuthority(false)
        setReceiveAuthority(false)
        setName('')

        getAllAdmins();

      } else {
        toast.error(data.message)
      }

      console.log(data);



    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }
  }


  return (
    <div className='mb-4 px-8 w-full h-screen relative'>
      <div className='flex justify-between py-6 items-center'>
        <p className='text-2xl font-bold text-gray-600'>Thông tin admin</p>
        <div onClick={(e) => setShowCreateAdmin(!showCreateAdmin)} className={`${showCreateAdmin ? 'backdrop-blur-md shadow-custom-green' : ''} inline-flex items-center gap-4 mr-2 bg-secondary p-2 px-8 rounded-full text-white text-xl shadow hover:opacity-80 hover:-translate-x-2 transition-all ease-in-out cursor-pointer select-none`}  >
          <p className='text-center font-semibold'>Tạo admin mới</p>
          <FontAwesomeIcon icon={faPlus} className={showCreateAdmin ? 'rotate-[225deg] -translate-x-2 scale-125 transition-all duration-500 ease-in-out' : 'transition-all duration-500 ease-in-out'} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className={`${showCreateAdmin ? 'backdrop-blur-lg' : 'hidden'} absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 min-w-[50%]  z-10 flex gap-16 px-8 py-8 bg-white max-w-6xl items-start shadow-lg transition-all`} >
        <div className='flex flex-col gap-6 grow'>
        <div className='w-full flex gap-2 items-end text-lg'>
              <p className=' text-gray-500  font-medium'>Họ tên</p>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='pt-2 px-4 flex-auto  border-b-2  bg-gray-50 focus:border-secondary outline-none  text-gray-500 transition-all' placeholder='ex: Ngô Tất Tố' required />
          </div>
          <div className='w-full flex gap-2 items-end text-lg'>
            <p className=' text-gray-500  font-medium'>Tên đăng nhập:</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className='pt-2 px-4 flex-auto  border-b-2  bg-gray-50 focus:border-secondary outline-none  text-gray-500 transition-all' placeholder='ex: 101' required />
          </div>
          <div className='w-full flex gap-2 items-end text-lg'>
            <p className=' text-gray-500  font-medium'>Mật khẩu:</p>
            <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} className='pt-2 px-4 flex-auto  border-b-2  bg-gray-50 focus:border-secondary outline-none  text-gray-500 transition-all' placeholder='ex: 101' required />
          </div>

          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={updateFeeAuthority} onChange={(e) => setUpdateFeeAuthority(e.target.checked)} className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full "  />
              <span className={`${updateFeeAuthority ? 'text-primary' : 'text-gray-500'} ml-2 transition-all`}>Quyền cập nhật khoản thu </span>
            </label>
          </div>
          <div>
            <label  className="inline-flex items-center">
              <input  type="checkbox" checked={createFeeAuthority} onChange={(e) => setCreateFeeAuthority(e.target.checked)} className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full "  />
              <span className={`${createFeeAuthority ? 'text-primary' : 'text-gray-500'} ml-2 transition-all`}>Quyền tạo khoản thu </span>
            </label>
          </div>
          <div>
            <label  className="inline-flex items-center">
              <input  type="checkbox" checked={updateResidentAuthority} onChange={(e) => setUpdateResidentAuthority(e.target.checked)} className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full "  />
              <span className={`${updateResidentAuthority ? 'text-primary' : 'text-gray-500'} ml-2 transition-all`}>Quyền cập nhật dân cư </span>
            </label>
          </div>
          <div>
            <label  className="inline-flex items-center">
              <input  type="checkbox" checked={receiveAuthority} onChange={(e) => setReceiveAuthority(e.target.checked)} className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full "  />
              <span className={`${receiveAuthority ? 'text-primary' : 'text-gray-500'} ml-2 transition-all`}>Quyền nhận khoản thu và tạo hóa đơn</span>
            </label>
          </div>


          <button type="submit" className=' max-w-[40%] self-end p-4 px-8 mt-1 rounded-xl text-white font-medium text-lg mr-6 bg-secondary hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] hover:opacity-60 hover:-translate-x-4 transition-all'>
            Gửi thông tin
          </button>

        </div>
      </form>

      <section className={`grid ${!!roottoken ? 'grid-cols-2' : 'grid-cols-1'} gap-8 gap-x-12 p-8 h-[85%] z-0 overflow-y-auto border rounded-xl transition-all duration-700 ${showCreateAdmin ? 'blur-sm bg-gray-300 opacity-60' : ''} ${!roottoken ? 'bg-gray-200 flex items-center justify-center text-gray-500' : 'bg-white'}`}>
        {!!roottoken ? (
          admins.map((admin, index) => (
            <AdminInfo key={index} admin={admin} />
          ))
        ) : (
          <div className="h-full w-full text-center flex items-center justify-center">
            Bạn không có quyền truy cập trang này
          </div>
        )}
      </section>



    </div>
  )
}

export default Admin