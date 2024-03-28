import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Spinner} from '../layout/Spinner'
import {connect} from 'react-redux'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
import { useNavigate } from 'react-router-dom'

const Posts = ({getPosts, post:{ posts, loading}}) => {
    useEffect(()=>{
        getPosts()
    },[getPosts])
    const navigate = useNavigate()
  return (
    <div className="container ">
        <div className='ml-10'>
        <button onClick={() => navigate(-1)} className='btn btn-light mb-1' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
        {loading ? <Spinner /> : (
            <Fragment>
                <h1 className="text-6xl font-semibold mt-6 text-primary">Posts</h1>
                <p className="text-3xl mt-3">
                    <i className="fas fa-user"></i> Welcome to the community
                </p>
                <PostForm />
                <div className="posts mb-10">
                    {posts.map(post => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            </Fragment>
            ) 
        }
        </div>
    </div>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})

export default connect( mapStateToProps,{getPosts} )( Posts)