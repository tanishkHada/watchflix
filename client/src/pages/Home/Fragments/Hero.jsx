import React, { useContext, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type';
import apiExtras from '../../../utils/ApiExtras';
import { BsBadgeHdFill } from 'react-icons/bs'
import { FaStar, FaCalendar, FaLess } from 'react-icons/fa'
import BookmarkBtn from '../../../components/Buttons/BookmarkBtn';
import NavigateContext from '../../../contexts/NavigateContext';
import { MdNavigateNext } from 'react-icons/md';
import useDebounce from '../../../utils/Debounce';
import ActionButton from '../../../components/Buttons/ActionButton';

function Hero({data}) {    

    const onNavigate = useContext(NavigateContext);

    const debouncedNavigate = useDebounce(
        (path) => onNavigate(path),
        1000
    );

    const handleWatchClick = () => {
        debouncedNavigate(`/watch/movie/${data[currentInd].id}`);
    }

    const title = useRef();
    const overview = useRef();
    const changerRef = useRef();
    const watchBtnContainerRef = useRef();

    const [currentInd, setCurrInd] = useState(0)
    const [mainInd, setMainInd] = useState(0)
    const [hasClicked, setHasClicked] = useState(false)
    const totalLen = data.length;

    const [isHovered, setIsHovered] = useState(false)
    const isHoveredRef = useRef(isHovered);

    const handleMinFrameClick = () => {
        setHasClicked(true)
        setCurrInd((currentInd + 1) % totalLen)
    }

    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    useEffect(() => {
        const changer = changerRef.current;

        if (!changer) return;

        let timeout;

        const handleMouseMove = (e) => {
            clearTimeout(timeout);

            const rect = changer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2; 
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX; 
            const deltaY = e.clientY - centerY; 

            const maxRotation = 30; 
            const rotateY = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 10));
            const rotateX = Math.max(-maxRotation, Math.min(maxRotation, -deltaY / 10));

            const maxDisplacement = 100; 
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); 
            const displacementFactor = Math.min(distance / 100, 1);
            const translateX = (deltaX / distance) * maxDisplacement * displacementFactor; 
            const translateY = (deltaY / distance) * maxDisplacement * displacementFactor;

            gsap.to(changer, {
                rotationX: rotateX,
                rotationY: rotateY,
                x: translateX, 
                y: translateY, 
                transformPerspective: 800,
                transformOrigin: 'center center', 
                ease: 'power2.out',
                duration: 1, 
            });

            gsap.to(changer, {
                scale: 1,
                ease: 'power2.out',
                duration: 1,
            });

            if (!isHoveredRef.current) {
                timeout = setTimeout(() => {
                    gsap.to(changer, {
                        scale: 0, 
                        x: 0, 
                        y: 0,
                        duration: 1,
                        ease: 'power2.inOut',
                    });
                }, 50); 
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, []);

    //for images
    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-img', { visibility: 'visible' })

            gsap.to('#next-img', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power4.out',
                onComplete: () => {
                    setMainInd(currentInd)
                }
            })

            gsap.from('#curr-img', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power3.out'
            })
        }
    }, { dependencies: [currentInd], revertOnUpdate: true })

    //for texts
    useGSAP(() => {
        let splitText;

        if (title.current) {
            if (title.current.innerHTML !== data[currentInd].title) {
                title.current.innerHTML = data[currentInd].title;
            }

            splitText = new SplitType(title.current, { types: 'words' });

            const containerHeight = title.current.getBoundingClientRect().height;

            gsap.set(splitText.words, {
                y: containerHeight,
            });

            gsap.to(splitText.words, {
                y: 0,
                stagger: 0.08,
                duration: 1,
                ease: 'power2.out',
                willChange: 'transform, opacity',
            });
        }

        let anotherSplitText;
        if (overview.current) {
            if (overview.current.innerHTML !== data[currentInd].overview) {
                overview.current.innerHTML = data[currentInd].overview;
            }

            anotherSplitText = new SplitType(overview.current, { types: 'words' });

            gsap.set(anotherSplitText.words, {
                opacity: 0,
            });

            gsap.to(anotherSplitText.words, {
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'power2.out',
                willChange: 'transform, opacity',
            });
        }

        return () => {
            if (splitText) {
                splitText.revert(); 
            }
            if (anotherSplitText) {
                anotherSplitText.revert();
            }
        };
    }, { dependencies: [currentInd], revertOnUpdate: true });

    // sub details
    useGSAP(() => {
        const elements = gsap.utils.toArray('.sub-detail');

        gsap.set(elements, {
            y: 100
        })

        gsap.to(elements, {
            y: 0,
            stagger: 0.1,
            ease: 'elastic.out(1,1)',
            willChange: 'transform, opacity'
        })

        if (watchBtnContainerRef.current) {
            const containerHeight = watchBtnContainerRef.current.getBoundingClientRect().height + 100;

            gsap.set('.watch-btn', {
                y: containerHeight,
            })

            gsap.to('.watch-btn', {
                y: 0,
                duration: 1,
                ease: 'power1.out'
            })
        }

    }, { dependencies: [currentInd], revertOnUpdate: true })

    return (
        <div className='w-full h-full'>

            <section className='relative h-screen w-full overflow-hidden'>

                {/* details */}
                <div className='absolute h-screen z-15 w-full flex justify-center items-center
                bg-gradient-to-b from-[#ffffff00] to-[#1e293b99]'>

                    <div className='h-full w-full flex flex-col items-center justify-center p-10 sm:items-start'>
                        {/* title */}
                        <div className='text-white mb-5 z-[15] pointer-events-none'
                            style={{ fontKerning: 'none', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
                            <h1
                                ref={title}
                                className='text-center text-[50px] font-rockstar sm:text-start line-clamp-2 sm:text-[100px] leading-[1.1] sm:line-clamp-3'
                            >{data[currentInd].title}</h1>
                        </div>

                        {/* sub details */}
                        <div className='flex justify-center items-center flex-wrap text-white sm:justify-start font-extrabold'
                            style={{ fontKerning: 'none', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >
                            <div className='sub-detail flex justify-center items-center'>
                                <BsBadgeHdFill />
                                <span className='flex justify-center items-center p-2'>
                                    <FaStar className='m-1 text-[var(--lime-green)]' />
                                    {apiExtras.getFormattedVote(data[currentInd].vote_average)}
                                </span>
                            </div>

                            {/* genres */}
                            {data[currentInd].genre_ids.map((id) => (
                                <span className='sub-detail p-1' key={id}>{apiExtras.getGenre(id)}</span>
                            ))}

                            <div className='spacer p-1'></div>

                            <div className="sub-detail">
                                <span className='flex justify-center items-center'>
                                    <FaCalendar className='mr-1 text-[var(--lime-green)]' />
                                    {data[currentInd].release_date.split('-')[0]}
                                </span>
                            </div>
                        </div>

                        {/* overview */}
                        <div className='text-white text-[15px] z-[15] pointer-events-none '>
                            <h1
                                ref={overview}
                                className='text-center font-montserrat-light sm:text-start line-clamp-[6] sm:line-clamp-[8]'
                            >{data[currentInd].overview}</h1>
                        </div>


                        {/* watch button and bookmark button */}
                        <div className='mt-5 flex gap-3 justify-center items-center sm:justify-start'
                            ref={watchBtnContainerRef}
                            style={{ fontKerning: 'none', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >                            
                            <div className='watch-btn flex justify-center items-center'>
                                <ActionButton
                                    btnText1={'WATCH'}
                                    btnText2={'NOW'}
                                    onClickButton={handleWatchClick}
                                />
                            </div>

                            <div className='watch-btn'>
                                <BookmarkBtn
                                    data={data[currentInd]}
                                    mediaType={'movie'}
                                    inCard={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='spacer hidden invisible w-full h-full bg-pink-500 sm:block'>

                    </div>

                </div>

                {/* Changer, visible for bigger screens*/}
                <div
                    ref={changerRef}
                    id='changer'
                    className='hidden absolute-center z-20 scale-0 size-50 overflow-hidden rounded-lg sm:block'
                    onMouseEnter={() => {
                        setIsHovered(true)
                        isHoveredRef.current = true;
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false)
                        isHoveredRef.current = false;
                    }}
                >
                    <div
                        onClick={useDebounce(handleMinFrameClick, 1000)}
                        className='minFrame w-full h-full scale-50 opacity-100 transition-all duration-500 hover:scale-100 cursor-pointer'>
                        <img id='curr-img'
                            src={apiExtras.getImageUrl(data[(currentInd + 1) % totalLen].backdrop_path)}
                            className='h-full w-full object-cover scale-150 select-none rounded-lg'
                        />
                    </div>
                </div>

                {/* changer button, visible for smaller screens */}
                <div className='block changerBtn z-20 absolute transform translate-x-[-50%] left-[50%] bottom-20 bg-[var(--dark-void)] rounded-2xl px-2 py-1 sm:hidden'
                    onClick={useDebounce(handleMinFrameClick, 1000)}
                >
                    <button>
                        <MdNavigateNext className='text-[var(--lime-green)] text-[40px]' />
                    </button>
                </div>

                <div className='mainContainer relative z-10 h-screen w-full overflow-hidden'>

                    <img id='next-img'
                        src={apiExtras.getImageUrl(data[currentInd].backdrop_path)}
                        className='absolute-center object-cover invisible size-64 z-10 rounded-lg'
                    />

                    {/* main img holder */}
                    <img id='main-img'
                        src={apiExtras.getImageUrl(data[mainInd].backdrop_path)}
                        className='absolute left-0 top-0 h-full w-full object-cover'
                    />
                </div>

            </section>
        </div>
    )
}

export default Hero
