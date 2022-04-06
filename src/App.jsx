import React, { Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import 'tachyons';


const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea 1", completed: false },
    ]);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;

        setTodos((prevToDos) => {
            return [...prevToDos, { id: uuidv4(), task, completed: false }];
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return (
        <Fragment>
          <div className="container">
            <div id="heading">
              <h1 className="pa2 avenir">Lista de tareas <i class="fi fi-rr-edit"></i></h1>
            </div>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <button className="ma2" onClick={handleTodoAdd}><i class="fi fi-rr-add"></i></button>
            <button className="" onClick={handleClearAll} ><i class="fi fi-rr-trash"></i></button>
            <div className="tasksLeft">
                Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
            </div>
          </div>
          <footer>
            <p>Copyright 2022 Alberto Rodríguez.</p>
          </footer>  
        </Fragment>
    );
} 