import React from 'react'
import { FaStar } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import apiExtras from '../../../utils/ApiExtras.js'
import { FaPlayCircle } from 'react-icons/fa'

const SeasonItem = React.memo(({ data, index, isSelected, onClick }) => {

    console.log(data);

    return (
        <div
            className={`relative flex gap-5 p-1 rounded-lg justify-start items-center bg-[var(--charcoal)] text-white ${isSelected ? 'selected-watch-item' : ''}`}
        >
            <div className='poster'>
                <LazyLoadImage
                    className='rounded-lg'
                    height='90px'
                    width='65px'
                    src={apiExtras.getImageUrl(data.poster_path, 'w200', {isPoster: true})}
                    effect='blur'
                />
            </div>

            <div className='details flex flex-col gap-1'>
                <span className='font-rockstar text-[16px] sm:text-[18px]'>Season {data.season_number}</span>

                <div className='flex gap-3 text-[14px] sm:text-[16px]'>
                    <div className='flex justify-center gap-1 items-center'>
                        <FaStar />
                        <span>{apiExtras.getFormattedVote(data.vote_average)}</span>
                    </div>

                    <span>{data.air_date?.split('-')[0]}</span>
                    <span>. {data.episodes.length} Episodes</span>
                </div>
            </div>

            {!isSelected && <div className="play group w-full h-full flex justify-center items-center absolute-center text-[40px] cursor-pointer"
            onClick={() => onClick(index)}
            >
                <div className='text-[var(--lime-green)] w-full h-full flex justify-center items-center pointer-events-none
                transition-transform scale-0 group-hover:scale-100 duration-300'
                    style={{ willChange: 'transform' }}
                >
                    <FaPlayCircle />
                </div>
            </div>}
        </div>
    )
})

export default SeasonItem
