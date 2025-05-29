import React, { useRef } from 'react'
import { motion } from 'framer-motion'

function TransitionGridBlocks({ entry = true, exit = true }) {
    const container1 = useRef();
    const container2 = useRef();

    const blocks = []
    const getBlocksCorrdinates = () => {
        if (blocks.length === 0) {
            const rows = Math.ceil(1080 / 100);
            const cols = Math.ceil(1920 / 100);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    blocks.push({ top: i * 100, left: j * 100 });
                }
            }
        }
    }
    getBlocksCorrdinates();

    const handleOnStart = () => {
        if (container1.current) {
            container1.current.classList.remove('pointer-events-none');
        }
    }

    const handleOnComplete = () => {
        if (container2.current) {
            container2.current.style.transform = 'scaleY(0)';
        }
    }

    const getRandomStaggerDelay = () => Math.random() * 0.5;

    const blockVariantsExit = {
        hidden: {
            opacity: 1,
            scale: 0
        },
        visible: (custom) => ({
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: custom
            },
        })
    };

    const containerVariantsExit = {
        hidden: {
        },
        visible: {
            scaleY: 1,
            transition: {
                staggerChildren: 0.02,
            },
        }
    };

    const blockVariantsEntry = {
        hidden: (custom) => ({
            opacity: 1,
            scale: 0,
            transition: {
                duration: 0.5,
                delay: custom
            },
        }),
        visible: {
            opacity: 1,
            scale: 1
        }
    };

    const containerVariantsEntry = {
        hidden: {
        },
        visible: {
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    return (
        <>
            {/* on exit */}
            {exit && <motion.div
                className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-[500]"
                ref={container1}
                variants={containerVariantsExit}
                initial="hidden"
                animate="hidden"
                exit='visible'
                onAnimationStart={handleOnStart}
            >
                {blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        className="block absolute w-[100px] h-[100px] bg-[var(--lime-green)]"
                        style={{
                            top: `${block.top}px`,
                            left: `${block.left}px`,
                        }}
                        variants={blockVariantsExit}
                        custom={getRandomStaggerDelay()}
                    />
                ))}
            </motion.div>}

            {/* on entry */}
            {entry && <motion.div
                className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[500]"
                ref={container2}
                variants={containerVariantsEntry}
                initial="visible"
                animate="hidden"
                onAnimationComplete={handleOnComplete}
            >
                {blocks.map((block, index) => (
                    <motion.div
                        key={index}
                        className="block absolute w-[100px] h-[100px] bg-[var(--lime-green)]"
                        style={{
                            top: `${block.top}px`,
                            left: `${block.left}px`,
                        }}
                        variants={blockVariantsEntry}
                        custom={getRandomStaggerDelay()}
                    />
                ))}
            </motion.div>}
        </>
    )
}

export default TransitionGridBlocks
