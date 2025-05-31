import React, { useEffect } from 'react'
import Card from '../../../components/Cards/Card'
import Lenis from 'lenis';
import { useLocation } from 'react-use';
import Loader from '../../../elements/Loader/Loader';
import { motion } from 'framer-motion';
import ActionButton from '../../../components/Buttons/ActionButton';

function Results({ apiData, updatePageNumber, newLoading, nextPageLoading, noResultsFound, noMoreData, genreMediaType }) { //{ data }
    let data = apiData;

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        }
    }, [apiData]);

    const loadNextPage = () => {
        updatePageNumber();
    }

    return (
        newLoading ? (
            <div className='w-full h-full flex justify-center items-center text-center text-white'>
                <motion.h1 className='relative font-aalto text-[50px] p-20 sm:text-[100px] sm:p-50'
                    animate={{ opacity: [0.1, 1, 0.1] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                >
                    LOADING
                </motion.h1>
            </div>
        )
            : !noResultsFound ? (
                <div
                    className="flex flex-col gap-5 items-center">
                    <div className='w-full h-full flex flex-wrap justify-center items-center gap-10'>
                        {data.map((item, ind) => (
                            <Card
                                key={ind}
                                data={item}
                                mediaType={genreMediaType}
                            />
                        ))}
                    </div>

                    {!nextPageLoading && !noMoreData &&                       
                        (<ActionButton
                            btnText1={'LOAD'}
                            btnText2={'MORE'}
                            onClickButton={loadNextPage}
                        />)
                    }

                    {nextPageLoading && (
                        <div className='p-5'>
                            <Loader />
                        </div>
                    )}

                    {noMoreData && (
                        <div className='text-white font-aalto mt-5 text-[40px]'>
                            <h1>That's all we have</h1>
                        </div>
                    )}
                </div>
            ) : (
                <div className='w-full h-full text-center text-white'>
                    <h1 className='font-aalto text-[50px] p-20 sm:text-[100px] sm:p-50'>No Results Found</h1>
                </div>
            )
    )
}

export default Results
