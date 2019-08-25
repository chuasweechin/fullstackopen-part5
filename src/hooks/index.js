import axios from 'axios'
import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        input: {
            type,
            value,
            onChange,
        },
        reset
    }
}

export const useResource = (baseUrl) => {
    let token = null
    const [objects, setObjects] = useState([])

    const setToken = newToken => {
        token = `bearer ${ newToken }`
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        return response.data
    }

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }

    const update = async (id, newObject) => {
        const response = await axios.put(`${baseUrl}/${id}`, newObject)
        return response.data
    }

    const remove = (id) => {
        const config = {
            headers: { Authorization: token },
        }

        return axios.delete(`${baseUrl}/${id}`, config)
    }
    return [
        objects,
        {
            setObjects,
            setToken,
            getAll,
            create,
            update,
            remove
        }
    ]
}