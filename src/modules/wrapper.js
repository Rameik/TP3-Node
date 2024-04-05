import axios from "axios";
const APIKEY = "7b62fa5d"; // Poné tu APIKEY, esta no funciona.


const OMDBSearchByPage = async (searchText, page = 1) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString);

    let returnObject = {
        respuesta : apiResponse.data.Response === 'True' ? true : false,
        cantidadTotal : apiResponse.data.totalResults,
        datos : apiResponse.data.Search
    };

    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
    const apiResponse = await axios.get(requestString);

    let returnObject = {
        respuesta : apiResponse.data.Response === 'True' ? true : false,
        cantidadTotal : apiResponse.data.totalResults,
        datos : apiResponse.data.Search
    };

    return returnObject;

};

const OMDBGetByImdbID = async (imdbID) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const apiResponse = await axios.get(requestString);

    let returnObject = {
        respuesta : apiResponse.data.Response === 'True' ? true : false,
        cantidadTotal : 1,
        datos : apiResponse.data
    };

    return returnObject;
};


export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};