import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, removeTodo} from '../actions';
import {RootState} from '../reducers';

const TodoApp: React.FC = () => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  console.log('🚀 ~ file: TodoApp.tsx:22 ~ todos:', todos);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text, description));
      setText('');
      setDescription('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="border-b border-gray-300 p-4">
        <Text className="text-gray-600 text-xl text-center ">Todo List</Text>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleExpand(item.id)}>
            <View className="flex-row justify-between items-center py-3 px-5 border-b h-12 border-gray-300">
              <Text className="text-lg">{item.text}</Text>
              <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
                <Text className="text-red-500">Remove</Text>
              </TouchableOpacity>
            </View>
            {expandedTaskId === item.id && (
              <Animated.View className="py-2 px-5 bg-gray-200">
                <Text className="text-sm text-gray-700">
                  {item?.description}
                </Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingBottom: 120}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="absolute bottom-0 left-0 right-0 bg-gray-100">
        <View className="bg-white px-4 pb-6 pt-4 rounded-lg shadow-md">
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-4 h-14"
            placeholder="Add a new todo"
            value={text}
            onChangeText={setText}
          />
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-4 h-14"
            placeholder="Add a description"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            onPress={handleAddTodo}
            className="bg-primary p-2 rounded-full items-center h-14 flex flex-row items-center justify-center">
            <Text className="text-white text-lg">Add Todo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodoApp;
