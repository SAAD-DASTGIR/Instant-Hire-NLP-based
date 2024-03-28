import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        addComment(postId,{text})
        setText('')
    }
  return (
    <div className="post-form">
        <div className="bg-primary mt-3 py-2 px-4">
          <h3 className=''>Leave a Comment...</h3>
        </div>
        <form onSubmit={e => handleSubmit(e)} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Say something..."
            required
            onChange={e => setText(e.target.value)}
            className='h-20 focus:outline-none mt-3'
          ></textarea>
          <input type="submit" className="btn btn-dark my-3 " value="Submit" />
        </form>
      </div>
  )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null,{addComment})(CommentForm)