import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function Cast({ cast, navigation }) {
  const personName = 'Keanu Reeves';
  const characterName = 'John Wick';
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className='mr-4 items-center'
                onPress={() => navigation.navigate('Person', person)}
              >
                {/* image */}
                <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                  <Image
                    source={require('../../assets/test.jpg')}
                    style={{ width: 100, height: 150 }}
                    className='rounded-2xl h-24 w-20'
                  />
                </View>

                {/* name character */}
                <Text className='text-white text-xs mt-1'>
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + '...'
                    : characterName}
                </Text>
                {/* name person */}
                <Text className='text-neutral-400 text-xs mt-1'>
                  {personName.length > 10
                    ? personName.slice(0, 10) + '...'
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
