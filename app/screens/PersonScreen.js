import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';

const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const [isFavorite, toggleFavorite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  return (
    // header
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView className=' z-20 w-full flex-row justify-between items-center px-4 mt-2 my-3'>
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

      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className='flex-row justify-center'
            style={{
              shadowColor: 'gray',
              elevation: 1,
            }}
          >
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
              <Image
                source={require('../../assets/test.jpg')}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          {/* name actor */}
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              Keanu Reeves
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
              London, United Kingdom
            </Text>
          </View>
          {/* border gender Birthday Known for Popularity */}
          <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
            <View className='border-r-2 borderr-neutral-400 px-2 items-center'>
              <Text className='font-semibold text-white'>Gender</Text>
              <Text className='text-sm text-neutral-300'>Male</Text>
            </View>
            <View className='border-r-2 borderr-neutral-400 px-2 items-center'>
              <Text className='font-semibold text-white'>Birthday</Text>
              <Text className='text-sm text-neutral-300'>1964-09-02</Text>
            </View>
            <View className='border-r-2 borderr-neutral-400 px-2 items-center'>
              <Text className='font-semibold text-white'>Known for</Text>
              <Text className='text-sm text-neutral-300'>Acting</Text>
            </View>
            <View className=' px-2 items-center'>
              <Text className='font-semibold text-white'>Popularity</Text>
              <Text className='text-sm text-neutral-300'>64.23</Text>
            </View>
          </View>
          {/* Biography */}
          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-lg'>Biography</Text>
            <Text className='text-neutral-400 tracking-wide'>
              Keanu Charles Reeves (/ˈriːvər/; born September 2, 1964) is an
              American actor, producer, director, and screenwriter. A member of
              the New Zealand theatre family, he is known for his roles in the
              Australian theatre family, the Australian theatre family.
            </Text>
          </View>

          {/* movies */}
          <MovieList title={'Movies'} data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
