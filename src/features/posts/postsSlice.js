import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub } from 'date-fns';

const initialState = [
    {   id: '1', 
        title: 'Learning Redux Toolkit',
        content: 'I\'ve heard so many compliments to Redux Toolkit as a new way of managing application\'s global state',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
     },
    {   id: '2', 
        title: 'Learning about Slices...', 
        content: 'somethingSlice is a comfy way to separate different reducer logic in an application',
        date: sub(new Date(), {minutes: 30}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {   id: '3', 
        title: 'What is a Provider...', 
        content: 'Provider is a special wrapper around components or whole App which provides the redux store functionality to those components wrapped bi it',
        date: sub(new Date(), {minutes: 55}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
]
    

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded:{
            reducer (state, action) {
                state.push(action.payload)
            },
            prepare (title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    } //* prepare function returns action object (with payload already set)
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
                //* state mutation here... it's possible only inside createSlice function
            }
        }
    }
})

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

export default postsSlice.reducer;