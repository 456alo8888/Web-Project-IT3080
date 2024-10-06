import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faPerson, faPiggyBank, faRightFromBracket, faTableColumns, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const SideBar = () => {

  const navigate = useNavigate();



  const {username, setUsername, token, setToken, updatefeetoken, setUpdatefeetoken, createfeetoken, setCreatefeetoken, updateresidenttoken, setUpdateresidenttoken, roottoken, setRoottoken, backendUrl } = useContext(AppContext)


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
    roottoken && setRoottoken('');
    localStorage.removeItem('roottoken');

    toast.success("Log out")
  }


  return (
    <div className='w-[16%] bg-white  flex flex-col items-center justify-start border-r'>
      <img className='w-[164px] -mt-4 -mb-4' src={assets.logo_website} alt="" />
      <hr className='w-1/2 border-2 rounded-lg border-primary -mt-2 mb-2' />
      <ul>
        <NavLink to='/'>
          <li className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faTableColumns} className='' />
            Bảng quản lí</li>
        </NavLink>
        <NavLink to='/fee'>
          <li className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faPiggyBank} />Khoản thu</li>
        </NavLink>
        <NavLink to='/resident'>
          <li className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faPerson} />Cư dân</li>
        </NavLink>
        <NavLink to='/history'>
          <li className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faClockRotateLeft} />Lịch sử</li>
        </NavLink >
        <NavLink to='/admin'>
          <li className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-white hover:bg-[rgba(126,188,110,0.32)] transition-all'>
            <FontAwesomeIcon icon={faUserTie} />Admin</li>
        </NavLink>
      </ul>

      <hr className='w-1/2 border-2 rounded-lg border-primary mt-2 mb-2' />

      <section className='mt-4 text-center'>
        <p className='text-gray-600 font-semibold text-lg'>@{username}</p>
        <ul className='mt-3 mb-2'>
          <li className={`flex items-center gap-2 text-[14px] font-semibold my-2 ${updatefeetoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${updatefeetoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Cập nhật khoản thu</li>
          <li className={`flex items-center gap-2 text-[14px] font-semibold my-2 ${createfeetoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${createfeetoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Tạo khoản thu mới</li>
          <li className={`flex items-center gap-2 text-[14px] font-semibold my-2 ${updateresidenttoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${updateresidenttoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Cập nhật dân cư</li>
          <li className={`flex items-center gap-2 text-[14px] font-semibold my-2 ${roottoken ? 'text-primary' : 'text-gray-500'}`}><p className={`w-2 h-2 ${roottoken ? 'bg-primary' : 'bg-gray-500'} rounded-full`}></p> Thêm, xóa admin</li>
        </ul>
      </section>

      <div onClick={logout} className='px-8 flex justify-start items-center gap-2 text-base font-semibold text-gray-500 py-3  my-4  rounded-lg hover:text-primary hover:bg-[rgba(126,188,110,0.32)] transition-all cursor-pointer'>
        <FontAwesomeIcon icon={faRightFromBracket} />Đăng xuất</div>


    </div>
  )
}

export default SideBar