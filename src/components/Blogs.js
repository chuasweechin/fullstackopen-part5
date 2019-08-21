import React from 'react'
import Blog from './Blog'

const Blogs = ({ claim, blogs, handleLogout }) => {
    const elements = blogs.map(b => {
        return (
            <Blog key={ b.id } blog={ b }/>
        )
    })

    console.log(claim)

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                { claim.name } logged in
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