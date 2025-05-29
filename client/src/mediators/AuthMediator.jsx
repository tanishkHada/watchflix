import React, { useContext, useEffect, useState } from 'react'
import NavigateContext from '../contexts/NavigateContext';
import Auth from '../pages/Auth/Auth'
import authService from '../shared/AuthService';
import TransitionBlocks from '../components/Transitions/TransitionBlocks';
import LoadingScreen from '../components/LoadingScreens/LoadingScreen';

function AuthMediator() {
    const onNavigate = useContext(NavigateContext);
    const [loadingStatus, setLoadingStatus] = useState(true);

    const [showContent, setShowContent] = useState(false);

    const getValidation = async () => {
        try {
            const res = await authService.validate();
            if (res.success) {
                onNavigate('/');
            }
        } catch (error) {
            setLoadingStatus(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getValidation();
    }, []);

    return (
        <>
            <LoadingScreen
                isVisible={loadingStatus}
                onExitComplete={() => setShowContent(true)}
            />
            {showContent &&
             (
                <>
                    <TransitionBlocks entry={true} exit={true} />
                    <Auth/>
                </>
            )}
        </>
    )
}

export default AuthMediator
