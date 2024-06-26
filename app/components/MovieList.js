import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { styles } from '../theme/index';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, data }) {
  let movieName = 'Super Power Like Mushroom';
  const navigation = useNavigation();
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className='text-lg'>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', item)}
            >
              <View className='space-y-1 mr-4'>
                <Image
                  source={require('../../assets/test.jpg')}
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  className='rounded-3xl'
                />
                <Text className='text-neutral-300 ml-1'>
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + '...'
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}