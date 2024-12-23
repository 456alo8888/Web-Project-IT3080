import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminInfo = ({ admin }) => {

    const { backendUrl, roottoken, getAllAdmins } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)
    const [updateAuth, setUpdateAuth] = useState({
        updateFeeAuthority: admin.updateFeeAuthority,
        createFeeAuthority: admin.createFeeAuthority,
        updateResidentAuthority: admin.updateResidentAuthority,
        receiveAuthority: admin.receiveAuthority,
    })

    const deleteAdmin = async () => {

        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa admin này?')
        if (confirmDelete) {
            try {

                const { data } = await axios.post(backendUrl + '/api/admin/delete-admin', { username: admin.username }, { headers: { roottoken } })

                if (data.success) {
                    toast.success(data.message);
                    getAllAdmins();
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error(error.response.data.message)
            }
        }



    }



    const handleUpdate = async () => {

        try {
            console.log(updateAuth);
            
            const { data } = await axios.post(backendUrl + '/api/admin/change-authority', {
                username: admin.username,
                updateFeeAuth: updateAuth.updateFeeAuthority,
                createFeeAuth: updateAuth.createFeeAuthority,
                updateResidentAuth: updateAuth.updateResidentAuthority,
                receiveAuthority: updateAuth.receiveAuthority
            }, { headers: { roottoken } })

            if (data.success) {
                toast.success(data.message);
                setIsEdit(!isEdit)
                getAllAdmins();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }

    }




    return (
        <div className=' relative flex flex-col gap-4 p-6 hover:border-secondary hover:shadow-custom-green border-2 rounded-xl min-h-[50vh] max-h-[340px] transition-all'>
            <div className=' flex min-h-[32px] text-gray-600 text-lg'>
                <p className='font-semibold'>Họ tên: </p>
                <p className='text-gray-500 ml-4 font-semibold border-b-2 min-w-[200px]'>{admin.name}</p>
            </div>
            <div className=' flex min-h-[32px] text-gray-600 text-lg'>
                <p className='font-semibold'>Tên tài khoản: </p>
                <p className='text-gray-500 ml-4 font-semibold border-b-2 min-w-[200px]'>{admin.username}</p>
            </div>
            {isEdit ?
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" checked={updateAuth.updateFeeAuthority} onChange={(e) => setUpdateAuth({...updateAuth, updateFeeAuthority: e.target.checked}) } className="transition-all h-4 w-4 accent-primary text-gray-200 border-gray-300 rounded-full " />
                        <span className={`${updateAuth.updateFeeAuthority ? 'text-primary' : 'text-gray-400'} ml-4 font-semibold transition-all`}>Quyền cập nhật khoản thu </span>
                    </label>
                </div>
                : <div className={`${admin.updateFeeAuthority ? 'text-primary' : ''} font-semibold text-gray-400 min-h-[27px]`}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className='font-semibold ml-4'>Quyền cập nhật khoản thu</span>
                </div>
            }
            {isEdit ?
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" checked={updateAuth.createFeeAuthority} onChange={(e) => setUpdateAuth({...updateAuth, createFeeAuthority: e.target.checked}) } className="transition-all h-4 w-4 accent-primary text-gray-200 border-gray-300 rounded-full " />
                        <span className={`${updateAuth.createFeeAuthority ? 'text-primary' : 'text-gray-400'} ml-4 font-semibold transition-all`}>Quyền tao khoản thu </span>
                    </label>
                </div>
                : <div className={`${admin.createFeeAuthority ? 'text-primary' : ''} font-semibold text-gray-400 min-h-[27px]`}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className='font-semibold ml-4'>Quyền tạo khoản thu</span>
                </div>
            }
            {isEdit ?
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" checked={updateAuth.updateResidentAuthority} onChange={(e) => setUpdateAuth({...updateAuth, updateResidentAuthority: e.target.checked}) } className="transition-all h-4 w-4 accent-primary text-gray-200 border-gray-300 rounded-full " />
                        <span className={`${updateAuth.updateResidentAuthority ? 'text-primary' : 'text-gray-400'} ml-4 font-semibold transition-all`}>Quyền cập nhật dân cư </span>
                    </label>
                </div>
                : <div className={`${admin.updateResidentAuthority ? 'text-primary' : ''} font-semibold text-gray-400 min-h-[27px]`}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className='font-semibold ml-4'>Quyền cập nhật dân cư</span>
                </div>
            }
            {isEdit ?
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" checked={updateAuth.receiveAuthority} onChange={(e) => setUpdateAuth({...updateAuth, receiveAuthority: e.target.checked}) } className="transition-all h-4 w-4 accent-primary text-gray-200 border-gray-300 rounded-full " />
                        <span className={`${updateAuth.receiveAuthority ? 'text-primary' : 'text-gray-400'} ml-4 font-semibold transition-all`}>Quyền nhận khoản thu và tạo hóa đơn</span>
                    </label>
                </div>
                : <div className={`${admin.receiveAuthority ? 'text-primary' : ''} font-semibold text-gray-400 min-h-[27px]`}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className='font-semibold ml-4'>Quyền nhận khoản thu và tạo hóa đơn</span>
                </div>
            }

            <div className='absolute flex px-4 gap-8 right-12 bottom-8 text-xl text-gray-500'>
                <button className='hover:opacity-80 hover:-translate-x-1 transition-all' onClick={deleteAdmin}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                {isEdit ?
                    <button onClick={(e) => handleUpdate()} className='hover:opacity-80 text-primary hover:-translate-x-1 transition-all'>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>

                    : <button onClick={(e) => setIsEdit(!isEdit)} className='hover:opacity-80 hover:-translate-x-1 transition-all' >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                }
            </div>

            {/* note */}
                <div className='absolute bottom-2 left-4 text-sm text-red-300 '>*mật khẩu được mã hóa </div>
        </div>
    )
}

export default AdminInfo