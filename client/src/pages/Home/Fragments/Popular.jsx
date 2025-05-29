import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from "split-type";

function Popular() {
  const container1 = useRef();
  const container2 = useRef();
  const mainContainer = useRef();

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
        trigger: mainContainer.current,
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
        trigger: mainContainer.current,
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
      if(anotherSplitText) anotherSplitText.revert();
    };
  })

  return (
    <div ref={mainContainer} className='bg-[var(--slate-blue)] text-white w-full h-screen flex flex-col justify-center items-center sm:justify-start'>
      <div ref={container1} className='leading-none text-[180px] font-humane sm:text-[600px]'
        style={{
          fontKerning: "none",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        POPULAR
      </div>

      <p ref={container2} className="text-lg text-center mt-[0px] mx-[10px] sm:mx-[100px]">
        Explore the latest and most talked-about movies and TV shows.
        From blockbuster hits to binge-worthy series, stay updated on what’s popular right now.
        Find your next favorite watch and dive into the world of entertainment!
      </p>
    </div>
  )
}

export default Popular
