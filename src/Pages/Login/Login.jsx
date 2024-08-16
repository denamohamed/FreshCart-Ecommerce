import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/User.context';

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][0-9a-zA-Z]{5,25}$/, "Password should start with an uppercase letter followed by a combination of letters and numbers, with a length of 5 to 25 characters"),
  });

  async function sendDataToLogin(values) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("User logged in successfully");

      if (data.message === "success") {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      }

    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response?.data?.message || "Error logging in");
      setErrorMsg(error.response?.data?.message || "Error logging in");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  const handleForgotPassword = () => {
    toast.loading("Redirecting...", { duration: 3000 });
    setTimeout(() => {
      navigate('/auth/forgetpassword');
    }, 3000); // 
  }

  return (
    <section>
      <h2 className='text-2xl text-primary font-bold my-5'>
        <i className='fa-regular fa-circle-user pe-1'></i>
        <span>Login Now</span>
      </h2>
      <form className='space-y-3' onSubmit={formik.handleSubmit}>
        <div>
          <input
            type='email'
            className='form-control w-full'
            placeholder='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className='text-red-600 font-semibold mt-2 ms-2'>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div>
          <input
            type='password'
            className='form-control w-full'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className='text-red-600 font-semibold mt-2 ms-2'>
              {formik.errors.password}
            </div>
          ) : null}
          {errorMsg ? (
            <div className='text-red-600 font-semibold mt-2 ms-2'>
              {errorMsg}
            </div>
          ) : null}
        </div>
        <div className='pt-5 flex justify-center gap-3'>
          <button type='submit' className='btn-primary'>
            Login
          </button>
          <button
            type='button'
            className='btn-primary bg-red-600'
            onClick={handleForgotPassword}
          >
            Forget Password?
          </button>
        </div>
      </form>
    </section>
  );
}
