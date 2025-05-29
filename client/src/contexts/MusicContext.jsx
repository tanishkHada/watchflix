import { createContext, useState, useContext, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef(null);
    const FADE_DURATION = 1000;

    const toggleAudio = () => {
        setIsAudioPlaying(prev => !prev);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        let interval;
        const step = 0.05;

        if (isAudioPlaying) {
            audio.volume = 0;
            audio.play();
            interval = setInterval(() => {
                if (audio.volume < 1) {
                    audio.volume = Math.min(audio.volume + step, 1);
                } else {
                    clearInterval(interval);
                }
            }, FADE_DURATION * step);
        } else {
            interval = setInterval(() => {
                if (audio.volume > 0) {
                    audio.volume = Math.max(audio.volume - step, 0);
                } else {
                    audio.pause();
                    clearInterval(interval);
                }
            }, FADE_DURATION * step);
        }

        return () => clearInterval(interval);
    }, [isAudioPlaying]);

    return (
        <MusicContext.Provider value={{ isAudioPlaying, toggleAudio }}>
            {children}
            <audio
                ref={audioRef}
                className='hidden'
                src="/audio/music.mp3"
                loop
            />
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);