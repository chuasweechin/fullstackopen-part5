import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ title, author, url, handleAddBlog }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisibleStyle = {
        display: visible ? 'none' : ''
    }

    const showWhenVisibleStyle = {
        display: visible ? '' : 'none'
    }

    const handleVisibleEvent = () => setVisible(!visible)

    return (
        <div>
            <div style={ showWhenVisibleStyle }>
                <h2>Create new Blog</h2>
                <form
                    name='blogForm'
                    onSubmit={ handleAddBlog }
                >
                    <div>
                        title:
                        <input name='title' { ...title.input }/>
                    </div>
                    <div>
                        author:
                        <input name='author' { ...author.input }/>
                    </div>
                    <div>
                        url:
                        <input name='url' { ...url.input }/>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
                <button onClick={ handleVisibleEvent }>
                    Cancel
                </button>
            </div>

            <div style={ hideWhenVisibleStyle }>
                <button onClick={ handleVisibleEvent }>
                    New blog
                </button>
            </div>
        </div>
    )
}

export default BlogForm

BlogForm.propTypes = {
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
    handleAddBlog: PropTypes.func.isRequired,
}