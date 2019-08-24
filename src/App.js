import React, { useState, useEffect, useLayoutEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogServices from './services/blogs'
import loginServices from './services/login'

import './index.css'

function App() {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const dataHook = async () => {
            const initialBlogs = await blogServices.getAll()
            setBlogs(initialBlogs)
        }
        dataHook()
    }, []);

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
            username: username,
            password: password
        }

        try {
            const response = await loginServices.login(credential)
            window.localStorage.setItem('token', JSON.stringify(response.token))

            setUser({
                claim: JSON.parse(atob(response.token.split('.')[1])),
                token: response.token
            })

            setUsername('')
            setPassword('')
        } catch (error) {
            setMessage({
                "text": error.response.data.error,
                "type": "error"
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('token')
    }

    const handleAddBlog = async (e) => {
        e.preventDefault()
        e.target.reset()

        const blog = {
            title: title,
            author: author,
            url: url
        }

        try {
            blogServices.setToken(user.token)
            const response = await blogServices.create(blog)

            setTitle('')
            setAuthor('')
            setUrl('')

            setBlogs(blogs.concat(response))

            setMessage({
                "text": `a new blog "${ blog.title }" added`,
                "type": "info"
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)

        } catch (error) {
            setMessage({
                "text": error.response.data.error,
                "type": "error"
            })

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleBlogLike = async (e) => {
        const selectBlogId = e.target.value
        const selectedBlog = blogs.find(b => b.id === selectBlogId);

        const blog = {
            ...selectedBlog,
            likes: selectedBlog.likes + 1,
            user: selectedBlog.user[0].id
        }

        try {
            const response = await blogServices.update(selectBlogId, blog)
            setBlogs(blogs.map(b => b.id === selectBlogId ? response : b))

        } catch (error) {
            setMessage({
                "text": error.response.data.error,
                "type": "error"
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
                    handleUsernameChange={ (e) => setUsername(e.target.value) }
                    handlePasswordChange={ (e) => setPassword(e.target.value) }
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
                    handleTitleChange={ (e) => setTitle(e.target.value) }
                    handleAuthorChange={ (e) => setAuthor(e.target.value) }
                    handleUrlChange={ (e) => setUrl(e.target.value) }
                    handleAddBlog={ (e) => handleAddBlog(e) }
                />

                <br/>

                <Blogs
                    user={ user }
                    blogs={ blogs }
                    handleBlogLike={ (e) => handleBlogLike(e) }
                />
            </div>
        )
    }
}

export default App;