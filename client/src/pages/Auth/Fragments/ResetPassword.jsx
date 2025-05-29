import React, { useState } from 'react';
import authService from '../../../shared/AuthService';
import validators from '../../../utils/validators';
import { motion } from 'framer-motion'
import { MdError } from 'react-icons/md';
import Loader from '../../../elements/Loader/Loader';
import ActionButton from '../../../components/Buttons/ActionButton';

function ResetPassword({ onSwitch, authViews, email }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateFormData = () => {
    try {
      validators.validatePassword(formData.password);
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords dont't match");
      }
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateFormData();

      setLoading(true);
      const reqData = {
        email,
        newPassword: formData.password
      }
      const res = await authService.resetPassword(reqData);
      if (res.success) {
        onSwitch(authViews.LOGIN);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-[400px] p-6 bg-[var(--lime-green)] shadow-lg rounded-lg">
      <h2 className="text-2xl font-rockstar mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {/* <button
          type="submit"
          disabled={loading}
          className="w-full h-[42px] bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition cursor-pointer flex justify-center items-center"
        >
          {loading ? <Loader/> : "SUBMIT"}
        </button> */}
        
        {!loading ? (<div className='flex justify-center items-center gap-5'>
          <ActionButton
            btnText1={'CANCEL'}
            btnText2={'CANCEL'}
            onClickButton={() => (onSwitch(authViews.LOGIN))}
            bgColor='var(--hot-pink)'
          />

          <ActionButton
            btnText1={'SUBMIT'}
            btnText2={'SUBMIT'}
            onClickButton={handleSubmit}
            bgColor='var(--slate-blue)'
            color='white'
          />
        </div>) : (
          <div className='flex justify-center items-center m-3'>
            <Loader color='black' />
          </div>
        )}

        {error && <p className='text-[12px] flex justify-center items-center gap-2 mt-5 text-red-500'><MdError />{error}</p>}
      </form>
    </motion.div>
  );
}

export default ResetPassword;
