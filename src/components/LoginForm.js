import React from 'react'

const LoginForm = ({ handleUsernameChange, handlePasswordChange, handleLogin }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form  onSubmit={ handleLogin }>
                <div>
                    username:
                    <input
                        type='text'
                        onChange={ handleUsernameChange }
                    />
                </div>
                <div>
                    password:
                    <input
                        type='password'
                        onChange={ handlePasswordChange }
                    />
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm