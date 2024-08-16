import React, { createContext, useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik"
import { cartContext } from '../../Context/Cart.context'
import { userContext } from "../../Context/User.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();

  async function createCashOrder(values) {
     
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`, 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token, 
        },
        data: {
          values
        },
      };
    
      const { data } = await axios.request(options);
      setCartInfo([]);
      setTimeout(()=>{
        navigate("/allorders")
      }
      ,2000)
      console.log('createCashOrder response:', data);
  
   
  }
  
  async function createOnlineOrder(values) {
    try {
      console.log('online');
      if (cartInfo.length !== 0) {
        const options = {
          url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
          method: 'POST',
          headers: {
            token
          },
          data: {
             values
          }
        };

        const { data } = await axios.request(options);

        if (data.status === 'success') {
          setCartInfo([]);
          toast.loading('Redirecting to payment gateway');
          setTimeout(() => {
            window.location.href = data.session.url;
          }, 2000);
        }
      } else {
        toast.error('Please add items to your cart first');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating online order. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: ""
      }
    },
    onSubmit: (values) => {
      if (orderType === 'cash') {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    }
  });

  return (
    <>
      <h2 className="text-2xl font-bold">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 p-5">
        <input type="text" className="form-control w-full" placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input type="tel" className="form-control w-full" placeholder="Phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <textarea placeholder="Details" className="form-control w-full"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        <div className="flex gap-3">
          <button
            onClick={() => setOrderType('cash')}
            type="submit"
            className="btn-primary bg-blue-400"
          >
            Cash Order
          </button>
          <button
            onClick={() => setOrderType('online')}
            type="submit"
            className="btn-primary"
          >
            Online Payment
          </button>
        </div>
      </form>
    </>
  );
}