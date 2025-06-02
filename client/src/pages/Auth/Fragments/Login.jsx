import React, { useContext, useState } from 'react';
import authService from '../../../shared/AuthService';
import NavigateContext from '../../../contexts/NavigateContext';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import { MdError } from "react-icons/md";
import validators from '../../../utils/validators';
import Loader from '../../../elements/Loader/Loader';
import ActionButton from '../../../components/Buttons/ActionButton';

function Login({ onSwitch, authViews }) {
  const [params] = useSearchParams();
  const redirectValue = params.get('redirectTo');
  const redirectTo = !redirectValue || redirectValue === '/favorites' ? '/' : redirectValue;
  const onNavigate = useContext(NavigateContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      if (formData.password.length < 8) {
        throw new Error('Invalid password');
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
      const res = await authService.login(formData);
      if (res.success) {
        onNavigate(redirectTo);
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
      className="w-[400px] p-6 bg-[var(--lime-green)] rounded-lg"
    >
      <h2 className="text-3xl font-rockstar mb-6 text-center">Welcome Back</h2>
      <form>
        <div className="mb-4">
          <label className="block font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <p
          className='text-center mb-5'>
          <span className='font-rockstar text-[18px] cursor-pointer'
            onClick={() => (onSwitch(authViews.FORGOT_PASSWORD))}
          >Forgot Password</span>
        </p>

        {!loading ? (<div className='flex justify-center items-center gap-5'>
          <ActionButton
            btnText1={'CANCEL'}
            btnText2={'CANCEL'}
            onClickButton={() => (onNavigate(redirectTo))}
            bgColor='var(--hot-pink)'
          />

          <ActionButton
            btnText1={'SIGN IN'}
            btnText2={'SIGN IN'}
            onClickButton={handleSubmit}
            bgColor='var(--slate-blue)'
            color='white'
          />
        </div>) : (
          <div className='flex justify-center items-center m-3'>
            <Loader color='black' />
          </div>
        )}

        <p
          className='text-center font-bold mt-5'>Don't have an account? <span
            onClick={() => (onSwitch(authViews.REGISTER))}
            className='font-rockstar cursor-pointer'>CREATE</span></p>

        {error && <p className='text-[12px] flex justify-center items-center gap-2 mt-5 text-red-500'><MdError />{error}</p>}
      </form>
    </motion.div>
  );
}

export default Login;
