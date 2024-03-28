import axios from 'axios'
import {setAlert} from './alert'
import {
    DELETE_POST, 
    GET_POSTS, 
    POST_ERROR, 
    UPDATE_LIKES,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT  
} from './types'

// Get Posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Add like
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Remove like
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(
            setAlert('Post Removed', 'success')
        )

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Post as admin
export const deletePostAsAdmin = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/admin/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(
            setAlert('Post Removed', 'success')
        )

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Add Post
export const addPost = (formData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/posts',formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(
            setAlert('Post Added', 'success')
        )

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get Post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/posts/comment/${postId}`,formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(
            setAlert('Comment Added', 'success')
        )

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {

        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: res.data
        })
        dispatch(
            setAlert('Comment Deleted', 'success')
        )

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Mark post as spam
export const markPostSpam = (id) => async dispatch => {
    try {
        const res = await axios.post(`/api/spam/post/${id}`)
        dispatch(setAlert('Post has been Reported', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Remove post from spam
export const removeFromSpamPosts = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/spam/post/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: res.data
        })
        dispatch(setAlert('Post removed from reported posts!','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get spam posts
export const getSpamPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/spam/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}