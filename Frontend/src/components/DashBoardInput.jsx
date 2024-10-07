import React, { useEffect, useState } from 'react'

const DashBoardInput = ({ fee, res, handleSubmit }) => {
    const [inputValue, setInputValue] = useState('')

    
    const feeinfo = fee.feepayInfo.find(e => e.room === res.room)
    const type = fee.feeType
    
    useEffect(() => {
        setInputValue(feeinfo ? feeinfo.payed : 0)
    }, [fee, res])

    
    if (!feeinfo) {
        return (
            <div className='text-sm font-medium text-gray-400'>không tham gia</div>
        )
    }



    return (
        <div className='group flex items-center justify-between py-1 px-4 pr-8'>
            {type === 'TU_NGUYEN' ? (
                <input type="number" className=' max-w-[80px] rounded-lg py-1 px-2 font-medium text-violet-400 border-b-2 border-b-violet-200 outline-none focus:border-b-violet-400 transition-all' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            ) : (
                <div className='text-gray-400 flex'>
                    <p className={` ${feeinfo.payed > 0 ? 'text-primary' : ''} font-medium min-w-[30px]`}>{feeinfo.payed} </p>
                    <p className={` ${type === 'BAT_BUOC' ? 'text-red-300' : 'text-sky-300'} font-medium `}>/ {feeinfo.cost}</p>
                </div>
            )}
            <button onClick={() => handleSubmit(fee, res, inputValue > 0 ? inputValue : feeinfo.cost)} className='p-1 px-3 text-sm rounded-full bg-secondary shadow-md text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 hover:-translate-x-1 transition-all'>nộp</button>
        </div>
    )
}

export default DashBoardInput