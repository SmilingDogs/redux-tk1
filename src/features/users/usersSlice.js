import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = []
// {id: '0', name: 'Bruce Wayne'},
// {id: '1', name: 'Steve Rogers'},
// {id: '2', name: 'Tony Stark'},

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}, //* here state is static (there's no need to modify)
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }

})

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)

export default usersSlice.reducer;