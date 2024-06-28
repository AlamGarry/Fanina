import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
  savedMovie,
} from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function MovieScreen(rout) {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [main, setMain] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(load ? 1 : 0);
  const [isFavorite, toggleFavorite] = useState(false);
  var load;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log('itemid: ', item.id);
    setLoading(1);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
    // getFavorite(item.id);
  }, [item]);

  // const getFavorite = async (id) => {
  //   const data = await fetchMovieCredits(id);
  //   console.log('got movie details: ', data);
  //   // if (data) setMain(data);
  //   // setLoading(0);
  // };

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log('got movie details: ', data);
    if (data) setMovie(data);
    setLoading(0);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log('got credits: ', data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log('got similar movies: ', data);
    if (data && data.results) setSimilarMovies(data.results);
  };

  // function buat tambahin movie ke saved movie

  const toggleFavoriteandSave = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem('savedMovies');
      let savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
      console.log('check movie save');

      const isMovieSaved = savedMoviesArray.some(
        (savedMovie) => savedMovie.id === item.id
      );
      console.log('Check if movie save in saved list');

      if (!isMovieSaved) {
        // If movie is not saved, add it to the saved list
        savedMoviesArray.push(movie);
        await AsyncStorage.setItem(
          'savedMovies',
          JSON.stringify(savedMoviesArray)
        );
        toggleFavorite(true);
        console.log('Movie is added to the list of saved movies');
      } else {
        // If movie is already saved, remove it from the list
        const updatedSavedMoviesArray = savedMoviesArray.filter(
          (savedMovie) => savedMovie.id !== item.id
        );
        await AsyncStorage.setItem(
          'savedMovies',
          JSON.stringify(updatedSavedMoviesArray)
        );
        toggleFavorite(false);
        console.log('Movie is removed from the list of saved movies');
      }
    } catch (error) {
      console.log('Error Saving Movie', error);
    }
  };
  useEffect(() => {
    // Load savd movies from AsyncStorage when the component mounts
    const loadSavedMovies = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem('savedMovies');
        const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

        // Check if the movie is already in the saved list
        const isMovieSaved = savedMoviesArray.some(
          (savedMovie) => savedMovie.id === item.id
        );

        toggleFavorite(isMovieSaved);
        console.log('Check if the current movie is in the saved list');
      } catch (error) {
        console.log('Error Loading Saved Movies', error);
      }
    };

    loadSavedMovies();
  }, [item.id]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'
    >
      {/* Header */}
      <View className='w-full '>
        {/* back button and favorite */}
        <SafeAreaView className='absolute z-20 w-full flex-row justify-between items-center px-4 mt-2'>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className='rounded-xl p-1'
          >
            <Ionicons name='chevron-back' size={28} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleFavoriteandSave();
            }}
          >
            <Ionicons
              name='heart'
              size={35}
              color={isFavorite ? theme.favorite : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View className='flex-1'>
            <Image
              //   source={require('../../assets/test.jpg')}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className='absolute -bottom-1'
            />
          </View>
        )}

        {/* Movie Details */}
        <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
          {/* title */}
          <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            {movie?.title}
          </Text>
          {/* status, release, runtime */}
          {movie?.id ? (
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              {movie?.status} • {movie?.release_date?.split('-')[0]} •{' '}
              {movie?.runtime} min
            </Text>
          ) : null}

          {/* genres */}
          <View className='flex-row justify-center mx-4 space-x-2'>
            {movie?.genres?.map((genre, index) => {
              const showDot = index + 1 != movie.genres.length;
              return (
                <Text
                  key={index}
                  className='text-neutral-400 text-center font-semibold text-base'
                >
                  {genre?.name} {showDot ? '•' : null}
                </Text>
              );
            })}
            {/* <Text className='text-neutral-400 text-center font-semibold text-base'>
              Action
            </Text>
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              Adventure
            </Text>
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              Thriller
            </Text> */}
          </View>
          {/* description */}
        </View>
        <Text className='text-neutral-400 mx-4 tracking-wide'>
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title='Similar Movies'
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
