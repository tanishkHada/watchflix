import React from 'react'
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6'
import SlideItem from './SlideItem'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Upcoming.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCreative, Parallax } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

function Upcoming({data}) { 
    return (
        <div className='w-full h-screen'>
            <Swiper
                pagination={{
                    clickable: false,
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                }}
                modules={[Autoplay, Pagination, Navigation, EffectCreative, Parallax]}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        translate: ['-100%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                loop={true}
                parallax={true}
                // navigation={true}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                speed={1500}
                allowTouchMove={false}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,                   
                }}
                className="mySwiper h-full w-full select-none"
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SlideItem data={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="custom-prev absolute top-1/2 left-4 -translate-y-1/2 rounded-full text-[30px] p-1 shadow-lg hover:scale-125 transition duration-300 z-10 select-none cursor-pointer"
                style={{ willChange: 'transform' }}
            >
                <FaCircleChevronLeft className='text-[var(--lime-green)]' />
            </button>
            <button className="custom-next absolute top-1/2 right-4 -translate-y-1/2 rounded-full text-[30px]  p-1 shadow-lg hover:scale-125 transition duration-300 z-10 select-none cursor-pointer"
                style={{ willChange: 'transform' }}
            >
                <FaCircleChevronRight className='text-[var(--lime-green)]'/>
            </button>
        </div>
    )
}

export default Upcoming
