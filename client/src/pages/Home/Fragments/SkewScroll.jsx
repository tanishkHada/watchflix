import React, { useRef, useEffect, useState } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CardScroll from '../../../components/Cards/CardScroll';

function SkewScroll({ data1, data2, title1, title2, globalMediaType }) { 

  const horizontalSection = useRef();
  const horizontalWrapper = useRef();
  const reverseHorizontalWrapper = useRef();

  useGSAP(() => {

    let proxy = { skew: 0 }
    let newProxy = { skew: 0 }
    let skewSetter = gsap.quickSetter(horizontalWrapper.current, 'skewX', 'deg')
    let reverseSkewSetter = gsap.quickSetter(reverseHorizontalWrapper.current, 'skewX', 'deg')
    let clamp = gsap.utils.clamp(-10, 10)

    gsap.to(horizontalWrapper.current, {
      x: () => -(horizontalWrapper.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection.current,
        start: 'top top',
        end: `+=${horizontalWrapper.current.scrollWidth}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / 50)

          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
              skew: 0, duration: 1, ease: 'power3', overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            })
          }
        }
      }
    });

    //for reverse horizontal wrapper
    gsap.to(reverseHorizontalWrapper.current, {
      x: () => (horizontalWrapper.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection.current,
        start: 'top top',
        end: `+=${horizontalWrapper.current.scrollWidth}px`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / 50)

          if (Math.abs(skew) > Math.abs(newProxy.skew)) {
            newProxy.skew = -skew
            gsap.to(newProxy, {
              skew: 0, duration: 1, ease: 'power3', overwrite: true,
              onUpdate: () => reverseSkewSetter(newProxy.skew)
            })
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger?.kill());
    }
  })

  return (
    <div className='container w-full h-full'>

      <section ref={horizontalSection}
        className='horiSection relative h-screen bg-[var(--dark-void)] text-white flex flex-col gap-[100px] justify-center
      overflow-hidden w-screen sm:w-[calc(100vw-5px)]'>

        <h1 className="absolute top-[2%] left-[50%] font-rockstar transform -translate-x-[50%] text-[70px] font-bold sm:text-[100px] sm:top-0 pointer-events-none">{title1}</h1>
        <h1 className="absolute top-[7%] font-rockstar text-transparent left-[50%] transform -translate-x-[50%] text-[70px] font-bold z-10 sm:text-[100px] sm:top-[3%] pointer-events-none"
          style={{
            WebkitTextStroke: '1px white'
          }}
        >{title1}</h1>

        <h1 className="absolute bottom-[2%] left-[50%] transform -translate-x-[50%] text-[70px] font-rockstar font-bold sm:text-[100px] sm:bottom-[1%] pointer-events-none">{title2}</h1>
        <h1 className="absolute bottom-[7%] text-transparent font-rockstar left-[50%] transform -translate-x-[50%] text-[70px] font-bold z-10 sm:text-[100px] sm:bottom-[3%] pointer-events-none"
          style={{
            WebkitTextStroke: '1px white'
          }}
        >{title2}</h1>


        <div ref={horizontalWrapper} className='horizontal-wrapper flex gap-5 justify-start items-center'
          style={{ willChange: 'transform' }}
        >
          <div className='spacer w-[100px] h-full flex-shrink-0'></div>

          {data1.map((data, index) => (
            <CardScroll key={index} data={data} mediaType={globalMediaType || 'movie'} />
          ))}

          <div className='spacer w-[150px] h-full flex-shrink-0'></div>
        </div>

        <div ref={reverseHorizontalWrapper} className='horizontal-wrapper flex gap-5 justify-end items-center'
        >
          <div className='spacer w-[100px] h-full flex-shrink-0'></div>

          {data2.map((data, index) => (
            <CardScroll key={index} data={data} mediaType={globalMediaType || 'tv'} />
          ))}

          <div className='spacer w-[100px] h-full flex-shrink-0'></div>
        </div>
      </section>
    </div>
  )
}

export default SkewScroll
