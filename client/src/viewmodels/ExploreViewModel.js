import { useState, useEffect } from "react";
import dataService from "../shared/DataService.js";
import enrichWithBookmarks from "../utils/enrichWithBookmarks.js";

const useExploreViewModel = () => {
    const [results, setResults] = useState([]);

    const [initialLoading, setInitialLoading] = useState(true);
    const [newLoading, setNewLoading] = useState(false);
    const [nextPageLoading, setNextPageLoading] = useState(false);    

    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const [movieGenreList, setMovieGenreList] = useState([]);
    const [tvGenreList, setTvGenreList] = useState([]);

    const [abortController, setAbortController] = useState(null);

    const [exploreParams, setExploreParams] = useState({
        searchQuery: "",
        genreFilters: [],
        mediaType: "",
        pageNum: 1
    });

    const [noResultsFound, setNoResultsFound] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);

    const fetchSearchResults = async (searchQuery, pageNum, signal) => {
        try {
            const data = await dataService.getSearchList(searchQuery, pageNum, signal);
            return data;
        } catch (error) {
            throw error;            
        }
    }

    const fetchGenreFiltersResults = async (mediaType, genreFilters, pageNum, signal) => {
        try {
            const data = await dataService.getGenreFiltersList(mediaType, genreFilters, pageNum, signal);
            return data;
        } catch (error) {
            throw error;            
        }
    }

    const fetchResults = async () => {
        const {
            searchQuery,
            genreFilters,
            mediaType,
            pageNum
        } = exploreParams;

        if(abortController){
            abortController.abort();
        }

        const controller = new AbortController();
        setAbortController(controller);

        try {
            if(pageNum === 1){
                setNewLoading(true);
            }else{
                setNextPageLoading(true);
            }

            let data;

            if(searchQuery){
                data = await fetchSearchResults(searchQuery, pageNum, controller.signal);
            }else if(genreFilters.length > 0){
                data = await fetchGenreFiltersResults(mediaType, genreFilters, pageNum, controller.signal);
            }else{
                return;
            }

            const enrichedData = await enrichWithBookmarks(data);

            if(pageNum === 1){
                if(data.length === 0){
                    setNoResultsFound(true);
                }else{
                    setNoResultsFound(false);
                }
                setNoMoreData(false);
                setResults(enrichedData);
            }else{
                if(data.length === 0){
                    setNoMoreData(true);
                }else{
                    setNoMoreData(false);
                }
                setResults((prevResults) => ([...prevResults, ...enrichedData]))
            }

        } catch (err) {
            console.log(err);            
        } finally{
            setAbortController((prevController) => 
                prevController === controller ? null : prevController);
            setNewLoading(false);
            setNextPageLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [exploreParams]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                setInitialLoading(true);
                
                if(!dataService.genreMap){
                    await dataService.getGenres();
                }

                const data = await dataService.getMediaData('movie', 'upcoming');
                const enrichedData = await enrichWithBookmarks(data);

                setMovieGenreList(dataService.movieGenreList);
                setTvGenreList(dataService.tvGenreList);
                setUpcomingMovies(enrichedData);
            } catch (err) {
                console.log(err)
            } finally {
                setInitialLoading(false);
            }
        };

        fetchUpcoming();
    }, []);

    return {
        exploreParams,
        setExploreParams,
        noResultsFound,
        noMoreData,
        results,
        initialLoading,
        newLoading,
        nextPageLoading,
        fetchResults,
        movieGenreList,
        tvGenreList,
        upcomingMovies
    };
};

export default useExploreViewModel;
