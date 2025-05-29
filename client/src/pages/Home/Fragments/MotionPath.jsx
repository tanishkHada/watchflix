import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CardMotion from "../../../components/Cards/CardMotion";

function MotionPath({ dataMovie, dataTv }) {
  
    const container = useRef();
    const path1 = useRef();
    const cards1 = useRef()
    const path2 = useRef();
    const cards2 = useRef()

    useGSAP(() => {
        cards1.current = gsap.utils.toArray('.cards1')
        cards2.current = gsap.utils.toArray('.cards2')

        //for cards1
        gsap.to(cards1.current, {
            motionPath: {
                path: path1.current,
                align: path1.current,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1
            },
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: `+=${window.innerHeight + 3000}px`,
                pin: true,
                pinSpacing: true,
                scrub: true,
                invalidateOnRefresh: true
            },
            stagger: 0.25,
            duration: 1,
            ease: "none",
        });

        //for cards2
        gsap.set(cards2.current, {
            motionPath: {
                path: path2.current,
                align: path2.current,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1
            }
        })

        gsap.to(cards2.current, {
            motionPath: {
                path: path2.current,
                align: path2.current,
                alignOrigin: [0.5, 0.5],
                start: 1,
                end: 0
            },
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: `+=${window.innerHeight + 3000}px`,
                scrub: true,
                invalidateOnRefresh: true
            },
            stagger: 0.25,
            duration: 1,
            ease: "none",
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger?.kill());
        };
    })

    return (
        <div className="container h-full w-full">

            <section ref={container}
                className="slider-section relative h-screen bg-[var(--dark-void)] text-white overflow-hidden flex justify-center items-center w-screen sm:w-[calc(100vw-5px)]">

                <h1 className="absolute top-0 left-[50%] transform -translate-x-[50%] text-[80px] font-bold font-rockstar sm:text-[100px]">MOVIES</h1>
                <h1 className="absolute top-[6%] text-transparent font-rockstar left-[50%] transform -translate-x-[50%] text-[80px] font-bold z-10 sm:text-[100px] sm:top-[9%]"
                    style={{
                        WebkitTextStroke: '1px white'
                    }}
                >MOVIES</h1>

                <h1 className="absolute bottom-0 left-[50%] transform -translate-x-[50%] text-[80px] font-bold font-rockstar sm:text-[100px]">SHOWS</h1>
                <h1 className="absolute bottom-[6%] text-transparent font-rockstar left-[50%] transform -translate-x-[50%] text-[80px] font-bold z-10 sm:text-[100px] sm:bottom-[9%]"
                    style={{
                        WebkitTextStroke: '1px white'
                    }}
                >SHOWS</h1>


                <div className="svgCards-container w-full flex items-center justify-center bg-[var(--dark-void)]">
                    <div className="sub-container1">                   

                        <svg className='w-[750px] h-[750px] sm:w-[1200px] sm:h-[1200px]'
                            viewBox="0 0 200 200"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path ref={path1} d="M10,100 Q190,190 190,-100" stroke="transparent" fill="transparent" />
                        </svg>                        
                        {dataMovie.map((data, index) => (
                            <CardMotion
                                key={index}
                                data={data}
                                myClassName='cards1'
                                mediaType={'movie'}
                            />
                        ))}
                    </div>

                    <div className="sub-container2">
                        <svg className='w-[750px] h-[750px] sm:w-[1200px] sm:h-[1200px]'
                            viewBox="0 0 200 200"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path ref={path2} d="M10,300 Q10,10, 190,100" stroke="transparent" fill="transparent" />
                        </svg>                       
                        {dataTv.map((data, index) => (
                            <CardMotion
                                key={index}
                                data={data}
                                myClassName='cards2'
                                mediaType={'tv'}
                            />
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}

export default MotionPath


