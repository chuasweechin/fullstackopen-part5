import PropTypes from 'prop-types'
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

    const showWhenVisibleStyle = {
        display: visible ? '' : 'none'
    }

    return (
        <div style={ blogStyle }>
            <div>
                <div onClick={ handleVisibleEvent } className='blog'>
                    { blog.title } - { blog.author }
                </div>
                <div style={ showWhenVisibleStyle } className='togglableContent'>
                    <div>
                        <div className='url'>
                            <a href='/'>{ blog.url }</a>
                        </div>
                        <div className='likes'>
                            { blog.likes } likes
                            <button value={ blog.id } onClick={ handleBlogLike }>
                                like
                            </button>
                        </div>
                        <div className='author'>
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

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleBlogLike: PropTypes.func.isRequired,
    handleBlogRemove: PropTypes.func.isRequired,
}