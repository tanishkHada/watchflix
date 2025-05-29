import React, { useContext, useEffect, useRef } from 'react'
import apiExtras from '../../utils/ApiExtras'
import gsap from "gsap";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useGSAP } from '@gsap/react';
import NavigateContext from '../../contexts/NavigateContext';
import BookmarkBtn from '../Buttons/BookmarkBtn';
import useDebounce from '../../utils/Debounce';

function CardMotion({ data, myClassName, mediaType }) {
  const onNavigate = useContext(NavigateContext);

  const cardRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;

    gsap.set(card, { scale: 1 });

    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
    });

    return () => {
      card.removeEventListener("mouseenter", () => { });
      card.removeEventListener("mouseleave", () => { });
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${myClassName} absolute flex flex-shrink-0 justify-center items-center w-[140px] h-[200px] sm:w-[200px] sm:h-[300px] cursor-pointer`}
    >
      <LazyLoadImage
        className='w-full h-full rounded-lg'
        height='100%'
        width='100%'
        src={apiExtras.getImageUrl(data.poster_path, 'w200', { isPoster: true })}
        effect='blur'
        onClick={
          useDebounce(() => onNavigate(`/watch/${mediaType}/${data.id}`), 3000)
        }
      />
      <BookmarkBtn
        data={data}
        mediaType={mediaType}
        inCard={true}
      />
    </div>
  )
}

export default CardMotion
