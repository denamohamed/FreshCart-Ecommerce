
import React, { useState } from 'react'
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {


    async function getAllBrands() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/brands",
            method: "GET",
        };
        return await axios.request(options);
    }

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["brands"],
        queryFn: getAllBrands
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <h2>Error</h2>
    }

    console.log(data.data);

    return (
        <>
            <Helmet>
                <title>Brands</title>
            </Helmet>
            <>
                <div className="grid grid-cols-12 gap-10 pt-10">
                    {data.data.data.map((brand, index) => (
                            <div
                                key={index}
                                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:shadow-gray-700 hover:scale-110 cursor-pointer"
                            >
                                <img
                                    src={brand.image}
                                    className="w-full h-64 object-contain"
                                    alt=""
                                />
                                <div className="text-center font-bold p-5">{brand.name}</div>
                            </div>


                    ))}
                </div>
            </>
        </>
    )
}