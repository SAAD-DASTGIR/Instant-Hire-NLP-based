import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost,markPostSpam } from '../../actions/post'

const PostItem = ({
  deletePost, 
  markPostSpam,
  post:{_id, text, name, avatar, user, likes, comments, date},
  auth, 
  addLike, 
  removeLike,
  showActions
}) => {
  return (
    <div className="post bg-white px-6 py-3 my-1">
          <div>
            <Link to={`/profile/${user}`} >
              <img
                className="round-img"
                src={avatar}
                alt="avatar"
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1 text-2xl">
              {text}
            </p>
             <p className=" text-sm text-gray-400">
                Posted on <Moment format='DD/MM/YYYY' >{date}</Moment>
            </p>

            {showActions && (
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <button type="button" onClick={() => addLike(_id)} className="btn btn-light">
                  <i className="fas fa-thumbs-up"></i>
                  <span>{likes && likes.length > 0 && (
                      <span>{likes.length}</span>
                  )}</span>
                </button>
                <button type="button" onClick={() => removeLike(_id)} className="btn btn-light">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                {_id && <Link to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion {' '}
                  {comments.length > 0 && (
                      <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>
                }
                
                {!auth.loading && user === auth.user._id && (
                    <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
                </div>
                
                <button onClick={() => markPostSpam(_id)} className="btn btn-light">Report</button>
              </div>
            )}
            
          </div>
        </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    markPostSpam: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps,{addLike, removeLike, deletePost, markPostSpam})(PostItem)