import { useState, useEffect, useContext } from "react";
import dataService from "../shared/DataService.js";
import enrichWithBookmarks from "../utils/enrichWithBookmarks.js";
import NavigateContext from "../contexts/NavigateContext.js";

const useWatchViewModel = (mediaType, mediaId) => {
    const onNavigate = useContext(NavigateContext);

    const [movieData, setMovieData] = useState(null);

    const [tvData, setTvData] = useState(null);
    const [seasonsData, setSeasonsData] = useState([]);

    const [castData, setCastData] = useState([]);

    const [similarMediaData, setSimilarMediaData] = useState(null);
    const [recommendMediaData, setrecommendMediaData] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);    
                let enrichedData;
                
                if(!dataService.genreMap){
                    await dataService.getGenres();
                }

                if(mediaType === 'movie'){
                    const mv_data = await dataService.getMediaDetails(mediaType, mediaId);
                    enrichedData = await enrichWithBookmarks([mv_data]);
                    setMovieData(enrichedData[0]);
                }else{
                    const tv_data = await dataService.getMediaDetails(mediaType, mediaId);

                    const totalSeasons = tv_data.number_of_seasons;
                    
                    const seasons_data = [];
                    for(let i = 1 ; i <= totalSeasons ; i++){
                        const seasonDetail = await dataService.getSeasonDetails(mediaId, i);

                        seasons_data.push(seasonDetail);
                    }

                    enrichedData = await enrichWithBookmarks([tv_data]);

                    setTvData(enrichedData[0]);
                    setSeasonsData(seasons_data);
                }               

                const cast_data = await dataService.getCastDetails(mediaType, mediaId);
                setCastData(cast_data);

                const similar_data = await dataService.getSimilarMediaData(mediaType, mediaId);

                const similarEnrichedData = await enrichWithBookmarks(similar_data);
                setSimilarMediaData(similarEnrichedData);

                const recs_data = await dataService.getRecommendationsMediaData(mediaType, mediaId);

                const recsEnrichedData = await enrichWithBookmarks(recs_data);

                setrecommendMediaData(recsEnrichedData);

            } catch (err) {
                console.log(err)
                setError(err);
                setLoading(false);
                onNavigate('/404');

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        movieData,
        tvData,
        seasonsData,
        castData,
        similarMediaData,
        recommendMediaData,
        loading,
        error,
    };
};

export default useWatchViewModel;
