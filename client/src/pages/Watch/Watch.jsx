import React, { useEffect } from 'react'
import Player from './Fragments/Player'
import SeasonEpisodeSelector from './Fragments/SeasonEpisodeSelector'
import ServerSelector from './Fragments/ServerSelector'
import Cast from './Fragments/Cast'
import Navbar from '../../components/Navbar/Navbar'
import SkewScroll from '../Home/Fragments/SkewScroll'
import Footer from '../Home/Fragments/Footer'
import { useParams } from 'react-router-dom'
import Details from './Fragments/Details'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"
import Lenis from 'lenis';

function Watch({ data }) {
  gsap.registerPlugin(ScrollTrigger);

  const { mediaType, mediaId } = useParams();
  const { movieData, tvData, seasonsData, castData, similarMediaData, recommendMediaData } = data;

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

  return (
    <div className='bg-[var(--dark-void)] select-none'>
      <Navbar />
      <section className="watch w-full h-screen bg-[var(--dark-void)]">

        <div className="mainContainer pb-5 px-2 pt-20 gap-3 flex flex-col w-full h-full sm:flex-row">

          <div className="container1 w-full h-full gap-3 flex flex-col">
            <Player mediaType={mediaType} mediaId={mediaId} />
            <ServerSelector />
          </div>

          {(mediaType === 'tv') && <div className="container2 w-full max-w-[450px] h-full max-h-[320px] sm:max-h-full">
            <SeasonEpisodeSelector data={seasonsData} />
          </div>}

        </div>
      </section>

      <section className="details w-full h-screen p-2">
        <div className='w-full h-full bg-[var(--charcoal)] rounded-lg'>
          <Details
            detailsData={mediaType === 'movie' ? movieData : tvData}
            mediaType={mediaType}
          />
        </div>
      </section>

      <section className="cast bg-[var(--dark-void)]">
        <h1 className=' bg-[var(--charcoal)] text-center text-white text-[60px] font-aalto p-5 mt-20 sm:text-start m-2 rounded-lg sm:text-[100px]'>TOP CAST</h1>
        <Cast data={castData} />
      </section>

      <section className='w-full'>
        <h1 className='bg-[var(--charcoal)] text-center text-white text-[60px] p-5 font-aalto mt-20 sm:text-start m-2 rounded-lg sm:text-[100px]'>YOU MAY ALSO LIKE</h1>
        <SkewScroll
          data1={similarMediaData}
          data2={recommendMediaData}
          title1={'Similar'}
          title2={'Picks'}
          globalMediaType={mediaType}
        />
        <Footer />
      </section>
    </div>
  )
}

export default Watch
