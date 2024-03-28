import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {Spinner} from '../layout/Spinner'
import PostItem from './PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import {connect} from 'react-redux'
import { getPost } from '../../actions/post'

const Post = ({getPost, isAdminAuthenticated, post:{loading, post}}) => {
    const {id} = useParams()
    useEffect(() => {
        getPost(id)
    },[getPost])

    const navigate = useNavigate()
  return (
    loading || post === null ? <Spinner /> : <div className='container'>
        <div className='ml-10'>
            <div className='flex justify-between mb-6'>
                <button onClick={() => navigate(-1)} className='btn btn-light' ><i className="fa fa-chevron-left " aria-hidden="true"></i> Back</button>
                {!isAdminAuthenticated && <button className="btn btn-light"> Report</button>}
                
            </div>
            <PostItem post={post} showActions={false} /> 
            {!isAdminAuthenticated && <CommentForm postId={post._id} />}        
            {!isAdminAuthenticated && post.comments.map((comment)=> (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            )) }
            {isAdminAuthenticated && <button className='btn btn-danger'> Delete Post </button>}
        </div>
    </div>
  )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    isAdminAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    post: state.post,
    isAdminAuthenticated: state.auth.isAdminAuthenticated
})

export default connect( mapStateToProps, {getPost} )(Post)