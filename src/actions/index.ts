export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: {id: number; text: string; description: string};
}

export interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: {id: number};
}

export type TodoActionTypes = AddTodoAction | RemoveTodoAction;

let nextTodoId = 0;

export const addTodo = (text: string, description: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: {
    id: nextTodoId++,
    text,
    description,
  },
});

export const removeTodo = (id: number): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: {id},
});
