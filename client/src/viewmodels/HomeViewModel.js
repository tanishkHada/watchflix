import { useState, useEffect } from "react";
import dataService from "../shared/DataService.js";
import enrichWithBookmarks from "../utils/enrichWithBookmarks.js";

const useHomeViewModel = () => {
    const [mvNowPlaying, setMvNowPlaying] = useState(null);
    const [mvPopular, setMvPopular] = useState(null);
    const [mvTopRated, setMvTopRated] = useState(null);
    const [tvPopular, setTvPopular] = useState(null);
    const [tvTopRated, setTvTopRated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (!dataService.genreMap) {
                    await dataService.getGenres();
                }

                const data = await dataService.preFetchData();

                const mvNowPlaying = await enrichWithBookmarks(data.mv_now_playing);
                const mvPopular = await enrichWithBookmarks(data.mv_popular);
                const mvTopRated = await enrichWithBookmarks(data.mv_top_rated);
                const tvPopular = await enrichWithBookmarks(data.tv_popular);
                const tvTopRated = await enrichWithBookmarks(data.tv_top_rated);


                setMvNowPlaying(mvNowPlaying);
                setMvPopular(mvPopular);
                setMvTopRated(mvTopRated);
                setTvPopular(tvPopular);
                setTvTopRated(tvTopRated);
                
            } catch (err) {
                console.log(err)
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        mvNowPlaying,
        mvPopular,
        mvTopRated,
        tvPopular,
        tvTopRated,
        loading,
        error,
    };
};

export default useHomeViewModel;
