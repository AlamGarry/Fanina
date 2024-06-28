import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../theme/index';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(load ? 1 : 0);
  var load;
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('got trending movies: ', data);
    if (data && data.results) setTrending(data.results);
    setLoading(0);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('got trending movies: ', data);
    if (data && data.results) setUpcoming(data.results);
    setLoading(0);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('got trending movies: ', data);
    if (data && data.results) setTopRated(data.results);
    setLoading(0);
  };

  return (
    <View className='flex-1 bg-stone-900'>
      {/* logo */}
      <SafeAreaView className='mt-2'>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
            <Ionicons name='heart' size={30} color='white' />
          </TouchableOpacity>

          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>MFlix</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name='search-outline' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming Row */}
          <MovieList title='Upcoming' data={upcoming} />

          {/* Top Rated Row */}
          <MovieList title='Top Rated' data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
