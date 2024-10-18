
import React, { useEffect, useRef, useState } from "react";
import './TodoComponent.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, incrementVisitCount } from "../store/todoSlices"; // Adjust the import path

const TodoComponent = () => {
    const dispatch = useDispatch();
    const { listOfTodos, status, error, pageVisitCount } = useSelector((state) => state.todos);

    const isFirstMount = useRef(true);
    const [page, setPage] = useState(1);
    const limit = 3;
    const [newTodoText, setNewTodoText] = useState("");



    useEffect(() => {
        dispatch(fetchTodos({ page, limit }));
        if (!isFirstMount.current) {
            dispatch(incrementVisitCount());
        }
        isFirstMount.current = false;
    }, [dispatch, page]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodoText.trim() !== "") {
            dispatch(addTodo({ todoText: newTodoText }));
            setNewTodoText("");
        } else {
            alert("Todo text cannot be empty");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <h2> Todos (Page Visit Count: {pageVisitCount})</h2>
            npm run build.
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {listOfTodos.map(todo => (
                    <li key={todo.id}>
                        {todo.todo} - {todo.completed ? 'Completed' : 'Pending'}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button type="submit">Add Todo</button>
            </form>

            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} </span>
                <button onClick={() => handlePageChange(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TodoComponent;
