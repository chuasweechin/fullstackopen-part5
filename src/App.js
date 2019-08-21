import React, { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

import blogServices from './services/blogs'
import loginServices from './services/login'

function App() {
    const [claim, setClaim] = useState(null)
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState('Zues')
    const [password, setPassword] = useState('123456')

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const dataHook = async () => {
            const initialBlogs = await blogServices.getAll()
            setBlogs(initialBlogs)
        }
        dataHook()
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault()

        const credential = {
            username: username,
            password: password
        }
        try {
            const response = await loginServices.login(credential)

            setClaim(JSON.parse(atob(response.token.split('.')[1])))
            setToken(response.token)

            setUsername('')
            setPassword('')
        } catch (error) {
            console.log("login failure")
        }
    }

    if (token === null) {
        return (
            <LoginForm
                handleUsernameChange={ (e) => setUsername(e.target.value) }
                handlePasswordChange={ (e) => setPassword(e.target.value) }
                handleLogin={ (e) => handleLogin(e) }
            />
        )
    } else {
        return (
            <Blogs
                claim={ claim }
                blogs={ blogs }
            />
        )
    }
}

export default App;