import {ADD_TODO, REMOVE_TODO, TodoActionTypes} from '../actions';

interface Todo {
  id: number;
  text: string;
  description: string;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosReducer = (
  state = initialState,
  action: TodoActionTypes,
): TodosState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default todosReducer;
