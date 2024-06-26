import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../theme/index';
import TrendingMovies from '../components/TrendingMovies';

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  return (
    <View className='flex-1 bg-stone-900'>
      {/* logo */}
      <SafeAreaView>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <Ionicons name='menu' size={30} color='white' />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>oviesj
          </Text>
          <TouchableOpacity>
            <Ionicons name='search-outline' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies data={trending} />
      </ScrollView>
    </View>
  );
}
