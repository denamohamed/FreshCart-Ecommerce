import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { wishlistContext } from '../../Context/WishList.context';
import Loading from '../../Components/Loading/Loading';
import { cartContext } from "../../Context/Cart.context";

export default function WishList() {
  const { wishListInfo, getWishListInfo, removeFromWishList } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    getWishListInfo();
  }, [getWishListInfo]);

  return (
    <div className="container mx-auto py-8">
      {wishListInfo === null ? (
        <Loading />
      ) : (
        <>
          {wishListInfo.length === 0 ? (
            <div className="flex flex-col gap-3 justify-center items-center">
              <h3 className="text-lg">Your wishlist is empty!</h3>
              <NavLink to="/products" className="btn-primary">
                Browse Products
              </NavLink>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {wishListInfo.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                  >
                    <img src={item.imageCover} alt={item.title} />
                    <div>
                      <h3 className="text-primary">{item.category?.name || 'Unknown'}</h3>
                      <h4 className="text-lg font-medium line-clamp-2">{item.title}</h4>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p>{item.price} L.E</p>
                      <div className="flex gap-1 items-center">
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <p>{item.ratingsAverage}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => removeFromWishList(item._id)}
                        className=""
                      >
                        <i className="fa-solid fa-heart text-lg text-red-500 hover:text-red-600"></i>
                      </button>
                      <button
                        onClick={() => {
                          addToCart(item);
                        }}
                      >
                        <i className="fa-solid fa-cart-shopping text-lg text-primary"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
