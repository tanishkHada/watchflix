import React, { useContext, useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { FaRegBookmark } from 'react-icons/fa'
import useDebounce from '../../utils/Debounce';
import bookmarkService from '../../shared/BookmarkService';
import NavigateContext from '../../contexts/NavigateContext';

function BookmarkBtn({ data, mediaType, inCard = true }) {
    const onNavigate = useContext(NavigateContext);

    const inCardClasses = "favBtn absolute text-[var(--lime-green)] text-[18px] bottom-2.5 right-1 bg-black p-2 rounded-full cursor-pointer";
    const notInCardClasses = "bg-black p-3 text-[18px] text-[var(--lime-green)] rounded-lg cursor-pointer";

    const [bookmarked, setBookmarked] = useState(data.bookmarked);
    const resolvedId = data.id || data.mediaId;

    useEffect(() => {
        setBookmarked(data.bookmarked);
    }, [resolvedId]);

    useEffect(() => {
        setBookmarked(data.bookmarked);
    }, [data.id]);

    const saveBookmark = async () => {
        try {
            const res = await bookmarkService.save({
                mediaId: data.id || data.mediaId,
                mediaType: mediaType || data.mediaType,
                posterPath: data.poster_path || data.posterPath,
            });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                onNavigate(`/auth?redirectTo=${encodeURIComponent(window.location.pathname)}`);
            }
        }
    }

    const unsaveBookmark = async () => {
        try {
            const res = await bookmarkService.unsave(data.id || data.mediaId);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                onNavigate(`/auth?redirectTo=${encodeURIComponent(window.location.pathname)}`);
            }
        }
    }

    const toggleBookmark = useDebounce(() => {
        const newState = !bookmarked;      
        setBookmarked(newState);          

        if (newState) {
            saveBookmark();
        } else {
            unsaveBookmark();
        }
    }, 1000);

    return (
        <div
            className={inCard ? `${inCardClasses}` : `${notInCardClasses}`}
            onClick={toggleBookmark}
        >
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </div>
    )
}

export default BookmarkBtn
