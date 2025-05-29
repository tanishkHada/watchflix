import React from 'react'
import { motion } from 'framer-motion'

function TransitionCover({ entry = true, exit = true }) {
    return (
        <>
            {/* on exit */}
            {exit && <motion.div
                className='fixed top-0 left-0 w-full h-screen bg-[var(--lime-green)] origin-top z-[500]'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }} //[0.22, 1, 0.36, 1]
            />}

            {/* on entry */}
            {entry && <motion.div
                className='fixed top-0 left-0 w-full h-screen bg-[var(--lime-green)] origin-bottom z-[500]'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            />}
        </>
    )
}

export default TransitionCover
