import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Bruce Wayne'},
    {id: '1', name: 'Steve Rogers'},
    {id: '2', name: 'Tony Stark'},
]

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {} //* here state is static (there's no need to modify)
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;