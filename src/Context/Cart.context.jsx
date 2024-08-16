import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {

    const {token} = useContext(userContext);
    const [cartInfo, setCartInfo] = useState(null)

    async function getCartInfo(){ 
        try {
            const options = {
                method: 'GET',
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                headers : {
                    token
                }
            };

            let {data} = await axios.request(options)
            setCartInfo(data)
            console.log(data)
        } catch (error) { 
            if(error.response.data.message.includes('No cart')){
                setCartInfo([])
            }else{
                console.log(error)
            }
        }
    }

    async function addToCart({ id }) {
        try {
          const options = {
            method: 'POST',
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            headers: {
              token,
            },
            data: {
              productId: id,
            },
          };
          const { data } = await axios.request(options);
          toast.success(data.message);
          await getCartInfo();
        } catch (error) {
          console.log(error);
        }
      }
      
    async function removeProduct(id) {
        try {
            const options ={
                method: 'DELETE',
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options);
            if(data.numOfCartItems === 0){
                setCartInfo([])
            }
            else{
                setCartInfo(data)
            }
            toast.success('Product Removed From Cart Successfully')

        } catch (error) {
            console.log(error)
            if (error.response.data.message.includes("No Cart")){
                setCartInfo([])
            }
        }

    }

    async function clearCart(){
        try {
            const options = {
                method: 'DELETE',
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                headers : {
                    token
                }
            }
            const {data} = await axios.request(options)
            setCartInfo([])
            toast.success('Cart Cleared Successfully')
        } catch (error) { 
            console.log(error)
        }
    }

    async function updateCartItems(id, count) {
        try {
            const options ={
                method: 'PUT',
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                headers : {
                    token
                },
                data:{
                    count 
                }
            }
            const {data} = await axios.request(options);
            if(data.status == 'success'){
                toast.success('Producted Count updated successfully')
                setCartInfo(data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return <cartContext.Provider value={{ addToCart, getCartInfo, cartInfo, setCartInfo, removeProduct, clearCart, updateCartItems}}>
        {children}
    </cartContext.Provider>
}

