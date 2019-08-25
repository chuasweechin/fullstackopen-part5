import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ username, password, handleLogin }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form  onSubmit={ handleLogin }>
                <div>
                    username:
                    <input { ...username.input }/>
                </div>
                <div>
                    password:
                    <input { ...password.input }/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

LoginForm.propTypes = {
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired
}