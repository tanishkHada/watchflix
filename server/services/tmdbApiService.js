import axios from "axios";
import dotenv from 'dotenv';
import https from 'https';
dotenv.config();

const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    accept: "application/json",
};

// const api = axios.create({
//     baseURL: process.env.BASE_URL,
//     headers: headers
// });

const api = axios.create({
  baseURL: process.env.BASE_URL,
  httpsAgent: new https.Agent({ keepAlive: true }), 
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'watchflix'
  }
});

const getMediaData = async (mediaType, category) => {
    try {
        const res = await api.get(`/${mediaType}/${category}`);
        return res.data.results;
    } catch (error) {
        throw error;
    }
}

const getGenreList = async (mediaType) => {
    try {
        const res = await api.get(`/genre/${mediaType}/list`);
        return res.data.genres;
    } catch (error) {
        throw error;
    }
}

const getMediaDetails = async (mediaType, mediaId) => {
    try {
        const res = await api.get(`/${mediaType}/${mediaId}`);
        return res.data;
    } catch (error) {
        throw error;        
    }
}

const getSeasonDetails = async (series_id, season_number) => {
    try {
        const res = await api.get(`/tv/${series_id}/season/${season_number}`);
        return res.data;
    } catch (error) {
        throw error;        
    }
}

const getCastDetails = async (mediaType, mediaId) => {
    try {
        const res = await api.get(`/${mediaType}/${mediaId}/credits`);
        return res.data.cast;
    } catch (error) {
        throw error;
    }
}

const getSimilarMediaData = async(mediaType, mediaId) => {
    try{
        const res = await api.get(`/${mediaType}/${mediaId}/similar`);
        return res.data;
    }catch(error){
        throw error;
    }
}

const getRecommendationsMediaData = async(mediaType, mediaId) => {
    try{
        const res = await api.get(`/${mediaType}/${mediaId}/recommendations`);
        return res.data;
    }catch(error){
        throw error;
    }
}

const getSearchList = async (query, page) => {
    try {
        const res = await api.get(`/search/multi?query=${query}&page=${page}`);
        return res.data.results;
    } catch (error) {
        throw error;        
    }
}

const getDiscoverList = async(mediaType, genreFilters, page) => {
    try {
        const res = await api.get(`/discover/${mediaType}?with_genres=${genreFilters}&page=${page}`);
        return res.data.results;
    } catch (error) {
        throw error;        
    }
}

const tmdbApiService = {
    getMediaData,
    getGenreList,
    getMediaDetails,
    getSeasonDetails,
    getCastDetails,
    getSimilarMediaData,
    getRecommendationsMediaData,
    getSearchList,
    getDiscoverList
}

export default tmdbApiService;
