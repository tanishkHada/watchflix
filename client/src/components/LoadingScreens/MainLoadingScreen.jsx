import React from 'react'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'

function MainLoadingScreen({ onCompleteAnim }) {
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: onCompleteAnim
    });

    tl.from(".clip-top, .clip-bottom", {
      duration: 1,
      height: '50vh',
      ease: 'power4.inOut'
    }, "+=0.5") 

      .to(".marquee", {
        duration: 3,
        top: '50%',
        ease: 'power4.inOut'
      }, "-=1.5") 

      .from(".clip-top .marquee, .clip-bottom .marquee", {
        duration: 5,
        left: '100%',
        ease: 'power4.inOut'
      }, "<") 

      .from(".clip-center .marquee", {
        duration: 5,
        left: '-50%',
        ease: 'power4.inOut'
      }, "<")

      .to(".clip-top", {
        duration: 1,
        clipPath: 'inset(0 0 100% 0)',
        ease: 'power4.inOut'
      }, "-=1")

      .to(".clip-bottom", {
        duration: 1,
        clipPath: 'inset(100% 0 0 0)',
        ease: 'power4.inOut'
      }, "<") 

      .to(".clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span", {
        duration: 1,
        opacity: 0,
        ease: 'power2.inOut'
      }, "-=1")

      .to(".clip-center", {
        height: "100vh",
        top: 0
      }, "-=0.3")

      .to(".clip-center .marquee", {
        duration: 1.6,
        scale: 10,
        ease: "power.out",
        transformOrigin: "center center"       
      }, "<")

      .to(".loader", {
        duration: 1,
        backgroundColor: "#151419",
        ease: "power2.inOut"
      }, "-=2");

    return () => {
      tl.kill();
    };

  }, []);

  return (
    <div className="loader w-full h-screen bg-[var(--lime-green)] overflow-hidden select-none">
      <div className="loader-clip clip-top bg-[var(--dark-void)] absolute w-screen h-[33.3vh] overflow-clip top-0"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      >
        <div className="marquee absolute top-[200%] left-[50%] w-[200vw] transform -translate-x-1/2 -translate-y-1/2 text-[16vw]">
          <div className="marquee-container w-full pt-[0.2rem] flex justify-between items-center gap-5 font-humane text-[var(--lime-green)]">
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            WATCHFLIX
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
          </div>
        </div>
      </div>
      <div className="loader-clip clip-center relative w-screen h-[33.3vh] overflow-hidden top-[33.3vh]">
        <div className="marquee absolute top-[200%] left-[50%] w-[200vw] text-[var(--dark-void)] transform -translate-x-1/2 -translate-y-1/2 text-[16vw]">
          <div className="marquee-container w-full pt-[0.2rem] flex justify-between items-center font-humane">
            <span>WATCHFLIX</span>
            <span>WATCHFLIX</span>
            WATCHFLIX
            <span>WATCHFLIX</span>
            <span>WATCHFLIX</span>
          </div>
        </div>
      </div>
      <div className="loader-clip clip-bottom bg-[var(--dark-void)] absolute w-screen h-[33.3vh] overflow-clip bottom-0"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      >
        <div className="marquee absolute top-[200%] left-[50%] w-[200vw] transform -translate-x-1/2 -translate-y-1/2 text-[16vw]">
          <div className="marquee-container w-full pt-[0.2rem] flex justify-between items-center font-humane text-[var(--lime-green)]">
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            WATCHFLIX
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
            <span className='text-transparent' style={{ WebkitTextStroke: '2px var(--lime-green)' }}>WATCHFLIX</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLoadingScreen
