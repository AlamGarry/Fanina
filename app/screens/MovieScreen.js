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

const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [item]);
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
              source={require('../../assets/test.jpg')}
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
            {movieName}
          </Text>
          {/* status, release, runtime */}
          <Text className='text-neutral-400 text-center font-semibold text-base'>
            Release 2020 170 min
          </Text>
          {/* genres */}
          <View className='flex-row justify-center mx-4 space-x-2'>
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              Action
            </Text>
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              Adventure
            </Text>
            <Text className='text-neutral-400 text-center font-semibold text-base'>
              Thriller
            </Text>
          </View>
          {/* description */}
        </View>
        <Text className='text-neutral-400 mx-4 tracking-wide'>
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
        </Text>

        {/* cast */}
        <Cast navigation={navigation} cast={cast} />

        {/* Similar Movies */}
        <MovieList
          title='Similar Movies'
          hideSeeAll={true}
          data={similarMovies}
        />
      </View>
    </ScrollView>
  );
}
