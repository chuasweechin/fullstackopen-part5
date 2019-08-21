import React, { useState, useEffect, useLayoutEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogServices from './services/blogs'
import loginServices from './services/login'

function App() {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [blogs, setBlogs] = useState([])

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
            console.log("login failure")
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('token')
    }

    const handleAddBlog = async (e) => {
        e.preventDefault()

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

        } catch (error) {
            console.log(error)
            console.log("blog create failure")
        }
    }

    if (user === null) {
        return (
            <LoginForm
                handleUsernameChange={ (e) => setUsername(e.target.value) }
                handlePasswordChange={ (e) => setPassword(e.target.value) }
                handleLogin={ (e) => handleLogin(e) }
            />
        )
    } else {
        return (
            <div>
                <BlogForm
                    handleTitleChange={ (e) => setTitle(e.target.value) }
                    handleAuthorChange={ (e) => setAuthor(e.target.value) }
                    handleUrlChange={ (e) => setUrl(e.target.value) }
                    handleAddBlog={ (e) => handleAddBlog(e) }
                />
                <Blogs
                    user={ user }
                    blogs={ blogs }
                    handleLogout={ () => handleLogout() }
                />
            </div>
        )
    }
}

export default App;