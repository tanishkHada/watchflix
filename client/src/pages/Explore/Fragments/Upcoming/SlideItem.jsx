import React, { useContext } from 'react'
import { FaStar, FaCalendar } from 'react-icons/fa'
import { BsBadgeHdFill } from 'react-icons/bs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import apiExtras from '../../../../utils/ApiExtras.js'
import useDebounce from '../../../../utils/Debounce.js'
import NavigateContext from '../../../../contexts/NavigateContext.js'
import BookmarkBtn from '../../../../components/Buttons/BookmarkBtn.jsx'
import ActionButton from '../../../../components/Buttons/ActionButton.jsx'

function SlideItem({ data }) {
    const onNavigate = useContext(NavigateContext);

    const debouncedNavigate = useDebounce(
        (path) => onNavigate(path),
        1000
    );

    const handleWatchClick = () => {
        debouncedNavigate(`/watch/movie/${data.id}`);
    }

    return (
        <div
            className="slide-content h-full w-full"
            data-swiper-parallax='50%'
            style={{ willChange: 'transform' }}
        >
            <div className='absolute-center h-screen w-full z-5
                bg-gradient-to-b from-[#ffffff00] to-[#1e293b99]'></div>            

            <LazyLoadImage
                className='w-screen h-screen object-cover'
                src={apiExtras.getImageUrl(data.backdrop_path, 'w1280', { isImage: true })}
                effect='blur'
            />

            {/* Details */}
            <div className="content absolute-center w-full h-full flex flex-col flex-wrap justify-center items-center text-center sm:w-[70%] p-10 z-10">
                <h1
                    className='font-aalto text-white text-[80px] line-clamp-3 leading-[1.1] sm:text-[120px]'
                >
                    {data.title}
                </h1>

                <div className="subContents text-[20px] text-white flex justify-center font-extrabold items-center flex-wrap sm:text-[20px]">
                    <div className='sub-detail flex justify-center items-center'>
                        <BsBadgeHdFill />
                        <span className='flex justify-center items-center p-2'>
                            <FaStar className='m-1 text-[var(--lime-green)]' />
                            {apiExtras.getFormattedVote(data.vote_average)}
                        </span>
                    </div>

                    {/* genres */}
                    {data.genre_ids.map((id) => (
                        <span className='sub-detail p-1' key={id}>{apiExtras.getGenre(id)}</span>
                    ))}

                    <div className='spacer p-1'></div>

                    <div className="sub-detail">
                        <span className='flex justify-center items-center'>
                            <FaCalendar className='mr-1 text-[var(--lime-green)]' />
                            {data.release_date.split('-')[0]}
                        </span>
                    </div>
                </div>

                {/* overview */}
                <div className='text-white mt-5 text-[15px] pointer-events-none '>
                    <h1
                        className='text-center font-montserrat-light line-clamp-[8]'
                    >{data.overview}</h1>
                </div>

                <div className='flex justify-center items-center gap-3 mt-5'>
                    <div className="buttons flex justify-center items-center">
                        <ActionButton
                            btnText1={'WATCH'}
                            btnText2={'NOW'}
                            onClickButton={handleWatchClick}
                        />
                    </div>

                    <BookmarkBtn
                        data={data}
                        mediaType={'movie'}
                        inCard={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default SlideItem
