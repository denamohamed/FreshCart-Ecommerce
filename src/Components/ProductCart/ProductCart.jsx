import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/Cart.context';
import { wishlistContext } from '../../Context/WishList.context';

export default function ProductCart({ productInfo }) {
  const { imageCover, title, price, category, ratingsAverage, id } = productInfo;
  const { addToCart } = useContext(cartContext);
  const { addToWishList, removeFromWishList, isProductInWishlist } = useContext(wishlistContext);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInWishlist(isProductInWishlist(id));
  }, [isProductInWishlist, id]);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishList(id);
    } else {
      addToWishList({ id });
    }
    setInWishlist(!inWishlist);
  };

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
      <div className="relative">
        <img src={imageCover} alt="" className="w-full" />
        <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center absolute w-full h-full left-0 top-0 bg-black bg-opacity-15">
          <div className="icons flex gap-3 items-center justify-center">
            <div onClick={handleWishlistToggle} className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
              <i className={`fa-solid fa-heart ${inWishlist ? 'text-red-500' : 'text-white'}`}></i>
            </div>
            <div onClick={() => addToCart({ id })} className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link to={`/product/${id}`} className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-primary">{category.name}</h3>
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
        <div className="mt-4 flex items-center justify-between">
          <p>{price} L.E</p>
          <div className="flex gap-1 items-center">
            <i className="fa-solid fa-star text-yellow-500"></i>
            <p>{ratingsAverage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
