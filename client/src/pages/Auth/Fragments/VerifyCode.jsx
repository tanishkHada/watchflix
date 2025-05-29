import React, { useEffect, useState } from 'react';
import authService from '../../../shared/AuthService';
import { motion } from 'framer-motion'
import { MdError } from 'react-icons/md';
import Loader from '../../../elements/Loader/Loader';
import ActionButton from '../../../components/Buttons/ActionButton';

function VerifyCode({ onSwitch, authViews, currAuthContext, email }) {
    const [cooldown, setCooldown] = useState(0);

    const [code, setCode] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleResend = async () => {
        if (cooldown === 0) {
            setCooldown(30);
            try {
                const reqData = { email, currAuthContext };
                const res = await authService.resendVerificationCode(reqData);
                if (res.success) {
                    console.log(res.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const validateFormData = () => {
        if (code.length < 6) {
            throw new Error("Code length should be 6 chars")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validateFormData();

            setLoading(true);
            const verifyData = {
                email,
                code,
                currAuthContext
            }
            const res = await authService.verify(verifyData);
            if (res.success) {
                switch (currAuthContext) {
                    case authViews.REGISTER:
                        onSwitch(authViews.LOGIN);
                        break;
                    case authViews.FORGOT_PASSWORD:
                        onSwitch(authViews.RESET_PASSWORD);
                        break;
                }
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
            className="w-[400px] p-6 bg-[var(--lime-green)] rounded-lg">
            <h2 className="text-2xl font-rockstar mb-6 text-center">Verify</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold">Enter Verification Code</label>
                    <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={6}
                        required
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                {/* <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition cursor-pointer"
                >
                    {loading ? <Loader/> : "SUBMIT"}
                </button>
                <button
                    type='button'
                    onClick={() => (onSwitch(authViews.LOGIN))}
                    className="w-full border-2 mt-2 border-black text-black py-2 px-4 rounded hover:border-blue-600 transition cursor-pointer"
                >
                    BACK
                </button> */}

                {!loading ? (<div className='flex justify-center items-center gap-5'>
                    <ActionButton
                        btnText1={'BACK'}
                        btnText2={'BACK'}
                        onClickButton={() => (onNavigate(redirectTo))}
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

                <p
                    className={`text-center mt-5 ${cooldown > 0 ? 'text-gray-500 cursor-not-allowed' : 'cursor-auto'}`}>
                    {cooldown > 0 ? (
                        <span className='font-bold'>
                            Resend code in <span className='font-rockstar'>{cooldown}</span>
                        </span>
                    ) : (
                        <span className='font-bold'>
                            Didn't receive code ? <span
                                onClick={handleResend}
                                className='font-rockstar cursor-pointer'>Resend</span>
                        </span>
                    )}
                </p>

                {error && <p className='text-[12px] flex justify-center items-center gap-2 mt-5 text-red-500'><MdError />{error}</p>}
            </form>
        </motion.div>
    )
}

export default VerifyCode
