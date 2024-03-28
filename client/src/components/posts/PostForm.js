import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'


const PostForm = ({addPost}) => {
    const [text, setText] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        addPost({text})
        setText('')
    }
  return (
    <div className="post-form">
        <div className="bg-primary mt-3 py-2 px-4">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={e => handleSubmit(e)} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            onChange={e => setText(e.target.value)}
            className='focus:outline-none h-24 mt-4'
          ></textarea>
          <input type="submit" className="btn btn-dark my-4 right-0" value="Submit" />
        </form>
      </div>
  )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)