import axios from 'axios';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const api_key = process.env.EXPO_PUBLIC_API_KEY;
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${api_key}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${api_key}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${api_key}`;

// dynamic endpoint
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${api_key}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${api_key}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${api_key}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${api_key}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${api_key}`;

const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${api_key}`;

// image
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// fallback image

export const fallbackMoviePoster =
  'https://mgmall.s3.amazonaws.com/img/062023/390bed03e54f6440416f0568f61a82b563176996.jpg';

export const fallbackPerson =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg';

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};

export const savedMovie = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
