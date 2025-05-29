import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis';
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import SeasonItem from './SeasonItem';
import EpisodeItem from './EpisodeItem';
import useStreamStore from '../../../store/StreamStore.js';
import { FaPlus, FaListUl } from 'react-icons/fa6'

function SeasonEpisodeSelector({ data }) {
    const { setSeason, setEpisode } = useStreamStore();

    const seasonsData = data;    

    const seasonContainerRef = useRef(null);
    const episodeContainerRef = useRef(null);

    const [isSeasonContainerVisible, setIsSeasonContainerVisible] = useState(false);

    const [selectedSeasonInd, setSelectedSeasonInd] = useState(0);
    const [selectedEpisodeInd, setSelectedEpisodeInd] = useState(0);
    const [episodesData, setEpisodesData] = useState(data[0].episodes)

    const onSelectSeason = (index) => {
        if (selectedSeasonInd === index) {
            return;
        }
        setSelectedSeasonInd(index);
        setEpisodesData(data[index].episodes);
        setSelectedEpisodeInd(0);

        setSeason(index + 1);

        setIsSeasonContainerVisible(false);
        setListIconVisible(true);
    }

    const onSelectEpisode = (index) => {
        if (selectedEpisodeInd === index) {
            return;
        }
        setSelectedEpisodeInd(index);

        setEpisode(index + 1);
    }
    
    const [listIconVisible, setListIconVisible] = useState(true);

    const toggleSeasonContainer = () => {
        setListIconVisible((prev) => !prev);
        setIsSeasonContainerVisible((prev) => !prev);
    }

    const createLocalSmoothScroll = (container) => {

        const containerLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            wrapper: container,
            content: container,
        });

        function raf(time) {
            containerLenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            containerLenis.destroy();
        };
    }

    useEffect(() => {
        const cleanup1 = createLocalSmoothScroll(seasonContainerRef.current)
        const cleanup2 = createLocalSmoothScroll(episodeContainerRef.current)

        // Cleanup
        return () => {
            cleanup1();
            cleanup2();
        };
    }, [episodesData]);

    useGSAP(() => {
        gsap.set(seasonContainerRef.current, { x: 450 });
    }, []);

    useGSAP(() => {

        if (isSeasonContainerVisible) {
            gsap.to(seasonContainerRef.current, {
                x: 0,
                duration: 0.8,
                ease: 'elastic.out(1,0.5)'
            })
        } else {
            gsap.to(seasonContainerRef.current, {
                x: 450,
                duration: 0.8,
                ease: 'back.inOut(4)'
            })
        }
    }, [isSeasonContainerVisible])

    return (
        <div className='p-3 w-full h-full rounded-lg bg-[var(--charcoal)] text-white flex flex-col gap-3'>

            <div className='season-dropdown relative px-4 py-3 w-full flex justify-between items-center rounded-lg bg-[var(--dark-void)]'>
                <div className="font-rockstar text-[20px]">
                    SEASON {selectedSeasonInd + 1}
                </div>

                <div className="searchNavBtnContainer text-[22px] font-extrabold cursor-pointer">
                    {listIconVisible &&
                        <div
                            className=''
                            onClick={toggleSeasonContainer}
                            style={{
                                animation: 'rotate360 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)'
                            }}
                        >
                            <FaListUl />
                        </div>}

                    {!listIconVisible &&
                        <div
                            onClick={toggleSeasonContainer}
                            style={{
                                animation: 'rotate360 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)'
                            }}
                        >
                            <div className='rotate-45'>
                                <FaPlus />
                            </div>
                        </div>}
                </div>
            </div>

            <div className="relative seasons-episodes w-full h-full rounded-lg bg-black overflow-hidden">

                <div
                    ref={episodeContainerRef}
                    className="absolute top-0 left-0 seasons p-2 w-full h-full flex flex-col gap-2 rounded-lg bg-[var(--dark-void)] overflow-y-auto"
                >
                    {episodesData.map((data, ind) => (
                        <EpisodeItem
                            key={ind}
                            data={data}
                            index={ind}
                            isSelected={selectedEpisodeInd === ind}
                            onClick={onSelectEpisode}
                        />
                    ))}
                </div>

                <div
                    ref={seasonContainerRef}
                    className="seasons p-2 w-full h-full flex flex-col gap-2 rounded-lg bg-[var(--dark-void)] overflow-y-auto"                
                >
                    {seasonsData.map((data, ind) => (
                        <SeasonItem
                            key={ind}
                            data={data}
                            index={ind}
                            isSelected={selectedSeasonInd === ind}
                            onClick={onSelectSeason}
                        />
                    ))}
                </div>


            </div>
        </div>
    )
}

export default SeasonEpisodeSelector

//76479