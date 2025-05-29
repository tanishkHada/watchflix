import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Watch from '../pages/Watch/Watch';
import useWatchViewModel from '../viewmodels/WatchViewModel.js'
import TransitionGridBlocks from '../components/Transitions/TransitionGridBlocks.jsx';
import LoadingScreen from '../components/LoadingScreens/LoadingScreen.jsx';

function WatchMediator() {
    const { mediaType, mediaId } = useParams();

    const { movieData, tvData, seasonsData, castData, similarMediaData, recommendMediaData, loading, error } = useWatchViewModel(mediaType, mediaId);

    const [showContent, setShowContent] = useState(false);

    const watchData = { movieData, tvData, seasonsData, castData, similarMediaData, recommendMediaData };

    return (
        <>
            <LoadingScreen
                isVisible={loading}
                onExitComplete={() => setShowContent(true)}
            />
            {showContent &&
             (
                <>
                    <TransitionGridBlocks entry={true} exit={true} />
                    <Watch data={watchData}/>
                </>
            )}
        </>
    )
}

export default WatchMediator
