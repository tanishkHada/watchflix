import React, { useState } from 'react'
import Home from '../pages/Home/Home';
import useHomeViewModel from '../viewmodels/HomeViewModel'
import TransitionCover from '../components/Transitions/TransitionCover'
import LoadingScreen from '../components/LoadingScreens/LoadingScreen';

function HomeMediator() {
    const { mvNowPlaying, mvPopular, mvTopRated, tvPopular, tvTopRated, loading, error } = useHomeViewModel();

    const homeData = { mvNowPlaying, mvPopular, mvTopRated, tvPopular, tvTopRated };

    const [showContent, setShowContent] = useState(false);

    return (
        <>
            <LoadingScreen
                isVisible={loading}
                onExitComplete={() => setShowContent(true)}
            />
            {showContent && (
                <>
                    <TransitionCover entry={true} exit={true} />
                    <Home data={homeData} />
                </>
            )}
        </>
    )
}

export default HomeMediator
