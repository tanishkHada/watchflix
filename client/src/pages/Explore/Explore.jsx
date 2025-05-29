import React, { useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Genres from './Fragments/Genres';
import Upcoming from './Fragments/Upcoming/Upcoming'
import UpcomingMobile from './Fragments/Upcoming/UpcomingMobile';
import Results from './Fragments/Results';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from "gsap/ScrollTrigger";
import useMediaQuery from '../../utils/useMediaQuery'

function Explore({ exploreViewmodelObj }) {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const { movieGenreList, tvGenreList, upcomingMovies } = exploreViewmodelObj;
  const { exploreParams, setExploreParams, results, noResultsFound, noMoreData } = exploreViewmodelObj;

  const { newLoading, nextPageLoading } = exploreViewmodelObj;

  const upcomingRef = useRef();
  const resultsRef = useRef();

  const updateSearchQuery = (query) => {
    setExploreParams(_ => ({
      searchQuery: query,
      genreFilters: [],
      mediaType: "",
      pageNum: 1
    }))

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  const updateGenreFilters = (filters, mediaType) => {
    setExploreParams(_ => ({
      searchQuery: "",
      genreFilters: filters,
      mediaType: mediaType,
      pageNum: 1
    }))
  }

  const updatePageNumber = () => {
    setExploreParams(prev => ({
      ...prev,
      pageNum: prev.pageNum + 1
    }))
  }

  useGSAP(() => {
    gsap.set(upcomingRef.current, {
      clipPath: 'polygon(15% 15%, 80% 3%, 95% 96%, 5% 80%)',
      borderRadius: '0 0 40% 10%'
    })

    gsap.from(upcomingRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      scrollTrigger: {
        trigger: upcomingRef.current,
        start: "center center",
        end: 'bottom center',
        scrub: true,
        invalidateOnRefresh: true
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger?.kill());
    };
  })

  return (
    <div className='bg-[var(--dark-void)] select-none'>
      <Navbar onClickSearch={updateSearchQuery} />

      <section
        ref={upcomingRef}
        className='upcoming w-full h-screen'
      >
        {isMobile ? (
          <UpcomingMobile data={upcomingMovies} />
        ) : (
          <Upcoming data={upcomingMovies} />
        )}

      </section>

      <section className="genres w-full h-full p-5">
        <Genres
          movieGenreList={movieGenreList}
          tvGenreList={tvGenreList}
          updateGenreFilters={updateGenreFilters}
        />
      </section>

      <section ref={resultsRef} className="results w-full h-full p-5">
        <Results
          apiData={results}
          updatePageNumber={updatePageNumber}
          newLoading={newLoading}
          nextPageLoading={nextPageLoading}
          noResultsFound={noResultsFound}
          noMoreData={noMoreData}
          genreMediaType={exploreParams.mediaType}
        />
      </section>
    </div>
  );
}

export default Explore
