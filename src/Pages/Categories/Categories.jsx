import React from 'react';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const navigate = useNavigate();

  // Fetch all categories
  const { data, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const response = await axios.request(options);
      return response;
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  return (
    <div className='grid grid-cols-12 gap-4'>
      {data.data.data.map((category) => (
        <div
          key={category._id}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:shadow-gray-700 hover:scale-110 cursor-pointer"
          onClick={() => navigate(`/categories/${category._id}/subcategories`)}
        >
          <img
            src={category.image}
            className="w-full h-64 object-contain"
            alt={category.name}
          />
          <div className="text-center font-bold p-5">{category.name}</div>
        </div>
      ))}
    </div>
  );
}
