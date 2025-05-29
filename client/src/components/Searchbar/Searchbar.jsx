import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaPlus, FaDeleteLeft } from 'react-icons/fa6'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Searchbar({ onClickSearch }) {
    const [query, setQuery] = useState("");

    const [searchBtnActive, setSearchBtnActive] = useState(false);
    const searchbarRef1 = useRef();
    const searchbarRef2 = useRef();

    const inputRef = useRef();

    const toggleSearchBtn = () => {
        setSearchBtnActive((val) => {
            const _val = !val;
            if (!_val) {
                setQuery("");
            }
            return _val;
        });
    }

    const handleSearch = () => {
        if (query.trim()) {
            onClickSearch(query);
            inputRef.current?.blur();
        }
    };

    useGSAP(() => {
        if (searchBtnActive) {
            // for bigger screens
            gsap.to(searchbarRef1.current, {
                scaleX: 1,
                ease: 'back.out(2)',
                duration: 0.4
            })

            // for mobile screens
            gsap.to(searchbarRef2.current, {
                scaleX: 1,
                ease: 'back.inOut'
            })
        } else {
            // for bigger screens
            gsap.to(searchbarRef1.current, {
                scaleX: 0,
                ease: 'back.in',
                duration: 0.4
            })

            // for mobile screens
            gsap.to(searchbarRef2.current, {
                scaleX: 0,
                ease: 'back.in'
            })
        }

    }, [searchBtnActive])

    return (
        <div className="container flex gap-2 justify-center items-center">

            <div
                ref={searchbarRef1}
                className='searchBar w-full relative hidden items-center bg-white px-2 py-1 gap-2 rounded-full scale-x-0 sm:flex origin-right'>
                <input
                    ref={inputRef}
                    className='w-[400px] ml-2 text-black outline-none border-none'
                    type="text"
                    placeholder='Search'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />

                <div className="clearInput text-[20px] cursor-pointer text-black"
                    onClick={() => (setQuery(""))}
                >
                    <FaDeleteLeft />
                </div>

                <div className="btnSearch bg-[var(--hot-pink)] text-[var(--charcoal)] p-2 rounded-full cursor-pointer"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </div>
            </div>

            <div className="searchNavBtnContainer text-[20px] font-extrabold cursor-pointer">
                {!searchBtnActive &&
                    <div
                        className=''
                        onClick={toggleSearchBtn}
                        style={{
                            animation: 'rotate360 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)'
                        }}
                    >
                        <FaSearch />
                    </div>}

                {searchBtnActive &&
                    <div
                        onClick={toggleSearchBtn}
                        style={{
                            animation: 'rotate360 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)'
                        }}
                    >
                        <div className='rotate-45'>
                            <FaPlus />
                        </div>
                    </div>}
            </div>

            {/* for mobile screens */}
            <div
                ref={searchbarRef2}
                className='absolute left-0 top-15 w-full flex items-center bg-white px-1 py-1 gap-2 rounded-full scale-x-0 sm:hidden'>
                <input
                    ref={inputRef}
                    className='ml-3 w-full text-black outline-none border-none'
                    type="text"
                    placeholder='Search...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />

                <div className="clearInput text-[20px] cursor-pointer text-black"
                    onClick={() => (setQuery(""))}
                >
                    <FaDeleteLeft />
                </div>

                <div className="btnSearch bg-purple-300 text-purple-800 p-3 rounded-full cursor-pointer"
                    onClick={handleSearch}
                >
                    <FaSearch />
                </div>
            </div>

        </div>

    )
}

export default Searchbar
