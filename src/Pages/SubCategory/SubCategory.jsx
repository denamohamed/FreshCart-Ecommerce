import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { useParams } from 'react-router-dom';

export default function SubCategories() {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
        setSubCategories(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategories();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-center shadow-lg shadow-green-700/50 p-10 mt-10 rounded-md bg-white ">
      <h2 className="text-2xl font-bold text-mainColor mb-4">SubCategories</h2>
      <div className="flex flex-wrap gap-4 my-4">
        {subCategories.map((subCategory) => (
          <div
            key={subCategory._id}
            className="p-2 bg-gray-100 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            <img/>
            <h3 className="text-lg">{subCategory.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
