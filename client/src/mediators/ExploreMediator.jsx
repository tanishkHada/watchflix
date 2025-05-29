import React, { useEffect, useState } from 'react'
import Explore from '../pages/Explore/Explore';
import useExploreViewModel from '../viewmodels/ExploreViewModel';
import LoadingScreen from '../components/LoadingScreens/LoadingScreen';
import TransitionFlaps from '../components/Transitions/TransistionFlaps';

function ExploreMediator() {
    const viewmodelObj = useExploreViewModel();

    const [showContent, setShowContent] = useState(false);

    return (

        <>
            <LoadingScreen
                isVisible={viewmodelObj.initialLoading}
                onExitComplete={() => setShowContent(true)}
            />
            {showContent &&
             (
                <>
                    <TransitionFlaps entry={true} exit={true} />
                    <Explore exploreViewmodelObj={viewmodelObj} />
                </>
            )}
        </>
    )
}

export default ExploreMediator;
