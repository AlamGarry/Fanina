import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel-new';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className='mb-8 mt-2'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.6}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require('../../assets/test.jpg')}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
