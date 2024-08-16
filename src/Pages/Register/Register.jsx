import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
 const[errorMsg, setErrorMsg]= useState(null)
 const navigate= useNavigate()

  const phoneRegax = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
    .required("name is required")
    .min(3, "name must be at least 3 characters")
    .max(15, "name must be at most 15 characters"),
    email: Yup.string()
    .required("email is required")
    .email(),
    phone: Yup.string()
    .required("phone is required")
    .matches(phoneRegax, "phone number is not valid"),
    password: Yup.string()
    .required("password is required")
    .matches(/^[A-Z][0-9a-zA-Z]{5,25}$/, "password should start with uppercase letter followed by a combinations of letters and number from 5 to 25 letter"),
    rePassword: Yup.string()
    .required("re-password is required")
    .oneOf([Yup.ref('password')], "password and re-password should be the same")
  })   

  async function sendDataToRegister(values) {
    let id;
   try {
    const options= {
      url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
      method:"POST",
      data:values,
    };

   id =toast.loading("Waiting...");

    const {data}= await axios.request(options); 
    console.log(data)

    toast.dismiss(id);
    toast.success("User created successfully")

    if(data.message == "success"){
      navigate('/auth/login')
    }

   } catch (error) {
    toast.dismiss(id);
    toast.error(error.response.data.message)
    setErrorMsg(error.response.data.message)
   }
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  })
   
  return (
    <>
      <section>
        <h2 className='text-2xl text-primary font-bold my-5'>
          <i className='fa-regular fa-circle-user pe-1'></i>
          <span>Register Now</span>
        </h2>
        <form className='space-y-3' onSubmit={formik.handleSubmit}>
          <div>
            <input
              type='text'
              className='form-control w-full'
              placeholder='Username'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
           
              {formik.errors.name && formik.touched.name ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {formik.errors.name}
                </div>) :("")}
            </div>
          
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

             {formik.errors.email && formik.touched.email ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {formik.errors.email}
                </div>) :("")}
           {errorMsg ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {errorMsg}
                </div>) :("")} 
          </div>
          <div>
            <input
              type='tel'
              className='form-control w-full'
              placeholder='Phone'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

              {formik.errors.phone && formik.touched.phone ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {formik.errors.phone}
                </div>) :("")}

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

              {formik.errors.password && formik.touched.password ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {formik.errors.password}
                </div>) :("")}

          </div>
          <div>
            <input
              type='password'
              className='form-control w-full'
              placeholder='Re-password'
              name='rePassword'
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
            />

              {formik.errors.rePassword && formik.touched.rePassword ?  (<div className='text-red-600 font-semibold mt-2 ms-2'> 
                {formik.errors.rePassword}
                </div>) :("")}
          </div>
          <button type='submit' className='btn-primary my-1'>
            Sign up
          </button>
        </form>
      </section>
    </>
  )
}