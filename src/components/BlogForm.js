import React from 'react'

const BlogForm = ({ handleTitleChange, handleAuthorChange, handleUrlChange, handleAddBlog }) => {
    return (
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={ handleAddBlog }>
                <div>
                    title:
                    <input
                        type='text'
                        onChange={ handleTitleChange }
                    />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        onChange={ handleAuthorChange }
                    />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        onChange={ handleUrlChange }
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm