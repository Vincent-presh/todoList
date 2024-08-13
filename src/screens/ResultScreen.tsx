// screens/ResultScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import Animated, {BounceIn} from 'react-native-reanimated';

type ResultScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Result'
>;

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
};

export default function ResultScreen({navigation, route}: Props) {
  const {score} = route.params;

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Animated.Text entering={BounceIn} className="text-3xl text-white mb-5">
        Your Score: {score}
      </Animated.Text>
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg"
        onPress={() => navigation.navigate('Landing')}>
        <Text className="text-white text-xl">Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}
