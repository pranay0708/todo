
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../axios/axios"

export const fetchTodos = createAsyncThunk("fetchToDos", async ({ page, limit }) => {
    const cancelPage = (page - 1) * 10
    const resposne = await axiosInstance.get(`/todos?limit=${limit}&skip=${cancelPage}`)
    return resposne.data.todos
})


// export const userTodosFetch = createAsyncThunk(
//     'userFetchTodos',
//     async () => {
//         const response = await axiosInstance.get(`/users/5/todos`);
//         return response.data.todos;
//     }
// );


export const addTodo = createAsyncThunk(
    'addTodo',
    async ({ todoText }) => {
        const response = await axiosInstance.post(`/todos/add`, {
            todo: todoText,
            completed: false,
            userId: 5,
        });
        return response.data;
    }
);


const initialState = {
    listOfTodos: [],
    status: 'idle',
    error: null,
    pageVisitCount: parseInt(localStorage.getItem('visitCount')) || 1,
}


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        incrementVisitCount: (state) => {
            state.pageVisitCount += 1;
            localStorage.setItem('visitCount', state.visitCount);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listOfTodos = action.payload;
            })

            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.listOfTodos.push(action.payload);
            });
    }
}
)

export default todoSlice.reducer


export const { incrementVisitCount } = todoSlice.actions