import React, { useState } from 'react';
import Register from './Fragments/Register';
import Login from './Fragments/Login';
import ForgotPassword from './Fragments/ForgotPassword';
import ResetPassword from './Fragments/ResetPassword';
import VerifyCode from './Fragments/VerifyCode';

function Auth() {
    const AuthViews = {
        LOGIN: 'login',
        REGISTER: 'register',
        FORGOT_PASSWORD: 'forgotPassword',
        RESET_PASSWORD: 'resetPassword',
        VERIFY: 'verify'
    }

    const [view, setView] = useState(AuthViews.LOGIN);
    const [email, setEmail] = useState('');
    const [currAuthContext, setCurrAuthContext] = useState('');

    const switchToVerify = (email, context) => {
        setEmail(email);
        setCurrAuthContext(context);
        setView(AuthViews.VERIFY);
    }

    const renderForm = () => {
        switch (view) {
            case AuthViews.REGISTER:
                return <Register
                    onSwitch={setView}
                    authViews={AuthViews}
                    onVerify={switchToVerify}
                />
            case AuthViews.FORGOT_PASSWORD:
                return <ForgotPassword
                    onSwitch={setView}
                    authViews={AuthViews}
                    onVerify={switchToVerify}
                />
            case AuthViews.RESET_PASSWORD:
                return <ResetPassword
                    onSwitch={setView}
                    authViews={AuthViews}
                    email={email}
                />
            case AuthViews.VERIFY:
                return <VerifyCode
                    onSwitch={setView}
                    authViews={AuthViews}
                    email={email}
                    currAuthContext={currAuthContext}
                />
            default:
                return <Login
                    onSwitch={setView}
                    authViews={AuthViews}
                />
        }
    }

    return (
        <div className='h-screen bg-[var(--dark-void)] w-full flex justify-center items-center select-none'>
            {renderForm()}
        </div>
    )
}

export default Auth
