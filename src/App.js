import React, { useState, useReducer } from 'react'
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useRef, useCallback } from 'react';

function createBulkTodos() {
  const array = [];
  for (let i =1 ; i <= 2500 ; i++ ) {
    array.push({
      id: i,
      text :`할일 ${i}`,
      checked : false
    })
  }
  return array;
}

function todoReducer(todos, action) {
  switch(action.type) {
    case 'INSERT' :
      return todos.concat(action.todo);
    case 'REMOVE' :
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' :
      return todos.map(todo => todo.id === action.id ? {...todo, checked : !todo.checked} : todo,);
    default :
      return todos;
  }
}

const App = () => {

 const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos) ;

  const nextId = useRef(4);

  // const onInsert = useCallback(
  //   (text) => {
  //     const todo = {
  //       id : nextId.current,
  //       text,
  //       checked : false,
  //     }
  //     setTodos(todos.concat(todo));
  //     nextId.current +=1;
  //   },
  //   [todos],
  // );

  const onInsert = useCallback(text => {
    const todo = {
      id : nextId.current,
      text,
      checked : false,
    };
    dispatch({ type : 'INSERT', todo});
    nextId.current += 1;
  }, []);

  // const onRemove = useCallback(
  //   (id) => {
  //     setTodos(todos.filter(todo => todo.id !== id));
  //   },
  //   [todos],
  // )

  const onRemove = useCallback(id => {
    dispatch({type : 'REMOVE', id});
  }, []);

  // const onToggle = useCallback(
  //   (id) => {
  //     setTodos(
  //       todos.map(todo => 
  //         todo.id === id ? {...todo, checked: !todo.checked} : todo,
  //       ),
  //     );
  //   },
  //   [todos],
  // )

  const onToggle = useCallback(id => {
    dispatch({type : 'TOGGLE', id});
  }, []);

  
  return(
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>
    </TodoTemplate>
  )
}

export default App;
