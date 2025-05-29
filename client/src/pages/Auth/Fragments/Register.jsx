import React, { useContext, useState } from 'react';
import authService from '../../../shared/AuthService';
import NavigateContext from '../../../contexts/NavigateContext';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import { MdError } from 'react-icons/md'
import validators from '../../../utils/validators';
import Loader from '../../../elements/Loader/Loader'
import ActionButton from '../../../components/Buttons/ActionButton';

function Register({ onSwitch, authViews, onVerify }) {
  const [params] = useSearchParams();
  const redirectValue = params.get('redirectTo');
  const redirectTo = !redirectValue || redirectValue === '/favorites' ? '/' : redirectValue;
  const onNavigate = useContext(NavigateContext);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
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
      if(formData.name.trim() === ''){
        throw new Error('Invalid name');
      }
      validators.validateEmail(formData.email);
      validators.validatePassword(formData.password);
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateFormData();

      setLoading(true);
      const res = await authService.register(formData);
      if (res.success) {
        onVerify(formData.email, authViews.REGISTER);
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
      className="w-[400px] p-6 bg-[var(--lime-green)] shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-rockstar mb-6 text-center">Create Account</h2>
      <form>
        <div className="mb-4">
          <label className="block font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
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

        {!loading ? (<div className='flex justify-center items-center gap-5'>
          <ActionButton
            btnText1={'CANCEL'}
            btnText2={'CANCEL'}
            onClickButton={() => (onNavigate(redirectTo))}
            bgColor='var(--hot-pink)'
          />

          <ActionButton
            btnText1={'SIGN UP'}
            btnText2={'SIGN UP'}
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
          className='text-center mt-5 font-bold'>Already have an account? <span className='font-rockstar cursor-pointer'
            onClick={() => (onSwitch(authViews.LOGIN))}
          >Sign In</span></p>

        {error && <p className='text-[12px] flex justify-center items-center gap-2 mt-5 text-red-500'><MdError />{error}</p>}
      </form>
    </motion.div>
  );
}

export default Register;
