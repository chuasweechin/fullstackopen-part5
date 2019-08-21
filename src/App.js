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

    useEffect(() => {
        const authHook = () => {
            const loggedUserToken = window.localStorage.getItem('token')

            if (loggedUserToken) {
                const token = JSON.parse(loggedUserToken)

                setClaim(atob(token.split('.')[1]))
                setToken(`bearer ${ token }`)
            }
        }
        authHook()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        const credential = {
            username: username,
            password: password
        }
        try {
            const response = await loginServices.login(credential)
            window.localStorage.setItem('token', JSON.stringify(response.token))

            setClaim(JSON.parse(atob(response.token.split('.')[1])))
            setToken(`bearer ${ response.token }`)

            setUsername('')
            setPassword('')
        } catch (error) {
            console.log("login failure")
        }
    }
    const handleLogout = () => {
        setClaim(null)
        setToken(null)
        window.localStorage.removeItem('token')
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
                handleLogout={ () => handleLogout() }
            />
        )
    }
}

export default App;