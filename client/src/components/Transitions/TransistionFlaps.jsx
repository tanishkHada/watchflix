import React from 'react'
import { motion } from 'framer-motion'

function TransitionFlaps({ entry = true, exit = true }) {

    const calculateRandomBlockDelay = (rowInd, totalRows) => {
        const flapDelay = Math.random() * 0.5;
        const rowDelay = (totalRows - rowInd - 1) * 0.05;
        return flapDelay + rowDelay;
    }

    return (
        <>
            {/* on exit */}
            {exit && <div className='fixed top-0 left-0 w-full h-screen flex flex-col pointer-events-none z-[500]'>
                {Array.from({ length: 10 }).map((_, rowInd) => (
                    <div className='row flex flex-1 w-full' key={rowInd}>
                        {Array.from({ length: 11 }).map((_, flapInd) => (
                            <motion.div
                                key={flapInd}
                                className='flap flex-1 bg-[var(--lime-green)] m-[-0.25px]'
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 0 }}
                                exit={{ scaleY: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: calculateRandomBlockDelay(rowInd, 10)
                                }}
                            >
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>}

            {/* on entry */}
            {entry && <div className='fixed top-0 left-0 w-full h-screen flex flex-col pointer-events-none z-[500]'>
                {Array.from({ length: 10 }).map((_, rowInd) => (
                    <div className='row flex flex-1 w-full' key={rowInd}>
                        {Array.from({ length: 11 }).map((_, flapInd) => (
                            <motion.div
                                key={flapInd}
                                className='flap flex-1 bg-[var(--lime-green)] m-[-0.25px]'
                                initial={{ scaleY: 1 }}
                                animate={{ scaleY: 0 }}
                                exit={{ scaleY: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: calculateRandomBlockDelay(rowInd, 10)
                                }}
                            >
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>}
        </>
    )
}

export default TransitionFlaps
