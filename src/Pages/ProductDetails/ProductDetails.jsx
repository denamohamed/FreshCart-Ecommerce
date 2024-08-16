import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import ReactImageGallery from 'react-image-gallery';
import { cartContext } from '../../Context/Cart.context';
import useOnlineSttatus from '../../Hooks/useOnlineSttatus';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const isOnline= useOnlineSttatus()
  const { addToCart } = useContext(cartContext);
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const imageItems = details?.images?.map((imageURL) => ({
    original: imageURL,
    thumbnail: imageURL,
  }));

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setDetails(data.data);
      console.log(data.data);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError(err);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (error) {
    return (
      <div className="text-center my-8">
        <h2 className="text-red-500 text-2xl font-bold">Error</h2>
        <p className="text-gray-700">Failed to fetch product details. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {details ? (
        <>
         <Helmet>
      <title>{details.title}</title>
      <meta name='description' content={details.description}/>
    </Helmet>
    <div className="grid grid-cols-12 gap-8 shadow-sm my-5">
          <div className="col-span-12 md:col-span-4">
            <ReactImageGallery items={imageItems || []} showNav={false} showPlayButton={false} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <h5 className="text-primary mb-2 font-semibold">{details.category.name}</h5>
            <div className="mt-4">
              <p className="text-slate-700 my-2">{details.description}</p>
              <p><span className='text-primary'>Brand : </span>{details.brand.name}</p>
              <div className="flex justify-between items-center mt-1">
                <h6>{details.price} L.E</h6>
                <div className="flex items-center gap-1 my-2">
                  <i className="text-yellow-400 fa-solid fa-star ms-1"></i>
                  <span>{details.ratingsAverage}</span>
                </div>
              </div>
            </div>
            <button className="w-full btn-primary mt-4" 
      onClick={() => addToCart(details)}>
        Add TO Cart
            </button>
          </div>
        </div>
        </>
  
      ) : (
        <Loading />
      )}
    </>
  );
}