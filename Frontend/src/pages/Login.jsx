import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {

    const { username,setAdminId, setUsername, token, setToken, setReceivetoken, setUpdatefeetoken, setCreatefeetoken, setUpdateresidenttoken, setRoottoken, backendUrl } = useContext(AppContext)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/login', { username, password })


            if (data.success) {

                localStorage.setItem('username', username);

                localStorage.setItem("token", data.token);
                setToken(data.token);
                localStorage.setItem("updatefeetoken", data.updatefeetoken);
                setUpdatefeetoken(data.updatefeetoken);
                localStorage.setItem("createfeetoken", data.createfeetoken);
                setCreatefeetoken(data.createfeetoken);
                localStorage.setItem("updateresidenttoken", data.updateresidenttoken);
                setUpdateresidenttoken(data.updateresidenttoken);
                localStorage.setItem("roottoken", data.roottoken);
                setRoottoken(data.roottoken);
                localStorage.setItem("receivetoken", data.receivetoken);
                setReceivetoken(data.receivetoken);
                localStorage.setItem("adminId", data.id);
                setAdminId(data.id);
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {

    }, [])

    return (
        <div className='login-background flex justify-center items-center  '>
            <div className="flex login-container min-w-[60%] min-h-[72%] bg-white opacity-90 shadow-2xl overflow-visible ">
                <form onSubmit={onSubmitHandler} className="form-container flex-2 max-w-[420px] px-14 pt-10">
                    <p className="text-4xl text-primary font-bold tracking-wide mb-1 ">Đăng nhập</p>
                    <p className="text-sm text-gray-400  ">chào mừng ban quản trị <br />
                        để được cấp tài khoản, hãy liên hệ với root</p>
                    <div className='mt-8'>
                        <p className="text-base font-semibold text-gray-500 mb-2">Tên tài khoản</p>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='transition-all p-2 px-4 border-2 focus:border-primary  focus:ring-primary outline-none rounded-lg w-[100%] text-gray-500 ' placeholder='ex:taolaROOT' required />
                    </div>
                    <div className='mt-4 mb-4'>
                        <p className="text-base font-semibold text-gray-500 mb-2">Mật khẩu</p>
                        <div className='relative'>
                            <input type={passwordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className=' transition-all p-2 px-4 border-2 focus:border-primary  focus:ring-primary outline-none rounded-lg w-[100%] text-gray-500 text-base placeholder-text-sm' placeholder='ex:12345678' required />
                            <FontAwesomeIcon
                                icon={passwordVisible ? faEye : faEyeSlash}
                                className="absolute top-3 right-3 cursor-pointer text-gray-400"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            />
                        </div>
                    </div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full " required />
                        <span className="ml-2">Tôi đồng ý với các <span className='text-primary '>điều khoản</span> </span>
                    </label>
                    <button type='submit' className='w-full flex justify-center items-center min-h-[52px]  mt-4 p-3 bg-primary rounded-2xl hover:opacity-[90%] hover:-translate-y-1 hover:shadow-[5px_5px_15px_rgba(0,0,0,0.3)] transition-all transition-1 '>
                        {loading ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div> : <span className='font-bold  text-xl  text-white tracking-wide'>Đăng nhập</span>}
                    </button>
                    <div className="flex justify-center items-center p-2">
                        <p className='text-sm'>Tại đây có? <span className='ml-1 text-primary cursor-pointer hover:underline hover:'>Đổi mật khẩu</span></p>
                    </div>
                    <div className="flex justify-end w-full items-center mt-4 gap-2 -mb-2 ">
                        <p className='text-xs'>một sản phẩm của</p>
                        <img src={assets.logo} className='max-w-20  object-cover' alt="logo" />
                    </div>
                </form>

                <div className="bg-[rgba(126,188,110,0.55)] flex-3 grow flex flex-col relative group overflow-visible">
                    <img src={assets.logo_website} className='absolute w-[124px] object-cover -top-4 -right-2' alt="logo_website" />
                    <img src={assets.meme} alt="meme" className='-ml-4 z-10 group-hover:scale-[115%] group-hover:-translate-y-4 scale-110 transition-all duration-500 ease-in-out' />
                    <div className='px-16 -mt-[84px] z-20 group-hover:scale-[110%] group-hover:-translate-y-2 group-hover:translate-x-4 transition-all duration-500 '>
                        <p className='text-4xl  font-bold tracking-wide text-white mb-2 leading-relaxed '>Giải pháp <br /> quản trị chung cư</p>
                        <p className='text-gray-700'>chuyên nghiệp, dễ dàng, hiệu quả</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login