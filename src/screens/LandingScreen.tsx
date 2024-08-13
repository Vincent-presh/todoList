// screens/LandingScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Animated, {FadeIn} from 'react-native-reanimated';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

type Props = {
  navigation: LandingScreenNavigationProp;
};

export default function LandingScreen({navigation}: Props) {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Animated.Text
        entering={FadeIn.duration(800)}
        className="text-3xl text-white mb-5">
        Welcome to Trivia Game!
      </Animated.Text>
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg"
        onPress={() => navigation.navigate('Trivia')}>
        <Text className="text-white text-xl">Join Game</Text>
      </TouchableOpacity>
    </View>
  );
}
