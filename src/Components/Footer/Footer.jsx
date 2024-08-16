import React from 'react';
import amazonPayLogo from "./../../assets/images/amazon-pay.png"
import americanExpressLogo from "./../../assets/images/American-Express-Color.png"
import mastercardLogo from "./../../assets/images/mastercard.webp"
import payPalLogo from "./../../assets/images/paypal.png"
import appleStoreLogo from "./../../assets/images/get-apple-store.png"
import googlePlayLogo from "./../../assets/images/get-google-play.png"


export default function Footer() {
  return (
    <>
     <footer className='bg-slate-100 absolute bottom-0 left-0 right-0 z-10'>
        <div className='container'>
          <h2 className='text-2xl font-semibold py-4'>Get the FreshCart App</h2>
          <p className='py-3'>We will send you alink, open it on your phone to download the app</p>
          <div className='flex gap-4'>
            <input className='form-control flex-grow' type="text" placeholder="Email..."></input>
            <button className='btn-primary'>Share App Link</button>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <div className='flex gap-2'>
                <p className='pt-2'>Payment Parents</p>
                <div className='flex gap-2 items-center'>
                    <img src={amazonPayLogo} className='w-20'/>
                    <img src={americanExpressLogo} className='w-20'/>
                    <img src={mastercardLogo} className='w-20'/>
                    <img src={payPalLogo} className='w-20'/>
                </div>
            </div>
            <div className='flex gap-2'>
                <p className=''>Get delivers with FreshCart</p>
                <div className='flex gap-2 items-center'>
                    <img src={appleStoreLogo} className='w-20'/>
                    <img src={googlePlayLogo} className='w-20'/>
                </div>
            </div>
          </div>
        </div>
     </footer>
    </>
  )
}
