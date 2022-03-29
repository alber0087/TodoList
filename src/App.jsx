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
            <h1 className="fl w-100 pa2 avenir ba br3">Lista de tareas</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <button className="btn ma2" onClick={handleTodoAdd}>add</button>
            <button className="btn" onClick={handleClearAll} >remove</button>
            <div className="">
                Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
            </div>
        </Fragment>
    );
} 