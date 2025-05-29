import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis';
import apiExtras from '../../../utils/ApiExtras.js';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Cast({ data }) {
    const castData = data;
   
    const containerRef1 = useRef();
    const containerRef2 = useRef();

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
        const cleanup1 = createLocalSmoothScroll(containerRef1.current);
        const cleanup2 = createLocalSmoothScroll(containerRef2.current);

        return () => {
            cleanup1();
            cleanup2();
        };
    }, []);

    return (
        <div className='p-2'>
            

            {/* for medium large screens */}
            <div
                ref={containerRef1}
                className="castList hidden rounded-lg bg-[var(--lime-green)] w-full h-[450px] p-5 place-items-start gap-10 overflow-y-auto overflow-x-hidden
                sm:grid sm:grid-cols-3"
            >
                {castData.map((data, ind) => (

                    <div key={ind}
                        className='flex gap-5 text-center justify-between items-center'
                    >
                        <div>
                            <LazyLoadImage
                                className='w-full h-full object-cover object-center rounded-lg'
                                height='180px'
                                width='150px'
                                src={apiExtras.getImageUrl(data.profile_path, 'w200', { isCast: true })}
                                effect='blur'
                            />
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            <span className='text-[30px] font-rockstar'>
                                {data.name}
                            </span>
                            <span className='text-[30px] font-aalto'>
                                {data.character}
                            </span>
                        </div>
                    </div>

                ))}
            </div>

            {/* for mobile screens */}
            <div
                ref={containerRef2}
                className="castList rounded-lg bg-[var(--lime-green)] w-full h-[300px] p-5 flex gap-10 overflow-x-auto sm:hidden"
            >
                {castData.map((data, ind) => (

                    <div key={ind}
                        className='flex flex-col gap-5 text-center justify-between items-center flex-shrink-0'
                    >
                        <div>
                            <LazyLoadImage
                                className='w-full h-full object-cover object-center rounded-lg'
                                height='160px'
                                width='130px'
                                src={apiExtras.getImageUrl(data.profile_path, 'w200', { isCast: true })}
                                effect='blur'
                            />
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            <span className='text-[20px] font-rockstar'>
                                {data.name}
                            </span>
                            <span className='text-[25px] font-aalto'>
                                {data.character}
                            </span>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Cast
