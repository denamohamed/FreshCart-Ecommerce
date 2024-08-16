import React, { useEffect, useState } from 'react'
import ProductCart from '../../Components/ProductCart/ProductCart'
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import { useQuery } from '@tanstack/react-query';

export default function Home() {

  async function getProducts(){
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
    };

    return await axios.request(options);
    console.log(data.data)
  }


  let {data, isLoading , isFetched , isError} = useQuery({
    queryKey : ["products"],
    queryFn : getProducts,
    refetchOnMount:true,
  })

 if (isLoading) {
  return <Loading/>
 }

  return (
    <>
    <HomeSlider/>
    <CategorySlider/>
          <div className='grid grid-cols-12 gap-4'> 
            {data.data.data.map((product)=> (
              <ProductCart key={product._id} productInfo={product} />
            ))}
          </div>
     </>
  )
}

