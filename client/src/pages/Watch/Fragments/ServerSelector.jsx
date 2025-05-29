import React, { useState } from 'react'
import useStreamStore from '../../../store/StreamStore.js';

function ServerSelector() {
  const {setServer} = useStreamStore();

  const [selectedServerInd, setSelectedServerInd] = useState(0);  

  const servers = [
    {
      name: 'Server 1',
      domain: import.meta.env.VITE_APP_STREAM_SERVER1
    },
    {
      name: 'Server 2',
      domain: import.meta.env.VITE_APP_STREAM_SERVER2
    },
    {
      name: 'Server 3',
      domain: import.meta.env.VITE_APP_STREAM_SERVER3
    },
    {
      name: 'Server 4',
      domain: import.meta.env.VITE_APP_STREAM_SERVER4
    },
  ]

  const onSelectServer = (index) => {
    if (selectedServerInd === index) {
      return;
    }
    setSelectedServerInd(index);
    setServer(servers[index].domain);
  }

  return (
    <div className='flex flex-wrap px-5 py-2 justify-center items-center rounded-lg w-full gap-5 bg-[var(--charcoal)]'>
      {servers.map((server, ind) => (
        <div key={ind} className={`px-3 py-1 rounded-lg bg-[var(--dark-void)] text-white font-rockstar transition-all duration-200 ${selectedServerInd === ind ? 'selected-watch-item' : 'cursor-pointer hover:scale-110'}`}
        style={{ willChange: 'transform' }}
        onClick={() => onSelectServer(ind)}
        >
          {server.name}
        </div>
      ))}
    </div>
  )
}

export default ServerSelector
