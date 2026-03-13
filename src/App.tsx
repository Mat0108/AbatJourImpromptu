
import React,{ createRef, lazy, Suspense, useRef, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie';
import { Dialog, DialogPanel } from "@headlessui/react";
import { HelmetProvider } from 'react-helmet-async';
import { PrimeReactProvider } from 'primereact/api';

import './index.css'
import './ReactToastify.css'
import Home from './Screens/Home';
import Loading from './Component/Loading/Loading';
import { LanguageProvider } from './Component/languages';
import AdminLogin from './Screens/Admin/Admin_login';
import AdminMain from './Screens/Admin/Admin_main';
import Admin_home from './Screens/Admin/Grille/Admin_home';
import InformationScreen from './Screens/Information';
import TailwindPR from './TailwindPR';
import Admin_traditionnel from './Screens/Admin/Grille/Admin_traditionnel';
import { GlobalPopup, PopupProvider } from './Component/popup/PopupContext';
import Traditionnel from './Screens/Traditionnel';
import Admin_Contemporain from './Screens/Admin/Grille/Admin_Conteporain';
import Contemporain from './Screens/Contemporain';
import MainImage from './Component/MainImage';
import Appliques from './Screens/Appliques';
import Admin_Appliques from './Screens/Admin/Grille/Admin_Appliques';

function App() {
  const isMobile = window.screen.width < 600;
  const scrollRef = useRef(null);

  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor font-mt`}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <PrimeReactProvider value={{unstyled:true,pt:TailwindPR}}>
      <LanguageProvider>
        <PopupProvider>
          <HelmetProvider>
              <Router> 
                <div className="relative flex flex-col overflow-y-auto custom-scrollbar" ref={scrollRef}>
                  
                  <MainImage />
                  <Suspense fallback={<div className='w-full h-[calc(100vh-56px)] flex center bg-mainColor'><Loading darkMode/></div>}>
                     <GlobalPopup/>
                    <Routes >        
                      <Route path="/" element={<Home />}></Route>
                      <Route path="/traditionnel" element={<Traditionnel />}></Route>
                      <Route path="/contemporain" element={<Contemporain />}></Route>
                      <Route path="/appliques" element={<Appliques/>}></Route>
                      <Route path="/information" element={<InformationScreen />}></Route>
                      <Route path="/admin" element={<AdminLogin/>}></Route>
                      <Route path="/admin/main" element={<AdminMain />}></Route>
                      <Route path="/admin/home" element={<Admin_home />}></Route>
                      <Route path="/admin/traditionnel" element={<Admin_traditionnel />}></Route>
                      <Route path="/admin/contemporain" element={<Admin_Contemporain />}></Route>
                      <Route path="/admin/appliques" element={<Admin_Appliques/>}></Route>
                      
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
          </PopupProvider>
        </LanguageProvider>
        </PrimeReactProvider>
      </CookiesProvider>
    </div>
  )
}``

export default App
