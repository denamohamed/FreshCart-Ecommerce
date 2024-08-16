import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import {Online , Offline} from "react-detect-offline";
import offlineImg from "../../assets/images/offline.svg"


export default function Layout() {
  return (
    <>
      <Navbar />
      <Online>
      <div className='container pb-[240px] pt-[80px]'>
        <Outlet />
      </div>
      </Online>
      <Offline>
        <img src={offlineImg} alt='' className='w-1/2 h-full'/>
        <h2 className='mt-7'>offline</h2>
      </Offline>
      <Footer />
    </>
  );
}
