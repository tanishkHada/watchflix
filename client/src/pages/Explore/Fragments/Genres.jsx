import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ActionButton from '../../../components/Buttons/ActionButton';

function Genres({ movieGenreList, tvGenreList, updateGenreFilters }) { 
    
    const [currGenreType, setCurrGenreType] = useState('movie');
    const [currGenreList, setCurrGenreList] = useState(movieGenreList);
    const [selectedGenres, setSelectedGenres] = useState([movieGenreList[0].id]);

    const toggleGenreType = (clickedType) => {
        if (currGenreType !== clickedType) {
            setCurrGenreType((type) => (type === 'movie' ? 'tv' : 'movie'));
            setCurrGenreList((_) => (clickedType === 'movie' ? movieGenreList : tvGenreList));
            setSelectedGenres([]);
        }
    }

    const toggleGenreSelection = (genreId) => {
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genreId) ? prevSelectedGenres.filter((id) => id !== genreId) : [...prevSelectedGenres, genreId]
        );
    }

    const onClickFilter = () => {
        if (currGenreList.length > 0) {
            updateGenreFilters(selectedGenres, currGenreType);
        }
    }

    useEffect(() => {
        onClickFilter();
    }, []);

    useGSAP(() => {
        const elements = gsap.utils.toArray('.genre-item');

        gsap.set(elements, {
            scaleY: 0,
            transformOrigin: 'top'
        })

        gsap.to(elements, {
            scaleY: 1,
            stagger: 0.05,
            ease: 'elastic.out(2,1)',
            willChange: 'transform, opacity'
        })

    }, { dependencies: [currGenreList], revertOnUpdate: true })

    return (
        <div className='w-full h-full flex flex-col gap-3 justify-center items-start bg-[var(--charcoal)] p-3 rounded-lg sm:flex-row'>

            <div className='h-full flex flex-row flex-wrap gap-2 text-[20px] justify-center items-center p-3 rounded-lg sm:flex-col'>
                <h1
                    className={`px-2 py-1 border-2 rounded-lg cursor-pointer transition duration-300 ${currGenreType === 'movie' ? 'selected-genre-type' : 'not-selected-genre-type'}`}
                    onClick={() => toggleGenreType('movie')}
                >
                    MOVIES
                </h1>
                <h1
                    className={`px-2 py-1 border-2 rounded-lg cursor-pointer transition duration-300 ${currGenreType === 'tv' ? 'selected-genre-type' : 'not-selected-genre-type'}`}
                    onClick={() => toggleGenreType('tv')}
                >
                    SHOWS
                </h1>                

                <ActionButton
                    btnText1={'FILTER'}
                    btnText2={'RESULTS'}
                    onClickButton={onClickFilter}
                />
            </div>

            <div className="genres w-full h-full justify-start items-center flex flex-wrap gap-2 p-3 rounded-lg">

                {currGenreList.map((genre, ind) => (
                    <div
                        key={ind}
                        className={`sm:px-2 sm:py-1 px-2 py-0 border-2 rounded-lg cursor-pointer ${selectedGenres.includes(genre.id) ? 'selected-genre' : 'not-selected-genre'} select-none genre-item`}
                        onClick={() => toggleGenreSelection(genre.id)}
                    >
                        <span className='text-[14px] sm:text-[16px]'>{genre.name}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Genres
