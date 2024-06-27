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
} from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log('itemid: ', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log('got movie details: ', data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    console.log('got credits: ', data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log('got similar movies: ', data);
    if (data && data.results) setSimilarMovies(data.results);
  };

  let movieName = 'Super Power Like Mushroom';

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
          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
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
          <View>
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
              className='absolute bottom-0'
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
      <Cast navigation={navigation} cast={cast} />

      {/* Similar Movies */}
      <MovieList
        title='Similar Movies'
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
