import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ handleTitleChange, handleAuthorChange, handleUrlChange, handleAddBlog }) => {
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
                        <input
                            name='title'
                            type='text'
                            onChange={ handleTitleChange }
                        />
                    </div>
                    <div>
                        author:
                        <input
                            name='author'
                            type='text'
                            onChange={ handleAuthorChange }
                        />
                    </div>
                    <div>
                        url:
                        <input
                            name='url'
                            type='text'
                            onChange={ handleUrlChange }
                        />
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
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    handleAddBlog: PropTypes.func.isRequired,
}