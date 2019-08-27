import React, { useState, useLayoutEffect } from 'react'
import { useField, useResource } from './hooks'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import loginServices from './services/login'

import './index.css'

function App() {
    const username = useField('text')
    const password = useField('password')

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const [blogs, blogServices] = useResource('http://localhost:3001/api/blogs')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useLayoutEffect(() => {
        const authHook = () => {
            const loggedUserToken = window.localStorage.getItem('token')

            if (loggedUserToken) {
                const token = JSON.parse(loggedUserToken)

                setUser({
                    claim: JSON.parse(atob(token.split('.')[1])),
                    token: token
                })

            }
        }
        authHook()
    },[])

    const handleLogin = async (e) => {
        e.preventDefault()

        const credential = {
            username: username.input.value,
            password: password.input.value
        }

        e.target.reset()

        username.reset('')
        password.reset('')

        try {
            const response = await loginServices.login(credential)
            window.localStorage.setItem('token', JSON.stringify(response.token))

            setUser({
                claim: JSON.parse(atob(response.token.split('.')[1])),
                token: response.token
            })

        } catch (error) {
            setMessage({
                'text': error.response.data.error,
                'type': 'error'
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        blogServices.destroyToken()
        window.localStorage.removeItem('token')
    }

    const handleAddBlog = async (e) => {
        e.preventDefault()

        const blog = {
            title: title.input.value,
            author: author.input.value,
            url: url.input.value,
            likes: 0,
            user: user.claim.id
        }

        e.target.reset()

        title.reset('')
        author.reset('')
        url.reset('')

        try {
            blogServices.setToken(user.token)
            await blogServices.create(blog)

            setMessage({
                'text': `a new blog "${ blog.title }" added`,
                'type': 'info'
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } catch (error) {
            setMessage({
                'text': error.response.data.error,
                'type': 'error'
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleBlogLike = async (e) => {
        const selectBlogId = e.target.value
        const selectedBlog = blogs.find(b => b.id === selectBlogId)

        const blog = {
            ...selectedBlog,
            likes: selectedBlog.likes + 1,
            user: selectedBlog.user[0].id
        }

        try {
            await blogServices.update(selectBlogId, blog)

        } catch (error) {
            setMessage({
                'text': error.response.data.error,
                'type': 'error'
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleBlogRemove = async (e) => {
        const selectBlogId = e.target.value
        const selectedBlog = blogs.find(b => b.id === selectBlogId)

        const msg = `remove blog ${ selectedBlog.title }`

        try {
            if (window.confirm(msg) === true) {
                blogServices.setToken(user.token)
                await blogServices.remove(selectBlogId)
            }

        } catch (error) {
            setMessage({
                'text': error.response.data.error,
                'type': 'error'
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                { message !== null ? <Notification message={ message } /> : null }
                <LoginForm
                    username={ username }
                    password={ password }
                    handleLogin={ (e) => handleLogin(e) }
                />
            </div>
        )
    } else {
        return (
            <div>
                { message !== null ? <Notification message={ message } /> : null }
                <h2>Blogs</h2>
                <div>
                    { user.claim.name } logged in
                    <button onClick={ handleLogout }>
                        Logout
                    </button>
                </div>

                <BlogForm
                    title={ title }
                    author={ author }
                    url={ url }
                    handleAddBlog={ (e) => handleAddBlog(e) }
                />

                <br/>

                <Blogs
                    user={ user }
                    blogs={ blogs }
                    handleBlogLike={ (e) => handleBlogLike(e) }
                    handleBlogRemove={ (e) => handleBlogRemove(e) }
                />
            </div>
        )
    }
}

export default App