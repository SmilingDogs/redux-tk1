import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// const initialState = [
//     {   id: '1', 
//         title: 'Learning Redux Toolkit',
//         content: 'I\'ve heard so many compliments to Redux Toolkit as a new way of managing application\'s global state',
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//      },
//     {   id: '2', 
//         title: 'Learning about Slices...', 
//         content: 'somethingSlice is a comfy way to separate different reducer logic in an application',
//         date: sub(new Date(), {minutes: 30}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {   id: '3', 
//         title: 'What is a Provider...', 
//         content: 'Provider is a special wrapper around components or whole App which provides the redux store functionality to those components wrapped bi it',
//         date: sub(new Date(), {minutes: 55}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
// ]
const initialState = {
    posts: [],
    status: 'idle', //* 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get(POSTS_URL)
    return data

})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data //* this is just a new post object
})
//* initialPosts is a body of new post
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
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
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
                //* state mutation here... it's possible only inside createSlice function
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                //Fix for API post IDs:
                //Creating sortedPosts & assigning the id 
                //would be not be needed if the fake API 
                //returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                //End fix for fake API post IDs 
                //todo modifyng new post data, adding userId, date and reactions
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                //todo action.payload here is an object of new added post
                state.posts.push(action.payload)
            })
    }
})

export const { postAdded, reactionAdded } = postsSlice.actions;

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectAllPosts = (state) => state.posts.posts; //* because now state is an object with reference state.posts(name: 'posts',) and it has key === posts => so state.posts.posts gets an []

export default postsSlice.reducer;