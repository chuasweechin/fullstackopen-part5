import PropTypes from 'prop-types'
import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={ message.type === 'error' ? 'error' : 'info' }>
            { message.text }
        </div>
    )
}

export default Notification

Notification.propTypes = {
    message: PropTypes.object.isRequired
}