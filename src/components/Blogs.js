import React from 'react'
import Blog from './Blog'

const Blogs = ({ claim, blogs }) => {
    const elements = blogs.map(b => {
        return (
            <Blog key={ b.id } blog={ b }/>
        )
    })

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                { claim.name } logged in
            </div>
            { elements }
        </div>
    )
}

export default Blogs