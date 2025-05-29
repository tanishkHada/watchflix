import React from 'react'
import useStreamStore from '../../../store/StreamStore.js'

function Player({ mediaType, mediaId }) {

  const { season, episode, server } = useStreamStore();

  const streamUrl =
    mediaType === 'tv'
      ? `https://${server}/embed/tv?tmdb=${mediaId}&season=${season}&episode=${episode}`
      : `https://${server}/embed/movie?tmdb=${mediaId}`;

  return (
    <div className='relative w-full h-full flex justify-center items-center rounded-lg bg-[var(--lime-green)] p-2'>

      <iframe
        src={streamUrl}
        className='h-full w-full rounded-lg bg-[var(--charcoal)]'
        allow='fullscreen'
        referrerPolicy='origin'
       />

    </div>
  )
}

export default Player
