import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, blogs, handleBlogLike }) => {
    const elements = blogs.map(b => {
        return (
            <Blog
                key={ b.id }
                blog={ b }
                handleBlogLike={ handleBlogLike }
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