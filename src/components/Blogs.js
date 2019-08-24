import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, blogs, handleBlogLike, handleBlogRemove }) => {
    const elements = blogs.map(b => {
        return (
            <Blog
                key={ b.id }
                blog={ b }
                user={ user }
                handleBlogLike={ handleBlogLike }
                handleBlogRemove={ handleBlogRemove }
            />
        )
    })

    return (
        <div>
            { elements }
        </div>
    )
}

export default Blogs