import React from 'react'
import Results from '../Explore/Fragments/Results'
import useBookmarkViewModel from '../../viewmodels/BookmarkViewModel'
import Navbar from '../../components/Navbar/Navbar';

function Bookmarks() {
    const bookmarkViewmodelObj = useBookmarkViewModel();

    const { setPageNum, results, noResultsFound, noMoreData } = bookmarkViewmodelObj;

    const { newLoading, nextPageLoading } = bookmarkViewmodelObj;

    const updatePageNumber = () => {
        setPageNum(prev => (prev + 1));
    }    

    return (
        <div className='bg-[var(--dark-void)] w-full min-h-screen select-none'>
            <Navbar />

            <section className='w-full h-full p-5'>
                <h1 className=' p-5 mt-20 font-aalto text-center text-[70px] text-[var(--hot-pink)] sm:text-[100px]'>YOUR FAVORITES</h1>

                <Results
                    apiData={results}
                    updatePageNumber={updatePageNumber}
                    newLoading={newLoading}
                    nextPageLoading={nextPageLoading}
                    noResultsFound={noResultsFound}
                    noMoreData={noMoreData}
                />
            </section>
        </div>
    )
}

export default Bookmarks
