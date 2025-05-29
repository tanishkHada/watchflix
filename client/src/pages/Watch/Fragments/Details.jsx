import React, { useRef } from 'react'
import { BsBadgeHdFill } from 'react-icons/bs'
import { FaStar, FaCalendar } from 'react-icons/fa'
import apiExtras from '../../../utils/ApiExtras.js'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import SplitType from "split-type"
import BookmarkBtn from '../../../components/Buttons/BookmarkBtn'

function Details({ detailsData, mediaType }) {
    const data = detailsData;

    const title = useRef();
    const tagline = useRef();
    const overview = useRef();
    const mainContainer = useRef();

    useGSAP(() => {
        if (!title.current || !overview.current) {
            return;
        }

        //title
        const splitTextTitle = new SplitType(title.current, { types: "words" });

        gsap.set(splitTextTitle.words, {
            scaleY: 0,
            transformOrigin: 'top'
        });

        gsap.to(splitTextTitle.words, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: 'top 90%',
                end: 'top 10%',
                toggleActions: 'play none none reset'
            },
            scaleY: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out',
            willChange: 'transform, opacity'
        });

        //tagline
        const splitTextTagline = new SplitType(tagline.current, { types: "words" });

        gsap.set(splitTextTagline.words, {
            opacity: 0
        });

        gsap.to(splitTextTagline.words, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: 'top 90%',
                end: 'top 10%',
                toggleActions: 'play none none reset'
            },
            opacity: 1,
            duration: 2,
            willChange: 'transform, opacity'
        });

        //sub details
        const elementsSubDetail = gsap.utils.toArray('.sub-detail');

        gsap.set(elementsSubDetail, {
            y: 80
        })

        gsap.to(elementsSubDetail, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: 'top 90%',
                end: 'top 10%',
                toggleActions: 'play none none reset'
            },
            y: 0,
            stagger: 0.1,
            ease: 'elastic.out(1,1)',
            willChange: 'transform, opacity'
        })

        //overview
        const splitTextOverview = new SplitType(overview.current, { types: "words" });

        gsap.set(splitTextOverview.words, {
            opacity: 0,
        });

        gsap.to(splitTextOverview.words, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: 'top 90%',
                end: 'top 10%',
                toggleActions: 'play none none reset'
            },
            opacity: 1,
            duration: 2,
            willChange: 'transform, opacity'
        });

        //genres
        const elementsGenre = gsap.utils.toArray('.genre');

        gsap.set(elementsGenre, {
            y: 80
        })

        gsap.to(elementsGenre, {
            scrollTrigger: {
                trigger: mainContainer.current,
                start: 'top 90%',
                end: 'top 10%',
                toggleActions: 'play none none reset'
            },
            y: 0,
            stagger: 0.1,
            ease: 'elastic.out(1,1)',
            willChange: 'transform, opacity'
        })

        return () => {
            if (splitTextTitle) splitTextTitle.revert();
            if (splitTextOverview) splitTextOverview.revert();
            if (splitTextTagline) splitTextTagline.revert();
        };
    })

    return (
        <div
            ref={mainContainer}
            className='relative text-white h-full w-full flex justify-center items-center p-5 sm:p-[100px]'>

            <img src={apiExtras.getImageUrl(data.backdrop_path, undefined, { isImage: true })} alt=""
                className='absolute-center w-[calc(100vw-30px)] h-[calc(100vh-30px)] object-cover rounded-lg sm:w-[calc(100vw-100px)] sm:h-[calc(100vh-100px)]' />

            <div className='absolute-center w-[calc(100vw-30px)] h-[calc(100vh-30px)] object-cover rounded-lg sm:w-[calc(100vw-100px)] sm:h-[calc(100vh-100px)] bg-[#0f112e70]'></div>

            <div className="mediaDetails p-5 w-full h-full flex flex-col justify-center items-center gap-5 sm:flex-row sm:gap-10 z-10">

                <div className="poster flex-shrink-0">

                    <LazyLoadImage
                        className='w-[120px] h-[180px] rounded-lg sm:w-[300px] sm:h-[450px] flex-shrink-0'
                        src={apiExtras.getImageUrl(data?.poster_path, 'w500', { isPoster: true })}
                        effect='blur'
                    />
                </div>

                <div className="details flex flex-col items-center sm:items-start">
                    <div
                        ref={title}
                        className="title font-aalto text-center text-[50px] sm:text-start sm:text-[100px] line-clamp-2 leading-[1.0]">
                        {mediaType === 'movie' ? data.title : data.name}
                    </div>

                    <div
                        ref={tagline}
                        className="tagline mb-5 text-center sm:text-start line-clamp-2 text-[14px]  sm:text-[16px]">
                        {data.tagline}
                    </div>

                    <div className="subDetails mt-3 flex flex-wrap justify-center gap-5 items-center font-bold">
                        <span className='sub-detail'><BsBadgeHdFill /></span>

                        <div className='sub-detail flex gap-1 justify-center items-center'>
                            <FaStar className='text-[var(--lime-green)]' />
                            {apiExtras.getFormattedVote(data.vote_average)}
                        </div>

                        <div className='sub-detail flex gap-1 items-center'>
                            <FaCalendar className='text-[var(--lime-green)]' />
                            {mediaType === 'movie' ? data.release_date : data.first_air_date}
                        </div>

                        {mediaType === 'movie' &&
                            <div className='sub-detail'>
                                {apiExtras.getFormattedRuntime(data.runtime)}
                            </div>}

                        <div className='watch-btn'>
                            <BookmarkBtn
                                data={data}
                                mediaType={mediaType}
                                inCard={false}
                            />
                        </div>
                    </div>

                    <div
                        ref={overview}
                        className="overview mt-3 text-center sm:text-start line-clamp-5 sm:line-clamp-7">
                        {data.overview}
                    </div>

                    <div className="genres mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
                        {data.genres.map((genre, ind) => (
                            <div key={ind} className='genre px-2 border-2 rounded-md'>
                                {genre.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
