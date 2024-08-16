import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { userContext } from './User.context';
import toast from 'react-hot-toast';

export const wishlistContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(userContext);
  const [wishListInfo, setWishListInfo] = useState(null);

  const getWishListInfo = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setWishListInfo(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWishList = async ({ id }) => {
    try {
      const options = {
        method: 'POST',
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      const { data } = await axios.request(options);
      toast.success(data.message);
      await getWishListInfo();
    } catch (error) {
      console.error(error);
      toast.error('Error adding item to wishlist');
    }
  };

  const removeFromWishList = async (id) => {
    try {
      const options = {
        method: 'DELETE',
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setWishListInfo(data.data);
      toast.success('Product Removed From Wishlist Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error removing item from wishlist');
    }
  };

  const isProductInWishlist = (productId) => {
    return wishListInfo?.some(item => item._id === productId);
  };

  return (
    <wishlistContext.Provider
      value={{
        addToWishList,
        getWishListInfo,
        wishListInfo,
        setWishListInfo,
        removeFromWishList,
        isProductInWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
