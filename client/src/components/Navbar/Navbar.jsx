import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useWindowScroll } from 'react-use'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import Logo from '../../elements/Logo';
import CutElement from '../../elements/CutElement';
import Searchbar from '../Searchbar/Searchbar';
import NavigateContext from '../../contexts/NavigateContext';
import useDebounce from '../../utils/Debounce';
import { useMusic } from '../../contexts/MusicContext';

function Navbar({ onClickSearch }) {
    const onNavigate = useContext(NavigateContext);
    const location = useLocation();
    const showSearchBar = location.pathname === '/explore';
    const showExplore = location.pathname !== '/explore';
    const showFavorites = location.pathname !== '/favorites';

    const debouncedNavigate = useDebounce(onNavigate, 2000);

    const container = useRef();
    const {isAudioPlaying, toggleAudio} = useMusic();

    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);

    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            setIsAtTop(true);
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            setIsAtTop(false);

        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            setIsAtTop(false);
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY])

    useGSAP(() => {
        gsap.to(container.current, {
            y: isNavVisible ? 0 : -120,
            duration: 0.3,
        })
    }, [isNavVisible, isAtTop])

    return (
        <div className='fixed p-2 top-0 left-0 w-full z-[100] text-white'>

            <div ref={container} className={`flex justify-between items-center p-2 rounded-lg ${isAtTop ? 'transparent-nav' : 'floating-nav'}`}>

                <div
                    onClick={() => debouncedNavigate('/')}
                    className='mb-[-9px] cursor-pointer sm:ml-6'>
                    <Logo />
                </div>

                <div className="items flex justify-center items-center gap-3 sm:gap-5">
                    {showSearchBar &&
                        <Searchbar onClickSearch={onClickSearch}
                    />}

                    {showExplore && <CutElement
                        element={'EXPLORE'}
                        fontSize={20}
                        onClickRoute={() => debouncedNavigate('/explore')}
                    />}

                    {showFavorites && <CutElement
                        element={'FAVORITES'}
                        fontSize={20}
                        onClickRoute={() => debouncedNavigate('/favorites')}
                    />}

                    <button onClick={toggleAudio} className="music mr-1 flex items-center justify-center cursor-pointer space-x-0.5 sm:mr-6">    
                        {[1, 2, 3, 4, 5].map((bar) => (
                            <div key={bar}
                                className={`indicator-line ${isAtTop ? 'bg-white' : 'bg-black'} ${isAudioPlaying ? 'active' : ''}`}
                                style={{ animationDelay: `${bar * 0.1}s` }}
                            />
                        ))}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
