import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = ({
    postId,
    comment:{_id, text, name, avatar, user, date},
    auth,
    deleteComment
}) => {
  return (
    <div className="comments">
        <div className="post bg-white px-4 py-4 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt="avatar"
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="text-sm text-gray-500 mb-3">
                <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {!auth.loading && auth.user && auth.user._id=== user && (
                <button onClick={() => deleteComment(postId, _id)} type='button' className='btn  btn-danger' >
                    <i className="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    </div>
  )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem)