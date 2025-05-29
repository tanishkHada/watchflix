import React from 'react'
import { motion } from 'framer-motion'

function TransitionBlocks({ entry = true, exit = true }) {
    const containerVariantsExit = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const blockVariantsExit = {
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

    const containerVariantsEntry = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const blockVariantsEntry = {
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

    const blocks = [1, 2, 3, 4];

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
                    <motion.div
                        key={index}
                        className='fixed w-1/4 h-screen top-0 bg-[var(--lime-green)] z-[500]'
                        style={{ left: `${index * 25}%` }}
                        variants={blockVariantsExit}
                    ></motion.div>
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
                    <motion.div
                        key={index}
                        className='fixed w-1/4 h-screen top-0 bg-[var(--lime-green)] z-[500]'
                        style={{ left: `${index * 25}%` }}
                        variants={blockVariantsEntry}
                    ></motion.div>
                ))}
            </motion.div>}
        </>
    )
}

export default TransitionBlocks
