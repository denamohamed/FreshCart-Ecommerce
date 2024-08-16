import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/User.context';

export default function ForgetPassword() {
  const [resetCode, setResetCode] = useState('');
  const [showResetCodeInput, setShowResetCodeInput] = useState(false);
  const [resetCodeError, setResetCodeError] = useState(null);
  const { setToken } = useContext(userContext);
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    }),
    onSubmit: async (values) => {
      let id;
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          method: "POST",
          data: { email: values.email },
        };

        id = toast.loading("Sending request...");

        const { data } = await axios.request(options);

        toast.dismiss(id);
        toast.success("Password reset code sent to your email");

        setShowResetCodeInput(true);
      } catch (error) {
        toast.dismiss(id);
        toast.error(error.response?.data?.message || "Error sending request");
      }
    },
  });

  async function verifyResetCode(code) {
    let id;
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: { resetCode: code },
      };

      id = toast.loading("Verifying reset code...");

      const { data } = await axios.request(options);

      toast.dismiss(id);
      toast.success("Reset code verified successfully");

      if (data.message === "Success") {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setResetCodeError(null);

        setTimeout(() => {
          navigate('/auth/resetPassword');
        }, 3000); 
      }
    } catch (error) {
      toast.dismiss(id);
      setResetCodeError(error.response?.data?.message || "Invalid or expired reset code");
    }
  }

  return (
    <div className='container'>
      <h2 className='text-2xl text-primary font-bold my-5'>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit} className='space-y-3'>
        <input
          type='email'
          className='form-control w-full'
          placeholder='Enter your email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className='text-red-600 font-semibold mt-2'>
            {formik.errors.email}
          </div>
        ) : null}
        <button type='submit' className='btn-primary mt-3'>
          Send Reset Code
        </button>
      </form>
      {showResetCodeInput && (
        <div className='mt-5'>
          <p className='text-lg font-bold mb-3'>Enter Reset Code</p>
          <input
            type='text'
            className='form-control w-full'
            placeholder='Enter reset code'
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
          />
          {resetCodeError && (
            <div className='text-red-600 font-semibold mt-2'>
              {resetCodeError} <br />please try again
            </div>
          )}
          <button
            className='btn-primary mt-3'
            onClick={() => verifyResetCode(resetCode)}
          >
            Verify Reset Code
          </button>
        </div>
      )}
    </div>
  );
}
