import dataService from "../shared/DataService";
import Avatar from '../assets/images/avatar.jpg'
import PosterNotFound from '../assets/images/posterNotFound.png'
import ImageNotFound from '../assets/images/imageNotFound.png'

const getImageUrl = (path, size = 'w1280', {isCast = false, isImage = false, isPoster = false} = {}) => {
    if(!path){
        if(isCast) return Avatar;
        if(isPoster) return PosterNotFound;
        if(isImage) return ImageNotFound;
    }    
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

const getGenre = (id) => {
    return dataService.genreMap.get(id);
}

const getFormattedVote = (vote) => {
    const num = parseFloat(vote); 
    return Number.isInteger(num) ? `${num}.0` : num.toFixed(1);
}

const getFormattedRuntime = (runtime) => {
    const hrs = Math.floor(runtime / 60);
    const mins = runtime % 60;
    
    if(hrs === 0) return `${mins}min`;
    else if(mins === 0) return `${hrs}h`;
    return `${hrs}h ${mins}min`;
}

const apiExtras = {
    getImageUrl,
    getGenre,
    getFormattedVote,
    getFormattedRuntime
}

export default apiExtras;