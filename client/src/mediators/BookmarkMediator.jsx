import React, { useContext, useEffect, useState } from 'react'
import NavigateContext from '../contexts/NavigateContext';
import authService from '../shared/AuthService';
import Bookmarks from '../pages/Bookmarks/Bookmarks';
import LoadingScreen from '../components/LoadingScreens/LoadingScreen';
import TransitionBlocks2 from '../components/Transitions/TransitionBlocks2';

function BookmarkMediator() {
    const onNavigate = useContext(NavigateContext);
    const [loading, setLoading] = useState(true);

    const [showContent, setShowContent] = useState(false);

    const getValidation = async () => {
        try {
            const res = await authService.validate();
            if (res.success) {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                onNavigate(`/auth?redirectTo=${encodeURIComponent(window.location.pathname)}`);
            }
            else {
                onNavigate('/');
            }
        }
    }

    useEffect(() => {
        getValidation();
    }, []);

    return (
        <>
            <LoadingScreen
                isVisible={loading}
                onExitComplete={() => setShowContent(true)}
            />
            {showContent && (
                <>
                    <TransitionBlocks2 entry={true} exit={true} />
                    <Bookmarks />
                </>
            )}
        </>
    )
}

export default BookmarkMediator
