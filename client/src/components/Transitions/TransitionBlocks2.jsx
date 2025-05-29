import React from 'react'
import { motion } from 'framer-motion'

function TransitionBlocks2({ entry = true, exit = true }) {
    const containerVariantsExit = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const blockVariantsExitUpper = {
        hidden: {
            scaleY: 0,
            transformOrigin: 'top'
        },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const blockVariantsExitLower = {
        hidden: {
            scaleY: 0,
            transformOrigin: 'bottom'
        },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const containerVariantsEntry = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const blockVariantsEntryUpper = {
        hidden: {
            scaleY: 1,
            transformOrigin: 'top'
        },
        visible: {
            scaleY: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const blockVariantsEntryLower = {
        hidden: {
            scaleY: 1,
            transformOrigin: 'bottom'
        },
        visible: {
            scaleY: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const blocks = [1, 2, 3, 4, 5];

    return (
        <>
            {/* on exit */}
            {exit && <motion.div
                className="z-[500]"
                variants={containerVariantsExit}
                initial="hidden"
                animate="hidden"
                exit='visible'
            >
                {blocks.map((_, index) => (
                    <React.Fragment key={index + 1}>
                        {/* upper */}
                        <motion.div
                            className='fixed w-1/4 h-1/2 top-0 bg-[var(--lime-green)] z-[500]'
                            style={{ left: `${index * 25}%` }}
                            variants={blockVariantsExitUpper}
                        ></motion.div>
                        {/* lower */}
                        <motion.div
                            className='fixed w-1/4 h-1/2 bottom-0 bg-[var(--lime-green)] z-[500]'
                            style={{ left: `${index * 25}%` }}
                            variants={blockVariantsExitLower}
                        ></motion.div>
                    </React.Fragment>
                ))}
            </motion.div>}

            {/* on entry */}
            {entry && <motion.div
                className="z-[500]"
                variants={containerVariantsEntry}
                initial="hidden"
                animate="visible"
            >
                {blocks.map((_, index) => (
                    <React.Fragment key={index}>
                        {/* upper */}
                        <motion.div
                            className='fixed w-1/4 h-1/2 top-0 bg-[var(--lime-green)] z-[500]'
                            style={{ left: `${index * 25}%` }}
                            variants={blockVariantsEntryUpper}
                        ></motion.div>
                        {/* lower */}
                        <motion.div
                            className='fixed w-1/4 h-1/2 bottom-0 bg-[var(--lime-green)] z-[500]'
                            style={{ left: `${index * 25}%` }}
                            variants={blockVariantsEntryLower}
                        ></motion.div>
                    </React.Fragment>
                ))}
            </motion.div>}
        </>
    )
}

export default TransitionBlocks2
