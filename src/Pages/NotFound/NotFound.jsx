import React from 'react'
import notFound from '../../assets/images/error.svg'

export default function NotFound() {
  return (
 <>
  <img src={notFound} alt='' className='mx-auto'/>
  <h1 className='text-center text-3xl font-semibold'>Not Found</h1>
 </>
)
}
