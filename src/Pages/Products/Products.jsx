import React, { useState } from 'react'
import ProductCart from '../../Components/ProductCart/ProductCart'
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Products() {

  async function getProducts(){
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
    };

    return await axios.request(options);
    console.log(data.data)
  }
   
  
  const {data,isError,isLoading,error}=useQuery({
    queryKey:["products"],
    queryFn:getProducts
   })

   if (isLoading) {
    return <Loading/>
   }
  
   if (isError) {
    return <h2>Error</h2>
   }
  
  return (
    <>
         <h2></h2>
          <div className='grid grid-cols-12 gap-4'> 
            {data.data.data.map((product)=> (
              <ProductCart key={product._id} productInfo={product} />
            ))}
          </div>
     </>
  )
}

