import React, { useContext } from 'react'
import apiExtras from '../../utils/ApiExtras'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import NavigateContext from '../../contexts/NavigateContext'
import BookmarkBtn from '../Buttons/BookmarkBtn'
import useDebounce from '../../utils/Debounce'

function CardScroll({ data, mediaType }) {
  const onNavigate = useContext(NavigateContext);
  const type = data.media_type || data.mediaType || mediaType;

  return (
    <div className='relative hover:scale-110 transition-transform duration-300'
    >
      <LazyLoadImage
        className='rounded-lg cursor-pointer'
        width={170}
        height={250}
        src={apiExtras.getImageUrl(data.poster_path || data.posterPath, 'w200', { isPoster: true })}
        effect='blur'
        onClick={
          useDebounce(() => onNavigate(`/watch/${type}/${data.id || data.mediaId}`), 3000)
        }
      />
      <BookmarkBtn
        data={data}
        mediaType={type}
        inCard={true}
      />
    </div>
  )
}

export default CardScroll
