import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from "split-type";

function TopRated() {
  const container = useRef()
  const container1 = useRef();
  const container2 = useRef();

  useGSAP(() => {

    gsap.to(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        scrub: 1,
        pin: true,
        pinSpacing: false,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger?.kill());
    }
  })

  useGSAP(() => {
    if (!container1.current || !container2.current) {
      return;
    }

    //big text
    const splitText = new SplitType(container1.current, { types: "chars" });

    const containerHeight = container1.current.getBoundingClientRect().height;

    gsap.set(splitText.chars, {
      y: containerHeight,
    });

    gsap.to(splitText.chars, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        end: 'top 10%',
        scrub: true,
      },
      y: 0,
      stagger: 0.5,
      duration: 5,
      willChange: 'transform, opacity'
    });

    //small text
    const anotherSplitText = new SplitType(container2.current, { types: "words" });

    gsap.set(anotherSplitText.words, {
      opacity: 0
    });

    gsap.to(anotherSplitText.words, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 30%',
        end: 'top top',
        scrub: true,
      },
      opacity: 1,
      stagger: 0.3,
      duration: 3,
      willChange: 'transform, opacity'
    });

    return () => {
      if (splitText) splitText.revert();
      if (anotherSplitText) anotherSplitText.revert();
    };
  })

  return (
    <div ref={container} className='bg-[var(--hot-pink)] w-full h-screen flex flex-col justify-center items-center sm:justify-start'>
      <div ref={container1} className='leading-none text-[180px] font-humane sm:text-[600px]'
        style={{
          fontKerning: "none",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        TOP RATED
      </div>

      <p ref={container2} className="text-lg text-center mt-[0px] mx-[10px] sm:mx-[100px]">
        Explore the highest-rated movies and TV shows.
        From critically acclaimed masterpieces to fan-favorite gems, stay updated on the top-rated entertainment.
        Find your next must-watch and experience the best of cinema and television!
      </p>
    </div>
  )
}

export default TopRated
