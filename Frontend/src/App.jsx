import React, { useContext } from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Fee from './pages/Fee'
import Resident from './pages/Resident'
import Admin from './pages/Admin'
import History from './pages/History'
import SideBar from './components/SideBar'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { token, setToken } = useContext(AppContext);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      {!token ? (
        <Login />
      ) : (
        <div className='flex bg-gray-100 transition-all'>
          <SideBar />
          <div className='h-screen w-[84%]'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/fee' element={<Fee />} />
              <Route path='/history' element={<History />} />
              <Route path='/resident' element={<Resident />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App