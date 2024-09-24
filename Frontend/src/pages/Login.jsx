import React from 'react'
import './Login.css'
import { assets } from '../assets/assets.js'


const Login = () => {
    return (
        <div className='login-background flex justify-center items-center  '>
            <div className="login-container min-w-[60%] min-h-[72%] bg-white opacity-90 flex ">
                <div className="form-container flex-2 max-w-[420px] px-14 pt-10">
                    <p className="text-4xl text-primary font-bold tracking-wide mb-1 ">Đăng nhập</p>
                    <p className="text-sm text-gray-400  ">chào mừng ban quản trị <br />
                        để được cấp tài khoản, hãy liên hệ với root</p>
                    <div className='mt-8'>
                        <p className="text-base font-semibold text-gray-500 mb-2">Tên tài khoản</p>
                        <input type="text" className='transition-all p-2 px-4 border-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-lg w-[100%] text-gray-500 placeholder-grey-100' placeholder='ex:taolaadmin' />
                    </div>
                    <div className='mt-4 mb-4'>
                        <p className="text-base font-semibold text-gray-500 mb-2">Mật khẩu</p>
                        <input type='password' className='transition-all p-2 px-4 border-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-lg w-[100%] text-gray-500 text-base placeholder-grey-100 placeholder-text-sm' placeholder='ex:123456' />
                    </div>
                    <label class="inline-flex items-center">
                        <input type="checkbox" class="transition-all h-4 w-4 accent-primary text-grey-200 border-gray-300 rounded-full focus:ring-blue-500" />
                        <span class="ml-2">Tôi đồng ý với các điều khoản</span>
                    </label>
                    <button className='w-full mt-4 p-3 bg-primary rounded-2xl hover:opacity-[90%] hover:-translate-y-1 transition-all transition-1  text-xl font-bold text-white tracking-wide'>Submit</button>
                    <div className="flex justify-center items-center p-2">
                        <p className='text-sm'>Tại đây có? <span className='ml-1 text-primary cursor-pointer hover:underline '>Đổi mật khẩu</span></p>
                    </div>
                    <div className="flex justify-end w-full items-center mt-4 gap-2 -mb-2 ">
                        <p className='text-xs'>một sản phẩm của</p>
                        <img src={assets.logo} className='max-w-20  object-cover' alt="logo" />
                    </div>
                </div>
                <div className="bg-[rgba(126,188,110,0.55)] flex-3 grow flex flex-col relative">
                    <img src={assets.logo_website} className='absolute w-28 object-cover -top-2 right-2' alt="logo_website" />
                    <img src={assets.meme} alt="meme" className='-ml-4' />
                    <div className='px-16 -mt-[72px]'>
                    <p className='text-4xl text-gray-100 font-bold tracking-wider text-white mb-2'>Giải pháp <br /> quản trị chung cư</p>
                    <p className='text-gray-700'>chuyên nghiệp, dễ dàng, hiệu quả</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login