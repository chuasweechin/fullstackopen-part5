import React, { useState } from 'react'

const Blog = ({ blog, user, handleBlogLike, handleBlogRemove }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleVisibleEvent = () => setVisible(!visible)

    const hideWhenVisibleStyle = {
        display: visible ? 'none' : ''
    }

    const showWhenVisibleStyle = {
        display: visible ? '' : 'none'
    }

    return (
        <div style={ blogStyle }>
            <div>
                <div onClick={ handleVisibleEvent }>
                    { blog.title } - { blog.author }
                </div>
                <div style={ showWhenVisibleStyle }>
                    <div>
                        <div>
                            <a href='#'>{ blog.url }</a>
                        </div>
                        <div>
                            { blog.likes } likes
                            <button value={ blog.id } onClick={ handleBlogLike }>
                                like
                            </button>
                        </div>
                        <div>
                            added by { blog.user[0].name }
                        </div>

                        {
                            user.claim.id === blog.user[0].id ?
                            <div>
                                <button value={ blog.id } onClick={ handleBlogRemove }>
                                    remove
                                </button>
                            </div>
                            :
                            null
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Blog