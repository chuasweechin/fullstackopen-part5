import React from 'react'
import Blog from './Blog'

const Blogs = ({ user, blogs, handleLogout }) => {
    const elements = blogs.map(b => {
        return (
            <Blog key={ b.id } blog={ b }/>
        )
    })

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                { user.claim.name } logged in
                <button onClick={ handleLogout }>
                    Logout
                </button>
            </div>
            <br/>
            { elements }
        </div>
    )
}

export default Blogs