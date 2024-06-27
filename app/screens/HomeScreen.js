import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../theme/index';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-stone-900'>
      {/* logo */}
      <SafeAreaView className='mt-2'>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <Ionicons name='menu' size={30} color='white' />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>Flix
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
          <TrendingMovies data={trending} />

          {/* Upcoming Row */}
          <MovieList title='Upcoming' data={upcoming} />

          {/* Top Rated Row */}
          <MovieList title='Top Rated' data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
