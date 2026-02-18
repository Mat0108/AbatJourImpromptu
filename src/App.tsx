
import React,{ createRef, lazy, Suspense, useRef, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie';
import { Dialog, DialogPanel } from "@headlessui/react";
import { HelmetProvider } from 'react-helmet-async';

import './index.css'
import './ReactToastify.css'
import Home from './Screens/Home';
import Loading from './Component/Loading/Loading';
import { LanguageProvider } from './Component/languages';
import AdminLogin from './Screens/Admin/Admin_login';
import AdminMain from './Screens/Admin/Admin_main';
import Admin_home from './Screens/Admin/Home/Admin_home';

function App() {
  const [isOpen,setIsOpen] = useState(false)
  const [popup,setPopup] = useState()
  const isMobile = window.screen.width < 600;
  const scrollRef = useRef(null);
  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor font-mt`}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <LanguageProvider>
      <HelmetProvider>
          <Router> 
            <div className="relative flex flex-col overflow-y-auto custom-scrollbar" ref={scrollRef}>
              <Suspense fallback={<div className='w-full h-[calc(100vh-56px)] flex center bg-mainColor'><Loading darkMode/></div>}>
                  <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                            <div className="fixed inset-0 flex w-screen flex items-center justify-center p-1 lg:p-4">
                                <DialogPanel>{popup}</DialogPanel> 
                                    
                                
                            </div>
                </Dialog>
                <Routes >        
                  <Route path="/" element={<Home setPopup={setPopup} setIsOpenPopup={setIsOpen}/>}></Route>
                  <Route path="/admin" element={<AdminLogin/>}></Route>
                  <Route path="/admin/main" element={<AdminMain />}></Route>
                  <Route path="/admin/home" element={<Admin_home/>}></Route>
                  
                </Routes>
              </Suspense>
            </div>
            <ToastContainer
                // icon={(type) =>
                //     <img
                //       src={`./images/toast/${type.type}.svg`}
                //       alt={type.type}
                //     />
                // }
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={"w-fit"}
                />
          </Router>
          </HelmetProvider>
        </LanguageProvider>
      </CookiesProvider>
    </div>
  )
}``

export default App
