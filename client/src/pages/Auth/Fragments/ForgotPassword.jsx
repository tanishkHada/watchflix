import React, { useState } from 'react';
import authService from '../../../shared/AuthService';
import { motion } from 'framer-motion'
import { MdError } from 'react-icons/md';
import validators from '../../../utils/validators';
import Loader from '../../../elements/Loader/Loader';
import ActionButton from '../../../components/Buttons/ActionButton';

function ForgotPassword({ onSwitch, authViews, onVerify }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateFormData = () => {
    try {
      validators.validateEmail(formData.email);
    }
    catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateFormData();

      setLoading(true);
      const res = await authService.forgotPassword(formData);
      if (res.success) {
        onVerify(formData.email, authViews.FORGOT_PASSWORD);
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
      <h2 className="text-2xl font-rockstar mb-6 text-center">Forgot Password</h2>
      <form>
        <div className="mb-4">
          <label className="block font-bold">Enter Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>       

        {!loading ? (<div className='flex justify-center items-center gap-5'>
          <ActionButton
            btnText1={'BACK'}
            btnText2={'BACK'}
            onClickButton={() => (onSwitch(authViews.LOGIN))}
            bgColor='var(--hot-pink)'
          />

          <ActionButton
            btnText1={'SEND'}
            btnText2={'SEND'}
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
  )
}

export default ForgotPassword
