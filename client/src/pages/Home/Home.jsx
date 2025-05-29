import React, { useRef, useEffect } from 'react'
import Hero from './Fragments/Hero'
import SkewScroll from './Fragments/SkewScroll'
import MotionPath from './Fragments/MotionPath'
import Footer from './Fragments/Footer'
import Popular from './Fragments/Popular'
import TopRated from './Fragments/TopRated'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import ScrollTrigger from "gsap/ScrollTrigger"
import MotionPathPlugin from "gsap/MotionPathPlugin"
import Navbar from '../../components/Navbar/Navbar'
import Lenis from 'lenis';

function Home({ data }) {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const { mvNowPlaying, mvPopular, mvTopRated, tvPopular, tvTopRated } = data;

  const stickySection = useRef();
  const nextSection = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  useGSAP(() => {
    ScrollTrigger.refresh();
    gsap.to(stickySection.current, {
      scrollTrigger: {
        trigger: stickySection.current,
        start: 'top top',
        end: () => '+=' + (window.innerHeight + nextSection.current.offsetHeight * 0.5),
        scrub: 1,
        pin: true,
      },
      y: 250,
      scale: 0.75,
      rotation: -15,
      ease: 'power3.out'
    })

    gsap.set(nextSection.current, {
      x: -100,
      y: 100,
      scale: 0.75,
      rotation: 15
    })

    gsap.to(nextSection.current, {
      scrollTrigger: {
        trigger: nextSection.current,
        start: 'top 90%',
        end: 'top 20%',
        scrub: 1,
      },
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      ease: 'power3.out'
    })

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger?.kill());
    }
  })

  return (

    <div className='relative bg-black select-none'>

      <Navbar />

      <section ref={stickySection} className="fixed top-0 left-0 h-screen w-full flex justify-center items-center">
        <Hero data={mvNowPlaying} />
      </section>

      <section ref={nextSection} className="content flex justify-center items-center absolute top-[100vh] w-full h-screen">
        <Popular />
      </section>

      <div className='absolute left-0 top-[200vh] w-full'>
        <SkewScroll
          data1={mvPopular}
          data2={tvPopular}
          title1={'MOVIES'}
          title2={'SHOWS'}
        />
        <TopRated />
        <MotionPath dataMovie={mvTopRated} dataTv={tvTopRated} />
        <Footer />
      </div>
    </div>
  )
}

export default Home
