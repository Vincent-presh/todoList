import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import axios from 'axios';
import Animated, {
  SlideInLeft,
  SlideOutRight,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

type TriviaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Trivia'
>;

type Props = {
  navigation: TriviaScreenNavigationProp;
};

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export default function TriviaScreen({navigation}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(10);

  // Shake animation
  const shakeAnim = useSharedValue(0);

  useEffect(() => {
    axios
      .get(
        'https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple&encode=url3986',
      )
      .then(response => {
        const formattedQuestions = response.data.results.map((q: Question) => ({
          ...q,
          question: decodeURIComponent(q.question),
          correct_answer: decodeURIComponent(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(ans =>
            decodeURIComponent(ans),
          ),
        }));
        setQuestions(formattedQuestions);
      });
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(prevScore => prevScore + 1);
    } else {
      shakeAnim.value = withSpring(10, {damping: 2, stiffness: 2000}, () => {
        shakeAnim.value = withSpring(0); // Reset the shake animation
      });
    }
  };

  const handleNextQuestion = () => {
    setTimer(10);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      navigation.navigate('Result', {score});
    }
  };

  const getButtonStyle = (answer: string) => {
    if (!selectedAnswer) {
      return 'bg-gray-400';
    }

    if (answer === questions[currentQuestion].correct_answer) {
      return 'bg-green-500';
    }

    if (answer === selectedAnswer) {
      return 'bg-red-500';
    }

    return 'bg-gray-400';
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: shakeAnim.value}],
    };
  });

  if (!questions.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-blue-500 p-4">
      <Animated.View
        entering={SlideInLeft}
        exiting={SlideOutRight}
        className="w-full">
        <Text className="text-2xl text-white mb-4">
          {questions[currentQuestion].question}
        </Text>
        <View className="mb-4">
          {questions[currentQuestion].incorrect_answers
            .concat(questions[currentQuestion].correct_answer)
            .sort()
            .map((answer, index) => (
              <Animated.View
                key={index}
                style={answer === selectedAnswer ? animatedStyle : undefined}>
                <TouchableOpacity
                  className={`p-4 mb-2 rounded-lg ${getButtonStyle(answer)}`}
                  onPress={() =>
                    !selectedAnswer && handleAnswerSelection(answer)
                  }
                  disabled={!!selectedAnswer}>
                  <Text className="text-lg text-white">{answer}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
        </View>
        <Text className="text-lg text-white">Time left: {timer} seconds</Text>
      </Animated.View>
    </View>
  );
}
