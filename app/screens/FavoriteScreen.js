import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../components/loading';

const { width, height } = Dimensions.get('window');

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(load ? 1 : 0);
  const [favorites, setFavorites] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  var load;
  let movieName = 'Super Power Like Mushroom';
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='bg-neutral-800 flex-1'
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
      {loading ? (
        <Loading />
      ) : favorites.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className='space-y-2'
        >
          <Text className='text-white font-semibold ml-1'>
            Favorite {favorites.length}
          </Text>
          <View className='flex-row justify-between flex-wrap'>
            {favorites.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', item)}
                >
                  <View className='space-y-2 mb-4'>
                    <Image
                      className='rounded-3xl'
                      source={require('../../assets/test.jpg')}
                      //   source={{
                      //     uri: image185(item?.poster_path) || fallbackMoviePoster,
                      //   }}
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
