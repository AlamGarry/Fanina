import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/loading';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function FavoriteScreen(title, data, id) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(load ? 1 : 0);
  const [savedMovies, setSavedMovies] = useState([]);
  var load;
  let movieName = 'Super Power Like Mushroom';

  useFocusEffect(
    useCallback(() => {
      const loadSavedMovies = async () => {
        try {
          const savedMovies = await AsyncStorage.getItem('savedMovies');
          const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
          setSavedMovies(savedMoviesArray);
          console.log('Pull saved movie from AsyncStorage');
        } catch (error) {
          console.log(error);
        }
      };
      loadSavedMovies();
    }, [navigation])
  );
  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem('savedMovies');
      setSavedMovies([]);
      console.log('Clear all saved movies');
    } catch (error) {
      console.log('Error clearing saved movies', error);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='bg-slate-600 flex-1'
    >
      <SafeAreaView className=' z-20 w-full flex-row justify-between items-center px-4 mt-2 my-3'>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className='rounded-xl p-1'
          >
            <Ionicons name='chevron-back' size={28} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className='flex-row items-center justify-between'>
        <Text className='text-white font-medium  left-5 '>Saved Movies</Text>
        <TouchableOpacity
          onPress={clearSavedMovies}
          className='bg-blue-800 py-2 px-4 rounded-lg right-4'
        >
          <Text className='font-bold text-lg text-white'>Clear</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : savedMovies.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className='space-y-2'
        >
          <Text className='text-white font-semibold ml-1'>
            Favorite {savedMovies.length}
          </Text>
          <View className='flex-row justify-between flex-wrap'>
            {savedMovies.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}
                >
                  <View className='space-y-2 mb-4'>
                    <Image
                      className='rounded-3xl'
                      //   source={require('../../assets/test.jpg')}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className='text-neutral-300 ml-1'>
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + '...'
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className='flex-row justify-center'>
          <Image
            source={require('../../assets/sedih.png')}
            className='h-96 w-96'
          />
        </View>
      )}
    </ScrollView>
  );
}
