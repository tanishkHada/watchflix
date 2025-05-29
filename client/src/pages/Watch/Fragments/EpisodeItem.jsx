import React from 'react'
import { FaStar } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import apiExtras from '../../../utils/ApiExtras.js'
import { FaPlayCircle } from 'react-icons/fa'

const EpisodeItem = React.memo(({ data, index, isSelected, onClick }) => {
    return (
        <div
            className={`relative rounded-lg flex gap-5 p-2 justify-start items-center bg-[var(--charcoal)] text-white ${isSelected ? 'selected-watch-item' : ''}`}
        >
            <div className='poster flex-shrink-0'>
                <LazyLoadImage
                    className='w-[120px] h-[70px] sm:w-[150px] sm:h-[80px] mt-2 rounded-lg object-cover'                    
                    src={apiExtras.getImageUrl(data.still_path, 'w200', {isImage: true})}
                    effect='blur'
                />
            </div>

            <div className='details flex flex-col'>
                <span className='font-rockstar'>Episode {data.episode_number}</span>
                <span className='text-[15px] sm:text-[16px]'>{data.name}</span>

                <div className='mt-1 flex gap-3 text-[12px] sm:text-[14px]'>
                    <div className='flex justify-center items-center gap-1'>
                        <FaStar />
                        <span>{apiExtras.getFormattedVote(data.vote_average)}</span>
                    </div>
                    <span>{apiExtras.getFormattedRuntime(data.runtime)}</span>
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

export default EpisodeItem
