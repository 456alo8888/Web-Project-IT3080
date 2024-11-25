import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faPerson, faPiggyBank, faRightFromBracket, faTableColumns, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const SideBar = () => {

  const navigate = useNavigate();



  const {username, setUsername, token, setToken, updatefeetoken, setUpdatefeetoken, createfeetoken, setCreatefeetoken, updateresidenttoken, setUpdateresidenttoken, receivetoken, setReceivetoken, roottoken, setRoottoken, backendUrl } = useContext(AppContext)


  const logout = () => {
    navigate('/')

    username && setUsername('')
    localStorage.removeItem('username')

    token && setToken('');
    localStorage.removeItem('token');
    updatefeetoken && setUpdatefeetoken('');
    localStorage.removeItem('updatefeetoken');
    createfeetoken && setCreatefeetoken('');
    localStorage.removeItem('createfeetoken');
    updateresidenttoken && setUpdateresidenttoken('');
    localStorage.removeItem('updateresidenttoken');
    receivetoken && setReceivetoken('');
    localStorage.removeItem('receivetoken');
    roottoken && setRoottoken('');
    localStorage.removeItem('roottoken');

    toast.success("Log out")
  }


  return (
    <div className='w-[16%] h-screen bg-white  flex flex-col items-center justify-start border-r'>
      <img className='w-[164px] -mt-4 -mb-4' src={assets.logo_website} alt="" />
      <hr className='w-1/2 border-2 rounded-lg border-primary -mt-2 mb-2' />
      <ul>
        <NavLink to='/'>
          <li className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faTableColumns} className='' />
            Bảng quản lí</li>
        </NavLink>
        <NavLink to='/fee'>
          <li className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faPiggyBank} />Khoản thu</li>
        </NavLink>
        <NavLink to='/resident'>
          <li className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faPerson} />Cư dân</li>
        </NavLink>
        <NavLink to='/history'>
          <li className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faClockRotateLeft} />Lịch sử</li>
        </NavLink >
        <NavLink to='/admin'>
          <li className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faUserTie} />Admin</li>
        </NavLink>
      </ul>

      <hr className='w-1/2 border-2 rounded-lg border-primary mt-2 mb-[1vh]' />

      <section className='mt-[1vh] max-h-[20vh] text-center'>
        <p className='text-gray-600 font-semibold text-[2vh]'>@{username}</p>
        <ul className='mt-[1vh] mb-1'>
          <li className={`flex items-center gap-2 text-[1.5vh] font-semibold my-[1vh] hover:-translate-y-1 transition-all ${updatefeetoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${updatefeetoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Cập nhật khoản thu</li>
          <li className={`flex items-center gap-2 text-[1.5vh] font-semibold my-[1vh] hover:-translate-y-1 transition-all ${createfeetoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${createfeetoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Tạo khoản thu mới</li>
          <li className={`flex items-center gap-2 text-[1.5vh] font-semibold my-[1vh] hover:-translate-y-1 transition-all ${updateresidenttoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${updateresidenttoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Cập nhật dân cư</li>
          <li className={`flex items-center gap-2 text-[1.5vh] font-semibold my-[1vh] hover:-translate-y-1 transition-all ${receivetoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${receivetoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Nhận khoản thu</li>
          <li className={`flex items-center gap-2 text-[1.5vh] font-semibold my-[1vh] hover:-translate-y-1 transition-all ${roottoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${roottoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Thêm, xóa admin</li>
        </ul>
      </section>

      <div onClick={logout} className='px-8 flex hover:gap-4 justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-primary hover:bg-[rgba(126,188,110,0.32)] transition-all cursor-pointer'>
        <FontAwesomeIcon icon={faRightFromBracket} />Đăng xuất</div>


    </div>
  )
}

export default SideBar